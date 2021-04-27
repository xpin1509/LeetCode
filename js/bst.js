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
