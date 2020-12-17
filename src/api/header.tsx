import axios from './axios'

// 头部搜索获取歌曲
export const searchSongList = (searchStr: string, limit:number = 6, type:number = 1) => axios({
  url: '/search',
  params: {
    keywords: searchStr,
    limit,
    type
  }
});