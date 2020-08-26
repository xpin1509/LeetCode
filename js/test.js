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
// 插入排序
// 快排
// 希尔排序
// 归并排序
// 深拷贝
// JSON.parse的缺点
// 1.undefined
// 2.正则
// 3.循环引用
function deepcolne (data) {
    const obj = {}
    for (let i in data) {
        const value = data[i]
        if (value == undefined) {
            obj[i] = value
        } else if (value instanceof RegExp) {
            obj[i] = value
        } else if (value instanceof Object){
            obj[i] = deepcolne(value)
        } else {
            obj[i] = value
        }
    }
    return obj
}
// 简单二叉树 2-3条题目
// 100. 相同的树
// 简单链表  2-3条题目
// 2. 两数相加

// [2,88]的随机数
function random(start, end) {
    const rang = end - start + 1
    return parseInt(Math.random() * rang + start)
}
// 重新看下云的算法笔记和leetcode的笔记
// https://juejin.im/post/6844903887502082061


/*
 *暂时不做的promise
 */