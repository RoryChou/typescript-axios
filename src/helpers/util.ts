const toString = Object.prototype.toString

// fixme 这个是什么类型保护？
export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

// export function isObject(val: any): val is Object {
//   return val !== null && typeof val === 'object'
// }

export function isPlainObject(val: any): val is Object {
  // fixme!!! 第二个单词首字母大写！！
  return toString.call(val) === '[object Object]'
}

export function extend(to: any, from: any) {
  for (const key in from) {
    to[key] = from[key]
  }
  return to
}
