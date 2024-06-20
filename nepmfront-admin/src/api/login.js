import request from "@/utils/request";

export function login(data) {
    return request({
        url: 'admins/getAdminsByCode',
        method: 'post',
        data: {
            adminCode: data.username,
            password: data.password
        },
        withCredentials: false
    })
}

export function register(data) {
    return request({
        url: 'admins/adminsRegister',
        method: 'post',
        data:{
            adminCode: data.username,
            password: data.password
        },
        withCredentials: false
    })
}

export function getCaptcha(data) {
    return request({
        url: 'admins/getCaptcha?t='+new Date().getTime(),
        method: 'get',
    })
}

export function checkCaptcha(data) {
    return request({
        url: 'admins/checkCaptcha',
        method: 'post',
        params: {
            captcha: data.checkCode,
            codeKey: 'user:login:validatecode:'+data.codeKey
        },
    })
}