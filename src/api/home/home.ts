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

export function searchArticlesByFieldWithPage(
    field: string,
    text: string,
    page: number,
    pageSize: number
) {
    return request<CommonResponse<any>>({
        url: `https://localhost:8080/search/article/?field=${field}&text=${encodeURIComponent(text)}&page=${page}&pageSize=${pageSize}`,
        method: "get",
    });
}
