import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { asset } from '../lib/asset'
import SmartImg from './SmartImg'

/**
 * 双面头像：默认卡通版，点击 3D 翻面切换真人照
 * 交互动机：给访客一个"发现彩蛋"的触点，翻牌动作干脆、有弹簧感
 */
export default function AvatarFlip({ className = '' }: { className?: string }) {
  const reduce = useReducedMotion()
  const [flipped, setFlipped] = useState(false)

  return (
    <div className={className}>
      <motion.div
        onClick={() => setFlipped((f) => !f)}
        animate={reduce ? undefined : { rotateY: flipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 240, damping: 22 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative cursor-pointer select-none"
        role="button"
        aria-label={flipped ? '切换回卡通头像' : '查看真人照片'}
        title={flipped ? '切换回卡通头像' : '查看真人照片'}
      >
        {/* 正面：卡通头像 */}
        <SmartImg
          src={asset('/avatar-cartoon.webp')}
          alt="卡通头像"
          eager
          draggable={false}
          className="w-full h-auto drop-shadow-[0_18px_36px_hsl(178_40%_40%/0.28)]"
          style={{ backfaceVisibility: 'hidden' }}
        />
        {/* 背面：真人照片 */}
        <SmartImg
          src={asset('/avatar-real.webp')}
          alt="真人照片"
          eager
          draggable={false}
          className="absolute inset-0 w-full h-auto drop-shadow-[0_18px_36px_hsl(178_40%_40%/0.28)]"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        />
        {/* 减弱动效时直接淡入淡出 */}
        {reduce && flipped && (
          <SmartImg
            src={asset('/avatar-real.webp')}
            alt="真人照片"
            eager
            draggable={false}
            className="absolute inset-0 w-full h-auto"
          />
        )}
      </motion.div>

      {/* 翻面提示 */}
      <p className="mt-2 text-center font-mono-en text-[10px] tracking-[0.25em] text-muted-foreground/80 uppercase">
        {flipped ? 'again · cartoon me' : 'click · real me'}
      </p>
    </div>
  )
}
