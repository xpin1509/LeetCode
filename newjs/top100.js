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

// 55. 跳跃游戏
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

// 45. 跳跃游戏 II
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
// 给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。
// 请你将两个数相加，并以相同形式返回一个表示和的链表。
// 你可以假设除了数字 0 之外，这两个数都不会以 0 开头。
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
        // debugger
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
    // debugger
    return Math.max(...dp)
};
// 121. 买卖股票的最佳时机
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

// 控制请求数量,并发请求fetchWithLimit
// 模版解析
// 背包问题
// ---------今日洗完----------
// 实现一个二叉搜索树转链表的方法 ？中序遍历
// 堆，图的最小路经