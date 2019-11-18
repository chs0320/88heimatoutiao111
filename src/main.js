import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './styles/index.less'
import axios from 'axios'
import '../node_modules/nprogress/nprogress.css'
import JSONbig from 'json-bigint'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.prototype.$axios = axios // 将axios共享给所有的实例使用    prototype原型属性     vue所有的属性都带$
Vue.use(ElementUI) // 注册所有的组件，就用vue.use
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
// 这个不能用箭头函数吧
axios.defaults.transformResponse = [function (data, headers) {
  try {
    // this.loadArticles(this.page)
    return JSONbig.parse(data)
  } catch (err) {
    // try里面的代码一旦发生异常就执行catch里面的代码
    console.log(err)
    return {}
  }
}]
// axios自带的请求拦截器和响应拦截器  这里用的请求拦截器
// config是在请求拦截器中本次请求相关的配置对象，就是最后发给后端的配置对象
axios.interceptors.request.use(function (config) {
  // 我们可以在拦截器中对congig进行统一设置
  console.log('请求拦截器', config)
  const token = window.localStorage.getItem('user-token')
  // 统一添加token
  if (token) {
    // 在axios中都会自动拼接成tostring
    config.headers.Authorization = `Bearer ${token}`
  }
  // return config  是通行规则
  return config
}, function (error) {
  console.log(error)
  return Promise.reject(error)
})
