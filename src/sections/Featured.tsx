import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { motion, useReducedMotion } from 'framer-motion'
import { Github } from 'lucide-react'
import CardSwap, { Card } from '../components/CardSwap'
import StrokeText from '../components/StrokeText'
import { featured, vibeCodeShip, type FeaturedProject } from '../content'

/* 指定配色：蓝紫展示字 / 深蓝紫说明 / 近黑卡片文字 */
const COLOR_WORD = '#819BF3'
const COLOR_DESC = '#454F9E'
const COLOR_INK = '#171717'
const COLOR_INK_SOFT = 'rgba(23, 23, 23, 0.62)'
const COLOR_CORAL = '#f26d6d'

/**
 * 卡片内容：卡片内顶部标题栏（项目名 + GitHub 入口）、
 * 中间完整截图（contain 不裁切）、底部信息栏（时间性质 + 标签），同一容器不分离
 */
function CardContent({ project, fixedHeight }: { project: FeaturedProject; fixedHeight?: boolean }) {
  return (
    <div className={`flex flex-col w-full ${fixedHeight ? 'h-full' : ''} bg-white`}>
      {/* 卡片内顶部标题栏 */}
      <div className="shrink-0 flex items-center gap-2.5 pl-5 pr-4 py-3 border-b border-[#eeece6]">
        <span aria-hidden className="w-2 h-2 rounded-full shrink-0" style={{ background: COLOR_WORD }} />
        <h3 className="text-[15px] font-bold leading-none truncate" style={{ color: COLOR_INK }}>
          {project.title}
        </h3>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            aria-label={`${project.title} GitHub 仓库`}
            onClick={(e) => e.stopPropagation()}
            className="ml-auto shrink-0 transition-colors"
            style={{ color: COLOR_INK }}
            onMouseEnter={(e) => (e.currentTarget.style.color = COLOR_CORAL)}
            onMouseLeave={(e) => (e.currentTarget.style.color = COLOR_INK)}
          >
            <Github size={17} />
          </a>
        )}
      </div>
      {/* 截图：区域固定 16:9，PPT 刚好铺满；4:3 图用模糊同图补齐两侧 */}
      <div className="relative overflow-hidden aspect-video">
        <img
          aria-hidden
          src={project.cover}
          loading="lazy"
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover blur-lg scale-110"
        />
        <img
          src={project.cover}
          alt={project.title}
          loading="lazy"
          draggable={false}
          className="relative w-full h-full object-contain"
        />
      </div>
      {/* 底部信息栏（flex-1 吸收剩余高度，避免底部白缝） */}
      <div className="flex-1 px-5 py-3.5 border-t border-[#f1efe9]">
        <p className="text-xs" style={{ color: COLOR_INK_SOFT }}>
          {project.meta}
        </p>
        <div className="mt-2 flex gap-1.5">
          {project.tags.slice(0, 2).map((t) => (
            <span
              key={t}
              className="px-2.5 py-0.5 rounded-full text-[11px] bg-[#f6f5f2] border border-[#e8e6e0]"
              style={{ color: COLOR_INK }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/**
 * 重点项目：左列 VIBE / CODE / SHIP（单组、左对齐、不吸顶），
 * 右侧桌面端 CardSwap 叠卡（4.5s 自动切换、悬停暂停），移动端单卡横滑轮播
 */
/** 简单媒体查询 hook：叠卡尺寸按屏幕宽度分档 */
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  )
  useEffect(() => {
    const m = window.matchMedia(query)
    const fn = () => setMatches(m.matches)
    m.addEventListener('change', fn)
    return () => m.removeEventListener('change', fn)
  }, [query])
  return matches
}

export default function Featured() {
  const reduce = useReducedMotion()
  const navigate = useNavigate()
  const [active, setActive] = useState(0)
  /* 三档响应式：后排卡片向右上错位；≥1536px 大卡 / 1280-1536px 标准 / 1024-1280px 收窄 */
  const xwide = useMediaQuery('(min-width: 1536px)')
  const wide = useMediaQuery('(min-width: 1280px)')
  const tier = xwide ? '2xl' : wide ? 'xl' : 'lg'
  const swap =
    tier === '2xl'
      ? { width: 660, height: 495, cardDistance: 95, verticalDistance: 100, padT: 218, padR: 295 }
      : tier === 'xl'
        ? { width: 600, height: 462, cardDistance: 85, verticalDistance: 100, padT: 218, padR: 263 }
        : { width: 470, height: 390, cardDistance: 60, verticalDistance: 85, padT: 175, padR: 190 }

  const goDetail = (i: number) => navigate(`/project/${featured[i].id}`)

  return (
    <section id="projects" className="relative py-16 md:py-24 overflow-hidden scroll-mt-16">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="animate-drift absolute top-[10%] left-[-6%] w-[26rem] h-[26rem] rounded-full bg-sage-light/60 blur-3xl" />
        <div className="animate-drift absolute bottom-[5%] right-[-4%] w-[24rem] h-[24rem] rounded-full bg-petal-light/70 blur-3xl [animation-delay:-7s]" />
      </div>

      {/* 左边缘锁定在原 max-w-7xl 的位置，只向右扩展，宽屏下叠卡更靠右 */}
      <div
        className="relative mx-auto px-6"
        style={{
          paddingLeft:
            'min(max(24px, calc((100vw - 1280px) / 2 + 24px)), calc(100vw - 1304px))',
        }}
      >
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-mono-en text-xs tracking-[0.3em] uppercase mb-10 md:mb-14"
          style={{ color: COLOR_DESC }}
        >
          Selected Works · 重点项目
        </motion.p>

        <div className="grid lg:grid-cols-[3fr_9fr] gap-12 lg:gap-10 items-center">
          {/* 左列：单组宣言。组间距 64-80px，标题与说明同容器、左对齐、间距收紧 */}
          <div className="flex flex-col gap-16 md:gap-20">
            {vibeCodeShip.map((item, i) => (
              <motion.div
                key={item.word}
                initial={reduce ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* 标题+说明同容器，宽度随字形，说明右缘对齐标题右缘 */}
                <div className="w-fit">
                  <StrokeText
                    text={`${item.word}ING`}
                    strokeColor={COLOR_WORD}
                    fillColor={COLOR_WORD}
                    strokeWidth={1.2}
                    fontSize={96}
                    fontWeight={400}
                    letterSpacing={2}
                    trigger="scroll"
                    fillMode="wipe"
                    className="font-poster select-none"
                  />
                  <p className="-mt-4 text-right text-sm leading-relaxed lg:whitespace-nowrap" style={{ color: COLOR_DESC }}>
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 右列：桌面端叠卡（后排卡片从右上露出，预留 pt/pr） */}
          <div className="hidden md:block">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="w-fit ml-auto"
              style={{ paddingTop: swap.padT, paddingRight: swap.padR }}
            >
              <CardSwap
                key={tier}
                width={swap.width}
                height={swap.height}
                cardDistance={swap.cardDistance}
                verticalDistance={swap.verticalDistance}
                delay={3000}
                pauseOnHover
                easing="smooth"
                skewAmount={3}
                onSwap={setActive}
                onCardClick={goDetail}
              >
                {featured.map((p) => (
                  <Card key={p.id}>
                    <CardContent project={p} fixedHeight />
                  </Card>
                ))}
              </CardSwap>
            </motion.div>

            {/* 项目序号 */}
            <p className="mt-4 text-center font-mono-en text-sm" style={{ color: COLOR_INK_SOFT }}>
              {String(active + 1).padStart(2, '0')}
              <span className="mx-1.5">/</span>
              {String(featured.length).padStart(2, '0')}
            </p>
          </div>

          {/* 移动端：纵向完整卡片列表，不用叠卡，四个项目直接可见 */}
          <div className="md:hidden flex flex-col gap-5">
            {featured.map((p, i) => (
              <div
                key={p.id}
                onClick={() => goDetail(i)}
                role="button"
                aria-label={`查看 ${p.title} 项目详情`}
                className="relative w-full rounded-2xl overflow-hidden border border-[#e8e6e0] bg-white shadow-[0_12px_40px_-14px_hsl(178_40%_35%/0.22)] cursor-pointer"
              >
                <CardContent project={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
