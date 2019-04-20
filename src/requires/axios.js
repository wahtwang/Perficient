import Vue from 'vue'
import axios from 'axios'
Vue.prototype.$http = axios

axios.interceptors.request.use(c => {
  if (c.url !== '/login') {
    c.headers.Authorization = 'bearer ' + localStorage.getItem('token')
  }
  console.log(c)
  return c
})
axios.interceptors.response.use(res => {
  return res
})
