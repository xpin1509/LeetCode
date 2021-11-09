/********************************
 * 动态规划DP
 ********************************/
// 最小硬币找零
// function minCoinChange (coins, amount) {
//     const cache = [];
//     const makeChange = (value) => {
//         if (!value) {
//             return []
//         }
//         if (cache[value]) {
//             return cache[value]
//         }
//         let min = []
//         let newMin;
//         let newAmount;
//         for (let i = 0; i < coins.length; i++) {
//             const coin = coins[i];
//             newAmount = value - coin;
//             if (newAmount >= 0) {
//                 newMin = makeChange(newAmount)
//             }
//             if (newAmount >= 0 && 
//                 (newMin.length < min.length - 1 || !min.length) && 
//                 (newMin.length || !newAmount)) {
//                     min = [coin].concat(newMin);
//                     console.log('new Min' + min + ' for ' + amount)
//                 }
//         }
//         return (cache[value] = min)
//     }
//     return makeChange(amount)
// }
// console.log(minCoinChange([1, 5, 10, 25], 36))

/********************************
 * 回溯
 ********************************/
// 全排列
// 输入: nums = [1,2,3]


/********************************
 * 数组
 ********************************/
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

// 2.合并两个有序数组
// 给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。
// 输入:
// nums1 = [1,2,3,0,0,0], m = 3
// nums2 = [2,5,6], n = 3
// 输出: [1,2,2,3,5,6]

// 3.三数求和问题
// 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。
// 给定数组 nums = [-1, 0, 1, 2, -1, -4]， 满足要求的三元组集合为： [ [-1, 0, 1], [-1, -1, 2] ]

/********************************
 * 字符串
 ********************************/

/********************************
 * 链表
 * 反转链表，合并两个有序链表，判断循环链表，删除倒数n个节点
 ********************************/
//  1.将两个有序链表合并为一个新的有序链表并返回。新链表是通过拼接给定的两个链表的所有结点组成的。 
//  输入：1->2->4, 1->3->4 输出：1->1->2->3->4->4

// 2.真题描述：给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次。
// 输入: 1->1->2
// 输出: 1->2
// 示例 2:
// 输入: 1->1->2->3->3
// 输出: 1->2->3

// 3.给定一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。
// 给定一个链表: 1->2->3->4->5, 和 n = 2.
// 当删除了倒数第二个结点后，链表变为 1->2->3->5.


// 4.定义一个函数，输入一个链表的头结点，反转该链表并输出反转后链表的头结点。
// 输入: 1->2->3->4->5->NULL
// 输出: 5->4->3->2->1->NULL

// 5.给定一个链表，判断链表中是否有环。
// 输入：[3,2,0,4]（链表结构如下图） 输出：true
// 解释：链表中存在一个环


/********************************
 * 栈和队列
 ********************************/
// 1.“有效括号”问题
// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
// 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。
// 注意空字符串可被认为是有效字符串。

// 滑动窗口问题
// 2.给定一个数组 nums 和滑动窗口的大小 k，请找出所有滑动窗口里的最大值。
// nums = [1,3,-1,-3,5,3,6,7], 和 k = 3 输出: [3,3,5,5,6,7]

/********************************
 * 树
 * 判断平衡二叉树，最小深度，二叉搜索树，检测二叉树是否相同
 ********************************/
 const root = {
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
    if (!root) return null
    
    const right = invertTree(root.right)
    const left = invertTree(root.left)

    root.left = right
    root.right =left
    return root
}

// 最大深度
function maxDeepth (node) {
    if (!node) return 0
    return Math.max(maxDeepth(node.left), maxDeepth(node.right)) + 1
}
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
