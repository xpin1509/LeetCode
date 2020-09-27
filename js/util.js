/**
 * 防抖
 * 14:06 -> 14:24
 */
function debounce (fn, wait = 0) {
    var timeId = null
    return function(...arg) {
        if (timeId) {
            clearTimeout(timeId)
            timeId = null
        }
        const _this = this
        timeId = setTimeout(() => {
            fn.call(_this, ...arg)
        }, wait)
    }
}
/**
 * 节流
 * 14:26->14:40
 */
function throttle (fn, wait = 0) {
    var timeId = null
    return function(...arg) {
        const _this = this
        if (!timeId) {
            fn.call(_this, ...arg)
        }
        timeId = setTimeout(() => {
            clearTimeout(timeId)
            timeId = null
        }, wait)
    }
}
// const obj = {
//     doSomething: debounce(function (name) {
//         console.log(this)
//         console.log(name)
//     }, 2000)
// }
// obj.doSomething('xubin')
// obj.doSomething('xubin')
// setTimeout(() => {
//     obj.doSomething('xubin')
// }, 3000)

/**
 * 小于等于10000,大于0的整数转换
 * @param num 
 */
function numToChar (num) {
    if (typeof num !== 'number' || num >= 10000 || num <= 0) return num
    const charList = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
    const unitList = ['十', '百', '千', '万']
    const result = []
    const numArr = (num + '').split('').reverse()
    const len = numArr.length
    for (let i = 0; i < len; i++) {
        const char = numArr[i]
        const chinaChar = charList[char]
        const unit = i > 0 ? unitList[i-1] : ''
        let res = chinaChar + unit
        // 两位时 '一十'
        if (res === '一十' && len === 2) {
            res = '十'
        }
        // 去 '零十'
        if (res.indexOf('零') === 0 && res.length === 2) {
            res = '零'
        }
        // 去末尾零，去零零
        if (res === '零' && (result.length === 0 || result[0] === '零')) {
            continue
        }
        result.unshift(res)
    }
    return result.join('')
}

// 洗牌算法分组
// arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 's']
function shuffle (arr) {
    // 洗一次再分两组
    const len = arr.length
    for (let i = 0; i < len; i++) {
        const rangdom = Math.floor(Math.random() * len)
        const temp = arr[i]
        arr[i] = arr[rangdom]
        arr[rangdom] = temp
    }
    const left = [], right = []
    arr.map((el, index) => {
        if (index % 2 === 0) {
            left.push(el)
        } else {
            right.push(el)
        }
    })
    return {
        left, right
    }
}

/**
 * 正则，日期，循环引用，数组
 * 深拷贝
 */
function deepClone (target, weakMap = new WeakMap()) {
    if (typeof target !== 'object' || target === null) return target
    const result = Array.isArray(target) ? [] : {}
    if (weakMap.has(target)) return weakMap.get(target)
    // 正则
    if (target instanceof RegExp) return new RegExp(target)
    // date
    if (target instanceof Date) return new Date(target)

    weakMap.set(target, result)

    for (let key in target) {
        if (target.hasOwnProperty(key)) {
            if (typeof target[key] === 'object') {
                result[key] = deepClone(target[key], weakMap)
            } else {
                result[key] = target[key]
            }
        }
    }
    return result
}
// var obj = {
//     name: /^[a-z]$/,
//     age: new Date('1993-04-28'),
//     say: function () {
//         console.log(this.name)
//     }
// }
// obj.child = obj
// const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 's', obj]
// const cloneObj = deepClone(arr)
// console.log(JSON.parse(JSON.stringify(arr)))
// const arr1 = [1,2,'a','c',0]
// const arr2 = [2,'c',9,7, 0]
/**
 * 求两个数组的交集
 * @param {Array} arr1 
 * @param {Array} arr2 
 */
function mixed (arr1, arr2) {
    const result = []
    const map = new Map()
    for (let i = 0; i < arr1.length; i++) {
        map.set(arr1[i], 1)
    }
    for (let i = 0; i < arr2.length; i++) {
        if (map.has(arr2[i])) {
            result.push(arr2[i])
        }
    }
    return result
}
