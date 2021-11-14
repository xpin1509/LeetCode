// 11. 盛最多水的容器
// 给你 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0) 。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

// 输入：[1,8,6,2,5,4,8,3,7]
// 输出：49 
// 解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。
// 示例 2：

// 输入：height = [1,1]
// 输出：1
// 示例 3：

// 输入：height = [4,3,2,1,4]
// 输出：16
// 示例 4：

// 输入：height = [1,2,1]
// 输出：2
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let i = 0, j = height.length - 1, res = 0
    while (i < j) {
        if (height[i] < height[j]) {
            res = Math.max(res,  (j - i) * height[i])
            i ++
        } else {
            res = Math.max(res,  (j - i) * height[j])
            j --
        }
    }
    return res
};


// 16. 最接近的三数之和
// 给你一个长度为 n 的整数数组 nums 和 一个目标值 target。请你从 nums 中选出三个整数，使它们的和与 target 最接近。

// 输入：nums = [-1,2,1,-4], target = 1
// 输出：2
// 解释：与 target 最接近的和是 2 (-1 + 2 + 1 = 2) 。

// 输入：nums = [0,0,0], target = 1
// 输出：0
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function(nums, target) {
    if (nums.length < 4) return nums.reduce((total, cur) => total + cur, 0)
    nums = nums.sort((a, b) => a - b)
    let min = nums[0] + nums[1] + nums[2]
    // debugger
    for (let i = 0; i < nums.length; i++) {
        let L = i + 1, R = nums.length - 1
        // debugger
        while (L < R) {
            const sumNew = nums[i] + nums[L] + nums[R]
            min = Math.abs(sumNew - target) < Math.abs(min - target) ? sumNew : min
            debugger
            if (sumNew ===  target) { 
                return sumNew
            } else if (sumNew > target) {
                R--
            } else {
                L++
            }
        }
    }
    return min
};