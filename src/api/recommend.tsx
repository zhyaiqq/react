import axios from './axios'

// 获取轮播图
export const getTopBanners = () => axios({
  url: '/banner'
})