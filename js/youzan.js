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