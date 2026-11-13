import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const easeExpo = 'expo.out'
const easeInOut = 'expo.inOut'

function usePortfolioMotion() {
  useLayoutEffect(() => {
    const root = document.querySelector('.site')
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    let isMounted = true

    const context = gsap.context(() => {
      const revealTargets =
        '[data-reveal], .hero-meta, .hero-role, .hero h1 .hero-line-inner, .hero-summary, .hero-actions, .hero-scroll'

      if (prefersReducedMotion) {
        gsap.set(revealTargets, {
          autoAlpha: 1,
          x: 0,
          y: 0,
          scaleX: 1,
          clearProps: 'transform,clipPath',
        })
        gsap.set('.opening-curtain', { display: 'none' })
        document.body.classList.remove('opening-active')
        return
      }

      const curtain = document.querySelector('.opening-curtain')
      document.body.classList.add('opening-active')

      gsap.set(curtain, { display: 'grid', clipPath: 'inset(0 0 0% 0)' })
      gsap.set('.hero-media', {
        clipPath: 'inset(100% 0 0 0)',
        scale: 1.08,
        transformOrigin: '50% 35%',
      })
      gsap.set('.site-header', { autoAlpha: 0, y: -26 })
      gsap.set('.hero-meta, .hero-role, .hero-summary, .hero-actions, .hero-scroll', {
        autoAlpha: 0,
        y: 34,
      })
      gsap.set('.hero-side-label, .video-toggle', { autoAlpha: 0 })
      gsap.set('.hero h1', {
        clipPath: 'inset(0 100% 0 0)',
        scaleX: 0.52,
        xPercent: -14,
        transformOrigin: 'left center',
      })

      const finishOpening = () => {
        if (!isMounted) return
        gsap.set(curtain, { display: 'none' })
        document.body.classList.remove('opening-active')
        ScrollTrigger.refresh()
      }

      const opening = gsap.timeline({
        defaults: { ease: 'power4.out' },
        onComplete: finishOpening,
      })

      opening
        .fromTo(
          '.opening-mark',
          {
            autoAlpha: 0,
            yPercent: 120,
            letterSpacing: '0.55em',
          },
          {
            autoAlpha: 1,
            yPercent: 0,
            letterSpacing: '0.28em',
            duration: 0.9,
          },
          0.08,
        )
        .fromTo(
          '.opening-line',
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.05,
            transformOrigin: 'left center',
          },
          0.14,
        )
        .to(
          '.opening-curtain',
          {
            clipPath: 'inset(0 0 100% 0)',
            duration: 1.45,
            ease: 'power4.inOut',
          },
          0.72,
        )
        .to(
          '.hero-media',
          {
            clipPath: 'inset(0 0 0% 0)',
            scale: 1,
            duration: 1.85,
            ease: 'power4.inOut',
          },
          0.63,
        )
        .to(
          '.hero h1',
          {
            clipPath: 'inset(0 0 0% 0)',
            scaleX: 1,
            xPercent: 0,
            duration: 1.65,
            ease: easeExpo,
          },
          1.02,
        )
        .to(
          '.site-header',
          { autoAlpha: 1, y: 0, duration: 1.15, ease: 'power3.out' },
          1.22,
        )
        .to(
          '.hero-meta',
          { autoAlpha: 1, y: 0, duration: 1.05 },
          1.34,
        )
        .to(
          '.hero-role',
          { autoAlpha: 1, y: 0, duration: 1.05 },
          1.68,
        )
        .to(
          '.hero-summary',
          { autoAlpha: 1, y: 0, duration: 1.05 },
          1.8,
        )
        .to(
          '.hero-actions',
          { autoAlpha: 1, y: 0, duration: 1.15, ease: 'power3.out' },
          1.92,
        )
        .to(
          '.hero-scroll, .hero-side-label, .video-toggle',
          { autoAlpha: 1, duration: 1.2, stagger: 0.12 },
          2.05,
        )

      gsap.to('.hero-media video', {
        yPercent: 7,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.1,
        },
      })

      gsap.utils.toArray('.section-heading').forEach((heading) => {
        const englishTitle = heading.querySelector('.section-english-title')
        const index = heading.querySelector('.section-index')
        const title = heading.querySelector('h2')
        const copy = heading.querySelector('p')

        gsap.set([englishTitle, index, title, copy].filter(Boolean), {
          autoAlpha: 0,
        })

        const headingTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: heading,
            start: 'top 84%',
            once: true,
          },
        })

        headingTimeline
          .fromTo(
            englishTitle,
            {
              yPercent: 115,
              scaleX: 0.7,
              clipPath: 'inset(0 0 100% 0)',
              autoAlpha: 0,
            },
            {
              yPercent: 0,
              scaleX: 1,
              clipPath: 'inset(0 0 0% 0)',
              autoAlpha: 1,
              duration: 1.45,
              ease: easeExpo,
            },
          )
          .fromTo(
            index,
            { autoAlpha: 0, x: -24 },
            { autoAlpha: 1, x: 0, duration: 0.9 },
            '-=0.95',
          )
          .fromTo(
            title,
            {
              y: 90,
              scaleX: 0.82,
              clipPath: 'inset(0 0 100% 0)',
              autoAlpha: 0,
              transformOrigin: 'left center',
            },
            {
              y: 0,
              scaleX: 1,
              clipPath: 'inset(0 0 0% 0)',
              autoAlpha: 1,
              duration: 1.3,
              ease: easeExpo,
            },
            '-=0.78',
          )

        if (copy) {
          headingTimeline.fromTo(
            copy,
            { autoAlpha: 0, y: 34 },
            { autoAlpha: 1, y: 0, duration: 0.95 },
            '-=0.72',
          )
        }
      })

      const aboutItems = gsap.utils.toArray(
        '.about-layout [data-reveal], .experience-block',
      )
      gsap.set(aboutItems, { autoAlpha: 0, y: 76 })
      ScrollTrigger.batch(aboutItems, {
        start: 'top 88%',
        once: true,
        onEnter: (batch) => {
          batch.forEach((item, index) => {
            gsap.to(item, {
              autoAlpha: 1,
              y: 0,
              duration: 1.25,
              delay: index * 0.13,
              ease: easeExpo,
            })
          })
        },
      })

      gsap.fromTo(
        '.portrait-image',
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0 0 0% 0)',
          duration: 1.55,
          ease: easeInOut,
          scrollTrigger: {
            trigger: '.portrait-image',
            start: 'top 82%',
            once: true,
          },
        },
      )

      const projectCards = gsap.utils.toArray('.project-card')
      gsap.set(projectCards, { autoAlpha: 0, y: 100 })
      projectCards.forEach((card) => {
        gsap.set(card.querySelector('.project-media'), {
          clipPath: 'inset(0 0 100% 0)',
        })
        gsap.set(card.querySelector('.project-body'), {
          autoAlpha: 0,
          y: 24,
        })

        const imageMotion = card.querySelector('.project-image-motion')
        gsap.fromTo(
          imageMotion,
          { yPercent: -4 },
          {
            yPercent: 4,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.15,
              invalidateOnRefresh: true,
            },
          },
        )
      })

      ScrollTrigger.batch(projectCards, {
        start: 'top 88%',
        once: true,
        onEnter: (batch) => {
          batch.forEach((card, index) => {
            const timeline = gsap.timeline({ delay: index * 0.13 })
            timeline
              .to(card, {
                autoAlpha: 1,
                y: 0,
                duration: 1.25,
                ease: easeExpo,
              })
              .to(
                card.querySelector('.project-media'),
                {
                  clipPath: 'inset(0 0 0% 0)',
                  duration: 1.4,
                  ease: easeInOut,
                },
                0,
              )
              .to(
                card.querySelector('.project-body'),
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.95,
                  ease: easeExpo,
                },
                0.38,
              )
          })
        },
      })

      const capabilityCards = gsap.utils.toArray('.capability-reveal')
      gsap.set(capabilityCards, { autoAlpha: 0, y: 92, scale: 0.965 })
      ScrollTrigger.batch(capabilityCards, {
        start: 'top 88%',
        once: true,
        onEnter: (batch) => {
          batch.forEach((card, index) => {
            gsap.to(card, {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 1.3,
              delay: index * 0.13,
              ease: easeExpo,
              onComplete: () => gsap.set(card, { clearProps: 'transform' }),
            })
          })
        },
      })

      const contactTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '#contact',
          start: 'top 82%',
          once: true,
        },
      })

      gsap.set(
        [
          '.contact-english-title',
          '.contact-topline',
          '.contact-kicker',
          '.contact-main h2',
          '.contact-email-row',
          '.contact-bottom',
        ],
        { autoAlpha: 0 },
      )

      contactTimeline
        .fromTo(
          '.contact-english-title',
          {
            yPercent: 120,
            scaleX: 0.68,
            clipPath: 'inset(0 0 100% 0)',
          },
          {
            yPercent: 0,
            scaleX: 1,
            clipPath: 'inset(0 0 0% 0)',
            autoAlpha: 1,
            duration: 1.5,
            ease: easeExpo,
          },
        )
        .fromTo(
          '.contact-topline',
          { y: 24 },
          { y: 0, autoAlpha: 1, duration: 0.9 },
          '-=0.95',
        )
        .fromTo(
          '.contact-kicker',
          { y: 30 },
          { y: 0, autoAlpha: 1, duration: 0.8 },
          '-=0.6',
        )
        .fromTo(
          '.contact-main h2',
          {
            y: 110,
            scaleX: 0.78,
            clipPath: 'inset(0 0 100% 0)',
            transformOrigin: 'left center',
          },
          {
            y: 0,
            scaleX: 1,
            clipPath: 'inset(0 0 0% 0)',
            autoAlpha: 1,
            duration: 1.4,
            ease: easeExpo,
          },
          '-=0.48',
        )
        .fromTo(
          '.contact-email-row',
          { y: 45 },
          { y: 0, autoAlpha: 1, duration: 1 },
          '-=0.75',
        )
        .fromTo(
          '.contact-bottom',
          { y: 40 },
          { y: 0, autoAlpha: 1, duration: 0.9 },
          '-=0.55',
        )
    }, root)

    const refresh = () => {
      if (isMounted) ScrollTrigger.refresh()
    }
    window.addEventListener('load', refresh)

    return () => {
      isMounted = false
      window.removeEventListener('load', refresh)
      document.body.classList.remove('opening-active')
      context.revert()
    }
  }, [])
}

export default usePortfolioMotion
