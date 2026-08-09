import { useEffect } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'framer-motion'
import { asset } from '../lib/asset'

/**
 * 全站统一背景层：生成底图 + 噪点质感 + 漂移光斑
 * + 跟随鼠标的柔和蓝绿光晕
 * 固定定位，所有区块浮在同一氛围之上（统一 su-uni 式整体感）
 */
export default function Backdrop() {
  const reduce = useReducedMotion()

  const x = useMotionValue(-200)
  const y = useMotionValue(-200)

  /* 光晕：慢弹簧，柔和大片 */
  const gx = useSpring(x, { stiffness: 45, damping: 20 })
  const gy = useSpring(y, { stiffness: 45, damping: 20 })

  useEffect(() => {
    if (reduce) return
    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [x, y, reduce])

  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden">
      {/* 生成底图，全站统一 */}
      <img
        src={asset('/hero-bg.jpg')}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* 漂移光斑，增加层次 */}
      <div className="animate-drift absolute top-[8%] left-[6%] w-[26rem] h-[26rem] rounded-full bg-petal-light/50 blur-3xl" />
      <div className="animate-drift absolute top-[38%] right-[2%] w-[24rem] h-[24rem] rounded-full bg-sage-light/50 blur-3xl [animation-delay:-5s]" />
      <div className="animate-drift absolute bottom-[6%] left-[28%] w-[28rem] h-[22rem] rounded-full bg-white/40 blur-3xl [animation-delay:-9s]" />

      {/* 噪点质感 */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E\")",
        }}
      />

      {/* 跟随鼠标的蓝绿光晕 */}
      {!reduce && (
        <>
          <motion.div
            className="pointer-events-none fixed w-[30rem] h-[30rem] rounded-full"
            style={{
              left: gx,
              top: gy,
              x: '-50%',
              y: '-50%',
              background:
                'radial-gradient(circle, hsl(172 80% 78% / 0.5), hsl(195 85% 85% / 0.25) 45%, transparent 70%)',
              filter: 'blur(24px)',
            }}
          />
          {/* 拖尾光点已按用户要求移除 */}
        </>
      )}
    </div>
  )
}
