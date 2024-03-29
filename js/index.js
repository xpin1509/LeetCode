//     setTimeout(() => {
//         // 插入十万条数据
//         const total = 100000
//         // 一次插入 20 条，如果觉得性能不好就减少
//         const once = 20
//         // 渲染数据总共需要几次
//         const loopCount = total / once
//         let countOfRender = 0
//         let ul = document.querySelector('ul')
//         function add() {
//             // 优化性能，插入不会造成回流
//             const fragment = document.createDocumentFragment()
//             for (let i = 0; i < once; i++) {
//                 const li = document.createElement('li')
//                 li.innerText = Math.floor(Math.random() * total)
//                 fragment.appendChild(li)
//             }
//             ul.appendChild(fragment)
//             countOfRender += 1
//             loop()
//         }
//         function loop() {
//             if (countOfRender < loopCount) {
//                 window.requestAnimationFrame(add)
//             }
//         }
//         loop()
//   }, 0)
// 洗牌算法
// function getTarget (arr, target) {
//     for (let i = 0; i < arr.length; i++) {
//         for (let j = i; j < arr.length; j++) {
//             if ((arr[i] + arr[j]) === target) {
//                 return [i, j]
//             }
//         }
//     }
// }
// console.log(getTarget([2,7,13,15], 9))
// function sortFn (arr, k) {
//     const res = arr.sort((a,b) => {
//         return b - a
//     })
//     return res[k-1]
// }
// console.log(sortFn([3,2,3,1,2,4,5,5,6], 4))
// 现给定任意正整数 n，请寻找并输出最小的正整数 m（m>9），
// 使得 m 的各位（个位、十位、百位 ... ...）之乘积等于n，若不存在则输出 -1。
function solution( n ) {
    // for (let i = 9; i <= 10 ** `${n}`.length; i++ ){
    //     if (getSum(i) === n) {
    //         return i
    //     }
    // } 
    // function getSum (x) {
    //     let res = 1
    //     var arr = `${x}`.split('')
    //     for(let i = 0; i < arr.length; i++ ) {
    //         res *= arr[i]
    //     }
    //     return res
    // }
    // return -1
    // 求所有积为n的数组
    // for (let i = 1; i < n; i++) {
    //     if (n % i)
    // }
    // function getAllChild (x) {
    //     const arr = []
    //     for (let i = 2; i < x; i++) {
    //         if (x % i === 0) {
    //             arr.push(i)
    //         }
    //     }
    // }
}

// 1 块钱可以买 3 个桃子吃，吃完后 3 个桃核可以换 1 个桃子，请问 135142857 元可以最多吃到多少个桃子。
function getpeach (m) {
    let peach = m * 3
    let peachCore = m * 3
    while (peachCore > 2) {
        const newpeach = parseInt(peachCore/3)
        peach += newpeach
        peachCore -= newpeach * 3
        peachCore += newpeach
    }
    return peach
}
// getpeach(1) === 4
// getpeach(2) === 3 + 3 + 2 === 8
// getpeach(3) === 3 + 3 + 3 + 3 + 1 === 13
// console.log(getpeach(135142857))

/**
 * 十亿元以内,两位以内小数的中文表示法 
 * 1 => '一'
 * 11 => '十一'
 * 21 => '二十一'
 * 111 => '一百一十一'
 * 1111 => '一千一百一十一'
 * 11111 => '一万一千一百一十一'
 * 111111 => '十一万一千一百一十一'
 * 1111111 => '一百一十一万一千一百一十一'
 */
function numToChar(target) {
    if (typeof target !== 'number' || target > 10 ** 9 || target < 0.01) return ''
    const wList = ['', '万', '亿']
    const digitsList = chunk((target + '').split('').reverse(), 4)
    let arrList = digitsList.map((el,index) => {
        return wList[index] ? [...removeLastZero(underthoundnumToChar(el)), wList[index]] : underthoundnumToChar(el)
    })
    // 扁平化
    arrList = arrList.reverse().reduce((total, cur) => { return [...total, ...cur]}, [])
    return removeTen(removeLastZero(remoMidZero(arrList))).join('')
    // 数组分组
    function chunk (arr, target) {
        if (!Array.isArray(arr) || !target) {
            console.error('请输入数组和有效数值')
            return false
        }
        if (arr.length < target) return [arr]
        const res = []
        const arrTemp = [...arr]
        while(arrTemp.length > target) {
            res.push(arrTemp.splice(0, target))
        }
        return arrTemp.length ? [...res, arrTemp] : [...res]
    }
    // 10000以内的中文表示
    function underthoundnumToChar (arr) {
        const numList = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
        const tennumList = ['', '十', '百', '千']
        const res = []
        for (let i = 0; i < arr.length; i++) {
            let num = numList[arr[i]]
            let last = tennumList[i]
            res.push(replaceStr(num + last))
        }
        return res.reverse()
    }
    // 零百零千的转零
    function replaceStr(str) {
        return str.indexOf('零') > -1 ? '零' : str
    }
    // 去尾零
    function removeLastZero(arr) {
        const temp = [...arr]
        while (temp.length) {
            const last = temp.pop()
            if (last !== '零') {
                return [...temp, last]
            }
        }
    }
    // 去中间零
    function remoMidZero (arr) {
        if (arr.length < 4) return arr
        for (let i = 1; i < arr.length - 1; i++) {
            if (arr[i] == '零' && arr[i+1] == '零') {
                arr.splice(i, 1)
                i--
            }
        }
        return arr
    }
    // 没有前置时，一十转十
    function removeTen(arr) {
        const temp = [...arr]
        const first = temp.shift()
        return first == '一十' ? ['十', temp] : arr
    }
}


// window.onerror = function (e) {
//     console.log(e)
// }

window.addEventListener('error', function (e) {
    console.log(e)
}, false)

window.addEventListener('unhandledrejection', function (e) {
    console.log(e)
})

new Promise((resolve, reject) => {
    reject(1)
}).then(() => {})

console.log(a)


// 截取数值
let index = 0
// 10s阈值
const TIMEOUT = 1000 * 1
const resTimes = window.performance.getEntriesByType('resource')
function getTimeoutRes (resTimes) {
    const list = resTimes.slice(index)
    index += list.length
    const result = list.filter(item => {
        const { startTime, responseEnd } = item
        const time = responseEnd - startTime
        return time > TIMEOUT
    }).map(el => el.name)
    return result
}
getTimeoutRes(resTimes)


const girl = {
    name: 'xiaohong',
    age: '28'
}
var obj = new Proxy(girl, {
    get: function (target, propKey, receiver) {
        return target[propKey]
    },
    set: function (target, propKey, value, receiver) {
        // if (!target[propKey]) return
        console.log(value)
        target[propKey] = value
    }
});
obj.books = 'js'


window.addEventListener('hashchange', hashChange)

window.location.hash = '/login'

function hashChange (e) {
    console.log('hashChange', e)
}

window.addEventListener('popState', popStateChange)

// window.location.pathname = '/'

function popStateChange (e) {
    console.log('popStateChange', e)
}
