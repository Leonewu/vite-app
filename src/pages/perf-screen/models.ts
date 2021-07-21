import { useState, useRef, useMemo } from 'react'

/* 业绩大屏预览 */
const source = new Array(30)
  .fill({
    finish_rate: 0.5818,
    org_id: 0,
    org_name: 'XX分站',
    product_count: 2944,
    rank: 37,
    target_count: 5060,
    consultant_id: 0,
    consultant_name: '饭团团',
    station_name: 'XX分站',
  })
  .map((r, i) => ({
    ...r,
    rank: i + 1,
    org_name: r.org_name + i,
    org_id: i,
    consultant_id: i,
  }))

const fakeList = new Array(100)
  .fill({
    order_id: 3155084,
    province_name: 'XX省区',
    sign_num: 3,
    station_name: 'XX分站',
    station_pk: 160,
    teacher_id: '605d81d7a9815feb81e75dbb',
    teacher_name: '饭团团',
    time_stamp: Math.floor(new Date().getTime() / 1000) - 55,
  })
  .map((r, i) => ({
    ...r,
    time_stamp: r.time_stamp + i,
    order_id: r.order_id + i,
    teacher_id: r.teacher_id + i,
    teacher_name: r.teacher_name + i,
  }))

const now = Math.floor(new Date().getTime() / 1000) + 24 * 3600 * 30

export const usePerfData = () => {
  const [provinceLoading, setProvinceLoading] = useState(false)
  const [stationLoading, setStationLoading] = useState(false)
  const [consultantLoading, setConsultantLoading] = useState(false)
  const [overviewData, setOverviewData] = useState<any>({})

  const fetchProvinceData = async (params: any) => {
    await new Promise((resolve) => {
      setTimeout(resolve, 1000)
    })
    return {
      list: source.slice(params.start, params.start + params.length),
      total: source.length,
    }
  }

  const fetchStationData = async (params: any) => {
    setStationLoading(false)
    await new Promise((resolve) => {
      setTimeout(resolve, 1000)
    })
    return {
      list: source.slice(params.start, params.start + params.length),
      total: source.length,
    }
  }

  const fetchConsultantData = async (params: any) => {
    setConsultantLoading(false)
    await new Promise((resolve) => {
      setTimeout(resolve, 1000)
    })
    return {
      list: source.slice(params.start, params.start + params.length),
      total: source.length,
    }
  }

  const fetchOverviewData = async (params: any) => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const data = {
      end_time: now,
      rate: 0.5925,
      count: 175970,
      show_status: 2,
      start_time: 1620007200,
      target: 297000,
    }
    setOverviewData(data)
    return data
  }
  return {
    provinceLoading,
    stationLoading,
    consultantLoading,
    overviewData,
    fetchProvinceData,
    fetchStationData,
    fetchConsultantData,
    fetchOverviewData,
  }
}

/* 霸屏数据 */
export const useDominateData = () => {
  const [list, setList] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const fetchDominateData: (p: any) => Promise<any[]> = async (params) => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      const res = new Array(10).fill({
        consultant_name: '饭团团团',
        consultant_image:
          'https://avatars.githubusercontent.com/u/22951514?v=4',
        station_name: '广州分站',
        num: 1200,
      })

      setList(res || [])
      setLoading(false)
      return res || []
    } catch (e) {
      console.error(e)
      setLoading(false)
      return list
    }
  }
  return {
    list,
    loading,
    fetchDominateData,
  }
}

/* 签单记录 */
export const useScrollList = () => {
  const [start, setStart] = useState(0)
  const [loading, setLoading] = useState(false)
  const fetchList: () => Promise<any[]> = async () => {
    setLoading(true)
    await new Promise((resolve) => {
      setTimeout(resolve, 1000)
    })
    if (start > 99) {
      setLoading(false)
      return []
    }
    let res
    if (start === 0) {
      res = fakeList.slice(0, 5)
      setStart(5)
    } else {
      res = fakeList.slice(start, start + 1)
      setStart(start + 1)
    }
    setLoading(false)
    return res
  }
  return {
    loading,
    fetchList,
  }
}
