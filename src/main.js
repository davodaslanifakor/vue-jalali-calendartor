import Vue from 'vue'
import App from '~/layouts/default.vue'
import {store} from '~/store/store.js'
import router from './routes.js'
import Vuebar from 'vuebar';
require("./css.js");

Vue.use(Vuebar);
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
