import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
Vue.config.productionTip = false

// 引入swiper样式
import 'swiper/css/swiper.css'
import '@/components/ElementUi/element'

import API from '@/api'

import Pagination from './components/Pagination'
Vue.component(Pagination.name, Pagination)

// 定义时间过滤器
function padZero(n) {
  return n > 9 ? n : '0' + n
}
Vue.filter('timeFormatter', (time) => {
  const date = new Date(time)
  const mm = padZero(date.getMinutes())
  const ss = padZero(date.getSeconds())
  return `${mm}:${ss}`
})

Vue.prototype.$API = API

import VueLazyload from 'vue-lazyload'

const loadimage = require('./assets/giphy.gif')

Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: loadimage,
  attempt: 1
})
new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
  }
}).$mount('#app')
