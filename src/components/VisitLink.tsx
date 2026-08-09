import { ArrowUpRight } from 'lucide-react'

/**
 * VisitLink：文段末尾的外链小胶囊按钮（如"去看看 ↗"）
 * 与导航栏 Contact 同款的近黑实心药丸样式
 */
export default function VisitLink({ href, label = '去看看' }: { href: string; label?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1 align-middle ml-2 px-4 py-1.5 rounded-full bg-pine text-cream text-sm hover:bg-pine/85 hover:gap-1.5 transition-all whitespace-nowrap"
    >
      {label}
      <ArrowUpRight size={13} />
    </a>
  )
}
