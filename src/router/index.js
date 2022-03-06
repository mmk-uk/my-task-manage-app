import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'title',
    component: () => import('../views/TitleView.vue'),
    props: true
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import('../views/SigninView.vue'),
    props: true
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/SignupView.vue'),
    props: true
  },
  {
    path: '/reset',
    name: 'reset',
    component: () => import('../views/ResetView.vue'),
    props: true
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


router.beforeEach((to, from, next) => {

  const userinfo = JSON.parse(localStorage.getItem('userinfo')) || false;
  const isAuthenticated = userinfo?true:false;

  if ((to.name == 'categorymanage' || to.name == 'add'|| to.name == 'archive'|| to.name == 'config') && !isAuthenticated){
    next({ name: 'title' })
  }
  else if ((to.name == 'title' || to.name == 'signin'|| to.name == 'signup'|| to.name == 'reset') && isAuthenticated){
    next({ name: 'main' })
  }
  else{
    next()
  }


})

export default router