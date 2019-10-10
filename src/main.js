import Vue from 'vue'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import { store } from './store'
import VeeValidate from 'vee-validate'
import axios from 'axios'
import { DJANGO_ENDPOINTS } from './config';

Vue.config.productionTip = false

// Axios config
axios.defaults.baseURL = DJANGO_ENDPOINTS.BASE_URL
Vue.prototype.$http = axios

// VeeValidate config
Vue.use(VeeValidate, {
  events: ''
})

// Event bus
export const bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')