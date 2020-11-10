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

export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)

  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isPlainObject(val)) {
          // 判断是否已经有这个属性了
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(val, result[key])
          } else {
            result[key] = deepMerge(val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })

  return result
}
