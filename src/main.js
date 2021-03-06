import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import '@/plugins/element'
import '@/requires/axios'
import '@/requires/echart'
import '@/assets/icon/iconfont.css'
import dateTime from 'vue-date-time-m'
Vue.component('data-time', dateTime)

Vue.config.productionTip = false

var vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
