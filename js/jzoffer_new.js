// 剑指 Offer 06. 从尾到头打印链表

// 输入一个链表的头节点，从尾到头反过来返回每个节点的值（用数组返回）。

// 输入：head = [1,3,2]
// 输出：[2,3,1]

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
var reversePrint = function (head) {
  if (!head) return [];
  const result = [];
  let cur = head;
  while (cur) {
    result.unshift(cur.val);
    cur = cur.next;
  }
  return result;
};

// 剑指 Offer 07. 重建二叉树
// 输入某二叉树的前序遍历和中序遍历的结果，请重建该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。
// 如，给出

// 前序遍历 preorder = [3,9,20,15,7]
// 中序遍历 inorder = [9,3,15,20,7]
// 返回如下的二叉树：

//     3
//    / \
//   9  20
//     /  \
//    15   7
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
    if (!preorder.length || !inorder.length) {
        return null
    }

    const rootVal = preorder[0]
    const node = new TreeNode(rootVal)

    const index = inorder.findIndex(e => rootVal === e)

    node.left = buildTree(preorder.slice(1, index + 1), inorder.slice(0, index))

    node.right = buildTree(preorder.slice(index + 1), inorder.slice(index + 1))

    return node
};

// 剑指 Offer 09. 用两个栈实现队列
// 用两个栈实现一个队列。队列的声明如下，请实现它的两个函数 appendTail 和 deleteHead ，分别完成在队列尾部插入整数和在队列头部删除整数的功能。(若队列中没有元素，deleteHead 操作返回 -1 )
// 输入：
// ["CQueue","appendTail","deleteHead","deleteHead"]
// [[],[3],[],[]]
// 输出：[null,null,3,-1]

// 输入：
// ["CQueue","deleteHead","appendTail","appendTail","deleteHead","deleteHead"]
// [[],[],[5],[2],[],[]]
// 输出：[null,-1,null,null,5,2]

var CQueue = function () {
  this.list = [];
};

/**
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function (value) {
  this.list.push(value);
};

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function () {
  const result = this.list.shift();
  return result || -1;
};

// 剑指 Offer 11. 旋转数组的最小数字
// 把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。
// 输入一个递增排序的数组的一个旋转，输出旋转数组的最小元素。
// 例如，数组 [3,4,5,1,2] 为 [1,2,3,4,5] 的一个旋转，该数组的最小值为1。  

// 输入：[3,4,5,1,2]
// 输出：1

// 输入：[2,2,2,0,1]
// 输出：0
/**
 * @param {number[]} numbers
 * @return {number}
 */
var minArray = function(numbers) {
    let len = numbers.length
    let min = numbers[0]
    for (let i = 1; i < len; i++) {
        if (numbers[i] < min) {
            min = numbers[i]
        }
    }
    return min
};

// 剑指 Offer 12. 矩阵中的路径
// 给定一个 m x n 二维字符网格 board 和一个字符串单词 word 。如果 word 存在于网格中，返回 true ；否则，返回 false 。

// 单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。

// 例如，在下面的 3×4 的矩阵中包含单词 "ABCCED"（单词中的字母已标出）。

// 输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
// 输出：true

// 输入：board = [["a","b"],["c","d"]], word = "abcd"
// 输出：false

