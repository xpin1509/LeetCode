/***********数据结构与算法*********
 * 算法的复杂度分析。
 * 排序算法，以及他们的区别和优化。
 * 数组中的双指针、滑动窗口思想。
 * 利用 Map 和 Set 处理查找表问题。
 * 链表的各种问题。
 * 利用递归和迭代法解决二叉树问题。
 * 栈、队列、DFS、BFS。
 * 回溯法、贪心算法、动态规划。
 ********************************/


/***************双指针*****************/
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
    for (let i = 0; i < nums.length; i++) {
        let L = i + 1, R = nums.length - 1
        while (L < R) {
            const sumNew = nums[i] + nums[L] + nums[R]
            min = Math.abs(sumNew - target) < Math.abs(min - target) ? sumNew : min
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
// 11. 盛最多水的容器
// 给你 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0) 。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
// 输入：[1,8,6,2,5,4,8,3,7]
// 输出：49 
// 解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。
// 输入：height = [1,1]
// 输出：1
// 输入：height = [4,3,2,1,4]
// 输出：16
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


/***************动态规划DP*****************/
// 最小硬币找零
function minCoinChange (coins, amount) {
    const cache = []
    const makeChange = (value) => {
        if (!value) return []
        let min = [];
        let newMin = []
        let newAmount = 0
        for (let i = 0; i < coins.length; i++) {
            newAmount = value - coins[i]
            if (newAmount >= 0) {
                newMin = makeChange(newAmount)
            }
            if (newAmount >= 0 && 
                (newMin.length < (min.length - 1) || !min.length) &&
                (!newAmount || newMin.length)) {
                    min = [...newMin, coins[i]]
                }
        }
        return (cache[value] = min)
    }
    makeChange(amount)
    return cache[amount]
}
// 53. 最大子序和 
// 输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
// 输出：6
// 解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。
// 输入：nums = [1]
// 输出：1
// 输入：nums = [0]
// 输出：0
// 输入：nums = [-1]
// 输出：-1
// 输入：nums = [-100000]
// 输出：-100000
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    const dp = [];
    dp[0] = nums[0];
    for (let i = 1; i < nums.length; i++) {
        dp[i] = Math.max(dp[i - 1] + nums[i], nums[i]);
        // debugger
    }
    return Math.max(...dp)
};
/***************回溯*****************/
// 全排列
// 输入: nums = [1,2,3]
function allSort (arr) {
    const result = [];
    function combin (target, left) {
        if (target.length === arr.length) {
            result.push(target)
            return
        }

        for (let i = 0; i < left.length; i++) {
            const cur = left[i]
            combin([...target, cur], left.filter(el => el !== cur))
        }
    }
    combin([], arr) 
    return result
}
/***************递归*****************/
// 计算阶乘
function factorial (n) {
    if( n <= 1 ) {
        return n
    };
    console.trace()
    return factorial(n - 1) * n;
}
function addRecursive (n) {
    if (n < 1) return 0
    return n + add(n - 1)
}

// 尾调用优化
// 递归函数在调用自身后直接传回其值，而不对其"运算"（return语句不能包含表达式）
// 遗憾的是，大多数编程语言没有针对尾递归做优化，所以，即使把上面的fact(n)函数改成尾递归方式，也会导致栈溢出。
function factorial1(n, total = 1) {
    if (n === 1) {
        return total;
    }
    return factorial1(n - 1, n * total);
}

// 数据结构

/****************数组****************/
//1. 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
// 给定 nums = [2, 7, 11, 15], target = 9
// 因为 nums[0] + nums[1] = 2 + 7 = 9 所以返回 [0, 1]
const twoSum = function(nums, target) {
    const map = {};
    for (let i = 0; i < nums.length; i++) {
        if (map[target - nums[i]] !== undefined) {
            return [map[target - nums[i]], i]
        }
        map[nums[i]] = i
    }
};
// 350. 两个数组的交集 II
// 给定两个数组，编写一个函数来计算它们的交集。
// 输入：nums1 = [1,2,2,1], nums2 = [2,2]
// 输出：[2,2]
// 输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
// 输出：[4,9]
 var intersect = function(nums1, nums2) {
    const result = [];
    for (let i = 0; i < nums1.length; i++) {
        for (let j = 0; j < nums2.length; j++) {
            if (nums1[i] === nums2[j]) {
                result.push(nums2[j])
                nums1.splice(i--, 1)
                nums2.splice(j--, 1)
            }
        }
    }
    return result
};

// 3.三数求和问题
// 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。
// 给定数组 nums = [-1, 0, 1, 2, -1, -4]， 满足要求的三元组集合为： [ [-1, 0, 1], [-1, -1, 2] ]
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    if (nums.length < 3) return []
    nums = nums.sort((a, b) => a - b)
    const result = []

    for (let i = 0; i < nums.length; i++) {
        let L = i + 1, R = nums.length - 1

        if (i >= 1 && nums[i] === nums[i - 1]) {
            continue
        }
        if (nums[i] > 0) return result

        while (L < R) {
            const sum = nums[i] + nums[L] + nums[R]
            if (sum === 0) {
                result.push([nums[i], nums[L], nums[R]])
                while (nums[L] === nums[L + 1] && (L + 1) < R) {
                    L++
                }
                while (nums[R] === nums[R - 1] && L < (R - 1)) {
                    R--
                }
                L ++
                R --
            } else if (sum > 0) {
                R = R - 1
            } else if (sum < 0){
                L = L + 1
            }
        }
    }
    return result
};
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
    let L = 0, R = height.length - 1, max = 0;
    if (height[L] < height[R]) {
        max = Math.max(height[L] * (R - L), max);
        L++
    } else {
        max = Math.max(height[R] * (R - L), max);
        R--
    }
    return max;
 }

