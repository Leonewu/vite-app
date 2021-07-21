import type { RouteProps } from 'react-router-dom'
import loadable from '@loadable/component'
import Ramen from '@/pages/Ramen'
import NotFound from '@/layout/404'

const Donut = loadable(() => import('@/pages/Donut'))
const PerfScreen = loadable(() => import('@/pages/perf-screen'))
const Child = loadable(() => import('@/pages/Donut/child'))

export interface RouteType extends RouteProps {
  /** if needs hide sider, set it false. default true */
  sider?: boolean
  /** if needs hide layout, set it false. default true */
  layout?: boolean
  /** if needs hide header, set it false. default true */
  header?: boolean
  /** auth code  */
  auth?: string[]
  children?: RouteType[]
  /**
   * @describtion path should start with '/'
   * */
  path?: `/${string}`
  /** internal attribute */
  _parentPath?: string
  name?: string
  /**
   * @description redirect url
   * @notice It is a fullpath, not a relative path.
   * */
  redirect?: `/${string}`
}

export const routes: RouteType[] = [
  {
    path: '/',
    redirect: '/donut',
  },
  {
    name: 'pizza🍕',
    path: '/pizza',
    component: Ramen,
  },
  {
    name: 'onigiri🍙(without layout)',
    path: '/onigiri',
    layout: false,
    component: Ramen,
  },
  {
    name: 'ramen🍜(without sider)',
    path: '/ramen',
    sider: false,
    component: Ramen,
  },
  {
    name: 'donut🍩',
    path: '/donut',
    component: Donut,
    auth: [],
    children: [
      {
        name: 'donut-child',
        path: '/donut-child',
        component: Child,
      },
    ],
  },
  {
    name: 'perf-screen',
    path: '/perf-screen',
    component: PerfScreen,
    layout: false,
  },
  {
    component: NotFound,
  },
]

export type FlatRouteType = RouteType & {
  /** 全路径，绝对路径 */
  fullpath?: string
  /** 父级路由 */
  parent?: FlatRouteType
}
function flat(
  routes: FlatRouteType[],
  parent?: FlatRouteType
): FlatRouteType[] {
  /* 拍平并且补上 fullpath 和 parent 属性 */
  return routes.reduce((pre, cur) => {
    const parentPath = parent?.fullpath || ''
    const fullpath = `${parentPath}${cur.path}`
    const route = { ...cur, fullpath, parent }
    pre.push(route)
    if (cur.children) {
      pre.push(...flat(cur.children, route))
    }
    return pre
  }, [] as FlatRouteType[])
}

export const flatRoutes = flat(routes)
