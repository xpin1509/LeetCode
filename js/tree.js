// 搜索二叉树
function BinaryTree () {
    var Node = function (value) {
        this.key = value
        this.left = this.right = null
    }
    var root = null
    var insertNode = function (node, newNode) {
        if (newNode.key < node.key) {
            if (node.left === null) {
                node.left = newNode
            } else {
                insertNode(node.left, newNode)
            }
        } else if (newNode.key > node.key) {
            if (node.right === null) {
                node.right = newNode
            } else {
                insertNode(node.right, newNode)
            }
        }
    }
    this.insert = function (value) {
        const node = new Node(value)
        if (root == null) {
            root = node
        } else {
            insertNode(root, node)
        }
    }
    
    var inOrdertraverse = function (node, callBack) {
        if (node !== null) {
            inOrdertraverse(node.left, callBack)
            callBack(node.key)
            inOrdertraverse(node.right, callBack)
        }
    }
    // 中序遍历
    // 用处：排序
    this.inOrdertraverse = function (callBack) {
        inOrdertraverse(root, callBack)
    }
    var preOrdertraverse = function (node, callBack) {
        if (node !== null) {
            callBack(node.key)
            preOrdertraverse(node.left, callBack)
            preOrdertraverse(node.right, callBack)
        }
    }
    // 前序遍历
    // 用途：拷贝二叉树
    this.preOrdertraverse = function (callBack) {
        preOrdertraverse(root, callBack)
    }

    var postOrdertraverse = function (node, callBack) {
        if (node !== null) {
            postOrdertraverse(node.left, callBack)
            postOrdertraverse(node.right, callBack)
            callBack(node.key)
        }
    }
    // 后序遍历
    // 用处：文件递归访问
    this.postOrdertraverse = function (callBack) {
        postOrdertraverse(root, callBack)
    }

    var minNode = function (node) {
        if (node !== null) {
            while (node && node.left) {
                node = node.left
            }
            return node.key
        }
        return node.key
    }
    // 查找最小值
    this.min = function () {
        return minNode(root)
    }

    var maxNode = function (node) {
        if (node !== null) {
            while (node && node.right) {
                node = node.right
            }
            return node.key
        }
        return node.key
    }
    // 查找最小值
    this.max = function () {
        return maxNode(root)
    }
}

// const arr = [8,9,2,7,3,4,1,5,6]
// const tree = new BinaryTree()
// for (let i of arr) {
//     tree.insert(i)
// }
// console.log(tree.max())


// 94. 二叉树的中序遍历
// 给定一个二叉树，返回它的中序 遍历。

// 输入: [1,null,2,3]
//    1
//     \
//      2
//     /
//    3

// 输出: [1,3,2]

/**
 * 120题之前的二叉树题目
 */

// 110. 平衡二叉树

// 101. 对称二叉树
// 给定一个二叉树，检查它是否是镜像对称的。

// 例如，二叉树 [1,2,2,3,4,4,3] 是对称的。
//     1
//    / \
//   2   2
//  / \ / \
// 3  4 4  3
// 但是下面这个 [1,2,2,null,3,null,3] 则不是镜像对称的:

//     1
//    / \
//   2   2
//    \   \
//    3    3
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
var inorderTraversal = function(root) {
    const result = []
    function helper (root) {
        if (root == null) return
        helper(root.left)
        result.push(root.val)
        helper(root.right)
    }
    helper(root)
    return result
};
// 110. 平衡二叉树
// 104. 二叉树的最大深度
// 给定一个二叉树，找出其最大深度。

// 二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

// 说明: 叶子节点是指没有子节点的节点。

// 示例：
// 给定二叉树 [3,9,20,null,null,15,7]，

var isSymmetric = function(root) {
    function check (left, right) {
        if (left == null && right == null) {
            return true
        }
        if (left == null || right == null) {
            return false
        }
        return left.val === right.val && check(left.left, right.right) && check(left.right, right.left)
    }
    return check(root, root)
};

// 95. 不同的二叉搜索树 II
// 给定一个整数 n，生成所有由 1 ... n 为节点所组成的 二叉搜索树 。

// 输入：3
// 输出：
// [
//   [1,null,3,2],
//   [3,2,null,1],
//   [3,1,null,null,2],
//   [2,1,3],
//   [1,null,2,null,3]
// ]
// 解释：
// 以上的输出对应以下 5 种不同结构的二叉搜索树：

//    1         3     3      2      1
//     \       /     /      / \      \
//      3     2     1      1   3      2
//     /     /       \                 \
//    2     1         2                 3
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number} n
 * @return {TreeNode[]}
 */
var generateTrees = function(n) {
};

// 96. 不同的二叉搜索树
// 给定一个整数 n，求以 1 ... n 为节点组成的二叉搜索树有多少种？

// 输入: 3
// 输出: 5
// 解释:
// 给定 n = 3, 一共有 5 种不同结构的二叉搜索树:

