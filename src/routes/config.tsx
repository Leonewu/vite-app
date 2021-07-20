import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import loadable from '@loadable/component'
import Sandwiches from '@/page/Sandwiches'

const Tacos = loadable(() => import('@/page/Tacos'))
const PerfScreen = loadable(() => import('@/page/perf-screen'))
const Child = loadable(() => import('@/page/Tacos/child'))

type RouteType = {
  path: string
  component: React.ReactNode
  sider?: boolean
  layout?: boolean
  render?: (
    props: React.PropsWithChildren<Record<string, any>>
  ) => React.ReactNode
  auth?: string[]
  children?: RouteType[]
}

const config: RouteType[] = [
  {
    path: '/sandwiches',
    component: Sandwiches,
  },
  {
    path: '/sandwiches1',
    sider: false,
    component: Sandwiches,
  },
  {
    path: '/tacos',
    component: Tacos,
    auth: [],
    children: [
      {
        path: '/c',
        component: Child,
      },
    ],
  },
  {
    path: '/perf-screen',
    component: PerfScreen,
    layout: false,
  },
]

export default config
