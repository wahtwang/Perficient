import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login'
import Home from '@/components/home/Home'
import Index from '@/components/index/Index'
import SearchReserve from '@/components/searchReserve/SearchReserve'
import PersonalMsg from '@/components/personalMsg/PersonalMsg'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base:
    process.env.NODE_ENV === 'production' //用于部署服务器时mode:'history'的解决方案
      ? '/' //'/views/index2.html/'
      : '/',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        { path: 'index', component: Index },
        { path: 'searchReserve', component: SearchReserve },
        { path: 'personalMsg', component: PersonalMsg }
      ]
    }
  ]
})
