import loadable from '@loadable/component'
import type { RouteItem } from '../routes'

const PerfScreen = loadable(() => import('@/pages/perf-screen'))

const routes: RouteItem[] = [
  {
    name: 'perf-screen📺',
    path: '/perf-screen',
    component: PerfScreen,
    layout: false,
  },
]

export default routes
