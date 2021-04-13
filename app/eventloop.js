
function test () {
    console.log('start')
     setTimeout(() => {
         console.log('children2')
         Promise.resolve().then(() => {console.log('children2-1')})
     }, 0)
     setTimeout(() => {
         console.log('children3')
         Promise.resolve().then(() => {console.log('children3-1')})
     }, 0)
     Promise.resolve().then(() => {console.log('children1')})
     console.log('end') 
 }

 function test1 () {
    process.nextTick(() => {
        console.log('3')
    })
    setImmediate(_ => {
        console.log('1')
        process.nextTick(() => {
            console.log('5')
        })
        Promise.resolve().then(_ => {
            console.log(7)
        })
    })
    setTimeout(_ => {
        console.log(2)
        process.nextTick(() => {
            console.log('6')
        })
        Promise.resolve().then(_ => {
            console.log(8)
        })
    })
    console.log('4')
 }
 
 test1()