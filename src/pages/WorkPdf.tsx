import { useEffect, useRef, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, X, Github, Play, Pause, Maximize, Minimize } from 'lucide-react'
import { moreWorks } from '../content'
import Backdrop from '../components/Backdrop'

/* 放映模式已验收，全部更多实践项目启用 */
const SLIDESHOW_DEMO_IDS = ['yiqida', 'thyroid-service', 'culture-game', 'blender-exoskeleton', 'muselens']

/* 浏览模式切换：放映 / 滚动，选中态用项目主题色 */
function ModeToggle({
  mode,
  onChange,
  accent,
}: {
  mode: 'slide' | 'scroll'
  onChange: (m: 'slide' | 'scroll') => void
  accent: string
}) {
  const btn = (m: 'slide' | 'scroll', label: string) => (
    <button
      key={m}
      onClick={() => onChange(m)}
      style={mode === m ? { backgroundColor: accent, color: '#FFF9F2' } : undefined}
      className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
        mode === m ? 'shadow-sm' : 'text-muted-foreground hover:text-foreground'
      }`}
    >
      {label}
    </button>
  )
  return (
    <div className="inline-flex items-center gap-1 rounded-full glass-card p-1">
      {btn('slide', '放映模式')}
      {btn('scroll', '滚动浏览')}
    </div>
  )
}

/* 放映模式：自动播放聚焦单页 + 可滑动缩略图条 + 左右箭头 */
function Slideshow({
  pages,
  title,
  accent,
  allowFullscreen = false,
  onZoom,
}: {
  pages: string[]
  title: string
  accent: string
  allowFullscreen?: boolean
  onZoom: (i: number) => void
}) {
  const total = pages.length
  const reduce = useReducedMotion()
  const [cur, setCur] = useState(0)
  const [playing, setPlaying] = useState(true)
  const stripRef = useRef<HTMLDivElement>(null)
  const fsRef = useRef<HTMLDivElement>(null)
  const [isFs, setIsFs] = useState(false)

  /* 原生全屏状态同步（电脑端） */
  useEffect(() => {
    const onChange = () => setIsFs(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  const toggleFs = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {})
    } else {
      fsRef.current?.requestFullscreen?.().catch(() => {})
    }
  }

  /* 自动播放：3.5s 翻一页，播到最后一页自动停止 */
  useEffect(() => {
    if (!playing || reduce) return undefined
    if (cur >= total - 1) {
      setPlaying(false)
      return undefined
    }
    const t = window.setTimeout(() => setCur((c) => Math.min(c + 1, total - 1)), 3500)
    return () => window.clearTimeout(t)
  }, [playing, cur, total, reduce])

  /* 手动点缩略图或箭头即暂停自动播放 */
  const manual = (fn: (c: number) => number) => {
    setPlaying(false)
    setCur(fn)
  }

  /* 当前缩略图自动滚动到可视区中间 */
  useEffect(() => {
    const el = stripRef.current?.children[cur] as HTMLElement | undefined
    el?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }, [cur])

  /* 全屏状态下支持键盘方向键翻页 */
  useEffect(() => {
    if (!isFs) return undefined
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') manual((c) => (c - 1 + total) % total)
      if (e.key === 'ArrowRight') manual((c) => (c + 1) % total)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFs, total])

  return (
    <div
      ref={fsRef}
      className={isFs ? 'relative h-full bg-black flex flex-col justify-center gap-3 p-4 md:p-8' : ''}
    >
      {/* 全屏时的退出按钮 */}
      {isFs && (
        <button
          aria-label="退出全屏"
          onClick={toggleFs}
          className="absolute top-4 right-4 z-10 rounded-full bg-white/15 backdrop-blur p-2.5 text-white/85 hover:text-white hover:bg-white/25 transition-colors"
        >
          <Minimize size={18} />
        </button>
      )}

      <div
        className={`relative overflow-hidden select-none ${
          isFs ? 'flex-1 min-h-0 flex items-center justify-center bg-black' : 'rounded-2xl glass-card bg-white'
        }`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={cur}
            src={pages[cur]}
            alt={`${title} 第 ${cur + 1} 页`}
            initial={reduce ? false : { opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? undefined : { opacity: 0, x: -28 }}
            transition={{ duration: 0.32, ease: 'easeOut' }}
            className={
              isFs
                ? 'max-h-full max-w-full w-auto h-auto rounded-lg'
                : 'w-full h-auto cursor-zoom-in'
            }
            onClick={isFs ? undefined : () => onZoom(cur)}
          />
        </AnimatePresence>

        <button
          aria-label="上一张"
          onClick={() => manual((c) => (c - 1 + total) % total)}
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/85 backdrop-blur p-2 shadow-md text-foreground/70 hover:text-foreground hover:bg-white transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          aria-label="下一张"
          onClick={() => manual((c) => (c + 1) % total)}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/85 backdrop-blur p-2 shadow-md text-foreground/70 hover:text-foreground hover:bg-white transition-colors"
        >
          <ChevronRight size={20} />
        </button>

        <span
          className="absolute bottom-3 right-3 rounded-full text-white text-[11px] font-mono-en px-2.5 py-1"
          style={{ backgroundColor: accent }}
        >
          {cur + 1} / {total}
        </span>
      </div>

      {/* 播放控制 + 全屏 + 缩略图条 */}
      <div className={`flex items-center gap-3 ${isFs ? '' : 'mt-3'}`}>
        <button
          onClick={() => {
            /* 播完后重新播放则从头开始 */
            if (!playing && cur >= total - 1) setCur(0)
            setPlaying((p) => !p)
          }}
          className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-medium transition-colors ${
            isFs ? 'bg-white/15 hover:bg-white/25' : 'glass-card'
          }`}
          style={{ color: isFs ? '#FFFFFF' : accent }}
        >
          {playing ? <Pause size={13} /> : <Play size={13} />}
          {playing ? '暂停' : '播放'}
        </button>

        {/* 全屏按钮：仅电脑端、试点项目显示 */}
        {allowFullscreen && (
          <button
            onClick={toggleFs}
            aria-label={isFs ? '退出全屏' : '全屏播放'}
            className={`shrink-0 hidden md:inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-medium transition-colors ${
              isFs ? 'bg-white/15 text-white hover:bg-white/25' : 'glass-card text-muted-foreground hover:text-foreground'
            }`}
          >
            {isFs ? <Minimize size={13} /> : <Maximize size={13} />}
            {isFs ? '退出全屏' : '全屏'}
          </button>
        )}

        <div ref={stripRef} className="flex gap-2 overflow-x-auto py-1">
          {pages.map((p, i) => (
            <button
              key={p}
              onClick={() => manual(() => i)}
              aria-label={`跳转到第 ${i + 1} 页`}
              style={i === cur ? { borderColor: accent } : undefined}
              className={`shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                i === cur ? 'shadow-md' : 'border-transparent opacity-55 hover:opacity-90'
              }`}
            >
              <img src={p} alt="" loading="lazy" className="w-20 md:w-24 h-auto block" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

/**
 * More Work 的站内画廊页：
 * 顶栏返回 + 项目名 + GitHub（如有）+ 视频（如有）+ 逐页高清画廊（点击放大，左右切换），
 * 底部可直达上一个 / 下一个作品；试点项目支持放映 / 滚动两种浏览模式
 */
export default function WorkPdf() {
  const { id } = useParams()
  const reduce = useReducedMotion()
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [mode, setMode] = useState<'slide' | 'scroll'>('slide')

  const idx = moreWorks.findIndex((w) => w.id === id)
  const work = idx >= 0 ? moreWorks[idx] : undefined
  const pages = work?.pages ?? []
  const total = pages.length
  const isDemo = work ? SLIDESHOW_DEMO_IDS.includes(work.id) : false

  useEffect(() => {
    window.scrollTo(0, 0)
    setLightbox(null)
    setMode('slide')
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

        {/* 完整画廊：试点项目支持放映 / 滚动两种模式，其余项目滚动模式 */}
        <motion.section
          initial={reduce ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10"
        >
          <div className="flex items-center justify-between gap-4 mb-4">
            <h2 className="text-xl font-bold tracking-tight">完整作品</h2>
            {isDemo && <ModeToggle mode={mode} onChange={setMode} accent={work.accent ?? '#4A7468'} />}
          </div>
          {isDemo && mode === 'slide' ? (
            <Slideshow
              pages={pages}
              title={work.title}
              accent={work.accent ?? '#4A7468'}
              allowFullscreen={work.id === 'yiqida'}
              onZoom={(i) => setLightbox(i)}
            />
          ) : (
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
          )}
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
