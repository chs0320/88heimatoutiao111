import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './styles/index.less'
import axios from 'axios'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.prototype.$axios = axios // 将axios共享给所有的实例使用    prototype原型属性     vue所有的属性都带$
Vue.use(ElementUI) // 注册所有的组件，就用vue.use
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
