import axios from './axios'

// 获取榜单
export const getTopList = () => axios({
  url: '/toplist'
})

// 获取榜单详情
export const getTopListDetail = (id: number) => axios({
  url: `/playlist/detail?id=${id}`
})