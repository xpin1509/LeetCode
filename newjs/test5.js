// 转换后的西湖区
// const a = {
//   0: {
//     label: '浙江省',
//     value: 'zhejiang'
//   },
//   1: {
//     label: '杭州市',
//     value: 'hangzhou',
//   },
//   2: {
//     label: '西湖区',
//     value: 'xihu',
//   }
// }

// const treeData = [
//     {
//         label: '江苏省',
//         value: '江苏',
//         children: [
//             {
//                 label: '南京市',
//                 value: 'nanjing',
//                 children: [
//                     {
//                         label: '鼓楼区',
//                         value: 'gulou',
//                     },
//                 ],
//             },
//         ]
//     },
//     {
//         label: '浙江省',
//         value: 'zhejiang',
//         children: [
//             {
//                 label: '杭州市',
//                 value: 'hangzhou',
//                 children: [
//                     {
//                         label: '西湖区',
//                         value: 'xihu',
//                     },
//                     {
//                         label: '萧山区',
//                         value: 'xiaoshan',
//                     },
//                     {
//                         label: '临安区',
//                         value: 'linan',
//                     },
//                 ],
//             },
//             {
//                 label: '宁波市',
//                 value: 'ningbo',
//                 children: [
//                     {
//                         label: '海曙区',
//                         value: 'haishu',
//                     },
//                     {
//                         label: '江北区',
//                         value: 'jiangbei',
//                     },
//                 ],
//             },
//         ],
//     }
// ]


// const transformTreeToArr = (treeNodes) => {
//     if (!treeNodes?.children?.length) {
//         return [treeNodes];
//     }

//     const result = [{ label: treeNodes.label, value: treeNodes.value }];

//     const left = treeNodes.children.reduce((total, cur) => {
//         const childrens = transformTreeToArr(cur)
//         return [...total, ...childrens]
//     }, []);

//     return [...result, ...left];
// };

// const transform1 = (treeData) => {
//     const res = []
//     for (let el of treeData) {
//         const item = transformTreeToArr(el)
//         const obj = {}
//         item.map((e, idx) => {
//             obj[idx] = e
//         })
//         res.push(obj)
//     }
//     return res
// }

// var twoSum = function (nums, target) {
//     const cache = {}
//     const result = []
//     for (let i = 0; i < nums.length; i++) {
//         const el = nums[i]
//         if (el > target) return result
//         if (cache[el] !== undefined) {
//             return [cache[el], i]
//         }
//         cache[target - el] = i
//     }
//     return result
// };

// // console.log(twoSum([2,7,11,15], 9))
// // console.log(twoSum([3,2,4], 6))
// // twoSum([3,3], 6)


