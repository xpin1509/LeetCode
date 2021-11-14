// 十大排序算法
const SortArr = [ 22, 34, 3, 32, 82, 55, 89, 50, 37, 5, 64, 35, 9, 70]
// 冒泡排序
// 选择排序
function selecttionSort (arr) {
    // 选择最小的交换
    for (let i = 0; i < arr.length; i++) {
        let minIndex = i
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j
            }
        }
        const c = arr[i]
        arr[i] = arr[minIndex]
        arr[minIndex] = c
    }
    return arr
}
// 插入排序
function insertSort (arr) {
    for (let i = 1; i < arr.length; i ++) {
        let j = i - 1
        let k = arr[i]
        while (j >= 0 && arr[j] > k) {
            arr[j+1] = arr[j]
            j--
        }
        arr[j+1] = k
    }
    return arr
}

// 希尔排序
function shellSort (arr) {
    const base = Math.ceil(arr.length / 3)
    for (let i = base; i > 0; i--) {
        for (let j = 0; j < arr.length; j++) {
            for (let k = j + i; k < arr.length; k++) {
                if (arr[k] < arr[j]) {
                    const c = arr[k]
                    arr[k] = arr[j]
                    arr[j] = c
                }
            }
        }
    }
    return arr
}

// 归并排序
function merge (a, b) {
    const result = []
    while (a.length && b.length) {
        if (a[0] < b[0]) {
            result.push(a.shift())
        } else {
            result.push(b.shift())
        }
    }
    if (a.length || b.length) {
        [...a, ...b].forEach(el => result.push(el))
    }
    return result
}
function mergeSort (arr) {
    if (arr.length < 2) return arr;
    const mid = Math.floor(arr.length / 2)
    const left = arr.slice(0, mid)
    const right = arr.slice(mid)

    return merge(mergeSort(left), mergeSort(right))
}

// 快速排序
function quickSort (arr) {
    if (arr.length < 2) return arr;
    const base = arr[arr.length - 1];
    const left = [], right = [], center = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > base) right.push(arr[i])
        if (arr[i] < base) left.push(arr[i])
        if (arr[i] === base) center.push(arr[i])
    }
    return [...quickSort(left), ...center, ...quickSort(right)]
}

// 计数排序
// 桶排序
// 二叉堆排序
// 基数排序