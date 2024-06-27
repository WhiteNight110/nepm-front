import request from "@/utils/request";
import { useGlobalStore } from "@/stores/globalStore";

export function aqiFeedbackList(telId) {
    return request({
        url: 'aqiFeedback/listAqiFeedbackByTelId',
        method: 'get',
        params: {
            telId,
        },
        withCredentials: false
    })
}

export function saveAqiFeedback(data) {
    return request({
        url: 'aqiFeedback/saveAqiFeedback',
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