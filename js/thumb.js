// 出数组中重复的数字。
// 在一个长度为 n 的数组 nums 里的所有数字都在 0～n-1 的范围内。
// 数组中某些数字是重复的，但不知道有几个数字重复了，也不知道每个数字重复了几次。请找出数组中任意一个重复的数字。

// 输入：
// [2, 3, 1, 0, 2, 5, 3]
// 输出：2 或 3 
//  

// 限制：
// 2 <= n <= 100000
/**
 * @param {number[]} nums
 * @return {number}
 */
var findRepeatNumber = function(nums) {
    const map = new Map()
    for (let i = 0; i < nums.length; i++) {
        if (map.has(nums[i])) {
            return nums[i]
        } else {
            map.set(nums[i], 1)
        }
    }
};

// 在一个 n * m 的二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。
// 请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。

// 现有矩阵 matrix 如下：
// [
//   [1,   4,  7, 11, 15],
//   [2,   5,  8, 12, 19],
//   [3,   6,  9, 16, 22],
//   [10, 13, 14, 17, 24],
//   [18, 21, 23, 26, 30]
// ]
// 给定 target = 5，返回 true。

// 给定 target = 20，返回 false。

// 限制：
// 0 <= n <= 1000
// 0 <= m <= 1000
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var findNumberIn2DArray = function(matrix, target) {
    if (!matrix.length) return false
    if (target < matrix[0][0]) return false
    for (let i = 0; i < matrix.length; i++) {
        if (target < matrix[i][0]) break
        for (let j = 0; j < matrix[i].length; j++) {
            if (target === matrix[i][j]) {
                return true
            }
        }
    }
    return false
};

// 请实现一个函数，把字符串 s 中的每个空格替换成"%20"。
// 输入：s = "We are happy."
// 输出："We%20are%20happy."

// 限制：
// 0 <= s 的长度 <= 10000
/**
 * @param {string} s
 * @return {string}
 */
var replaceSpace = function(s) {
    return s.replace(/\s/g, '%20')
};

// 输入一个链表的头节点，从尾到头反过来返回每个节点的值（用数组返回）。
// 输入：head = [1,3,2]
// 输出：[2,3,1]
// 限制：
// 0 <= 链表长度 <= 10000
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {number[]}
 */
var reversePrint = function(head) {

};