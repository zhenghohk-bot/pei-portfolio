import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useInView } from 'framer-motion'
import { about, site } from '../content'
import VisitLink from '../components/VisitLink'

const ACCENT = '#819BF3' // 与 VIBE 展示字同色系

type TimelineEntry = (typeof about.timeline)[number]

/** 单个时间节点：进入视口中段时被点亮 */
function TimelineNode({
  item,
  index,
  reduce,
}: {
  item: TimelineEntry
  index: number
  reduce: boolean | null
}) {
  const ref = useRef<HTMLDivElement>(null)
  /* 只有进入视口中间 40% 区域才算激活，随填充线节奏点亮 */
  const active = useInView(ref, { margin: '-38% 0px -38% 0px', once: false })

  return (
    <div ref={ref} className="relative pl-12 md:pl-16">
      {/* 节点圆点：灰圈 → 实心蓝紫 + 光晕 */}
      <motion.span
        aria-hidden
        initial={false}
        animate={
          active
            ? { scale: 1, boxShadow: `0 0 0 6px ${ACCENT}26, 0 0 18px ${ACCENT}59` }
            : { scale: 0.72, boxShadow: '0 0 0 0 rgba(0,0,0,0)' }
        }
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-[-7px] top-1.5 w-4 h-4 rounded-full border-2"
        style={{
          borderColor: active ? ACCENT : 'hsl(195 8% 40% / 0.4)',
          backgroundColor: active ? ACCENT : 'transparent',
          transition: 'border-color 0.45s, background-color 0.45s',
        }}
      />

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      >
        <p
          className="font-mono-en text-xs md:text-sm tracking-wide transition-colors duration-500"
          style={{ color: active ? '#171717' : 'hsl(195 8% 40% / 0.65)' }}
        >
          {item.period}
        </p>
        <h3 className="mt-1.5 text-lg md:text-2xl font-bold tracking-tight">{item.title}</h3>
        <p className="mt-2 text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
          {item.desc}
        </p>
      </motion.div>
    </div>
  )
}

/**
 * 关于我：补充介绍 + 滚动驱动时间线 + 联系按钮
 * 竖线随滚动实时填充，节点经过时被点亮（可回放）
 */
export default function About() {
  const reduce = useReducedMotion()
  const lineRef = useRef<HTMLDivElement>(null)

  /* 填充线进度：时间线容器顶部到视口 80% 处开始，底部到 55% 处填满 */
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ['start 0.8', 'end 0.55'],
  })
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 })

  const rise = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  })

  return (
    <section id="about" className="relative py-16 md:py-24 scroll-mt-16">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="animate-drift absolute top-0 right-[10%] w-[24rem] h-[24rem] rounded-full bg-petal-light/70 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div {...rise()} className="mb-10 md:mb-14">
          <p className="font-mono-en text-xs tracking-[0.3em] text-petal-deep uppercase mb-3">About</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{about.title}</h2>
        </motion.div>

        {/* 补充介绍 */}
        <motion.div {...rise(0.05)} className="max-w-3xl space-y-4 mb-16 md:mb-20">
          {about.intro.map((p, i) => (
            <p key={i} className="text-base md:text-lg leading-relaxed text-foreground/85">
              {p}
            </p>
          ))}
          <p className="text-base md:text-lg leading-relaxed text-foreground/85">
            我搭了一个 AI 影像作品网页，放了一些 AIGC 影视与视觉叙事的练习和作品
            <VisitLink href={site.aiFilms} />
          </p>
        </motion.div>

        {/* 滚动驱动时间线 */}
        <div ref={lineRef} className="relative">
          {/* 轨道：1px 浅灰竖线 */}
          <span
            aria-hidden
            className="absolute left-0 top-1 bottom-1 w-px bg-pine/12"
          />
          {/* 填充线：蓝紫渐变，随滚动向下生长 */}
          <motion.span
            aria-hidden
            className="absolute left-0 top-1 bottom-1 w-px origin-top"
            style={{
              scaleY: reduce ? 1 : fill,
              background: `linear-gradient(to bottom, ${ACCENT}, #454F9E)`,
            }}
          />

          <div className="flex flex-col gap-12 md:gap-16">
            {about.timeline.map((item, i) => (
              <TimelineNode key={item.title} item={item} index={i} reduce={reduce} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
