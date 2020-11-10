import axios, {AxiosTransformer} from '../../src/index'
import qs from 'qs'

axios.defaults.headers.common['test2'] = '123'

axios({
  url: '/config/post',
  method:'post',
  headers: {
    test: '321'
  },
  data: {a:1},
  transformRequest: [(function (data) {
    return qs.stringify(data)
  }), ...(axios.defaults.transformRequest as AxiosTransformer[])],
  transformResponse: [...(axios.defaults.transformResponse as AxiosTransformer[]), function (data) {
    if(typeof data === 'object') {
      data.b = 2
    }
    return data
  }]
}).then(res => {
  console.log('success: ', res)
}).catch(err => {
  console.warn('err', err)
})



