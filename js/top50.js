// 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。

// 注意：答案中不可以包含重复的三元组。

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
    const obj = {}
    nums = nums.sort((a, b) => a - b)
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > 0) break
        for (let j = i + 1; j < nums.length; j++) {
            for (let z = i + 2; z < nums.length; z++ ) {
                const min = nums[i]
                const max = j > z ? nums[j] : nums[z]
                if (max < 0 || j == z) continue
                if ((nums[i] + nums[j] + nums[z]) === 0 && !obj[`${min}${max}`]) {
                    res.push([nums[i], nums[j], nums[z]])
                    obj[`${min}${max}`] = 1
                }
            }
        }
    }
    return res
};

// 给定两个大小为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。

// 请你找出这两个正序数组的中位数，并且要求算法的时间复杂度为 O(log(m + n))。

// 你可以假设 nums1 和 nums2 不会同时为空。

// nums1 = [1, 3]
// nums2 = [2]

// 则中位数是 2.0

// nums1 = [1, 2]
// nums2 = [3, 4]

// 则中位数是 (2 + 3)/2 = 2.5
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    const res = [...nums1, ...nums2].sort((a, b) => a - b)
    if (res.length % 2 == 0) {
        return (res[res.length / 2 - 1] + res[res.length / 2]) / 2
    } else if (res.length % 2 == 1) {
        return res[(res.length - 1) / 2]
    }
};

// 给你 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0)。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

// 输入：[1,8,6,2,5,4,8,3,7]
// 输出：49
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    const len = height.length
    let max = 0
    for (let i = 0; i < len; i++) {
        for (let j = i + 1; j < len; j ++) {
            const res = Math.min(height[i], height[j]) * (j - i)
            max = Math.max(res, max)
        }
    }
    return max
};

// 罗马数字包含以下七种字符： I， V， X， L，C，D 和 M。
// 字符          数值
// I             1
// V             5
// X             10
// L             50
// C             100
// D             500
// M             1000
// 例如， 罗马数字 2 写做 II ，即为两个并列的 1。12 写做 XII ，即为 X + II 。 27 写做  XXVII, 即为 XX + V + II 。
// 通常情况下，罗马数字中小的数字在大的数字的右边。但也存在特例，例如 4 不写做 IIII，而是 IV。数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4 。同样地，数字 9 表示为 IX。这个特殊的规则只适用于以下六种情况：

// I 可以放在 V (5) 和 X (10) 的左边，来表示 4 和 9。
// X 可以放在 L (50) 和 C (100) 的左边，来表示 40 和 90。 
// C 可以放在 D (500) 和 M (1000) 的左边，来表示 400 和 900。
// 给定一个整数，将其转为罗马数字。输入确保在 1 到 3999 的范围内。

// 输入: 3
// 输出: "III"
// 示例 2:

// 输入: 4
// 输出: "IV"
// 示例 3:

// 输入: 9
// 输出: "IX"
// 示例 4:

// 输入: 58
// 输出: "LVIII"
// 解释: L = 50, V = 5, III = 3.
// 示例 5:

// 输入: 1994
// 输出: "MCMXCIV"
// 解释: M = 1000, CM = 900, XC = 90, IV = 4.
/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function(num) {
    /**
     * 解题思路
     * 先特殊
     * 否则用常规数据表示，最大数开始匹配
     */
    const arr = `${num}`.split('').reverse()
    const res = []
    const nomallMap = {
        1: 'I',
        5: 'V',
        10: 'X',
        50: 'L',
        100: 'C',
        500: 'D',
        1000: 'M'
    }
    const specialMap = {
        4: 'IV',
        9: 'IX',
        40: 'XL',
        90: 'XC',
        400: 'CD',
        900: 'CM'
    }
    const level = ['I', 'X', 'C', 'M']
    const five = ['V', 'L', 'D']
    for (let i = 0; i < arr.length; i++) {
        const temp = parseInt(arr[i])
        const left = 10 ** i
        if (specialMap[temp * left]) {
            res.unshift(specialMap[temp * left])
        }
        if (temp > 1 && temp < 4) {
            let newTemp = temp
            while (newTemp) {
                res.unshift(level[i])
                newTemp--
            }
        }
        if (temp > 5 && temp < 9) {
            let number = five[left]
            if (temp * left > 5) {
                number = 'V'
            }
            if (temp * left > 50) {
                number = 'L'
            }
            if (temp * left > 500) {
                number = 'D'
            }
            let newTemp = temp
            while (newTemp > 5) {
                number += level[i]
                newTemp--
            }
            res.unshift(number)
        }
    }
    return res.join('')
};

