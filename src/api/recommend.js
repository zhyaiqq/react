import axios from './axios'

export function getTopBanners () {
  return axios({
    url: '/banner'
  })
}