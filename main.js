import App from './App'
import uviewPlus from 'uview-plus'
import * as Pinia from 'pinia'
// #ifndef MP-WEIXIN
import 'vant/lib/index.css';
// #endif
// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
   app.use(uviewPlus)
  app.use(Pinia.createPinia())
  uni.$u.config.unit = 'rpx'
  return {
    app,
	Pinia
  }
}
// #endif