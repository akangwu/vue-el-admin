import Vue from 'vue'
import VueRouter from 'vue-router'

import layout from './views/layout'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'layout',
    redirect: {name: 'index'},
    component: layout,
    children: [
      {
        path: '/index',
        name: 'index',
        component: ()=>import('./views/index/index')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: ()=> import('./views/login')
  },
  {
    path: '*',
    redirect: {name: 'index'}
  }
]

const router = new VueRouter({
  // mode: 'history',
  routes
})

export default router