/**
 * 超时了，TODO
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
    if (!board.length) return false
    const wid = board.length
    const hig = board[0].length
    const result = []
    function combin (target, left) {
        if (target.length === word.length) {
            result.push(target)
            return
        }
        if (!left.length) return
        for (let i = 0; i < left.length; i++) {
            const cur = left[i]
            const result = [...target, cur]
            const index = result.length
            combin(result, findLeft(...cur.split(','), index, result))
        }
    }
    const left = []
    for (let i = 0; i < wid; i++) {
        for (let j = 0; j < hig; j++) {
            if (board[i][j] === word[0]) {
                left.push(`${i},${j}`)
            }
        }
    }
    combin([], left)

    function findLeft (w, h, index, setted) {
        w = Number(w) 
        h = Number(h)
        const map = {}
        setted.map(el => {
            map[el] = 1
        })
        const result = []
        if (board[w - 1] && board[w - 1][h] && word[index] === board[w - 1][h] && !map[`${w - 1},${h}`]) {
            result.push(`${w - 1},${h}`)
        }
        if (board[w + 1] && board[w + 1][h] && word[index] === board[w + 1][h] && !map[`${w + 1},${h}`]) {
            result.push(`${w + 1},${h}`)
        }
        if (board[w] && board[w][h - 1] && word[index] === board[w][h - 1] && !map[`${w},${h - 1}`]) {
            result.push(`${w},${h - 1}`)
        }
        if (board[w] && board[w][h + 1] && word[index] === board[w][h + 1] && !map[`${w},${h + 1}`]) {
            result.push(`${w},${h + 1}`)
        }
        
        return result
    }
    return !!result.length
};

// 剑指 Offer 13. 机器人的运动范围
// 地上有一个m行n列的方格，从坐标 [0,0] 到坐标 [m-1,n-1] 。
// 一个机器人从坐标 [0, 0] 的格子开始移动，它每次可以向左、右、上、下移动一格（不能移动到方格外），
// 也不能进入行坐标和列坐标的数位之和大于k的格子。例如，当k为18时，机器人能够进入方格 [35, 37] ，因为3+5+3+7=18。但它不能进入方格 [35, 38]，因为3+5+3+8=19。请问该机器人能够到达多少个格子？

// 输入：m = 2, n = 3, k = 1
// 输出：3

// 输入：m = 3, n = 1, k = 0
// 输出：1
/**
 * @param {number} m
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var movingCount = function(m, n, k) {

};

// 剑指 Offer 15. 二进制中1的个数
// 请实现一个函数，输入一个整数（以二进制串形式），输出该数二进制表示中 1 的个数。
// 例如，把 9 表示成二进制是 1001，有 2 位是 1。因此，如果输入 9，则该函数输出 2。

// 输入：00000000000000000000000000001011
// 输出：3
// 解释：输入的二进制串 00000000000000000000000000001011 中，共有三位为 '1'。

// 输入：00000000000000000000000010000000
// 输出：1
// 解释：输入的二进制串 00000000000000000000000010000000 中，共有一位为 '1'。

// 输入：11111111111111111111111111111101
// 输出：31
// 解释：输入的二进制串 11111111111111111111111111111101 中，共有 31 位为 '1'。
/**
 * @param {number} n - a positive integer
 * @return {number}
 */
 var hammingWeight = function(n) {
    const str = n.toString(2)
    let len = str.length
    let result = 0
    while(len >= 0) {
        if (str.charAt(len) == 1) {
            result += 1
        }
        len --
    }
    return result
};

// 剑指 Offer 17. 打印从1到最大的n位数
// 输入数字 n，按顺序打印出从 1 到最大的 n 位十进制数。比如输入 3，则打印出 1、2、3 一直到最大的 3 位数 999。

// 输入: n = 1
// 输出: [1,2,3,4,5,6,7,8,9]

// 说明：

// 用返回一个整数列表来代替打印
// n 为正整数

/**
 * @param {number} n
 * @return {number[]}
 */
var printNumbers = function (n) {
  const end = 10 ** n - 1;
  const result = [];
  let i = 1;
  while (i <= end) {
    result.push(i);
    i++
  }
  return result;
};

// 剑指 Offer 18. 删除链表的节点
// 给定单向链表的头指针和一个要删除的节点的值，定义一个函数删除该节点。

// 返回删除后的链表的头节点。

// 输入: head = [4,5,1,9], val = 5
// 输出: [4,1,9]
// 解释: 给定你链表中值为 5 的第二个节点，那么在调用了你的函数之后，该链表应变为 4 -> 1 -> 9.

// 输入: head = [4,5,1,9], val = 1
// 输出: [4,5,9]
// 解释: 给定你链表中值为 1 的第三个节点，那么在调用了你的函数之后，该链表应变为 4 -> 5 -> 9.

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var deleteNode = function(head, val) {
    if (head.val === val) return head.next
    let pre = head, cur = head.next

    while (cur && cur.val !== val) {
        pre = cur
        cur = cur.next
    }

    if (cur) pre.next = cur.next
    return head
};

// 剑指 Offer 21. 调整数组顺序使奇数位于偶数前面
// 输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有奇数位于数组的前半部分，所有偶数位于数组的后半部分。
// 输入：nums = [1,2,3,4]
// 输出：[1,3,2,4] 
// 注：[3,1,2,4] 也是正确的答案之一。

