// 55. 跳跃游戏 TODO
var canJump = function(nums) {
    let reach = 0;
    for (let i = 0; i < nums.length; i++) {
        if (i > reach) {
            return false;
        } 
        reach = Math.max(reach, nums[i] + i);
    }
    return true;
};
// 翻转二叉树
const reverseRoot = function (root) {
    if (!root) return root;
    const left = reverseRoot(root.left);
    const right = reverseRoot(root.right);

    root.left = right;
    root.right = left;
    return root;
}

function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

// 反转链表
const reverseListNode = function (head) {
    let pre = null
    let cur = head
    while (cur) {
        const temp = cur.next;
        cur.next = pre
        pre = cur
        cur = temp;
    }
    return pre
}

// 合并两个有序链表 TODO
var mergeTwoLists = function(list1, list2) {
    let pre = new ListNode()
    let cur = pre
    while (list1 && list2) {
        if (list1.val < list2.val) {
            cur.next = list1
            list1 = list1.next
        } else {
            cur.next = list2
            list2 = list2.next
        }
        cur = cur.next
    }
    cur.next = list1 || list2
    return pre.next
};

const l1 = new ListNode(1)
l1.next = new ListNode(1)
l1.next.next = new ListNode(1)
l1.next.next.next = new ListNode(1)
l1.next.next.next.next = new ListNode(3)
l1.next.next.next.next.next = null
// const l2 = new ListNode(1)
// l2.next = new ListNode(3)
// l2.next.next = new ListNode(4)
// console.log(reverseListNode(l1))


// 83. 删除排序链表中的重复元素 TODO 一些次数
// 输入: 1->1->2
// 输出: 1->2
// 示例 2:
// 输入: 1->1->2->3->3
// 输出: 1->2->3
var deleteDuplicates = function(head) {
    
    // let pre = head
    // let cur = pre.next
    // while (cur) {
    //     if (cur.val === pre.val) {
    //         cur = cur.next.next
    //     } else {
    //         pre.next = cur
    //         pre = pre.next
    //         cur = cur.next
    //     }
    // }
    // return head
    if (!head) return head

    let cur = head
    while (cur.next) {
        if (cur.val === cur.next.val) {
            cur.next = cur.next.next
        } else {
            cur = cur.next
        }
    }
    return head
};

// promise
class MPromise {
    constructor (executor) {
        this.status = 'pedding'
        this.err = null
        this.succ = null
        this.onFullfilled = []
        this.onRejected = []
        const _this = this
        function resolve (succ) {
            if (_this.status === 'pending') {
                _this.status = 'fullfilled'
                _this.succ = succ
                _this.onFullfilled.forEach(el => {
                    el.call(_this, _this.succ)
                })
            }
        }
        function reject (err) {
            if (_this.status === 'pending') {
                _this.status = 'rejected'
                _this.err = err
                _this.onRejected.forEach(el => {
                    el.call(_this, _this.err)
                })
            }
        }
        executor(resolve, reject)
    }
    then (onresolve, onreject) {
        return new MPromise((r, j) => {
            if (this.status === 'pedding') {
                this.onFullfilled.push(() => {
                    try {
                        onresolve.call(this. this.succ)
                    } catch (e) { }
                })
                this.onRejected.push(onreject)
            } else if (this.status === 'fullfilled') {
                r(onresolve.call(this, this.succ))
            } else if (this.status === 'rejected') {
                j(onreject.call(this, this.err))
            }
        })
    }
}

var deleteDuplicates1 = function(head) {
    let cur = head
    while (cur && cur.next) {
        if (cur.next.val === cur.val) {
            cur.next = cur.next.next
        } else {
            cur = cur.next
        }
    }
    return head
}

// compose
function compose1(mid) {
    if (!mid.length) {
        return (arg) => arg
    } else if (mid.length === 1) {
        return mid[0]
    } else {
        return mid.reverse().reduce((t, c) => {
            return function (...arg) {
                return c(t(...arg))
            }
        })
    }
}

// const composed = compose1([(a) => {
//     console.log('a', a)
//     return a
// }, b => {
//     console.log('b', b)
//     return b
// }, c => {
//     console.log('c', c)
//     return c
// }])
// composed('xpin')
// console.log(composed)

// 平衡二叉树

// 对称二叉树
// 将有序数组转换为二叉搜索树
// 前序遍历，后续遍历，中序遍历 迭代

// 三数求和问题

// 将有序数组转换为二叉搜索树 TODO

// 下一个排列 TODO 一些次数
var nextPermutation1 = function(nums) {
};

// 买卖股票简单题
// “接雨水”问题 // https://juejin.cn/book/6844733800300150797/section/6844733800375648269
