import React, { useEffect, useRef, useState } from 'react'
import BorderGlow from './components/BorderGlow'
import GhostFibers from './components/GhostFibers'
import GradientText from './components/GradientText'
import SecondaryBackground from './components/SecondaryBackground'
import ShowcaseShelf from './components/ShowcaseShelf'
import usePortfolioMotion from './hooks/usePortfolioMotion'

const CONTACT = {
  email: '499754468@qq.com',
  phone: '180-6185-8707',
  phoneHref: 'tel:+8618061858707',
  location: '中国 · 南京',
}

const NAV_ITEMS = [
  { id: 'home', label: '首页', en: 'INDEX' },
  { id: 'about', label: '关于', en: 'ABOUT' },
  { id: 'projects', label: '作品', en: 'WORK' },
  { id: 'capabilities', label: '能力', en: 'EXPERTISE' },
  { id: 'contact', label: '联系', en: 'CONTACT' },
]

const PROJECTS = [
  {
    id: '01',
    title: '可视化设计作品',
    en: 'DIGITAL TWIN COMMUNITY',
    category: '数据可视化',
    year: '2019—2021',
    image: '/assets/project-viz-monitoring.jpg',
    coverAspect: '2600 / 1080',
    position: 'center',
    layout: 'feature',
    description:
      '把社区安防、设备状态与人员数据折叠进一个可操作的三维场景，在高密度信息中建立清晰的阅读秩序。',
    tags: ['大屏界面', '信息架构', '数据视觉'],
    galleryGroups: [
      {
        title: '可视化大屏界面',
        images: [
          '/assets/project-viz-hongfeng.jpg',
          '/assets/project-viz-monitoring.jpg',
          '/assets/project-viz-materials-map.jpg',
          '/assets/project-viz-haiyue-community.jpg',
          '/assets/project-viz-haiyue-equipment.jpg',
        ],
      },
    ],
  },
  {
    id: '02',
    title: '平面设计作品',
    en: 'KAILGFZ HERBAL TEA',
    category: '品牌 Campaign / 视觉',
    year: '2024—2025',
    image: '/assets/project-milk-tea-01.jpg',
    coverAspect: '1057 / 1413',
    position: 'center top',
    layout: 'portrait',
    description:
      '围绕“以方入茶，以茶养人”的品牌主张，统一季节海报、产品视觉与东方草本叙事。',
    tags: ['品牌 Campaign', '海报设计', '视觉统筹'],
    galleryGroups: [
      {
        title: '平面设计作品',
        images: [
          '/assets/project-milk-tea-01.jpg',
          '/assets/project-milk-tea-02.jpg',
          '/assets/project-milk-tea-03.jpg',
          '/assets/project-milk-tea-04.jpg',
          '/assets/project-milk-tea-05.jpg',
          '/assets/project-milk-tea-06.jpg',
          '/assets/project-milk-tea-07.jpg',
          '/assets/project-milk-tea-08.jpg',
          '/assets/project-milk-tea-09.jpg',
        ],
      },
    ],
  },
  {
    id: '03',
    title: '网站设计作品',
    en: 'WEB DESIGN COLLECTION',
    category: '网站设计 / 品牌视觉',
    year: '2019—2025',
    image: '/assets/project-website-01.jpg',
    coverAspect: '4000 / 2401',
    position: 'center',
    layout: 'split',
    description:
      '从科技企业官网到甜品品牌网站与 VI 延展，围绕品牌气质梳理信息层级、页面节奏和完整的视觉体验。',
    tags: ['企业官网', '品牌网站', 'VI 延展'],
    galleryGroups: [
      {
        title: '网站项目展示',
        images: [
          '/assets/project-website-01.jpg',
          '/assets/project-website-02.jpg',
          '/assets/project-website-03.jpg',
          '/assets/project-website-04.jpg',
          '/assets/project-super-producer-01.png',
          '/assets/project-super-producer-02.png',
          '/assets/project-super-producer-04.png',
          '/assets/project-super-producer-05.png',
        ],
      },
    ],
  },
  {
    id: '04',
    title: 'APP设计作品',
    en: 'CAI TUAN TUAN APP',
    category: '产品体验 / App UI',
    year: '2019—2020',
    image: '/assets/project-app-demo-poster.jpg',
    coverAspect: '1920 / 1080',
    position: 'center',
    layout: 'wide',
    description:
      '覆盖商品浏览、下单取货到会员运营的完整路径，以高亲和度的视觉语言降低社区生鲜产品的使用门槛。',
    tags: ['移动端体验', '交互设计', '组件规范'],
    galleryGroups: [
      {
        title: '项目演示视频',
        images: [],
        videos: [
          {
            src: '/assets/project-app-demo.mp4',
            poster: '/assets/project-app-demo-poster.jpg',
          },
        ],
      },
      {
        title: '其他界面展示',
        images: [
          '/assets/project-app-showcase-01.png',
          '/assets/project-app-showcase-02.gif',
          '/assets/project-app-showcase-03.gif',
          '/assets/project-app-showcase-04.gif',
          '/assets/project-app-showcase-05.png',
          '/assets/project-app-showcase-06.png',
          '/assets/project-app-showcase-07.png',
          '/assets/project-app-showcase-08.png',
          '/assets/project-app-showcase-09.png',
          '/assets/project-app-showcase-10.png',
          '/assets/project-app-showcase-11.png',
        ],
      },
    ],
  },
  {
    id: '05',
    title: 'C4D建模作品',
    en: 'C4D MOTION COLLECTION',
    category: '3D / Motion / C4D',
    year: '2019',
    image: '/assets/project-3d.jpg',
    coverAspect: '1920 / 1080',
    position: 'center',
    layout: 'half',
    description:
      '以剪纸插画、品牌片头与角色动效为载体，将平面视觉延展为具有节奏感与叙事性的三维动态作品。',
    tags: ['C4D 动效', '片头包装', '剪纸插画'],
    galleryGroups: [
      {
        title: 'C4D 平面视觉',
        images: [
          '/assets/project-c4d-visual-01.png',
          '/assets/project-c4d-visual-02.png',
        ],
      },
      {
        title: 'C4D 动效展示',
        images: [],
        videos: [
          {
            src: '/assets/project-c4d-motion-03.mp4',
            poster: '/assets/project-c4d-motion-03.jpg',
          },
          {
            src: '/assets/project-c4d-motion-04.mp4',
            poster: '/assets/project-c4d-motion-04.jpg',
          },
          {
            src: '/assets/project-c4d-motion-01.mp4',
            poster: '/assets/project-c4d-motion-01.jpg',
          },
          {
            src: '/assets/project-c4d-motion-02.mp4',
            poster: '/assets/project-c4d-motion-02.jpg',
          },
        ],
      },
    ],
  },
  {
    id: '06',
    title: '其他设计作品',
    en: 'BAOZOU MANHUA VISUAL',
    category: 'APP 界面 / Banner',
    year: '2017—2020',
    image: '/assets/project-baozou-01.png',
    coverAspect: '1280 / 720',
    position: 'center',
    layout: 'half',
    description:
      '围绕暴走漫画年轻、夸张且高辨识度的品牌语言，完成启动页与运营 Banner 的整套视觉延展。',
    tags: ['移动端界面', '运营 Banner', '品牌延展'],
    galleryGroups: [
      {
        title: '暴走漫画界面展示',
        images: [
          '/assets/project-baozou-01.png',
          '/assets/project-baozou-02.png',
          '/assets/project-baozou-03.png',
        ],
      },
    ],
  },
]

