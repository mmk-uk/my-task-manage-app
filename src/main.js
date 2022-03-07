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
import VModal from 'vue-js-modal'



import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCg58YDmEp9k4kgqUs33SmYhUVvrmb_WMY",
  authDomain: "my-task-manage-app.firebaseapp.com",
  projectId: "my-task-manage-app",
  storageBucket: "my-task-manage-app.appspot.com",
  messagingSenderId: "438046288064",
  appId: "1:438046288064:web:ae359218626cd55afe2525"
};

initializeApp(firebaseConfig);




Vue.use(ElementUI, { locale })
Vue.use(mdiVue, {
  icons: mdijs
})
Vue.use(VueAwesomeSwiper)

Vue.use(VModal);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

