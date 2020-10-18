import axios from '../../src/index'

axios({
  method: "GET",
  url: '/base/get',
  params: {
    foo: ['bar', 'baz']
  }
})

axios({
  method: "GET",
  url: '/base/get',
  params: {
    foo: {
      bar: 'baz'
    }
  }
})

const date = new Date()

axios({
  method: "GET",
  url: '/base/get',
  params: {
    date
  }
})

axios({
  method: "GET",
  url: '/base/get',
  params: {
    foo: '@:$, '
  }
})

axios({
  method: "GET",
  url: '/base/get',
  params: {
    foo: 'bar',
    baz: null
  }
})

axios({
  method: "GET",
  url: '/base/get#hash',
  params: {
    foo: 'bar'
  }
})

axios({
  method: "GET",
  url: '/base/get?foo=bar',
  params: {
    baz: 'baz'
  }
})

axios({
  method: "post",
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
})

axios({
  method: "post",
  url: '/base/post',
  headers: {
    'content-type': 'application/json',
    'Accept': 'application/json, text/plain, */*',
  },
  data: {
    a: 1,
    b: 2
  }
})

const arr = new Int32Array([21,31])

axios({
  method: "post",
  url: '/base/buffer',
  data: arr
})

const paramString = 'q=URLUtils.searchParams&topic=api'
const searchParams = new URLSearchParams(paramString)

// fixme 浏览器自动添加headers，formdata也可以做到
// Content-Type: application/x-www-form-urlencoded;charset=UTF-8
axios({
  method: "post",
  url: '/base/post',
  data: searchParams
})

