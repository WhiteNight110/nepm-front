import request from "@/utils/request";

export function passwordFormlogin(data) {
    return request({
        url: 'gridMember/getGridMemberByCodeByPass',
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
        url: 'gridMember/sendPhoneFormCode',
        method: 'post',
        data: {
            gmCode: data.gmCode
        },
        withCredentials: false
    })
}

export function sendEmailFormCode(data) {
    return request({
        url: 'gridMember/sendEmailFormCode',
        method: 'post',
        data: {
            email: data.email,
        },
        withCredentials: false
    })
}

export function phoneFormlogin(data) {
    return request({
        url: 'gridMember/getGridMemberByPhone',
        method: 'post',
        data: {
            gmCode: data.gmCode,
        },
        withCredentials: false
    })
}

export function emailFormlogin(data) {
    return request({
        url: 'gridMember/getGridMemberByEmail',
        method: 'post',
        data: {
            email: data.email,
        },
        withCredentials: false
    })
}