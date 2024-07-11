import request from "@/utils/request";
import { useAqiFeedbackListStore } from "@/stores/aqiFeedbackList";

export function aqiFeedback(afId) {
    return request({
        url: 'aqiFeedback/getAqiFeedbackById',
        method: 'get',
        params: {
            afId,
        },
        withCredentials: false
    })
}

export function saveStatistics(data) {
    return request({
        url: 'statistics/saveStatistics',
        method: 'post',
        data: {
            gmId: data.gmId,
            provinceId: data.provinceId,
            cityId: data.cityId,
            address: data.address,
            so2Value: data.so2Value,
            so2Level: data.so2Level,
            coValue: data.coValue,
            coLevel: data.coLevel,
            spmValue: data.spmValue,
            spmLevel: data.spmLevel,
            aqiLevel: data.aqiLevel,
            fdId: data.fdId,
            information: data.information,
            confirmDate: data.confirmDate,
            confirmTime: data.confirmTime
        },
        withCredentials: false
    })
}