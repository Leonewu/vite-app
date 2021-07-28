import { useCallback, useEffect, useState } from 'react'

export enum THEME {
  LIGHT = 'light',
  DARK = 'dark',
}

function useTheme(): [THEME, () => void] {
  const defaultMode = (localStorage.getItem('mode') || THEME.LIGHT) as THEME
  const [mode, setMode] = useState<THEME>(defaultMode)
  const toggle = useCallback(() => {
    setMode(mode === THEME.LIGHT ? THEME.DARK : THEME.LIGHT)
    document.body.classList.remove(mode)
    document.body.classList.add(mode === THEME.LIGHT ? THEME.DARK : THEME.LIGHT)
    localStorage.setItem(
      'mode',
      mode === THEME.LIGHT ? THEME.DARK : THEME.LIGHT
    )
  }, [mode])
  useEffect(() => {
    document.body.classList.add(mode)
  }, [])
  return [mode, toggle]
}

export default useTheme
