// 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

// 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。
//  
// 示例:

// 给定 nums = [2, 7, 11, 15], target = 9

// 因为 nums[0] + nums[1] = 2 + 7 = 9
// 所以返回 [0, 1]
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    for (let i = 0; i < nums.length; i ++) {
        for (let j = i + 1; j < nums.length; j ++ ) {
            if ((nums[i] + nums[j]) === target) {
                return [i, j]
            }
        }
    }
    // let res = {}
    // for (let i = 0; i < nums.length; i++) { // 每个人登记自己想要配对的人，让主持人记住
    //     res[target - nums[i]] = nums[i]
    // }
    // for (let j = 0; j < nums.length; j++) { // 每个人再次报数的时候，主持人看一下名单里有没有他
    //     if (res[nums[j]] !== undefined) {
    //         return [nums[j], res[nums[j]]]
    //     }
    // }
};
twoSum([2,7,11,15], 9)
// 给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，
// 并且它们的每个节点只能存储 一位 数字。
// 如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。
// 您可以假设除了数字 0 之外，这两个数都不会以 0 开头。

// 输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
// 输出：7 -> 0 -> 8
// 原因：342 + 465 = 807
// function ListNode(val) {
//     this.val = val;
//     this.next = null;
// }
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {

};

// 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

// 示例 1:

// 输入: "abcabcbb"
// 输出: 3 
// 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
// 示例 2:

// 输入: "bbbbb"
// 输出: 1
// 解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
// 示例 3:

// 输入: "pwwkew"
// 输出: 3
// 解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
//      请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let max = 0
    for (let i = 0; i < s.length; i ++) {
        let str = ''
        for (let j = i; j < s.length; j ++) {
            if (str.indexOf(s[j]) === -1) {
                str += s[j]
                if (str.length > max) {
                    max = str.length
                }
            } else {
                break
            }
        }
    }
    return max
}

// 给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。

// 输入: "babad"
// 输出: "bab"
// 注意: "aba" 也是一个有效答案。

// 输入: "cbbd"
// 输出: "bb"
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    /**
     * 暴力破解O(n^3)
     * 超出ac
     */
    // let res = ''
    // for (let i = 0; i < s.length; i++ ) {
    //     for (let j = i; j < s.length; j++) {
    //         let str = s.slice(i, j+1)
    //         let reverStr = str.split('').reverse().join('')
    //         if (reverStr === str && str.length > res.length) {
    //             res = str
    //         }
    //     }
    // }
    // return res
    /**
     * 中心扩展法
     */
    if (s.length < 2) {
        return s
    }
    function expendstr (s, left, right) {
        while(left >= 0 && right <= s.length && s[left] === s[right]) {
            left--
            right++
        }
        return right - left - 1
    }
    let res = ''
    for (let i = 0; i < s.length; i++) {
        let len1 = expendstr(s, i, i)
        let len2 = expendstr(s, i, i + 1)
        if (res.length >= Math.max(len1, len2)) {
            continue
        }
        let p = ''
        if (len1 >= len2) {
            p = s.substring(i - (len1 - 1) / 2, i + (len1 - 1) / 2 + 1)
        } else {
            p = s.substring(i - len2 / 2 + 1, i + len2 / 2 + 1)
        }
        res = p
    }
    return res
};
// 给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。

// 输入: 123
// 输出: 321

// 输入: -123
// 输出: -321

// 输入: 120
// 输出: 21
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    let isNegat = false
    if (x <= 0) {
        isNegat = true
    }
    const num = Math.abs(x)
    let str = `${num}`.split('').reverse().join('')
    if (isNegat) {
        if (Number(str) > 2 ** 31) {
            return 0
        } else {
            return 0 - Number(str)
        }
    } else {
        if ((Number(str) + 1) > 2 ** 31) {
            return 0
        } else {
            return Number(str)
        }
    }
};

// 请你来实现一个 atoi 函数，使其能将字符串转换成整数。

// 首先，该函数会根据需要丢弃无用的开头空格字符，直到寻找到第一个非空格的字符为止。接下来的转化规则如下：

// 如果第一个非空字符为正或者负号时，则将该符号与之后面尽可能多的连续数字字符组合起来，形成一个有符号整数。
// 假如第一个非空字符是数字，则直接将其与之后连续的数字字符组合起来，形成一个整数。
// 该字符串在有效的整数部分之后也可能会存在多余的字符，那么这些字符可以被忽略，它们对函数不应该造成影响。
// 注意：假如该字符串中的第一个非空格字符不是一个有效整数字符、字符串为空或字符串仅包含空白字符时，则你的函数不需要进行转换，即无法进行有效转换。