// 给定一个包括 n 个整数的数组 nums 和 一个目标值 target。找出 nums 中的三个整数，使得它们的和与 target 最接近。
// 返回这三个数的和。假定每组输入只存在唯一答案。

// 例如，给定数组 nums = [-1，2，1，-4], 和 target = 1.

// 与 target 最接近的三个数的和为 2. (-1 + 2 + 1 = 2).
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function(nums, target) {
    if (nums.length < 4) return nums.reduce((total, cur) => total + cur, 0)
    nums = nums.sort((a, b) => a - b)
    let minTotal = nums.slice(0, 3).reduce((total, cur) => total + cur, 0)
    let min = Math.abs(target - minTotal)
    for (let i = 0; i < nums.length; i++) {
        let R = nums.length - 1
        let L = i + 1
        while(L < R) {
            const total = (nums[i] + nums[L] + nums[R])
            // Math.abs(target - total)
            if (total > target) {
                if (min > Math.abs(total - target)) {
                    min = Math.abs(total - target)
                    minTotal = total
                }
                R--
            } else if (total < target) {
                if (min > Math.abs(total - target)) {
                    min = Math.abs(total - target)
                    minTotal = total
                }
                L++
            } else {
                return total
            }
        }
    }
    return minTotal
};
// 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。

// 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

// 输入："23"
// 输出：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
    if (!digits) return []
    const numberMap = {
        2: 'abc',
        3: 'def',
        4: 'ghi',
        5: 'jkl',
        6: 'mno',
        7: 'pqrs',
        8: 'tuv',
        9: 'wxyz'
    }
    const arr = digits.split('')
    let res = numberMap[arr[0]].split('')
    for (let i = 1; i < arr.length; i ++) {
        const cur =  numberMap[arr[i]].split('')
        const temp = []
        while(cur.length) {
            const char = cur.pop()
            for (let j = 0; j < res.length; j++) {
                const lastChar = res[j]
                temp.push(lastChar+char)
            }
        }
        res = temp
    }
    return res
};

// 给定一个包含 n 个整数的数组 nums 和一个目标值 target，
// 判断 nums 中是否存在四个元素 a，b，c 和 d ，使得 a + b + c + d 的值与 target 相等？找出所有满足条件且不重复的四元组。

// 答案中不可以包含重复的四元组。

// 给定数组 nums = [1, 0, -1, 0, -2, 2]，和 target = 0。

// 满足要求的四元组集合为：
// [
//   [-1,  0, 0, 1],
//   [-2, -1, 1, 2],
//   [-2,  0, 0, 2]
// ]
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function(nums, target) {
    const res = []
    nums = nums.sort((a,b) => a - b)
    const obj = {}
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length - 2; j++) {
            let L = j + 1
            let R = nums.length - 1
            while (L < R) {
                const sum =  (nums[i] + nums[j] + nums[L] + nums[R]) - target
                if (sum === 0) {
                    if (!obj[`${nums[i]}+${nums[j]}+${nums[L]}+${nums[R]}`]) {
                        res.push([nums[i], nums[j], nums[L], nums[R]])
                        obj[`${nums[i]}+${nums[j]}+${nums[L]}+${nums[R]}`] = 1
                    }
                    R --
                    L ++
                }
                if (sum > 0) {
                    R --
                }
                if (sum < 0) {
                    L ++
                }
            }
        }
    }
    return res
};

// 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。

// 输入：n = 3
// 输出：[
//        "((()))",
//        "(()())",
//        "(())()",
//        "()(())",
//        "()()()"
//      ]
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    let res = [];
    function gen (cur, left, right) {
        if (left == n && right == n) {
            res.push(cur)
            return
        }
        if (left < n) {
            gen(cur + '(', left + 1, right)
        }
        if (right < left) {
            gen(cur + ')', left, right + 1)
        }
    }
    gen('', 0, 0)
    return res
};

// 给定两个整数，被除数 dividend 和除数 divisor。将两数相除，要求不使用乘法、除法和 mod 运算符。

