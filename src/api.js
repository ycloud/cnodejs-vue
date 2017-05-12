import axios from 'axios'
import qs from 'qs'
import store from '@/store'
import * as types from '@/store/mutation-types'

const http = axios.create({
  baseURL: 'https://share.la/cnodejs'
})
const get = (url, data) => http.get(url, {
  params: data
})

http.interceptors.request.use((config) => {
  if (config.method === 'post') config.data = qs.stringify(config.data)
  store.commit(types.TOGGLE_LOADING, true)
  return config
}, error => Promise.reject(error))

http.interceptors.response.use((response) => {
  store.commit(types.TOGGLE_LOADING, false)
  return response.data
}, error => {
  store.commit(types.TOGGLE_LOADING, false)
  store.commit(types.SET_ERROR, '服务器太忙了，需要休息一下！')
  return Promise.reject(error)
})

export default {
  getCollects: loginname => get(`/collects/${loginname}`),
  getMessages: accesstoken => get('/messages', {accesstoken}),
  getTopic: id => get(`/topics/${id}`),
  getTopics: data => get('/topics', data),
  getUser: loginname => get(`/users/${loginname}`),
  postToken: accesstoken => http.post('https://cnodejs.org/api/v1/accesstoken', {accesstoken})
}
