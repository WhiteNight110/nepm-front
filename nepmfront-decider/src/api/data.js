import request from "@/utils/request";

export function otherDataCount() {
    return request({
        url: 'statistics/totalCount',
        method: 'get',
        withCredentials: false
    })
}

export function aqiLevelCount() {
    return request({
        url: 'statistics/aqiDistribution',
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

export function so2Count() {
    return request({
        url: 'statistics/so2Distribution',
        method: 'get',
        withCredentials: false
    })
}
export function coCount() {
    return request({
        url: 'statistics/coDistribution',
        method: 'get',
        withCredentials: false
    })
}
export function spmCount() {
    return request({
        url: 'statistics/spmDistribution',
        method: 'get',
        withCredentials: false
    })
}