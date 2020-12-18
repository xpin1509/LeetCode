function dragstart (event) {
    console.log(event)
}
function drag (event) {
    console.log(event)
}
function dragdown (event) {
    console.log(event)
}

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
function lazy () {
    const imgBox = Array.from(document.querySelectorAll('.lazy-ui li'))
    if ('IntersectionObserver' in window) {
        const obverse = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.intersectionRatio && entry.intersectionRatio > 0) {
                    const img = entry.target.children[0]
                    img.src = img.dataset.src
                    // img.getAttribute('data-src')
                    obverse.unobserve(entry.target)
                }
            })
        }, {
            threshold: [0]
        })
        imgBox.forEach(el => {
            obverse.observe(el)
        })
    }
}
// document.addEventListener('DOMContentLoaded', lazy, false)
/**
 * JSONP function
 */
function say (msg) {
    console.log(msg)
}
function jsonp () {
    const script = document.createElement('script')
    script.src = './js/test3.js'
    document.body.appendChild(script)
}


function obverseDom (id) {
    // 选择需要观察变动的节点
    const targetNode = document.getElementById(id);

    // 观察器的配置（需要观察什么变动）
    const config = { attributes: false, childList: true, subtree: true };

    // 当观察到变动时执行的回调函数
    const callback = function(mutationsList, observer) {
        // Use traditional 'for loops' for IE 11
        // for(let mutation of mutationsList) {
        //     if (mutation.type === 'childList') {
        //         console.log('A child node has been added or removed.');
        //     } else if (mutation.type === 'attributes') {
        //         console.log('The ' + mutation.attributeName + ' attribute was modified.');
        //     }
        // }
        debugger
        for(let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                console.log('A child node has been added or removed.');
            }
            else if (mutation.type === 'attributes') {
                console.log('The ' + mutation.attributeName + ' attribute was modified.');
            }
        }
    };

    // 创建一个观察器实例并传入回调函数
    const observer = new MutationObserver(callback);

    // 以上述配置开始观察目标节点
    observer.observe(targetNode, config);

    // // 之后，可停止观察
    // observer.disconnect();
}

// obverseDom('obverseDom')

// const $dom = document.querySelector('#obverseDom')
// const lists = []
// for (let i = 0; i < 20; i++) {
//     const text = document.createElement('p')
//     text.innerHTML = 'hello world'
//     $dom.appendChild(text)
// }
// const div = document.createElement('div')
// div.innerHTML = 'why'
// $dom.appendChild(div)


function getClientRect (id) {
    const node = document.getElementById(id)
    return node.getBoundingClientRect()
}