/**
 * @param {number[]} nums
 * @return {number[]}
 */
 var exchange = function(nums) {
    const odd = []
    const even = []
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] % 2 === 0) {
            even.push(nums[i])
        } else if (nums[i] % 2 === 1) {
            odd.push(nums[i])
        }
    }
    return [...odd, ...even]
};

// 剑指 Offer 22. 链表中倒数第k个节点
// 输入一个链表，输出该链表中倒数第k个节点。为了符合大多数人的习惯，本题从1开始计数，即链表的尾节点是倒数第1个节点。

// 例如，一个链表有 6 个节点，从头节点开始，它们的值依次是 1、2、3、4、5、6。这个链表的倒数第 3 个节点是值为 4 的节点。

// 给定一个链表: 1->2->3->4->5, 和 k = 2.

// 返回链表 4->5.
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var getKthFromEnd = function(head, k) {
    let low = head
    let fast = head
    let n = 0
    while (fast) {
        fast = fast.next
        if (n >= k) {
            low = low.next
        }
        n++
    }
    return low
};

// 剑指 Offer 24. 反转链表
// 定义一个函数，输入一个链表的头节点，反转该链表并输出反转后链表的头节点。

// 输入: 1->2->3->4->5->NULL
// 输出: 5->4->3->2->1->NULL
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    let pre = null
    let cur = head
    while (cur) {
        const temp = cur.next
        cur.next = pre
        prev = cur
        cur = temp
    }
    return pre
};

// 剑指 Offer 25. 合并两个排序的链表
// 输入两个递增排序的链表，合并这两个链表并使新链表中的节点仍然是递增排序的。

// 输入：1->2->4, 1->3->4
// 输出：1->1->2->3->4->4
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
    let head = new ListNode()
    let cur = head
    while (l1 && l2) {
        if (l1.val < l2.val) {
            cur.next = l1
            l1 = l1.next
        } else {
            cur.next = l2
            l2 = l2.next
        }
        cur = cur.next
    }
    cur.next = l1 != null ? l1 : l2
    return head.next
};


// 剑指 Offer 27. 二叉树的镜像
// 请完成一个函数，输入一个二叉树，该函数输出它的镜像。

// 例如输入：

//      4
//    /   \
//   2     7
//  / \   / \
// 1   3 6   9
// 镜像输出：

//      4
//    /   \
//   7     2
//  / \   / \
// 9   6 3   1

// 输入：root = [4,2,7,1,3,6,9]
// 输出：[4,7,2,9,6,3,1]
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
 var mirrorTree = function(root) {
    if (!root) return null
    const right = root.right

    const left = root.left

    root.left = mirrorTree(right)

    root.right = mirrorTree(left)

    return root
};

// 剑指 Offer 28. 对称的二叉树
// 请实现一个函数，用来判断一棵二叉树是不是对称的。如果一棵二叉树和它的镜像一样，那么它是对称的。

// 例如，二叉树 [1,2,2,3,4,4,3] 是对称的。

//     1
//    / \
//   2   2
//  / \ / \
// 3  4 4  3
// 但是下面这个 [1,2,2,null,3,null,3] 则不是镜像对称的:

//     1
//    / \
//   2   2
//    \   \
//    3    3

// 输入：root = [1,2,2,3,4,4,3]
// 输出：true

// 输入：root = [1,2,2,null,3,null,3]
// 输出：false
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root) {
    if (root === null) return true
    function recur (left, right) {
        if (left === null && right === null) return true

        if (left === null || right === null || right.val !== left.val) return false

        return recur(left.left, right.right) && recur(left.right, right.left)
    }
    return recur(root.left, root.right)
};

// 剑指 Offer 29. 顺时针打印矩阵
// 输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字。
// 示例 1：

// 输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
// 输出：[1,2,3,6,9,8,7,4,5]
// 示例 2：

// 输入：matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
// 输出：[1,2,3,4,8,12,11,10,9,5,6,7]
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
 var spiralOrder = function(matrix) {

};


// 剑指 Offer 30. 包含min函数的栈
// 定义栈的数据结构，请在该类型中实现一个能够得到栈的最小元素的 min 函数在该栈中，
// 调用 min、push 及 pop 的时间复杂度都是 O(1)。
// 例:

// MinStack minStack = new MinStack();
// minStack.push(-2);
// minStack.push(0);
// minStack.push(-3);
// minStack.min();   --> 返回 -3.
// minStack.pop();
// minStack.top();      --> 返回 0.
// minStack.min();   --> 返回 -2.

