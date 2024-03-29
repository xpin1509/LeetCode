// 算法与数据结构

// 1.数据结构
// 数组 在内存中可以是连续的
// 栈 特别的数组 后进先出(LIFO，Last In First Out)
// 队列 特别的数组 先进先出（FIFO，First In First Out）
// 链表 在内存中可以是离散的
// 树
// 所有遍历函数的入参都是树的根结点对象

function DFS(root) {
    // 递归边界，root 为空
    if (!root) {
        return
    }

    // 递归遍历左子树 
    preorder(root.left)
    // 递归遍历右子树  
    preorder(root.right)
    // 输出当前遍历的结点值
    console.log('当前遍历的结点值是：', root.val)
}

function BFS(root) {
    const queue = [] // 初始化队列queue
    // 根结点首先入队
    queue.push(root)
    // 队列不为空，说明没有遍历完全
    while (queue.length) {
        const top = queue[0] // 取出队头元素  
        // 访问 top
        console.log(top.val)
        // 如果左子树存在，左子树入队
        if (top.left) {
            queue.push(top.left)
        }
        // 如果右子树存在，右子树入队
        if (top.right) {
            queue.push(top.right)
        }
        queue.shift() // 访问完毕，队头元素出队
    }
}

const root = {
    val: "A",
    left: {
        val: "B",
        left: {
            val: "D"
        },
        right: {
            val: "E"
        }
    },
    right: {
        val: "C",
        right: {
            val: "F"
        }
    }
}

// var toLocaleLowerCase = function(x) { return x.toLocaleLowerCase(); };
// var toUpperCase = function(x) { return x.toUpperCase(); };
// var exclaim = function(x) { return x + '!'; };
// var shout = compose(exclaim, toUpperCase, toLocaleLowerCase);

function compose (...fnList) {
    if (!fnList.length) return arg => arg

    if (fnList.length === 1) return fnList[0]
    return fnList.reduce((composed, cur) => {
        return function (...arg) {
            return composed(cur(...arg))
        }
    })
}

// 1.正则转化 '3.26/2021' => '2021-3-26'
function dateFormate (str) {
    return str.replace(/(\d+)\.(\d+)\/(\d+)/, '$3-$1-$2')
}


// [1,2,3]全排列
// 实现一个方法，给定任意一个数组，返回它的全排
function allSort (arr) {

    const result = []

    function m (hased, left) {
        if (hased.length === arr.length) {
            result.push([...hased])
            return
        }
        for (let i = 0; i < left.length; i++) {
            const item = left[i]
            const leftArr = left.filter(el => el !== left[i])
            m([...hased, item], [...leftArr])
        }
    }
    m([], arr)
    return result
}


// reduce手写
Array.prototype.myReduce = function (fn, initialState) {
    const arr = this
    const len = arr.length
    let result = initialState
    for (let i = 0; i < len; i++) {
        result = fn(result, arr[i])
    }
    return result
}


function curry1 (fn) {
    const arg = [].slice.call(arguments, 1)
    return function () {
        const leftArg = [].slice.call(arguments)
        return fn.apply(this, arg.concat(leftArg))
    }
}


// add(1)(2)
function curry2 (fn) {
    var len = fn.length
    return function reply () {
        var innerLength = arguments.length
        var args = [].slice.call(arguments)

        if (innerLength >= len) {
            return fn.apply(undefined, args)
        } else {
            return function () {
                var innerArgs = [].slice.call(arguments)
                var allArgs = args.concat(innerArgs)

                return reply.apply(undefined, allArgs)
            }
        }
    }
}


function add (init) {
    let total = 0
    function _add (arg) {
        total = arg + total
        return _add
    }

    _add.toString = function () {
        return total
    }

    return _add(init)
}
// add(1)(2)(3)


function diff (arr1, arr2) {
    const map = new Map()
    for (let i of arr1) {
        if (Array.isArray(i)) {
            const arr = [...new Set(i)] //.sort((a, b) => a - b)
            map.set(arr.join(','), i)
        } else {
            map.set(i, i)
        }
    }
    for (let i of arr2) {
        let key = i
        if (Array.isArray(i)) {
            const arr = [...new Set(i)] //.sort((a, b) => a - b)
            key = arr.join(',')
        }
        if (map.has(key)) {
            map.delete(key)
        } else {
            map.set(key, i)
        }
    }

    const result = []
    for (let key of map.keys()) {
        const item = map.get(key)
        result.push(item)
    }
    return result
  }
  
//   console.log(diff([1,2],[2,1]));

//   console.log(diff([1,2,1],[2,1,1,2])); //=>[]

//   console.log(diff([1, [2,3], 4], [[1,2], [2,3], 3, 4]));
  
//   console.log(diff([[1,2,3],[3,2,1],1,2,3], [2,3,1])); // => [[1,2,3],[3,2,1]]
  

