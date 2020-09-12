// const Promise = function (fn) {
//     debugger
//     this.status = 'pedding'
//     this.result = undefined
//     this.reason = undefined
//     const _this = this
//     const resolve = function (res) {
//         if (_this.status === 'pedding') {
//             _this.status = 'resolved'
//             _this.result = res
//         }
//     }
//     const reject = function (reason) {
//         if (_this.status === 'pedding') {
//             _this.status = 'reject'
//             _this.reason = reason
//         }
//     }
//     fn(resolve, reject)
// }
// Promise.prototype.then = function(onfullfilled, onreject) {
//     debugger
//     return new Promise((resolve, reject) => {
//         if (this.status === 'resolved') {
//             resolve(onfullfilled(this.result))
//         }
//         if (this.status === 'reject') {
//             reject(onreject(this.reason))
//         }
//     })
// }
// new Promise((resolve, reject) => {
//     debugger
//     setTimeout(() => {
//         debugger
//         resolve(1)
//     }, 1000)
// }).then(res => {
//     console.log(res)
// })

function P (executor) {
    this.status = 'pending'
    this.value = undefined
    this.reason = undefined
    this.onFullFilledList = []
    this.onRejectList = []
    const _this = this
    function resolve (val) {
        if (_this.status === 'pending') {
            _this.status = 'resolved'
            _this.value = val
            _this.onFullFilledList.forEach(fn => {
                fn()
            })
        }
    }
    function reject (reason) {
        if (_this.status === 'pending') {
            _this.status = 'rejected'
            _this.reason = reason
            _this.onRejectList.forEach(fn => {
                fn()
            })
        }
    }
    try {
        executor(resolve, reject)
    } catch (e) {
        reject(e)
    }
}
P.prototype.then = function (onFullFilled, onRejected) {
    return new P((resolve, reject) => {
        const _this = this
        if (this.status === 'resolved') {
            try {
                resolve(onFullFilled(this.value))
            } catch (e) {
                reject(e)
            }
            
        } else if (this.status === 'rejected') {
            try {
                resolve(onRejected(this.reason))
            } catch (e) {
                reject(e)
            }
        } else if (this.status === 'pending') {
            this.onFullFilledList.push(function () {
                onFullFilled(_this.value)
            })
            this.onRejectList.push(function () {
                onRejected(_this.reason)
            })
        }
    })
}

// new P((resolve, reject) => {
//     setTimeout(() => {
//         resolve(1)
//     }, 1000)
// }).then(res => {
//     console.log(res)
// })