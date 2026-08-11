import { useEffect, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, X, Github } from 'lucide-react'
import { moreWorks } from '../content'
import Backdrop from '../components/Backdrop'

/**
 * More Work 的站内画廊页：
 * 顶栏返回 + 项目名 + GitHub（如有）+ 视频（如有）+ 逐页高清画廊（点击放大，左右切换），
 * 底部可直达上一个 / 下一个作品
 */
export default function WorkPdf() {
  const { id } = useParams()
  const reduce = useReducedMotion()
  const [lightbox, setLightbox] = useState<number | null>(null)

  const idx = moreWorks.findIndex((w) => w.id === id)
  const work = idx >= 0 ? moreWorks[idx] : undefined
  const pages = work?.pages ?? []
  const total = pages.length

  useEffect(() => {
    window.scrollTo(0, 0)
    setLightbox(null)
  }, [id])

  /* 灯箱键盘操作：Esc 关闭，左右方向键切换 */
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

  if (!work || total === 0) return <Navigate to="/" replace />

  const prev = moreWorks[(idx - 1 + moreWorks.length) % moreWorks.length]
  const next = moreWorks[(idx + 1) % moreWorks.length]

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

      <main className="relative max-w-5xl mx-auto px-6 pt-28 pb-24">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-mono-en text-xs tracking-[0.3em] text-petal-deep uppercase">
            More Work
          </p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{work.title}</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {work.sub}
                <span className="font-mono-en ml-3">{work.period}</span>
              </p>
            </div>
            {work.github && (
              <a
                href={work.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors shrink-0"
              >
                <Github size={13} />
                GitHub 仓库
              </a>
            )}
          </div>
        </motion.div>

        {/* 演示视频（如有） */}
        {work.video && (
          <motion.section
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10"
          >
            <h2 className="text-xl font-bold tracking-tight mb-4">演示视频</h2>
            <div className="rounded-3xl overflow-hidden glass-card bg-black">
              <video
                src={work.video}
                controls
                controlsList="nodownload"
                preload="metadata"
                className="w-full h-auto"
              />
            </div>
          </motion.section>
        )}

        {/* 完整画廊：逐页高清图，懒加载，点击放大 */}
        <motion.section
          initial={reduce ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10"
        >
          <h2 className="text-xl font-bold tracking-tight mb-4">完整作品</h2>
          <div className="flex flex-col gap-5">
            {pages.map((src, i) => (
              <div
                key={src}
                className="rounded-2xl overflow-hidden glass-card cursor-zoom-in"
                onClick={() => setLightbox(i)}
                role="button"
                aria-label={`放大查看第 ${i + 1} 页`}
              >
                <img
                  src={src}
                  alt={`${work.title} 第 ${i + 1} 页`}
                  loading="lazy"
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>
        </motion.section>

        {/* 底部导航：上一个 / 返回首页 / 下一个 */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16"
        >
          <div className="flex items-stretch justify-between gap-3">
            <Link
              to={`/work/${prev.id}`}
              className="group flex items-center gap-3 rounded-2xl glass-card px-5 py-4 hover:border-pine transition-colors max-w-[38%]"
            >
              <ArrowLeft size={16} className="shrink-0 text-muted-foreground group-hover:text-pine transition-colors" />
              <span className="min-w-0">
                <span className="block text-[11px] text-muted-foreground">上一个作品</span>
                <span className="block text-sm font-semibold truncate">{prev.title}</span>
              </span>
            </Link>

            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-pine text-cream px-6 py-3 rounded-full text-sm font-medium hover:bg-pine/85 transition-colors self-center shrink-0"
            >
              返回首页
            </Link>

            <Link
              to={`/work/${next.id}`}
              className="group flex items-center gap-3 rounded-2xl glass-card px-5 py-4 hover:border-pine transition-colors max-w-[38%] text-right justify-end"
            >
              <span className="min-w-0">
                <span className="block text-[11px] text-muted-foreground">下一个作品</span>
                <span className="block text-sm font-semibold truncate">{next.title}</span>
              </span>
              <ArrowRight size={16} className="shrink-0 text-muted-foreground group-hover:text-pine transition-colors" />
            </Link>
          </div>
        </motion.div>
      </main>

      {/* 灯箱：放大查看，左右切换，Esc 关闭 */}
      <AnimatePresence>
        {lightbox !== null && pages[lightbox] && (
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
                src={pages[lightbox]}
                alt={`${work.title} 第 ${lightbox + 1} 页`}
                className="max-h-[86vh] max-w-[88vw] w-auto h-auto rounded-xl shadow-2xl bg-white"
              />
              <figcaption
                className="mt-3 text-center text-sm font-mono-en"
                style={{ color: '#3B5BDB' }}
              >
                {lightbox + 1} / {total}
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