const CAPABILITIES = [
  {
    id: '01',
    title: '完美项目主导能力',
    details: [
      '需求拆解与项目节奏规划',
      '跨阶段推进视觉落地',
      '把控质量、效率与交付结果',
    ],
    className: 'capability-brand',
  },
  {
    id: '02',
    title: '品牌视觉体系搭建',
    details: [
      '品牌识别系统梳理',
      '视觉规范与延展模板',
      '统一多渠道传播质感',
    ],
    className: 'capability-ai',
  },
  {
    id: '03',
    title: 'AI 设计提效',
    details: ['AI 创意探索', '风格推演与方案筛选', '建立可复用工作流'],
    className: 'capability-product',
  },
  {
    id: '04',
    title: '设计管理统筹',
    details: ['多项目并行排期', '设计标准与复盘沉淀', '稳定交付与风险预判'],
    className: 'capability-motion',
  },
  {
    id: '05',
    title: '跨部门协同',
    details: [
      '连接产品、运营与研发',
      '将设计语言转成执行方案',
      '推动创意进入真实场景',
    ],
    className: 'capability-data',
  },
]

const EXPERIENCES = [
   {
    period: '2020.05 — 2026.02',
    company: '南京深业科技有限公司',
    role: 'UI 设计师',
    focus: '移动端与 PC 视觉',
  },
  {
    period: '2018.09 — 2020.02',
    company: '上海浩方信息技术有限公司',
    role: 'UI 设计师',
    focus: 'UI / 网站视觉 / 设计规范',
  },
   {
    period: '2015.07 — 2018.08',
    company: '西安摩摩信息技术有限公司',
    sub: '暴走漫画',
    role: '视觉设计师',
    focus: '移动端与 PC 视觉 / Banner / 活动运营',
  },
  {
    period: '2011 — 2015',
    company: '武汉纺织大学',
    role: '会计专业 · 统招本科',
    focus: '2015.06 毕业 / 跨专业从事 UI 设计，自学设计工具与前端基础，多年项目实战积累。',
  },
]

