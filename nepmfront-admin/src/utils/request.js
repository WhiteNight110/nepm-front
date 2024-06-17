import axios from "axios";
import { ElLoading, ElMessage } from 'element-plus';

const contentTypeForm = "application/x-ww-form-urlencoded;charset=UTF-8";
const contentTypeJson = "application/json";
const contentTypeFile = "multipart/form-data";


const request = axios.create({
    baseURL: 'http://192.168.133.1:8080/nepm',//TODO: 根据对应的后端返回数据格式进行修改
    timeout: 10000,
});

let loading = null;
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
}, error => {
    console.log(error);
    return Promise.reject("网络异常");
});


export default request;