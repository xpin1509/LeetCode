/**
 * DONE
 * 深拷贝
 * @param {any} target 
 * @param {weakMap} hashmap 
 */
function deepClone (target, hashmap = new WeakMap()) {
    if (typeof target === 'object') {
        if (hashmap.has(target)) return hashmap.get(target)
        if (target instanceof RegExp) return new RegExp(target)
        if (target instanceof Date) return new Date(target)

        const result = target.__proto__.constructor()
        hashmap.set(target, result)
        for (let e in target) {
            if (target.hasOwnProperty(e)) {
                if (typeof target[e] === 'object') {
                    result[e] = deepClone(target[e], hashmap)
                } else {
                    result[e] = target[e]
                }
            }
        }
        return result
    } else {
        return target
    }
}
// const deepData = {
//     name: 'xiaofang',
//     reg: /^23/,
//     date: new Date('2020-11-20'),
//     say: function () {
//         console.log(this.name)
//     },
// }
// deepData._data = deepData
// deepData.say()
// const cloneData = deepClone(deepData)
// console.log(cloneData)
// cloneData.name = 'xiaohu'
// cloneData.say()
// const deepData = [1,2,3, {
//     name: 'xiaoming'
// }]
// console.log(deepClone(deepData))
// deepData[deepData.length - 1].name = 2




const testData = {
    a_bbb: 123,
    a_g: [1,2,3,4],
    a_d: {
        s: 2,
        s_d: 3,
    },
    a_f: [1,2,3, {
        a_g: 5
    }],
    a_d_s: 1
}

/**
 * DONE
 * 下划线转驼峰(toUpperCase(), hasOwnProperty(), 递归)
 */
function campleCase (target) {
    if (typeof target !== 'object') return target
    if (target instanceof RegExp) return new RegExp(target)
    if (target instanceof Date) return new Date(target)

    const result = new target.__proto__.constructor()
    for (let e in target) {
        if (target.hasOwnProperty(e)) {
            const newName = underscoreHump(e)
            if (typeof target[e] === 'object') {
                result[newName] = campleCase(target[e])
            } else {
                result[newName] = target[e]
            }
        }
    }
    return result
}

function underscoreHump (string) {
    // const strList = string.split('')
    // for (let i = 0; i < strList.length; i++) {
    //     const char = strList[i]
    //     const next = strList[i + 1]
    //     const reg = /^[a-z]$/
    //     if (char === '_' && reg.test(next)) {
    //         strList.splice(i, 2, next.toUpperCase())
    //     }
    // }
    // return strList.join('')
    const reg = /_[a-z]/g
    return string.replace(reg, function(world) {
        return world.replace('_', '').toUpperCase()
    })
}
// console.log(underscoreHump('a_n_j_a'))
// console.log(campleCase(testData))


/**
 * DONE
 * 数组去重 扁平化
 * @param {Array} arr 
 */
function flatArr (arr) {
    return arr.reduce(function(total, cur) {
        const left = Array.isArray(cur) ? flatArr(cur) : cur
        return total.concat(left)
    }, [])

    // let result = []
    // for (let e of arr) {
    //     if (Array.isArray(e)) {
    //         result = result.concat(flatArr(e))
    //     } else {
    //         result.push(e)
    //     }
    // }
    // return result
}

// const arr = [1,2,3, [4, [5, 6, [7,8,[9]]]]]
// const flat = flatArr(arr)

// console.log(flat)


// throttle, debounce
function debounce (fn, time) {
    let timmer = null
    return function (...arg) {
        const ctx = this
        if (timmer) {
            clearTimeout(timmer)
            timmer = null
        }
        timmer = setTimeout(function() {
            fn.apply(ctx, arg)
        }, time)
    }
}
function throttle (fn, time) {
    let timmer = null
    return function (...arg) {
        const ctx = this
        if (!timmer) {
            fn.apply(ctx, arg)
        }
        timmer = setTimeout(function () {
            timmer = null
        }, time)
    }
} 
// const obj = {
//     name: '消防'
// }
// const fn = throttle(function(name = '小虎', age) {
//     console.log(name, age)
//     console.log(this)
// }, 1000)
// obj.fn = fn
// obj.fn()
// fn()

// setTimeout(function () {
//     fn('hello', 23)
// }, 1000)


/**
 * call apply bind
 * @param {ctx} ctx 
 */