// 在任何情况下，若函数不能进行有效的转换时，请返回 0 。

// 提示：

// 本题中的空白字符只包括空格字符 ' ' 。
// 假设我们的环境只能存储 32 位大小的有符号整数，那么其数值范围为 [−231,  231 − 1]。如果数值超过这个范围，请返回  INT_MAX (231 − 1) 或 INT_MIN (−231) 。
//  

// 示例 1:

// 输入: "42"
// 输出: 42
// 示例 2:

// 输入: "   -42"
// 输出: -42
// 解释: 第一个非空白字符为 '-', 它是一个负号。
//      我们尽可能将负号与后面所有连续出现的数字组合起来，最后得到 -42 。
// 示例 3:

// 输入: "4193 with words"
// 输出: 4193
// 解释: 转换截止于数字 '3' ，因为它的下一个字符不为数字。
// 示例 4:

// 输入: "words and 987"
// 输出: 0
// 解释: 第一个非空字符是 'w', 但它不是数字或正、负号。
//      因此无法执行有效的转换。
// 示例 5:

// 输入: "-91283472332"
// 输出: -2147483648
// 解释: 数字 "-91283472332" 超过 32 位有符号整数范围。 
//      因此返回 INT_MIN (−231) 。
/**
 * @param {string} str
 * @return {number}
 */
var myAtoi = function(str) {

};


// 编写一个函数来查找字符串数组中的最长公共前缀。

// 如果不存在公共前缀，返回空字符串 ""。

// 输入: ["flower","flow","flight"]
// 输出: "fl"

// 输入: ["dog","racecar","car"]
// 输出: ""
// 解释: 输入不存在公共前缀。
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    let res = ''
    if (!strs.length || !strs[0].length) return ''
    for (let i = 0; i < strs[0].length; i++) {
        let tempres = strs[0].slice(0, i + 1)
        let falg = true
        for (let j = 0; j < strs.length; j++) {
            if (strs[j].length < tempres.length) {
                return res
            }
            if (strs[j].indexOf(tempres) !== 0) {
                falg = false
                return res
            }
        }
        if (falg) {
            res = tempres
        }
    }
    return res
};

// 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。

// 注意：答案中不可以包含重复的三元组。

// 给定数组 nums = [-1, 0, 1, 2, -1, -4]，

// 满足要求的三元组集合为：
// [
//   [-1, 0, 1],
//   [-1, -1, 2]
// ]
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    if (nums.length < 3) return []
    if (nums.length === 3 ) {
        const res = nums.reduce((total, cur) => {
            return total + cur
        }, 0)
        if (res === 0) {
            return [nums]
        } else {
            return []
        }
    }
    nums = nums.sort((a, b) => a - b)
    // 三重循环必定超时，以后不要想了
    // 顶多O(n^2)
    const res = []
    const len = nums.length
    for (let i = 0; i < len; i++) {
        if (nums[i] > 0) break
        if (i > 0 && nums[i] == nums[i-1]) continue
        let L = i + 1
        let R = len - 1
        while(L < R) {
            const sum = nums[i] + nums[L] + nums[R]
            if (sum === 0) {
                res.push([nums[i], nums[L], nums[R]])
                while(nums[L] == nums[L+1]) L++
                while(nums[R] == nums[R-1]) R--
                L ++
                R --
            } else if (sum > 0) {
                R --
            } else if (sum < 0) {
                L ++
            }
        }
    }
    return res
    // if (nums.length < 3) return []
    // if (nums.length === 3 ) {
    //     const res = nums.reduce((total, cur) => {
    //         return total + cur
    //     }, 0)
    //     if (res === 0) {
    //         return [nums]
    //     } else {
    //         return []
    //     }
    // }
    // const res = []
    // for (let i = 0; i < nums.length; i++) {
    //     for (let j = i + 1; j < nums.length; j++) {
    //         for (let z = i + 2; z < nums.length; z++ ) {
    //             if ((nums[i] + nums[j] + nums[z]) === 0) {
    //                 res.push([nums[i], nums[j], nums[z]])
    //             }
    //         }
    //     }
    // }
    // for (let i = 0; i < res.length; i++) {}
    // return res
};

