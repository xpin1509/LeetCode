// 详见知乎问题
// https://www.zhihu.com/question/31809713/answer/53544875

function clickHandle () {
    const $dom = document.getElementById('dom')
    // console.time('cost')
    // 1.每次插入
    // for (let i = 0; i < 100000; i++) {
        // const el = document.createElement('div') 
        // el.innerHTML = 'hello world' + i + 'this is append'
    //     el.style = 'color: green'
    //     $dom.appendChild(el)
    // }
    // 2.一次插入 相比第一种节省很多时间
    // let $el = ''
    // for (let i = 0; i < 100000; i++) {
    //     const el = `<div style="color: green">hello world ${i} this is append</div>`
    //     $el += el
    // }
    // $dom.innerHTML = $el
    /**
     * 3.插入文档片段
     * document.createFragment
     */
    // const fragMent = document.createDocumentFragment()
    // for (let i = 0; i < 100000; i++) {
    //     const el = document.createElement('div') 
    //     el.innerHTML = 'hello world' + i + 'this is append'
    //     el.style = 'color: green'
    //     fragMent.appendChild(el)
    // }
    // $dom.appendChild(fragMent)
}

function syncDom () {
    // 插入十万条数据
    const total = 100000
    // 一次插入 20 条，如果觉得性能不好就减少
    let ul = document.querySelector('ul')
    for (let i = 0; i < total; i++) {
        const li = document.createElement('li')
        li.innerText = Math.floor(Math.random() * total)
        ul.appendChild(li)
    }
}
// syncDom()
//     setTimeout(() => {
//         // 插入十万条数据
//         const total = 100000
//         // 一次插入 20 条，如果觉得性能不好就减少
//         const once = 20
//         // 渲染数据总共需要几次
//         const loopCount = total / once
//         let countOfRender = 0
//         let ul = document.querySelector('ul')
//         function add() {
//             // 优化性能，插入不会造成回流
//             const fragment = document.createDocumentFragment()
//             for (let i = 0; i < once; i++) {
//                 const li = document.createElement('li')
//                 li.innerText = Math.floor(Math.random() * total)
//                 fragment.appendChild(li)
//             }
//             ul.appendChild(fragment)
//             countOfRender += 1
//             loop()
//         }
//         function loop() {
//             if (countOfRender < loopCount) {
//                 window.requestAnimationFrame(add)
//             }
//         }
//         loop()
//   }, 0)

function addDom () {
    // 方案1
    const count = 100000
    let $ul = document.querySelector('ul')
    // const fragment = document.createDocumentFragment()
    // for (let i = 0; i < count; i++) {
    //     const li = document.createElement('li')
    //     li.innerText = Math.floor(Math.random() * count)
    //     fragment.appendChild(li)
    // }
    // $ul.appendChild(fragment)
    // 方案 2 createDocumentFregment和requestAnimationFrame
    const once = 100
    let times = 0
    function addChild () {
        console.log(times * once)
        if (times * once > count) return
        const fragment = document.createDocumentFragment()
        const dom = ''
        for (let i = 0; i < once; i++) {
            const li = document.createElement('li')
            li.innerText = Math.floor(Math.random() * count)
            fragment.appendChild(li)
        }
        $ul.appendChild(fragment)
        times ++
        window.requestAnimationFrame(addChild)
    }
    window.requestAnimationFrame(addChild)
}
function addDomOnce () {
    // 方案1
    const count = 1000
    let $ul = document.querySelector('ul')
    const fragment = document.createDocumentFragment()
    for (let i = 0; i < count; i++) {
        const li = document.createElement('li')
        li.innerText = Math.floor(Math.random() * count)
        fragment.appendChild(li)
    }
    $ul.appendChild(fragment)
}

// 滚动到顶部
function scrollToTop () {
    function scroll () {
        let scrollY = document.body.scrollTop || document.documentElement.scrollTop
        if (scrollY === 0) return
        const scrollPx = Math.floor(scrollY/2)
        document.body.scrollTop = document.documentElement.scrollTop = scrollPx
        window.requestAnimationFrame(scroll)
    }
    window.requestAnimationFrame(scroll)
}
