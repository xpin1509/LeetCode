// 节流防抖
// new操作符
// call、bind、apply实现
// 发布订阅模式
// 深浅拷贝
// promise
// 数组去重
// 数组扁平化
// 函数柯里化实现
// 实现一个队列
// 交换两个变量的值
// 请手写一下map、instanceof、Promise

// 请实现plus(1)(2)(3)(4)等于10？
// 十大排序算法
// LRU 缓存函数
// 二叉树题：最大深度，二叉搜索树，DFS，BFS
// 链表题：反转链表
// 数据结构与算法，实现队列 栈 
// 模拟Object.create
// 解析 URL Params 为对象
// 转化为驼峰命名
// 实现千位分隔符

function throttle (fn, time) {
    var timeid = null;
     return function (...arg) {
        const _this = this
        if (!timeid) fn.call(_this, ...arg)

        timeid = setTimeout(() => {
            timeid = null
        }, time)
     } 
}

function debounce (fn, time) {
    var timeid = null;
     return function (...arg) {
        const _this = this
        if (timeid) clearTimeout(timeid)

        timeid = setTimeout(() => {
            fn.call(_this, ...arg)
        }, time)
     } 
}

function myNew (fn, ...arg) {
    const result = Object.create(fn.prototype)

    fn.call(result, ...arg)

    return result
}

// call、bind、apply实现
Function.prototype.myCall = function (obj, ...arg) {
    const fn = this
    const result = (obj || window).fn(...arg)
    delete obj.fn
    return result
}
Function.prototype.myBind = function (obj, arg) {
    const fn = this
    const result = (obj || window).fn(...arg)
    delete obj.fn
    return result
}
Function.prototype.myBind = function (obj, ...arg1) {
    const fn = this
    const ctx = (obj || window)
    return function (...arg2) {
        return fn.apply(ctx, [...arg1, ...arg2])
    }
}

// 发布订阅模式
class publish {
    constructor () {
        this.target = {}
    }

    bind (type, fn) {
        if (this.target[type] && this.target[type].length) {
            this.target[type].push(fn)
        } else {
            this.target[type] = [fn]
        }
    }

    unbind (type, fn) {
        if (this.target[type] && this.target[type].length) {
            const res = this.target[type].filter(f => f !== fn)
            this.target[type] = res
        }
    }

    emit (type, ...arg) {
        const fns = this.target[type]
        if (fns.length) {
            fns.map((fn) => {
                fn.call(this, ...arg)
            })
        }
    }
}

// 深浅拷贝
function deepClone (target, map = new weakMap()) {
    if (typeof target !== 'object' || target === null) return target

    if (target instanceof RegExp) return new RegExp(target)

    if (target instanceof Date) return new Date(target)

    if (map.has(target)) return map.get(target)

    const result = new target.__proto__.constructor()
    for (let key in target) {
        if (target.hasOwnProperty(key)) {
            if (typeof target[key] === 'object') {
                result[key] = deepClone(target[key], map)
            } else {
                result[key] = target[key]
            }
        }
    }
}

// 数组扁平化
Array.prototype.myFlatten = function () {
    const target = this
    return target.reduce((total, cur) => total.concat(Array.isArray(cur) ? cur.myFlatten() : cur), [])
}

// 实现一个队列
class Queue {
    constructor () {
        this.target = []
    }
    
    add (target) {
        this.target.push(target)
    }

    pop () {
        this.target.shift()
    }

    size () {
        return this.target.length
    }
}

// instanceof
function myInstance (left, right) {
    while (left) {
        if (left.__proto__ === right.prototype) {
            return true
        } else {
            left = left.__proto__
        }
    }
    return false
}

class Promise1 {
    constructor (executor) {
        this.status = 'pending'
        this.value = null
        this.error = null
        this.onresolve = []
        this.onreject = []
        const _this = this
        function resolve (value) {
            _this.status = 'resolved'
            _this.value = value
            _this.onresolve.forEach((e) => {
                e.call(_this, _this.value)
            })
        }
        function reject (err) {
            _this.status = 'rejected'
            _this.error = err
            _this.onreject.forEach((e) => {
                e.call(_this, _this.error)
            })
        }
        executor(resolve, reject)
    }
    then (onresolve = () => {}, onreject = () => {}) {
        const _this = this
        return new Promise1(function (resolve, reject) {
            if (_this.status === 'pending') {
                _this.onresolve.push(onresolve)
                _this.onreject.push(onreject)
            } else if (_this.status === 'resolved') {
                resolve(onresolve.call(_this, _this.value))
            } else if (_this.status === 'rejected') {
                reject(onreject.call(_this, _this.error))
            }
        }) 
    }
}

// new Promise1((resolve, reject) => {
//     resolve(1)
// }).then(res => {
//     console.log(1)
// }, (e) => {
//     console.error(e)
// })

Promise.race = function (list) {
    return new Promise(function (resolve, reject) {
        for (let i of list) {
            p.then((res) => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        }
    })
}
Promise.all = function (list) {
    return new Promise(function (resolve, reject) {
        const result = []
        for (let i = 0; i < list.length; i++) {
            list[i].then((res) => {
                result[i] = res
                if (result.length === list.length) {
                    return resolve(res)
                }
            }).catch(err => {
                return reject(err)
            })
        }
    })
}
// TODO
Promise.finally = function (list) {
    return this.then(value => {
        return Promise.resolve(callback().then(e => {
            return value
        }))
    }, err => {
        return Promise.resolve(callback().then(e => {
            return err
        }))
    })
}