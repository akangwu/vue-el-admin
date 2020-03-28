import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store'
import './plugins/element.js'

//引入全局导航栏配置文件
import $conf from './common/config/config'
//在原型上宓昂增加一个配置文件
Vue.prototype.$conf = $conf

Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