/**
 * initialize your data structure here.
 */
var MinStack = function() {
    this.stack = []
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
    this.stack.unshift(x)
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    this.stack.shift()
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    return this.stack[0]
};

/**
 * @return {number}
 */
MinStack.prototype.min = function() {
    let min = this.top()
    for (let i of this.stack) {
        if (i < min) {
            min = i
        }
    }
    return min
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.min()
 */

// 剑指 Offer 32 - I. 从上到下打印二叉树
// 从上到下打印出二叉树的每个节点，同一层的节点按照从左到右的顺序打印。
//  
// 给定二叉树: [3,9,20,null,null,15,7],

//     3
//    / \
//   9  20
//     /  \
//    15   7

// [3,9,20,15,7]
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var levelOrder = function(root) {
    if (!root) return []
    const result = []

    let treeLeft = [root]

    while (treeLeft.length) {
        const temp = []
        const res = []
        for (let i of treeLeft) {
            res.push(i.val)
            if (i.left) {
                temp.push(i.left)
            }
    
            if (i.right) {
                temp.push(i.right)
            }
        }
        treeLeft = temp
        result.push(res)
    }
    return result
};


//  剑指 Offer 32 - II. 从上到下打印二叉树 II
//  从上到下按层打印二叉树，同一层的节点按从左到右的顺序打印，每一层打印到一行。

// 给定二叉树: [3,9,20,null,null,15,7],

//     3
//    / \
//   9  20
//     /  \
//    15   7
// 返回其层次遍历结果：

// [
//   [3],
//   [9,20],
//   [15,7]
// ]

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
    if (!root) return []
    let result = []

    let treeLeft = [root]

    while (treeLeft.length) {
        const temp = []
        const res = []
        for (let i of treeLeft) {
            res.push(i.val)
            if (i.left) {
                temp.push(i.left)
            }
    
            if (i.right) {
                temp.push(i.right)
            }
        }
        treeLeft = temp
        result = result.concat(res)
    }
    return result
};

// 剑指 Offer 32 - III. 从上到下打印二叉树 III
// 请实现一个函数按照之字形顺序打印二叉树，即第一行按照从左到右的顺序打印，第二层按照从右到左的顺序打印，第三行再按照从左到右的顺序打印，其他行以此类推。

// 给定二叉树: [3,9,20,null,null,15,7],

//     3
//    / \
//   9  20
//     /  \
//    15   7
// 返回其层次遍历结果：

// [
//   [3],
//   [20,9],
//   [15,7]
// ]
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
    if (!root) return []
    let result = []

    let treeLeft = [root]
    let i = 0

    while (treeLeft.length) {
        const temp = []
        const res = []
        for (let i of treeLeft) {
            res.push(i.val)
            if (i.left) {
                temp.push(i.left)
            }
    
            if (i.right) {
                temp.push(i.right)
            }
        }
        treeLeft = temp
        result.push(i % 2 === 1 ? res.reverse() : res)
        i++
    }
    return result
};

// 剑指 Offer 39. 数组中出现次数超过一半的数字
// 数组中有一个数字出现的次数超过数组长度的一半，请找出这个数字。

// 你可以假设数组是非空的，并且给定的数组总是存在多数元素。

//  
// 输入: [1, 2, 3, 2, 2, 2, 5, 4, 2]
// 输出: 2
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
    const map = new Map()

    const len = nums.length / 2

    for (let i of nums) {
        if (map.has(i)) {
            const before = map.get(i)
            map.set(i, before + 1)
        } else {
            map.set(i, 1)
        }
    }
    for (let [key, value] of map) {
        if (value > len) {
            return key
        }
    }
};


// 剑指 Offer 40. 最小的k个数
// 输入整数数组 arr ，找出其中最小的 k 个数。例如，输入4、5、1、6、2、7、3、8这8个数字，则最小的4个数字是1、2、3、4。
// 示例 1：

// 输入：arr = [3,2,1], k = 2
// 输出：[1,2] 或者 [2,1]
// 示例 2：

