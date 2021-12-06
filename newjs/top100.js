function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
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

// 20. 有效的括号
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

// 118. 杨辉三角
// 给定一个非负整数 numRows，生成「杨辉三角」的前 numRows 行。
// 在「杨辉三角」中，每个数是它左上方和右上方的数的和。
// 输入: numRows = 5
// 输出: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
// 输入: numRows = 1
// 输出: [[1]]
/**
* @param {number} numRows
* @return {number[][]}
*/
var generate = function(numRows) {
   if (numRows === 1) return [[1]]
   if (numRows === 2) return [[1], [1, 1]]
   const result = [[1], [1, 1]]
   for (let i = 2; i < numRows; i++) {
       const rL = [1]
       for (let j = 0; j < result[i - 1].length - 1; j++) {
           rL.push(result[i - 1][j] + result[i - 1][j+1])
       }
       rL.push(1)
       result.push(rL)
   }
   return result
};

// 141. 环形链表
/**
* @param {ListNode} head
* @return {boolean}
*/
var hasCycle = function(head) {
    if (!head) return head
    let cur = head
    while (cur) {
        if (cur.linked) {
            return true
        } else {
            cur.linked = true
        }
        cur = cur.next
    }
    return false
};

// 144. 二叉树的前序遍历
/**
* @param {TreeNode} root
* @return {number[]}
*/
var preorderTraversal = function(root) {
    const result = [];
   function Traversal(root) {
       if (!root) return root

       result.push(root.val)
       Traversal(root.left)

       Traversal(root.right)
   }
   Traversal(root)
   return result
};

// 283.给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序 
// 输入: [0,1,0,3,12] 
// 输出: [1,3,12,0,0] 
// 说明: 必须在原数组上操作，不能拷贝额外的数组。 尽量减少操作次数
const moveZeroes_arr = [0,1,0,3,12]
function moveZeroes (num) {
    for (let i = 0; i < num.length; i ++) {
        for (let j = i + 1; j < num.length; j++) {
            if ((num[i] > num[j] && num[j] !== 0) || (num[i] === 0) ) {
                const temp = num[i]
                num[i] = num[j] 
                num[j] = temp
            }
        }
    }
}

// 300. 最长递增子序列
// 给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。
// 子序列是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的子序列。
// 输入：nums = [10,9,2,5,3,7,101,18]
// 输出：4
// 解释：最长递增子序列是 [2,3,7,101]，因此长度为 4 。
// 输入：nums = [0,1,0,3,2,3]
// 输出：4
// 输入：nums = [7,7,7,7,7,7,7]
// 输出：1
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
    if (nums.length < 2) return nums.length;
    const result = new Array(nums.length).fill(1)

    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                result[i] = Math.max(result[i], 1 + result[j])
            }
        }
    }
    return Math.max(...result)
};
// 判断素数
// 判断n内的素数


// 56. 合并区间
// 以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。请你合并所有重叠的区间，并返回一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间。
// 输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
// 输出：[[1,6],[8,10],[15,18]]
// 解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
// 输入：intervals = [[1,4],[4,5]]
// 输出：[[1,5]]
// 解释：区间 [1,4] 和 [4,5] 可被视为重叠区间。
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    if (intervals.length < 2) return intervals
    intervals.sort((a, b) => (a[0] - b[0]))
    let last = intervals[0]
    let result = [last]
    for (let i = 1; i < intervals.length; i++) {
        const [start, end] = intervals[i]
        if (start <= last[1]) {
            last[1] = Math.max(end, last[1])
        } else {
            last = intervals[i]
            result.push(last)
        }
    }
    return result
};

// 62. 不同路径
// 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。
// 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。
// 问总共有多少条不同的路径？
// 输入：m = 3, n = 7
// 输出：28
// 示例 2：

