import { useEffect, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, X, Github, FileText, Play, Rocket, Award } from 'lucide-react'
import { featured, projectDetails, type ProjectLink as Link_ } from '../content'
import Backdrop from '../components/Backdrop'

const COLOR_NAME = '#2F5D50'

/** 单张截图：圆角卡片 + 下方说明，cls 可单独控制缩放/微调；支持点击放大 */
function GalleryFigure({ g, onOpen }: { g: { src: string; caption: string; cls?: string }; onOpen?: () => void }) {
  return (
    <figure className={g.cls ?? ''}>
      <div
        className="rounded-2xl overflow-hidden glass-card cursor-zoom-in"
        onClick={onOpen}
        role="button"
        aria-label={`放大查看：${g.caption}`}
      >
        <img src={g.src} alt={g.caption} loading="lazy" className="w-full h-auto" />
      </div>
      {g.caption && (
        <figcaption className="mt-2.5 px-1 text-xs text-muted-foreground">{g.caption}</figcaption>
      )}
    </figure>
  )
}

function DetailLink({ link }: { link: Link_ }) {
  const icon =
    link.kind === 'github' ? <Github size={15} /> :
    link.kind === 'pdf' ? <FileText size={15} /> :
    link.kind === 'video' ? <Play size={15} /> :
    <Rocket size={15} />

  if (link.pending) {
    return (
      <span className="inline-flex items-center gap-2 text-sm px-5 py-2.5 rounded-full border border-dashed border-border text-muted-foreground cursor-not-allowed">
        {icon}
        {link.label} · 部署中
      </span>
    )
  }
  const primary = link.kind === 'demo'
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noreferrer"
      className={
        primary
          ? 'inline-flex items-center gap-2 text-sm px-5 py-2.5 rounded-full bg-pine text-cream hover:bg-pine/85 transition-colors'
          : 'inline-flex items-center gap-2 text-sm px-5 py-2.5 rounded-full border border-border text-foreground/75 hover:border-pine hover:text-pine transition-colors'
      }
    >
      {icon}
      {link.label}
    </a>
  )
}