// 输入：arr = [0,1,2,1], k = 1
// 输出：[0]
/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
var getLeastNumbers = function(arr, k) {
    if (k === 0 || arr.length === 0) return []

    class Queue {
        constructor (k) {
            this.length = k
            this.list = []
        }
        doPush (x) {
            // 满了且大于最后一个，退出
            if (this.list.length === this.length && x > this.list[this.list.length - 1]) {
                return
            } else if (this.list.length === this.length && x < this.list[this.list.length - 1]) {
                // 满了，不大于最后一个，按次序插入，删掉最后一个
                this.insert(x)
                this.pop()
            } else if (this.list.length < this.length) {
                // 不满找到，大于的地方插入、
                this.insert(x)
            }
        }
        insert (x) {
            for (let i = 0; i < this.list.length; i++) {
                const item = this.list[i]
                if (x <= item) {
                    return this.list.splice(i, 0, x)
                }
            }
            return this.list.push(x)
        }
        pop () {
            this.list.pop()
        }
        getVal () {
            return this.list
        }
    }

    const result = new Queue(k)

    for (let i of arr) {
        result.doPush(i)
    }

    return result.getVal()
};


// 剑指 Offer 42. 连续子数组的最大和
// 输入一个整型数组，数组中的一个或连续多个整数组成一个子数组。求所有子数组的和的最大值。

// 要求时间复杂度为O(n)。

// 输入: nums = [-2,1,-3,4,-1,2,1,-5,4]
// 输出: 6
// 解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    // 1.暴力法 O(n^2)
    // if (!nums.length) return 0
    // let result = nums[0]
    // for (let i = 0; i < nums.length; i++) {
    //     let tempRes = [nums[i]], total = nums[i]
    //     for (let j = i + 1; j < nums.length; j++) {
    //         total += nums[j]
    //         tempRes.push(total)
    //     }
    //     const tempMax = Math.max(...tempRes)
    //     if (tempMax > result) {
    //         result = tempMax
    //     }
    // }
    // return result

    // dp动态规划
    let res = nums[0]
    for (let i = 1; i < nums.length; i++) {
        nums[i] += Math.max(nums[i - 1], 0)
        res = Math.max(res, nums[i])
    }
    return res
};


// 剑指 Offer 50. 第一个只出现一次的字符
// 在字符串 s 中找出第一个只出现一次的字符。如果没有，返回一个单空格。 s 只包含小写字母。

// s = "abaccdeff"
// 返回 "b"

// s = "" 
// 返回 " "

/**
 * @param {string} s
 * @return {character}
 */
var firstUniqChar = function(s) {
    const map = {}
    for (let i of s) {
        if (map[i]) {
            map[i] += 1
        } else {
            map[i] = 1
        }
    }
    let result = ' '
    for (let i of Object.entries(map)) {
        const [key, value] = i
        if (value === 1) {
            result = key
            break
        } 
    }
    return result
};

// 剑指 Offer 53 - I. 在排序数组中查找数字 I
// 统计一个数字在排序数组中出现的次数。

// 输入: nums = [5,7,7,8,8,10], target = 8
// 输出: 2

// 输入: nums = [5,7,7,8,8,10], target = 6
// 输出: 0
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    const map = new Map();
    for (num of nums) {
        if (map.has(num)) {
            const times = map.get(num)
            map.set(num, times + 1)
        } else {
            map.set(num, 1)
        }
    }
    if (map.has(target)) return map.get(target)
    return 0
};


// 剑指 Offer 53 - II. 0～n-1中缺失的数字
// 一个长度为n-1的递增排序数组中的所有数字都是唯一的，并且每个数字都在范围0～n-1之内。
// 在范围0～n-1内的n个数字中有且只有一个数字不在该数组中，请找出这个数字。

// 输入: [0,1,3]
// 输出: 2

// 输入: [0,1,2,3,4,5,6,7,9]
// 输出: 8

/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function(nums) {
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== i) return i
    }
    return nums.length ? nums[nums.length - 1] + 1 : 0
};

// 剑指 Offer 54. 二叉搜索树的第k大节点
// 给定一棵二叉搜索树，请找出其中第k大的节点。

// 输入: root = [3,1,4,null,2], k = 1
//    3
//   / \
//  1   4
//   \
//    2
// 输出: 4

// 输入: root = [5,3,6,2,4,null,null,1], k = 3
//        5
//       / \
//      3   6
//     / \
//    2   4
//   /
//  1
// 输出: 4
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
 var kthLargest = function(root, k) {

};


