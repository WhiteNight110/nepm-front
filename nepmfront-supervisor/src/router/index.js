import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login/Login.vue'
import Register from '../views/Register/Register.vue'
import SelectGrid from '../views/SelectGrid/SelectGrid.vue'
import SelectAqi from '../views/SelectAqi/SelectAqi.vue'
import FeedbackList from '../views/FeedbackList/FeedbackList.vue'

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
    path: '/register',
    name: 'Register',
    component: Register
  },{
    path: '/selectGrid',
    name: 'SelectGrid',
    component: SelectGrid
  },{
    path: '/selectAqi',
    name: 'SelectAqi',
    component: SelectAqi
  },{
    path: '/feedbackList',
    name: 'FeedbackList',
    component: FeedbackList
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router