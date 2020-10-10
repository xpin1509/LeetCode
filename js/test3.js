

// call apply bind
Function.prototype.myCall = function (ctx, ...arg) {
    ctx.fn = this
    const result = ctx.fn(...arg)
    delete ctx.fn
    return result
}
Function.prototype.myApply = function (ctx, arg = []) {
    ctx.fn = this
    const result = ctx.fn(...arg)
    delete ctx.fn
    return result
}
Function.prototype.myBind = function (ctx, ...arg) {
    const fn = this
    return function() {
        fn.call(ctx, ...arg)
    }
}

// promise.then promise.all promise.race
const promise = function(fn) {
    this.status = 'pedding'
    this.result = ''
    this.reason = ''
    this.onfullfilled = []
    this.onrejected = []
    const _ = this
    const resolve = (value) => {
        this.status = 'resolve'
        this.result = value
        this.onfullfilled.map(el => {
            el.call(_)
        })
    }
    const reject = (value) => {
        this.status = 'reject'
        this.reason = value
        this.onrejected.map(el => {
            el.call(_)
        })
    }
    fn(resolve, reject)
}
promise.prototype.then = function(onfullfill, onreject) {
    return new promise(() => {
        if (this.status === 'pedding') {
            this.onfullfilled.push(function() {
                onfullfill(this.result)
            })
            this.onrejected.push(function() {
                onreject(this.reason)
            })
        } else if (this.status === 'resolve') {
            onfullfill(this.result)
        } else if (this.status === 'reject') {
            if (onreject) {
                onreject(this.reason)
            }
        }
    })
}
promise.all = arr => {
    return new promise((resolve, reject) => {
        const obj = {}
        arr.forEach(element, index => {
            p.then(res => {
                obj[index] = res
                if (Object.keys(obj).length === arr.length) {
                    resolve(Object.values(obj))
                }
            }, err => {
                reject(err)
            })
        })
    })
}
promise.race = arr => {
    return new promise((resolve, reject) => {
        arr.forEach(p => {
            p.then(res => {
                resolve(res)
            }, err => {
                reject(err)
            })
        })
    })
}

// 洗牌
function random (start, end) {
    const choice = Math.floor(Math.random() * (end - start + 1))
    return choice + start
}


// debounce 
function debounce(fn, delay) {
    var timer = null
    return function(...arg) {
        if (timer) {
            clearTimeout(timer)
            timer = null
        }
        const _this = this
        timer = setTimeout(() => {
            fn.call(_this, ...arg)
        }, delay)
    }
}
// throttle
function throttle (fn, delay) {
    var timmer = null
    return function (...arg) {
        const _this = this
        if (!timer) {
            fn.call(_this, ...arg)
        }
        timmer = setTimeout(() => {
            clearTimeout(timer)
            timer = null
        })
    }
}
// deepclone
function deepclone(target, weakMap = new WeakMap()) {
    if (target instanceof Object) {
        if (target instanceof RegExp) return new RegExp(target)
        if (target instanceof Date) return new Date(target)
        let result = {}
        if (Array.isArray(target)) result = []
        if (weakMap.has(target)) return weakMap.get(target)
        weakMap.set(target, result)
        for (let i in target) {
            if (target[i] instanceof Object) {
                result[i] = deepclone(target[i], weakMap)
            } else {
                result[i] = target[i]
            }
        }
        return result
    } else {
        return target
    }
}

const event = {
    list: {},
    listen: function (key, fn) {
        if (this.list[key]) {
            this.list[key].push(fn)
        } else {
            this.list[key] = [fn]
        }
    },
    trigger: function (key, ...arg) {
        this.list[key].forEach(fn => {
            fn(...arg)
        })
    }
}
class Event {
    constructor () {
        this.list = {}
    }
    listen (key, fn) {
        if (this.list[key]) {
            this.list[key].push(fn)
        } else {
            this.list[key] = [fn]
        }
    }
    trigger (key, ...arg) {
        this.list[key].forEach(fn => {
            fn(...arg)
        })
    }
}

/**jsonp fun */
// say('hello')