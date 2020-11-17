import axios from '../../src/index'
import 'nprogress/nprogress.css'
import nprogress from 'nprogress'

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

// const instance = axios.creat({
//   xsrfCookieName: 'XSFR-COOKIE-D',
//   xsrfHeaderName: 'X-XSFR-COOKIE-D'
// })
//
// instance.get('/more/get').then(res => {
//   console.log(res)
// })

// const instance = axios.creat()
//
// function calculatePercentage(loaded: number, total: number) {
//   return Math.floor(loaded*1.0)/total
// }
//
// function loadProgressBar() {
//   const setupStartProgress = () => {
//     instance.interceptors.request.use(config => {
//       nprogress.start()
//       return config
//     })
//   }
//   const setupUpdateProgress = () => {
//     const update = (e:ProgressEvent) => {
//       console.log(e)
//       nprogress.set(calculatePercentage(e.loaded,e.total))
//     }
//
//     instance.defaults.onUploadProgress = update
//     instance.defaults.onDownloadProgress = update
//   }
//   const setupStopProgress = () => {
//     instance.interceptors.response.use(res => {
//       nprogress.done()
//       return res
//     }, err => {
//       nprogress.done()
//       return Promise.reject(err)
//     })
//   }
//
//   setupStartProgress()
//   setupUpdateProgress()
//   setupStopProgress()
// }
//
// const downLoadEl = document.querySelector('#download')
//
// downLoadEl!.addEventListener('click', function () {
//   instance.get('https://es6.ruanyifeng.com/images/cover_thumbnail_3rd.jpg')
// })
//
// const uploadEl = document.querySelector('#upload')
//
// uploadEl!.addEventListener('click', function () {
//   const data = new FormData()
//   const fileEl = document.querySelector('#file') as HTMLInputElement
//   if(fileEl.files) {
//     data.append('file', fileEl.files[0])
//
//     instance.post('/more/upload', data)
//   }
// })


// auth
axios.post('/more/post', {
  a:1
},{
  auth: {
    username: 'asd',
    password: '123'
  }
}).then(res => {
  console.log(res)
})



