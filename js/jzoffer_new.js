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
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
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