// 输入：m = 3, n = 2
// 输出：3
// 解释：
// 从左上角开始，总共有 3 条路径可以到达右下角。
// 1. 向右 -> 向下 -> 向下
// 2. 向下 -> 向下 -> 向右
// 3. 向下 -> 向右 -> 向下
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
    const result = []
    for (let i = 0; i < m; i++) {
        const line = []
        result.push(line)
        for (let j = 0; j < n; j++) {
            if (j === 0 || i === 0) {
                // debugger
                result[i][j] = 1
            } else {
                result[i][j] = result[i][j - 1] + result[i - 1][j]
            }
        }
    }
    return result[m-1][n-1]
};
// 2. 两数相加
// 输入：l1 = [2,4,3], l2 = [5,6,4]
// 输出：[7,0,8]
// 解释：342 + 465 = 807.
// 输入：l1 = [0], l2 = [0]
// 输出：[0]
// 输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
// 输出：[8,9,9,9,0,0,0,1]
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let head = new ListNode()
    let cur = head
    let left = 0
    while (l1 || l2) {
        const l1Val = l1 ? l1.val : 0
        const l2Val = l2 ? l2.val : 0
        let val = 0
        if (l1Val + l2Val + left >= 10) {
            val = l1Val + l2Val + left - 10
            left = 1
        } else {
            val = l1Val + l2Val + left
            left = 0
        }
        const node = new ListNode(val)
        cur.next = node
        cur = cur.next
        l1 = l1 ? l1.next : null
        l2 = l2 ? l2.next : null
    }
    if (left) cur.next = new ListNode(left)
    return head.next
};
// 7. 整数反转
// 给你一个 32 位的有符号整数 x ，返回将 x 中的数字部分反转后的结果。
// 如果反转后整数超过 32 位的有符号整数的范围 [−231,  231 − 1] ，就返回 0。
// 假设环境不允许存储 64 位整数（有符号或无符号）。
// 输入：x = 123
// 输出：321
// 输入：x = -123
// 输出：-321
// 输入：x = 120
// 输出：21
// 输入：x = 0
// 输出：0
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    
    x = (x + '')
    let flag = false
    if (~x.indexOf('-')){
         flag = true
         x = x.replace('-', '')
    }
    let result = ''
    for (let i = 0; i < x.length; i++) {
        // debugger
        result = x.charAt(i) + result
        // debugger
    }
    const r = flag ? +('-' + result) : +result
    if (r > 2 ** 31 -  1 || r < - (2 ** 31)) {
        return 0
    } else {
        return r
    }
};
// 15. 三数之和
// 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。
// 注意：答案中不可以包含重复的三元组。
// 输入：nums = [-1,0,1,2,-1,-4]
// 输出：[[-1,-1,2],[-1,0,1]]
// 输入：nums = []
// 输出：[]
// 输入：nums = [0]
// 输出：[]
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    if (nums.length < 3) return []
    nums.sort((a, b) => a - b)
    const result = []
    for (let i = 0; i < nums.length; i++) {
        let L = i + 1
        let R = nums.length - 1
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue
        }
        while (L < R) {
            if (nums[i] + nums[L] + nums[R] === 0) {
                result.push([nums[i], nums[L], nums[R]])
                while((L+1) < R && nums[L] === nums[L+1]) L++
                while(L < (R - 1) && nums[R] === nums[R-1]) R--
                L++
                R--
            } else if (nums[i] + nums[L] + nums[R] < 0 ) {
                L++
            } else if (nums[i] + nums[L] + nums[R] > 0) {
                R--
            }
        }
    }
    return result
};

// 剑指 Offer II 119. 最长连续序列
// 给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。
// 输入：nums = [100,4,200,1,3,2]
// 输出：4
// 解释：最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。
// 输入：nums = [0,3,7,2,5,8,4,6,0,1]
// 输出：9
/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function(nums) {
    if (nums.length < 2) return nums.length
    nums.sort((a, b) => a - b)
    let step = 1, last = nums[0]
    const resultStep = []
    for (let i = 1; i < nums.length; i++) {
        while(nums[i] === nums[i-1]) i++
        if (nums[i] === last + 1) {
            step ++
        } else {
            resultStep.push(step)
            step = 1
        }
        last = nums[i]
    }
    resultStep.push(step)
    return Math.max(...resultStep)
};
// 674. 最长连续递增序列
// 给定一个未经排序的整数数组，找到最长且 连续递增的子序列，并返回该序列的长度。
// 连续递增的子序列 可以由两个下标 l 和 r（l < r）确定，如果对于每个 l <= i < r，都有 nums[i] < nums[i + 1] ，那么子序列 [nums[l], nums[l + 1], ..., nums[r - 1], nums[r]] 就是连续递增子序列。
// 输入：nums = [1,3,5,4,7]
// 输出：3
// 解释：最长连续递增序列是 [1,3,5], 长度为3。
// 尽管 [1,3,5,7] 也是升序的子序列, 但它不是连续的，因为 5 和 7 在原数组里被 4 隔开。 
// 输入：nums = [2,2,2,2,2]
// 输出：1
// 解释：最长连续递增序列是 [2], 长度为1。
/**
 * @param {number[]} nums
 * @return {number}
 */
 var findLengthOfLCIS = function(nums) {
    const dp = [1]
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] > nums[i - 1]) {
            // debugger
            dp[i] = dp[i - 1] + 1
        } else {
            dp[i] = 1
        }
    }
    return Math.max(...dp)
};


/***********TODOs*********
 * 
 * 
 * 再刷几遍
 *
 * 
 ********************************/
