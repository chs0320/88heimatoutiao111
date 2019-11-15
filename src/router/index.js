import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '../views/layout/Home.vue'
import login from '../views/login/login.vue'
// @是在vue中提供的一个路径的方法，永远指向src
import home from '@/views/home/index.vue'
import article from '@/views/article'
import publish from '@/views/publish'

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

export default router