/***************字符串*****************/
// 14. 最长公共前缀
// 编写一个函数来查找字符串数组中的最长公共前缀。
// 如果不存在公共前缀，返回空字符串 ""。

// 输入：strs = ["flower","flow","flight"]
// 输出："fl"

// 输入：strs = ["dog","racecar","car"]
// 输出：""
// 解释：输入不存在公共前缀。
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    if (!strs.length) return ''
    let res = strs[0];
    for (let i = 1; i < strs.length; i++) {
        let j = 0, str = strs[i];
        let newRes = ''
        while (res.charAt(j) && str.charAt(j)) {
            if (res.charAt(j) === str.charAt(j)) {
                newRes += res.charAt(j)
                j++
            } else {
                break
            }
        }
        res = newRes
    }
    return res
};
// 最长回文子串5
// 给你一个字符串 s，找到 s 中最长的回文子串。
// 输入：s = "babad"
// 输出："bab"
// 解释："aba" 同样是符合题意的答案。
// 输入：s = "cbbd"
// 输出："bb"
// 输入：s = "a"
// 输出："a"
// 输入：s = "ac"
// 输出："a"
var longestPalindrome = function(s) {
    if (s.length < 2) return s;
    let max = s[0]
    for (let i = 0; i < s.length; i++) {
        for (let j = i + 1; j <= s.length; j ++) {
            const temp = s.slice(i, j)
            if (checkReverse(temp)) {
                max = temp.length > max.length ? temp : max
            }
        }
    }
    return max
    function checkReverse (s) {
        for (let i = 0; i < s.length; i ++) {
            if (s.charAt(i) !== s.charAt(s.length - 1 - i)) {
                return false
            }
        }
        return true
    }
};

// 3. 无重复字符的最长子串
// 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。
// 输入: s = "abcabcbb"
// 输出: 3 
// 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
// 输入: s = "bbbbb"
// 输出: 1
// 解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
// 输入: s = "pwwkew"
// 输出: 3
// 解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
//      请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
// 输入: s = ""
// 输出: 0
var lengthOfLongestSubstring = function(s) {
    // 超时
    // if (s.length < 2) return s.length
    // let max = 0
    // for (let i = 0; i < s.length; i++) {
    //     for (j = i + 1; j <= s.length; j++) {
    //         const temp = s.slice(i, j);
    //         if (checNoRepeat(temp) && temp.length > max) {
    //             max = temp.length
    //         }
    //     }
    // }
    // return max
    function checNoRepeat (s) {
        const map = {}
        for (let i = 0; i < s.length; i ++) {
            const item = s[i]
            if (map[item]) {
                return false
            } else {
                map[item] = 1
            }
        }
        return true
    }
    if (s.length < 2) return s.length
    let max = 0
    let L = 0, R = L + 1
    while (L < s.length && R <= s.length && L < R) {
        const temp = s.slice(L, R)
        if (checNoRepeat(temp)) {
            max = Math.max(max, temp.length)
            R ++
        } else {
            L ++
        }
    }
    return max
};

