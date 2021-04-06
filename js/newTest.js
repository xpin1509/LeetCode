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

/**
 * 请求池限制数
 * @param {Array} array 
 * @param {Number} len 
 */
const pool1 = async (array, len) => {
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

const pool2 = async (array) => {
    return new Promise((resolve, reject) => {
        const result = [], total = array.length
        // 少一个插一个
        for (let i = 0; i < len; i++) {
            doPromise()
        }
        function doPromise () {
            const p = array.shift()
            if (p) {
                p().then((res) => {
                    result.push(res)
                    if (array.length) {
                        doPromise()
                    }
                    if (total === result.length) {
                        resolve(result)
                    }
                })
            }
        }
    })
}

// pool2([p1, p2, p3, p4, p5]).then((res) => {
//     console.log(res)
// })

Promise.myAll = function (array) {
    return new Promise((reolve, reject) => {
        const resut = []
        for (let i = 0; i < array.length; i++) {
            const p = array[i]
            p.then(el => {
                resut[i] = el
                if (resut.length = array.length) {
                    reolve(resut)
                }
            }).catch(err => {
                reject(err)
            })
        }
    })
}
// Promise.myAll([p1(), p2(), p3(), p4(), p5()])


function add (m) {
    const temp = function (n) {
        return add(m + n)
    }

    temp.toString = function () {
        return m
    }

    return temp
}

function add2 (m) {
    let sum = m
    const temp = function (n) {
        sum += n
        return temp
    }

    temp.toString = function () {
        return sum
    }

    return temp
}
// console.log(add2(1)(2)(3)(4))