export default function ProjectDetail() {
  const { id } = useParams()
  const reduce = useReducedMotion()
  const project = id ? projectDetails[id] : undefined
  /* 灯箱：当前放大的截图下标，null 为关闭 */
  const [lightbox, setLightbox] = useState<number | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    setLightbox(null)
  }, [id])

  /* 灯箱键盘操作：Esc 关闭，左右方向键切换 */
  const total = project?.gallery.length ?? 0
  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowLeft') setLightbox((v) => (v === null ? v : (v - 1 + total) % total))
      if (e.key === 'ArrowRight') setLightbox((v) => (v === null ? v : (v + 1) % total))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, total])

  if (!project) return <Navigate to="/" replace />

  /* 重点项目之间可直接前后跳转 */
  const idx = featured.findIndex((p) => p.id === id)
  const prev = idx > 0 ? featured[idx - 1] : idx === 0 ? featured[featured.length - 1] : undefined
  const next = idx >= 0 ? featured[(idx + 1) % featured.length] : undefined

  const fadeUp = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
  })

  return (
    <div className="min-h-[100dvh]">
      <Backdrop />

      {/* 顶栏：返回（玻璃磨砂背景） */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-cream/70 backdrop-blur-xl border-b border-white/50 shadow-[0_1px_12px_hsl(178_20%_40%/0.06)]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={17} />
            返回首页
          </Link>
        </div>
      </header>

      <main className="relative max-w-4xl mx-auto px-6 pt-28 pb-24">
        {/* 头部：名称 + 元信息 */}
        <motion.div {...fadeUp(0)}>
          <p className="font-mono-en text-xs tracking-[0.3em] text-petal-deep uppercase">
            {project.kind}
          </p>
          <h1
            className="mt-3 text-4xl md:text-5xl font-bold tracking-tight"
            style={{ color: COLOR_NAME }}
          >
            {project.title}
          </h1>
          <p className="font-mono-en text-sm text-petal-deep mt-2 italic">{project.enSub}</p>

          <div className="mt-5 flex flex-wrap gap-2 text-xs">
            <span className="px-3 py-1.5 rounded-full glass-card text-foreground/75">{project.period}</span>
            <span className="px-3 py-1.5 rounded-full glass-card text-foreground/75">{project.kind}</span>
            <span className="px-3 py-1.5 rounded-full glass-card text-foreground/75">{project.role}</span>
            {project.award && (
              <span className="px-3 py-1.5 rounded-full bg-petal-light/80 text-petal-deep font-medium inline-flex items-center gap-1.5">
                <Award size={13} />
                {project.award}
              </span>
            )}
          </div>

          <p className="mt-6 text-base text-muted-foreground leading-relaxed max-w-2xl">
            {project.intro}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {project.links.map((l) => (
              <DetailLink key={l.label} link={l} />
            ))}
          </div>
        </motion.div>

        {/* 简历项目介绍 */}
        <motion.section {...fadeUp(0.1)} className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">项目介绍</h2>
          <div className="flex flex-col gap-4">
            {project.resumePoints.map((p, i) => (
              <div key={p.title} className="glass-card rounded-3xl p-6 flex gap-5">
                <span className="font-poster text-2xl text-petal-deep/70 shrink-0 w-8">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-bold">{p.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* README 核心内容 / 研究结果 */}
        {(project.readme ?? project.findings) && (
          <motion.section {...fadeUp(0.15)} className="mt-16">
            <h2 className="text-2xl font-bold tracking-tight mb-6">
              {project.readme ? 'README 核心内容' : '研究结果'}
            </h2>
            <div className="flex flex-col gap-8">
              {(project.readme ?? project.findings)!.map((sec) => (
                <div key={sec.heading}>
                  <h3 className="font-bold text-petal-deep">{sec.heading}</h3>
                  <ul className="mt-3 flex flex-col gap-2.5">
                    {sec.points.map((pt) => (
                      <li key={pt} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                        <span aria-hidden className="mt-2 w-1.5 h-1.5 rounded-full bg-petal shrink-0" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* 演示视频（Bilibili 嵌入播放器） */}
        {project.video && (
          <motion.section {...fadeUp(0.18)} className="mt-16">
            <h2 className="text-2xl font-bold tracking-tight mb-6">演示视频</h2>
            <div className="rounded-3xl overflow-hidden glass-card">
              <iframe
                src={project.video.url}
                title={project.video.title}
                loading="lazy"
                scrolling="no"
                allowFullScreen
                className="w-full aspect-video border-0 bg-black"
              />
            </div>
            <p className="mt-2.5 px-1 text-xs text-muted-foreground">
              嵌入 Bilibili 播放器；
              <a
                href="https://www.bilibili.com/video/BV1jfu26QE1K/"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 decoration-petal-deep hover:decoration-pine ml-1"
              >
                在 Bilibili 打开 ↗
              </a>
            </p>
          </motion.section>
        )}

        {/* 产品截图 / 在线页面嵌入 */}
        {project.embed ? (
          <motion.section {...fadeUp(0.2)} className="mt-16">
            <h2 className="text-2xl font-bold tracking-tight mb-6">{project.embed.title}</h2>
            <div className="rounded-3xl overflow-hidden glass-card">
              <iframe
                src={project.embed.url}
                title={project.embed.title}
                loading="lazy"
                className="w-full h-[75vh] border-0 bg-white"
              />
            </div>
            <p className="mt-2.5 px-1 text-xs text-muted-foreground">
              嵌入实时页面，可在框内滚动浏览；
              <a
                href={project.embed.url}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 decoration-petal-deep hover:decoration-pine ml-1"
              >
                在新标签页打开 ↗
              </a>
            </p>
          </motion.section>
        ) : project.gallery.length > 0 ? (
          <motion.section {...fadeUp(0.2)} className="mt-16">
            <h2 className="text-2xl font-bold tracking-tight mb-6">产品截图</h2>
            {project.galleryNote && (
              <p className="-mt-3 mb-6 text-sm text-muted-foreground">{project.galleryNote}</p>
            )}
            {project.galleryLayout === 'flow' ? (
              /* 单列从头到尾完整展示（如整份 PPT） */
              <div className="flex flex-col gap-6">
                {project.gallery.map((g, i) => (
                  <GalleryFigure key={g.src} g={g} onOpen={() => setLightbox(i)} />
                ))}
              </div>
            ) : (
              <>
                {/* 移动端：单列按顺序 */}
                <div className="sm:hidden flex flex-col gap-6">
                  {project.gallery.map((g, i) => (
                    <GalleryFigure key={g.src} g={g} onOpen={() => setLightbox(i)} />
                  ))}
                </div>
                {/* 桌面端：左右两列独立向下流动，右列整体错开（danielsun 式自然错落） */}
                <div className="hidden sm:grid grid-cols-2 gap-8 items-start">
                  <div className="flex flex-col gap-[72px]">
                    {project.gallery
                      .map((g, i) => ({ g, i }))
                      .filter(({ i }) => i % 2 === 0)
                      .map(({ g, i }) => (
                        <GalleryFigure key={g.src} g={g} onOpen={() => setLightbox(i)} />
                      ))}
                  </div>
                  <div className="flex flex-col gap-14 mt-10">
                    {project.gallery
                      .map((g, i) => ({ g, i }))
                      .filter(({ i }) => i % 2 === 1)
                      .map(({ g, i }) => (
                        <GalleryFigure key={g.src} g={g} onOpen={() => setLightbox(i)} />
                      ))}
                  </div>
                </div>
              </>
            )}
          </motion.section>
        ) : null}

        {/* 底部导航：上一个项目 / 返回首页 / 下一个项目 */}
        <motion.div {...fadeUp(0.25)} className="mt-20">
          <div className="flex items-stretch justify-between gap-3">
            {prev ? (
              <Link
                to={`/project/${prev.id}`}
                className="group flex items-center gap-3 rounded-2xl glass-card px-5 py-4 hover:border-pine transition-colors max-w-[38%]"
              >
                <ArrowLeft size={16} className="shrink-0 text-muted-foreground group-hover:text-pine transition-colors" />
                <span className="min-w-0">
                  <span className="block text-[11px] text-muted-foreground">上一个项目</span>
                  <span className="block text-sm font-semibold truncate">{prev.title}</span>
                </span>
              </Link>
            ) : (
              <span className="w-[38%]" />
            )}

            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-pine text-cream px-6 py-3 rounded-full text-sm font-medium hover:bg-pine/85 transition-colors self-center shrink-0"
            >
              返回首页
            </Link>

            {next ? (
              <Link
                to={`/project/${next.id}`}
                className="group flex items-center gap-3 rounded-2xl glass-card px-5 py-4 hover:border-pine transition-colors max-w-[38%] text-right justify-end"
              >
                <span className="min-w-0">
                  <span className="block text-[11px] text-muted-foreground">下一个项目</span>
                  <span className="block text-sm font-semibold truncate">{next.title}</span>
                </span>
                <ArrowRight size={16} className="shrink-0 text-muted-foreground group-hover:text-pine transition-colors" />
              </Link>
            ) : (
              <span className="w-[38%]" />
            )}
          </div>
        </motion.div>
      </main>

      {/* 灯箱：点击放大，左右切换，Esc / 点背景关闭 */}
      <AnimatePresence>
        {lightbox !== null && project.gallery[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/78 backdrop-blur-sm p-6"
            onClick={() => setLightbox(null)}
          >
            <button
              aria-label="关闭"
              className="absolute top-5 right-5 text-white/85 hover:text-white transition-colors p-2"
              onClick={() => setLightbox(null)}
            >
              <X size={24} />
            </button>
            <button
              aria-label="上一张"
              className="absolute left-3 md:left-6 text-white/85 hover:text-white transition-colors p-2"
              onClick={(e) => {
                e.stopPropagation()
                setLightbox((lightbox - 1 + total) % total)
              }}
            >
              <ChevronLeft size={34} />
            </button>
            <motion.figure
              key={lightbox}
              initial={reduce ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="max-w-[88vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={project.gallery[lightbox].src}
                alt={project.gallery[lightbox].caption}
                className="max-h-[82vh] max-w-[88vw] w-auto h-auto rounded-xl shadow-2xl bg-white"
              />
              <figcaption className="mt-3 text-center text-sm" style={{ color: '#3B5BDB' }}>
                {project.gallery[lightbox].caption}
                <span className="ml-2 font-mono-en text-xs" style={{ color: 'rgba(59, 91, 219, 0.65)' }}>
                  {lightbox + 1} / {total}
                </span>
              </figcaption>
            </motion.figure>
            <button
              aria-label="下一张"
              className="absolute right-3 md:right-6 text-white/85 hover:text-white transition-colors p-2"
              onClick={(e) => {
                e.stopPropagation()
                setLightbox((lightbox + 1) % total)
              }}
            >
              <ChevronRight size={34} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
