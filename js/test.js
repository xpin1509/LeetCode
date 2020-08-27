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
// let obj = {         
//     reg : /^asd$/,
//     fun: function(){},
//     syb:Symbol('foo'),
//     asd:'asd'
// }
// obj.c = obj
// console.log(deepclone(obj))
// JSON.parse(JSON.stringify(obj))