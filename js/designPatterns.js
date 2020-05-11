/**
 * Js的设计模式
 */
// 工厂模式
function factory (name, age, sex) {
    var obj = new Object()
    obj.name = name
    obj.age = age
    obj.sex = sex
    obj.sayName = function () {
        return this.name
    }
    return obj
}
// 返回都是object 无法识别对象的类型 不知道他们是哪个对象的实列
// const p1 = factory('lilei', 25, '男')
// typeof p1 object
// 优点：能解决多个相似的问题。
// 缺点：不能知道对象识别的问题(对象的类型不知道)


// 构造函数模式
function person(name, age) {
    this.name = name
    this.age = age
    this.sayName = function () {}
}
// var p1 = new person('lilei', 26)
// var p2 = new person('hanmeimei', 29)
// console.log(p1)
// console.log(p2)
// new 具体的操作
// 1.创建新的对象
// 2.将函数的作用域赋给对象的this
// 3.执行构造函数的方法
// 4.返回新的对象

// 缺点：每次实例化一个function


// 组合使用构造函数和原型模式
function Person2(name, age) {
    this.name = name
    this.age = age
    
}
Person2.prototype.sayName = function() {}

// 单例模式
function single (name) {
    this.fullname = name
    this.instatance = null
}
single.prototype.getName = function () {
    console.log(this.fullname)
}
single.getInstance = function (name) {
    if (!this.instatance) {
        this.instatance = new single(name)
    }
    return this.instatance
}
var winner = single.getInstance('xiaoming')
var looser = single.getInstance('xiaofang')


// 发布订阅模式
var eventEnitter = {
    list : {},
    on: function (type, fn) {
        if (!this.list[type]) {
            this.list[type] = []
        }
        this.list[type].push(fn)
    },
    emit: function() {
        const type = [].shift.call(arguments)
        this.list[type].forEach(fn => {
            fn.apply(this, arguments)
        })
    },
    off: function(type, fn) {
        if (!this.list[type]) return
        for (let i = 0; i < this.list[type].length; i++) {
            if (fn === this.list[type][i]) {
                this.list[type].splice(i, 1)
            }
        }
    }
}
function sayName(name) {
    console.log(name)
}
function sayAge (age, sex) {
    console.log(age, sex)
}
eventEnitter.on('article', sayName)
eventEnitter.on('person', sayAge)

eventEnitter.emit('article', 'hello world')
eventEnitter.emit('person', 25, '男')

eventEnitter.off('article', sayName)
eventEnitter.off('person', sayAge)

eventEnitter.emit('article', 'hello world2')