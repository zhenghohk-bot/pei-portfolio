import { site } from '../content'

/**
 * Footer：纯底图收尾，只保留版权信息
 */
export default function Footer() {
  return (
    <footer className="relative py-14">
      <div className="relative max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center sm:justify-end gap-3 text-sm text-muted-foreground">
        <p className="font-mono-en text-xs">
          © {new Date().getFullYear()} {site.nameEn}
        </p>
      </div>
    </footer>
  )
}
