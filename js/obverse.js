class Watcher {
    addDep () {

    }
    update () {
        console.log('update')
    }
}
class Dep {
    constructor () {
        this.subs = []
    }
    addSup () {
        this.subs.push()
    }
    depend () {}
    notify () {}
}
Dep.target = Watcher

function observe () {
    Object.keys(data).forEach(key => {
        walk(data, key)
    })
    function walk (data, key) {
        Object.defineProperties(data, key, {
            get () {

            },
            set () {}
        })
    }
}
const data = {
    name: 'xpin',
    age: 28
}
observe(data)
data.name = 'xiaoming'