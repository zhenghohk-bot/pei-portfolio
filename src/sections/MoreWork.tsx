import { Link } from 'react-router'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { moreWorks, type MoreWork } from '../content'

const sizeCls: Record<NonNullable<MoreWork['size']>, string> = {
  lg: 'md:w-full',
  md: 'md:w-[88%]',
  sm: 'md:w-[76%]',
}

function WorkItem({
  work,
  index,
  align = 'start',
}: {
  work: MoreWork
  index: number
  align?: 'start' | 'end'
}) {
  const reduce = useReducedMotion()
  const portrait = work.ratio === 'portrait'

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 28, rotate: work.rotate ?? 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: work.rotate ?? 0 }}
      whileHover={{ rotate: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`${sizeCls[work.size ?? 'lg']} ${
        align === 'end' ? 'md:self-end' : 'md:self-start'
      }`}
    >
      <Link
        to={`/work/${work.id}`}
        className="group block"
        title={`${work.title} · 查看完整 PDF`}
      >
        <div
          className={`rounded-3xl overflow-hidden glass-card ${
            portrait ? 'aspect-[4/5]' : 'aspect-[16/9]'
          }`}
        >
          <img
            src={work.cover}
            alt={work.title}
            loading="lazy"
            style={work.focus ? { objectPosition: work.focus } : undefined}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
          />
        </div>
        <div className="mt-4 flex items-start justify-between gap-3 px-1">
          <div>
            <h3 className="text-base md:text-lg font-bold tracking-tight">{work.title}</h3>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{work.sub}</p>
          </div>
          <span className="font-mono-en text-[11px] text-muted-foreground shrink-0 mt-1">
            {work.period}
          </span>
        </div>
        {work.linkLabel && (
          <p className="mt-1.5 px-1 text-[11px] text-petal-deep inline-flex items-center gap-1">
            {work.linkLabel}
            <ArrowUpRight size={12} />
          </p>
        )}
      </Link>
    </motion.div>
  )
}

/**
 * More Work：两列自由错落排布，按时间 2025 → 2026 排序，
 * 卡片有大有小并带轻微旋转，点击直接打开对应 PDF
 */
export default function MoreWorkSection() {
  const reduce = useReducedMotion()
  const [yiqida, thyroid, culture, blender, muselens] = moreWorks

  /* 左列：艺起搭(大) / 逐象而行(小) / MuseLens(大)；右列深下移：Studio1(小) / Blender(中，靠右) */
  const colA: { work: MoreWork; align?: 'start' | 'end' }[] = [
    { work: yiqida },
    { work: culture, align: 'end' },
    { work: muselens },
  ]
  const colB: { work: MoreWork; align?: 'start' | 'end' }[] = [
    { work: thyroid, align: 'end' },
    { work: blender, align: 'end' },
  ]

  return (
    <section id="more-works" className="relative py-16 md:py-24 overflow-hidden scroll-mt-16">
      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <p className="font-mono-en text-xs tracking-[0.3em] text-petal-deep uppercase mb-3">
            More Work
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">更多实践</h2>
          <p className="mt-3 text-muted-foreground max-w-md leading-relaxed">
            课程作业与其他探索，2025-2026。点击卡片查看完整 PDF。
          </p>
        </motion.div>

        {/* 玻璃画板：作品卡片像钉在展板上一样 */}
        <div className="relative rounded-[2.5rem] bg-white/45 backdrop-blur-xl border border-white/70 shadow-[0_24px_80px_-32px_hsl(178_45%_45%/0.28)] px-5 py-10 md:px-12 md:py-16">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="flex flex-col gap-12 md:gap-16">
              {colA.map(({ work, align }, i) => (
                <WorkItem key={work.id} work={work} index={i} align={align} />
              ))}
            </div>
            <div className="flex flex-col gap-12 md:gap-28 md:mt-44">
              {colB.map(({ work, align }, i) => (
                <WorkItem key={work.id} work={work} index={i + 1} align={align} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
