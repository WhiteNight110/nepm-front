import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Admin/Admin.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login/Login.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Admin/Admin.vue'),
    children : [
      {path: '/data/publicSupervisor', name: 'PublicSupervisor', component: () => import('../views/PublicSupervisor/PublicSupervisor.vue')},
      {path: '/data/requiredAQI', name: 'RequiredAQI', component: () => import('../views/RequiredAQI.vue')},
      {path: '/count/provincialGrouping', name: 'ProvincialGrouping', component: () => import('../views/ProvincialGrouping/ProvincialGrouping.vue')},
      {path: '/count/aqiExponential', name: 'AQIExponential', component: () => import('../views/AQIExponential/AQIExponential.vue')},
      {path: '/count/aqiTrend', name: 'AQITrend', component: () => import('../views/AQITrend/AQITrend.vue')},
      {path: '/count/otherData', name: 'OtherData', component: () => import('../views/OtherData/OtherData.vue')},
    ]
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register/Register.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (token || to.path === '/login' || to.path === '/register') {
      next();
  } else {
      next({ path: '/login' });
  }
})

export default router
