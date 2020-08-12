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
                if (Object.keys(result !== promiseArr.length)) {
                    return
                }
                let res = true
                const resultArr = []
                for (let i in result) {
                    if (i['status'] !== 'resovled') {
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
// 2.xhr请求缓存与合并

// 3.将一个html字符串变成树的形式

// 4.给定一个数组,他的第i个元素是一支给定股票第i天的价格

// 5.给定两个二叉树,编写一个函数来检验他们是否相同
