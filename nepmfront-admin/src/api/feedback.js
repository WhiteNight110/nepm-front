import request from "@/utils/request";


export function getFeedbackList(data) {
    return request({
        url: 'aqiFeedback/listAqiFeedbackPage',
        method: 'post',
        data,
        withCredentials: false
    })
}