import { useEffect, useRef, useState } from 'react'

/**
 * 全站图片镜像兜底：
 * GitHub Pages 在部分国内网络下媒体会加载失败或连接挂起，
 * 加载报错或 6 秒未完成都自动切换到 jsDelivr 镜像（镜像整个 gh-pages 分支），只换一次。
 */

const MIRROR_ROOT = 'https://cdn.jsdelivr.net/gh/zhenghohk-bot/pei-portfolio@gh-pages'

export const toMirror = (src: string) => {
  if (/^https?:\/\//.test(src)) return src
  const m = src.match(/^(?:\/pei-portfolio)?(\/.*)$/)
  return m ? MIRROR_ROOT + m[1] : src
}

/* 供 motion.img 等无法直接替换标签的场景使用 */
export function useMirrorSrc(src: string) {
  const [s, setS] = useState(src)
  const loadedRef = useRef(false)

  useEffect(() => {
    setS(src)
    loadedRef.current = false
    const t = window.setTimeout(() => {
      if (!loadedRef.current) setS(toMirror(src))
    }, 6000)
    return () => window.clearTimeout(t)
  }, [src])

  return {
    src: s,
    onLoad: () => {
      loadedRef.current = true
    },
    onError: () => {
      const mirror = toMirror(src)
      setS((cur) => (cur === mirror ? cur : mirror))
    },
  }
}

export default function SmartImg({
  src,
  alt = '',
  className,
  style,
  eager = false,
  draggable,
  onLoad,
  onClick,
  ...rest
}: {
  src: string
  alt?: string
  className?: string
  style?: React.CSSProperties
  eager?: boolean
  draggable?: boolean
  onLoad?: () => void
  onClick?: () => void
} & Record<string, unknown>) {
  const p = useMirrorSrc(src)
  return (
    <img
      src={p.src}
      alt={alt}
      className={className}
      style={style}
      draggable={draggable}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onLoad={() => {
        p.onLoad()
        onLoad?.()
      }}
      onError={p.onError}
      onClick={onClick}
      {...rest}
    />
  )
}