// 返回被除数 dividend 除以除数 divisor 得到的商。

// 整数除法的结果应当截去（truncate）其小数部分，例如：truncate(8.345) = 8 以及 truncate(-2.7335) = -2
//  
// 输入: dividend = 10, divisor = 3
// 输出: 3
// 解释: 10/3 = truncate(3.33333..) = truncate(3) = 3

// 输入: dividend = 7, divisor = -3
// 输出: -2
// 解释: 7/-3 = truncate(-2.33333..) = -2
//  

// 被除数和除数均为 32 位有符号整数。
// 除数不为 0。
// 假设我们的环境只能存储 32 位有符号整数，其数值范围是 [−231,  231 − 1]。本题中，如果除法结果溢出，则返回 231 − 1。
/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
var divide = function(dividend, divisor) {
    const res = dividend/divisor
    if (res > (2 ** 31  - 1) || res < -(2 ** 31)) {
        return 2 ** 31 - 1
    }
    return parseInt(res)
};
// 给定一个字符串 s 和一些长度相同的单词 words。找出 s 中恰好可以由 words 中所有单词串联形成的子串的起始位置。

// 注意子串要与 words 中的单词完全匹配，中间不能有其他字符，但不需要考虑 words 中单词串联的顺序。

// 输入：
//   s = "barfoothefoobarman",
//   words = ["foo","bar"]
// 输出：[0,9]
// 解释：
// 从索引 0 和 9 开始的子串分别是 "barfoo" 和 "foobar" 。
// 输出的顺序不重要, [9,0] 也是有效答案。
// 示例 2：

// 输入：
//   s = "wordgoodgoodgoodbestword",
//   words = ["word","good","best","word"]
// 输出：[]
/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
var findSubstring = function(s, words) {
    if (!words.length) return []
    const wordLen = words[0].length
    const worldTotalLen = wordLen * words.length
    const res = []
    for (let i = 0; i < s.length - worldTotalLen + 1; i++) {
        const tempChar = s.slice(i, worldTotalLen + i)
        if(isChild(tempChar)) {
            res.push(i)
        }
    }
    return res
    function isChild (tempChar) {
        let wordBack = words.slice()
        for (let i = 0; i < tempChar.length - wordLen + 1; i = i + wordLen) {
            const char = tempChar.slice(i, i + wordLen)
            if (wordBack.indexOf(char) > -1) {
                wordBack.splice(wordBack.indexOf(char), 1)
            }
        }
        return !wordBack.length
    }
    // 数组全排列
    // 去重返回indexof的值
    // const wordsBack = [...words]
    // var arr = []
    // while(words.length) {
    //     let word = words.pop()
    //     if (!arr.length) {
    //         arr.push([word])
    //     } else {
    //         let tempArr = []
    //         for (let i = 0; i < arr.length; i++) {
    //             for (let j = 0; j < arr[i].length + 1; j++) {
    //                 const res = [...arr[i]]
    //                 res.splice(j, 0, word)
    //                 tempArr.push(res)
    //             }
    //         }
    //         arr = tempArr
    //     }
    // }
    // const tempArr = []
    // for (let i = 0; i < arr.length; i++) {
    //     tempArr.push(arr[i].join(''))
    // }
    // const res = []
    // arr = [...new Set(tempArr)]
    // const strLen = wordsBack.join('').length
    // for (let i = 0; i < s.length - strLen + 1; i++) {
    //     const strTemp = s.slice(i, i + strLen)
    //     const index = arr.indexOf(strTemp)
    //     if (index > -1) {
    //         res.push(i)
    //     }
    // }
    // return res
};
// 46. 全排列
// 给定一个 没有重复 数字的序列，返回其所有可能的全排列。
// 输入: [1,2,3]
// 输出:
// [
//   [1,2,3],
//   [1,3,2],
//   [2,1,3],
//   [2,3,1],
//   [3,1,2],
//   [3,2,1]
// ]
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    // let arr = []
    // while(nums.length) {
    //     let num = nums.pop()
    //     if (!arr.length) {
    //         arr.push([num])
    //     } else {
    //         let tempArr = []
    //         for (let i = 0; i < arr.length; i++) {
    //             for (let j = 0; j < arr[i].length + 1; j++) {
    //                 const res = [...arr[i]]
    //                 res.splice(j, 0, num)
    //                 tempArr.push(res)
    //             }
    //         }
    //         arr = tempArr
    //     }
    // }
    // return arr
    const sum = []
    const obj = {}
    function combin (arr) {
        const str = arr.join('')
        if (arr.length === nums.length && str && !obj[str]) {
            obj[str] = 1
            sum.push(arr)
        }
        for (let i = 0; i < nums.length; i++) {
            if (isValid(arr, nums[i])) {
                combin([...arr, nums[i]])
            } else {
                continue
            }
            
        }
    }
    function isValid (arr, i) {
        return arr.indexOf(i) === -1
    }
    combin([])
    return sum
};

