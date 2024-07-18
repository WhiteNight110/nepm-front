import request from "@/utils/request";
import { useGlobalStore } from "@/stores/globalStore";
//查询反馈列表
export function aqiFeedbackList(telId) {
    return request({
        url: 'aqiFeedback/'+telId,
        method: 'get',
        withCredentials: false
    })
}
//提交反馈
export function saveAqiFeedback(data) {
    return request({
        url: 'aqiFeedback/save',
        method: 'post',
        data: {
            telId: useGlobalStore().telId,
            provinceId: data.province,
            cityId: data.city,
            address: data.address,
            information: data.describtion,
            estimatedGrade: data.aqi,
            afDate: data.afDate,
            afTime: data.afTime
        },
        withCredentials: false
    })
}