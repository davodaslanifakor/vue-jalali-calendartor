import Vue from 'vue'
import App from '~/layouts/default.vue'
import {store} from '~/store/store.js'
import router from './routes.js'
import config from './config.js'
import Vuebar from 'vuebar';

require("./css.js");


Vue.use(Vuebar);
// import { VTooltip, VPopover, VClosePopover } from 'v-tooltip'

// Vue.directive('tooltip', VTooltip)
// Vue.directive('close-popover', VClosePopover)
// Vue.component('v-popover', VPopover)

import Tooltip from 'vue-directive-tooltip';
import 'vue-directive-tooltip/css/index.css';
Vue.use(Tooltip, {
  delay: 0,
  placement: 'top',
  class: 'tooltip-material',
  triggers: ['hover'],
  offset: 0
});



import Ripple from 'vue-ripple-directive'

Vue.directive('ripple', Ripple);

import VuePersianDatetimePicker from 'vue-persian-datetime-picker';
Vue.component('date-picker', VuePersianDatetimePicker);

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