// 假设按照升序排序的数组在预先未知的某个点上进行了旋转。

// ( 例如，数组 [0,1,2,4,5,6,7] 可能变为 [4,5,6,7,0,1,2] )。

// 搜索一个给定的目标值，如果数组中存在这个目标值，则返回它的索引，否则返回 -1 。

// 你可以假设数组中不存在重复的元素。

// 你的算法时间复杂度必须是 O(log n) 级别。

// 示例 1:

// 输入: nums = [4,5,6,7,0,1,2], target = 0
// 输出: 4
// 示例 2:

// 输入: nums = [4,5,6,7,0,1,2], target = 3
// 输出: -1
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    return nums.indexOf(target)
};

// 给定一个只包含 '(' 和 ')' 的字符串，找出最长的包含有效括号的子串的长度。

// 输入: "(()"
// 输出: 2
// 解释: 最长有效括号子串为 "()"

// 输入: ")()())"
// 输出: 4
// 解释: 最长有效括号子串为 "()()"
/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function(s) {
    let maxans = 0;
    let dp = new Array(s.length).fill(0)
    for (let i = 1; i < s.length; i++) {
        if (s[i] == ')') {
            if (s[i - 1] == '(') {
                dp[i] = (i >= 2 ? dp[i - 2] : 0) + 2;
            } else if (i - dp[i - 1] > 0 && s[i - dp[i - 1] - 1] == '(') {
                dp[i] = dp[i - 1] + ((i - dp[i - 1]) >= 2 ? dp[i - dp[i - 1] - 2] : 0) + 2;
            }
            maxans = Math.max(maxans, dp[i]);
        }
    }
    return maxans;
    // 超时间限制
    // let max = 0
    // for (let i = 0; i < s.length; i++) {
    //     if (s[i] == ')') continue
    //     for (let j = i + 1; j <= s.length; j++) {
    //         if (s[j] == '(') continue
    //         if (s[i] == '(' && s[j] == ')') {
    //             const isTrue = isTrueStr(s.slice(i, j + 1))
    //             max = isTrue ? Math.max(j + 1 - i, max) : max
    //         }
    //     }
    // }
    // return max
    // function isTrueStr (str) {
    //     const charlist = str.split('')
    //     const arr = []
    //     while(charlist.length) {
    //         const child = charlist.shift()
    //         if (child == '(') {
    //             arr.push(child)
    //         } else if (child == ')') {
    //             if (arr.pop() != '(') {
    //                 return false
    //             }
    //         }
    //     }
    //     if (!arr.length) {
    //         return true
    //     } else {
    //         return false
    //     }
    // }
};
// 给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。

// 你的算法时间复杂度必须是 O(log n) 级别。

// 如果数组中不存在目标值，返回 [-1, -1]。

// 输入: nums = [5,7,7,8,8,10], target = 8
// 输出: [3,4]

// 输入: nums = [5,7,7,8,8,10], target = 6
// 输出: [-1,-1]
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
    const L = nums.indexOf(target)
    if (L === -1) {
        return [-1, -1]
    }
    let R = nums.length - 1
    while(L <= R) {
        const mid = Math.ceil((R + L) / 2)
        if (nums[mid] > target) {
            R = Math.floor((R + (R + L) / 2) / 2)
        }
        if (nums[mid] < target) {
            R = Math.floor((L + (R + L) / 2) / 2)
        }
        if (nums[mid] == target && nums[mid + 1] === target) {
            R++
        }
        if (nums[mid] == target && nums[mid + 1] !== target) {
            return [L , mid]
        }
        if (nums[mid] == target && nums[mid + 1] == null) {
            return [L , mid]
        }
    }
    return [L, R]
};

