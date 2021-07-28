import React, { useState } from 'react'
import { ReactComponent as Icon } from './sun-moon.svg'
import './index.css'

export default () => {
  const [state, setState] = useState<'light' | 'dark'>('light')
  return (
    <Icon
      className="mode"
      onClick={() => {
        setState(state === 'light' ? 'dark' : 'light')
      }}
    />
  )
}
