import { useEffect, useState } from 'react'
import { Menu, X, Github } from 'lucide-react'
import { site } from '../content'

const links = [
  { num: '01', label: 'AI Coding 作品', href: '#projects' },
  { num: '02', label: 'More Work', href: '#more-works' },
  { num: '03', label: '关于', href: '#about' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  /* 首页顶部完全透明，滚动超过首屏 2/3 后淡入玻璃磨砂 */
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.66)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? 'bg-cream/65 backdrop-blur-xl border-b border-white/50 shadow-[0_1px_12px_hsl(178_20%_40%/0.06)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-pine text-cream flex items-center justify-center text-xs font-semibold">
            {site.nameEn.charAt(0)}
          </span>
          <span className="font-semibold text-sm tracking-tight">
            {site.name} · AI Product & Interaction
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="font-mono-en text-xs text-petal-deep mr-1.5">{l.num}</span>
              {l.label}
            </a>
          ))}
          <a href={site.github} target="_blank" rel="noreferrer" aria-label="GitHub"
            className="text-muted-foreground hover:text-foreground transition-colors">
            <Github size={18} />
          </a>
          <a
            href={`mailto:${site.email}`}
            className="text-sm bg-pine text-cream px-5 py-2 rounded-full hover:bg-pine/85 transition-colors"
          >
            Contact
          </a>
        </nav>

        <button
          className="md:hidden p-2 -mr-2"
          onClick={() => setOpen(!open)}
          aria-label="菜单"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-white/60 bg-cream/95 backdrop-blur-xl px-6 py-4 flex flex-col gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-3 text-base border-b border-border/40 last:border-0"
            >
              <span className="font-mono-en text-xs text-petal-deep mr-2">{l.num}</span>
              {l.label}
            </a>
          ))}
          <a
            href={`mailto:${site.email}`}
            onClick={() => setOpen(false)}
            className="mt-3 text-center bg-pine text-cream px-5 py-3 rounded-full"
          >
            Contact
          </a>
        </nav>
      )}
    </header>
  )
}
