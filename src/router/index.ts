import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/employee',
    name: 'employee',
    component: () => import('@/pages/employee/Index.vue'),
  },
   {
    path: '/documents',
    name: 'documents',
    component: () => import('@/pages/documents/Index.vue'),
  },
]

const router = createRouter({
    history: createWebHashHistory(),
  routes,
})

export default router