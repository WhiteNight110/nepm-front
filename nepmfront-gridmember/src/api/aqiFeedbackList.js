import request from "@/utils/request";
import { useAqiFeedbackListStore } from "@/stores/aqiFeedbackList";

export function aqiFeedbackList(gmId) {
    return request({
        url: 'aqiFeedback/gm/'+gmId,
        method: 'get',
        params: {
            gmId,
        },
        withCredentials: false
    })
}