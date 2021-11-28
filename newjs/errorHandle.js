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

async function parent () {
    try {
        await parent_child()
    } catch (e) {
        console.log(e.message);
    }
}

async function parent_child() {
    try {
        throw new Error("hh")
    } catch (e) {
        // throw e
    }
}

// let i = 0
// while (i < 1000000000) {
//     i++
// }

// const EL = document.querySelector('#clientRact')
// const EL2 = document.querySelector('#clientRact1')
// console.log(EL)
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
// errorHandle.js:61 12121
// errorHandle.js:57 MessageEvent {isTrusted: true, data: 'hello words1', origin: 'null', lastEventId: '', source: Window, …}
// errorHandle.js:57 MessageEvent {isTrusted: true, data: 'hello words2', origin: 'null', lastEventId: '', source: Window, …}
// errorHandle.js:55 ste1
// errorHandle.js:60 ste1