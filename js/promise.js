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
MyPromise.prototype.finally = function () {}
MyPromise.all = function () {}
MyPromise.race = function () {}
const promise2 = new MyPromise((resolve, reject) => {
    // setTimeout(() => {
    console.log('start')
    setTimeout(() => {
        resolve('data1')
    }, 2000)
    // }, 1000);
})
promise2.then(res => {
    console.log('success： ' + res)
    return res + '122'
}).then(res => {
    console.log('success： ' + res)
})
console.log('end')
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