import axios, { AxiosError } from '../../src/index'

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
}).catch((err:AxiosError) => {
  console.log('error timeout message : ', err.message)
  console.log('error timeout code : ', err.code)
  console.log('error timeout request : ', err.request)
  console.log('error timeout config : ', err.config)
  console.log('error timeout config : ', err.isAxiosError)
})
