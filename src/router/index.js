import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import Home from '@/pages/Home'
import UserCenter from '@/pages/UserCenter'
import Resume from '@/pages/Resume'
import TabNav from '@/pages/TabNav'
import collect from '@/pages/TabNav/collect'
import deliver from '@/pages/TabNav/deliver'
import receive from '@/pages/TabNav/receive'
import publish from '@/pages/TabNav/publish'
import ProjectDetail from '@/pages/ProjectDetail'
import Project from '@/pages/Project'
import ProjectPost from '@/pages/ProjectPost'
import {
    reqLogin
} from '@/api'



let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => {}, () => {})
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => {}, () => {})
    }
}



const router = new VueRouter({
    routes: [{
            path: '*',
            redirect: '/home'
        },
        {
            path: '/home',
            component: ()=>import('@/pages/Home'),
            name: 'home'
        },
        {
            path: '/project',
            component: () => import('@/pages/Project'),
            name: 'project'
        },
        {
            path: '/usercenter',
            component: () => import('@/pages/UserCenter'),
            name: 'usercenter',
            meta: {
                authRequired: true
            },

        },
        {
            path: '/resume',
            component: () => import('@/pages/Resume'),
            name: 'resume',
            meta: {
                authRequired: true
            },
        },
        {
            path: '/tabnav',
            component: () => import('@/pages/TabNav'),
            name: 'tabnav',
            meta: {
                authRequired: true
            },
            redirect: '/tabnav/collect',
            children: [{
                    path: 'collect',
                    component: () => import('@/pages/TabNav/collect'),
                    name: 'collect',
                },
                {
                    path: 'deliver',
                    component: () => import('@/pages/TabNav/deliver'),
                    name: 'deliver',

                },
                {
                    path: 'receive',
                    component: () => import('@/pages/TabNav/receive'),
                    name: 'receive',

                },
                {
                    path: 'publish',
                    component: () => import('@/pages/TabNav/publish'),
                    name: 'publish',

                },
            ]
        },
        {
            path: '/projectdetail',
            component: () => import('@/pages/ProjectDetail'),
            name: 'projectdetail',
            meta: {
                authRequired: true
            },
        },
        {
            path: '/projectpost',
            component: () => import('@/pages/ProjectPost'),
            name: 'projectpost',
            meta: {
                authRequired: true
            },
        }
    ],
    scrollBehavior (to, from, savedPosition) {       //添加该方法
        return { x: 0, y: 0}
      }
    
})

router.beforeEach((to, from, next) => {
    const access_token = localStorage.getItem('access_token')
    if (to.matched.some(record => record.meta.authRequired)) {
        if (access_token == null) {
            window.location = "http://43.138.210.224:9081/yixun/users/login"
        } else {
            next()
        }
    } else {
        next()
    }
})




export default router