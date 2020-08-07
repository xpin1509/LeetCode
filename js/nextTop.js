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
    const n = triangle.length
    const res = []
    function combin (path, left) {
        if (path == n) {
            res.push(path.reduce((cur, total) => cur + total, 0))
            return
        }
        for (let i = 0; i < left.length; i++) {
            const el = left.splice(i, 1)
            path.push(el)
            combin(path, left)
            path.pop()
            left.splice(i, 0, el)
        }
    }
    combin(triangle[0], triangle[1])
    debugger
    return Math.min(...res)
};
// console.log(minimumTotal([
//     [2],
//    [3,4],
//   [6,5,7],
//  [4,1,8,3]
// ]))