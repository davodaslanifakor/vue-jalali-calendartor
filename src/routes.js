import Vue from 'vue'
import App from '~/layouts/default.vue'
import Home from '~/pages/index.vue'
import VueRouter from 'vue-router'
import Meta from 'vue-meta'
Vue.use(VueRouter)
Vue.use(Meta)
const routes = [
    {
        path: '/',
        component: Home,
        meta:'dashbord'
        // children: [{
        //     path: '/service',
        //     component: Service,
        //     meta: 'خدمات',
        // }, ]
    },
   


]
const router = new VueRouter({
    routes,
    base: '/web/',
    mode: 'history'
})
router.beforeEach((to, from, next) => {
    document.title = to.meta
    next()
})
export default router;