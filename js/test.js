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
{/* <script>
    console.log(1)
    new Promise((r) => r()).then(() => {
        console.log('then')
    })
    console.log(2)
</script>
<script>
    console.log('3')
</script> */}
// 1 2 then 3



// 1.Promise.all
Promise.all = function (list) {
    const obj = {}
    return new Promise((resolve, reject) => {
        for (let i = 0; i < list.length; i++) {
            const p = list[i]
            p.then(res => {
                obj[i] = res
                if (Object.keys(obj) === list.length) {
                    const result = Object.keys(obj).map(el => obj[el])
                    resolve(result)
                }
            }).catch(err => {
                reject(err)
            })
        }
    })
}
// 2.Promise.race
Promise.race = function (list) {
    return new Promise((resole, reject) => {
        for (let p of list) {
            p.then(res => {
                resole(res)
            }).catch(err => {
                reject(err)
            })
        }
    })
}
// 3.bind
Function.prototype.Mybind = function (ctx, ...arg) {
    ctx = ctx || window
    const fn = this
    return function F() {
        if (this instanceof F) {
            return fn.call(this, ...arg)
        }
        return fn.call(ctx, ...arg)
    }
}
// 4.call
Function.prototype.myCall = function (ctx, ...arg) {
    const fn = this
    ctx = ctx || window
    ctx.fn = fn
    const res = ctx.fn(...arg)
    delete ctx.fn
    return res
}
// 5.apply
Function.prototype.myApply = function (ctx, arr) {
    const fn = this
    ctx = ctx || window
    ctx.fn = fn
    const res = ctx.fn(arr)
    delete ctx.fn
    return res
}
// 6.列表变层级关系
const data = [
    {id: 1, parentId: null, name: "1"},
    {id: 2, parentId: 1, name: "2"},
    {id: 3, parentId: 2, name: "3"},
    {id: 4, parentId: 2, name: "4"},
    {id: 5, parentId: 3, name: "5"},
    {id: 6, parentId: 1, name: "6"},
    {id: 7, parentId: 3, name: "7"},
    {id: 8, parentId: 2, name: "8"}
];
function totree(list){
    for (let i of list) {
        for (let j of list) {
            if (j.parentId === i.id) {
                const child = i.child || []
                i.child = [...child, j]
            }
        }
    }
    return list.find(el => el.parentId === null)
}
// 7.防抖
function debounce (fn, time) {
    var timer = null
    return function (...arg) {
        if (timer) {
            clearTimeout(timer)
            timer = null
        }
        const _this = this
        timer = setTimeout(() => {
            fn.call(_this, ...arg)
        }, time)
    }
}
// 8.节流
function throttle (fn, wait = 0) {
    let timer = null
    return function (...arg) {
        const _this = this
        if (!timer) {
            fn.call(_this, ...arg)
        }
        timer = setTimeout(() => {
            clearTimeout(timer)
            timeId = null
        }, wait)
    }
}
// map
Array.prototype.myMap = function (fn) {
    const arr = this
    const result = []
    for (let i = 0; i < arr.length; i++) {
        const el = arr[i]
        result.push(fn(el, i, arr))
    }
    return result
}
// new
function new1 (fn, ...arg) {
    const _this = Object.create(fn.prototype)
    fn.call(_this, ...arg)
    // _this.__proto__ = fn.prototype
    return _this
}

// instanceof
function instanceof1 (left, right) {
    while(left.__proto__ !== null) {
        if (left.__proto__ === right.prototype) {
            return true
        }
        left = left.__proto__
    }
    return false
} 
/**
 * 阮一峰版优化版
 * 快排 先选取基准值（可选随机数的最后一值），分成两份，然后递归两边完成排序
 * @param {Array} result 
 */
function quickSort (arr) {
    if (arr.length <= 1) return arr
    const basic = arr[arr.length - 1]
    const left  = [], right = [], center = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < basic) {
            left.push(arr[i])
        } else if (arr[i] > basic) {
            right.push(arr[i])
        } else {
            center.push(arr[i])
        }
    }
    return [...quickSort(left), ...center, ...quickSort(right)]
}
// 
/**
 * 希尔排序 首次突破O(n^2)的排序 又称缩小增量排序
 * @param {Array} arr 
 */
function shellSort (arr) {
    const result = [].concat(arr)
    const len = result.length
    let gap = Math.floor(len / 2)
    for (gap; gap > 0; gap = Math.floor(gap/2)) {
        for (let i = gap; i < len; i++) {
            for (let j = i - gap; j >= 0; j -= gap) {
                if (result[j] > result[i]) {
                    const temp = result[j]
                    result[j] = result[i]
                    result[i] = temp
                }
            }
        }
    }
    return result
}
/**
 * 归并排序 merge sort，核心思想分治 采用递归的方式
 * @param {Array} data 
 */
function merge (left, right) {
    const result = []
    while(left.length && right.length) {
        if (left[0] < right[0]) {
            result.push(left.shift())
        } else {
            result.push(right.shift())
        }
    }
    return result.concat(left, right)
}
function mergeSort (arr) {
    if(arr.length <=1) return arr
    const mid = Math.floor(arr.length / 2)
    const left = arr.slice(0, mid)
    const right = arr.slice(mid)
    return merge(mergeSort(left), mergeSort(right))
}