// 55. 跳跃游戏 DONE
// 给定一个非负整数数组 nums ，你最初位于数组的 第一个下标 。
// 数组中的每个元素代表你在该位置可以跳跃的最大长度。
// 判断你是否能够到达最后一个下标。
// 输入：nums = [2,3,1,1,4]
// 输出：true
// 解释：可以先跳 1 步，从下标 0 到达下标 1, 然后再从下标 1 跳 3 步到达最后一个下标。
// 输入：nums = [3,2,1,0,4]
// 输出：false
// 解释：无论怎样，总会到达下标为 3 的位置。但该下标的最大跳跃长度是 0 ， 所以永远不可能到达最后一个下标。
/**
 * @param {number[]} nums
 * @return {boolean}
 */
 var canJump = function(nums) {
    let reach = 0
    for (let i = 0; i < nums.length; i++) {
        if (i > reach) {
            return false
        }
        reach = Math.max(nums[i] + i, reach)
    }
    return true
};

// 45. 跳跃游戏 II DONE
// 给你一个非负整数数组 nums ，你最初位于数组的第一个位置。
// 数组中的每个元素代表你在该位置可以跳跃的最大长度。
// 你的目标是使用最少的跳跃次数到达数组的最后一个位置。
// 假设你总是可以到达数组的最后一个位置。
// 输入: nums = [2,3,1,1,4]
// 输出: 2
// 解释: 跳到最后一个位置的最小跳跃数是 2。
//      从下标为 0 跳到下标为 1 的位置，跳 1 步，然后跳 3 步到达数组的最后一个位置。
// 输入: nums = [2,3,0,1,4]
// 输出: 2
/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function(nums) {
    let position = nums.length - 1;
    let steps = 0
    while (position > 0) {
        for (let i = 0; i < position; i++) {
            if ((i + nums[i]) >= position) {
                position = i
                steps ++
                break
            }
        }
    }
    return steps
};
// 35. 搜索插入位置 DONE
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
    if (target <= nums[0]) return 0
    if (target > nums[nums.length - 1]) return nums.length
    let L = 0, R = nums.length - 1
    while (L < R - 1) {
        let center = Math.ceil((R + L) / 2)
        if (nums[center] === target) {
            return center
        } else if (nums[center] > target) {
            R = center
        } else if (nums[center] < target) {
            L = center
        }
    }
    return R
 };

 // 88. 合并两个有序数组
// 输入：nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
// 输出：[1,2,2,3,5,6]
// 输入：nums1 = [1], m = 1, nums2 = [], n = 0
// 输出：[1]
// 输入：nums1 = [0], m = 0, nums2 = [1], n = 1
// 输出：[1]
// 进阶：你可以设计实现一个时间复杂度为 O(m + n) 的算法解决此问题吗？未实现
/**
* @param {number[]} nums1
* @param {number} m
* @param {number[]} nums2
* @param {number} n
* @return {void} Do not return anything, modify nums1 in-place instead.
*/
var merge = function(nums1, m, nums2, n) {
    for (let i = m; i < nums1.length; i++) {
        nums1[i] = nums2.shift()
    }
    return nums1.sort((a, b) => a - b)
};

// 136. 只出现一次的数字 DONE 位运算符
// 输入: [2,2,1]
// 输出: 1
// 输入: [4,1,2,1,2]
// 输出: 4
// 你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？
/**
* @param {number[]} nums
* @return {number}
*/
var singleNumber = function(nums) {
    let num = 0
    for (let e of nums) {
        num ^= e
    }
    return num
};

// 155. 最小栈 DONE
// 设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。
// push(x) —— 将元素 x 推入栈中。
// pop() —— 删除栈顶的元素。
// top() —— 获取栈顶元素。
// getMin() —— 检索栈中的最小元素。
var MinStack1 = function() {
    this.stack = []
    this.minStack = []
 };
 MinStack1.prototype.push = function(val) {
    if (val <= this.getMin() || !this.stack.length) {
        this.minStack.push(val)
    }
    this.stack.push(val)
 };
 MinStack1.prototype.pop = function() {
    const popR = this.stack.pop()
    if (popR === this.getMin()) {
        this.minStack.pop()
    }
    return popR
 };
 MinStack1.prototype.top = function() {
    return this.stack.length ? this.stack[this.stack.length - 1] : null;
 };
 MinStack1.prototype.getMin = function() {
    const min = this.minStack.length ? this.minStack[this.minStack.length - 1] : null
    console.log('getMin=', min)
    return min
 };

// 168. Excel表列名称 DONE
/**
* @param {number} columnNumber
* @return {string}
*/
var convertToTitle = function(columnNumber) {
    const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const statck = []
    while (columnNumber) {
        columnNumber = columnNumber - 1 < 0 ? 25 : columnNumber - 1
        const left = columnNumber % 26
        columnNumber = Math.floor(columnNumber / 26) 
        statck.push(str.charAt(left))
    }
    return statck.reverse().join('')
};

