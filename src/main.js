import Vue from 'vue'
import VueRx from 'vue-rx'
import Rx from 'rxjs/Rx'
import router from './router';
import App from './app.vue'

Vue.use(VueRx, Rx)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
