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