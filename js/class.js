/**
 * 
 * Class和class继承
 */ 
// class Person {
//     constructor(name) {
//         this.name = name
//     }
//     say () {
//         console.log(this.name)
//     }
//     static eat () {
//         console.log('do eat')
//     }
// }
// class Son extends Person{
//     constructor(name, age) {
//         super(name)
//         this.age = age
//     }
// }
// const son1 = new Son('son1', 12)
// console.log(son1)
// son1.say()
// Son.eat()
// 寄生组合继承
// function Person(name) {
//     this.name = name
// }
// Person.prototype.say = function() {
//     console.log(this.name)
// }
// Person.eat = function () {
//     console.log('do eat')
// }
// function Son(name, age) {
//     Person.call(this, name)
//     this.age = age
// }
// Son.prototype = Object.create(Person.prototype)
// Son.prototype.constructor = Son
// const son2 = new Son('son2', 12)
// console.log(son2)
// son2.say()