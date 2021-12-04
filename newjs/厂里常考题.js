function jumpFloor(number) {
    // write code here
    const result = [0,1,2]
    for (let i = 3; i <= number; i++) {
        result[i] = result[i - 1] + result[i - 2]
    }
    return result[number]
}


function search( nums ,  target ) {
    // write code here
    let L = 0, R = nums.length - 1
    while (L <= R) {
        let mid = Math.floor((L + R) / 2)
        if (target > nums[mid]) {
            L = mid + 1
        } else if (target < nums[mid]) {
            R = mid - 1
        } else if (target === nums[mid]) {
            if (nums[mid-1] !== target) {}
            while (mid-1 >= 0 && nums[mid] === nums[mid-1]) {
                mid --
            }
            return mid
        }
    }
    return -1
}

// console.log(search([-1,0,3,5,9,12],9)) // 4
// console.log(search([-1,0,3,5,9,12],2)) // -1
// console.log(search([5], 5))
// console.log(search([1,2,2,3,4],2))


function maxLength( arr ) {
    // write code here
    // 超时
    // const result = []
    // for (let i = 0; i < arr.length; i++) {
    //     const map = {
    //         [arr[i]]: 1
    //     }
    //     let t = 1
    //     for (let j = i+1; j < arr.length; j++) {
    //         if (!map[arr[j]]) {
    //             t++
    //             map[arr[j]] = 1
    //         } else {
    //             break
    //         }
    //     }
    //     result[i] = t
    // }
    // return Math.max(...result)
}

console.log(maxLength(
    [2,3,4,5]))
console.log(maxLength([2,2,3,4,3]))
console.log(maxLength([1,2,3,1,2,3,2,2]))
console.log(maxLength(
    [2,2,3,4,8,99,3]))
