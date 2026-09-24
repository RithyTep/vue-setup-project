import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'

const routes = [
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "LoginView" */ '@/views/LoginView.vue'),
  },
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', redirect: '/dashboard' },
      {
        path: 'dashboard',
        component: () => import(/* webpackChunkName: "HomeView" */ '@/views/HomeView.vue'),
      },
      {
        path: 'about',
        component: () => import(/* webpackChunkName: "AboutView" */ '@/views/AboutView.vue'),
      },
      { path: ':pathMatch(.*)*', redirect: '/dashboard' },
    ],
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  console.log('Navigating from', from.fullPath, 'to', to.fullPath)
  next()
})
