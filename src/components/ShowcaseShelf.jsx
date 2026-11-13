import React, { useEffect, useRef, useState } from 'react'
import BorderGlow from './BorderGlow'
import SecondaryBackground from './SecondaryBackground'
import { SHOWCASE_IMAGES } from '../data/showcaseImages'
import './ShowcaseShelf.css'

function ShelfIcon({ name, size = 18 }) {
  const paths = {
    close: (
      <>
        <path d="m6 6 12 12" />
        <path d="M18 6 6 18" />
      </>
    ),
    left: (
      <>
        <path d="M19 12H5" />
        <path d="m10 7-5 5 5 5" />
      </>
    ),
    right: (
      <>
        <path d="M5 12h14" />
        <path d="m14 7 5 5-5 5" />
      </>
    ),
    expand: (
      <>
        <path d="M9 4H4v5" />
        <path d="m4 4 6 6" />
        <path d="M15 20h5v-5" />
        <path d="m20 20-6-6" />
      </>
    ),
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

function ShowcaseLightbox({ images, activeIndex, onClose, onSelect }) {
  const closeButtonRef = useRef(null)
  const current = images[activeIndex]

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') {
        onSelect((activeIndex - 1 + images.length) % images.length)
      }
      if (event.key === 'ArrowRight') {
        onSelect((activeIndex + 1) % images.length)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeIndex, images.length, onClose, onSelect])

  if (!current) return null

  return (
    <div className="showcase-lightbox" role="dialog" aria-modal="true">
      <SecondaryBackground className="showcase-lightbox-background" />
      <button
        type="button"
        className="showcase-lightbox-backdrop"
        onClick={onClose}
        aria-label="关闭图片预览"
      />
      <div className="showcase-lightbox-panel">
        <div className="showcase-lightbox-topline">
          <span>
            SHOWCASE / {String(activeIndex + 1).padStart(2, '0')} —{' '}
            {String(images.length).padStart(2, '0')}
          </span>
          <button
            ref={closeButtonRef}
            type="button"
            className="showcase-lightbox-close"
            onClick={onClose}
            aria-label="关闭预览"
          >
            <ShelfIcon name="close" size={20} />
          </button>
        </div>
        <div className="showcase-lightbox-stage">
          <button
            type="button"
            className="showcase-lightbox-nav is-prev"
            onClick={() =>
              onSelect((activeIndex - 1 + images.length) % images.length)
            }
            aria-label="上一张"
          >
            <ShelfIcon name="left" size={22} />
          </button>
          <div className="showcase-lightbox-image">
            <img src={current.src} alt={current.alt} />
          </div>
          <button
            type="button"
            className="showcase-lightbox-nav is-next"
            onClick={() => onSelect((activeIndex + 1) % images.length)}
            aria-label="下一张"
          >
            <ShelfIcon name="right" size={22} />
          </button>
        </div>
        <div className="showcase-lightbox-caption">
          <span>{current.alt}</span>
          <small>SELECTED VISUAL</small>
        </div>
      </div>
    </div>
  )
}

