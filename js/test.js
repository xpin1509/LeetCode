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
function debounce () {}
// 8.节流
function throttle () {}
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
// instanceof
// 快排
// 希尔排序
// 归并排序
// 简单二叉树 2-3条题目
// 5.给定两个二叉树,编写一个函数来检验他们是否相同
// 简单链表  2-3条题目
// 重新看下云的算法笔记和leetcode的笔记
// https://juejin.im/post/6844903887502082061