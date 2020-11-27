// 截取数值
let index = 0
// 10s阈值
const TIMEOUT = 1000 * 1
const resTimes = window.performance.getEntriesByType('resource')
function getTimeoutRes (resTimes) {
    const list = resTimes.slice(index)
    index += list.length
    const result = list.filter(item => {
        const { startTime, responseEnd } = item
        const time = responseEnd - startTime
        return time > TIMEOUT
    }).map(el => el.name)
    return result
}
getTimeoutRes(resTimes)