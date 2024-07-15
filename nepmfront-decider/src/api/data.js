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