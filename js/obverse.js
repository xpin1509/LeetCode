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