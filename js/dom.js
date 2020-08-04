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
