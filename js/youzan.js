/**
 * 1、解析 url 中的 queryString
 *
 * 输入：https://www.youzan.com?name=coder&age=20&callback=https%3A%2F%2Fyouzan.com%3Fname%3Dtest&list[]=a&json=%7B%22str%22%3A%22abc%22,%22num%22%3A123%7D&qwe&www=
 * 输出：
 * {
 *  name: coder,
 *  age: 20,
 *  callback: https://youzan.com?name=test,
 *  list: [a, b],
 *  json: {
 *      str: 'abc',
 *      num: 123
 *  },
 *  qwe: '',
 *  www: '',
 * }
 */

const url = 'https://www.youzan.com?name=coder&age=20&callback=https%3A%2F%2Fyouzan.com%3Fname%3Dtest&list[]=a&list[]=b&json=%7B%22str%22%3A%22abc%22,%22num%22%3A123%7D&qws&www=';


function urlParse(url) {
    const result = {}
    const param = url.split('?')[1]
    const paramList = param.split('&')
    paramList.map(item => {
        const arr = item.split('=')
        let key = arr[0]
        let value = arr[1] ? decodeURIComponent(arr[1]) : ''
        if (value.indexOf('{') === 0 && value.indexOf('}') === value.length-1) {
            value = JSON.parse(value)
            result[key] = value
        } else if (~key.indexOf('[]')) {
            // debugger
            key = 'list'
            if (result[key]) {
                result[key].push(value)
            } else {
                result[key] = [value]
            }
        } else {
            result[key] = value
        }
    })
    return result
}

/**
 * 2、将一个json数据的所有key从下划线改为驼峰
 * 
 * @param {object | array} value 待处理对象或数组
 * @returns {object | array} 处理后的对象或数组
 */

const testData = {
    a_bbb: 123,
    a_g: [1, 2, 3, 4],
    a_d: {
        s: 2,
        s_d: 3
    },
    a_f: [1, 2, 3, {
        a_g: 5
    }],
    a_d_s: 1
}

function mapKeysToCamelCase(data) { 
    if (typeof data === 'object') {
        const result = {}
        for (let e in data) {
            if (typeof data[e] === 'object') {
                result[campleCase(e)] = mapKeysToCamelCase(data[e])
            } else {
                result[campleCase(e)] = data[e]
            }
        }
        return result
    } else {
        return data
    }
}

function campleCase (str) {
    return str.replace(/_[a-z]/g, function (world) {
        return world.replace('_', '').toUpperCase()
    })
}


/**
 * 3、将一天24小时按每半小划分成48段，我们用一个位图表示选中的时间区间，
 * 例如110000000000000000000000000000000000000000000000，表示第一个半小时和第二个半小时被选中了，其余时间段都没有被选中，也就是对应00:00~01:00这个时间区间。
 * 一个位图中可能有个不连续的时间区间被选中，例如110010000000000000000000000000000000000000000000，
 * 表示00:00~01:00和02:00~02:30这两个时间区间被选中了。
 * 写一个timeBitmapToRanges,将上述规则描述的时间位图转挨成一个选中时间区间的数组。
 */

function timeBitmapToRanges(timeStr) {
    timeStr = timeStr.split('')
    let result = []
    let start = null, end = null
    timeStr.map((el, index) => {
        // 之前不为0，当前为1 为开始
        if (el === '1' && timeStr[index- 1] !== '1') {
            start = index
        }
        if (el === '0' && timeStr[index- 1] == '1') {
            end = index
            result.push(start + ',' + end)
        }
        if (el === '0' && timeStr[index- 1] == '0') {
            end = null
            start = null
        }
    })
    result = result.map(el => {
        const [startT, endT ] = el.split(',')
        return [timeToStr(startT/2) + '~' +  timeToStr(endT/2)]
    })

    // 半小时转时间
    function timeToStr (n) {
        const arr = (n + '').split('.')
        let left = ':00'
        let hour = arr[0]
        if (arr[1] == 5) {
            left = ':30'
        }
        if (arr[0] <= 9) {
            hour = '0' + hour
        } else {
            hour = arr[0] + ''
        }
        return hour + left
    }
    return result
}
// console.log(timeBitmapToRanges('110000000000000000000000000000000000000000000000'))
console.log(timeBitmapToRanges('110010000000000000000000000000000000000000000000'))


// =====================================================
// 欢迎参加有赞前端 Coding 面试
// =====================================================
// 界面介绍：
//   上方设置按钮可以切换语言、字体大小、主题
//   右侧控制台可以显示代码执行结果，可用于编码过程中的 DEBUG
// =====================================================
// Coding 须知：
//   本次 Coding 时间限制为 45 分钟，共 3 道题，请量力答题
// =====================================================


/**
 * 1. 实现一个对象深拷贝的方法？尽可能考虑特殊情况，考虑下循环引用，递归爆栈的问题？
 */

function deepCopy(obj, wp = new WeakMap()) {
    
    if (typeof obj !== 'object') {
        return obj
    }

    if (obj instanceof RegExp) return new RegExp(obj)

    if (obj instanceof Date) return new Date(obj)

    if (wp.has(obj)) return wp.get(obj)

    const result = Array.isArray(obj) ? [] : {}

    for (let i in obj) {
        if (typeof obj[i] === 'object') {
            result[i] = deepCopy(obj[i], wp)
        } else {
            result[i] = obj[i]
        }
    }
    
    return result
}

/**
 * 2. 实现 getValue 函数来获取path对应的值
 */

var object = { 'a': [{ 'b': { 'c': 3 } }] }; // path: 'a[0].b.c'
var array = [{ "a": { 'b': [1] } }]; // path: '[0].a.b[0]'

function getValue(obj, path, defaultValue) {
    const arr = path.split('.')
    let result = defaultValue
    while (arr.length) {
        let item = arr.pop()

        const reg = /(\w)(\[\d+\])/.test(item)
        

        if (reg) {
            
            item = item.replace(/(\w)\[(\d+)\]/, '$1-$2')

            const [alp, index] = item.split('-')

            result = item[alp][index]
        } else {
            result = obj[item]
        }
        
    }
    return result
}

console.log(getValue(object, 'a[0].b.c', 0));  // 输出3
// console.log(getValue(array, '[0].a.b[0]', 12)); // 输出 1
// console.log(getValue(array, '[0].a.b[0].c', 12));  // 输出 12


/**
 * 3. 实现一个信息脱敏的方法， 如：手机号信息脱敏 15924167134 -> 159****7134, 可以设置脱敏的起始位置，
 * 并考虑如何解决emoji等特殊字符。
 */
 // 哈哈哈😝😝，😝 -> 哈哈***😝
function parser(str, start, end) {
    const strList = str.split('')
    for (let i = 0; i < strList.length; i++) {
        if (i >= start && i <= end) {
            strList.splice(i, 1, '*')
        }
    }
    return strList.join('')
}