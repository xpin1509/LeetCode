/**
 * Promise
 * 14.45 -> 13.05
 */
class MyPromise {
    constructor () {}
    then () {}
    catch () {}
    finally () {}
    static all () {}
    static race () {}
}
const promise2 = new MyPromise((resovle, reject) => {
    setTimeout(() => {
        resovle(2000)
    }, 1000);
})
const promise1 = new MyPromise((resovle, reject) => {
    setTimeout(() => {
        resovle(1000)
    }, 1000);
})
MyPromise.all(promise2, promise1).then(res => {
    console.log(res)
})
MyPromise.race(promise2, promise1).then(res => {
    console.log(res)
})
