import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'title',
    component: () => import('../views/TitleView.vue')
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import('../views/SigninView.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/SignupView.vue')
  },
  {
    path: '/reset',
    name: 'reset',
    component: () => import('../views/ResetView.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('../views/MainView.vue')
  },
  {
    path: '/categorymanage',
    name: 'categorymanage',
    component: () => import('../views/CategoryView.vue')
  },
  {
    path: '/add',
    name: 'add',
    component: () => import('../views/AddView.vue')
  },
  {
    path: '/archive',
    name: 'archive',
    component: () => import('../views/ArchiveView.vue')
  },
  {
    path: '/config',
    name: 'config',
    component: () => import('../views/ConfigView.vue')
  }


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router