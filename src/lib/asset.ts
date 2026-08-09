/**
 * 资源路径工具：为 public 下的静态资源补上部署前缀。
 * 本地开发 base 为 '/'，GitHub Pages 项目页为 '/pei-portfolio/'。
 * 用法：asset('/works/x.webp')、asset('/cats/sitting.webp')
 */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL || '/'
  return base.replace(/\/$/, '') + path
}
