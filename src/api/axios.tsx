import Axios from 'axios'
import axios, { AxiosPromise, AxiosRequestConfig, Cancel, Canceler } from 'axios'

import { BASE_URL, TIMEOUT } from './config'

const instance = axios.create({
  // 默认的配置
  baseURL: 'http://123.57.176.198:3000', // -> http://123.57.176.198:3000/banner
  timeout: TIMEOUT, // -> 5000
  headers: {},
})

instance.interceptors.request.use(
  // 请求拦截
  (config) => {
    // 1.发送网络请求时, 在界面的中间位置显示Loading的组件

    // 2.某一些请求要求用户必须携带token, 如果没有携带, 那么直接跳转到登录页面

    // 3.params/data序列化的操作
    return config
  },
  (err) => {
    return Promise.reject(err);
  }
)
instance.interceptors.response.use(
  // 响应拦截
  (res) => {
    return res
  },
  (err) => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          console.log('请求错误')
          return Promise.reject(err);
          break
        case 401:
          console.log('未授权访问')
          return Promise.reject(err);
          break
        default:
          console.log('其他错误信息')
          return Promise.reject(err);
      }
    }
    return err
  }
)

export default (options: AxiosRequestConfig): [AxiosPromise, Canceler | null] => {
  let canceler: Canceler | null = null;
  options.cancelToken = new Axios.CancelToken((cancel: Canceler) => {
    canceler = cancel
  })
  return [ instance(options), canceler ];
}
