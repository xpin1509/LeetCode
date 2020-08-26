// 118. 杨辉三角
// 给定一个非负整数 numRows，生成杨辉三角的前 numRows 行。
// 在杨辉三角中，每个数是它左上方和右上方的数的和。

// 输入: 5
// 输出:
// [
//      [1],
//     [1,1],
//    [1,2,1],
//   [1,3,3,1],
//  [1,4,6,4,1]
// ]
/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function(numRows) {
    const arr = [[1], [1, 1]]
    if (numRows <= 2) return arr.slice(0, numRows)
    while(arr.length <= numRows - 1) {
        const curArr = arr[arr.length - 1]
        const n = curArr.length
        const temp = [1]
        for (let i = 0; i < n - 1; i++) {
            const j = i + 1
            temp.push(curArr[i]+curArr[j])
        }
        temp.push(1)
        arr.push(temp)
    }
    return arr
};
// 119. 杨辉三角 II
// 给定一个非负索引 k，其中 k ≤ 33，返回杨辉三角的第 k 行。
// 在杨辉三角中，每个数是它左上方和右上方的数的和。

// 输入: 3
// 输出: [1,3,3,1]
/**
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow = function(rowIndex) {
    const arr = [[1], [1, 1]]
    if (rowIndex + 1 <= 2) return arr[rowIndex]
    while(arr.length <= rowIndex) {
        const curArr = arr[arr.length - 1]
        const n = curArr.length
        const temp = [1]
        for (let i = 0; i < n - 1; i++) {
            const j = i + 1
            temp.push(curArr[i]+curArr[j])
        }
        temp.push(1)
        arr.push(temp)
    }
    return arr[rowIndex]
};

// 125. 验证回文串
// 给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。

// 说明：本题中，我们将空字符串定义为有效的回文串。
// 示例 1:

// 输入: "A man, a plan, a canal: Panama"
// 输出: true
// 示例 2:

// 输入: "race a car"
// 输出: false
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    if (s == '') return true
    const reg = /^([a-z]|[A-Z]|[0-9])$/
    let char = ''
    for (let i = 0; i < s.length; i++) {
        if (reg.test(s.charAt(i))) {
            char += s.charAt(i)
        }
    }
    const reverStr = char.split('').reverse().join('')
    return char.toLowerCase() === reverStr.toLowerCase()
};

// 120. 三角形最小路径和
// 给定一个三角形，找出自顶向下的最小路径和。每一步只能移动到下一行中相邻的结点上。

// 相邻的结点 在这里指的是 下标 与 上一层结点下标 相同或者等于 上一层结点下标 + 1 的两个结点。

// 例如，给定三角形：

// [
//      [2],
//     [3,4],
//    [6,5,7],
//   [4,1,8,3]
// ]
// 自顶向下的最小路径和为 11（即，2 + 3 + 5 + 1 = 11）。
/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function(triangle) {
    // const n = triangle.length
    // const res = []
    // function combin (path, index, rowIndex) {
    //     if (path.length == n) {
    //         res.push(path.reduce((cur, total) => cur + total, 0))
    //         return
    //     }
    //     const left = [triangle[rowIndex + 1][index], triangle[rowIndex + 1][index + 1]]
    //     for (let i = 0; i < left.length; i++) {
    //         const el = left.splice(i, 1)
    //         path.push(el)
    //         combin(path, left)
    //         path.pop()
    //         left.splice(i, 0, el)
    //     }
    // }
    // combin([], 0, 0)
    // debugger
    // return Math.min(...res)
    // 动态规划法
    const res = [triangle[0]]
    for (let i = 1; i < triangle.length; i++) {
        const arr = triangle[i]
        const arrBefore = res[i-1]
        const line = [arrBefore[0] + arr[0]]
        for (let j = 1; j < arr.length; j++) {
            let min = arr[j] + arrBefore[j-1]
            if (arrBefore[j] !== undefined) {
                min = Math.min(arr[j] + arrBefore[j], min)
            }
            line.push(min)
        }
        res.push(line)
    }
    return Math.min(...res.pop())
};
// 121. 买卖股票的最佳时机
// 给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。

// 如果你最多只允许完成一笔交易（即买入和卖出一支股票一次），设计一个算法来计算你所能获取的最大利润。

// 注意：你不能在买入股票前卖出股票。

// 输入: [7,1,5,3,6,4]
// 输出: 5
// 解释: 在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
//      注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。

// 输入: [7,6,4,3,1]
// 输出: 0
// 解释: 在这种情况下, 没有交易完成, 所以最大利润为 0。
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    const arr = []
    if (prices.length < 2) return 0
    for (let i = 0; i < prices.length; i++) {
        let diff = 0
        for (let j = i + 1; j < prices.length; j++) {
            if (prices[j] - prices[i] > diff) {
                diff = prices[j] - prices[i]
            }
        }
        arr.push(diff)
    }
    return Math.max(...arr)
};

// 122. 买卖股票的最佳时机 II
// 给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。

// 设计一个算法来计算你所能获取的最大利润。你可以尽可能地完成更多的交易（多次买卖一支股票）。

// 注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
// 示例 1:

// 输入: [7,1,5,3,6,4]
// 输出: 7
// 解释: 在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
//      随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6-3 = 3 。

// 示例 2:

// 输入: [1,2,3,4,5]
// 输出: 4
// 解释: 在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
//      注意你不能在第 1 天和第 2 天接连购买股票，之后再将它们卖出。
//      因为这样属于同时参与了多笔交易，你必须在再次购买前出售掉之前的股票。
// 示例 3:

// 输入: [7,6,4,3,1]
// 输出: 0
// 解释: 在这种情况下, 没有交易完成, 所以最大利润为 0。
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit2   = function(prices) {
    // const arr = []
    // if (prices.length < 2) return 0
    // for (let i = 0; i < prices.length; i++) {
    //     let min = 0
    //     for (let j = i + 1; i < prices.length; j ++) {
            
    //     }
    // }
    let max = 0
    if (prices.length < 2) return max
    for (let i = 1; i < prices.length; i++) {
        if (prices[i] > prices[i-1]) {
            max += prices[i] - prices[i-1]
        }
    }
    return max
};
// 123. 买卖股票的最佳时机 III
// 给定一个数组，它的第 i 个元素是一支给定的股票在第 i 天的价格。

// 设计一个算法来计算你所能获取的最大利润。你最多可以完成 两笔 交易。

// 注意: 你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。

// 示例 1:

// 输入: [3,3,5,0,0,3,1,4]
// 输出: 6
// 解释: 在第 4 天（股票价格 = 0）的时候买入，在第 6 天（股票价格 = 3）的时候卖出，这笔交易所能获得利润 = 3-0 = 3 。
//      随后，在第 7 天（股票价格 = 1）的时候买入，在第 8 天 （股票价格 = 4）的时候卖出，这笔交易所能获得利润 = 4-1 = 3 。
// 示例 2:

// 输入: [1,2,3,4,5]
// 输出: 4
// 解释: 在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。   
//      注意你不能在第 1 天和第 2 天接连购买股票，之后再将它们卖出。   
//      因为这样属于同时参与了多笔交易，你必须在再次购买前出售掉之前的股票。
// 示例 3:

// 输入: [7,6,4,3,1] 
// 输出: 0 
// 解释: 在这个情况下, 没有交易完成, 所以最大利润为 0。
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let buy1 = Number.POSITIVE_INFINITY
    let buy2 = Number.POSITIVE_INFINITY
    let pro1 = 0
    let pro2 = 0
    for (let price of prices) {
        buy1 = Math.min(buy1, price);
        pro1 = Math.max(pro1, price - buy1);
        buy2 = Math.min(buy2, price - pro1);
        pro2 = Math.max(pro2, price - buy2);
    }
    return pro2
};

// 146. LRU缓存机制
// 运用你所掌握的数据结构，设计和实现一个  LRU (最近最少使用) 缓存机制。
// 它应该支持以下操作： 获取数据 get 和 写入数据 put 。

// 获取数据 get(key) - 如果关键字 (key) 存在于缓存中，则获取关键字的值（总是正数），否则返回 -1。
// 写入数据 put(key, value) - 如果关键字已经存在，则变更其数据值；如果关键字不存在，则插入该组「关键字/值」。
//当缓存容量达到上限时，它应该在写入新数据之前删除最久未使用的数据值，从而为新的数据值留出空间。

// 进阶:

// 你是否可以在 O(1) 时间复杂度内完成这两种操作？

// LRUCache cache = new LRUCache( 2 /* 缓存容量 */ );

// cache.put(1, 1);
// cache.put(2, 2);
// cache.get(1);       // 返回  1
// cache.put(3, 3);    // 该操作会使得关键字 2 作废
// cache.get(2);       // 返回 -1 (未找到)
// cache.put(4, 4);    // 该操作会使得关键字 1 作废
// cache.get(1);       // 返回 -1 (未找到)
// cache.get(3);       // 返回  3
// cache.get(4);       // 返回  4
/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
    this.length = capacity
    this.cache = []
    this.keyMap = new Map()
};

LRUCache.prototype.get = function(key) {
    if (this.cache.includes(key)) {
        const res = this.keyMap.get(key)
        this.cacheAdd(key)
        return res
    } else {
        return -1
    }
};

LRUCache.prototype.put = function(key, value) {
    this.keyMap.set(key, value)
    this.cacheAdd(key)
};
LRUCache.prototype.cacheAdd = function (key) {
    this.cache = this.cache.filter(el => el !== key)
    this.cache.push(key)
    if (this.cache.length > this.length) {
        this.cache.shift()
    }
}