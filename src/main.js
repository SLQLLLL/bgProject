// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import elementUI from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
Vue.use(elementUI)
Vue.config.productionTip = false

import gCom from './commn'
for(let i in gCom){
  Vue.component(i,gCom[i])
}
//创建一个图片地址
Vue.prototype.$imgUrl = 'http://localhost:3000'

//全局引入echarts
let Echarts = require('echarts')
Vue.prototype.$Echarts = Echarts

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
