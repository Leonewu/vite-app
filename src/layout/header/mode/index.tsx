import React, { useMemo } from 'react'
import { ReactComponent as Icon } from './sun-moon.svg'
import './index.css'
import useTheme from '../../theme'

export default () => {
  const [mode, toggle] = useTheme()
  return <Icon className={`mode ${mode}`} onClick={toggle} />
}
