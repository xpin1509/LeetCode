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
    setTimeout(()=> {
        resolve(1)
        console.log(1)
    }, 1000)
})
}
const p2 = () => {
    return new Promise((resolve, reject) => {
    setTimeout(()=> {
        resolve(2)
        console.log(2)
    }, 1500)
})
}
const p3 = () => {
    return new Promise((resolve, reject) => {
    setTimeout(()=> {
        resolve(3)
        console.log(3)
    }, 1000)
})
}
const p4 = () => {
    return new Promise((resolve, reject) => {
        setTimeout(()=> {
            resolve(4)
            console.log(4)
        }, 2000)
    })
}

const len = 3
const pool = async (array) => {
    const result = []
}

console.time()
promiseAll = function (arr) {
    return new Promise((resolve, reject) => {
        const result = []
        for (let i = 0; i < arr.length; i++) {
            arr[i]().then(res => {
                result[i] = res
                if (result.length === arr.length) {
                    resolve(result)
                }
            }).catch(err => {
                reject(err)
            })
        }
    })
}

// pool([p1, p2,p3,p4]).then((res) => {
//     console.log(res)
// })


promiseAll([p1, p2,p3,p4]).then((res) => {
    console.log(res)
    console.timeEnd()
})