// 简单二叉树 2-3条题目
// 100. 相同的树
var isSameTree = function(p, q) {
    if (p === null && q === null) {
        return true
    } else if (p === null || q === null) {
        return false
    } else if (p.val !== q.val) {
        return false
    } else {
        return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
    }
}
// 简单链表  2-3条题目
// 2. 两数相加
// 206. 反转链表
var reverseList = function(head) {
    if (!head || !head.next) return head
    let current = head
    let pre = null
    while (current) {
        next = current.next
        current.next = pre
        pre = current
        current = next
    }
    return pre
};


// [start,end]的随机数
function random(start, end) {
    const rang = end - start + 1
    return parseInt(Math.random() * rang + start)
}
// 请实现plus(1)(2)(3)(4)等于8？
function plus (n) {
    let sum = n
    function _plus (num) {
        sum += num
        return _plus
    }
    _plus.toString = function () {
        return sum
    }
    return _plus
}

// 重新看下云的算法笔记和leetcode的笔记
// https://juejin.im/post/6844903887502082061
// 暂时不做的promise

// Promise.all = function (list) {
//     return new Promise((resolve, reject) => {
//         const map = {}
//         for (let i = 0; i < list.length; i++) {
//             list[i].then(res => {
//                 // 检查所有的数据加载完成
//                 map[index] = res
//                 if (Reflect.keys(map).length === list.length) {
//                     const result = Reflect.keys(map).map(el => map[el])
//                     resolve(result)
//                 }
//             }, err => {
//                 reject(err)
//             })
//         }
//     }) 
// }
// Promise.race = function (list) {
//     return new Promise((resolve, reject) => {
//         for (let i = 0; i < list.length; i++) {
//             const p = list[i]
//             p.then((result) => {
//                 resolve(result)
//             }).catch((err) => {
//                 reject(err)
//             });
//         }
//     })
// }

/**
 * 洗牌算法 利用随机数的原理
 */
function shuffle (arr) {
    const result = [].concat(arr)
    let n = arr.length - 1, i = 0
    while (n > 0) {
        i = parseInt(Math.floor((n + 1) * Math.random()))
        const temp = result[i]
        result[i] = result[n]
        result[n] = temp
        n--
    }
    return result
}

//在写快排和归并
// function quick (arr) {
//     if (arr.length <= 1) return arr
//     const basic = arr[arr.length - 1]
//     const left = [], center = [], right = []
//     for (let i = 0; i < arr.length; i++) {
//         if (arr[i] < basic) {
//             left.push(arr[i])
//         } else if (arr[i] > basic) {
//             right.push(arr[i])
//         } else {
//             center.push(arr[i])
//         }
//     }
//     return [...quick(left), ...center, ...quick(right)]
// }
// function mergeSort1 (arr) {
//     if (arr.length < 2) return arr
//     const len = arr.length
//     const mid = Math.floor(len/2)
//     const left = arr.slice(0, mid)
//     const right = arr.slice(mid)
//     return merge1(mergeSort1(left), mergeSort1(right))
// }
// function merge1 (left, right) {
//     const result = []
//     while(left.length && right.length) {
//         if (left[0] < right[0]) {
//             result.push(left.shift())
//         } else {
//             result.push(right.shift())
//         }
//     }
//     return [...result, ...left, ...right]
// }

/**
 * 深拷贝
 * 问题1：JSON.parse的缺点1.undefined 2.正则 3.循环引用 4.Symbol
 * 问题2：递归需要注意的事项：1.数组的拷贝 2.循环引用
 * @param {Object} data 
 */
function deepclone (data, hash = new WeakMap()) {
    if (data == null || typeof data !== 'object') {
        return data
    }
    if (data instanceof RegExp) return new RegExp(data)

    if (hash.has(data)) return hash.get(data)
    let reslut = new data.__proto__.constructor()
    hash.set(data, reslut)
    for (let i in data) {
        if (typeof data[i] === 'object') {
            reslut[i] = deepclone(data[i], hash)
        } else {
            reslut[i] = data[i]
        }
    }
    return reslut
}

function P (executor) {
    this.status = 'pending'
    this.value = undefined
    this.reason = undefined
    const _this = this
    function resolve (val) {
        if (_this.status === 'pending') {
            _this.status = 'resolved'
            _this.value = val
        }
    }
    function reject (reason) {
        if (_this.status === 'pending') {
            _this.status = 'rejected'
            _this.reason = reason
        }
    }
    executor(resolve, reject)
}
P.prototype.then = function (onFullFilled, onRejected) {
    return new P((resolve, reject) => {
        if (this.status === 'resolved') {
            try {
                resolve(onFullFilled(this.value))
            } catch (e) {
                reject(e)
            }
            
        } else if (this.status === 'rejected') {
            try {
                resolve(onRejected(this.reason))
            } catch (e) {
                reject(e)
            }
        }
    })
}
// const promise = new P((resolve, reject) => {
//     setTimeout(() => {
//         resolve('hello world')
//     }, 1000)
//     // reject('hello err')
// }).then(res => {
//     console.log(res)
// }, err => {
//     console.log(err)
// })

// const promise = new Promise((resolve, reject) => {
//     resolve(new Error('hh'))
// })
// .then(res => {
//     console.log(a)
// }, err => {
//     console.log(err)
// })
// console.log(promise)