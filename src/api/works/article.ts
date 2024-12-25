import {request} from "@/utils/http/request";
import axios from "axios";

interface CommonResponse<T> {
    code: number;
    message: string;
    data: T;
}

export function getArticle(articleId: number){
    return request<CommonResponse<any>>({
        url:'/api/article/find/',
        method:'get',
        params:{
            articleId:articleId,
        },
    })
}

export function getReference(referenceUrl: string[]) {
    return request<CommonResponse<any>>({
        url: '/api/article/find/urls',
        method: 'post',
        data:referenceUrl
    })
}

export function getArticleComments(articleId: number){
    return request<CommonResponse<any>>({
        url: '/api/comment/find/',
        method: 'get',
        params: {
            achievementType: 1,
            achievementId: articleId,
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

export function postComment(articleId: number, content: string, userId: number) {
    request<CommonResponse<any>>({
        url: '/api/comment/add',
        method: 'post',
        params:{
            userId: userId,
            achievementType: 1,
            achievementId: articleId,
            commentContent: content,
        }
    })
}

export function addView(articleId: number) {
    request<CommonResponse<any>>({
        url: '/api/article/addView',
        method: 'put',
        params:{
            articleId: articleId,
        },
    })
}