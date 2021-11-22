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