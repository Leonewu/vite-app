import type React from 'react'

declare global {
  interface window {
    mozRequestAnimationFrame: typeof window.requestAnimationFrame
    mozCancelRequestAnimationFrame: typeof window.cancelAnimationFrame
  }
}

declare module '*.svg' {
  export const ReactComponent: React.FunctionComponent<
    React.SVGAttributes<SVGElement>
  >
}