function transform2 (num) {
    const stack = []
    if (num === 0 ) return 0
    while(num) {
        const left = num % 2
        num = Math.floor(num / 2)
        stack.push(left)
    }
    return stack.reverse().join('')
}

// 108. 将有序数组转换为二叉搜索树 TODO
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function(nums) {
    const root = helper(nums, 0, nums.length - 1)
    function helper(nums, left, right) {
        if (left > right) return null;
        const mid = Math.floor((left + right) / 2)

        const root = new TreeNode(nums[mid])
        root.left = helper(nums, left, mid - 1)
        root.right = helper(nums, mid + 1, right)
        return root
    }
    return root
};

// 110. 平衡二叉树 TODO
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function(root) {
    if (!root) return true

    return Math.abs(maxDeepth(root.left) - maxDeepth(root.right)) <= 1 && isBalanced(root.left) && isBalanced(root.right)
    function maxDeepth (node) {
        if (!node) return 0

        return Math.max(maxDeepth(node.left), maxDeepth(node.right)) + 1
    }
};
// 111. 二叉树的最小深度 TODO
/**
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function(root) {
    if (!root) return 0;

    if (!root.left || !root.right) return 1
    let min = -Infinity
    if (root.left) {
        min = Math.min(minDepth(root.left), min)
    }
    if (root.right) {
        min = Math.min(minDepth(root.right), min)
    }

    return min + 1
};

// 112. 路径总和 DONE
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function(root, targetSum) {
    if (!root) return false

    if (!root.left && !root.right) return targetSum === root.val

    return hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val)
};

// 21. 合并两个有序链表 DONE
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
 var mergeTwoLists = function(list1, list2) {
    const head = new ListNode()
    let cur = head
    while (list1 && list2) {
        if (list1.val < list2.val) {
            cur.next = list1
            list1 = list1.next
            cur = cur.next
        } else {
            cur.next = list2
            list2 = list2.next
            cur = cur.next
        }
    }
    cur.next = list1 || list2
    return head.next
};
// [1,2,4]
// [1,3,4]

// const list2 = new ListNode(1)
// list2.next = new ListNode(3)
// list2.next.next = new ListNode(4)
// console.log(mergeTwoLists(list1, list2))

// 160. 相交链表 DONE
/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
 var getIntersectionNode = function(headA, headB) {
     const set = new Set();
     let temp = headA
     while (temp) {
        set.add(temp)
        temp = temp.next
     }
     temp = headB
     while (temp) {
        if (set.has(temp)) {
            return temp
        }
        temp = temp.next
     }
     return null
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
    const stack = []
    const result = []
    while (!stack.length || root) {
        while (root) {
            stack.unshift(root)
            root = root.left
        }
        const item = stack.pop()
        result.push(item.val)
        root = root.right
    }
    return result
};

// 121. 买卖股票的最佳时机 TODO 超时
// 给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。
// 你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润。
// 返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0 。

// 输入：[7,1,5,3,6,4]
// 输出：5
// 解释：在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
//      注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。

// 输入：prices = [7,6,4,3,1]
// 输出：0
// 解释：在这种情况下, 没有交易完成, 所以最大利润为 0。
/**
* @param {number[]} prices
* @return {number}
*/
var maxProfit = function(prices) {
    // 超时
    // 需要降低到O(n)
    let result = 0
    for (let i = 0; i < prices.length - 1; i++) {
        
        for (let j = i + 1; j < prices.length; j++) {
            if (prices[j] > prices[i]) {
                result = Math.max((prices[j] - prices[i]), result)
            }
        }
    }
    return result
 };

 // 83. 删除排序链表中的重复元素 DONE
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function(head) {
    if (!head) return head
    let pre = head
    let cur = head.next
    while (cur) {
        if (cur.val === pre.val) {
            cur = cur.next
        } else {
            pre.next = cur
            pre = pre.next
        }
    }
    pre.next = cur
    return head
};

// 101. 对称二叉树 DONE
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root) {

    function check (left, right) {
        if (!left && !right) return true
        if (!left || !right) return false

        return left.val === right.val && check(left.left, right.right) && check(left.right, right.left)
    }

    return check(root, root)
};



// 102. 二叉树的层序遍历
// 给你一个二叉树，请你返回其按 层序遍历 得到的节点值。 （即逐层地，从左到右访问所有节点）。
// 二叉树：[3,9,20,null,null,15,7],
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
 var levelOrder = function(root) {
    if (!root) return []

    let result = [root]
    const resultVal = []
    while (result.length) {
        const res = result.slice()
        const temp = []
        const leftRoot = []
        while (res.length) {
            const item = res.pop()
            if (item) {
                temp.push(item.val)
                if (item.left) leftRoot.unshift(item.left)
                if (item.right) leftRoot.unshift(item.right)
            }
        }
        result = leftRoot

        resultVal.push(temp)
    }
    return resultVal
};