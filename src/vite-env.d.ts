/// <reference types="vite/client" />

declare module '*.svg' {
  export const ReactComponent: React.FunctionComponent<
    React.SVGAttributes<SVGElement>
  >
}
declare interface Window {
  mozRequestAnimationFrame: typeof window.requestAnimationFrame
  mozCancelAnimationFrame: typeof window.cancelAnimationFrame
}
