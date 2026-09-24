import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import(/* webpackChunkName: "HomeView" */ '@/views/HomeView.vue') },
  {
    path: '/about',
    component: () => import(/* webpackChunkName: "AboutView" */ '@/views/AboutView.vue'),
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