function ShowcaseShelf() {
  const trackRef = useRef(null)
  const dragRef = useRef(null)
  const edgeScrollRef = useRef({
    direction: 0,
    frame: null,
    speed: 0,
  })
  const suppressClickRef = useRef(false)
  const [previewIndex, setPreviewIndex] = useState(null)
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return undefined
    let fanFrame = null

    const handleWheel = (event) => {
      const maxScroll = track.scrollWidth - track.clientWidth
      if (maxScroll <= 0) return

      const dominantDelta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY
      if (dominantDelta === 0) return

      const nextScroll = Math.max(
        0,
        Math.min(maxScroll, track.scrollLeft + dominantDelta),
      )

      if (nextScroll === track.scrollLeft) return
      event.preventDefault()
      track.scrollLeft = nextScroll
    }

    const updateFanLayout = () => {
      fanFrame = null
      const cards = [...track.querySelectorAll('.showcase-card-shell')]
      if (cards.length === 0) return

      const trackRect = track.getBoundingClientRect()
      const trackCenter = trackRect.left + trackRect.width / 2
      const columnGap =
        Number.parseFloat(getComputedStyle(track).columnGap) || 20
      const cardStride = cards[0].offsetWidth + columnGap

      cards.forEach((card) => {
        const cardCenter =
          trackRect.left +
          card.offsetLeft +
          card.offsetWidth / 2 -
          track.scrollLeft
        const fanPosition = (cardCenter - trackCenter) / cardStride
        const fanOffset = Math.max(
          -2,
          Math.min(2, fanPosition),
        )
        const angle = -fanOffset * 13
        const depth = -Math.max(0, 2 - Math.abs(fanOffset)) * 22
        const layer = Math.round(Math.max(1, 20 - Math.abs(fanPosition)))

        card.style.setProperty('--card-angle', `${angle.toFixed(3)}deg`)
        card.style.setProperty(
          '--card-counter-angle',
          `${(-angle).toFixed(3)}deg`,
        )
        card.style.setProperty('--card-depth', `${depth.toFixed(3)}px`)
        card.style.setProperty('--card-layer', `${layer}`)
      })
    }

    const scheduleFanUpdate = () => {
      if (fanFrame !== null) return
      fanFrame = window.requestAnimationFrame(updateFanLayout)
    }

    track.addEventListener('wheel', handleWheel, { passive: false })
    track.addEventListener('scroll', scheduleFanUpdate, { passive: true })
    window.addEventListener('resize', scheduleFanUpdate)
    updateFanLayout()

    return () => {
      track.removeEventListener('wheel', handleWheel)
      track.removeEventListener('scroll', scheduleFanUpdate)
      window.removeEventListener('resize', scheduleFanUpdate)
      if (fanFrame !== null) window.cancelAnimationFrame(fanFrame)
    }
  }, [])

  useEffect(
    () => () => {
      const edgeScroll = edgeScrollRef.current
      if (edgeScroll.frame !== null) {
        window.cancelAnimationFrame(edgeScroll.frame)
      }
    },
    [],
  )

  const stopEdgeScroll = () => {
    const edgeScroll = edgeScrollRef.current
    const track = trackRef.current
    edgeScroll.direction = 0
    edgeScroll.speed = 0
    track?.style.removeProperty('scroll-snap-type')
    if (edgeScroll.frame !== null) {
      window.cancelAnimationFrame(edgeScroll.frame)
      edgeScroll.frame = null
    }
  }

  const startEdgeScroll = () => {
    const edgeScroll = edgeScrollRef.current
    if (edgeScroll.frame !== null) return

    const track = trackRef.current
    if (track) track.style.scrollSnapType = 'none'

    const scrollFrame = () => {
      const currentTrack = trackRef.current
      const current = edgeScrollRef.current
      if (!currentTrack || current.direction === 0) {
        current.frame = null
        return
      }

      const previousScroll = currentTrack.scrollLeft
      currentTrack.scrollLeft += current.direction * current.speed
      if (Math.abs(currentTrack.scrollLeft - previousScroll) < 0.5) {
        current.frame = null
        return
      }
      current.frame = window.requestAnimationFrame(scrollFrame)
    }

    edgeScroll.frame = window.requestAnimationFrame(scrollFrame)
  }

  const updateEdgeScroll = (event) => {
    const track = trackRef.current
    if (
      event.pointerType !== 'mouse' ||
      !track ||
      dragRef.current ||
      previewIndex !== null
    ) {
      stopEdgeScroll()
      return
    }

    const trackRect = track.getBoundingClientRect()
    const edgeWidth = Math.min(240, Math.max(88, trackRect.width * 0.2))
    const leftDistance = event.clientX - trackRect.left
    const rightDistance = trackRect.right - event.clientX
    const edgeScroll = edgeScrollRef.current

    if (leftDistance >= 0 && leftDistance <= edgeWidth) {
      edgeScroll.direction = -1
      edgeScroll.speed = 6 + (1 - leftDistance / edgeWidth) * 10
    } else if (rightDistance >= 0 && rightDistance <= edgeWidth) {
      edgeScroll.direction = 1
      edgeScroll.speed = 6 + (1 - rightDistance / edgeWidth) * 10
    } else {
      stopEdgeScroll()
      return
    }

    startEdgeScroll()
  }

  const handlePointerLeave = () => {
    stopEdgeScroll()
  }

  useEffect(() => {
    const track = trackRef.current
    if (!track) return undefined

    const nativeHandlePointerEnter = (event) => updateEdgeScroll(event)
    const nativeHandlePointerMove = (event) => updateEdgeScroll(event)
    const nativeHandlePointerLeave = () => handlePointerLeave()

    track.addEventListener('pointerenter', nativeHandlePointerEnter)
    track.addEventListener('pointermove', nativeHandlePointerMove)
    track.addEventListener('pointerleave', nativeHandlePointerLeave)

    return () => {
      track.removeEventListener('pointerenter', nativeHandlePointerEnter)
      track.removeEventListener('pointermove', nativeHandlePointerMove)
      track.removeEventListener('pointerleave', nativeHandlePointerLeave)
    }
  }, [])

  const handlePointerDown = (event) => {
    stopEdgeScroll()
    if (event.pointerType === 'mouse' && event.button !== 0) return
    if (event.target.closest('a, .showcase-card-expand')) return
    const track = trackRef.current
    if (!track) return

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: track.scrollLeft,
      moved: false,
    }
  }

  const handlePointerMove = (event) => {
    const drag = dragRef.current
    const track = trackRef.current
    if (!drag || !track || drag.pointerId !== event.pointerId) return

    const delta = event.clientX - drag.startX
    if (!drag.moved && Math.abs(delta) > 5) {
      drag.moved = true
      track.setPointerCapture(event.pointerId)
      setDragging(true)
      event.preventDefault()
    }
    if (drag.moved) track.scrollLeft = drag.startScrollLeft - delta
  }

  const handlePointerUp = (event) => {
    const drag = dragRef.current
    const track = trackRef.current
    if (!drag) return

    if (track && event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    if (drag.moved) {
      suppressClickRef.current = true
      window.setTimeout(() => {
        suppressClickRef.current = false
      }, 120)
    }
    dragRef.current = null
    setDragging(false)
  }

  const openPreview = (index) => {
    if (suppressClickRef.current) return
    stopEdgeScroll()
    setPreviewIndex(index)
  }

  return (
    <>
      <div
        className={`showcase-shelf is-hero${dragging ? ' is-dragging' : ''}`}
        id="showcase"
        role="region"
        aria-label="首屏作品横向展示"
      >
        <div
          ref={trackRef}
          className="showcase-track"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {SHOWCASE_IMAGES.map((item, index) => {
            const fanOffset = Math.max(-2, Math.min(2, index - 2))

            return (
              <div
                className="showcase-card-shell"
                key={item.id}
                style={{
                  '--card-angle': `${-fanOffset * 13}deg`,
                  '--card-counter-angle': `${fanOffset * 13}deg`,
                  '--card-depth': `${
                    -Math.max(0, 2 - Math.abs(fanOffset)) * 22
                  }px`,
                  '--card-layer': `${Math.max(1, 20 - Math.abs(index - 2))}`,
                  '--sway-delay': `${-((index * 1.37) % 6).toFixed(2)}s`,
                  '--sway-duration': `${(
                    6.2 +
                    (index % 4) * 0.58
                  ).toFixed(2)}s`,
                  '--sway-angle': `${(
                    0.12 +
                    (index % 3) * 0.06
                  ).toFixed(2)}deg`,
                  '--sway-angle-negative': `-${(
                    0.12 +
                    (index % 3) * 0.06
                  ).toFixed(2)}deg`,
                  '--sway-y': `${1.5 + (index % 4) * 0.55}px`,
                }}
              >
                <BorderGlow
                  className="showcase-card-glow"
                  edgeSensitivity={30}
                  glowColor="124 88 64"
                  backgroundColor="#0b1110"
                  borderRadius={6}
                  glowRadius={40}
                  glowIntensity={0.4}
                  coneSpread={25}
                  alwaysOn
                  flow
                  colors={['#52f45d', '#10b981', '#38bdf8']}
                  fillOpacity={0.2}
                >
                  <div className="showcase-card">
                    <button
                      type="button"
                      className="showcase-card-main"
                      onClick={() => openPreview(index)}
                      aria-label={`站内放大预览：${item.alt}`}
                    >
                      <span className="showcase-card-media">
                        <img
                          src={item.src}
                          alt={item.alt}
                          draggable="false"
                          loading={index < 5 ? 'eager' : 'lazy'}
                        />
                        <span
                          className="showcase-card-shade"
                          aria-hidden="true"
                        />
                        <span className="showcase-card-number">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </span>
                    </button>
                    <button
                      type="button"
                      className="showcase-card-expand"
                      onClick={() => openPreview(index)}
                      aria-label={`在站内查看：${item.alt}`}
                    >
                      <ShelfIcon name="expand" size={15} />
                    </button>
                  </div>
                </BorderGlow>
              </div>
            )
          })}
        </div>
      </div>

      {previewIndex !== null && SHOWCASE_IMAGES[previewIndex] && (
        <ShowcaseLightbox
          images={SHOWCASE_IMAGES}
          activeIndex={previewIndex}
          onClose={() => setPreviewIndex(null)}
          onSelect={setPreviewIndex}
        />
      )}
    </>
  )
}

export default ShowcaseShelf
