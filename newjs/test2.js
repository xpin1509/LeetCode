const rootTreeTempalte = {
    val: "A",
    left: {
      val: "B",
      left: {
        val: "D",
        left: null,
        right: null
      },
      right: {
        val: "E",
        left: null,
        right: null
      }
    },
    right: {
      val: "C",
      left: null,
      right: {
        val: "F",
        left: null,
        right: null
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

// 二叉树公共祖先 
// https://juejin.cn/book/6844733800300150797/section/6844733800375648264
var lowestCommonAncestor = function(root, p, q) {
    const parent = new Map(); 
    const visited = new Set();
    function dfs (root) {
        if (root.left !== null) {
            parent.set(root.left.val, root)
            dfs(root.left)
        }
        if (root.right !== null) {
            parent.set(root.right.val, root)
            dfs(root.right)
        }
    }

    dfs(root)

    while (p !== null) {
        visited.add(p.val);
        p = parent.get(p.val);
    }
    while (q != null) {
        if (visited.has(q.val)) {
            return q;
        }
        q = parent.get(q.val);
    }
    return null;
};

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

// 柯里化
// 第一版
// function sub_curry(fn) {
//     var args = [].slice.call(arguments, 1);
//     return function() {
//         return fn.apply(this, args.concat([].slice.call(arguments)));
//     };
// }
// 第二版
// function curry11(fn, ...arg1) {
//     return function(...arg2) {
//         const arg = [...arg1, ...arg2]
//         if (arg.length < fn.length) {
//             return curry11(fn, ...arg);
//         } else {
//             return fn.apply(this, arg);
//         }
//     };
// }
// var fn = curry11(function(a, b, c) {
//     return a+b+c
// });
// console.log(fn(1)(2)(3))
 // ["a", "b", "c"]
// 第三版
// var curry11 = fn =>
//     judge = (...args) =>
//         args.length === fn.length
//             ? fn(...args)
//             : (arg) => judge(...args, arg)

// 遍历的迭代实现 https://juejin.cn/book/6844733800300150797/section/6844733800363065352
// 中序遍历
var inorderTraversal = function(root) {
    const stack = []
    const result = []
    while (root || stack.length) {
        while (root) {
            stack.push(root)
            root = root.left
        }
        root = stack.pop()
        if (root) {
            result.push(root.val)
            root = root.right
        }
    }
    return result
};
// 先序遍历
var inorderTraversal2 = function(root) {
    const stack = [root]
    const result = []
    while (stack.length) {
        root = stack.pop(root)
        result.push(root.val)

        if (root.right) {
            stack.push(root.right)
        }
        if (root.left) {
            stack.push(root.left)
        }
    }
    return result
};
var inorderTraversal3 = function(root) {
    const stack = [root]
    const result = []
    while (stack.length) {
        root = stack.pop(root)
        result.push(root.val)

        if (root.left) {
            stack.push(root.left)
        }
        if (root.right) {
            stack.push(root.right)
        }
    }
    return result.reverse
};


// 二叉树的前中后序遍历，迭代
// rootTreeTempalte
// 前序遍历
function prologueTraversal (root) {
    const stack = [];
    const result = []
    stack.push(root)
    while (stack.length) {

        root = stack.pop()
        if (!root) continue

        result.push(root.val)

        stack.push(root.right)

        stack.push(root.left)
    }
    return result
}
// 后序遍历
function postSequenceTraversal (root) {
    const stack = []
    const result = []
    stack.push(root)
    while (stack.length) {
        root = stack.pop()
        if (!root) continue

        result.push(root.val)
        stack.push(root.left)
        stack.push(root.right)
    }
    return result.reverse()
}
function middleOrderTraversal (root) {
    const stack = []
    const result = []
    while (stack.length || root) {
        while (root) {
            stack.push(root)
            root = root.left
        }

        root = stack.pop()
        if (!root) continue

        result.push(root.val)
        root = root.right
    }
    return result
}


// 11. 盛最多水的容器
/**
 * @param {number[]} height
 * @return {number}
 */
 var maxArea = function(height) {
    let L = 0, R = height.length - 1
    let Max = 0
    while (L < R) {
        const high = Math.min(height[L], height[R])
        Max = Math.max(Max, high * (R - L))
        if (height[L] > height[R]) {
            R--
        } else if (height[L] < height[R]) {
            L++
        } else {
            L++
            R--
        }
    }
    return Max
 }

 // 53. 最大子数组和 
var maxSubArray = function(nums) {
    const result = [nums[0]]
    for (let i = 1; i < nums.length; i++) {
        result[i] = Math.max(result[i - 1] + nums[i], nums[i])
    }
    return Math.max(...result)
}

// 剑指 Offer II 119. 最长连续序列
// 可以设计并实现时间复杂度为 O(n) 的解决方案吗？
var longestConsecutive = function(nums) {
    if (!nums.length) return []
    nums.sort((a, b) => a - b)
    let length = 1
    let max = 1
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] === nums[i - 1]) continue
        if (nums[i] === nums[i-1] + 1) {
            length ++
        } else {
            max = Math.max(length, max) 
            length = 1
        }
    }
    return Math.max(max, length) 
};
// 674. 最长连续递增序列
var findLengthOfLCIS = function(nums) {
    if (nums.length === 1) return 1
    let lastMax = 1
    let length = 1
    for (let i = 1; i < nums.length - 1; i++) {
        if (nums[i] > nums[i - 1]) {
            length++
        } else {
            lastMax = Math.max(length, lastMax)
            length = 1
        }
    }
    return Math.max(lastMax, length)
};
// 1800. 最大升序子数组和
var maxAscendingSum = function(nums) {
    let maxAscendingSum = nums[0]
    let curSum = nums[0]
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] > nums[i - 1]) {
            curSum = nums[i] + curSum
        } else {
            maxAscendingSum = Math.max(maxAscendingSum, curSum)
            curSum = nums[i]
        }
    }
    return Math.max(maxAscendingSum, curSum)
};
// 3.三数求和问题
// 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。
// 给定数组 nums = [-1, 0, 1, 2, -1, -4]， 满足要求的三元组集合为： [ [-1, 0, 1], [-1, -1, 2] ]
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    if (nums.length < 3) return [];
    nums = nums.sort((a, b) => a - b)
    const result = []
    for (var i = 0; i < nums.length - 2; i++) {
        if (nums[0] > 0) break;
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue
        }
        let L = i + 1, R = nums.length - 1
        while (L < R ) {
            const sum = nums[i] + nums[L] + nums[R]
            if (sum === 0) {
                result.push([nums[i], nums[L], nums[R]])
                while (L + 1 < R && nums[L+ 1] === nums[L]) { L ++ }
                while (L < R - 1 && nums[R - 1] === nums[R]) { R -- }
                L++; R--
            } else if (sum < 0) {
                while (L + 1 < R && nums[L+ 1] === nums[L]) { L ++ }
                L++
            } else if (sum > 0) {
                while (L < R - 1 && nums[R - 1] === nums[R]) { R -- }
                R--
            }
        }
    }
    return result
}
// 108. 将有序数组转换为二叉搜索树 TODO
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
 var sortedArrayToBST = function(nums) {
    function helper (nums, L, R) {
        if (R > L) return null
        const mid = Math.floor((L + R) / 2)
        const root = new TreeNode(nums[mid])

        root.left = helper(nums, L, mid - 1)
        root.right = helper(nums, mid + 1, R)
        return root
    }
    return helper(nums, 0, nums.length - 1)
}
// 平衡二叉树
var isBalanced = function(root) {
    if (!root) return true

    return Math.abs(maxDepth(root.left) - maxDepth(root.right)) <= 1 && isBalanced(root.left) && isBalanced(root.right)

    function maxDepth (root) {
        if (!root) return 0

        return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
    }
};
// 路径总和
var hasPathSum = function(root, targetSum) {
    if (!root) return false

    if (!root.left && !root.right) return root.val === targetSum

    return hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val)
};
// 对称二叉树
var isSymmetric = function(root) {
    if (!root) return true
    function helper (left, right) {
        if (!left && !right) return true
        if (!left || !right) return false

        return left.val === right.val && helper(left.left, right.right) && helper(left.right, right.left)
    }

    return helper(root.left, root.right)
}

