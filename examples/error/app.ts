import axios from '../../src/index'
import set = Reflect.set;

axios({
  url: '/error/404',
  method: 'get'
}).then(res => {
  console.log('success 404', res)
}).catch(err => {
  console.log('error 404', err)
})

axios({
  url: '/error/get',
  method: 'get'
}).then(res => {
  console.log('success get', res)
}).catch(err => {
  console.log('error get', err)
})

setTimeout(function () {
  axios({
    url: '/error/get',
    method: 'get'
  }).then(res => {
    console.log('success get', res)
  }).catch(err => {
    console.log('error get', err)
  })
}, 5000)

axios({
  url: '/error/timeout',
  timeOut: 2000,
  method: 'get'
}).then(res => {
  console.log('success timeout', res)
}).catch(err => {
  console.log('error timeout', err)
})
