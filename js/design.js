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
// 观察者模式中，发布者直接接触到订阅者
// 发布订阅模式不直接接触到订阅者，统一由第三方平台来完成实际的通信工作

// 策略模式
// 给ifelse添加映射关系

// 迭代器模式
// for of ｜ iterator生成器
