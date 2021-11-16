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


