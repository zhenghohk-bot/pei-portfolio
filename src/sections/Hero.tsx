import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight, Clapperboard } from 'lucide-react'
import { site } from '../content'
import AvatarFlip from '../components/AvatarFlip'
import DesktopCat from '../components/DesktopCat'
import TextType from '../components/TextType'

/**
 * Hero：统一背景层之上 + 中央描边大字（呼吸浮动）+ 左下宣言 + 底部流动光带
 * 底图、鼠标光晕与拖尾光点由 Backdrop 全站背景层提供
 */
export default function Hero() {
  const reduce = useReducedMotion()

  const fadeUp = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] as const },
  })

  return (
    <section id="top" className="relative min-h-[100dvh] flex flex-col overflow-hidden pt-16">
      {/* 中央：双面头像 + 描边大字 + 简短介绍 */}
      <div className="relative flex-1 flex items-center justify-center px-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 lg:gap-12">
          {/* 双面头像：点击翻面（卡通 ⇄ 真人）；身份行与自我介绍末行水平对齐 */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="w-44 md:w-56 lg:w-64 shrink-0 flex flex-col items-center md:self-stretch"
          >
            <motion.div
              animate={reduce ? undefined : { y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <AvatarFlip />
            </motion.div>
            {/* 身份行：单行，底部与右侧自我介绍末行同一水平线 */}
            <motion.p
              {...fadeUp(0.58)}
              className="mt-4 md:mt-auto md:pt-4 text-center text-xs md:text-sm text-muted-foreground leading-relaxed whitespace-nowrap"
            >
              {site.name} · {site.role}
            </motion.p>
          </motion.div>

          <div className="text-center md:text-left">
            {/* 描边大字：入场后缓慢浮动 */}
            <motion.div
              animate={reduce ? undefined : { y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative inline-block"
            >
              <motion.h1
                initial={reduce ? false : { opacity: 0, scale: 0.94, y: 16 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="font-poster select-none text-[clamp(3rem,10vw,8rem)] leading-none tracking-wide text-transparent"
                style={{
                  WebkitTextStroke: '2.5px hsl(228 16% 13%)',
                  textShadow: '0 20px 60px hsl(178 45% 45% / 0.3)',
                }}
              >
                PEIZHEN
              </motion.h1>
              {/* 移动端：小猫坐在 PEIZHEN 右侧（桌面端猫在右下角） */}
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
                className="md:hidden absolute left-full -bottom-3 ml-3 w-16"
              >
                <DesktopCat />
              </motion.div>
            </motion.div>

            {/* 自我介绍：打字机效果，与名字之间留出呼吸感 */}
            <motion.div {...fadeUp(0.4)} className="mt-12 md:mt-16 max-w-md mx-auto md:mx-0">
              <TextType
                as="p"
                text="Hi，我是佩珍！ENFP 人，喜欢交流，也总会被新问题和大胆的想法吸引。我目前正在探索与实践 Agent Workflow、AI Native 交互与模型评测，对 AIGC 影视与视觉叙事也很感兴趣～"
                typingSpeed={45}
                initialDelay={500}
                loop={false}
                className="text-sm md:text-base text-muted-foreground leading-relaxed min-h-[7.5em] md:min-h-[5em]"
                cursorCharacter="|"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* 底部流动光带：两层反向漂移，顶部用渐隐遮罩融入底图 */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-64 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_55%)]"
      >
        <div className="animate-flow absolute -inset-y-10 left-[-25%] w-[150%] blur-3xl bg-[linear-gradient(100deg,transparent_15%,hsl(172_75%_72%/0.45)_38%,hsl(200_85%_80%/0.5)_55%,hsl(95_65%_78%/0.4)_72%,transparent_90%)]" />
        <div className="animate-flow absolute -inset-y-6 left-[-25%] w-[150%] blur-3xl [animation-delay:-4.5s] [animation-direction:alternate-reverse] bg-[linear-gradient(80deg,transparent_20%,hsl(190_80%_82%/0.4)_45%,hsl(160_70%_75%/0.35)_65%,transparent_85%)]" />
      </div>

      {/* 桌宠橘猫：桌面端在右下角；移动端在 PEIZHEN 右侧（见上方） */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
        className="hidden md:block absolute md:right-20 md:bottom-16 md:w-36 lg:w-40 z-10"
      >
        <DesktopCat />
      </motion.div>

      {/* 左下：CTA */}
      <div className="relative max-w-6xl mx-auto w-full px-6 pb-12 md:pb-16">
        <div className="max-w-xl">
          <motion.div {...fadeUp(0.7)} className="flex items-center gap-6">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 bg-pine text-cream px-7 py-3.5 rounded-full text-sm font-medium hover:bg-pine/85 hover:gap-3 transition-all whitespace-nowrap"
            >
              查看作品
              <ArrowDownRight size={18} />
            </a>
            <a
              href={`mailto:${site.email}`}
              className="text-sm underline underline-offset-8 decoration-petal-deep decoration-2 hover:decoration-pine transition-colors"
            >
              联系我
            </a>
            {/* AI 影像实验站 */}
            <a
              href={site.aiFilms}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-petal-deep hover:text-pine transition-colors"
            >
              <Clapperboard size={15} />
              AI 影像实验
              <ArrowUpRight size={14} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
