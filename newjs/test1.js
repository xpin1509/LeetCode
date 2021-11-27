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
function listToTree (data) {
    for (let i = 0; i < data.length; i ++) {
        for (let j = 0; j < data.length; j++) {
            if (data[i].parentId === data[j].id) {
                data[j].child ? data[j].child.push(data[i]) : (data[j].child = [data[i]])
            }
        }
    }
    return data.filter(el => el.parentId === null)
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
// 1. 两数之和
// 输入：nums = [2,7,11,15], target = 9
// 输出：[0,1]
// 解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
// 输入：nums = [3,2,4], target = 6
// 输出：[1,2]
// 输入：nums = [3,3], target = 6
// 输出：[0,1]
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
 var twoSum1 = function(nums, target) {
     const map = {};
    for (var i = 0; i < nums.length; i++) {
        if (map[nums[i]] != null) {
            return [map[nums[i]], i]
        } else {
            map[target - nums[i]] = i
        }
    }
};

// 9. 回文数
// 输入：x = 121
// 输出：true
// 输入：x = -121
// 输出：false
// 输入：x = 10
// 输出：false
// 输入：x = -101
// 输出：false
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    x = x + ''
    let L = 0, R = (x).length - 1
    while (L < R) {
        if (x.charAt(L) === x.charAt(R)) {
            L++;
            R--
        } else {
            return false
        }
    }
    return true
};

// 26. 删除有序数组中的重复项
// 输入：nums = [1,1,2]
// 输出：2, nums = [1,2]
// 输入：nums = [0,0,1,1,1,2,2,3,3,4]
// 输出：5, nums = [0,1,2,3,4]
/**
 * @param {number[]} nums
 * @return {number}
 */
 var removeDuplicates = function(nums) {
    let last = nums[0]
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] === last) {
            nums.splice(i--, 1)
        } else {
            last = nums[i]
        }
    }
    return nums.length
};

// 27. 移除元素
// 输入：nums = [3,2,2,3], val = 3
// 输出：2, nums = [2,2]
// 输入：nums = [0,1,2,2,3,0,4,2], val = 2
// 输出：5, nums = [0,1,4,0,3]
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
 var removeElement = function(nums, val) {
    for (let i = 0; i < nums.length; i ++) {
        if (nums[i] === val) {
            nums.splice(i, 1)
            i--
        }
    }
};


// 28. 实现 strStr()
// 输入：haystack = "hello", needle = "ll"
// 输出：2
// 输入：haystack = "aaaaa", needle = "bba"
// 输出：-1
// 输入：haystack = "", needle = ""
// 输出：0
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
 var strStr = function(haystack, needle) {
    return haystack.indexOf(needle)
};

// 35. 搜索插入位置 TODO
// 请必须使用时间复杂度为 O(log n) 的算法
// 输入: nums = [1,3,5,6], target = 5
// 输出: 2
// 输入: nums = [1,3,5,6], target = 2
// 输出: 1
// 输入: nums = [1,3,5,6], target = 7
// 输出: 4
// 输入: nums = [1,3,5,6], target = 0
// 输出: 0
// 输入: nums = [1], target = 0
// 输出: 0
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
    let L = 0, R = nums.length - 1
    while (L < R) {
        // let 
    }
};


// 58. 最后一个单词的长度
// 输入：s = "Hello World"
// 输出：5
// 输入：s = "   fly me   to   the moon  "
// 输出：4
// 示例 3：
/**
 * @param {string} s
 * @return {number}
 */
 var lengthOfLastWord = function(s) {
    return (s.match(/(\w)+/g) || []).pop().length
};

// 66. 加一
// 输入：digits = [1,2,3]
// 输出：[1,2,4]
// 解释：输入数组表示数字 123。
// 输入：digits = [4,3,2,1]
// 输出：[4,3,2,2]
// 解释：输入数组表示数字 4321。
// 输入：digits = [0]
// 输出：[1]
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
    let tenNum = 1
    let i = digits.length - 1
    while (i >= 0) {
        if (digits[i] + tenNum > 9) {
            digits[i] = digits[i] + tenNum - 10
            tenNum = 1
        } else {
            digits[i] = digits[i] + tenNum
            tenNum = 0
        }
        i--
    }
    if (tenNum) digits.unshift(tenNum)
    return digits
};

// 67. 二进制求和
// 给你两个二进制字符串，返回它们的和（用二进制表示）。
// 输入为 非空 字符串且只包含数字 1 和 0。
// 输入: a = "11", b = "1"
// 输出: "100"
// 输入: a = "1010", b = "1011"
// 输出: "10101"
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
 var addBinary = function(a, b) {
     a = a.split('')
     b = b.split('')
     const result = []
     let last = 0
    while (a.length || b.length) {
        const aL = a.pop() || 0
        const bL = b.pop() || 0
        const sum = (+aL) + (+bL) + last
        if (sum > 1) {
            result.unshift(sum - 2)
            last = 1
        } else {
            result.unshift(sum)
            last = 0
        }
    }
    if (last) result.unshift(last)
    return result.join('')
};

// 69. Sqrt(x)
// 输入：x = 4
// 输出：2
// 示例 2：
// 输入：x = 8
// 输出：2
/**
 * @param {number} x
 * @return {number}
 */
 var mySqrt = function(x) {
    let i = 0, last = 0
    while (i <= x) {
        if (i * i > x) {
            break
        }
        last = i
        i++
    }
    return last
};

// 70. 爬楼梯
// 输入： 2
// 输出： 2
// 输入： 3
// 输出： 3
/**
 * @param {number} n
 * @return {number}
 */
 var climbStairs = function(n) {
     const result = [1, 2, 3]
     for (let i = 3; i < n; i++) {
        result[i] = result[i -1] + result[i-2]
     }
     return result[n-1]
};


// 125. 验证回文串
// 给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。

// 说明：本题中，我们将空字符串定义为有效的回文串。

var isPalindrome = function(x) {
    x = (x.match(/[a-zA-Z0-9]/g) || []).join('').toLowerCase()
let L = 0, R = (x).length - 1
    while (L < R) {
        if (x.charAt(L) === x.charAt(R)) {
            L++;
            R--
        } else {
            return false
        }
    }
    return true
};

// 20. 有效的括号
// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。
// 有效字符串需满足：
// 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。
// 输入：s = "()"
// 输出：true
// 输入：s = "()[]{}"
// 输出：true
// 输入：s = "(]"
// 输出：false
// 输入：s = "([)]"
// 输出：false
// 输入：s = "{[]}"
// 输出：true

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    const left = {
        '{': 1,
        '(': 1,
        '[': 1
    }
    const map = {
        '}': '{',
        ')': '(',
        ']': '['
    }
    const stack = []
    for (let i = 0; i < s.length; i++) {
        const cur = s.charAt(i)
        // debugger
        if (left[cur]) {
            stack.push(cur)
        } else {
            const lastleft = stack.pop()
            if (map[cur] !== lastleft) {
                return false
            }
        }
    }
    return stack.length ? false : true
};

// 88. 合并两个有序数组 TODO
// 输入：nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
// 输出：[1,2,2,3,5,6]
// 输入：nums1 = [1], m = 1, nums2 = [], n = 0
// 输出：[1]
// 输入：nums1 = [0], m = 0, nums2 = [1], n = 1
// 输出：[1]
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {

};

// 94. 二叉树的中序遍历 TODO
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
 var inorderTraversal = function(root) {

};

// 100. 相同的树
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
 var isSameTree = function(p, q) {
     if (!p && !q) return true;
    if (!p || !q) return false;

    if (p.val !== q.val) return false

    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
};