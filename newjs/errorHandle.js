// 异常监控原理

// window.onerror = function (...arg) {
//     console.log('onerror', ...arg);
// }

// window.addEventListener('error', function(event) { 
//     console.log('error', event)
// }, true)

// window.addEventListener("unhandledrejection", event => {
//     console.log('unhandledrejection', `${event.reason}`);
// });

// console.log(a)

// var d1=document.getElementById("obverseDom");
// debugger
// var img=document.createElement("img");
// img.src="";
// d1.appendChild(img);

// new Promise((r, j) => j(1)).then(() => {})

// async function parent () {
//     try {
//         await parent_child()
//     } catch (e) {
//         console.log(e.message);
//     }
// }

// async function parent_child() {
//     try {
//         throw new Error("hh")
//     } catch (e) {
//         // throw e
//     }
// }

// let i = 0
// while (i < 1000000000) {
//     i++
// }

// const EL = document.querySelector('#clientRact')
// const EL2 = document.querySelector('#clientRact1')
// console.log(EL)
// console.log(EL2)

// const EL2 = document.querySelector('#obverseDom')
// console.log(EL2)


// 立刻执行函数


// 测试PostMessage的输出
// console.log(1111)
// window.postMessage('hello words1')
// setTimeout(() => console.log('ste1'), 0)
// window.addEventListener('message', function (e) {
//     console.log(e)
// }, false)
// window.postMessage('hello words2')
// setTimeout(() => console.log('ste1'), 0)
// console.log(12121)
// -----输出-----
// 1111
// 12121
// MessageEvent {isTrusted: true, data: 'hello words1' …}
// MessageEvent {isTrusted: true, data: 'hello words2' …}
// ste1
// ste1


// 异步函数的执行顺序
// https://www.cnblogs.com/AFu-1993/p/12319673.html
// dom.click()直接触发，所以立即执行。

// setTimeout(() => {
//     console.log(121212)
// })
// new Promise((re, rej) => {
//     console.log('promise start')
//     re()
// }).then(() => {
//     console.log('dddd')
// })
// window.addEventListener('click', function(e) {
//     let i = 0
//     while (i < 1000000000) {
//         i++
//     }
//     console.log(e)
// }, true)

// document.getElementById('obverseDom').click() // 这里是同步触发的


// 使用es5实现es6的let关键字
// (function() {
//     var a = 1
//     console.log(a)
// })()
// console.log(a)

// es6 proxy
// const girl = {
//     name: 'xiaohong',
//     age: '28'
// }
// var obj = new Proxy(girl, {
//     get: function (target, propKey) {
//         return target[propKey]
//     },
//     set: function (target, propKey, value) {
//         // if (!target[propKey]) return
//         console.log(value)
//         target[propKey] = value
//     }
// });
// obj.books = 'js'
// obj.name

// console.log( obj)

// const o = {
//   say () {
//     console.log(this)
//   },
//   say1: () => {
//     console.log(this)
//   }
// }
// o.say()
// o.say1()
// const p = o.say
// p()
// const q = o.say1
// q()

// function race(pList) {
//   return new Promise(function(resolve, reject) {
//       pList.forEach(p => {
//         console.log('1')
//         p.then((res) => {
//           resolve(res)
//         }).catch(err => {
//           reject(err)
//         })
//       })  
//   })
// }

// const p11111 = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(1212)
//     }, Math.floor(Math.random() * 10))
//   })
// }
// race([p11111(), p11111(), p11111()]).then(() => {
//   console.log('done')
// })



// webgl
// const canvas = document.getElementById('canvas')
// const wbgl = canvas.getContext('webgl')
