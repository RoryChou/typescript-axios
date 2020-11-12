import { AxiosRequestConfig, AxiosStatic } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'
import defaults from './defaults'
import mergeConfig from './core/mergeConfig'

function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)
  // 返回一个function
  const instance = Axios.prototype.request.bind(context)
  // 将两个对象合并，实现了添加直接调用方法 => Axios({config})，并保留了Axios.request({config})
  extend(instance, context)

  return instance as AxiosStatic
}

const axios = createInstance(defaults)

axios.creat = function(config) {
  return createInstance(mergeConfig(defaults, config))
}
export default axios
