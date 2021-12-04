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
// 斐波那契 递归，迭代法
// 随机算法
// 解析 URL Params 为对象
// 转化为驼峰命名

// 并发请求限制
// 请实现plus(1)(2)(3)(4)等于10？
// 十大排序算法
// LRU 缓存函数
// 数据结构
// 二叉树题：最大深度，最小深度，二叉搜索树，DFS，BFS
// 链表题：反转链表，合并两个有序链表
// 实现队列 栈 
// 控制请求数量,并发请求fetchWithLimit
// 模版解析

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

    fn.apply(result, arg)

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
Array.prototype.myFlatten = function (n = Infinity) {
    const target = this
    return target.reduce((total, cur) => total.concat(Array.isArray(cur) && n > 0 ? cur.myFlatten(n - 1) : cur), [])
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
            setTimeout(() => {
                _this.status = 'resolved'
                _this.value = value
                _this.onresolve.forEach((e) => {
                    e.call(_this, _this.value)
                })
            })
        }
        function reject (err) {
            setTimeout(() => {
                _this.status = 'rejected'
                _this.error = err
                _this.onreject.forEach((e) => {
                    e.call(_this, _this.error)
                })
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

    finally (onfinally) {
        return this.then(value => {
            return Promise.resolve(onfinally()).then(() => value)
        }, err => {
            return Promise.resolve(onfinally()).then(() => { throw err })
        })
    }

    catch (onRejected) {
        return this.then(undefined, onRejected)
    }
}

Promise1.race = function (list) {
    return new Promise1(function (resolve, reject) {
        for (let i of list) {
            p.then((res) => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        }
    })
}
Promise1.all = function (list) {
    return new Promise1(function (resolve, reject) {
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

// 斐波那契 递归，迭代法
function fibonacci (n) {
    if (n <= 2) return 1

    const result= [1, 1]

    for (let i = 2; i < n; i++) {
        result[i] = result[i - 1] + result[i - 2]
    }

    return result[n-1]
}

// 随机算法
function random (m, n) {
    return  Math.floor(Math.random() * (n - m + 1)) + m
}

// 驼峰互转
function undertoCaml (str) {
    return str.replace(/(_\w)/g, function (s) {
        return s.toUpperCase().replace(/_/, '')
    })
}
function camleTounder (str) {
    return str.replace(/([A-Z])/g, '_$1').toLowerCase()
}

// 列表变层级关系
const listToTreeData = [
    {id: 1, parentId: null, name: "1"},
    {id: 2, parentId: 1, name: "2"},
    {id: 3, parentId: 2, name: "3"},
    {id: 4, parentId: 2, name: "4"},
    {id: 5, parentId: 3, name: "5"},
    {id: 6, parentId: 1, name: "6"},
    {id: 7, parentId: 3, name: "7"},
    {id: 8, parentId: 2, name: "8"}
];
// function listToTree (data) {
//     for (let i = 0; i < data.length; i ++) {
//         for (let j = 0; j < data.length; j++) {
//             if (data[i].parentId === data[j].id) {
//                 data[j].child ? data[j].child.push(data[i]) : (data[j].child = [data[i]])
//             }
//         }
//     }
//     return data.filter(el => el.parentId === null)
// }
function listToTree2 (data) {
    const map = {}, result = []
    data.map(el => {
        map[el.id] = el
    })
    for (let i = 0; i < data.length; i++) {
        const parent = map[data[i].parentId]
        if (parent) {
            if (parent.children) {  
                parent.children.push(data[i])
            } else {
                parent.children = [data[i]]
            }
        } else {
            result.push(data[i])
        }
    }
    return result
}

// 模拟Object.create
function createObj (obj, attrs = {}) {
    const newObj = {};
    newObj.__proto__ = obj;
    Object.keys(attrs).forEach(key => {
        newObj[key] = attrs[key]
    })
    return newObj;
}


// LRU 缓存函数
class LRU {
    constructor (size = 10) {
        this.list = []
        this.size = size
    };
    push (type) {
        this.filter(type)
        this.list.push(type)
        if (this.list.length > this.size) {
            this.shift()
        }
    };
    shift () {
        this.list.shift()
    }
    filter (type) {
        this.list = this.list.filter(el => el !== type)
    };
    get (type) {
        const result = this.list.find(type)
        this.push(type)
        return result
    }
}

// 实现千位分隔符
function toLocaleString (str) {
    // 小数情况
    // 其余情况写个正则，或者用函数表示
    return str.toLocaleString()
}

// 手写reduce
Array.prototype.myReduce = function (fn, r) {
    const arr = this
    let result = r

    for (let i = 0; i < arr.length; i++) {
        result = fn(result, arr[i])
    }
    return result
} 

// 并发请求限制
function limitAsync (list, n) {
    const temArr = list.splice(0, n);
    while (temArr.length) {
        const item = temArr.pop();
        Promise.resolve(item.call()).finally(() => {
            if (list.length) {
                const leftItem = list.pop()
                temArr.push(leftItem.call())
            }
        })
    }
}

// 请实现plus(1)(2)(3)(4)等于10？
function add (n) {
    let result = n
    function fn (m) {
        result = result + m
        return fn
    };

    fn.toString = function () {
        return result;
    }
    return fn
}

// compose函数
function compose (...fn) {
    if (fn.length === 0) {
        return arg => arg
    } else if (fn.length === 1) {
        return fn[0]
    } else {
        return fn.reverse().reduce((a, b) => {
            return (...args) => {
                return b(a(...args))
            }
        })
    }
}

// 柯里化
function curry (fn, ...args) {
    return function (...arg2) {
        return fn.apply(null, [...args, ...arg2])
    }
}

// 控制请求数量,并发请求fetchWithLimit
// 实现一个批量请求函数 multiRequest(urls, maxNum)，要求如下：
// • 要求最大并发数 maxNum
// • 每当有一个请求返回，就留下一个空位，可以增加新的请求
function request (url, idx) {
    return new Promise(function (resolve, reject) {
        // console.log('pedding =>' + url)
        setTimeout(() => {
            resolve({
                res: url, 
                idx: idx
            })
        }, (6 - +url) * 1000)
    })
}
function multiRequest (urls, maxNum) {
    return new Promise(function (resolve, reject) {
        const result = []
        const n = urls.length
        let index = 0
        let down = 0
        function check () {
            if (!urls.length) return 
            const url = urls.shift()
            request(url, index).then(({res, idx}) => {
                result[idx] = res
                ++down
                if (down === n) {
                    resolve(result)
                } else {
                    check()
                }
            })
            index = index + 1
        }

        for (let i = 0; i < maxNum; i++) {
            check()
        }
    })
}

function shuffle (start, end) {
    return Math.floor(Math.random() * (end - start + 1)) + start 
}

// 模版解析
const templates = 
    '<div class="bar">' + 
        '<span>hello world</span>' + 
        '<span>hello world2</span>' + 
        '<span>' + 
            '<span id="spa">hello world</span>' + 
        '</span>' + 
    '</div>'
const vnode_temp = {
    tag: 'div',
    attrs: {},
    children: [
        {
            tag: 'span',
            props: {
                innerHTML: 'hello world'
            }
        },
        {
            tag: 'span',
            props: {
                innerHTML: 'hello world2'
            }
        },
        {
            tag: 'span',
            children: [
                {
                    tag: 'span',
                    props: {
                        id: 'spa',
                        innerHTML: 'hello world'
                    }
                }
            ]
        }
    ]
}
// https://juejin.cn/post/6970706892632883213
function renderStrToVDom (str) {
    const startTagReg = /^\<[a-zA-Z]+/
    const endTagReg = /^\<\/[a-zA-Z]+/
    let lastNode = {}, node = lastNode
    while (str) {
        if (startTagReg.test(str)) {
            const tempNode = {}
            lastNode['children'] ? lastNode.children.push(tempNode) : lastNode.children = [tempNode]
            tempNode.parent = lastNode
            const lastIdx = str.indexOf('>')
            const startTagStrs = str.substr(0, lastIdx + 1).replace(/\>/, '').replace(/\</, '')
            const [tag, ...attrs] = startTagStrs.split(' ')
            // 标签
            tempNode.tag = tag
            const attsMap = {}
            attrs.forEach(el => {
                const [key, value] = el.split('=')
                attsMap[key] = /([a-zA-Z]+)/.exec(value)[0]
            })
            tempNode.attrs = attsMap
            lastNode = tempNode
            str = str.substr(lastIdx + 1)
        } else if (endTagReg.test(str)){
            const lastIdx = str.indexOf('>')
            const endTag = str.substr(0, lastIdx + 1).replace(/\>/, '').replace(/\<\//, '')
            if (endTag === lastNode.tag) {
                const parent = lastNode.parent
                delete lastNode.parent
                lastNode = parent
                str = str.substr(lastIdx + 1)
            } else {
                console.error(endTag)
                break
            }
        } else {
            // 文本节点
            const lastIdx = str.indexOf('</')
            lastNode.attrs = {
                ...lastNode.attrs || {},
                innerHTML: str.substr(0, lastIdx)
            }
            str = str.substr(lastIdx)
        }
    }
    return node.children[0]
}

// https://q.shanyue.tech/fe/regexp/678.html
// 实现一个 render/template 函数，可以用以渲染模板
function renderTemp(template, data) {
    const reg = /\{\{(\w|\[|\]|\s|\.|\")*\}\}/g
    return template.replace(reg, function (world) {
        // 简单实现，eval有安全隐患
        // const attr = world.replace(/((\{\{) | (\s)* | (\}\}))/g, '')
        // const str =  eval(`data.${attr}`)
        // return str

        let attr = world.replace(/((\{\{) | (\s)* | (\}\}))/g, '')
        const attrResult = []
        while (/\w+/.exec(attr)) {
            attrResult.push(/\w+/.exec(attr)[0])
            attr = attr.replace(/\w+/, '')
        }
        let result = data
        attrResult.forEach(el => {
            result = result[el]
        })
        return result
    })
}

// 22 手写-setTimeout 模拟实现 setInterval
function setInterval1 (fn, timeDelay = 1000) {
    let timeId = 1
    function setTimeout1 (timeDelay) {
        if (!timeDelay) return
        timeId = setTimeout(() => {
            fn.call()
            setTimeout1(timeDelay)
        }, timeDelay)
    }
    setTimeout1(timeDelay)
    return () => {
        clearTimeout(timeId)
        timeId = null
    }
}
// const fnfff = setInterval1(() => {
//     console.log(1111)
// })