// 剑指 Offer 55 - I. 二叉树的深度
// 输入一棵二叉树的根节点，求该树的深度。
// 从根节点到叶节点依次经过的节点（含根、叶节点）形成树的一条路径，最长路径的长度为树的深度。

// 给定二叉树 [3,9,20,null,null,15,7]

//     3
//    / \
//   9  20
//     /  \
//    15   7
// 返回它的最大深度 3 。
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
    if (!root) return 0;
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
};


// 剑指 Offer 55 - II. 平衡二叉树
// 输入一棵二叉树的根节点，判断该树是不是平衡二叉树。如果某二叉树中任意节点的左右子树的深度相差不超过1，那么它就是一棵平衡二叉树。

// 给定二叉树 [3,9,20,null,null,15,7]

//     3
//    / \
//   9  20
//     /  \
//    15   7
// 返回 true 。

// 给定二叉树 [1,2,2,3,3,null,null,4,4]

//        1
//       / \
//      2   2
//     / \
//    3   3
//   / \
//  4   4
//  返回 false 。
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function(root) {
    function recur (root) {
        if (!root) return 0
        const left = recur(root.left)
        if (left === -1) return -1
        const right = recur(root.right)
        if (right === -1) return -1
        return Math.abs(left - right) < 2 ? Math.max(left, right) + 1 : -1
    }

    return recur(root) !== -1
};


// 剑指 Offer 57. 和为s的两个数字
// 输入一个递增排序的数组和一个数字s，在数组中查找两个数，使得它们的和正好是s。如果有多对数字的和等于s，则输出任意一对即可。

// 输入：nums = [2,7,11,15], target = 9
// 输出：[2,7] 或者 [7,2]
// 示例 2：

// 输入：nums = [10,26,30,31,47,60], target = 40
// 输出：[10,30] 或者 [30,10]
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // if (nums.length < 2) return [];
    // for (var i = 0; i < nums.length; i++) {
    //     if (nums[i] >= target) continue
    //     for (let j = 0; j < nums.length; j++) {
    //         if (nums[i] + nums[j]=== target) {
    //             return [nums[i], nums[j]]
    //         } else if (nums[i] + nums[j] > target) {
    //             break
    //         }
    //     }
    // }
    // return []
    let i = 0; j = nums.length - 1;
    while (i < j) {
        let s = nums[i] + nums[j]
        if (s < target) {
            i++
        } else if (s > target){
            j --
        } else {
            return [nums[i], nums[j]]
        }
    }
    return []
};

// 剑指 Offer 57 - II. 和为s的连续正数序列
// 输入一个正整数 target ，输出所有和为 target 的连续正整数序列（至少含有两个数）。

// 序列内的数字由小到大排列，不同序列按照首个数字从小到大排列。

// 输入：target = 9
// 输出：[[2,3,4],[4,5]]

// 输入：target = 15
// 输出：[[1,2,3,4,5],[4,5,6],[7,8]]
/**
 * @param {number} target
 * @return {number[][]}
 */
var findContinuousSequence = function(target) {
    // const result = []
    // function combin (current, left) {
    //     const total = current.reduce((total, cur) => total + cur, 0);
    //     if (total === target) {
    //         return result.push(current)
    //     }
    //     combin([...current, cur], left.filter(el => el > cur))
    // }
    // combin([], getLeftNum(1, 9))

    function getLeftNum (start, end) {
        const result = []
        for (let i = start; i <= end; i++) {
            result.push(i)
        }
        return result
    }

    const resultArr = []
    for (let i = 1; i < target; i++) {
        let result = i
        for (let j = i + 1; j < target; j++) {
            result += j
            if (result === target) {
                resultArr.push(getLeftNum(i, j))
            } else if (result > target) {
                break
            }
        }
    }
    return resultArr
};

// 剑指 Offer 58 - I. 翻转单词顺序
// 输入一个英文句子，翻转句子中单词的顺序，但单词内字符的顺序不变。
// 为简单起见，标点符号和普通字母一样处理。例如输入字符串"I am a student. "，则输出"student. a am I"。

// 输入: "the sky is blue"
// 输出: "blue is sky the"

// 输入: "  hello world!  "
// 输出: "world! hello"
// 解释: 输入字符串可以在前面或者后面包含多余的空格，但是反转后的字符不能包括。

// 输入: "a good   example"
// 输出: "example good a"
// 解释: 如果两个单词间有多余的空格，将反转后单词间的空格减少到只含一个。
//  

