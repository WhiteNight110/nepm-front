import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//导入element-plus框架
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';

//使用路由守卫实现登录权限验证
router.beforeEach(function(to,from,next){
    let admins = sessionStorage.getItem('admins');
    if(!(to.path=='/'||to.path=='/login')){
        if(admins==null){
            router.push('/login');
        }
    }
    next();
});

createApp(App).use(router).use(ElementPlus).mount('#app')