// 反转链表 LeetCode 第 206 题
// Definition for singly-linked list.
function ListNode(val) {
    this.val = val;
    this.next = null;
}
//  进阶：链表可以选用迭代或递归方式完成反转。你能否用两种方法解决这道题
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    let pre = null
    let cur = head
    while (cur) {
        const next = cur.next
        cur.next = pre
        pre = cur
        cur = next
    }
    return pre
};

// const head = new ListNode(1)
// head.next = new ListNode(2)
// head.next.next = new ListNode(3)
// head.next.next.next = new ListNode(4)
// head.next.next.next.next = new ListNode(5)

// console.log(reverseList(head))



// 102. 二叉树的层序遍历
// Definition for a binary tree node.
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
    if (!root) return []
    const result = []

    var queue = []
    queue.push(root)
    
    while(queue.length) {
        const resItem = []
        const items = [...queue]
        const leftLevel = []

        while (items.length) {
            const item = items.shift()
            resItem.push(item.val)
            if (item.left) {
                leftLevel.push(item.left)
            }
            if (item.right) {
                leftLevel.push(item.right)
            }
        }

        result.push(resItem)
        queue = leftLevel
    }
    return result
};

// 144. 二叉树的前序遍历
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function(root) {
    if (!root) return []
    const queue = []
    const result = []
    queue.push(root)
    while (queue.length) {
        const item = queue.pop()
        result.push(item.val)

        if (item.right) queue.push(item.right)
        if (item.left) queue.push(item.left)
    }

    return result
};

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
    const result = []
    const traverse = root => {
        if(root === null) return;
        traverse(root.left)
        result.push(root.val)
        traverse(root.right)
        
    }

    traverse(root)
    return result
};
const node = new TreeNode(1)
node.right = new TreeNode(2)
node.right.left = new TreeNode(3)
node.right.left.left = null
node.right.left.right = null
node.right.right = null

console.log(inorderTraversal(node))

/**145. 二叉树的后序遍历
 * @param {TreeNode} root
 * @return {number[]}
 */
 var postorderTraversal = function(root) {
    const result = []
    const traverse = root => {
        if(root === null) return;
        traverse(root.left)
        
        traverse(root.right)
        result.push(root.val)
    }

    traverse(root)
    return result
};