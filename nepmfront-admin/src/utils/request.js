import axios from "axios";
import { ElLoading, ElMessage } from 'element-plus';
import router from "@/router";


const request = axios.create({
    baseURL: 'http://10.1.232.186:8080/nepm/',
    timeout: 10000,
});


//请求前拦截
request.interceptors.request.use(config => {
    console.log('请求前拦截，config',config);
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = token
    }else{
        console.log("url=",config.url)
        if(config.url !== 'admins/getAdminsByCode' && config.url !== 'admins/adminsRegister'){
            console.log("用户认证失败，请重新登录")
            ElMessage({
                message: '用户认证失败，请重新登录',
                type: 'warning',
            })
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
    ElMessage({
        message: error.message,
        type: 'error',
    })
    router.push({name: 'Login'});
    return Promise.reject("网络异常");
});


export default request;