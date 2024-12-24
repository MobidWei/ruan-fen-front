import { request } from "@/utils/http/request";

// 接口响应格式示例，您可以根据实际返回结构进行调整
interface CommonResponse<T> {
    code: number;
    message: string;
    data: T;
}

interface SearchResponse {
    data: any; // 根据实际返回的数据结构定义
    // 其他可能的字段
}

export function searchArticlesByTimeDesc() {
    const body = {
        "orFieldsAndTexts": [],
        "andFieldsAndTexts": [],
        "orderField": "publishTime",
        "desc": 1
    }
    return request<CommonResponse<any>>({
        url: `/search/article/cond`,
        method: "post",
        data: body
    });
}

export function searchArticlesByViewDesc() {
    const body = {
        "orFieldsAndTexts": [],
        "andFieldsAndTexts": [],
        "orderField": "articleId",
        "desc": 0
    }
    return request<CommonResponse<any>>({
        url: `/search/article/cond`,
        method: "post",
        data: body
    });
}
