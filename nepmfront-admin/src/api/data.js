import request from "@/utils/request";


export function getFeedbackList(data) {
    return request({
        url: 'aqiFeedback/listAqiFeedbackPage',
        method: 'post',
        data
    })
}

export function getGridMemberList(data) {
    return request({
        url: 'gridMember/listGridMemberByCityId',
        method: 'get',
        params: data
    })
}

export function getListStatisticsPage(data) {
    return request({
        url: 'statistics/listStatisticsPage',
        method: 'post',
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

export function otherDataCount() {
    return request({
        url: 'statistics/totalCount',
        method: 'get',
        withCredentials: false
    })
}

export function provincialGrouping() {
    return request({
        url: 'statistics/listProvinceItemTotalStatis',
        method: 'get',
        withCredentials: false
    })
}

export function aqiLevelCount() {
    return request({
        url: 'statistics/statisticsDistribution',
        method: 'get',
        withCredentials: false
    })
}
export function countByMonth() {
    return request({
        url: 'statistics/aqiLevelByMonth',
        method: 'get',
        withCredentials: false
    })
}