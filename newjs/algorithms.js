// 算法的复杂度分析。
// 排序算法，以及他们的区别和优化。
// 数组中的双指针、滑动窗口思想。
// 利用 Map 和 Set 处理查找表问题。
// 链表的各种问题。
// 利用递归和迭代法解决二叉树问题。
// 栈、队列、DFS、BFS。
// 回溯法、贪心算法、动态规划。

/********************************
 * 
 * 数据结构与算法
 * 
 ********************************/

/***************动态规划DP*****************/
// 最小硬币找零
function minCoinChange (coins, amount) {
    if (!amount) {
        return []
    }
    const cache = [];
    function minVal (val) {
        let min = []
        let newMin = [];
        for (let i = 0; i < coins.length; i++) {
            const newAmount = val - coins[i];
            if (newAmount >= 0) {
                newMin = minVal(newAmount)
            }
            
            if (newAmount >= 0 && 
                (newMin.length < min.length - 1 || !min.length) && 
                (newMin.length || !newAmount)) {
                min = [coins[i], ...newMin];
            }
        }
        return (cache[val] = min)
    }

    return minVal(amount)
}

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
// TODO
// 滑动窗口

// 3.三数求和问题
// 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。
// 给定数组 nums = [-1, 0, 1, 2, -1, -4]， 满足要求的三元组集合为： [ [-1, 0, 1], [-1, -1, 2] ]
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    nums = nums.sort((a, b) => a - b)

    if (nums.length < 3) return []
    const result = []
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > 0) {
            return result
        }

        if (i > 0 && nums[i] === nums[i - 1]) {
            continue
        }
        
        var L = i + 1, R = nums.length - 1
        
        while (L < R) {
            const sum = nums[i] + nums[L] + nums[R]
            if (sum === 0) {
                result.push([nums[i], nums[L], nums[R]])
                while (nums[L] === nums[L+1] && L < R) L++;
                while (nums[R] === nums[R-1] && L < R) R--;

                L++
                R--
            } else if (sum < 0) {
                L ++
            } else if (sum > 0) {
                R--
            }
        }
    }
    return result
};

/***************字符串*****************/
// 检测回文

/**************链表******************/
// 反转链表，合并两个有序链表，判断循环链表，删除倒数n个节点
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
function reverseList (ListNode) {
    let pre = null
    let cur = ListNode.Head
    while (cur) {
        let temp = cur.next
        temp.next = pre
        pre = cur
        cur = cur.next
    }
    return pre
}

// 5.给定一个链表，判断链表中是否有环。
// 输入：[3,2,0,4]（链表结构如下图） 输出：true
// 解释：链表中存在一个环
function cycleList (ListNode) {
    let cur = ListNode.Head
    const wp = new WeakMap()
    while(cur) {
        if (wp.has(cur)) {
            return true
        }
        wp.set(cur, 1)
        cur = cur.next
    }
    return false
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
// 最小深度
function minDepth (node) {
    if (!node) return 0
    if (!node.left && !node.right) return 1
    let min = Number.MAX_VALUE
    if (node.left) {
        min = Math.min(minDepth(node.left), min)
    }
    if (node.right) {
        min = Math.min(minDepth(node.right), min)
    }
    return min + 1
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

