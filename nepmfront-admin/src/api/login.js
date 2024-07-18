import request from "@/utils/request";
//登录
export function login(data) {
    return request({
        url: 'admins/login/'+data.username+'/'+data.password,
        method: 'get',
        withCredentials: false
    })
}
//注册
export function register(data) {
    return request({
        url: 'admins/register',
        method: 'put',
        data:{
            adminCode: data.username,
            password: data.password
        },
        withCredentials: false
    })
}
//获取验证码
export function getCaptcha() {
    return request({
        url: 'captcha/getCaptcha?t='+new Date().getTime(),
        method: 'get',
    })
}
//校验验证码
export function checkCaptcha(data) {
    return request({
        url: 'captcha/'+data.checkCode+'/user:login:validatecode:'+data.codeKey,
        method: 'get',
    })
}