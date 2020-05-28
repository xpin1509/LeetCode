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

};

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

};