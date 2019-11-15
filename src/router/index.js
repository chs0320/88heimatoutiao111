import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '../views/layout/Home.vue'
import login from '../views/login/login.vue'
// @是在vue中提供的一个路径的方法，永远指向src
import home from '@/views/home/index.vue'
import article from '@/views/article'
import publish from '@/views/publish'
import nprogress from 'nprogress'
Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   redirect: '/home'
  // },
  {
    path: '/',
    component: layout,
    children: [
      {
        path: '',
        component: home
      },
      {
        path: '/article',
        component: article
      },
      {
        path: '/publish',
        component: publish
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: login
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})
// 路由的拦截器   所有页面必须得经过这里
// 这个方法接收一个函数作为参数有三个值
// to代表去哪    from代表来自哪    next是一个方法  用于路由放行（执行逻辑）
router.beforeEach((to, from, next) => {
  // 开启进度条
  nprogress.start()
  console.log('先来这儿暖暖手')
  // 如果是非登录页面   我们才校验登录状态
  if (to.path === '/login') {
    next()
    return //  停止代码往后执行
  }
  // 获取用户token    判断是否有token   有就跳转  没有就跳转到登录页
  const token = window.localStorage.getItem('user-token')
  if (token) {
    next() //  通过
  } else {
    next('/login') // 跳转到指定路由
  }
})
// 路由导航结束触发的钩子函数
router.afterEach((to, from) => {
  nprogress.done()
})
export default router
