// 剑指 Offer 56 - I. 数组中数字出现的次数
// 一个整型数组 nums 里除两个数字之外，其他数字都出现了两次。请写程序找出这两个只出现一次的数字。要求时间复杂度是O(n)，空间复杂度是O(1)。

// 输入：nums = [4,1,4,6]
// 输出：[1,6] 或 [6,1]

// 输入：nums = [1,2,10,4,1,4,3,3]
// 输出：[2,10] 或 [10,2]
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var singleNumbers = function(nums) {
    const map = {}
    for (let i = 0; i < nums.length; i++) {
        if (map[nums[i]]) {
            map[nums[i]] += 1
        } else {
            map[nums[i]] = 1
        }
    }
    const result = []
    Object.entries(map).map(el => {
        const [key, value] = el
        if (value !== 2) {
            result.push(Number(key))
        }
    })
    return result
};

// 剑指 Offer 56 - II. 数组中数字出现的次数 II
// 在一个数组 nums 中除一个数字只出现一次之外，其他数字都出现了三次。请找出那个只出现一次的数字。

// 输入：nums = [3,4,3,3]
// 输出：4

// 输入：nums = [9,1,7,9,7,9,7]
// 输出：1

// 1 <= nums.length <= 10000
// 1 <= nums[i] < 2^31
/**
 * @param {number[]} nums
 * @return {number}
 */
 var singleNumber = function(nums) {
    const map = new Map();
    for (let item of nums) {
        const value = map.get(item)
        if (value) {
            map.set(item, value + 1)
        } else {
            map.set(item, 1)
        }
    }
    for (let el of map.entries()) {
        const [key, value] = el
        if (value === 1) return key
    }
};


// 剑指 Offer 38. 字符串的排列
// 输入一个字符串，打印出该字符串中字符的所有排列。

// 你可以以任意顺序返回这个字符串数组，但里面不能有重复元素。

// 输入：s = "abc"
// 输出：["abc","acb","bac","bca","cab","cba"]

// 输入：s = "aab"
// 输出：["aba","aab","baa"]

/**
 * @param {string} s
 * @return {string[]}
 */
var permutation = function(s) {
    const result = []
    function combin (target, left) {
        if (target.length === s.length) {
            const resStr = target.join('')
            if (!~result.indexOf(resStr)) {
                result.push(resStr)
            }
        }

        for (let i = 0; i < left.length; i++) {
            const item = left[i]
            const lefts = left.filter((e, idx) => idx !== i)
            combin([...target, item], lefts)
        }
    }

    combin([], s.split(''))

    return result
};

// 剑指 Offer 44. 数字序列中某一位的数字
// 数字以0123456789101112131415…的格式序列化到一个字符序列中。在这个序列中，第5位（从下标0开始计数）是5，第13位是1，第19位是4，等等。

// 请写一个函数，求任意第n位对应的数字。

// 输入：n = 3
// 输出：3

// 输入：n = 11
// 输出：0
/**
 * @param {number} n
 * @return {number}
 */
 var findNthDigit = function(n) {

};

// 剑指 Offer 47. 礼物的最大价值
// 在一个 m*n 的棋盘的每一格都放有一个礼物，每个礼物都有一定的价值（价值大于 0）。
// 你可以从棋盘的左上角开始拿格子里的礼物，并每次向右或者向下移动一格、直到到达棋盘的右下角。
// 给定一个棋盘及其上面的礼物的价值，请计算你最多能拿到多少价值的礼物？

// 输入: 
// [
//   [1,3,1],
//   [1,5,1],
//   [4,2,1]
// ]
// 输出: 12
// 解释: 路径 1→3→5→2→1 可以拿到最多价值的礼物

// 0 < grid.length <= 200
// 0 < grid[0].length <= 200
/**
 * @param {number[][]} grid
 * @return {number}
 */
 var maxValue = function(grid) {

};