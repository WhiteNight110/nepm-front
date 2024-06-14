import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login/Login.vue'
import Index from '../views/Index/Index.vue'
import HelloWorld from '../components/HelloWorld.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: Login
  },{
    path: '/login',
    name: 'Login',
    component: Login
  },{
    path: '/index',
    name: 'Index',
    component: Index,
    children: [
      {
        path: '/index',
        component: HelloWorld
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router