import { useEffect, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ExternalLink, Github, LoaderCircle } from 'lucide-react'
import { moreWorks } from '../content'
import Backdrop from '../components/Backdrop'

/**
 * More Work 的站内 PDF 查看页：
 * 顶栏返回 + 项目名 + GitHub（如有）+ 视频（如有）+ 嵌入 PDF，底部可直达上一个 / 下一个作品
 */
export default function WorkPdf() {
  const { id } = useParams()
  const reduce = useReducedMotion()
  /* PDF iframe 加载完成后才淡入，加载期间先显示封面占位 */
  const [pdfReady, setPdfReady] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    setPdfReady(false)
  }, [id])

  const idx = moreWorks.findIndex((w) => w.id === id)
  const work = idx >= 0 ? moreWorks[idx] : undefined
  if (!work || !work.link) return <Navigate to="/" replace />

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
            <div className="flex items-center gap-4 shrink-0">
              {work.github && (
                <a
                  href={work.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github size={13} />
                  GitHub 仓库
                </a>
              )}
              <a
                href={work.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-pine transition-colors"
              >
                <ExternalLink size={13} />
                在新标签页打开 PDF
              </a>
            </div>
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
              <video src={work.video} controls preload="metadata" className="w-full h-auto" />
            </div>
          </motion.section>
        )}

        {/* 嵌入 PDF */}
        <motion.section
          initial={reduce ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10"
        >
          <h2 className="text-xl font-bold tracking-tight mb-4">完整汇报 PDF</h2>
          <div className="relative rounded-3xl overflow-hidden glass-card">
            {/* 加载过渡：封面占位 + 提示，PDF 就绪后淡出（PDF 已做无损线性化，可边下边显示） */}
            <div
              aria-hidden={pdfReady}
              className={`absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-white transition-opacity duration-500 ${
                pdfReady ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
            >
              <img
                src={work.cover}
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-25 blur-sm"
              />
              <LoaderCircle size={26} className="relative animate-spin text-foreground/60" />
              <p className="relative text-sm text-foreground/70">PDF 加载中，线性化后可边下边看…</p>
            </div>
            <iframe
              src={work.link}
              title={`${work.title} PDF`}
              onLoad={() => setPdfReady(true)}
              className={`w-full h-[78vh] border-0 bg-white transition-opacity duration-500 ${
                pdfReady ? 'opacity-100' : 'opacity-0'
              }`}
            />
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
    </div>
  )
}