// 给定一个包括 n 个整数的数组 nums 和 一个目标值 target。找出 nums 中的三个整数，使得它们的和与 target 最接近。返回这三个数的和。假定每组输入只存在唯一答案。

// 例如，给定数组 nums = [-1，2，1，-4], 和 target = 1.

// 与 target 最接近的三个数的和为 2. (-1 + 2 + 1 = 2).
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function(nums, target) {

};

// 判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。

// 输入: 121
// 输出: true

// 输入: -121
// 输出: false
// 解释: 从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。

// 输入: 10
// 输出: false
// 解释: 从右向左读, 为 01 。因此它不是一个回文数。
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    let str = `${x}`
    let reverstr = str.split('').reverse().join('')
    return reverstr === str
};

// 罗马数字包含以下七种字符: I， V， X， L，C，D 和 M。
// 字符          数值
// I             1
// V             5
// X             10
// L             50
// C             100
// D             500
// M             1000
// 例如， 罗马数字 2 写做 II ，即为两个并列的 1。12 写做 XII ，即为 X + II 。 27 写做  XXVII, 即为 XX + V + II 。
// 通常情况下，罗马数字中小的数字在大的数字的右边。但也存在特例，例如 4 不写做 IIII，而是 IV。数字 1 在数字 5 的左边，
// 所表示的数等于大数 5 减小数 1 得到的数值 4 。同样地，数字 9 表示为 IX。这个特殊的规则只适用于以下六种情况：
// I 可以放在 V (5) 和 X (10) 的左边，来表示 4 和 9。
// X 可以放在 L (50) 和 C (100) 的左边，来表示 40 和 90。 
// C 可以放在 D (500) 和 M (1000) 的左边，来表示 400 和 900。
// 给定一个罗马数字，将其转换成整数。输入确保在 1 到 3999 的范围内。
// 输入: "III"
// 输出: 3
// 输入: "IV"
// 输出: 4
// 输入: "IX"
// 输出: 9
// 输入: "LVIII"
// 输出: 58
// 解释: L = 50, V= 5, III = 3.
// 输入: "MCMXCIV"
// 输出: 1994
// 解释: M = 1000, CM = 900, XC = 90, IV = 4.

/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
    const obj = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000
    }
    const special = {
        'IV': 4,
        'IX': 9,
        'XL': 40,
        'XC': 90,
        'CD': 400,
        'CM': 900
    }
    // 特殊字符
    // 去除特殊字符
    let res = 0
    for (let i = 0; i < s.length; i++) {
        // 判断是特殊
        if (i < s.length - 1 && special[s[i]+s[i+1]]) {
            res += special[s[i]+s[i+1]]
            i = i + 1
            continue
        }
        if (obj[s[i]]) {
            res += obj[s[i]]
        }
    }
    return res
};

// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。

// 有效字符串需满足：
// 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。
// 注意空字符串可被认为是有效字符串。
// 输入: "()"
// 输出: true
// 输入: "()[]{}"
// 输出: true
// 输入: "(]"
// 输出: false
// 输入: "([)]"
// 输出: false
// 输入: "{[]}"
// 输出: true
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    // 前一个等于后一个
    // 几个左后对应回文右
    // const isleft = {
    //     "{": '}',
    //     "[": "]",
    //     "(": ")"
    // }
    // let temp = ''
    // for (let i = 0; i < s.length; i++) {
    //     if (isleft[s[i]]) {
    //         temp += s[i]
    //     } else {
    //         let rever = temp.split('').reverse().map(el => isleft[el]).join('')
    //         let right = s.substring(i, i + rever.length)
    //         if (rever === right && rever && right) {
    //             i += Math.max(rever.length - 1,  0)
    //             temp = ''
    //         } else {
    //             return false
    //         }
    //     }
    // }
    // return !temp
    // s = s.replace(/{}|\[\]|()/g, '')
    if (s.length % 2) return false
    const arr = []
    for (let i = 0; i < s.length; i++) {
        switch(s[i]){
            case '[':
                arr.push('[')
                break
            case '{':
                arr.push('{')
                break
            case '(':
                arr.push('(')
                break
            case ']':
                if (arr.pop() !== '[') return false
                break
            case '}':
                if (arr.pop() !== '{') return false
                break
            case ')': 
                if (arr.pop() !== '(') return false
                break
        }
    }
    return !arr.length
};

// 将两个升序链表合并为一个新的升序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 

