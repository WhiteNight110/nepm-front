import request from "@/utils/request";
import { useGlobalStore } from "@/stores/globalStore";
export function updateInfo(data) {
    return request({
        url: 'supervisor/modifyInfo',
        method: 'post',
        data: {
            telId: useGlobalStore().telId,
            realName: data.realName,
            sex: data.sex,
            birthday: data.birthday
        },
        withCredentials: false
    })
}

export function getInfo() {
    return request({
        url: 'supervisor/getSupervisorById',
        method: 'get',
        params: {
            telId: useGlobalStore().telId
        },
        withCredentials: false
    })
}