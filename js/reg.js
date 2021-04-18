// RegExp 对象属性
// RegExp.global	 对象是否具有标志 g
// RegExp.ignoreCase	RegExp 对象是否具有标志 i
// RegExp.lastIndex	一个整数，标示开始下一次匹配的字符位置
// RegExp.multiline	RegExp 对象是否具有标志 m
// RegExp.source	正则表达式的源文本

// $1 $2... 第一个子表达式, 第二个子表达式

// RegExp 对象方法
// compile	编译正则表达式
// exec	检索字符串中指定的值。返回找到的值，并确定其位置。RegExpObject.exec(string),可反复调用
// test	检索字符串中指定的值。返回 true 或 false。RegExpObject.test(string)

// 支持正则表达式的 String 对象的方法
// search	检索与正则表达式相匹配的值
// match	找到一个或多个正则表达式的匹配
// replace	替换与正则表达式匹配的子串。stringObject.replace(regexp/substr,replacement)
// split	把字符串分割为字符串数组

// TEST
// const str = '3.26/2021'
// const reg = new RegExp(/\d+/, 'g')
// while((result = reg.exec(str))) {
//     console.log(result)
// }
// ["3", index: 0, input: "3.26/2021", groups: undefined]
// ["26", index: 2, input: "3.26/2021", groups: undefined]
// ["2021", index: 5, input: "3.26/2021", groups: undefined]

Date.prototype.Format = function (fmt) {
    var o = {
      'M+': this.getMonth() + 1,
      'd+': this.getDate(),
      'h+': this.getHours(),
      'm+': this.getMinutes(),
      's+': this.getSeconds(),
      'q+': Math.floor((this.getMonth() + 3) / 3),
      'S': this.getMilliseconds() };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
      }
    }
    return fmt;
}

// 1.正则转化 '3.26/2021' => '2021-3-26'
const str = '3.26/2021'
function dateFormate (str) {
    return str.replace(/(\d+)\.(\d+)\/(\d+)/, function(...arg) {
        console.log(...arg)
        return ''
    })
}

// 2.下滑转驼峰
function toHump (str) {
    return str.replace(/_[a-z]/g, function (word) {
        return word.replace('_', '').toUpperCase()
    })
}

// 驼峰转下划线
function toLine (str) {
    // return str.replace(/[A-Z]/g, function (word) {
    //     return '_' + word.toLowerCase()
    // })
    return str.replace(/([A-Z])/g, '_$1').toLowerCase()
}

// 手机号格式化
function formateTel (str) {
  const reg = /^(\d{3})(\d{4})(\d{4})$/
  return str.replace(reg, '$1-$2-$3')
}
