import { useAuthStore } from '@/stores/auth';
import DashboardView from '@/views/DashboardView.vue'
import LoginView from '@/views/LoginView.vue'
import AdminDashboardView from '@/views/AdminDashboardView.vue'


import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
   {
    path: '/',
    name: 'Dashboard',
    component: DashboardView
   },
   {
    path: '/login',
    name: 'Login',
    component: LoginView
   },
   {
    path: '/admin',
    name: 'Admin',
    component: AdminDashboardView
   }  
  ]
});

router.beforeEach(async (to) => {
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path);
  const auth = useAuthStore();

  // If auth is required and the user is not logged in
  if (authRequired && !auth.user) {
    auth.returnUrl = to.fullPath;
    return '/login'
  }
})

export default router
