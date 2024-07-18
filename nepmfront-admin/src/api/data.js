import request from "@/utils/request";

//获取公众监督员反馈列表
export function getFeedbackList(data) {
    return request({
        url: 'aqiFeedback/listAqiFeedbackPage',
        method: 'post',
        data
    })
}
//获取网格对应网格员列表
export function getGridMemberList(data) {
    return request({
        url: 'gridMember/province/'+data.cityId,
        method: 'get',
    })
}
//获取已经检测完的数据列表
export function getListStatisticsPage(data) {
    return request({
        url: 'statistics/list',
        method: 'post',
        data
    })
}
//指派网格员
export function assignAqiFeedback(data) {
    return request({
        url: 'aqiFeedback/'+data.afId+'/'+data.gmId,
        method: 'post',
    })
}
//其他数据统计
export function otherDataCount() {
    return request({
        url: 'statistics/totalCount',
        method: 'get'
    })
}
//获取省分组数据统计
export function provincialGrouping() {
    return request({
        url: 'statistics/listProvinceItemTotalStatis',
        method: 'get'
    })
}
//获取AQI等级分布统计
export function aqiLevelCount() {
    return request({
        url: 'statistics/aqiDistribution',
        method: 'get'
    })
}
//获取近12月AQI等级超标统计
export function countByMonth() {
    return request({
        url: 'statistics/aqiLevelByMonth',
        method: 'get'
    })
}