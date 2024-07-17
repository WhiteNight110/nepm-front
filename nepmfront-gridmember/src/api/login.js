import request from "@/utils/request";

export function passwordFormlogin(data) {
    return request({
        url: 'gridMember/login',
        method: 'post',
        data: {
            gmCode: data.gmCode,
            password: data.password
        },
        withCredentials: false
    })
}

export function sendPhoneFormCode(data) {
    return request({
        url: '/gridMember/sms/'+data,
        method: 'post',
        withCredentials: false
    })
}

export function phoneFormlogin(data) {
    const { phone, phoneCode } = data;
    return request({
        url: '/gridMember/sms/'+data.phone+'/'+data.phoneCode,
        method: 'get',
        data: {
            phone: data.phone,
            phoneCode: data.phoneCode
        },
        withCredentials: false
    })
}