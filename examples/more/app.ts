import axios from '../../src/index'

// document.cookie = 'a=b'
//
// axios.get('/more/get').then(res => {
//   console.log('success', res)
// })
//
// axios.post('http://127.0.0.1:8088/more/server2',{
//   a:1
// },{
//   withCredentials: true
// }).then(res => {
//   console.log('withCredentials success', res)
// })

const instance = axios.creat({
  xsrfCookieName: 'XSFR-COOKIE-D',
  xsrfHeaderName: 'X-XSFR-COOKIE-D'
})

instance.get('/more/get').then(res => {
  console.log(res)
})



