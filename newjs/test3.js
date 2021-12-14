function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}
const rootTreeTempalte = {
    val: "A",
    left: {
      val: "B",
      left: {
        val: "D",
        left: null,
        right: null
      },
      right: {
        val: "E",
        left: null,
        right: null
      }
    },
    right: {
      val: "C",
      left: null,
      right: {
        val: "F",
        left: null,
        right: null
      }
    }
};
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
function isBalance (root) {
    if (!root) return true
    return Math.abs(maxDeepth(root.left) - minDeepth(root.right)) && isBalance(root.left) && isBalanced(root.right)
    function maxDeepth () {
        if (!root) return root
        return Math.max(maxDeepth(root.left), maxDeepth(root.right)) + 1
    }
}
// 对称二叉树
function isSymmetricTree (root) {
    function helper (left, right) {
        if (!left && !right) return true
        if (!left || !right) return false

        return left.val === right.val && helper(left.left, right.right) && helper(left.right, right.left)
    }
    return helper(root, root)
}

// 将有序数组转换为二叉搜索树
function bst (nums) {
    function traverse (nums, left, right) {
        if (left > right) return null
        const mid = Math.floor((left + right) / 2)
        const root = new TreeNode(nums[mid])
        root.left = traverse(nums, left, mid - 1)
        root.right = traverse(nums, mid + 1, right)
        return root
    }
    return traverse(nums, 0, nums.length - 1)
}

// 反转链表
function reverseLinked (head) {
    let pre = null
    let cur = head
    while (cur) {
        const temp = cur.next
        cur.next = pre
        pre = cur
        cur = temp
    }
    return pre
}


// 前序遍历，后续遍历，中序遍历 迭代
function intervalsTravese (root) {
    const stack = [root]
    const result = []
    while (stack.length) {
        const item = stack.pop()
        if (!item) continue
        result.push(item.val)
        if (item.right) {
            stack.push(item.right)
        }
        if (item.left) {
            stack.push(item.left)
        }
    }
    return result
}
function afterTravese (root) {
    const stack = [root]
    const result = []
    while (stack.length) {
        const item = stack.pop()
        if (!item) continue
        result.push(item.val)
        if (item.left) {
            stack.push(item.left)
        }
        if (item.right) {
            stack.push(item.right)
        }
    }
    return result.reverse()
}
function orderTravese (root) {
    const stack = []
    const result = []
    while (stack.length || root) {
        while (root) {
            stack.push(root)
            root = root.left
        }
        const item = stack.pop()
        if (!item) continue
        result.push(item.val)

        root = item.right
    }
    return result
}

// 3.三数求和问题
// 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。
// 给定数组 nums = [-1, 0, 1, 2, -1, -4]， 满足要求的三元组集合为： [ [-1, 0, 1], [-1, -1, 2] ]
const threenum = function (nums) {
    if (nums.length < 3) return nums
    const result = []
    nums.sort((a, b) => a - b)
    for (let i = 0; i < nums.length - 3; i++) {
        let L = i+1, R = nums.length - 1
        if (i > 0 && nums[i] === nums[i - 1]) continue
        while (L < R) {
            const sum = nums[i] + nums[L] + nums[R]
            if (sum === 0) {
                result.push([nums[i], nums[L], nums[R]])
                while (L + 1 < R && nums[L+ 1] === nums[L]) L++
                while (R - 1 > L && nums[R - 1] === nums[R]) R--
                L++; R--;
            } else if (sum > 0) {
                R--
            } else if (sum < 0) {
                L++
            }
        }
    }
    return result
}

// 下一个排列 
var nextPermutation1 = function(nums) {
    if (nums.length < 2) return nums
    let i = nums.length - 2
    while (nums[i] >= nums[i + 1]) {
        i--
    }
    if (i >= 0) {
        let j = nums.length - 1
        while (nums[j] <= nums[i]) {
            j--
        }
        [nums[i], nums[j]] = [nums[j], nums[i]]
    }
    return reverse(nums, i +1, nums.length - 1)

    function reverse (nums, left, right) {
        while (left < right) {
            [nums[left], nums[right]] = [nums[right], nums[left]]
            left++
            right--
        }
        return nums
    }
};



// const data1 = {"a.b.c": 1, "a.b.d": 2}
// const data2 = {"a.b.e": 3, "a.b.f": 4}
// // 把如上两个对象合并成一个JSON，其中的.需要处理成对应的层级

// // 编写一个方法，判断一个字符串是否是合法的 XML
// const str1 = "<html><div>123</div></html>"; // true
// const str2 = "<div><div>123</div><div></div></div>"; // true
// const str2 = "<html><div>123</html></div>"; // false

// 在一个矩阵中查找一个字符串，可以上下左右移动，但是不能回头，如果能找到这个字符串返回 true
// const str = "abcde";
// const matrix = [
//   ["0", "0", "0", "0", "0", "0"],
//   ["0", "0", "a", "b", "0", "0"],
//   ["0", "0", "0", "c", "d", "0"],
//   ["0", "0", "0", "0", "e", "0"],
// ];

// ["a","b","c","d"] => {a: {b: {c: {d: null}}}}

function transformDta (arr) {
    let last = null
    for (let i = arr.length - 1; i >= 0; i--) {
        last = {
            [arr[i]]: last
        }
    }
    return last
}

// 计算一个矩阵内，所有 1 覆盖的区域（岛屿问题）
// https://leetcode-cn.com/problems/number-of-islands/

// 对一个树形结构遍历，输出所有叶子节点

// https://leetcode-cn.com/problems/longest-increasing-subsequence/
// https://leetcode-cn.com/problems/longest-continuous-increasing-subsequence/
// https://leetcode-cn.com/problems/search-in-rotated-sorted-array/
// https://leetcode-cn.com/problems/merge-sorted-array/
// 合并多个有序数组（这题里我解答完之后自认为时间复杂度是O(n2)，循环中用到了shift这个方法，面试官问我这个的时间复杂度是多少，我说是O(n)，面试官说有什么办法可以解决这个么，我说可以基于原有的方式倒着循环，这样就可以用pop代替shift了，面试官问我为什么pop时间复杂度是O(1)，我说不知道，面试官让我有时间可以去了解一下均摊算法）
// https://leetcode-cn.com/problems/lru-cache/
// 这个题我最开始用Map做的，面试官跟我说如果不用Map，如何实现每次查询和删除都能做到O(1)，我没思路，面试官问我查询O(1)用什么，我说用哈希，问我插入删除O(1)用什么，我说用链表，可我不知道怎么结合到一起，面试官提示我可以用双向链表，然后我才做出来的
// https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/


// 二分查找的时间复杂度是多少，简要描述一下过程，O(logN)是怎么算出来的，TopK 的时间复杂度是多少，快排的时间复杂度是多少
// 接触过哪些排序算法，归并排序的思路是什么，一个数组做归并排序的话，一共经历了多少次合并

// 买卖股票简单题
// “接雨水”问题 // https://juejin.cn/book/6844733800300150797/section/6844733800375648269
// 给定一个数N 如23121 给定一组数字A如{2,4,9}； 求由A中元素组成的、小于N的最大数，如小于23121的最大数为22999
// 大数相乘
// map版本lru