// 无空格字符构成一个单词。
// 输入字符串可以在前面或者后面包含多余的空格，但是反转后的字符不能包括。
// 如果两个单词间有多余的空格，将反转后单词间的空格减少到只含一个。
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
    s = s.replace(/\s+/g, ' ')
    const alphaArr = s.split(' ').filter(el => el !== '');
    return alphaArr.reverse().join(' ')
};


// 剑指 Offer 58 - II. 左旋转字符串
// 字符串的左旋转操作是把字符串前面的若干个字符转移到字符串的尾部。请定义一个函数实现字符串左旋转操作的功能。
// 比如，输入字符串"abcdefg"和数字2，该函数将返回左旋转两位得到的结果"cdefgab"。
//  
// 输入: s = "abcdefg", k = 2
// 输出: "cdefgab"

// 输入: s = "lrloseumgh", k = 6
// 输出: "umghlrlose"
/**
 * @param {string} s
 * @param {number} n
 * @return {string}
 */
var reverseLeftWords = function(s, n) {
    const sArr = s.split('')
    while (n--) {
        const char = sArr.shift()
        sArr.push(char)
    }
    return sArr.join('')
};

// 剑指 Offer 61. 扑克牌中的顺子
// 从扑克牌中随机抽5张牌，判断是不是一个顺子，即这5张牌是不是连续的。
// 2～10为数字本身，A为1，J为11，Q为12，K为13，而大、小王为 0 ，可以看成任意数字。A 不能视为 14。

// 输入: [1,2,3,4,5]
// 输出: True
//  
// 输入: [0,0,1,2,5]
// 输出: True

// 数组长度为 5 
// 数组的数取值为 [0, 13] .
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var isStraight = function(nums) {
    nums = nums.filter(el => el)
    if (nums.length === 5) {
        let origin = nums[0]
        for (let i = 1; i < nums.length; i++) {
            if (nums[i] - origin === 1) {
                origin = nums[i]
            } else {
                return false
            }
        }
        return true
    // } else {

    }
    return true
};



// 剑指 Offer 62. 圆圈中最后剩下的数字
// 0,1,···,n-1这n个数字排成一个圆圈，从数字0开始，每次从这个圆圈里删除第m个数字（删除后从下一个数字开始计数）。求出这个圆圈里剩下的最后一个数字。

// 例如，0、1、2、3、4这5个数字组成一个圆圈，从数字0开始每次删除第3个数字，则删除的前4个数字依次是2、0、4、1，因此最后剩下的数字是3。


// 输入: n = 5, m = 3
// 输出: 3

// 输入: n = 10, m = 17
// 输出: 2
/**
 * @param {number} n
 * @param {number} m
 * @return {number}
 */
 var lastRemaining = function(n, m) {

};

// 剑指 Offer 65. 不用加减乘除做加法
// 写一个函数，求两个整数之和，要求在函数体内不得使用 “+”、“-”、“*”、“/” 四则运算符号。

// 输入: a = 1, b = 1
// 输出: 2

// a, b 均可能是负数或 0
// 结果不会溢出 32 位整数
/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
 var add = function(a, b) {

};

// 剑指 Offer 68 - I. 二叉搜索树的最近公共祖先
// 给定一个二叉搜索树, 找到该树中两个指定节点的最近公共祖先。

// 百度百科中最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”

// 例如，给定如下二叉搜索树:  root = [6,2,8,0,4,7,9,null,null,3,5]


// 输入: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
// 输出: 6 
// 解释: 节点 2 和节点 8 的最近公共祖先是 6。

// 输入: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
// 输出: 2
// 解释: 节点 2 和节点 4 的最近公共祖先是 2, 因为根据定义最近公共祖先节点可以为节点本身。
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
 var lowestCommonAncestor = function(root, p, q) {
    
};


// 剑指 Offer 68 - II. 二叉树的最近公共祖先
// 给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。

// 百度百科中最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”

// 例如，给定如下二叉树:  root = [3,5,1,6,2,0,8,null,null,7,4]

// 输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
// 输出: 3
// 解释: 节点 5 和节点 1 的最近公共祖先是节点 3。

// 输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
// 输出: 5
// 解释: 节点 5 和节点 4 的最近公共祖先是节点 5。因为根据定义最近公共祖先节点可以为节点本身。
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
 var lowestCommonAncestor = function(root, p, q) {
    
};