Function.prototype.myCall = function (ctx, ...arg) {
    ctx.fn = this
    const result = ctx.fn(...arg)
    delete ctx.fn
    return result
}
Function.prototype.myApply = function (ctx, arg) {
    ctx.fn = this
    const result = ctx.fn(...arg)
    delete ctx.fn
    return result
}
Function.prototype.myBind = function (ctx, ...arg) {
    const fn = this
    return function (...arg1) {
        fn.apply(ctx, arg.concat(arg1))
    }
}
// function say (age, ...left) {
//     console.log(this)
//     console.log(age, ...left)
// }

// const obj = {
//     name: '小明'
// }

// say.bind(obj, '难')(29)

/**
 * 发布订阅 DONE
 */
class Event {
    constructor () {
        this.events = {}
    }
    on (type, fn) {
        if (this.events[type]) {
            this.events[type] = [...this.events[type], fn]
        } else {
            this.events[type] = [fn]
        }
    }
    emit (type, ...arg) {
        if (!this.events[type]) return
        const _this = this
        this.events[type].forEach(fn => {
            fn.apply(_this, arg)
        })
    }
    remove (type, fn) {
        if (!this.events[type]) return
        this.events[type] = this.events[type].filter(f => {
            return f !== fn 
        })
    }
}
// const bus = new Event()
// const fn = function (value) {
//     console.log(value)
//     console.log(this)
// }
// bus.on('change', fn)
// bus.on('change', function () {
//     console.log('hey girl')
// })
// bus.emit('change', 'xiaofang')

// bus.remove('change', fn)
// bus.emit('change', '小明')


/**
 * DONE
 * Promise
 */
class promise {
    constructor (func) {
        this.status = 'pedding'
        this.result = null
        this.reason = null

        this.onFullfilled = []
        this.onrejectFilled = []

        const _this = this
        const resolve = function (value) {
            _this.status = 'resolved'
            _this.result = value
            _this.onFullfilled.forEach(fn => {
                fn.call(_this, _this.result)
            })
        }
        const reject = function (reason) {
            _this.status = 'rejected'
            _this.reason = reason
            _this.onrejectFilled.forEach(fn => {
                fn.call(_this, _this.reason)
            })
        }
        func(resolve, reject)
    }
    then (onresolve, onreject) {
        return new promise((resolve, reject) => {
            if (this.status === 'resolved') {
                onresolve.call(this, this.result)
            } else if (this.status === 'rejected') {
                onreject.call(this.reason)
            } else if (this.status === 'pedding') {
                this.onFullfilled.push(onresolve)
                this.onrejectFilled.push(onreject)
            }
        })
    }
    static all (pList) {
        return new promise((resolve, reject) => {
            const result = {}
            for (let i = 0; i< pList.length; i++) {
                pList[i].then(res => {
                    result[i] = res
                    if (Object.keys(result) === pList.length) {
                        resolve(Object.values(result))
                    }
                }).catch(err => {
                    reject(err)
                })
            }
        })
    }
    static race (pList) {
        return new promise((resolve, reject) => {
            for (let p of pList) {
                p.then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            }
        })
    }
}
// new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(1)
//     }, 1000)
// }).then(res => {
//     console.log(res)
//     console.log(this)
// }, err => {
//     console.warn(err)
// })

/**
 * 递归1 100
 * @param {Number} num 
 */
function plus (num) {
    function add (num) {
        if (num <= 1) return num
        return add(num - 1) + num
    }
    return add(num)
}

/**
 * DONE
 * new
 * @param {Function} fn 
 * @param  {any} arg 
 */
function myNew (fn, ...arg) {
    const result = Object.create(fn.prototype)
    fn.call(result, ...arg)
    return result
}
// function Person (name, age) {
//     this.name = name
//     this.age = age
// }

// const person = myNew(Person, '小马', 25)
// console.log(person)

// instanceof
function myInstance (left, right) {
    while(left.__proto__ !== null) {
        if (right.prototype === left.__proto__) {
            return true
        } else {
            left = left.__proto__
        }
    }
    return false
}

// 随机算法
function random (min, max) {
    const range = max - min + 1
    const result = Math.random() * range + min
    return result
}
// add(1)(2)(3)
function add1 (num) {
    let sum = num
    function _plus (n) {
        sum += n
        return _plus
    }
    _plus.toString = function () {
        return sum
    }
    return _plus
}

// 快排
const arr = [1,2,3,4,8,9,4,5,6]
// 冒泡