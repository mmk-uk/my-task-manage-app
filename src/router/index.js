import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('../views/MainView.vue')
    //component: () => import('../components/ListDisplay.vue')
  },
  {
    path: '/categorymanage',
    name: 'categorymanage',
    component: () => import('../views/CategoryView.vue')
    //component: () => import('../components/ListDisplay.vue')
  },
  {
    path: '/add',
    name: 'add',
    component: () => import('../views/AddView.vue')
    //component: () => import('../components/ListDisplay.vue')
  },
  {
    path: '/archive',
    name: 'archive',
    component: () => import('../views/ArchiveView.vue')
    //component: () => import('../components/ListDisplay.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router