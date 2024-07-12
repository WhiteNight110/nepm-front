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

export function phoneFormlogin(data) {
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

export function emailFormlogin(data) {
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