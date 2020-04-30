/**
 * 防抖
 * 14:06 -> 14:24
 */
function debounce (fn, wait = 0) {
    var timeId = null
    return function(...arg) {
        if (timeId) {
            clearTimeout(timeId)
            timeId = null
        }
        const _this = this
        timeId = setTimeout(() => {
            fn.call(_this, ...arg)
        }, wait)
    }
}
/**
 * 节流
 * 14:26->14:40
 */
function throttle (fn, wait = 0) {
    var timeId = null
    return function(...arg) {
        const _this = this
        if (!timeId) {
            fn.call(_this, ...arg)
        }
        timeId = setTimeout(() => {
            clearTimeout(timeId)
            timeId = null
        }, wait)
    }
}
// const obj = {
//     doSomething: debounce(function (name) {
//         console.log(this)
//         console.log(name)
//     }, 2000)
// }
// obj.doSomething('xubin')
// obj.doSomething('xubin')
// setTimeout(() => {
//     obj.doSomething('xubin')
// }, 3000)