import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: '/tags',
        name: 'tags',
        component: () => import('../views/tags/TagsCreate.vue')
      },
      {
        path: '/blog/create',
        name: 'blog',
        component: () => import('../views/blog/BlogCreate.vue')
      },
      {
        path: '/blog/update/:id',
        name: 'blogupdate',
        component: () => import('../views/blog/BlogCreate.vue')
      },
      {
        path: '/blog/list',
        name: 'bloglist',
        component: () => import('../views/blog/BlogList.vue')
      },
      {
        path: '/link/list',
        name: 'linklist',
        component: () => import('../views/link/LinkList.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/LoginIndex.vue'),
    meta: {
      isLogin: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (!to.meta.isLogin && !token) {
    next('/login')
  }
  next()
})
export default router