function Icon({ name, size = 20 }) {
  const paths = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m14 7 5 5-5 5" />
      </>
    ),
    arrowUp: (
      <>
        <path d="M7 17 17 7" />
        <path d="M8 7h9v9" />
      </>
    ),
    down: (
      <>
        <path d="M12 4v16" />
        <path d="m6 14 6 6 6-6" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    phone: (
      <path d="M8.5 3.5 5.8 4.9a2 2 0 0 0-1 2.4 17.3 17.3 0 0 0 11.9 11.9 2 2 0 0 0 2.4-1l1.4-2.7-4.5-2-1 2.2a14 14 0 0 1-6.7-6.7l2.2-1z" />
    ),
    pin: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12" />
        <path d="M18 6 6 18" />
      </>
    ),
    menu: (
      <>
        <path d="M4 8h16" />
        <path d="M4 16h16" />
      </>
    ),
    copy: (
      <>
        <rect x="8" y="8" width="12" height="12" rx="2" />
        <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    pause: (
      <>
        <path d="M9 7v10" />
        <path d="M15 7v10" />
      </>
    ),
    play: <path d="m9 7 8 5-8 5z" />,
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

function Navigation({ activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 32)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    return () => document.body.classList.remove('menu-open')
  }, [menuOpen])

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <a className="site-brand" href="#home" onClick={() => setMenuOpen(false)}>
        <span className="brand-code">ZC</span>
        <span className="brand-name">
          张灿
          <small>ZHANG CAN</small>
        </span>
      </a>

      <nav className="desktop-nav" aria-label="主导航">
        {NAV_ITEMS.slice(1).map((item) => (
          <a
            href={`#${item.id}`}
            key={item.id}
            className={activeSection === item.id ? 'is-active' : ''}
          >
            <small>{item.en}</small>
            <span>{item.label}</span>
          </a>
        ))}
      </nav>

      <div className="header-actions">
        <a className="header-contact" href="#contact">
          LET&apos;S TALK
          <Icon name="arrowUp" size={16} />
        </a>
        <button
          className="menu-button"
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
        >
          <Icon name={menuOpen ? 'close' : 'menu'} size={24} />
        </button>
      </div>

      <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`}>
        <div className="mobile-menu-meta">
          <span>PORTFOLIO / 2026</span>
          <span>NANJING, CN</span>
        </div>
        <nav aria-label="移动端导航">
          {NAV_ITEMS.map((item, index) => (
            <a
              href={`#${item.id}`}
              key={item.id}
              onClick={() => setMenuOpen(false)}
            >
              <small>0{index + 1}</small>
              <span>{item.label}</span>
              <em>{item.en}</em>
            </a>
          ))}
        </nav>
        <a className="mobile-menu-mail" href={`mailto:${CONTACT.email}`}>
          {CONTACT.email}
          <Icon name="arrowUp" size={22} />
        </a>
      </div>
    </header>
  )
}

function Hero() {
  const videoRef = useRef(null)
  const [videoPlaying, setVideoPlaying] = useState(true)

  const toggleVideo = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play()
      setVideoPlaying(true)
    } else {
      video.pause()
      setVideoPlaying(false)
    }
  }

  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero-media" aria-hidden="true">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/assets/project-3d.jpg"
          onPlay={() => setVideoPlaying(true)}
          onPause={() => setVideoPlaying(false)}
        >
          <source src="/assets/hero-reel.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-vignette" aria-hidden="true" />
      <div className="noise" aria-hidden="true" />

      <div className="hero-frame page-wrap">
        <div className="hero-meta">
          <span>PORTFOLIO / 2026</span>
          <span className="availability">
            <i />
            AVAILABLE FOR SELECTED PROJECTS
          </span>
          <span>32.0603° N / 118.7969° E</span>
        </div>

        <div className="hero-main">
          <p className="hero-role">
            视觉设计师 <i>×</i> AI 设计师 <i>×</i> 品牌设计师
          </p>
          <h1 id="hero-title">
            <span className="hero-line">
              <span className="hero-line-inner">在秩序与想象</span>
            </span>
            <span className="hero-line-indent">
              <span className="hero-line-inner">
                之间<span className="serif-word">，</span>
              </span>
            </span>
            <span className="hero-line-last">
              <span className="hero-line-inner">
                创造品牌印象<span className="accent-mark">。</span>
              </span>
            </span>
          </h1>
        </div>

        <ShowcaseShelf />

        <div className="hero-bottom hero-bottom-after-shelf">
          <p className="hero-summary">
            我是张灿，一名跨越品牌、数字产品与 AI 创意的视觉设计师。
            擅长把复杂的信息转化为清晰、克制而富有记忆点的视觉体验。
          </p>
          <div className="hero-actions">
            <a className="button button-accent" href="#projects">
              浏览精选项目
              <Icon name="down" size={18} />
            </a>
            <a className="text-link" href="#about">
              发起合作
              <Icon name="arrowUp" size={17} />
            </a>
          </div>
          <div className="hero-scroll">
            <span>SCROLL TO EXPLORE</span>
            <i>
              <Icon name="down" size={17} />
            </i>
          </div>
        </div>
      </div>

      <div className="hero-side-label" aria-hidden="true">
        <span>DESIGNING BETWEEN LOGIC &amp; IMAGINATION</span>
        <i />
      </div>

      <button
        className="video-toggle"
        type="button"
        onClick={toggleVideo}
        aria-label={videoPlaying ? '暂停背景视频' : '播放背景视频'}
      >
        <span>{videoPlaying ? 'REEL PLAYING' : 'REEL PAUSED'}</span>
        <Icon name={videoPlaying ? 'pause' : 'play'} size={15} />
      </button>

      <div className="opening-curtain" aria-hidden="true">
        <div className="opening-curtain-inner">
          <span className="opening-mark">
            ZHANG CAN <i>/</i> 个人简历
          </span>
          <i className="opening-line" />
        </div>
      </div>
    </section>
  )
}

