import request from "@/utils/request";

export function getFeedbackList(data) {
    return request.get("/feedback")
}