import React, { useState } from 'react'
import { InfoCircleOutlined } from '@ant-design/icons'
import { notification } from 'antd'
import { ReactComponent as Doc } from '../../README.md'
import styles from './index.module.css'
import { useMouseStop } from '@/hooks'

export default () => {
  const [visible, setVisible] = useState(false)
  const [isStop] = useMouseStop(2000)
  return (
    <InfoCircleOutlined
      className={`${styles.icon} ${!isStop && styles.show}`}
      onClick={() => {
        if (visible) return
        setVisible(true)
        notification.open({
          message: '',
          placement: 'topLeft',
          duration: null,
          className: styles.notify,
          onClose() {
            setVisible(false)
          },
          description: <Doc />,
        })
      }}
    />
  )
}
