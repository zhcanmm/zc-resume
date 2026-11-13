import { spawn } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
const port = 9333
const profileDir = resolve('.browser-preview')
const outputDir = resolve('preview')
const previewUrl = process.env.PREVIEW_URL || 'http://127.0.0.1:4173/'

await mkdir(profileDir, { recursive: true })
await mkdir(outputDir, { recursive: true })

const browser = spawn(
  edgePath,
  [
    '--headless',
    '--no-sandbox',
    '--disable-gpu',
    '--disable-dev-shm-usage',
    '--hide-scrollbars',
    '--autoplay-policy=no-user-gesture-required',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profileDir}`,
    '--window-size=1920,1080',
    'about:blank',
  ],
  { stdio: 'ignore' },
)

const sleep = (milliseconds) =>
  new Promise((resolvePromise) => {
    setTimeout(resolvePromise, milliseconds)
  })

async function waitForDebugger() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/version`)
      if (response.ok) return
    } catch {
      // Browser is still starting.
    }
    await sleep(200)
  }
  throw new Error('Timed out waiting for Edge DevTools.')
}

try {
  await waitForDebugger()
  const response = await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, {
    method: 'PUT',
  })
  const target = await response.json()
  const socket = new WebSocket(target.webSocketDebuggerUrl)

  await new Promise((resolvePromise, reject) => {
    socket.addEventListener('open', resolvePromise, { once: true })
    socket.addEventListener('error', reject, { once: true })
  })

  let messageId = 0
  const pending = new Map()
  const consoleErrors = []

  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data)
    if (message.id && pending.has(message.id)) {
      const handlers = pending.get(message.id)
      pending.delete(message.id)
      if (message.error) handlers.reject(new Error(message.error.message))
      else handlers.resolve(message.result)
    }
    if (message.method === 'Runtime.exceptionThrown') {
      const details = message.params.exceptionDetails
      consoleErrors.push(
        details.exception?.description ||
          details.exception?.value ||
          details.text ||
          'Unknown runtime exception',
      )
    }
    if (message.method === 'Log.entryAdded' && message.params.entry.level === 'error') {
      consoleErrors.push(message.params.entry.text)
    }
  })

  const send = (method, params = {}) =>
    new Promise((resolvePromise, reject) => {
      messageId += 1
      pending.set(messageId, { resolve: resolvePromise, reject })
      socket.send(JSON.stringify({ id: messageId, method, params }))
    })

  await send('Page.enable')
  await send('Runtime.enable')
  await send('Log.enable')
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
    mobile: false,
  })

  const capture = async (name) => {
    const result = await send('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: false,
    })
    await writeFile(join(outputDir, `${name}.png`), Buffer.from(result.data, 'base64'))
  }

  await send('Page.navigate', { url: previewUrl })
  await sleep(500)
  await capture('opening-early')
  await sleep(900)
  await capture('opening-mid')
  await sleep(1100)
  await capture('opening-reveal')
  await sleep(1700)

  const inspection = await send('Runtime.evaluate', {
    expression: `(() => {
      const video = document.querySelector('video')
      const hero = document.querySelector('.hero')
      const title = document.querySelector('#hero-title')
      const nav = document.querySelector('.site-header')
      return {
        rootHtml: document.getElementById('root')?.innerHTML.slice(0, 500) || '',
        revealState: [...document.querySelectorAll('[data-reveal]')].slice(0, 12).map((node) => ({
          className: node.className,
          visible: node.classList.contains('is-visible'),
          opacity: getComputedStyle(node).opacity,
          rect: (() => {
            const box = node.getBoundingClientRect()
            return { top: box.top, left: box.left, width: box.width, height: box.height }
          })()
        })),
        heroTitleRects: [...document.querySelectorAll('#hero-title > span')].map((node) => {
          const box = node.getBoundingClientRect()
          return { text: node.textContent, left: box.left, right: box.right, top: box.top }
        }),
        heroLayout: ['.hero-frame', '.hero-main', '.hero-bottom'].map((selector) => {
          const node = document.querySelector(selector)
          const box = node.getBoundingClientRect()
          const style = getComputedStyle(node)
          return {
            selector,
            top: box.top,
            bottom: box.bottom,
            height: box.height,
            paddingTop: style.paddingTop,
            paddingBottom: style.paddingBottom,
            display: style.display
          }
        }),
        viewport: { width: innerWidth, height: innerHeight },
        pageWidth: document.documentElement.scrollWidth,
        pageHeight: document.documentElement.scrollHeight,
        heroHeight: hero?.getBoundingClientRect().height || null,
        heroBottom: hero?.getBoundingClientRect().bottom || null,
        titleWidth: title?.getBoundingClientRect().width || null,
        titleHeight: title?.getBoundingClientRect().height || null,
        navHeight: nav?.getBoundingClientRect().height || null,
        video: video ? {
          readyState: video.readyState,
          currentTime: video.currentTime,
          paused: video.paused,
          error: video.error?.message || null
        } : null,
        fonts: {
          sans: getComputedStyle(document.body).fontFamily,
          title: getComputedStyle(title).fontSize
        }
      }
    })()`,
    returnByValue: true,
  })

  await capture('home')
  let modalCheck = null

  for (const sectionId of ['about', 'projects', 'capabilities', 'contact']) {
    await send('Runtime.evaluate', {
      expression: `document.getElementById('${sectionId}').scrollIntoView({ block: 'start' })`,
    })
    await sleep(1200)
    await capture(sectionId)

    if (sectionId === 'capabilities') {
      const cardRect = await send('Runtime.evaluate', {
        expression: `(() => {
          const rect = document.querySelector('.capability-brand').getBoundingClientRect()
          return { x: rect.right - 14, y: rect.top + rect.height * 0.55 }
        })()`,
        returnByValue: true,
      })
      await send('Input.dispatchMouseEvent', {
        type: 'mouseMoved',
        x: cardRect.result.value.x,
        y: cardRect.result.value.y,
      })
      await sleep(900)
      await capture('capabilities-hover')
      const secondCardRect = await send('Runtime.evaluate', {
        expression: `(() => {
          const rect = document.querySelector('.capability-ai').getBoundingClientRect()
          return { x: rect.right - 14, y: rect.top + rect.height * 0.52 }
        })()`,
        returnByValue: true,
      })
      await send('Input.dispatchMouseEvent', {
        type: 'mouseMoved',
        x: secondCardRect.result.value.x,
        y: secondCardRect.result.value.y,
      })
      await sleep(700)
      await capture('capabilities-hover-secondary')
      await send('Input.dispatchMouseEvent', {
        type: 'mouseMoved',
        x: 8,
        y: 8,
      })
    }

    if (sectionId === 'projects') {
      await send('Runtime.evaluate', {
        expression: 'document.querySelectorAll(".project-button")[2]?.click()',
      })
      await sleep(700)
      const modalInspection = await send('Runtime.evaluate', {
        expression: `(() => {
          const dialog = document.querySelector('.project-modal')
          const image = dialog?.querySelector('img')
          return {
            open: Boolean(dialog),
            title: dialog?.querySelector('h2')?.textContent || null,
            imageLoaded: Boolean(image?.complete && image?.naturalWidth)
          }
        })()`,
        returnByValue: true,
      })
      modalCheck = modalInspection.result.value
      await capture('project-modal')
      await send('Runtime.evaluate', {
        expression: 'document.querySelector(".modal-close")?.click()',
      })
      await sleep(300)
    }

    if (sectionId === 'projects' || sectionId === 'capabilities') {
      await send('Runtime.evaluate', {
        expression: 'window.scrollBy({ top: Math.floor(innerHeight * 0.82), behavior: "instant" })',
      })
      await sleep(900)
      await capture(`${sectionId}-next`)
    }
  }

  await send('Runtime.evaluate', {
    expression: 'window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" })',
  })
  await sleep(800)
  await capture('contact-end')

  const metrics = await send('Page.getLayoutMetrics')
  const fullHeight = Math.ceil(metrics.cssContentSize.height)
  const fullPage = await send('Page.captureScreenshot', {
    format: 'png',
    captureBeyondViewport: true,
    clip: {
      x: 0,
      y: 0,
      width: 1920,
      height: fullHeight,
      scale: 1,
    },
  })
  await writeFile(join(outputDir, 'full-page.png'), Buffer.from(fullPage.data, 'base64'))

  const responsiveChecks = []
  for (const viewport of [
    { name: 'home-1440', width: 1440, height: 900, mobile: false },
    { name: 'home-mobile', width: 390, height: 844, mobile: true },
  ]) {
    await send('Emulation.setDeviceMetricsOverride', {
      width: viewport.width,
      height: viewport.height,
      deviceScaleFactor: 1,
      mobile: viewport.mobile,
    })
    await send('Page.navigate', { url: previewUrl })
    await sleep(1800)

    const check = await send('Runtime.evaluate', {
      expression: `(() => ({
        viewport: { width: innerWidth, height: innerHeight },
        pageWidth: document.documentElement.scrollWidth,
        heroHeight: document.querySelector('.hero')?.getBoundingClientRect().height || null,
        hiddenHeroItems: [...document.querySelectorAll('.hero-bottom [data-reveal]')]
          .filter((node) => !node.classList.contains('is-visible')).length
      }))()`,
      returnByValue: true,
    })

    await capture(viewport.name)
    await send('Runtime.evaluate', {
      expression: 'document.getElementById("capabilities").scrollIntoView({ block: "start" })',
    })
    await sleep(900)
    await capture(`${viewport.name}-capabilities`)
    responsiveChecks.push({ name: viewport.name, ...check.result.value })
  }

  console.log(
    JSON.stringify(
      {
        inspection: inspection.result.value,
        consoleErrors,
        fullHeight,
        modalCheck,
        responsiveChecks,
      },
      null,
      2,
    ),
  )
  socket.close()
} finally {
  browser.kill()
}
