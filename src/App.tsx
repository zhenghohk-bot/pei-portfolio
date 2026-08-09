import { Routes, Route, useLocation } from 'react-router'
import { motion, useReducedMotion } from 'framer-motion'
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'
import WorkPdf from './pages/WorkPdf'

export default function App() {
  const location = useLocation()
  const reduce = useReducedMotion()

  return (
    /* 页面切换：整页淡入 + 轻微上移 */
    <motion.div
      key={location.pathname}
      initial={reduce ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/work/:id" element={<WorkPdf />} />
      </Routes>
    </motion.div>
  )
}
