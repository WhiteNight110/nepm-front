import request from "@/utils/request";


export function getFeedbackList(data) {
    return request({
        url: 'aqiFeedback/listAqiFeedbackPage',
        method: 'post',
        data,
        withCredentials: false
    })
}

export function getGridMemberList(data) {
    return request({
        url: 'gridMember/listGridMemberByCityId',
        method: 'get',
        params: data,
        withCredentials: false
    })
}

export function getListStatisticsPage(data) {
    return request({
        url: 'statistics/listStatisticsPage',
        method: 'get',
        data,
        withCredentials: false
    })
}

export function assignAqiFeedback(data) {
    return request({
        url: 'aqiFeedback/assignAqiFeedback',
        method: 'post',
        params: {
            afId: data.afId,
            gmId: data.gmId
        },
        withCredentials: false
    })
}

export function totalCount() {
    return request({
        url: 'statistics/totalCount',
        method: 'get',
        withCredentials: false
    })
}