// 输入：1->2->4, 1->3->4
// 输出：1->1->2->3->4->4
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function ListNode(val) {
    this.val = val;
    this.next = null;
}
var mergeTwoLists = function(l1, l2) {
    if (l1 === null) {
        return l2
    } else if (l2 === null) {
        return l1
    } else if (l1.val < l2.val) {
        l1.next = mergeTwoLists(l1.next, l2);
        return l1
    } else {
        l2.next = mergeTwoLists(l1, l2.next);
        return l2
    }
}
// 给定一个排序数组，你需要在 原地 删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。

// 不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。

//  

// 示例 1:

// 给定数组 nums = [1,1,2], 

// 函数应该返回新的长度 2, 并且原数组 nums 的前两个元素被修改为 1, 2。 

// 你不需要考虑数组中超出新长度后面的元素。
// 示例 2:

// 给定 nums = [0,0,1,1,1,2,2,3,3,4],

// 函数应该返回新的长度 5, 并且原数组 nums 的前五个元素被修改为 0, 1, 2, 3, 4。

// 你不需要考虑数组中超出新长度后面的元素。
//  

// 说明:

// 为什么返回数值是整数，但输出的答案是数组呢?

// 请注意，输入数组是以「引用」方式传递的，这意味着在函数里修改输入数组对于调用者是可见的。

// 你可以想象内部操作如下:

// // nums 是以“引用”方式传递的。也就是说，不对实参做任何拷贝
// int len = removeDuplicates(nums);

// // 在函数里修改输入数组对于调用者是可见的。
// // 根据你的函数返回的长度, 它会打印出数组中该长度范围内的所有元素。
// for (int i = 0; i < len; i++) {
//     print(nums[i]);
// }
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    const obj = {}
    for (let i = 0; i < nums.length; i++) {
        if (!obj[nums[i]]) {
            obj[nums[i]] = 1
        } else {
            nums.splice(i, 1)
            i -= 1
        }
    }
};
// 给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素，并返回移除后数组的新长度。

// 不要使用额外的数组空间，你必须仅使用 O(1) 额外空间并 原地 修改输入数组。

// 元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。

//  
// 给定 nums = [3,2,2,3], val = 3,

// 函数应该返回新的长度 2, 并且 nums 中的前两个元素均为 2。

// 你不需要考虑数组中超出新长度后面的元素。

// 给定 nums = [0,1,2,2,3,0,4,2], val = 2,

// 函数应该返回新的长度 5, 并且 nums 中的前五个元素为 0, 1, 3, 0, 4。

// 注意这五个元素可为任意顺序。

// 你不需要考虑数组中超出新长度后面的元素。
//  

// 说明:

// 为什么返回数值是整数，但输出的答案是数组呢?

// 请注意，输入数组是以「引用」方式传递的，这意味着在函数里修改输入数组对于调用者是可见的。

// 你可以想象内部操作如下:

// // nums 是以“引用”方式传递的。也就是说，不对实参作任何拷贝
// int len = removeElement(nums, val);

// // 在函数里修改输入数组对于调用者是可见的。
// // 根据你的函数返回的长度, 它会打印出数组中 该长度范围内 的所有元素。
// for (int i = 0; i < len; i++) {
//     print(nums[i]);
// }
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === val) {
            nums.splice(i, 1)
            i -= 1
        }
    }
};
// 实现 strStr() 函数。

// 给定一个 haystack 字符串和一个 needle 字符串，在 haystack 字符串中找出 needle 字符串出现的第一个位置 (从0开始)。如果不存在，则返回  -1。


// 输入: haystack = "hello", needle = "ll"
// 输出: 2

// 输入: haystack = "aaaaa", needle = "bba"
// 输出: -1
// 说明:

// 当 needle 是空字符串时，我们应当返回什么值呢？这是一个在面试中很好的问题。

// 对于本题而言，当 needle 是空字符串时我们应当返回 0 。这与C语言的 strstr() 以及 Java的 indexOf() 定义相符。
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
    if (!needle) return 0
    return haystack.indexOf(needle)
};

// 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

// 你可以假设数组中无重复元素。

// 输入: [1,3,5,6], 5
// 输出: 2

// 输入: [1,3,5,6], 2
// 输出: 1

// 输入: [1,3,5,6], 7
// 输出: 4

// 输入: [1,3,5,6], 0
// 输出: 0
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
    let index = nums.indexOf(target)
    if (index === -1) {
        const temp = [...nums, target]
        temp.sort((a, b) => a - b)
        index = temp.indexOf(target)
    }
    return index
};

