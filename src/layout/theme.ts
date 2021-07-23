import { useCallback, useEffect, useState } from 'react'

export enum THEME {
  LIGHT = 'light',
  DARK = 'dark',
}

function useTheme(): [THEME, () => void] {
  const [mode, setMode] = useState<THEME>(THEME.LIGHT)
  const toggle = useCallback(() => {
    setMode(mode === THEME.LIGHT ? THEME.DARK : THEME.LIGHT)
  }, [mode])
  useEffect(() => {
    document.body.classList.remove(
      mode === THEME.LIGHT ? THEME.DARK : THEME.LIGHT
    )
    document.body.classList.add(mode)
  }, [mode])
  return [mode, toggle]
}

export default useTheme
