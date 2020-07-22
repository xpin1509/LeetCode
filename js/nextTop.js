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
console.log(getRow(0))