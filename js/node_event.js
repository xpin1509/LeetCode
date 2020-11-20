// 6个阶段
// timmer阶段
// poll阶段
// checkout阶段

setTimeout (() => {
    console.log('setTimeout1')
    setTimeout(() => {
        console.log('setTimeout2')
    })
    
    setImmediate(() => {
        console.log('setImmediate1')
    })
    Promise.resolve().then(() => {
        console.log('promise.then')
    })
    process.nextTick(() => {
        console.log('process nextTick')
    })
    
})

Promise.resolve().then(() => {
    console.log('promise.then')
})

// setTimeout(() => {
//     console.log('setTimeout2')
// })

// setImmediate(() => {
//     console.log('setImmediate1')
// })

// process比较特殊
// 有自己的nextTick队列，当每个阶段完成后，若有nextTick就会清空队列
// 优于其他mico task
// process.nextTick(() => {
//     console.log('process nextTick')
// })

