# typescript-axios

## 主要知识点
  - typescript
  - ajax
  - promise
  - js基础
  - http
  - jest
  - rollup
  
  
## typescript
  1. 接口
     1. 函数类型
  2. 泛型<>
  3. 解构赋值
  4. class
  
## ajax
1. 代码
```javascript
const request = new XMLHttpRequest()

request.open(method.toUpperCase(), url, true)

// 为request对象添加额外属性，responseType,timeOut,withCredentials

// 处理事件
request.onreadystatechange = function handleLoad() {
  if (request.readyState !== 4) {
    return
  }
  // 当出现网络错误或者超时错误的时候，该值都为 0
  if (request.status === 0) {
    return
  }

  // 将getAllResponseHeaders得到的字符串格式化为json
  const responseHeaders = parseHeaders(request.getAllResponseHeaders())
  const responseData =
    request.responseType !== 'text' ? request.response : request.responseText
  const response = {
    data: responseData,
    status: request.status,
    statusText: request.statusText,
    headers: responseHeaders,
    config,
    request
  }
  // 处理返回码，是否在200-300之间，否则排除异常
  handleResponse(response)
}
request.onerror = function handleError() {
  reject(createError('Network Error', config, null, request))
}
request.ontimeout = function handleTimeout() {
  reject(createError(`Timeout of ${timeOut} ms exceeded`, config, 'ECONNABORTED', request))
}
if (onDownloadProgress) {
  request.onprogress = onDownloadProgress
}
if (onUploadProgress) {
  request.upload.onprogress = onUploadProgress
}

// 处理requestheaders，处理Content-Type，csrftoken，Authorization，
Object.keys(headers).forEach(name => {
  if (data === null && name.toLowerCase() === 'content-type') {
    delete headers[name]
  } else {
    request.setRequestHeader(name, headers[name])
  }
})

// 处理中断请求
// 这里是中断请求的核心
// 等待取消指令的触发，触发后，将promise的状态变为resolved
if (cancelToken) {
  cancelToken.promise.then(reason => {
    request.abort()
    reject(reason)
  })
}

// 发送请求
request.send(data)
```
2. 安全
   1. csrf
3. 跨域
复杂跨域，需要先发送options请求


## promise
  1. promise链式调用
  
  
## js基础
  1. 对象类型判断
     1. typeof
     2. Object.prototype.toString.call()
     3. instanceof
  2. 对象深拷贝
  3. 正则获取cookie
  
  `const cookie = {
     read(name: string): string | null {
       // fixme 此处由于需要输入变量name，所以选择正则表达式构造函数方式，
       // 正则表达式构造函数方式中需要转义的东西额外多一个\，如'\\s' === /\s/
       // [^;]为反向字符集写法，它匹配任何没有包含在方括号中的字符，即所有不含;的字符串集合
       const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'))
       return match ? decodeURIComponent(match[3]) : null
     }
   }`
   
   4. 通过a标签对象解析url，protocol，host，pathname，port，search，hash等
   
   `var obj = document.createElement('a')
    a.setAttribute('href','http://www.baidu.com')
    var host = obj.host
   `
  
  
## http
1. 状态码
  
  
