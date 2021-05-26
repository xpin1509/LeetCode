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
