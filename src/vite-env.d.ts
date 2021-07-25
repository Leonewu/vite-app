/// <reference types="vite/client" />

declare module '*.svg' {
  import React from 'react'
  export const ReactComponent: React.FunctionComponent<
    React.SVGAttributes<SVGElement>
  >
}

declare module '*.md' {
  export const ReactComponent: React.VFC
  export const attributes: Record<string, unknown>
}

declare interface Window {
  mozRequestAnimationFrame: typeof window.requestAnimationFrame
  mozCancelAnimationFrame: typeof window.cancelAnimationFrame
}
