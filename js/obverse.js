class Watcher {
    addDep (dep) {
        dep.addSup(this)
    }
    update () {
        console.log('update')
    }
}
class Dep {
    constructor () {
        this.subs = []
    }
    addSup (sub) {
        this.subs.push(sub)
    }
    depend () {
        if (Dep.target) {
            Dep.target.addDep(this)
        }
    }
    notify () {
        this.subs.forEach(el => {
            el.update()
        })
    }
}
Dep.target = new Watcher()

function observe (data, vm) {
    Object.keys(data).forEach(key => {
        walk(data, key)
    })
    function walk (data, key) {
        let value = data[key]
        const dep = new Dep()
        Object.defineProperty(vm, key, {
            get () {
                console.log('get')
                dep.depend()
                return value
            },
            set (newVal) {
                console.log('set')
                value = newVal
                dep.notify()
            }
        })
    }
}

function myVue (options) {
    observe(options.data(), this)
}

const vm = new myVue({
    data () {
        return {
            name: 'xpin',
            age: 28
        }
    }
})
console.log(vm.name)
vm.name = 'xiaoming'















// class Watcher {
//     update() {
//         console.log('更新~');
//     }
// }
// class Dep {
//     constructor() {
//         this._watchers = new Set();
//     }
//     add(watcher) {
//         if (!this._watchers.has(watcher)) {
//             this._watchers.add(watcher);
//         }
//     }
//     notify() {
//         this._watchers.forEach(watch => {
//             watch.update();
//         })
//     }
// }

// Dep.target = new Watcher();

// function observer(target) {
//     if (typeof target === 'object' && target !== null) {
//         Object.keys(target).forEach(key => {
//             defineReactive(target, key, target[key]);
//         })
//     }
// }
// function defineReactive(target, key, val) {
//     const dep = new Dep();
//     if (typeof val === 'object' && val !== null) {
//         observer(val);
//     }
//     Object.defineProperty(target, key, {
//         get() {
//             dep.add(Dep.target);
//             return val;
//         },
//         set(newVal) {
//             dep.notify();
//             val = newVal;
//         }
//     })
// }

// const data = {
//     name: 'xpin',
//     age: 28
// }
// observer(data)


class Watcher {
    update () {
        console.log('更新~')
    }
}
class Dep {
    constructor() {
        this._watcher = new Set()
    }
    add (watcher) {
        if (!this._watcher.has(watcher)) {
            this._watcher.add(watcher)
        }
    }
    notice () {
        this._watcher.forEach(watcher => {
            watcher.update()
        })
    }
}
Dep.target = new Watcher()

function observer (target) {
    if (target instanceof Object && target !== null) {
        Object.keys(target).forEach(key => {
            defineReact(target, key, target[key])
        })
    }
}
function defineReact(target, key, val) {
    const dep = new Dep()
    if (val instanceof Object) {
        observer(val)
    }
    Object.defineProperty(target, key, {
        get () {
            dep.add(Dep.target)
            return val
        },
        set (newVal) {
            dep.notice()
            val = newVal
        }
    })
}
const data = {
    name: 'xpin',
    age: 28
}
observer(data)