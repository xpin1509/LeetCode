const rootTreeTempalte = {
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
  };

// 递归
function traverse () {
    const result = []
    function traverseRoot(root) {
        // 递归边界，root 为空
        if(!root) {
            return 
        }
        // 递归遍历左子树 
        traverseRoot(root.left)  
        // 递归遍历右子树  
        traverseRoot(root.right)
        // 输出当前遍历的结点值
        result.push(root.val) 
    }
    traverseRoot(rootTreeTempalte)
    return result
}
// ['A', 'B', 'D', 'C', 'E', 'F']
// ['D', 'B', 'E', 'A', 'C', 'F']
// ['D', 'E', 'B', 'F', 'C', 'A']

// 迭代遍历
// 前序遍历
function preorder1 (root) {
    const result = []
}
// 中序遍历
function inorder1 (root) {
    const result = []
}
// 后序遍历
function afterorder1 (root) {
    const result = []
}

// ========================开始========================

// 编程开始================
// 29 手写-字符串最长的不重复子串
// 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。
// 输入: s = "abcabcbb"
// 输出: 3
// 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
// 输入: s = "bbbbb"
// 输出: 1
// 解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
// 输入: s = "pwwkew"
// 输出: 3
// 输入: s = ""
// 输出: 0
var lengthOfLongestSubstring = function(s) {
    let res = 0
    for (let i = 0; i < s.length; i++) {
        const map = {
            [s.charAt(i)]: 1
        }
        let start = 1
        for (let j = i + 1; j < s.length; j++) {
            if (!map[s.charAt(j)]) {
                start++
                map[s.charAt(j)] = 1
            } else {
                break
            }
        }
        res = Math.max(res, start)
    }
    return res
};

// 手写-如何找到数组中第一个没出现的最小正整数 怎么优化（字节）
// 给你一个未排序的整数数组 nums ，请你找出其中没有出现的最小的正整数。
// 请你实现时间复杂度为 O(n) 并且只使用常数级别额外空间的解决方案。
// 输入：nums = [1,2,0]
// 输出：3
// 输入：nums = [3,4,-1,1]
// 输出：2
// 输入：nums = [7,8,9,11,12]
// 输出：1
/**
 * @param {number[]} nums
 * @return {number}
 */
 var firstMissingPositive = function(nums) {
    let max = null
    const map = {}
    for (let i = 0; i < nums.length; i++) {
        max = nums[i] > max ? nums[i] : max
        map[nums[i]] = 1
    }
    if (max === null) return 1

    for (let i = 1; i <= max + 1; i++) {
        if (!map[i]) return i
    }
};

// 题目描述：给定一组不含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。
// 说明：解集不能包含重复的子集。
// 示例: 输入: nums = [1,2,3]
// 输出:
// [
// [3],
// [1],
// [2],
// [1,2,3],
// [1,3],
// [2,3],
// [1,2],
// []
// ]
var subsets = function(nums) {
    const result = [[]];
    function combin (has, left) {
        if (has.length) {
            result.push([...has])
        }
        if (!left.length) return
        
        for (let i = 0; i < left.length; i++) {
            const tmpLeft = [...left.slice(i+1)]
            combin([...has, left[i]], tmpLeft)
        }
    }
    combin([], nums)
    return result
};


// 正则表达式 ip地址
// [1-255].[0-255].[0-255].[0-255]
const regIp = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/

// 扁平化obj
const flatten_obj = {
    a: {
        b: 1,
        c: 2,
        d: {e: 5}
    },
    b: [1, 3, {a: 2, b: 3}],
    c: 3
   }

function flatten(obj) {
    const map = {}
    function getKey (res, key) {
        if (/\d+/.test(key)) {
            return `${res}[${key}]`
        } else {
            if (res) {
                return `${res}.${key}`
            } else {
                return `${key}`
            }
        }
    }
    function df (obj, res) {
        for (let i in obj) {
            const key = getKey(res, i)
            if (typeof obj[i] !== 'object') {
                map[key] = obj[i]
            } else {
                df(obj[i], key)
            }
        }
    }
    df(obj, '')
    return map
}
   
// {
//  'a.b': 1,
//  'a.c': 2,
//  'a.d.e': 5,
//  'b[0]': 1,
//  'b[1]': 3,
//  'b[2].a': 2,
//  'b[2].b': 3
//   c: 3
// }


