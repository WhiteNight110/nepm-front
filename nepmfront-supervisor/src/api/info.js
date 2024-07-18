import request from "@/utils/request";
import { useGlobalStore } from "@/stores/globalStore";
//修改用户信息
export function updateInfo(data) {
    return request({
        url: 'supervisor/modifyInfo',
        method: 'post',
        data: {
            telId: useGlobalStore().telId,
            realName: data.realName,
            sex: data.sex,
            birthday: data.birthday
        }
    })
}
//获取用户信息
export function getInfo() {
    return request({
        url: 'supervisor/'+useGlobalStore().telId,
        method: 'get'
    })
}