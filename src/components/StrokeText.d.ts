import type { CSSProperties } from 'react'

export interface StrokeTextProps {
  text?: string
  strokeColor?: string
  fillColor?: string
  strokeWidth?: number
  drawDuration?: number
  fillDelay?: number
  stagger?: number
  ease?: string
  trigger?: 'mount' | 'scroll' | 'hover' | 'loop'
  fillMode?: 'wipe' | 'fade' | 'none'
  fontSize?: number
  fontWeight?: number
  letterSpacing?: number
  reverse?: boolean
  className?: string
  style?: CSSProperties
}

export default function StrokeText(props: StrokeTextProps): JSX.Element
