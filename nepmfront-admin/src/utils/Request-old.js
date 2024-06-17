import axios from "axios";
import { ElLoading, ElMessage } from 'element-plus';

const contentTypeForm = "application/x-ww-form-urlencoded;charset=UTF-8";
const contentTypeJson = "application/json";
const contentTypeFile = "multipart/form-data";

const request = (config) => {
    const {url, params, dataType = 'form', showLoading = true} = config;
    let contentType = contentTypeForm;
    if(dataType === 'json'){
        contentType = contentTypeJson;
    }else if(dataType === 'file'){
        contentType = contentTypeFile;
        let param = new FormData();
        for(let key in params){
            param.append(key, params[key]);
        }
        params = param;
    }

    const instance = axios.create({
        baseURL: 'http://192.168.133.1:8080/nepm',//TODO: 根据对应的后端返回数据格式进行修改
        timeout: 10000,
        headers: {
            'Content-Type': contentType,
            "X-Requested-With": "XMLHttpRequest",
        }
    });

    let loading = null;
    //请求前拦截
    instance.interceptors.request.use(config => {
        if(showLoading){
            loading = ElLoading.service({
                lock: true,
                text: '加载中...',
                background: 'rgba(0, 0, 0, 0.7)',
              })
        }
        return config;
    }, error => {
        if(showLoading && loading){
            loading.close();
        }
        ElMessage({
            message: '发送请求失败',
            type: 'warning',
        })
        return Promise.reject("发送请求失败");
    });
    //请求后拦截
    instance.interceptors.response.use(response => {
        if(showLoading && loading){
            loading.close();
        }
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
        if(showLoading && loading){
            loading.close();
        }
        return Promise.reject("网络异常");
    });

    return instance.post(url, params).catch(error => {
        ElMessage({
            message: error,
            type: 'warning',
            duration: 2000
        })
    });
}

export default request;