// 给你一个未排序的整数数组，请你找出其中没有出现的最小的正整数。

// 示例 1:

// 输入: [1,2,0]
// 输出: 3
// 示例 2:

// 输入: [3,4,-1,1]
// 输出: 2
// 示例 3:

// 输入: [7,8,9,11,12]
// 输出: 1
/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function(nums) {
    const max = nums.sort((a, b) => a - b)[nums.length - 1]
    if (!max) return 1
    for (let i = 1; i < max; i++) {
        if (nums.indexOf(i) == -1) {
            return i
        }
    }
    return Math.max(max + 1, 1) 
};

// 47. 全排列 II
// 给定一个可包含重复数字的序列，返回所有不重复的全排列。

// 输入: [1,1,2]
// 输出:
// [
//   [1,1,2],
//   [1,2,1],
//   [2,1,1]
// ]
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function(nums) {
    let obj = {}
    while(nums.length) {
        const num = nums.pop()
        const oldArr = Object.keys(obj)
        if (!oldArr.length) {
            obj[num] = num
        } else {
            const map = {}
            oldArr.forEach(el => {
                const arr = el.split(',')
                for (let i = 0; i < arr.length; i++) {
                    const temp = [...arr]
                    temp.splice(i, 0, num)
                    const str = temp.join(',')
                    if (!map[str]) {
                        map[str] = 1
                    }
                }
                const lastPushStr = [...arr, num].join(',')
                if (!map[lastPushStr]) {
                    map[lastPushStr] = 1
                }
            })
            obj = map
        }
    }
    return Object.keys(obj).map(el => el.split(','))
};
// 39.组合总数
// 给定一个无重复元素的数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。

// candidates 中的数字可以无限制重复被选取。

// 所有数字（包括 target）都是正整数。
// 解集不能包含重复的组合。 

// 输入: candidates = [2,3,6,7], target = 7,
// 所求解集为:
// [
//   [7],
//   [2,2,3]
// ]

