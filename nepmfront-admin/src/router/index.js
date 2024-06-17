import { createRouter, createWebHashHistory } from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue')
  },{
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login/Login.vue')
  },{
    path: '/admin',
    name: 'Admin',
    meta: {
      authRequired: true
    },
    component: () => import('../views/Admin/Admin.vue'),
    // children: [
    //   {
    //     name: 'index',
    //     path: '/index',
    //     component: HelloWorld
    //   }
    // ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  console.log('token', token)
  console.log('to', to)
  if (to.name != 'Home' && !token) {
    console.log('no token')
    next({ name: 'Home' })
  }
  else {
    console.log('has token')
    next()
  }
})

export default router