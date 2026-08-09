import { motion, useReducedMotion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { site } from '../content'

/**
 * Say hello：大字收尾 + 邮箱按钮
 */
export default function SayHello() {
  const reduce = useReducedMotion()

  return (
    <section id="contact" className="relative py-24 md:py-36 overflow-hidden scroll-mt-16">
      <div className="relative max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 28, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-poster select-none text-[clamp(3.5rem,11vw,8.5rem)] leading-none tracking-wide text-transparent"
          style={{
            WebkitTextStroke: '2.5px #819BF3',
            textShadow: '0 20px 60px hsl(178 45% 45% / 0.3)',
          }}
        >
          say hello.
        </motion.h2>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 md:mt-12"
        >
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-2.5 bg-pine text-cream px-8 py-4 rounded-full text-sm md:text-base font-medium hover:bg-pine/85 hover:gap-3.5 transition-all"
          >
            <Mail size={17} />
            {site.email}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