/**************链表******************/
// 反转链表，合并两个有序链表，判断循环链表，删除倒数n个节点
//  1.将两个有序链表合并为一个新的有序链表并返回。新链表是通过拼接给定的两个链表的所有结点组成的。 
//  输入：1->2->4, 1->3->4 输出：1->1->2->3->4->4
function mergeTwoLists(l1, l2) {
    let head = l1.val > l2.val ? l2 : l1
    let cur = head
    while (l1 && l2) {
        if (l1.val < l2.val) {
            const l1Next = l1.next
            l1.next = l2
            cur = l2
            l1 = l1Next
        } else {
            const l2Next = l2.next
            l2.next = l1
            cur = l1
            l2 = l2Next
        }
    }
    cur.next = l1 || l2

    return head
}

// 2.真题描述：给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次。
// 输入: 1->1->2
// 输出: 1->2
// 示例 2:
// 输入: 1->1->2->3->3
// 输出: 1->2->3

function deleteDuplicates (head) {
    let cur = head
    let next = cur.next
    while (next) {
        if (next.val === cur.val) {
            cur.next = next.next
        } else {
            cur.next = next
        }
    }
    return head
}

// 3.给定一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。
// 给定一个链表: 1->2->3->4->5, 和 n = 2.
// 当删除了倒数第二个结点后，链表变为 1->2->3->5.
function removeK (head, n) {
    let q = 0
    let s = 0
    let cur = head
    let solw = head
    while (cur) {
        cur = cur.next
        q++
        if (q - n > 0) {
            s++
            solw = solw.next
        }
    }
    solw.next = solw.next.next
    return head
}

// 4.定义一个函数，输入一个链表的头结点，反转该链表并输出反转后链表的头结点。
// 输入: 1->2->3->4->5->NULL
// 输出: 5->4->3->2->1->NULL
function reverseList (head) {
    let cur = head
    while (cur) {
        if (!cur.next) {
            return cur
        }
        const temp = cur.next
        cur.next = pre
        pre = cur
        cur = temp
    }
    return cur
}

// 5.给定一个链表，判断链表中是否有环。
// 输入：[3,2,0,4]（链表结构如下图） 输出：true
// 解释：链表中存在一个环
function cycleList (ListNode) {
    while (ListNode) {
        if (ListNode.flag) {
            return true
        } else {
            ListNode.flag = true
            ListNode = ListNode.next
        }
    }
    return false
}
// 6.判断环的起点
function detectCycle (head) {
    while (head) {
        if (head.flag) {
            return head
        } else {
            head.flag = true
            head = head.next
        }
    }
    return head
}

/****************栈和队列****************/
// 实现队列 栈
// 1.“有效括号”问题
// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
// 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。
// 注意空字符串可被认为是有效字符串。

/****************树****************/
// 判断平衡二叉树，最小深度，二叉搜索树，检测二叉树是否相同
 const rootNode = {
    val: "A",
    left: {
      val: "B",
      left: {
        val: "D"
      },
      right: {
        val: "E"
      }
    },
    right: {
      val: "C",
      right: {
        val: "F"
      }
    }
  };
//  1.翻转二叉树
const invertTree = function(root) {
    if (!root) return root;
    let left = invertTree(root.left)
    let right = invertTree(root.right)
    root.left = right
    root.right = left

    return root;
}

// 最大深度
function maxDeepth (node) {
    if (!node) return 0
    return Math.max(maxDeepth(node.left), maxDeepth(node.right)) + 1
}
// 最小深度
function minDepth (node) {
    if (!node) return 0
    let min = 0
    if (node.left) {
        min = Math.min(minDepth(node.left), min)
    }
    if (node.right) {
        min = Math.min(minDepth(node.right), min)
    }
    return min + 1
}

// 100. 相同的树
// 给你两棵二叉树的根节点 p 和 q ，编写一个函数来检验这两棵树是否相同。
// 如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。
var isSameTree = function(p, q) {
    if (!p && !q) return true

    if (!p || !q) return false

    if (p.val !== q.val) return false

    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
};

// 二叉树题：二叉树遍历的姿势 深度优先
// 先序，中序，后序 ｜ 广度优先
function preorder(root) {
    const result = []
    const find = (node) => {
        if (!node) return 
        // result.push(node.val)
        // ['A', 'B', 'D', 'E', 'C', 'F']
        find(node.left)
        result.push(node.val)
        //  ['D', 'B', 'E', 'A', 'C', 'F']
        find(node.right)
        // result.push(node.val)
        //  ['D', 'E', 'B', 'F', 'C', 'A']
    }
    find(root)
    return result
}
function bfs (root) {
    if (!root) return
    const result = []
    const nodeItems = []
    nodeItems.push(root)
    while (nodeItems.length) {
        const item = nodeItems.shift()
        result.push(item.val)
        if (item && item.left) {
            nodeItems.push(item.left)
        }
        if (item && item.right) {
            nodeItems.push(item.right)
        }
    }
    
    return result
}