// 栈和队列：最小栈，如何用栈实现一个对列
class MinStack {
    constructor () {
        this.stack = []; 
        this.minStack = []
    }
    push (item) {
        if (item <= this.getMin()) {
            this.minStack.push(item)
        }
        this.stack.push()
    }
    pop () {
        const item = this.stack.pop()
        if (this.getMin() === item) {
            this.minStack.pop()
        }
        return item
    }
    top () {
        if (!this.stack.length) return null
        return this.stack[this.stack.length - 1]
    }
    getMin () {
        if (!this.minStack.length) return null
        return this.minStack[this.minStack.length - 1]
    }
}


// 反转二叉树
function reverseRoot (root) {
    if (!root) return null;

    const left = reverseRoot(root.left)
    const right = reverseRoot (root.right)

    root.left = right
    root.right = left
    return root
}

class Queue {
    constructor () {
        this.stack1 = new MinStack()
        this.stack2 = new MinStack()
    }
    push (item) {
        this.stack1.push(item)
    }
    shift () {
        if (!this.stack2.empty()) {
            return this.stack2.pop()
        }
        while (!this.stack1.empty()) {
            const item = this.stack1.pop()
            this.stack2.push(item)
        }
        return this.stack2.pop()
    }
    top () {
        if (!this.stack2.empty()) {
            return this.stack2.top()
        }
        while (!this.stack1.empty()) {
            const item = this.stack1.pop()
            this.stack2.push(item)
        }
        return this.stack2.top()
    }
}

// 239. 滑动窗口最大值
// 题目描述：给定一个数组 nums 和滑动窗口的大小 k，请找出所有滑动窗口里的最大值。
// 输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3 输出: [3,3,5,5,6,7]
var maxSlidingWindow = function(nums, k) {
    // 超时
    // function getMax (arr) {
    //     let mx = arr[0]
    //     for (let el of arr) {
    //         if (el > mx) {
    //             mx = el
    //         }
    //     }
    //     return mx
    // }
    // const result = [getMax(nums.slice(0, k))]
    // for (let i = 1; i <= nums.length - k; i++) {
    //     const max = result[result.length - 1]
    //     const enter = nums[i+k-1]
    //     const leave = nums[i-1]
    //     if (enter > leave) {
    //         result.push(Math.max(enter, max))
    //     } else {
    //         result.push(getMax(nums.slice(i, k + i)))
    //     }
    // }
    // return result
};
// console.log(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3))


// 栈和队列：// 如何用栈实现一个对列 最小栈，
// 链表题：反转链表，合并两个有序链表，链表节点的删除重复，删除倒数第N个节点，局部反转链表， // 判断环形链表，返回环的起点
// 二叉树：最小深度，二叉搜索树，DFS（迭代法），BFS，层序遍历，二叉搜索树，平衡二叉树的判断 // 最大深度 反转二叉树，
// 动态规划：最少硬币数
// 数组：三数之和
// 最长上升子序列模型 ...
// 滑动窗口：滑动窗口问题
// 函数柯里化实现
// promise
// 并发请求限制
// 千分位
// compose
// test1的DONE 和algorithms所有
// 遍历的迭代实现 https://juejin.cn/book/6844733800300150797/section/6844733800363065352


// 真题描述：给你一个包含 n 个整数的数组 nums，
// 判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？
// 请你找出所有满足条件且不重复的三元组。


// 二叉树公共祖先 
// https://juejin.cn/book/6844733800300150797/section/6844733800375648264

// 寻找两个正序数组的中位数
// nums1 = [1, 3]
// nums2 = [2]
// 则中位数是 2.0

// nums1 = [1, 2]
// nums2 = [3, 4]
// 则中位数是 (2 + 3)/2 = 2.5

function getMidNum (left, right) {
    const arr = [].concat(left, right).sort((a, b) => a - b)
    const midS = (arr.length - 1) / 2
    if (midS % 2 === 0) {
        return arr[midS]
    } else {
        return (arr[Math.ceil(midS)] + arr[Math.floor(midS)]) / 2
    }
}

// 反转局部链表
// https://juejin.cn/book/6844733800300150797/section/6844733800375648269

// “接雨水”问题