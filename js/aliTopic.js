// 1.实现一个promise.race
class P {
    static race(promiseArr) {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < promiseArr.length; i++) {
                // 先取谁就返回谁
                promiseArr[i].then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            }
        })
    }
    static all (promiseArr) {
        return new Promise((resolve, reject) => {
            const result = {}
            for (let i = 0; i < promiseArr.length; i++) {
                // 全部成功返回result[]
                promiseArr[i].then(res => {
                    result[i] = {
                        status: 'resovled',
                        data: res
                    }
                    valid()
                }).catch(err => {
                    reject(err)
                })
            }
            function valid () {
                if (Object.keys(result).length !== promiseArr.length) {
                    return
                }
                let res = true
                const resultArr = []
                for (let i in result) {
                    if (result[i]['status'] !== 'resovled') {
                        res = false
                        return
                    } else {
                        resultArr.push(result[i].data)
                    }
                }
                if (res) resolve(resultArr)
            }
        })
    }
}
// 3.将一个html字符串变成树的形式
/**
 * '<html><span>hello world</span></html>'
 * @param {String} str 
 * return {Objec} dom
 */
function transfer (html) {
    const isselfCloseReg = /\/>$/
    const endTagReg = /^<\/[\w]+>$/
    const isStartTagReg = /^<[\w]+(\s+[\w-]+="[\w]*")*\/?>/

    let lastdom = null, dom = null
    while(html) {
        const starttag = html.match(isStartTagReg)
        const endTag = html.match(endTagReg)
        if (starttag && starttag[0].length) {
            // 开始标签
            const newDom = parserStart(starttag[0])
            if (!lastdom) {
                dom = newDom
                lastdom = dom
            } else {
                lastdom.children = lastdom.children ? [...lastdom.children, newDom] : [newDom]
            }
            html = html.substring(starttag[0].length)
        } else if (endTag && endTag[0]) {
            // 结束标签
            html = html.substring(endTag[0].length)
        } else {
            // 当做text处理,截取下一个<
            const index = html.indexOf('<')
            const text = html.substring(0, index)
            Object.assign(lastdom, { text })
            html = html.substring(index)
        }
    }
    function parserStart (startHtml) {
        let tag = '', attributes = {}, selfClose = false
        if (~startHtml.indexOf('/>')) {
            selfClose = true
            startHtml = startHtml.replace(/^</, '').replace(/\/>$/, '')
        } else {
            startHtml = startHtml.replace(/^</, '').replace(/>$/, '')
        }
        startHtml = startHtml.replace(/^</, '').replace(/>$/, '')
        const attrsAndTag = startHtml.split(' ')
        for (let attr of attrsAndTag) {
            if (~attr.indexOf('=')) {
                // 属性
                const [key, value] = attr.split('=')
                attributes[key] = value
            } else {
                // 标签
                tag = attr
            }
        }
        return {
            tag,
            attributes
        }
    }
    return dom
}
/* <div id="main" data-x="hello">Hello<span id="sub" /></div>
{
    tag: "div",
    selfClose: false,
    attributes: {
      "id": "main",
      "data-x": "hello"
    },
    text: "Hello",
    children: [
      {
        tag: "span",
        selfClose: true,
        attributes: {
          "id": "sub"
        }
      }
    ]
} */
// 2.xhr请求缓存与合并

// 4.给定一个数组,他的第i个元素是一支给定股票第i天的价格
// 见leetcode

// 5.给定两个二叉树,编写一个函数来检验他们是否相同
