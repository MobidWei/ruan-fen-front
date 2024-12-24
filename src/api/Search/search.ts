import { request } from "@/utils/http/request";

// 接口响应格式示例，您可以根据实际返回结构进行调整
interface CommonResponse<T> {
  code: number;
  message: string;
  data: T;
}

// 如果需要更精准的类型，可在此定义接口
// interface ArticleDoc {
//   articleId: number;
//   articleName: string;
//   researcherName: string;
//   ...
// }
// 也可根据后端返回自行扩展

/**
 * 原有的示例函数 (可保留或删除)
 * 如果不再需要，请自行删除
 */
interface SearchResponse {
  data: any; // 根据实际返回的数据结构定义
  // 其他可能的字段
}
export function getSearchData(page: number, question: string): Promise<SearchResponse> {
  // 构建 URL，将 page 和 question 作为查询参数
  const url = `/api/search?page=${page}&title=${encodeURIComponent(question)}`;
  return request({
    url,
    method: 'get',
  });
}

//
// ──────────────────────────────────────────────────────────────────────────────
//   文章（Article）搜索相关接口
// ──────────────────────────────────────────────────────────────────────────────
//

/**
 * 获取所有文章
 * GET /search/article/allArticle
 */
export function getAllArticles() {
  return request<CommonResponse<any>>({
    url: "/search/article/allArticle",
    method: "get",
  });
}

/**
 * 根据字段搜索文章 (不带分页)
 * GET /search/article/{field}/{text}
 * field: articleName | researcherName | source | fieldOfResearch | all
 * text: 搜索关键词
 */
export function searchArticlesByField(field: string, text: string) {
  // 如果后端没有斜杠分隔，而是直接拼接，需要自行修改
  return request<CommonResponse<any>>({
    url: `/search/article/${field}/${encodeURIComponent(text)}`,
    method: "get",
  });
}

/**
 * 根据字段搜索文章 + 分页
 * GET /search/article/{field}/{text}/{page}/{pageSize}
 */
export function searchArticlesByFieldWithPage(
  field: string,
  text: string,
  page: number,
  pageSize: number
) {
  return request<CommonResponse<any>>({
    url: `/search/article/page/?field=${field}&text=${encodeURIComponent(text)}&page=${page}&pageSize=${pageSize}`,
    method: "get",
  });
}
export function searchSortedArticlesByFieldWithPage(
  field: string,
  text: string,
  page: number,
  pageSize: number,
  orderFiled: string,
  desc: number,
) {
  return request<CommonResponse<any>>({
    url: `/search/article/page/order/?field=${field}&text=${encodeURIComponent(text)}&page=${page}&pageSize=${pageSize}&orderField=${orderFiled}&desc=${desc}`,
    method: "get",
  });
}
/**
 * 根据文章ID获取指定文章
 * GET /search/article/doc/{articleId}
 */
export function getArticleById(articleId: number) {
  return request<CommonResponse<any>>({
    url: `/search/article/doc/${articleId}`,
    method: "get",
  });
}

//
// ──────────────────────────────────────────────────────────────────────────────
//   专利（Patent）搜索相关接口
// ──────────────────────────────────────────────────────────────────────────────
//

// 同理，后端字段可搜索： patentName, patentType, fieldOfResearch, applicants, inventorsName, all

/**
 * 获取所有专利
 * GET /search/patent/allPatent
 */
export function getAllPatents() {
  return request<CommonResponse<any>>({
    url: "/search/patent/allPatent",
    method: "get",
  });
}

/**
 * 根据字段搜索专利 (不带分页)
 * GET /search/patent/{field}/{text}
 */
export function searchPatentsByField(field: string, text: string) {
  return request<CommonResponse<any>>({
    url: `/search/patent/${field}/${encodeURIComponent(text)}`,
    method: "get",
  });
}

/**
 * 分页搜索专利
 * GET /search/patent/page/{field}/{text}/{page}/{pageSize}
 */
export function searchPatentsByFieldWithPage(
  field: string,
  text: string,
  page: number,
  pageSize: number
) {
  return request<CommonResponse<any>>({
    url: `/search/patent/page/${field}/${encodeURIComponent(text)}/${page}/${pageSize}`,
    method: "get",
  });
}

/**
 * 根据专利ID获取指定专利
 * GET /search/patent/doc/{patentId}
 */
export function getPatentById(patentId: number) {
  return request<CommonResponse<any>>({
    url: `/search/patent/doc/${patentId}`,
    method: "get",
  });
}

//
// ──────────────────────────────────────────────────────────────────────────────
//   项目（Project）搜索相关接口
// ──────────────────────────────────────────────────────────────────────────────
//

// 可搜索字段: projectName, projectType, fieldOfResearch, investigatorName, participantsName, all

/**
 * 获取所有项目
 * GET /search/project/allProject
 */
export function getAllProjects() {
  return request<CommonResponse<any>>({
    url: "/search/project/allProject",
    method: "get",
  });
}

/**
 * 根据字段搜索项目 (不带分页)
 * GET /search/project/{field}/{text}
 */
export function searchProjectsByField(field: string, text: string) {
  return request<CommonResponse<any>>({
    url: `/search/project/${field}/${encodeURIComponent(text)}`,
    method: "get",
  });
}

/**
 * 分页搜索项目
 * GET /search/project/page/{field}/{text}/{page}/{pageSize}
 */
export function searchProjectsByFieldWithPage(
  field: string,
  text: string,
  page: number,
  pageSize: number
) {
  return request<CommonResponse<any>>({
    url: `/search/project/page/${field}/${encodeURIComponent(text)}/${page}/${pageSize}`,
    method: "get",
  });
}

/**
 * 根据项目ID获取指定项目
 * GET /search/project/doc/{projectId}
 */
export function getProjectById(projectId: number) {
  return request<CommonResponse<any>>({
    url: `/search/project/doc/${projectId}`,
    method: "get",
  });
}
