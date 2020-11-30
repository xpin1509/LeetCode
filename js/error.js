// window.onerror = function (e) {
//     console.log(e)
// }

window.addEventListener('error', function (e) {
    console.log(e)
}, false)

window.addEventListener('unhandledrejection', function (e) {
    console.log(e)
})

new Promise((resolve, reject) => {
    reject(1)
}).then(() => {})

console.log(a)