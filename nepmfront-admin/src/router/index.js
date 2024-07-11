import { createRouter, createWebHashHistory } from 'vue-router'
import { useTokenStore } from '@/stores/token'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Login.vue'),
    meta:{title:"Home"}
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta:{title:"登录"}
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Admin.vue'),
    meta:{title:"主页"},
    children : [
      {path: '/data/publicSupervisor', name: 'PublicSupervisor', component: () => import('../views/PublicSupervisor.vue'),meta:{title:"公众监督数据管理>公众监督数据列表"}},
      {path: '/data/requiredAQI', name: 'RequiredAQI', component: () => import('../views/RequiredAQI.vue'),meta:{title:"公众监督数据管理>确认AQI数据列表"}},
      {path: '/count/provincialGrouping', name: 'ProvincialGrouping', component: () => import('../views/ProvincialGrouping.vue'),meta:{title:"统计数据管理>省分组检查统计"}},
      {path: '/count/aqiExponential', name: 'AQIExponential', component: () => import('../views/AQIExponential.vue'),meta:{title:"统计数据管理>AQI指数分布统计"}},
      {path: '/count/aqiTrend', name: 'AQITrend', component: () => import('../views/AQITrend.vue'),meta:{title:"统计数据管理>AQI趋势分布统计"}},
      {path: '/count/otherData', name: 'OtherData', component: () => import('../views/OtherData.vue'),meta:{title:"统计数据管理>其他数据统计"}},
    ]
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta:{title:"注册"}
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// router.beforeEach((to, from, next) => {
//   let tokenStore = useTokenStore();
//   const token = tokenStore.token;
//   if (token || to.path === '/login' || to.path === '/register') {
//       next();
//   } else {
//       next({ path: '/login' });
//   }
// })

export default router
