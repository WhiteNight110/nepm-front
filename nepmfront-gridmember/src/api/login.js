import request from "@/utils/request";

export function login(data) {
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