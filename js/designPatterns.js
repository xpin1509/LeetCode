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


// 原型模式
// 发布订阅模式