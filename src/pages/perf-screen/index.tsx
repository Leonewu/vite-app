import React, { useEffect, useMemo, useRef } from 'react'
import { multiply } from '@/utils'
import { message } from 'antd'
import { useFullscreen } from 'ahooks'
import defaultBgImage from './images/bg.jpg'
import defaultBg from './images/title.png'
import { ReactComponent as FullscreenIcon } from './images/fullscreen.svg'
import { ReactComponent as CancelFullscreenIcon } from './images/cancel-fullscreen.svg'
import { useInterval, useHideCursor, useMouseStop } from '@/hooks'
import styles from './index.module.css'
import { usePerfData, useScrollList } from './models'
import { Province, Station, Consultant } from './sections/table'
import Celebration from './sections/celebration'
import ScrollList from '@/components/ScrollList'
import Countdown from '@/components/Countdown'
import Doc from './sections/doc'

function format(time: number = 0) {
  const now = new Date().getTime() / 1000
  const distance = now - time
  if (distance < 60) {
    return '刚刚'
  }
  if (distance > 60 && distance < 3600) {
    return `${Math.floor(distance / 60)}分钟前`
  }
  return `${Math.floor(distance / 3600)}小时前`
}

export default () => {
  const { overviewData, fetchOverviewData } = usePerfData()
  const { fetchList } = useScrollList()
  const {
    show_status,
    end_time = 0,
    start_time = 0,
    image_url = {},
    count = 0,
    target = 0,
    rate = 0,
  } = overviewData || {}
  const perfId = ''
  const ref = useRef<any>()
  const celebrationRef = useRef<any>()
  // 隐藏鼠标
  useHideCursor(ref, 15000)
  const [isStop] = useMouseStop(2000)
  const [isFullscreen, { toggleFull }] = useFullscreen(
    document.querySelector('html')
  )
  // 接口轮询
  const [startPoll, clearPoll] = useInterval(
    () => {
      fetchOverviewData({ performance_show_id: perfId })
        .then((res) => {
          if (res?.show_status === 4) {
            // 活动结束
            clearPoll()
          }
        })
        .catch((err) => {
          if ([7845, 7846].includes(err?.err)) {
            const msg = err.err === 7845 ? err.msg : '获取业绩大屏数据失败'
            message.error(msg)
            clearPoll()
          }
        })
    },
    7000,
    { immediate: true }
  )

  useEffect(() => {
    console.log(document.body.clientWidth)
    console.log(window.screen.width)
    console.log(window.screen.width)
    startPoll()
    return () => {
      clearPoll()
    }
  }, [])

  const WIDTH = 1920
  const HEIGHT = 1080

  const autoplay = useMemo(() => {
    return true
  }, [])

  const renderCarouselList = () => {
    // 展示签单记录
    return (
      <>
        <img src={image_url.record_image || defaultBg} />
        <div className={styles.content}>
          <ScrollList<any>
            fetchList={() => {
              return fetchList()
            }}
            itemHeight={48}
            render={(item) => {
              const time = format(item.time_stamp)
              return (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <span>
                    {item.teacher_name}({item.station_name})：签单科次+
                    {item.sign_num}
                  </span>
                  <span>{time}</span>
                </div>
              )
            }}
            rowKey={(item) => `${item.order_id}-${item.teacher_id}`}
          />
        </div>
      </>
    )
  }

  const renderCountdown = () => {
    const now = new Date().getTime() / 1000
    if (end_time > 0 && now < end_time) {
      // 结束倒计时
      return (
        <Countdown
          label="业绩冲刺倒计时："
          deadline={end_time}
          run={true}
          onEnd={() => {
            celebrationRef.current.show(count)
          }}
        />
      )
    }
    if (now < start_time) {
      // 未开始
      return <Countdown label="开始倒计时：" deadline={start_time} run={true} />
    }
    return null
  }

  const style = useMemo(() => {
    const s = {
      backgroundImage: `url(${image_url.background_image || defaultBgImage})`,
      '--width': `${WIDTH}px`,
      '--height': `${HEIGHT}px`,
      '--bg-image': `url(${defaultBg})`,
    } as React.CSSProperties
    if (window.screen.width !== WIDTH) {
      // 屏幕不是指定宽度需要缩放
      const scale =
        window.screen.width > WIDTH
          ? (WIDTH / window.screen.width).toFixed(5)
          : (window.screen.width / WIDTH).toFixed(5)
      s.transform = `scale(${scale})`
      s.transformOrigin = '0 0'
    }
    return s
  }, [image_url])

  return (
    <div className={styles.preview} style={style} ref={ref}>
      <Doc />
      <Celebration ref={celebrationRef} />
      <div
        className={`${styles.fullScreen} ${!isStop && styles.show}`}
        onClick={toggleFull}
      >
        {isFullscreen ? <CancelFullscreenIcon /> : <FullscreenIcon />}
      </div>
      <section
        className={styles.left}
        onClick={() => {
          celebrationRef.current.show(count)
        }}
      >
        <Province
          bg={image_url.province_order_image || defaultBg}
          autoplay={autoplay}
          perfId={perfId}
        />
        <div>
          <Consultant
            bg={image_url.consultant_order_image || defaultBg}
            autoplay={autoplay}
            perfId={perfId}
          />
          <p className={styles.notice}>数据更新时间：刚刚</p>
        </div>
      </section>
      <section className={styles.middle}>
        <img
          className={styles.middleBg}
          src={image_url.topic_image || defaultBg}
        />
        <div className={styles.countdown}>{renderCountdown()}</div>
        <ul
          className={styles.target}
          style={{ visibility: show_status === 1 ? 'hidden' : 'visible' }}
        >
          <li>
            <span>{target?.toLocaleString()}</span>
            <span>目标科次</span>
          </li>
          <li>
            <span>{count?.toLocaleString()}</span>
            <span>签单科次</span>
          </li>
          <li>
            <span>{multiply(+(rate ?? 0), 100)}%</span>
            <span>完成率</span>
          </li>
        </ul>
        <div className={styles.list}>{renderCarouselList()}</div>
      </section>
      <section className={styles.right}>
        <Station
          bg={image_url.station_order_image || defaultBg}
          autoplay={autoplay}
          perfId={perfId}
        />
      </section>
    </div>
  )
}
