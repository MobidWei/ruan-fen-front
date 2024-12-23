import type { AxiosInstance, AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { ServiceResult } from './types'
// import { useUserStoreWithOut } from '@/store/modules/user';

function createRequest<T = ServiceResult>(config: AxiosRequestConfig): Promise<T> {
    /**
     * 创建 axios 实例
     */
    const instance: AxiosInstance = axios.create({
        // baseURL: import.meta.env.VITE_BASE_API,
        baseURL: '/api',
        timeout: 1000 * 5,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })

    /**
     * 请求拦截器
     */
    instance.interceptors.request.use(config => {
        // store.getters.token && (config.headers.token = store.getters.token);
        // config.headers.token = '11111'
        // if (config.method === 'get') {
        //   const userStore = useUserStoreWithOut();
        //   config.params = { ...config.params, token: userStore.getToken };
        // }
        // get请求映射params参数
        // if (config.method === 'get' && config.params) {
        //     let url = config.url + '?' + tansParams(config.params)
        //     url = url.slice(0, -1)
        //     config.params = {}
        //     config.url = url
        // }

        return config
    })

    /**
     * 响应拦截器
     */
    instance.interceptors.response.use(
        (response: AxiosResponse<any>) => {
            console.log(response)

            const result: any = response.data
            const { code } = result

            if (Number(code) === 200) {
                return result
            } else if (Number(code) === 700) {
                result.data = null
                return result
            } else {
                serviceErrorHandel(result)
                return Promise.reject(result)
            }
        },
        (error: AxiosError) => {
            httpErrorHandle(error)
            return Promise.reject(error)
        }
    )

    return new Promise((resolve, reject) => {
        instance
            .request<any, AxiosResponse<ServiceResult>>(config)
            .then((res: AxiosResponse<ServiceResult<any>>) => {
                resolve(res as unknown as Promise<T>)
            })
            .catch((e: Error | AxiosError) => {
                reject(e)
            })
    })
}

/**
 * 业务错误
 * @param {*} res 业务约定的返回数据
 * @param {Number} res.code 业务约定的错误码
 * @param {String} res.msg 业务上的错误信息
 * @param {*} res.data
 */
function serviceErrorHandel(res: ServiceResult) {
    const { code, msg } = res
    if (Number(code) === 2000) {
        // const userStore = useUserStoreWithOut();
        // userStore.logout({ goLogin: true });
    } else {
        ElMessage({
            message: msg || 'Result Error',
            duration: 1000 * 3
        })
    }
}

/**
 * HTTP 错误
 */
function httpErrorHandle(error: AxiosError) {
    // console.log('[httpErrorHandle]', error);
    // console.log('[httpErrorHandle]', error.toString());

    let msg = ''

    if (error?.response) {
        const { status } = error.response

        switch (status) {
            case 403:
                msg = `${status} 网络请求被拒绝`
                break
            case 404:
                msg = `${status} 网络请求不存在`
                break
            case 500:
                msg = `${status} 服务器内部错误`
                break
            default:
                msg = `${status || error.message}`
                break
        }
    }

    if (error.message.includes('timeout')) {
        msg = '请求超时'
    }

    if (error.message.includes('Network Error')) {
        msg = '当前网络不可用，请检查你的网络设置'
    }

    ElMessage({
        message: msg || error.toString(),
        duration: 1000 * 3
    })
}

export const request = createRequest