// 输入: candidates = [2,3,5], target = 8,
// 所求解集为:
// [
//   [2,2,2,2],
//   [2,3,3],
//   [3,5]
// ]
/**
 * 回溯加剪枝
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
    var resultList = []
    const combin = function (candidates, tar, begin, path) {
        if (tar < 0) {
            return
        }
        if (tar === 0) {
            return resultList.push(path.slice())
        }
        for (let i = begin; i < candidates.length; i++) {
            path.push(candidates[i])
            combin(candidates, tar - candidates[i], i, path)
            path.pop()
        }
    }
    combin(candidates, target, 0, [])
    return resultList
};
// 设计一种算法，打印 N 皇后在 N × N 棋盘上的各种摆法，
// 其中每个皇后都不同行、不同列，也不在对角线上。这里的“对角线”指的是所有的对角线，不只是平分整个棋盘的那两条对角线。

//  输入：4
//  输出：[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
//  解释: 4 皇后问题存在如下两个不同的解法。
// [
//  [".Q..",  // 解法 1
//   "...Q",
//   "Q...",
//   "..Q."],

//  ["..Q.",  // 解法 2
//   "Q...",
//   "...Q",
//   ".Q.."]
// ]
/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
    const res = []
    const board = Array(n).fill('.').map(() => {
        return new Array(n).fill('.')
    })
    function backtrack (board, row) {
        // 触发结束
        if (board.length === row) {
            res.push(board.map(el => el.join('')))
            return
        }
        const n = board[row].length
        for (let col = 0; col < n; col++) {
            if (!isValid(board, row, col)) continue
            board[row][col] = 'Q'
            backtrack(board, row + 1)
            board[row][col] = '.'
        }
    }
    function isValid (board, row, col) {
        // 检查列
        for (let i = 0; i < row; i++) {
            if (board[i][col] === 'Q') return false
        }
        // 检查左上方
        for (let i = col - 1, j = row - 1; i >= 0 && j >= 0; i--, j--) {
            if (board[j][i] === 'Q') return false
        }
        // 检查右上方
        for (let i = col + 1, j = row - 1 ; i < n && j >= 0; i++, j--) {
            if (board[j][i] === 'Q') return false
        }
        return true
    }
    backtrack(board, 0)
    return res
};

// 给定两个以字符串形式表示的非负整数 num1 和 num2，返回 num1 和 num2 的乘积，它们的乘积也表示为字符串形式。

// 输入: num1 = "2", num2 = "3"
// 输出: "6"

// 输入: num1 = "123", num2 = "456"
// 输出: "56088"
// 说明：

// num1 和 num2 的长度小于110。
// num1 和 num2 只包含数字 0-9。
// num1 和 num2 均不以零开头，除非是数字 0 本身。
// 不能使用任何标准库的大数类型（比如 BigInteger）或直接将输入转换为整数来处理。
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function(num1, num2) {
    const N = new Array(num1.length + num2.length).fill(0);    //初始化数组
    for (let i = 0, last1 = num1.length - 1; i <= last1; i++) {
        const n1 = Number(num1[last1 - i]);
        for (let j = 0, last2 = num2.length - 1; j <= last2; j++) {
            const n2 = Number(num2[last2 - j]);
            const x = N[i + j] + n1 * n2;           //累加对应位置数值
            N[i + j] = x % 10;                      //只保留一位数
            N[i + j + 1] += Math.floor(x / 10);     //进位
        }
    }
    return N.reverse().join("").replace(/^0*/, "") || "0";     //翻转拼接，清理多余的 0
    // 作者：zoffer
    // 链接：https://leetcode-cn.com/problems/multiply-strings/solution/ji-jian-zi-fu-chuan-xiang-cheng-by-zoffer/
    // 来源：力扣（LeetCode）
    // 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
};
function add(num1, num2) {
    if (!num1 || !num2) return num1 || num2
    const numStr1 = (num1 + '').split('')
    const numStr2 = (num2 + '').split('')
    let temp = 0
    const res = []
    while(numStr2.length || numStr1.length) {
        const str1 = parseInt(numStr1.pop() || 0)
        const str2 = parseInt(numStr2.pop() || 0)
        if ((str1 + str2 + temp) >= 10) {
            res.push((str1 + str2 + temp) % 10)
            temp = 1
        } else {
            res.push((str1 + str2 + temp))
            temp = 0
        }
    }
    if (temp) res.push(temp)
    const resTemp = res.reverse().join('')
    return resTemp
}
// 42. 接雨水
// 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。
// 上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。 感谢 Marcos 贡献此图。

// 示例:

// 输入: [0,1,0,2,1,0,1,3,2,1,2,1]
// 输出: 6
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
    let sum = 0
    for (let i = 1; i < height.length - 1; i++) {
        let max_left = 0, max_right = 0
        // 左侧最高的墙
        for (let j = i - 1; j >= 0; j--) {
            if (height[j] > max_left) {
                max_left = height[j]
            }
        }
        for (let j = i + 1; j < height.length; j++) {
            if (height[j] > max_right) {
                max_right = height[j]
            }
        }
        let min = Math.min(max_right, max_left)
        if (min > height[i]) {
            sum += (min - height[i])
        }
    }
    return sum
};

// 给定一个 n × n 的二维矩阵表示一个图像。

// 将图像顺时针旋转 90 度。

// 你必须在原地旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要使用另一个矩阵来旋转图像。

// 给定 matrix = 
// [
//   [1,2,3],
//   [4,5,6],
//   [7,8,9]
// ],

// 原地旋转输入矩阵，使其变为:
// [
//   [7,4,1],
//   [8,5,2],
//   [9,6,3]
// ]
// 示例 2:

// 给定 matrix =
// [
//   [ 5, 1, 9,11],
//   [ 2, 4, 8,10],
//   [13, 3, 6, 7],
//   [15,14,12,16]
// ], 

// 原地旋转输入矩阵，使其变为:
// [
//   [15,13, 2, 5],
//   [14, 3, 4, 1],
//   [12, 6, 8, 9],
//   [16, 7,10,11]
// ]
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function(matrix) {
    const n = matrix.length - 1
    for (let i = 0; i < matrix.length / 2; i++) {
        if (i === (matrix.length - 1) / 2) break
        for (let j = 0; j < matrix.length / 2; j++) {
            const temp = matrix[i][j]
            matrix[i][j] = matrix[n - j][i]
            matrix[n - j][i] = matrix[n - i][n - j]
            matrix[n - i][n - j] = matrix[j][n - i]
            matrix[j][n - i] = temp
        }
    }
};
// 给定一个字符串数组，将字母异位词组合在一起。字母异位词指字母相同，但排列不同的字符串。

