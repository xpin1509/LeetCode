// SOLID五大设计原则
// 单一功能原则 *
// 开放封闭原则 *
// 里式替换原则
// 接口隔离原则
// 依赖反转原则

// 一、创建型
// 单例模式
class Single {
    static getInstance () {
        if (!Single.instance) {
            Single.instance = new Single()
        }
        return Single.instance
    }
}
// 工厂模式
function  Factory(name, age, career) {
    var user = {
        name, age, career
    }
    return user
}
// 构造器模式
function Constructor(name, age, career) {
    this.name= name
    this.age = age
    this.career = career
}
// 原型模式
Constructor.prototype.doSomething = function (params) {
    console.log(params)
}
// 抽象工厂模式
class Os {
    constrolHardWare () {}
}
class AndroidOs extends Os {
    constrolHardWare () {}
}

// 二、结构型
// 装饰器模式
class openBtn {
    onclick () {}
}
class Decortor {
    constructor (openBtn) {
        this._open_button = openBtn
    }
    onclick () {
        this.open_button.onClick()
        // 包装新的功能
        this.changeBtnStatus()
    }
    changeBtnStatus () {}
}
const openBtn = new openBtn()
// 适配器模式
// 库的封装，比如axios等

// 代理模式
const proxy = new Proxy(target, {
    get (girl, key) {
        return girl[key]
    },
    set (girl, key, val) {
        girl.key = val
    }
})
// 事件代理等

// 三、行为型
// 观察者模式（发布订阅模式）
// 1.观察者模式中，发布者直接接触到订阅者
// 2.发布订阅模式不直接接触到订阅者，统一由第三方平台来完成实际的通信工作

// 策略模式
// 给ifelse添加映射关系

// 迭代器模式
// for of ｜ iterator生成器



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


// // 发布订阅模式
// var eventEnitter = {
//     list : {},
//     on: function (type, fn) {
//         if (!this.list[type]) {
//             this.list[type] = []
//         }
//         this.list[type].push(fn)
//     },
//     emit: function() {
//         const type = [].shift.call(arguments)
//         this.list[type].forEach(fn => {
//             fn.apply(this, arguments)
//         })
//     },
//     off: function(type, fn) {
//         if (!this.list[type]) return
//         for (let i = 0; i < this.list[type].length; i++) {
//             if (fn === this.list[type][i]) {
//                 this.list[type].splice(i, 1)
//             }
//         }
//     }
// }
// function sayName(name) {
//     console.log(name)
// }
// function sayAge (age, sex) {
//     console.log(age, sex)
// }
// eventEnitter.on('article', sayName)
// eventEnitter.on('person', sayAge)

// eventEnitter.emit('article', 'hello world')
// eventEnitter.emit('person', 25, '男')

// eventEnitter.off('article', sayName)
// eventEnitter.off('person', sayAge)

// eventEnitter.emit('article', 'hello world2')

const eventbus = {
    events: {},
    on (evenname, fn) {
        if (this.events[evenname]) {
            this.events[evenname].push(fn)
        } else {
            this.events[evenname] = [fn]
        }
    },
    emit (evenname, ...args) {
        const events = this.events[evenname]
        if (events && events.length) {
            for (let i = 0; i < events.length; i++) {
                const fn = events[i]
                fn.apply(this, args)
            }
        }
    }
}
eventbus.on('open', (...args) => {
    console.log(this)
    console.log('open', ...args)
})
eventbus.on('close', () => {
    console.log('close')
})
eventbus.emit('open', 'xubin', 28)
// eventbus.emit('close')