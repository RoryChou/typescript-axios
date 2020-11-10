import axios from '../../src/index'
import qs from 'qs'

axios.defaults.headers.common['test2'] = '123'

axios({
  url: '/config/post',
  method:'post',
  headers: {
    test: '321'
  },
  data: qs.stringify({a:1})
}).then(res => {
  console.log('success: ', res)
}).catch(err => {
  console.warn('err', err)
})