// 输入: ["eat", "tea", "tan", "ate", "nat", "bat"]
// 输出:
// [
//   ["ate","eat","tea"],
//   ["nat","tan"],
//   ["bat"]
// ]
// 说明：

// 所有输入均为小写字母。
// 不考虑答案输出的顺序。
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    const obj = {}
    const alpha = 'abcdefghijklmnopqrstuvwxyz'
    while(strs.length) {
        const str = strs.pop()
        const indexList = []
        for (let i = 0; i < str.length; i++) {
            indexList.push(alpha.indexOf(str.charAt(i)))
        }
        const key = indexList.sort((a,b) => a - b).join(',')
        if (obj[key]) {
            obj[key] = [...obj[key], str]
        } else {
            obj[key] = [str]
        }
    }
    return Object.keys(obj).map(key => obj[key])
};
// 2.两数相加
// 给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。
// 如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。
// 您可以假设除了数字 0 之外，这两个数都不会以 0 开头。

// 输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
// 输出：7 -> 0 -> 8
// 原因：342 + 465 = 807
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let node = new ListNode('head')
    let temp = node , sum , n = 0
    while( l1 || l2 ){
        const n1 = l1 ? l1.val : 0
        const n2 = l2 ? l2.val : 0
        sum = n1 + n2 + n
        temp.next = new ListNode( sum % 10 )
        temp = temp.next
        n = parseInt( sum / 10 )
        if(l1) l1 = l1.next
        if(l2) l2 = l2.next
    }
    if( n > 0 ) temp.next = new ListNode(n)
    return node.next
};
// 36. 有效的数独
// 判断一个 9x9 的数独是否有效。只需要根据以下规则，验证已经填入的数字是否有效即可。

// 数字 1-9 在每一行只能出现一次。
// 数字 1-9 在每一列只能出现一次。
// 数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。


// 上图是一个部分填充的有效的数独。

// 数独部分空格内已填入了数字，空白格用 '.' 表示。

/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function(board) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] !== '.') {
                if (!validChar(i, j)) return false
            }
        }
    }
    function validChar (row, col) {
        const char = board[row][col]
        // 排
        for (let i = 0; i < board[row].length; i++) {
            if (col !== i && char === board[row][i]) {
                return false
            }
        }
        for (let i = 0; i < board.length; i++) {
            if (row !== i && char === board[i][col]) {
                return false
            }
        }
        // 小方形
        for (let i = parseInt(row/3) * 3; i < (parseInt(row/3) * 3 + 3); i++) {
            for (let j = parseInt(col/3) * 3; j < (parseInt(col/3) * 3 + 3); j++) {
                if (board[i][j] === char && (i !== row && j !== col)) {
                    return false
                }
            }
        }
        return true
    }
    return true
};
// 37. 解数独
// 编写一个程序，通过已填充的空格来解决数独问题。
// 一个数独的解法需遵循如下规则：

// 数字 1-9 在每一行只能出现一次。
// 数字 1-9 在每一列只能出现一次。
// 数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。
// 空白格用 '.' 表示。