//    1         3     3      2      1
//     \       /     /      / \      \
//      3     2     1      1   3      2
//     /     /       \                 \
//    2     1         2                 3
/**
 * @param {number} n
 * @return {number}
 */
var numTrees = function(n) {

};

// 102. 二叉树的层序遍历
// 给你一个二叉树，请你返回其按 层序遍历 得到的节点值。 （即逐层地，从左到右访问所有节点）。

// 二叉树：[3,9,20,null,null,15,7],
//     3
//    / \
//   9  20
//     /  \
//    15   7
// 返回它的最大深度 3 。
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
 * @return {number}
 */
var maxDepth = function(root) {
    if (root == null) return 0
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
};

// 101. 对称二叉树
// 给定一个二叉树，检查它是否是镜像对称的。
// 例如，二叉树 [1,2,2,3,4,4,3] 是对称的。

//     1
//    / \
//   2   2
//  / \ / \
// 3  4 4  3
//  

// 但是下面这个 [1,2,2,null,3,null,3] 则不是镜像对称的:

//     1
//    / \
//   2   2
//    \   \
//    3    3
/**
 * @return {number[][]}
 */
var levelOrder = function(root) {
    const result = []
    let queue = [root]
    while (queue.length) {
        const arr = []
        const nodeList = []
        const nodeBack = JSON.parse(JSON.stringify(queue))
        for (let i = 0; i < nodeBack.length; i++) {
            if (nodeBack[i] !== null) {
                arr.push(nodeBack[i].val)
                if (nodeBack[i].left !== null) {
                    nodeList.push(nodeBack[i].left)
                }
                if (nodeBack[i].right !== null) {
                    nodeList.push(nodeBack[i].right)
                }
            }
        }
        if (arr.length) { result.push(arr) }
        queue = [...nodeList]
    }
    return result
};

// 107. 二叉树的层次遍历 II
// 给定一个二叉树，返回其节点值自底向上的层次遍历。 （即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历）

// 例如：
// 给定二叉树 [3,9,20,null,null,15,7],

//     3
//    / \
//   9  20
//     /  \
//    15   7
// 返回其自底向上的层次遍历为：

// [
//   [15,7],
//   [9,20],
//   [3]
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
var levelOrderBottom = function(root) {
    const result = []
    let queue = [root]
    while (queue.length) {
        const arr = []
        const nodeList = []
        const nodeBack = JSON.parse(JSON.stringify(queue))
        for (let i = 0; i < nodeBack.length; i++) {
            if (nodeBack[i] !== null) {
                arr.push(nodeBack[i].val)
                if (nodeBack[i].left !== null) {
                    nodeList.push(nodeBack[i].left)
                }
                if (nodeBack[i].right !== null) {
                    nodeList.push(nodeBack[i].right)
                }
            }
        }
        if (arr.length) { result.push(arr) }
        queue = [...nodeList]
    }
    return result.reverse()
};

// 110. 平衡二叉树
// 给定一个二叉树，判断它是否是高度平衡的二叉树。

// 本题中，一棵高度平衡二叉树定义为：
// 一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过1。
// 给定二叉树 [3,9,20,null,null,15,7]

//     3
//    / \
//   9  20
//     /  \
//    15   7
// 返回 true 。

// 示例 2:

// 给定二叉树 [1,2,2,3,3,null,null,4,4]

//        1
//       / \
//      2   2
//     / \
//    3   3
//   / \
//  4   4
// 返回 false 。
 /**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root) {
    if (root === null) return null
    if (root.left === null && root.right === null) {
        return true
    } else if (root.left === null && root.right === null) {
        return false
    } else {
        return isSymmetric(root.left) === isSymmetric(root.right)
    }
}
var isBalanced = function(root) {
    function getPpathLen (node) {
        if (node == null) return 0
        return Math.max(getPpathLen(node.left), getPpathLen(node.right)) + 1
    }
    if (root == null) {
        return true
    } else {
        return Math.abs(getPpathLen(root.left) - getPpathLen(root.right)) <= 1 && isBalanced(root.left) && isBalanced(root.right)
    }
}

// 111. 二叉树的最小深度
// 给定一个二叉树，找出其最小深度。

// 最小深度是从根节点到最近叶子节点的最短路径上的节点数量。

// 说明: 叶子节点是指没有子节点的节点。

// 给定二叉树 [3,9,20,null,null,15,7],
//     3
//    / \
//   9  20
//     /  \
//    15   7
// 返回它的最小深度  2.
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function(root) {
    if (root == null) return 0
    if (root.right == null && root.left == null) {
        return 1
    }
    let minDepthVal = Number.MAX_VALUE
    if (root.left != null) {
        minDepthVal = Math.min(minDepth(root.left), minDepthVal)
    }
    if (root.right != null) {
        minDepthVal = Math.min(minDepth(root.right), minDepthVal)
    }
    return minDepthVal + 1
}



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
