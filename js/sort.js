/**
 * 常见排序算法
 */
const arr = [3,44,38,5,47,15,36,26,27,2,46,4,19,50,48]
/**
 * 二分法查找
 * 时间复杂度O(logn)
 * @param {Array} arr 
 * @param {Number} target 
 */
function binarySearch(arr, target) {
    let start = 0
    let end = arr.length - 1
    while(start <= end) {
        let mid = Math.floor((start + end)/2)
        if (target < arr[mid]) {
            end = mid
        } else if (target > arr[mid]){
            start = mid
        } else {
            return mid
        }
    }
    return -1
}
/**
 * 冒泡排序
 * 时间复杂度O(n^2)
 * @param {Array} arr 
 */
function bubbleSort(arr) {
    var len = arr.length;
    for (var i = 0; i < len - 1; i++) {
        for (var j = i; j < len; j++) {
            if (arr[i] > arr[j]) {        // 相邻元素两两对比
                var temp = arr[i];        // 元素交换
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}
/**
 * 希尔排序
 * 时间复杂度O(nlogn)
 * @param {Array} arr 
 */
// var arr = [49, 38, 65, 97, 76, 13, 27, 49, 55, 04];
// var len = arr.length;
// for (var fraction = Math.floor(len / 2); fraction > 0; fraction = Math.floor(fraction / 2)) {
//     for (var i = fraction; i < len; i++) {
//         for (var j = i - fraction; j >= 0 && arr[j] > arr[fraction + j]; j -= fraction) {
//             var temp = arr[j];
//             arr[j] = arr[fraction + j];
//             arr[fraction + j] = temp;
//         }
//     }
// }
// console.log(arr);
function shellSort(arr) {
    var len = arr.length, temp, gap = 1
    //动态定义间隔序列
    while(gap < len/3) {
        gap = gap*3+1
    }
    for (gap; gap > 0; gap = Math.floor(gap/3)) {
        for (var i = gap; i < len; i++) {
            temp = arr[i];
            for (var j = i-gap; j >= 0 && arr[j] > temp; j -= gap) {
                arr[j+gap] = arr[j];
            }
            arr[j+gap] = temp;
        }
    }
    return arr;
}
/**
 * 归并算法
 * 时间复杂度O(nlogn)
 * @param {Array} arr 
 */
function mergeSort(arr) {
    if (arr.length < 2) {
        return arr
    }
    let mid = arr.length / 2
    let left = arr.slice(0, mid)
    let right = arr.slice(mid, arr.length)
    return merge(mergeSort(left), mergeSort(right))
    function merge(left, right) {
        var result = []
        while(left.length, right.length) {
            if (left[0] <= right[0]) {
                result.push(left.shift())
            } else {
                result.push(right.shift())
            }
        }
        while(left.length) {
            result.push(left.shift())
        }
        while(right.length) {
            result.push(right.shift())
        }
        return result
    }
}

/**
 * 快速排序
 * 时间复杂度O(nlogn)
 * @param {Array} arr 
 */
function quickSort(arr) {
    const sort = (arr, left = 0, right = arr.length - 1) => {
        if (left >= right) {//如果左边的索引大于等于右边的索引说明整理完毕
            return
        }
        let i = left
        let j = right
        const baseVal = arr[j] // 取无序数组最后一个数为基准值
        while (i < j) {//把所有比基准值小的数放在左边大的数放在右边
            while (i < j && arr[i] <= baseVal) { //找到一个比基准值大的数交换
                i++
            }
            arr[j] = arr[i] // 将较大的值放在右边如果没有比基准值大的数就是将自己赋值给自己（i 等于 j）
            while (j > i && arr[j] >= baseVal) { //找到一个比基准值小的数交换
                j--
            }
            arr[i] = arr[j] // 将较小的值放在左边如果没有找到比基准值小的数就是将自己赋值给自己（i 等于 j）
        }
        arr[j] = baseVal // 将基准值放至中央位置完成一次循环（这时候 j 等于 i ）
        sort(arr, left, j-1) // 将左边的无序数组重复上面的操作
        sort(arr, j+1, right) // 将右边的无序数组重复上面的操作
    }
    const newArr = arr.concat() // 为了保证这个函数是纯函数拷贝一次数组
    sort(newArr)
    return newArr
}
/**
 * 类似快排的排序
 * @param {Array} arr 
 */
function lickQuick(arr) {
    if (arr.length < 2) {
        return arr
    }
    const base = arr[arr.length - 1]
    let left = []
    let right = []
    let center = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < base) {
            left.push(arr[i])
        } else if (arr[i] > base) {
            right.push(arr[i])
        } else {
            center.push(arr[i])
        }
    }
    return [...quickSort(left), ...center, ...quickSort(right)]
}

/**
 * 选择排序
 * 在未排序序列中找到最小的元素放在队首，然后再从剩余的序列中鸡血寻找
 * @param {Array} arr 
 */
function selecttionSort (arr) {
    const len = arr.length
    let minIndex
    for (let i = 0; i < len; i++) {
        minIndex = i
        for (let j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j
            }
        }
        const temp = arr[i]
        arr[i] = arr[minIndex]
        arr[minIndex] = temp
    }
    return arr
}
// 插入排序
function insertionSort (arr) {
    const len = arr.length
    let preIndex, current
    for (let i = 0; i < len; i++) {
        preIndex = i - 1
        current = arr[i]
        while(preIndex >= 0 && arr[preIndex] > current) {
            arr[preIndex + 1] = arr[preIndex]
            preIndex --
        }
        arr[preIndex + 1] = current
    }
    return arr
}
// 快排(非递归)