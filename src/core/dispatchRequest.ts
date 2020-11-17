import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import xhr from './xhr'
import { buildURL, combineURL, isAbsoluteURL } from '../helpers/url'
import { flattenHeaders } from '../helpers/headers'
import { transform } from './transform'

export default function dispatch(config: AxiosRequestConfig): AxiosPromise {
  // TODO
  throwIfCancellationRequested(config)
  processConfig(config)
  return xhr(config).then(res => {
    // fixme 后续可以链式调用then()
    // then()的返回值是一个新的promise
    //  第一个回调函数完成以后，会将返回结果作为参数，传入第二个回调函数。
    return transformResponseData(res)
  })
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  // config.headers = transformHeaders(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}

function transformURL(config: AxiosRequestConfig): string {
  let { url, params, baseURL } = config
  if (baseURL && !isAbsoluteURL(url!)) {
    url = combineURL(baseURL, url)
  }
  // fixme 断言非空
  return buildURL(url!, params)
}

// function transformRequestData(config: AxiosRequestConfig): any {
//   return transformRequest(config.data)
// }
//
// function transformHeaders(config: AxiosRequestConfig) {
//   const { data, headers = {} } = config
//   return processHeaders(headers, data)
// }

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}

function throwIfCancellationRequested(config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}
