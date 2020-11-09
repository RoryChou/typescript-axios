import { AxiosInstance, AxiosRequestConfig } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'
import defaults from './defaults'

function createInstance(config: AxiosRequestConfig): AxiosInstance {
  const context = new Axios(config)
  // 返回一个function
  const instance = Axios.prototype.request.bind(context)
  // 将两个对象合并，实现了添加直接调用方法 => Axios({config})，并保留了Axios.request({config})
  extend(instance, context)

  return instance as AxiosInstance
}

const axios = createInstance(defaults)
export default axios
