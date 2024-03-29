/**
 * Promise
 * 14.45 -> 13.05
 */
function MyPromise (executor) {
    this.status = 'pending'
    this.value = undefined
    this.reason = undefined
    this.onResolvedCallbacks = []
    this.onRejectedCallbacks = []
    const _this = this

    function resolve (value) {
        if (_this.status === 'pending') {
            _this.value = value
            _this.status = 'resolved'
            _this.onResolvedCallbacks.forEach(fn => {
                fn()
            })
        }
    }
    function reject (reason) {
        if (_this.status === 'pending') {
            _this.reason = reason
            _this.status = 'rejected'
            _this.onRejectedCallbacks.forEach(fn => {
                fn()
            })
        }
    }
    executor(resolve, reject)
}
MyPromise.prototype.then  = function (onFullFilled, onRejected) {
    const _this = this
    return new Promise((resolve, reject) => {
        if (this.status === 'resolved') {
            try {
                resolve(onFullFilled(this.value))
            } catch (err) {
                reject(err)
            } 
        }
        if (this.status === 'rejected') {
            try {
                resolve(onRejected(this.reason))
            } catch (err) {
                reject(err)
            }
        }
        if (this.status === 'pending') {
            this.onResolvedCallbacks.push(function() {
                try {
                    resolve(onFullFilled(_this.value))
                } catch (err) {
                    reject(err)
                }
            })
            this.onRejectedCallbacks.push(function() {
                try {
                    resolve(onRejected(_this.reason))
                } catch (err) {
                    reject(err)
                }
            })
        }
    })
}
MyPromise.prototype.catch = function () {}
MyPromise.prototype.finally = function (callback) {
    return this.then((value) => {
        return Promise.resolve(callback()).then(() => {
            return value
        })
    }, err => {
        return Promise.resolve(callback()).then(() => {
            throw err
        })
    })
}
MyPromise.all = function (arr) {
    return new Promise((resolve, reject) => {
        const result = []
        for (let i = 0; i < arr.length; i++) {
            const p = arr[i]
            p.then((res) => {
                result[i] = res
            }).catch(err => {
                reject(err)
            })
        }
    })
}
MyPromise.race = function (arr) {
    return new MyPromise((resolve, reject) => {
        arr.forEach(promise => {
            promise.then(resolve, reject)
        })
    })
}
MyPromise.allSettled = function (arr) {
    return new Promise((resolve, reject) => {
        const result = []
        for (let i = 0; i < arr.length; i++) {
            arr[i].then(res => {
                const r = {
                    status: 'fulfilled',
                    value: res
                }
                result[i] = r
                if (result.length === arr.length) {
                    resolve(result)
                }
            }).catch(err => {
                const r = {
                    status: 'rejected',
                    reason: err
                }
                result[i] = r
                if (result.length === arr.length) {
                    resolve(result)
                }
            })
        }
    })
}
MyPromise.resolve = function (res) {
    return new MyPromise((resolve, reject) => {
        resolve(res)
    })
}
// const promise2 = new MyPromise((resolve, reject) => {
//     // setTimeout(() => {
//     console.log('start')
//     setTimeout(() => {
//         resolve('data1')
//     }, 2000)
//     // }, 1000);
// })
// const promise2 = new MyPromise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('data1')
//     }, 2000)
// })
// promise2.then(res => {
//     console.log('success： ' + res)
//     return res + '122'
// }).then(res => {
//     console.log('success： ' + res)
// })
// console.log('end')
// MyPromise.all(promise2, promise1).then(res => {
//     console.log(res)
// })
// MyPromise.race(promise2, promise1).then(res => {
//     console.log(res)
// })
// const promise1 = new MyPromise((resovle, reject) => {
//     setTimeout(() => {
//         resovle(1000)
//     }, 1000);
// })
// const p1 = () => {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve('p1')
//         }, 1000);
//     })
// }
// const p2 = () => {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve('p2')
//         }, 500);
//     })
// }
// P.all([p1(), p2()]).then(res => {
//     console.log(res)
// })


// function pool (arrP) {
//     const tempArr = arrP.splice(0, 3)
//     while(tempArr.length) {
//         const p = tempArr[0]
//         p().then(res => {
//             // debugger
//             if (arrP.length) {
//                 tempArr.push(arrP.shift())
//             }
//         })
//     }
// }

// const p1 = () => {
//     return new Promise((r, j) => {
//         setTimeout(() => {
//             console.log(1)
//             r('1')
//         }, 1000)
//     })
// }
// const p2 = () => {
//     return new Promise((r, j) => {
//         setTimeout(() => {
//             console.log(2)
//             r('2')
//         }, 1000)
//     })
// }
// const p3 = () => {
//     return new Promise((r, j) => {
//         setTimeout(() => {
//             console.log(3)
//             r('3')
//         }, 1000)
//     })
// }
// const p4 = () => {
//     return new Promise((r, j) => {
//         setTimeout(() => {
//             console.log(4)
//             r('4')
//         }, 1000)
//     })
// }
// pool([p1, p2, p3, p4])


// console.time()
// const promise1 = new Promise(function(resolve, reject) {
//     setTimeout(() => reject(new Error('失败')), 3000)
// });

// const promise2 = new Promise(function(resolve, reject) {
//     setTimeout(() => resolve(promise1), 1000)
// });

// promise2.then(res => {
//     console.log(res)
// }).catch(err => {
//     console.log(err)
// }).finally(() => {
//     console.timeEnd()
// })

console.time()
const promise1 = () => new Promise(function(resolve, reject) {
    setTimeout(() => resolve('第二个'), 2000)
});

const promise2 = () => new Promise(function(resolve, reject) {
    setTimeout(() => resolve('success'), 1000)
});
var peddings

const result = promise2().then(res => {
    peddings = promise1()

    return peddings
})
result.then(res => {
    console.log(res)
    console.log(Date.now())
})
// window.pedding.then(res => {
//     console.log(res, 'window')
//     console.log(Date.now())
// })

