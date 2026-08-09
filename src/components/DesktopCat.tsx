import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { asset } from '../lib/asset'

/* 橘猫全形态（用户手工裁切贴纸图），顺序 = 总览图从左到右 */
const poses = {
  sitting: { src: asset('/cats/sitting.webp'), alt: '端坐回望的橘猫' },
  stretch: { src: asset('/cats/stretch.webp'), alt: '伸懒腰的橘猫' },
  angry: { src: asset('/cats/angry.webp'), alt: '炸毛的橘猫' },
  butterfly: { src: asset('/cats/butterfly.webp'), alt: '扑蝴蝶的橘猫' },
  yarn: { src: asset('/cats/yarn.webp'), alt: '玩毛线球的橘猫' },
  sleeping: { src: asset('/cats/sleeping.webp'), alt: '蜷着睡觉的橘猫' },
} as const

type PoseName = keyof typeof poses

interface Step {
  pose: PoseName
  dur: number
}

/* 桌宠行为脚本：按总览图从左到右循环（端坐 → 伸懒腰 → 炸毛 → 扑蝴蝶 → 玩毛线 → 蜷睡） */
const script: Step[] = [
  { pose: 'sitting', dur: 3800 },
  { pose: 'stretch', dur: 2600 },
  { pose: 'angry', dur: 2000 },
  { pose: 'butterfly', dur: 3600 },
  { pose: 'yarn', dur: 3600 },
  { pose: 'sleeping', dur: 5200 },
]

/**
 * 桌宠橘猫：按行为脚本自主切换形态，
 * 点它会跳一下并随机换个动作
 */
export default function DesktopCat({ className = '' }: { className?: string }) {
  const reduce = useReducedMotion()
  /* 初始从"蜷睡"开始：进页面时猫在睡觉，随后按脚本顺序醒来活动 */
  const [step, setStep] = useState(() =>
    Math.max(0, script.findIndex((s) => s.pose === 'sleeping')),
  )
  const [hop, setHop] = useState(0)

  useEffect(() => {
    if (reduce) return
    const t = setTimeout(
      () => setStep((s) => (s + 1) % script.length),
      script[step].dur,
    )
    return () => clearTimeout(t)
  }, [step, reduce])

  const current = reduce ? { pose: 'sleeping' as PoseName, dur: 0 } : script[step]
  const pose = poses[current.pose]

  const onClick = () => {
    if (reduce) return
    /* 跳一下，并随机换一个动作 */
    setHop((h) => h + 1)
    const idle: PoseName[] = ['sitting', 'butterfly', 'yarn', 'angry', 'stretch']
    const next = idle[Math.floor(Math.random() * idle.length)]
    const idx = script.findIndex((s) => s.pose === next)
    setStep(idx >= 0 ? idx : 0)
  }

  return (
    <motion.div
      className={`relative cursor-pointer select-none ${className}`}
      onClick={onClick}
      role="button"
      aria-label={`桌宠橘猫，当前：${pose.alt}。点我互动`}
      title="点我一下"
    >
      <motion.div
        key={hop}
        animate={reduce ? undefined : { y: [0, -18, 0] }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="flex items-end justify-center h-24 md:h-28 lg:h-32"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={pose.src}
            src={pose.src}
            alt={pose.alt}
            draggable={false}
            initial={reduce ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="h-full w-auto object-contain drop-shadow-[0_10px_20px_hsl(178_40%_40%/0.22)]"
          />
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
