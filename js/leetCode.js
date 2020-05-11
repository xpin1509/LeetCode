// 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

// 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。
//  
// 示例:

// 给定 nums = [2, 7, 11, 15], target = 9

// 因为 nums[0] + nums[1] = 2 + 7 = 9
// 所以返回 [0, 1]
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    for (let i = 0; i < nums.length; i ++) {
        for (let j = i + 1; j < nums.length; j ++ ) {
            if ((nums[i] + nums[j]) === target) {
                return [i, j]
            }
        }
    }
    // let res = {}
    // for (let i = 0; i < nums.length; i++) { // 每个人登记自己想要配对的人，让主持人记住
    //     res[target - nums[i]] = nums[i]
    // }
    // for (let j = 0; j < nums.length; j++) { // 每个人再次报数的时候，主持人看一下名单里有没有他
    //     if (res[nums[j]] !== undefined) {
    //         return [nums[j], res[nums[j]]]
    //     }
    // }
};
twoSum([2,7,11,15], 9)
// 给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，
// 并且它们的每个节点只能存储 一位 数字。
// 如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。
// 您可以假设除了数字 0 之外，这两个数都不会以 0 开头。

// 输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
// 输出：7 -> 0 -> 8
// 原因：342 + 465 = 807
// function ListNode(val) {
//     this.val = val;
//     this.next = null;
// }
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {

};

// 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

// 示例 1:

// 输入: "abcabcbb"
// 输出: 3 
// 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
// 示例 2:

// 输入: "bbbbb"
// 输出: 1
// 解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
// 示例 3:

// 输入: "pwwkew"
// 输出: 3
// 解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
//      请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let max = 0
    for (let i = 0; i < s.length; i ++) {
        let str = ''
        for (let j = i; j < s.length; j ++) {
            if (str.indexOf(s[j]) === -1) {
                str += s[j]
                if (str.length > max) {
                    max = str.length
                }
            } else {
                break
            }
        }
    }
    return max
}

// 给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。

// 输入: "babad"
// 输出: "bab"
// 注意: "aba" 也是一个有效答案。

// 输入: "cbbd"
// 输出: "bb"
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    let res = ''
    for (let i = 0; i < s.length; i++ ) {
        for (let j = i; j < s.length; j++) {
            let str = s.slice(i, j+1)
            let reverStr = str.split('').reverse().join('')
            if (reverStr === str && str.length > res.length) {
                res = str
            }
        }
    }
    return res
};

// 给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。

// 输入: 123
// 输出: 321

// 输入: -123
// 输出: -321

// 输入: 120
// 输出: 21
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    let isNegat = false
    if (x <= 0) {
        isNegat = true
    }
    const num = Math.abs(x)
    let str = `${num}`.split('').reverse().join('')
    if (isNegat) {
        if (Number(str) > 2 ** 31) {
            return 0
        } else {
            return 0 - Number(str)
        }
    } else {
        if ((Number(str) + 1) > 2 ** 31) {
            return 0
        } else {
            return Number(str)
        }
    }
};

// 请你来实现一个 atoi 函数，使其能将字符串转换成整数。

// 首先，该函数会根据需要丢弃无用的开头空格字符，直到寻找到第一个非空格的字符为止。接下来的转化规则如下：

// 如果第一个非空字符为正或者负号时，则将该符号与之后面尽可能多的连续数字字符组合起来，形成一个有符号整数。
// 假如第一个非空字符是数字，则直接将其与之后连续的数字字符组合起来，形成一个整数。
// 该字符串在有效的整数部分之后也可能会存在多余的字符，那么这些字符可以被忽略，它们对函数不应该造成影响。
// 注意：假如该字符串中的第一个非空格字符不是一个有效整数字符、字符串为空或字符串仅包含空白字符时，则你的函数不需要进行转换，即无法进行有效转换。

// 在任何情况下，若函数不能进行有效的转换时，请返回 0 。

// 提示：

// 本题中的空白字符只包括空格字符 ' ' 。
// 假设我们的环境只能存储 32 位大小的有符号整数，那么其数值范围为 [−231,  231 − 1]。如果数值超过这个范围，请返回  INT_MAX (231 − 1) 或 INT_MIN (−231) 。
//  

// 示例 1:

// 输入: "42"
// 输出: 42
// 示例 2:

// 输入: "   -42"
// 输出: -42
// 解释: 第一个非空白字符为 '-', 它是一个负号。
//      我们尽可能将负号与后面所有连续出现的数字组合起来，最后得到 -42 。
// 示例 3:

// 输入: "4193 with words"
// 输出: 4193
// 解释: 转换截止于数字 '3' ，因为它的下一个字符不为数字。
// 示例 4:

// 输入: "words and 987"
// 输出: 0
// 解释: 第一个非空字符是 'w', 但它不是数字或正、负号。
//      因此无法执行有效的转换。
// 示例 5:

// 输入: "-91283472332"
// 输出: -2147483648
// 解释: 数字 "-91283472332" 超过 32 位有符号整数范围。 
//      因此返回 INT_MIN (−231) 。
/**
 * @param {string} str
 * @return {number}
 */
var myAtoi = function(str) {

};


// 编写一个函数来查找字符串数组中的最长公共前缀。

// 如果不存在公共前缀，返回空字符串 ""。

// 输入: ["flower","flow","flight"]
// 输出: "fl"

// 输入: ["dog","racecar","car"]
// 输出: ""
// 解释: 输入不存在公共前缀。
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    let res = ''
    if (!strs.length || !strs[0].length) return ''
    for (let i = 0; i < strs[0].length; i++) {
        let tempres = strs[0].slice(0, i + 1)
        let falg = true
        for (let j = 0; j < strs.length; j++) {
            if (strs[j].length < tempres.length) {
                return res
            }
            if (strs[j].indexOf(tempres) !== 0) {
                falg = false
                return res
            }
        }
        if (falg) {
            res = tempres
        }
    }
    return res
};

// 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。

// 注意：答案中不可以包含重复的三元组。

//  
// 给定数组 nums = [-1, 0, 1, 2, -1, -4]，

// 满足要求的三元组集合为：
// [
//   [-1, 0, 1],
//   [-1, -1, 2]
// ]
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    if (nums.length < 3) return []
    if (nums.length === 3 ) {
        const res = nums.reduce((total, cur) => {
            return total + cur
        }, 0)
        if (res === 0) {
            return [nums]
        } else {
            return []
        }
    }
    const res = []
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            for (let z = i + 2; z < nums.length; z++ ) {
                if ((nums[i] + nums[j] + nums[z]) === 0) {
                    res.push([nums[i], nums[j], nums[z]])
                }
            }
        }
    }
    for (let i = 0; i < res.length; i++) {}
    return res
};

console.log(threeSum([-1, 0, 1, 2, -1, -4]))
// 给定一个包括 n 个整数的数组 nums 和 一个目标值 target。找出 nums 中的三个整数，使得它们的和与 target 最接近。返回这三个数的和。假定每组输入只存在唯一答案。

// 例如，给定数组 nums = [-1，2，1，-4], 和 target = 1.

// 与 target 最接近的三个数的和为 2. (-1 + 2 + 1 = 2).
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function(nums, target) {

};