// 最小硬币找零
function minCoinChange (coins, amount) {
    const makeChange = (value) => {
        let min = []
        if (value < 0) return min
        for (let i = 0; i < coins.length; i++) {
            const coin = coins[i]
            if (value - coin >= 0) {
                const newMin = makeChange(value - coin)
                if (!min.length || newMin.length < min.length) {
                    min = newMin.concat(coin)
                }
            }
            
        }
        return min
    }

    return makeChange(amount)
}
// 反转链表
var reverseList = function(head) {
    let cur = head
    let pre = null
    while (cur) {
        const temp = cur.next
        cur.next = pre
        
        pre = cur
        cur = temp
    }
    return pre
};

/**
 * 
 * TODO 下面的再做几遍
 * @returns 
 */
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

// 55. 跳跃游戏 TODO
var canJump = function(nums) {
    let reach = 0
    for (let i = 0; i < nums.length; i++) {
        if (i > reach) {
            return false
        }
        reach = Math.max(reach, nums[i] + i)
    }
    return true
};

// 45. 跳跃游戏 II TODO

// 合并两个有序链表 TODO
var mergeTwoLists = function(list1, list2) {
    const pre = new ListNode()
    let cur = pre

    while (list1 && list2) {
        if (list1.val > list2.val) {
            cur.next = list2
            list2 = list2.next
        } else {
            cur.next = list1
            list1 = list1.next
        }
        cur = cur.next
    }

    cur.next = list1 || list2
    
    return pre.next
};
// const l1 = new ListNode(1)
// l1.next = new ListNode(2)
// l1.next.next = new ListNode(3)
// l1.next.next.next = new ListNode(14)
// l1.next.next.next.next = null

