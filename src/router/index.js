
import { createRouter, createWebHashHistory, } from 'vue-router'

export const asyncRoutes = [
    {
        path: '/', redirect: '/home'
    },
    {
        path: '/home',
        component: () => import('../views/Home/Home.vue'),
        meta: {
            isShowNav: true
        }
    },
    {
        path: '/category',
        component: () => import('../views/Category/Category.vue'),
        meta: {
            isShowNav: true
        }
    },
    {
        path: '/cart',
        component: () => import('../views/Cart/Cart.vue'),
        meta: {
            isShowNav: true
        }
    },
    {
        path: '/login',
        component: () => import('../views/Login/Login.vue'),
        meta: {
            isShowNav: false
        }
    },
    {
        path: '/user',
        component: () => import('../views/User/User.vue'),
        meta: {
            isShowNav: true
        }
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        ...asyncRoutes,
        {
            path: '/:pathMatch(.*)', redirect: '/'
        },

    ]
})

router.beforeEach((to, from, next) => {
    next()
})

export default router