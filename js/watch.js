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