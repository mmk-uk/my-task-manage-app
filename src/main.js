import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/sass/style.scss'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ja'
import 'element-ui/lib/theme-chalk/index.css'
import mdiVue from 'mdi-vue/v2'
import * as mdijs from '@mdi/js'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'



Vue.use(ElementUI, { locale })
Vue.use(mdiVue, {
  icons: mdijs
})
Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