// const l2 = new ListNode(1)
// l2.next = new ListNode(3)
// l2.next.next = new ListNode(4)
// console.log(mergeTwoLists(l1, l2))


// 128. 最长连续序列 TODO
// 请你设计并实现时间复杂度为 O(n) 的算法解决此问题。
var longestConsecutive = function(nums) {
    const set = new Set()
    for (num in nums) {
        set.add(num)
    }
    let length = 0
    
    for (let item of set) {
        if (!set.has(item - 1)) {
            let currentNum = item
            let currentStreak = 1;

            while (set.has(currentNum + 1)) {
                currentStreak++
                currentNum ++
            }
            length = Math.max(length, currentStreak)
        }
    }
    return length
};
// 83. 删除排序链表中的重复元素 TODO 一些次数
// 输入: 1->1->2
// 输出: 1->2
// 示例 2:
// 输入: 1->1->2->3->3
// 输出: 1->2->3
var deleteDuplicates = function(head) {
    if (!head) return head

    let cur = head
    while (cur.next) {
        if (cur.val === cur.next.val) {
            cur.next = cur.next.next
        } else {
            cur = cur.next
        }
    }
    return head
};

// 1 3 6 4 2
// 下一个排列 TODO 一些次数
var nextPermutation1 = function(nums) {
    if (nums.length < 2) return nums
    let i = nums.length - 2
    while (i>= 0 && nums[i] >= nums[i+1]) {
        i--
    }
    if (i >= 0) {
        let j = nums.length - 1
        while (j >= 0 && nums[i] >= nums[j]) {
            j --
        }
        [nums[i], nums[j]] = [nums[j], nums[i]]
    }
    function reverse (nums, l, r) {
        while (l < r) {
            [nums[l], nums[r]] = [nums[r], nums[l]]
            l++
            r--
        }
    }
    reverse(nums, i + 1, nums.length - 1)
    return nums
};

// 有时间就写一下吧
// 买卖股票简单题
// “接雨水”问题 // https://juejin.cn/book/6844733800300150797/section/6844733800375648269
// 链表题：反转链表，合并两个有序链表，链表节点的删除重复，删除倒数第N个节点，// 局部反转链表，判断环形链表，返回环的起点
// promise
// 并发请求限制
// compose