import { createRouter, createWebHashHistory } from 'vue-router'
import { useTokenStore } from '@/stores/token'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/supervisor',
    name: 'Supervisor',
    component: () => import('../views/Supervisor.vue'),
    children : [
      {path: '', name: 'Feedback', component: () => import('../views/Feedback.vue')},
      {path: '/history', name: 'History', component: () => import('../views/History.vue')},
      {path: '/mine', name: 'Mine', component: () => import('../views/Mine.vue')},
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  let tokenStore = useTokenStore();
  const token = tokenStore.token;
  if (token || to.path === '/login' || to.path === '/register') {
      next();
  } else {
      console.log('token为空');
      next({ path: '/login' });
  }
})

export default router
