import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/views/Home.vue"
import User from "@/views/User.vue"
import Main from '@/views/Main.vue'
import Mall from '@/views/Mall.vue'
import PageTwo from '@/views/PageTwo.vue'
import PageOne from '@/views/PageOne.vue'
import Login from '@/views/Login.vue'
Vue.use(VueRouter)

const routes = [
    {
        path:'/login',component: Login, name: 'login'
    },{
        path: '/',
        component: Main,
        redirect: '/home',
        children: [
            {
                path: 'home', component: Home, name: 'home'
            },
            {
                path: 'user', component: User, name: 'user'
            },
            {
                path: 'mall', component: Mall, name: 'mall'
            },
            {
                path: 'page1', component: PageOne, name: 'page1'
            },
            {
                path: 'page2', component: PageTwo, name: 'page2'
            },
        ]
    },
    
]

const router = new VueRouter({
    routes
})

export default router