const cookie = {
  read(name: string): string | null {
    // fixme 此处由于需要输入变量name，所以选择正则表达式构造函数方式，
    // 正则表达式构造函数方式中需要转义的东西额外多一个\，如'\\s' === /\s/
    // [^;]为反向字符集写法，它匹配任何没有包含在方括号中的字符，即所有不含;的字符串集合
    const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'))
    return match ? decodeURIComponent(match[3]) : null
  }
}

export default cookie