// 「外观数列」是一个整数序列，从数字 1 开始，序列中的每一项都是对前一项的描述。前五项如下：
// 1.     1
// 2.     11
// 3.     21
// 4.     1211
// 5.     111221
// 1 被读作  "one 1"  ("一个一") , 即 11。
// 11 被读作 "two 1s" ("两个一"）, 即 21。
// 21 被读作 "one 2",  "one 1" （"一个二" ,  "一个一") , 即 1211。

// 给定一个正整数 n（1 ≤ n ≤ 30），输出外观数列的第 n 项。

// 注意：整数序列中的每一项将表示为一个字符串。

// 输入: 1
// 输出: "1"
// 解释：这是一个基本样例。

// 输入: 4
// 输出: "1211"
// 解释：当 n = 3 时，序列是 "21"，其中我们有 "2" 和 "1" 两组，"2" 可以读作 "12"，也就是出现频次 = 1 而 值 = 2；类似 "1" 可以读作 "11"。所以答案是 "12" 和 "11" 组合在一起，也就是 "1211"。
/**
 * @param {number} n
 * @return {string}
 */
var countAndSay = function(n) {
    const arr = ['1']
    for (let i = 1; i <= 30; i++) {
        arr.push(strTostring(arr[i-1]))
    }
    /**
     * '11' -> '21'
     * @param {number} num 
     */
    function strTostring (str) {
        const arr = str.split('')
        let res = ''
        for (let i = 0; i < arr.length; i++) {
            let tempchar = arr[i]
            let len = 1
            for (let j = i + 1; j < arr.length; j++) {
                if (arr[j] == arr[i]) {
                    len ++
                    i ++
                } else {
                    break
                }
            }
            res += len + tempchar
        }
        return res
    }
    return arr[n - 1]
};

// 67. 二进制求和
// 给你两个二进制字符串，返回它们的和（用二进制表示）。
// 输入为 非空 字符串且只包含数字 1 和 0。

// 输入: a = "11", b = "1"
// 输出: "100"

// 输入: a = "1010", b = "1011"
// 输出: "10101"
//  

// 每个字符串仅由字符 '0' 或 '1' 组成。
// 1 <= a.length, b.length <= 10^4
// 字符串如果不是 "0" ，就都不含前导零。
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function(a, b) {
    /**
     * 小数据可相加
     */
    // a = parseInt(a, 2)
    // b = parseInt(b, 2)
    // const res = a + b
    // return res.toString(2)
    if (a == '0' && b == '0') return '0'
    const aList = a.split('')
    const bList = b.split('')
    let temp = ''
    const resList = []
    while(aList.length || bList.length) {
        const res = add(aList.pop(), bList.pop(), temp)
        temp = res.split(',')[1]
        resList.unshift(res.split(',')[0])
    }
    if (temp == '1') {
        resList.unshift(temp)
    }
    return resList.join('')
    /**
     * 二进制相加
     * @param {*} str1 numStr
     * @param {*} str2 numStr
     * @return {String} res, isUp
     */
    function add (str1, str2, str3) {
        const temp = parseInt(str1||0) + parseInt(str2||0) + parseInt(str3||0)
        let res = ''
        switch(temp){
            case 0:
                res = '0,0'
                break
            case 1:
                res = '1,0'
                break
            case 2:
                res = '0,1'
                break
            case 3:
                res = '1,1'
                break
        }
        return res
    }
};
// 69.实现 int sqrt(int x) 函数。

// 计算并返回 x 的平方根，其中 x 是非负整数。

// 由于返回类型是整数，结果只保留整数的部分，小数部分将被舍去。

// 输入: 4
// 输出: 2

// 输入: 8
// 输出: 2
// 说明: 8 的平方根是 2.82842..., 
//      由于返回类型是整数，小数部分将被舍去。
/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) {
    let temp = 0
    for (let i = 1; i <= x; i++) {
        if (i * i < x) {
            temp = i
        } else if ( i * i == x) {
            return i
        } else {
            break
        }
    }
    return temp
};
// 70假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
// 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
// 注意：给定 n 是一个正整数。

// 输入： 2
// 输出： 2
// 解释： 有两种方法可以爬到楼顶。
// 1.  1 阶 + 1 阶
// 2.  2 阶

