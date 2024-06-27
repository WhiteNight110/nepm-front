import request from "@/utils/request";

export function login(data) {
    return request({
        url: 'supervisor/getSupervisorByIdByPass',
        method: 'post',
        data: {
            telId: data.telId,
            password: data.password
        },
        withCredentials: false
    })
}

export function register(data) {
    return request({
        url: 'supervisor/saveSupervisor',
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