// 给定的数独序列只包含数字 1-9 和字符 '.' 。
// 你可以假设给定的数独只有唯一解。
// 给定数独永远是 9x9 形式的。
/**
 * TODO
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function(board) {
    function combin (row) {
        if (row === (board.length - 1) && board[row].indexOf('.') === -1) {
            debugger
            return
        }
        for (let i = 0; i < 9; i++) {
            if (board[row][i] === '.') {
                const left = [1,2,3,4,5,6,7,8,9].filter(el => board[row].indexOf(el) === -1)
                // for (let j = 0; j < left.length; j++) {
                const item = left.unshift()
                board[row][i] = item
                if (!isValid(row, i, left[j])) continue
                combin(i == (board.length - 1) ? row + 1 : row)
                board[row][i] = '.'
                left.push(item)
            } else {
                continue
            }
        }
    }
    combin(0)
    function isValid (row, col, val) {
        // 竖排没有重复的数
        for (let i = 0; i < board.length; i++) {
            if (board[i][col] === val && row !== i) {
                return false
            }
        }
        // 小框里没有重复的数
        for (let i = parseInt(row/3) * 3; i < (parseInt(row/3) * 3 + 3); i++) {
            for (let j = parseInt(col/3) * 3; j < (parseInt(col/3) * 3 + 3); j++) {
                if (board[i][j] === val && (i !== row && j !== col)) {
                    return false
                }
            }
        }
        return true
    } 
};
// const arr = [
//     [5, 3, '.', '.', 7, '.', '.','.','.'],
//     [6, '.', '.', 1, 9, 5, '.','.','.'],
//     ['.', 9, 8, '.', '.', '.', '.',6,'.'],
//     [8, '.', '.', '.', 6, '.', '.','.', 3],
//     [4, '.', '.', 8, '.', 3, '.','.', 1],
//     [7, '.', '.', '.', 2, '.', '.','.', 6],
//     ['.', 6, '.', '.', '.', '.', 2, 8,'.'],
//     ['.', '.', '.', 4, 1, 9, '.','.', 5],
//     ['.', '.', '.', '.', 8, '.', '.',7,9]
// ]
// solveSudoku(arr)
// console.log(arr)


// 40. 组合总和 II
// 给定一个数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。
// candidates 中的每个数字在每个组合中只能使用一次。

// 所有数字（包括目标数）都是正整数。
// 解集不能包含重复的组合。 

// 输入: candidates = [10,1,2,7,6,1,5], target = 8,
// 所求解集为:
// [
//   [1, 7],
//   [1, 2, 5],
//   [2, 6],
//   [1, 1, 6]
// ]
// 输入: candidates = [2,5,2,1,2], target = 5,
// 所求解集为:
// [
//   [1,2,2],
//   [5]
// ]
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
    // 先排序
    const res = []
    const obj = {}
    function combin (path, left) {
        path = path.sort((a, b) => (a -b))
        left = left.sort((a, b) => (a -b))
        const key = path.join(',') 
        const total = path.reduce((cur, total) => cur + total, 0)
        if (total === target && !obj[key]) {
            res.push([...path])
            obj[key] = 1
            return
        }
        for (let i = 0; i < left.length; i++) {
            if (left[i] + total > target) return
            const leftArr = left.filter((el, index) => index !== i)
            combin ([...path, left[i]], [...leftArr])
        }
    }
    combin([], candidates)
    return res
};

// 给定一个字符串 (s) 和一个字符模式 (p) ，实现一个支持 '?' 和 '*' 的通配符匹配。

// '?' 可以匹配任何单个字符。
// '*' 可以匹配任意字符串（包括空字符串）。
// 两个字符串完全匹配才算匹配成功。

// 说明:

// s 可能为空，且只包含从 a-z 的小写字母。
// p 可能为空，且只包含从 a-z 的小写字母，以及字符 ? 和 *。

// 输入:
// s = "aa"
// p = "a"
// 输出: false
// 解释: "a" 无法匹配 "aa" 整个字符串。

// 输入:
// s = "aa"
// p = "*"
// 输出: true
// 解释: '*' 可以匹配任意字符串。
// 示例 3:

// 输入:
// s = "cb"
// p = "?a"
// 输出: false
// 解释: '?' 可以匹配 'c', 但第二个 'a' 无法匹配 'b'。

// 输入:
// s = "adceb"
// p = "*a*b"
// 输出: true
// 解释: 第一个 '*' 可以匹配空字符串, 第二个 '*' 可以匹配字符串 "dce".

// 输入:
// s = "acdcb"
// p = "a*c?b"
// 输出: false
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
    if (p === '*') return true
    const str = s.split('')
    const pStr = p.split('')
    while(str.length && pStr.length) {
        const pChar = pStr
    }
}

// 45. 跳跃游戏 II
// 给定一个非负整数数组，你最初位于数组的第一个位置。
// 数组中的每个元素代表你在该位置可以跳跃的最大长度。
// 你的目标是使用最少的跳跃次数到达数组的最后一个位置。

// 输入: [2,3,1,1,4]
// 输出: 2
// 解释: 跳到最后一个位置的最小跳跃数是 2。
//      从下标为 0 跳到下标为 1 的位置，跳 1 步，然后跳 3 步到达数组的最后一个位置。
/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function(nums) {

};