import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


//导入element-plus框架
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';

//导入图标
import "@/assets/icon/iconfont.css";

//导入封装的axios
import request from "@/utils/request";

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
const app = createApp(App);
app.use(router).use(ElementPlus)
app.config.globalProperties.Request = request;
app.mount('#app')