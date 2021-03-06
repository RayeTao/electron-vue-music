import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            redirect: { name: 'music' },
            component: require('@/views/Home').default,
            children: [
                {
                    path: 'music',
                    name: 'music',
                    component: () => import('../views/music/index.vue')
                }, {
                    path: 'playlist-detail',
                    name: 'playlist-detail',
                    component: () => import('../views/playlist/detail')
                }
            ]
        },
        {
            path: '*',
            redirect: '/'
        },
        {
            path: '/login',
            name: 'login',
            component:()=>import('../components/Login')
        }
    ]
})
