
const treeToList = (treeData) => {
    const map = {}, result  = [];
    let left = [];
    
    if (!treeData.length) {
        return result
    }

    treeData.map(item => {
      if (!map[item?.value]) {
        if (item?.children) {
          left = left.concat(item.children)
        }
        result.push({
          label: item?.label,
          value: item?.value
        })
      }
      map[item?.value] = true
    })

    debugger
  
    return [result, ...treeToList(left)]
}

console.log(treeToList(arr))
  