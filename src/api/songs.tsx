import axios from './axios'

// 获取歌单
export const getSongs = (offset: number, limit: number = 35) => axios({
  url: `/top/playlist?limit=${limit}&offset=${offset}`
})
