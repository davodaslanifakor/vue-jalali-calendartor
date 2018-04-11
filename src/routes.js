import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        component: App,
        name:dashbord,
        // children: [{
        //     path: '/service',
        //     component: Service,
        //     meta: 'خدمات',
        // }, ]
    },
   


]
const router = new VueRouter({
    routes,
    base: '/12347/',
    mode: 'history'
})
router.beforeEach((to, from, next) => {
    document.title = to.meta
    next()
})
export default router;