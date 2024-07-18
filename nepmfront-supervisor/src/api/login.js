import request from "@/utils/request";
//使用用户名和密码登录
export function login(data) {
    return request({
        url: 'supervisor/'+data.telId+'/'+data.password,
        method: 'get',
        withCredentials: false
    })
}
//使用手机号和验证码登录
export function phoneLogin(data) {
    return request({
        url: '/supervisor/sms/'+data.phone+'/'+data.phoneCode,
        method: 'get',
        withCredentials: false
    })
}
//发送手机验证码
export function sendPhoneFormCode(data) {
    return request({
        url: '/supervisor/sms/'+data,
        method: 'post',
        withCredentials: false
    })
}
//注册
export function register(data) {
    return request({
        url: 'supervisor/save',
        method: 'post',
        data:{
            telId: data.telId,
            realName: data.realName,
            age: data.age,
            sex: data.sex,
            birthday: data.birthday,
            password: data.password,
        },
        withCredentials: false
    })
}
