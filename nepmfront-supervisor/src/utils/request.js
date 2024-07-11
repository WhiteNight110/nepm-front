import axios from "axios";
import { ElLoading, ElMessage } from 'element-plus';
import router from "@/router";
import { useTokenStore } from "@/stores/token";


const request = axios.create({
    baseURL: 'http://localhost:8080/nepm/',
    timeout: 10000,
});


//请求前拦截
request.interceptors.request.use(config => {
    console.log('请求前拦截，config',config);
    let tokenStore = useTokenStore()
    if (tokenStore.token) {
        config.headers.Authorization = tokenStore.token
    }else{
        console.log("url=",config.url)
        if(config.url !== 'supervisor/getSupervisorById' && config.url !== 'supervisor/saveSupervisor'
             && config.url !== 'supervisor/getSupervisorByIdByPass'){
            console.log("用户认证失败，请重新登录")
            router.push({name: 'Login'});
            return Promise.reject("用户认证失败，请重新登录");
        }
    }
    return config;
}, error => {
    ElMessage({
        message: '发送请求失败',
        type: 'warning',
    });
    return Promise.reject("发送请求失败");
});
//请求后拦截
request.interceptors.response.use(response => {
    console.log('请求后拦截，response',response);
    const { status,data } = response;
    if(status === 200){
        
        return response;
    }else{
    
        return Promise.reject(data.data);
    }
}, (error) => {
    console.log('error!',error);
    
    return Promise.reject(error);
});


export default request;