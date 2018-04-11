import Vue from 'vue'
import App from './App.vue'
import config from './config.js'
import router from './routes'


// var materialdesigniconsCss = require('./assets/css/materialdesignicons.min.css')
// var bootstrapRtl = require('./assets/css/bootstrap/bootstrap-rtl.css')
// var webFont = require('./assets/css/web-font.css')

new Vue({
    el: '#app',
    data: {
    },
    router,
    render: h => h(App)
})