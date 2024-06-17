import axios from "axios";
import { ElLoading, ElMessage } from 'element-plus';
import router from "@/router";


const request = axios.create({
    baseURL: 'http://192.168.133.1:8080/nepm',//TODO: 根据对应的后端返回数据格式进行修改
    timeout: 10000,
});

//请求前拦截
request.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = 'Bearer ' + token
    }
    return config;
}, error => {
    ElMessage({
        message: '发送请求失败',
        type: 'warning',
    })
    return Promise.reject("发送请求失败");
});
//请求后拦截
request.interceptors.response.use(response => {
    const responseData = response.data;
    if(responseData.status == "error"){//TODO: 根据对应的后端返回数据格式进行修改
        if(config.errorCallback){
            config.errorCallback();
        }
        return Promise.reject(responseData.message);//TODO: 根据对应的后端返回数据格式进行修改
    }else{
        //TODO: 根据不同的responseData.code进行不同的处理
    }
}, ({response}) => {
    const {status , data} = response;
    if(status === 401){
        ElMessage({
            message: data.message,
            type: 'error',
        })
        router.push({name: 'Login'});
    }
    return Promise.reject("网络异常");
});


export default request;