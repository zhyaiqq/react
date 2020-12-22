import axios from './axios'

// 获取轮播图
export const getTopBanners = () => axios({
  url: '/banner'
})

// 热门推荐歌单
export const getHotRecommendSongs = () => axios({
  url: '/personalized?limit=8'
})

// 新碟上架
export const getNewCDs = () => axios({
  url: '/album/newest'
})

// 榜单
export const getTopList = (id: number) => axios({
  url: '/playlist/detail?id='+ id
})

// 入驻歌手
export const getSingers = () => axios({
  url: '/artist/list?limit=5'
})
