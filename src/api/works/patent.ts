import {request} from "@/utils/http/request";
import axios from "axios";

interface CommonResponse<T> {
    code: number;
    message: string;
    data: T;
}

export function getPatent(patentId: number){
    return request<CommonResponse<any>>({
        url:'/api/patent/find/',
        method:'get',
        params:{
            patentId:patentId,
        },
    })
}

export function getPatentComments(patentId: number){
    return request<CommonResponse<any>>({
        url: '/api/comment/find/',
        method: 'get',
        params: {
            achievementType: 2,
            achievementId: patentId,
        },
    })
}

export function getUserName(userId: number){
    return request<CommonResponse<any>>({
        url: '/api/user/userInfo/find',
        method: 'get',
        params: {
            userId:userId,
        },
    })
}

export function postComment(patentId: number, content: string, userId: number) {
    request<CommonResponse<any>>({
        url: '/api/comment/add',
        method: 'post',
        params:{
            userId: userId,
            achievementType: 2,
            achievementId: patentId,
            commentContent: content,
        }
    })
}

export function addView(patentId: number) {
    request<CommonResponse<any>>({
        url: '/api/patent/addView',
        method: 'put',
        params:{
            patentId: patentId,
        },
    })
}