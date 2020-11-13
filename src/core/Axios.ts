import {
  AxiosRequestConfig,
  AxiosPromise,
  AxiosResponse,
  Method,
  ResolvedFn,
  RejectedFn
} from '../types'
import dispatchRequest from './dispatchRequest'
import InterceptorManager from './interceptorManager'
import mergeConfig from './mergeConfig'

interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig>
  response: InterceptorManager<AxiosResponse>
}

interface PromiseChain<T> {
  resolved: ResolvedFn<T> | ((config: AxiosRequestConfig) => AxiosPromise) // 此处对应dispatchRequest的函数类型
  rejected?: RejectedFn
}

export default class Axios {
  defaults: AxiosRequestConfig

  interceptors: Interceptors

  constructor(initConfig: AxiosRequestConfig) {
    this.defaults = initConfig
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
  }

  request(url: any, config?: any): AxiosPromise {
    // 重载判断
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      } else {
        config.url = url
      }
    } else {
      config = url
    }

    // 合并config
    config = mergeConfig(this.defaults, config)

    // 拦截器，链式调用promise
    // 将发送请求放在中间，request的拦截器依次加载前面，response的拦截器加载后面，形成一个完整的链
    // 所以chain的类型不单是interceptor，还有属性为dispatchRequest类型的对象类型
    const chain: PromiseChain<any>[] = [
      {
        resolved: dispatchRequest,
        rejected: undefined
      }
    ]

    // 遍历内部拦截器数组
    this.interceptors.request.foreach(interceptor => {
      chain.unshift(interceptor)
    })

    this.interceptors.response.foreach(interceptor => {
      chain.push(interceptor)
    })

    let promise = Promise.resolve(config)

    while (chain.length) {
      // ! 类型断言不为空
      const { resolved, rejected } = chain.shift()!
      // 最终的chain为：
      // Promise.resolve(config).then(处理request).then(处理request).then(发送请求).then(处理response).then(处理response)
      promise = promise.then(resolved, rejected)
    }

    return promise
  }

  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('get', url, config)
  }

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('delete', url, config)
  }

  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('head', url, config)
  }

  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('options', url, config)
  }

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('post', url, data, config)
  }

  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('put', url, data, config)
  }

  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('patch', url, data, config)
  }

  _requestMethodWithoutData(method: Method, url: string, config?: AxiosRequestConfig) {
    // 合并config
    config = mergeConfig(this.defaults, config)
    return dispatchRequest(
      Object.assign(config || {}, {
        method,
        url
      })
    )
  }

  _requestMethodWithData(method: Method, url: string, data?: any, config?: AxiosRequestConfig) {
    // 合并config
    config = mergeConfig(this.defaults, config)
    return dispatchRequest(
      Object.assign(config || {}, {
        method,
        url
      })
    )
  }
}
