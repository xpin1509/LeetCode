const girl = {
    name: 'xiaohong',
    age: '28'
}
var obj = new Proxy(girl, {
    get: function (target, propKey, receiver) {
        return target[propKey]
    },
    set: function (target, propKey, value, receiver) {
        // if (!target[propKey]) return
        console.log(value)
        target[propKey] = value
    }
});

obj.books = 'js'
