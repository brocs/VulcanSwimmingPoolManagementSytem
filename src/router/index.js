import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/components/Login.vue';
import AdminDashboard from '@/components/Admin-Dashboard.vue';
import Dashboard from '@/components/Dashboard.vue';
import CreateEmployee from '@/components/CreateEmployee.vue';

const routes = [
  {
    path: '/', // Login path
    name: 'Login',
    component: Login,
  },
  {
    path: '/Login',
    redirect: '/', // Redirect /Login to /
  },
  {
    path: '/Admin-Dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAdmin: true }, // This route requires admin access
    beforeEnter: (to, from, next) => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.role === 'admin') {
        next();
      } else {
        next({ name: 'Dashboard' }); // Redirect to Dashboard if not admin
      }
    },
  },
  {
    path: '/Dashboard', // Dashboard path
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        next();
      } else {
        next({ name: 'Login' }); // Redirect to Login if not logged in
      }
    },
  },

  {
    path: '/CreateEmployee',
    component: CreateEmployee,
  },
  // other routes...
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
