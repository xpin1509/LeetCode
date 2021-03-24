// 手写reduce
Array.prototype.myReduce = function (fn, init) {
    for (let i = 0; i < this.length; i ++) {
        init = fn(init, this[i])
    }
    return init
}
// const res = [1,2,3,4].myReduce(function(total, cur) {
//     console.log(total, cur)
//     return total + cur
// }, 0)
// console.log(res)

Array.prototype.myFlat = function () {}

const flatArr = function (arr) {
    return arr.reduce((t, c) => {
        return Array.isArray(c) ? t.concat(flatArr(c)) : [...t, c] 
    }, [])
}


// 并发请求池 3
const p1 = () => {
    return new Promise((resolve, reject) => {
        console.log(1)
        setTimeout(()=> {
            resolve('1r')
        }, 1000)
    })
}
const p2 = () => {
    return new Promise((resolve, reject) => {
        console.log(2)
        setTimeout(()=> {
            resolve('2r')
        }, 1500)
    })
}
const p3 = () => {
    return new Promise((resolve, reject) => {
        console.log(3)
        setTimeout(()=> {
            resolve('3r')
        }, 1000)
    })
}
const p4 = () => {
    return new Promise((resolve, reject) => {
        console.log(4)
        setTimeout(()=> {
            resolve('4r')
        }, 2000)
    })
}
const p5 = () => {
    return new Promise((resolve, reject) => {
        console.log(5)
        setTimeout(()=> {
            resolve('5r')
        }, 2000)
    })
}
const len = 2

const pool = async (array) => {
    let result = []
    const times = Math.floor(array.length / len)
    const left = array.length % len
    for (let i = 0; i < times; i ++) {
        const index = i * len
        const tempArr = []
        for (let j = index; j < (i + 1) * len; j ++) {
            tempArr.push(array[j]())
        }
        const res = await Promise.all(tempArr)
        result = result.concat(res)
    }
    const tempArr = []
    const index = times * len
    for (let i = 0; i < left; i ++) {
        tempArr.push(array[index + i]())
    }
    const res = await Promise.all(tempArr)
    result = result.concat(res)
    return result
}


pool([p1, p2, p3, p4, p5]).then((res) => {
    console.log(res)
})