// 输入： 3
// 输出： 3
// 解释： 有三种方法可以爬到楼顶。
// 1.  1 阶 + 1 阶 + 1 阶
// 2.  1 阶 + 2 阶
// 3.  2 阶 + 1 阶
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    // if (n < 3) return n
    // return climbStairs(n-1) + climbStairs(n - 2)
    const arr = [1, 2]
    for (let i = 3; i <= n; i++) {
        arr.push(arr[i-2] + arr[i-3])
    }
    return arr[n-1]
};


// 83. 删除排序链表中的重复元素
// 给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次。

// 示例 1:

// 输入: 1->1->2
// 输出: 1->2
// 示例 2:

// 输入: 1->1->2->3->3
// 输出: 1->2->3
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function(head) {
    let cur = head
    while (cur && cur.next) {
        if (cur.next.val === cur.val) {
            cur.next = cur.next.next
        } else {
            cur = cur.next
        }
    }
    return head
};
// 88. 合并两个有序数组
// 给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。

// 说明:
// 初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。
// 你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。

// 输入:
// nums1 = [1,2,3,0,0,0], m = 3
// nums2 = [2,5,6],       n = 3

// 输出: [1,2,2,3,5,6]
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
    nums1.splice(m, nums1.length - m)
    nums2.slice(0, n).forEach(el => {
        nums1.push(el)
    })
    for (let i = 0; i < nums1.length; i ++) {
        for (let j = i + 1; j < nums1.length; j ++) {
            if (nums1[j] < nums1[i]) {
                let temp = nums1[i] 
                nums1[i] = nums1[j]
                nums1[j] = temp
            }
        }
    }
};
// 100. 相同的树
// 给定两个二叉树，编写一个函数来检验它们是否相同。

// 如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。

// 示例 1:

// 输入:       1         1
//           / \       / \
//          2   3     2   3

//         [1,2,3],   [1,2,3]

// 输出: true
// 示例 2:

// 输入:      1          1
//           /           \
//          2             2

//         [1,2],     [1,null,2]

// 输出: false
// 示例 3:

// 输入:       1         1
//           / \       / \
//          2   1     1   2

//         [1,2,1],   [1,1,2]

// 输出: false
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
    if (p == null && q == null) return true
    if (p == null || q == null) return false
    if (p.val !== q.val) return false
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
};
// 给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

// 示例:
// 输入: [-2,1,-3,4,-1,2,1,-5,4],
// 输出: 6
// 解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    let maxofAll = nums[0]
    if (nums.length < 2) return maxofAll
    for (let i = 0; i < nums.length; i++) {
        let linemaxNum = nums[i]
        let total = 0
        for (let j = i; j < nums.length; j++) {
            total += nums[j]
            // if (nums[j] < 0) continue
            linemaxNum = total > linemaxNum ? total : linemaxNum
        }
        maxofAll = maxofAll > linemaxNum ? maxofAll : linemaxNum
    }
    return maxofAll
};

// 给定一个仅包含大小写字母和空格 ' ' 的字符串 s，返回其最后一个单词的长度。
// 如果字符串从左向右滚动显示，那么最后一个单词就是最后出现的单词。
// 如果不存在最后一个单词，请返回 0 。
// 说明：一个单词是指仅由字母组成、不包含任何空格字符的 最大子字符串。

// 输入: "Hello World"
// 输出: 5
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function(s) {
    let arr = s.split(' ')
    arr = arr.filter(el => !!el)
    if (!arr.length) return 0
    return arr.pop().length
};

// 给定一个由整数组成的非空数组所表示的非负整数，在该数的基础上加一。

// 最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。

// 你可以假设除了整数 0 之外，这个整数不会以零开头。

// 输入: [1,2,3]
// 输出: [1,2,4]
// 解释: 输入数组表示数字 123。

// 输入: [4,3,2,1]
// 输出: [4,3,2,2]
// 解释: 输入数组表示数字 4321。
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
    // 超长数据失真
    // const dig = parseInt(digits.join('')) + 1
    // debugger
    // return `${dig}`.split('').map(el => {
    //     return parseInt(el)
    // })
    const res = []
    let temp = 1
    while(digits.length) {
        const cur = digits.pop()
        let newval = 0
        if (cur + temp >= 10) {
            newval = cur + temp - 10
            temp = 1
        } else {
            
            newval = cur + temp
            temp = 0
        }
        res.unshift(newval)
    }
    if (temp) {
        res.unshift(temp)
    }
    return res
};
