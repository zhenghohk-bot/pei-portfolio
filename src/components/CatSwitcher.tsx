import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

/* 橘猫全形态（用户手工裁切贴纸图），顺序 = 总览图从左到右 */
const cats = [
  { src: '/cats/sitting.webp', alt: '端坐回望的橘猫' },
  { src: '/cats/stretch.webp', alt: '伸懒腰的橘猫' },
  { src: '/cats/angry.webp', alt: '炸毛的橘猫' },
  { src: '/cats/butterfly.webp', alt: '扑蝴蝶的橘猫' },
  { src: '/cats/yarn.webp', alt: '玩毛线球的橘猫' },
  { src: '/cats/sleeping.webp', alt: '蜷着睡觉的橘猫' },
]

/**
 * 橘猫形态切换：点击切换下一只，交叉淡化 + 轻微缩放
 * 交互动机：首页的彩蛋触点，点一下换一种心情
 */
export default function CatSwitcher({ className = '' }: { className?: string }) {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)

  return (
    <div
      className={`relative cursor-pointer select-none ${className}`}
      onClick={() => setIndex((i) => (i + 1) % cats.length)}
      role="button"
      aria-label={`切换橘猫形态，当前：${cats[index].alt}`}
      title="点我换一只猫"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.img
          key={cats[index].src}
          src={cats[index].src}
          alt={cats[index].alt}
          draggable={false}
          initial={reduce ? false : { opacity: 0, scale: 0.85, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, scale: 0.9, y: -6 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-auto drop-shadow-[0_10px_20px_hsl(178_40%_40%/0.22)]"
        />
      </AnimatePresence>
    </div>
  )
}
