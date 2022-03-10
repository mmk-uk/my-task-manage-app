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
    component: () => import('../views/MainView.vue'),
    props: true
  },
  {
    path: '/categorymanage',
    name: 'categorymanage',
    component: () => import('../views/CategoryView.vue'),
    props: true
  },
  {
    path: '/add',
    name: 'add',
    component: () => import('../views/AddView.vue'),
    props: true
  },
  {
    path: '/archive',
    name: 'archive',
    component: () => import('../views/ArchiveView.vue'),
    props: true
  },
  {
    path: '/config',
    name: 'config',
    component: () => import('../views/ConfigView.vue'),
    props: true
  },
  {
    path: '/edittask',
    name: 'edittask',
    component: () => import('../views/EditTaskView.vue'),
    props: true
  },
  {
    path: '/editevent',
    name: 'editevent',
    component: () => import('../views/EditEventView.vue'),
    props: true
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: () => import('../views/CalendarView.vue'),
    props: true
  }
  


  


]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {

  const userinfo = JSON.parse(localStorage.getItem('userinfo')) || false;
  const isAuthenticated = userinfo?true:false;

  if ((to.name == 'main' ||to.name == 'categorymanage' || to.name == 'add'|| to.name == 'archive'|| to.name == 'config' || to.name == 'edittask' || to.name == 'editevent'  || to.name == 'calendar') && !isAuthenticated){
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