function SectionHeading({ id, number, eyebrow, enTitle, title, copy }) {
  return (
    <div className="section-heading">
      <span className="section-english-title" aria-hidden="true">
        {enTitle}
      </span>
      <div className="section-index">
        <span>{number}</span>
        <i />
        <span>{eyebrow}</span>
      </div>
      <h2 id={id}>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  )
}

function AnimatedStat({ value, suffix, label, meta }) {
  const [active, setActive] = useState(false)
  const renderValue = () => (
    <>
      {value}
      {suffix && <span className="stat-number-plus">{suffix}</span>}
    </>
  )

  return (
    <div
      className={`stat-item${active ? ' is-active' : ''}`}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <strong className="stat-number">
        <span className="stat-number-base">{renderValue()}</span>
        <span className="stat-number-gradient" aria-hidden="true">
          <GradientText
            colors={['#c8ff62', '#effff3', '#52f45d']}
            animationSpeed={7}
            variant="flow"
            scale={2.4}
            glow={0.38}
            paused={!active}
          >
            {renderValue()}
          </GradientText>
        </span>
      </strong>
      <p>{label}</p>
      <small>{meta}</small>
    </div>
  )
}

function About() {
  return (
    <section className="about section" id="about" aria-labelledby="about-title">
      <div className="page-wrap">
        <SectionHeading
          id="about-title"
          number="01"
          eyebrow="ABOUT"
          enTitle="ABOUT / PROFILE"
          title={
            <>
              理性建立秩序
              <br />
              <span>感性留下记忆。</span>
            </>
          }
          copy="从平面到屏幕，从静态到动态，我持续在品牌表达与数字体验之间寻找新的连接方式。"
        />

        <div className="about-layout">
          <div className="portrait-column" data-reveal>
            <div className="portrait-image">
              <img src="/assets/portrait.jpg" alt="张灿职业形象照" />
              <span className="image-corner image-corner-top" />
              <span className="image-corner image-corner-bottom" />
              <div className="portrait-label">
                <span>ZHANG CAN</span>
                <span>VISUAL DESIGNER</span>
              </div>
            </div>
            <div className="portrait-meta">
              <span>PORTRAIT / 01</span>
              <span>NANJING · CHINA</span>
            </div>
          </div>

          <div className="about-content">
            <div className="about-copy" data-reveal>
              <p className="about-lead">
                我是张灿，现居南京。
                <br />
                一名跨越<em>品牌、数字产品与 AI 创意</em>的视觉设计师。
              </p>
              <p>
                拥有 7 年多设计经验，熟悉 Android、iOS、Web 设计规范，可独立完成原型搭建与 UI 视觉输出。
                擅长沟通协作，执行力强；熟练掌握 Figma、XD、Axure、PS、AI、AE 等设计工具，精通各类办公软件，
                能够高效对接产品、研发团队，保障设计方案顺利落地。
              </p>
              <p>
                如今，我也将 AI 纳入创作流程，用于拓展灵感、快速验证风格和提升协作效率。
                工具在变，但设计的核心始终是判断、取舍与共情。
              </p>
            </div>

            <div className="contact-strip" data-reveal>
              <a href={`mailto:${CONTACT.email}`}>
                <span>
                  <Icon name="mail" size={17} />
                  EMAIL
                </span>
                <strong>{CONTACT.email}</strong>
                <Icon name="arrowUp" size={18} />
              </a>
              <a href={CONTACT.phoneHref}>
                <span>
                  <Icon name="phone" size={17} />
                  PHONE
                </span>
                <strong>{CONTACT.phone}</strong>
                <Icon name="arrowUp" size={18} />
              </a>
              <div>
                <span>
                  <Icon name="pin" size={17} />
                  BASE
                </span>
                <strong>{CONTACT.location}</strong>
              </div>
            </div>

            <div className="stats" data-reveal>
              <AnimatedStat
                value="10"
                suffix="+"
                label="年设计实践"
                meta="SINCE 2015"
              />
              <AnimatedStat
                value="20"
                suffix="+"
                label="品牌与数字项目"
                meta="SELECTED ARCHIVE"
              />
              <AnimatedStat
                value="05"
                label="核心能力方向"
                meta="MULTI-DISCIPLINARY"
              />
            </div>
          </div>
        </div>

        <div className="experience-block" data-reveal>
          <div className="experience-head">
            <span>EXPERIENCE</span>
            <h3>工作与教育经历</h3>
          </div>
          <div className="experience-list">
            {EXPERIENCES.map((experience) => (
              <article key={experience.period}>
                <span className="experience-period">{experience.period}</span>
                <div>
                  <h4>
                    {experience.company}
                    {experience.sub && <small>{experience.sub}</small>}
                  </h4>
                  <p>{experience.role}</p>
                </div>
                <span className="experience-focus">{experience.focus}</span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function DisciplineMarquee() {
  const items = ['VISUAL DESIGN', 'AI CREATIVE', 'BRAND SYSTEM', 'DIGITAL PRODUCT', 'MOTION & 3D']
  const marqueeRef = useRef(null)
  const [copiesPerGroup, setCopiesPerGroup] = useState(3)

  useEffect(() => {
    const marquee = marqueeRef.current
    if (!marquee) return undefined

    const updateCopies = () => {
      const group = marquee.querySelector('.marquee-group')
      if (!group) return

      const groupWidth = group.getBoundingClientRect().width
      const oneSequenceWidth = groupWidth / copiesPerGroup
      if (oneSequenceWidth <= 0) return

      const requiredCopies = Math.max(
        1,
        Math.ceil(marquee.clientWidth / oneSequenceWidth),
      )
      setCopiesPerGroup((current) =>
        current === requiredCopies ? current : requiredCopies,
      )
    }

    const observer = new ResizeObserver(updateCopies)
    observer.observe(marquee)
    updateCopies()

    return () => observer.disconnect()
  }, [copiesPerGroup])

  return (
    <div
      ref={marqueeRef}
      className="discipline-marquee"
      aria-hidden="true"
    >
      <div className="marquee-track">
        {[0, 1].map((groupIndex) => (
          <div className="marquee-group" key={groupIndex}>
            {Array.from({ length: copiesPerGroup }).map(
              (_, copyIndex) =>
                items.map((item, itemIndex) => (
                  <span
                    key={`${groupIndex}-${copyIndex}-${itemIndex}`}
                  >
                    {item}
                    <i>✦</i>
                  </span>
                )),
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function ProjectCard({ project, onOpen }) {
  return (
    <article
      className={`project-card project-${project.layout}`}
      data-reveal
    >
      <button
        type="button"
        className="project-button"
        onClick={() => onOpen(project)}
        aria-label={`查看项目：${project.title}`}
      >
        <div
          className="project-media"
          style={{ aspectRatio: project.coverAspect }}
        >
          <div className="project-image-motion">
            <img
              src={project.image}
              alt={`${project.title}项目视觉`}
              style={{ objectPosition: project.position }}
              loading="lazy"
            />
          </div>
          <div className="project-shade" />
          <div className="project-topline">
            <span>{project.category}</span>
            <span>{project.year}</span>
          </div>
          <span className="project-arrow">
            <Icon name="arrowUp" size={21} />
          </span>
          <div className="project-hover-label">
            <span>VIEW CASE</span>
            <i />
          </div>
        </div>
        <div className="project-body">
          <span className="project-number">{project.id}</span>
          <div>
            <h3>{project.title}</h3>
            <p>{project.en}</p>
          </div>
          <div className="project-tags">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </button>
    </article>
  )
}

function Projects({ onOpen }) {
  return (
    <>
      <DisciplineMarquee />
      <section className="projects section" id="projects" aria-labelledby="projects-title">
        <div className="page-wrap">
          <SectionHeading
            id="projects-title"
            number="02"
            eyebrow="SELECTED WORK"
            enTitle="SELECTED / WORKS"
            title={
              <>
                精选作品
                <span className="title-count">〔 06 〕</span>
              </>
            }
            copy="不追求单一风格，而是为每一个问题找到准确的视觉语言。点击项目，查看更大的画面。"
          />

          <div className="project-grid">
            {PROJECTS.map((project) => (
              <ProjectCard project={project} key={project.id} onOpen={onOpen} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function ProjectModal({ project, onClose }) {
  const closeButtonRef = useRef(null)
  const viewerRef = useRef(null)
  const galleryRef = useRef(null)
  const dragStateRef = useRef(null)
  const [activeMediaKey, setActiveMediaKey] = useState(null)
  const [zoom, setZoom] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 })
  const [naturalSize, setNaturalSize] = useState(null)
  const [dragging, setDragging] = useState(false)
  const minZoom = 0.4
  const maxZoom = 4

  const galleryGroups =
    project?.galleryGroups?.length > 0
      ? project.galleryGroups
      : project
        ? [{ title: '项目视觉', images: [project.image] }]
        : []

  const galleryItems = galleryGroups.flatMap((group, groupIndex) => {
    const videos = (group.videos || []).map((video, videoIndex) => ({
      key: `${project?.id || 'project'}-${groupIndex}-video-${videoIndex}-${video.src}`,
      src: video.src,
      poster: video.poster || project?.image,
      type: 'video',
      groupTitle: group.title,
      alt: `${project?.title || '项目'} - ${group.title}视频`,
    }))
    const images = (group.images || []).map((src, imageIndex) => ({
      key: `${project?.id || 'project'}-${groupIndex}-image-${imageIndex}-${src}`,
      src,
      type: 'image',
      groupTitle: group.title,
      alt: `${project?.title || '项目'} - ${group.title} ${imageIndex + 1}`,
    }))

    return [...videos, ...images]
  })

  const activeMedia =
    galleryItems.find((media) => media.key === activeMediaKey) ||
    galleryItems[0] ||
    null
  const activeMediaIndex = Math.max(
    galleryItems.findIndex((media) => media.key === activeMedia?.key),
    0,
  )

  const fitScale =
    naturalSize && viewportSize.width > 0 && viewportSize.height > 0
      ? Math.min(
          viewportSize.width / naturalSize.width,
          viewportSize.height / naturalSize.height,
          1,
        )
      : 1
  const baseImageWidth = naturalSize ? naturalSize.width * fitScale : 0
  const baseImageHeight = naturalSize ? naturalSize.height * fitScale : 0

  const constrainOffset = (nextOffset, nextZoom = zoom) => {
    const maxX = Math.max(
      (baseImageWidth * nextZoom - viewportSize.width) / 2,
      0,
    )
    const maxY = Math.max(
      (baseImageHeight * nextZoom - viewportSize.height) / 2,
      0,
    )

    return {
      x: Math.max(-maxX, Math.min(maxX, nextOffset.x)),
      y: Math.max(-maxY, Math.min(maxY, nextOffset.y)),
    }
  }

  useEffect(() => {
    if (!project) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [project, onClose])

  useEffect(() => {
    const viewer = viewerRef.current
    if (!project || !viewer) return undefined

    const updateViewport = () => {
      setViewportSize({
        width: viewer.clientWidth,
        height: viewer.clientHeight,
      })
    }

    updateViewport()
    const observer = new ResizeObserver(updateViewport)
    observer.observe(viewer)
    window.addEventListener('resize', updateViewport)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateViewport)
    }
  }, [project])

  useEffect(() => {
    setZoom(1)
    setOffset({ x: 0, y: 0 })
    setNaturalSize(null)
    dragStateRef.current = null
    setDragging(false)
  }, [activeMedia?.key])

  useEffect(() => {
    if (!naturalSize) return
    setOffset((current) => constrainOffset(current, zoom))
  }, [zoom, naturalSize, viewportSize.width, viewportSize.height])

  useEffect(() => {
    const viewer = viewerRef.current
    if (!project || !viewer) return undefined

    const handleWheel = (event) => {
      if (activeMedia?.type !== 'image' || !naturalSize) return
      event.preventDefault()

      const nextZoom = Math.max(
        minZoom,
        Math.min(
          maxZoom,
          Number((zoom * (event.deltaY < 0 ? 1.12 : 0.89)).toFixed(3)),
        ),
      )
      const maxX = Math.max(
        (baseImageWidth * nextZoom - viewportSize.width) / 2,
        0,
      )
      const maxY = Math.max(
        (baseImageHeight * nextZoom - viewportSize.height) / 2,
        0,
      )

      setZoom(nextZoom)
      setOffset((current) => ({
        x: Math.max(-maxX, Math.min(maxX, current.x)),
        y: Math.max(-maxY, Math.min(maxY, current.y)),
      }))
    }

    viewer.addEventListener('wheel', handleWheel, { passive: false })
    return () => viewer.removeEventListener('wheel', handleWheel)
  }, [
    project,
    activeMedia?.type,
    naturalSize,
    zoom,
    baseImageWidth,
    baseImageHeight,
    viewportSize.width,
    viewportSize.height,
  ])

  if (!project) return null

  const changeZoom = (factor) => {
    const nextZoom = Math.max(
      minZoom,
      Math.min(maxZoom, Number((zoom * factor).toFixed(3))),
    )
    setZoom(nextZoom)
    setOffset((current) => constrainOffset(current, nextZoom))
  }

  const resetViewer = () => {
    setZoom(1)
    setOffset({ x: 0, y: 0 })
  }

  const handlePointerDown = (event) => {
    if (activeMedia?.type !== 'image' || event.button !== 0 || !naturalSize) {
      return
    }
    event.preventDefault()
    event.currentTarget.setPointerCapture(event.pointerId)
    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: offset.x,
      originY: offset.y,
    }
    setDragging(true)
  }

  const handlePointerMove = (event) => {
    const dragState = dragStateRef.current
    if (!dragState || dragState.pointerId !== event.pointerId) return

    setOffset(
      constrainOffset(
        {
          x: dragState.originX + event.clientX - dragState.startX,
          y: dragState.originY + event.clientY - dragState.startY,
        },
        zoom,
      ),
    )
  }

  const endPointerDrag = (event) => {
    if (!dragStateRef.current) return
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    dragStateRef.current = null
    setDragging(false)
  }

  const selectMedia = (media) => {
    setActiveMediaKey(media.key)
    if (window.matchMedia('(max-width: 820px)').matches) {
      window.requestAnimationFrame(() => {
        viewerRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
      })
    }
  }

  return (
    <div
      className="project-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <SecondaryBackground className="project-modal-background" />
      <button
        className="modal-backdrop"
        type="button"
        onClick={onClose}
        aria-label="关闭项目详情"
      />
      <div className="modal-panel">
        <section className="modal-viewer" aria-label={`${project.title}媒体查看器`}>
          <div
            ref={viewerRef}
            className={`modal-image-stage${
              activeMedia?.type === 'video' ? ' is-video' : ''
            }${dragging ? ' is-dragging' : ''}`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={endPointerDrag}
            onPointerCancel={endPointerDrag}
            onLostPointerCapture={endPointerDrag}
            onDoubleClick={
              activeMedia?.type === 'image' ? resetViewer : undefined
            }
          >
            <div className="modal-stage-grid" aria-hidden="true" />
            {activeMedia?.type === 'video' && (
              <div className="modal-video-frame">
                <video
                  key={activeMedia.key}
                  src={activeMedia.src}
                  poster={activeMedia.poster}
                  controls
                  playsInline
                  preload="metadata"
                  aria-label={activeMedia.alt}
                />
              </div>
            )}
            {activeMedia?.type === 'image' && (
              <div
                key={activeMedia.key}
                className="modal-image-transform"
                style={{
                  left: `calc(50% + ${offset.x}px)`,
                  top: `calc(50% + ${offset.y}px)`,
                  width: `${baseImageWidth || 1}px`,
                  height: `${baseImageHeight || 1}px`,
                  opacity: naturalSize ? 1 : 0,
                  transform: `translate(-50%, -50%) scale(${zoom})`,
                }}
              >
                <img
                  src={activeMedia.src}
                  alt={activeMedia.alt}
                  draggable="false"
                  onLoad={(event) => {
                    setNaturalSize({
                      width: event.currentTarget.naturalWidth,
                      height: event.currentTarget.naturalHeight,
                    })
                  }}
                />
              </div>
            )}
            {activeMedia?.type === 'image' && !naturalSize && (
              <span className="modal-image-loading">LOADING VISUAL</span>
            )}
            <div className="modal-viewer-topline">
              <span>{activeMedia?.groupTitle || '项目视觉'}</span>
              <span>
                {String(activeMediaIndex + 1).padStart(2, '0')} /{' '}
                {String(galleryItems.length).padStart(2, '0')}
              </span>
            </div>
            {activeMedia?.type === 'image' && (
              <div
                className="modal-zoom-controls"
                aria-label="图片缩放控制"
                onPointerDown={(event) => event.stopPropagation()}
                onDoubleClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => changeZoom(0.82)}
                  disabled={zoom <= minZoom}
                  aria-label="缩小图片"
                >
                  −
                </button>
                <button
                  type="button"
                  className="modal-zoom-value"
                  onClick={resetViewer}
                  aria-label="恢复默认缩放"
                >
                  {Math.round(zoom * 100)}%
                </button>
                <button
                  type="button"
                  onClick={() => changeZoom(1.22)}
                  disabled={zoom >= maxZoom}
                  aria-label="放大图片"
                >
                  +
                </button>
              </div>
            )}
            {activeMedia?.type === 'image' && (
              <div className="modal-viewer-hint">
                <span>按住鼠标拖拽查看</span>
                <i />
                <span>滚轮缩放</span>
              </div>
            )}
          </div>
        </section>

        <aside className="modal-sidebar">
          <button
            ref={closeButtonRef}
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="关闭"
          >
            <Icon name="close" size={23} />
          </button>

          <div className="modal-sidebar-scroll">
            <header className="modal-project-header">
              <span className="modal-index">PROJECT / {project.id}</span>
              <h2 id="project-modal-title">{project.title}</h2>
              <p className="modal-en">{project.en}</p>
              <p className="modal-description">{project.description}</p>
              <div className="modal-meta">
                <div>
                  <span>DISCIPLINE</span>
                  <strong>{project.category}</strong>
                </div>
                <div>
                  <span>YEAR</span>
                  <strong>{project.year}</strong>
                </div>
              </div>
              <div className="modal-tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </header>

            <div className="modal-actions">
              <button
                type="button"
                className="modal-action modal-action--primary"
                onClick={() =>
                  galleryRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                  })
                }
              >
                查看更多
                <Icon name="down" size={16} />
              </button>
              <a className="modal-action" href={`mailto:${CONTACT.email}`}>
                发起合作
                <Icon name="arrowUp" size={16} />
              </a>
            </div>

            <section ref={galleryRef} className="modal-gallery">
              <div className="modal-gallery-intro">
                <span>PROJECT GALLERY</span>
                <small>{galleryItems.length} ITEMS</small>
              </div>
              {galleryGroups.map((group) => {
                const groupItems = galleryItems.filter(
                  (media) => media.groupTitle === group.title,
                )

                return (
                  <div className="modal-gallery-group" key={group.title}>
                    <div className="modal-gallery-heading">
                      <h3>{group.title}</h3>
                      <span>{String(groupItems.length).padStart(2, '0')}</span>
                    </div>
                    <div className="modal-thumb-grid">
                      {groupItems.map((media) => {
                        const isActive = media.key === activeMedia?.key

                        return (
                          <button
                            type="button"
                            className={`modal-thumb${isActive ? ' is-active' : ''}`}
                            key={media.key}
                            onClick={() => selectMedia(media)}
                            aria-pressed={isActive}
                            aria-label={`查看${media.alt}`}
                          >
                            <img src={media.poster || media.src} alt="" loading="lazy" />
                            {media.type === 'video' && (
                              <span className="modal-thumb-play" aria-hidden="true">
                                <Icon name="play" size={18} />
                              </span>
                            )}
                            <i aria-hidden="true" />
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </section>
          </div>
        </aside>
      </div>
    </div>
  )
}

function Capabilities() {
  return (
    <section
      className="capabilities section"
      id="capabilities"
      aria-labelledby="capabilities-title"
    >
      <div className="page-wrap">
        <SectionHeading
          id="capabilities-title"
          number="03"
          eyebrow="WHAT I DO"
          enTitle="CORE / STRENGTHS"
          title={
            <>
              从策略判断
              <br />
              <span>到视觉落地。</span>
            </>
          }
          copy="设计师的价值不止于完成一张画面，而是理解问题、建立系统，并让每一个细节服务于最终体验。"
        />

        <div className="capability-grid">
          {CAPABILITIES.map((capability, index) => (
            <div
              className={`capability-reveal capability-reveal-${index + 1}`}
              key={capability.id}
              data-reveal
            >
              <BorderGlow
                className="capability-glow"
                edgeSensitivity={30}
                glowColor="124 88 64"
                backgroundColor="#120F17"
                borderRadius={28}
                glowRadius={40}
                glowIntensity={0.4}
                coneSpread={25}
                alwaysOn
                flow
                colors={['#52f45d', '#10b981', '#38bdf8']}
                fillOpacity={0.2}
              >
                <article className={`capability-card ${capability.className}`}>
                  <div className="capability-head">
                    <span className="capability-number">{capability.id}</span>
                    <span className="capability-type">
                      {index < 2 ? 'CORE' : 'SYSTEM'}
                    </span>
                  </div>
                  <div className="capability-graphic" aria-hidden="true">
                    <span />
                    <i />
                    <b />
                  </div>
                  <div className="capability-content">
                    <h3>{capability.title}</h3>
                  </div>
                  <div className="capability-details">
                    {capability.details.map((detail) => (
                      <span key={detail}>{detail}</span>
                    ))}
                  </div>
                </article>
              </BorderGlow>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${CONTACT.email}`
    }
  }

  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="contact-grid" aria-hidden="true" />
      <div className="contact-glow" aria-hidden="true" />
      <div className="noise" aria-hidden="true" />

      <div className="page-wrap contact-wrap">
        <span className="contact-english-title" aria-hidden="true">
          LET&apos;S / CREATE
        </span>
        <div className="contact-topline">
          <span>04 / CONTACT</span>
          <span className="availability">
            <i />
            OPEN FOR COLLABORATION
          </span>
        </div>

        <div className="contact-main">
          <p className="contact-kicker">
            HAVE A PROJECT IN MIND?
          </p>
          <h2 id="contact-title">
            有项目？
            <br />
            <span>那我们从一次对话开始。</span>
          </h2>

          <div className="contact-email-row">
            <a href={`mailto:${CONTACT.email}`} className="contact-email">
              {CONTACT.email}
              <span>
                <Icon name="arrowUp" size={28} />
              </span>
            </a>
            <button className="copy-email" type="button" onClick={copyEmail}>
              <Icon name={copied ? 'check' : 'copy'} size={16} />
              {copied ? '已复制' : '复制邮箱'}
            </button>
          </div>
        </div>

        <div className="contact-bottom">
          <div className="contact-details">
            <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
            <span>{CONTACT.location}</span>
            <span>视觉设计 / AI 创意 / 品牌体验</span>
          </div>
          <div className="contact-symbol" aria-hidden="true">
            <span>LET&apos;S</span>
            <strong>ZC</strong>
            <span>CREATE</span>
          </div>
          <a className="back-top" href="#home">
            BACK TO TOP
            <Icon name="arrowUp" size={18} />
          </a>
        </div>

        <footer className="site-footer">
          <span>© 2026 ZHANG CAN. ALL RIGHTS RESERVED.</span>
          <span>DESIGNED WITH CURIOSITY &amp; LOGIC.</span>
        </footer>
      </div>
    </section>
  )
}

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [activeSection, setActiveSection] = useState('home')
  const [scrollProgress, setScrollProgress] = useState(0)

  usePortfolioMotion()

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-38% 0px -52% 0px', threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(maxScroll > 0 ? window.scrollY / maxScroll : 0)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="site">
      <a className="skip-link" href="#main">
        跳至主要内容
      </a>
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />
      <Navigation activeSection={activeSection} />
      <main id="main">
        <Hero />
        <div className="ghost-background-zone">
          <div className="ghost-background-visual" aria-hidden="true">
            <GhostFibers
              glowColor="#52f45d"
              secondaryColor="#10b981"
              lineColor="#effff3"
              layers={3}
              threads={48}
              density={0.55}
              thickness={0.9}
              speed={0.08}
              flow={0.02}
              waves={1.05}
              twist={1.25}
              spread={1.05}
              perspective={0.68}
              depthOfField={0.92}
              particles={0.24}
              sparkle={0.32}
              glow={0.42}
              brightness={0.68}
              vignette={0.34}
              grain={0.025}
              mouseInteraction
              hoverEffect="focus"
              mouseStrength={0.8}
              pulseOnClick
              intro
            />
          </div>
          <About />
          <Projects onOpen={setSelectedProject} />
          <Capabilities />
          <Contact />
        </div>
      </main>
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  )
}
