import { marqueeItems } from '../content'

/**
 * 关键词跑马灯：全站仅此一条
 */
export default function Marquee() {
  const row = [...marqueeItems, ...marqueeItems]
  return (
    <section aria-label="关键词" className="py-5 border-y border-white/70 overflow-hidden bg-white/40 backdrop-blur-sm">
      <div className="animate-marquee flex w-max items-center gap-10 pr-10">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap">
            <span className="font-medium text-sm md:text-base text-foreground/70 tracking-wide">{item}</span>
            <span aria-hidden className="text-petal-deep text-xs">✦</span>
          </span>
        ))}
      </div>
    </section>
  )
}
