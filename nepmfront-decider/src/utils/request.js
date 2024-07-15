import axios from "axios";
import { ElLoading, ElMessage } from 'element-plus';


const request = axios.create({
    baseURL: 'http://localhost:8000/',
    timeout: 10000,
});


//请求前拦截
request.interceptors.request.use(config => {
    console.log('请求前拦截，config',config);
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