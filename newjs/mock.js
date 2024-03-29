// 高仙
// We have a list of events going on for a single day, find events that overlap with other events and group them together. 

// If event A overlaps with event B, event B overlaps with event C, these 3 events should be grouped together.

// Examples:  

// - { start: "05:00 PM", end: "07:00 PM" } overlaps with { start: "05:30 PM", end: "07:30 PM" }
// - { start: "05:00 PM", end: "07:00 PM" } is not overlapped with { start: "07:00 PM", end: "08:00 PM" }

// Input:

const events = [
    { 'start': "05:00 PM", 'end': "07:00 PM" },
    { 'start': "02:00 PM", 'end': "03:30 PM" },
    { 'start': "06:00 AM", 'end': "07:00 AM" },
    { 'start': "06:00 PM", 'end': "07:30 PM" },
    { 'start': "07:00 AM", 'end': "08:00 AM" },
    { 'start': "12:30 PM", 'end': "01:30 PM" },
    { 'start': "11:15 AM", 'end': "12:35 PM" },
    { 'start': "02:30 PM", 'end': "03:00 PM" },
    { 'start': "03:15 AM", 'end': "04:15 AM" },
    { 'start': "03:15 PM", 'end': "04:15 PM" },
    { 'start': "02:00 AM", 'end': "03:00 AM" },
    { 'start': "02:30 AM", 'end': "03:30 AM" },
    { 'start': "11:00 AM", 'end': "01:00 PM" },
  ];
  
  // Sample Output:
  
const results = [
    [
       {'start': '05:00 AM', 'end': '07:00 AM'},
       {'start': '05:30 AM', 'end': '08:00 AM'},
    ],
    [
       {'start': '09:00 AM', 'end': '11:00 AM'},
    ],
   ]
  
  
function convertTime (half, time) {
    const [hour, min] = time.split(':')
    
    if (half === 'PM' && hour !== '12') {
      return 12 * 60  + hour * 60 + min
    } else {
      return hour * 60 + min
    }
}
  
function chgnge (events) {
    // 'PM' ? 12 * 60 + changeHour(time) : changeHour(time)
    const result = []
    // events.forEach(item => {
    //   const [time, half] = item.start.split(' ') //02:00 AM
    //   const [eTime, ehalf] = item.end.split(' ') //02:00 AM
    //   // 12:30 PM => Noon time
    //   item.StartTime = converTime(half, time)
    //   item.EndTime = convertTime(ehalf, eTime)
    // })
    
    events = events.sort((a, b) => convert(a.StartTime) - convert(b.StartTime))
                            
    console.log(events)
    let temp = [events[0]];
    let currentEnd = temp.EndTime;
    for (let i = 1; i < events.length; i++) {
      // const [StartTime, EndTime] = events[i]
      // const [jStartTime, jEndTime] = events[i + 1]
      
      const currentEvent = events[i];
      if (convert(currentEvent.StartTime) < convert(currentEnd)) {
        temp.push(currentEvent);
        currentEnd = Math.max(currentEnd, currentEvent.EndTime)
      } else {
        results.push(temp)
        temp = [currentEvent]
        currentEnd = currentEvent.EndTime
      }
      
      // if (events[i].flag) continue
      // const [StartTime, EndTime] = events[i]
      
      // const temp = [events[i]]
      // result.push(temp)
      // for (let j = i + 1; j < events.length; j++) {
      //   const [jStartTime, jEndTime] = events[j]
      //   if (jStartTime <= StartTime) {
      //     temp.push(events[j])
      //   } else {
      //     result.push([events[j]])
      //   }
      //   events[j].flag = true
      // }
      
    }
    return result
  }
  
  
  // 数坤
  function uniqe (arr, num = 1) {
    const map = {}
    const result = []
    for (let i = 0; i < arr.length; i++) {
        if (map[arr[i]]) {
            if (map[arr[i]] >= num) {
                continue
            } else {
                map[arr[i]] = map[arr[i]] + 1
                result.push(arr[i])
            }
        } else {
            map[arr[i]] = 1
            result.push(arr[i])
        }
    }
    return result
}

// const arr = [3,4, 3, 3,3]
// 12,2,4,32,1,2,

// console.log(uniqe(arr, 2))

// splice的时间复杂度 O（n）

// rgb(255, 255, 0), #fff 查找
function findN (arr, key) {
    if (arr.length < 2) return arr
    let min = arr[0]
    const [a, b, c] = key
    for (let i = 1; i < arr.length; i++) {
        const [a1,b1, c1] = arr[i]
        const newMin = (Math.abs(a - a1) + Math.abs(b -b1) + Math.abs(c - c1))
        const oriMin = (Math.abs(a - min[0]) + Math.abs(b - min[1]) + Math.abs(c - min[2]))
        if (newMin < oriMin) {
            min = arr[i]
        }
    }
    return min
}

//实现function transform， 将 item = 'a.b.c.d' 这样的字符串转换为形如 {a: {b: {c: {d: {}}}}} 的合法对象
function transform(item) {

  const arr = item.split('.')
  let lastObj = {}
  let cur = lastObj
  while (arr.length) {
    const item = arr.shift()
    const newObj = {}
    lastObj[item] = newObj
    lastObj = newObj
  }
  return cur
}

// 实现function retry

// const retry5Times = retry((...args) => {})
function retry (fn, maxRetryCounts) {
  return () => new Promise(async (resolve, reject) => {
    let result, errMesg
    for (let i = maxRetryCounts - 1; i >= 0; i--) {
      try {
        result = await fn()
        break
      } catch (e) {
        if (i === 0) {
          errMesg = e
        }
      }
    }

    if (!errMesg) {
      return resolve(result)
    } else {
      return reject(errMesg)
    }
  })
}

const setReject = function () {
  console.log('runing')
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(1), 500)
    // setTimeout(() => resolve(100), 500)
  })
}

const retry5Times = retry(setReject, 8)

// retry5Times().then(res => {
//   console.log(res)
// }).catch(err => {
//   console.log(err)
// });


const arr = [{
  id: 0,
  data: 1
}, {
  pid: 0,
  id: 1,
  data: 2
}, {
  pid: 0,
  id: 2,
  data: 3,
}, {
  pid: 2,
  id: 3,
  data: 4
}]

function toTree1 (arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j ++) {
      if (arr[i].id === arr[j].pid) {
        if (arr[i].children) {
          arr[i].children.push(arr[j])
        } else {
          arr[i].children = [arr[j]]
        }
      }
    }
  } 
  const root = arr.filter(el => el.pid == null)
  return root
}

const tree = [{
  id: 0,
  data: 1,
  children: [
    {
      pid: 0,
      id: 1,
      data: 2,
    },

    {
      pid: 0,
      id: 2,
      data: 3,
      children: [
        {
          pid: 2,
          id: 3,
          data: 4
        }
      ]
    },
  ]
}]

function toTree2 (arr) {
  const map = {};
  const result = [];

  arr.forEach((item) => {
    map[item.id] = item;
  });

  arr.forEach((item) => {
    const parent = map[item.pid];
    if (parent) {
      parent.children = parent.children || [];
      parent.children.push(item);
    } else {
      result.push(item);
    }
  });

  return result;
}

class Stack {
	constructor () {
		this.values = []
		this.min = []
	}
	push(item) {
		this.values.push(item)
		if (!this.min.length || item <= this.min) {
			this.min.push(item)
		}
	}
	pop () {
		if (this.getTop() <= this.min[this.min.length - 1]) {
			this.min.pop()
		}
		return this.values.pop()
	}
	getTop () {
		return this.values[this.values.length - 1]
	}
	size () {
		return this.values.length
	}
	getMin () {
		// return Math.min(...this.values)
		// for (let i = 0; i < this.values; i ++)
		return this.min[this.min.length - 1]
	}
}
// new Stack().push(1)
    
    
    // [1,1,4,2]
    // [1, 2]





// =====================================================
// 欢迎参加有赞前端 Coding 面试
// =====================================================
// 界面介绍：
//   上方设置按钮可以切换语言、字体大小、主题
//   右侧控制台可以显示代码执行结果，可用于编码过程中的 DEBUG
// =====================================================
// Coding 须知：
//   量力答题 选做两道
// =====================================================


/**
 * ## 问题1
 * 实现 getValue 函数，安全的获取目标对象指定 path 的值
 * @params {object | array} value 指定对象
 * @params {string} path
 */

const object = { 'a': [{ 'b': { 'c': 3 } }] }; // path: 'a[0].b.c'
const array = [{ "a": { b: [1] } }]; // path: '[0].a.b[0]'

function getValue(obj, path) {
  let lastObj = obj
  while(path) {
    const AlpStart = /^[a-z]/
    const NumStart = /^\[(\d+)\]/
    if (AlpStart.test(path)) {
      const key = AlpStart.exec(path)[0]
      path = path.replace(AlpStart, '')
      lastObj = lastObj[key]
    } else if (NumStart.test(path)){
      const key = +NumStart.exec(path)[1]
      path = path.replace(NumStart, '')
      lastObj = lastObj[key]
      // debugger
    } else if (/^\./.test(path)){
      path = path.replace(/^\./, '')
    } else {
      break
    }
  }
  return lastObj
}

// console.log(1, getValue(object, 'a[0].b.c')); // 3
// console.log(2, getValue(array, '[0].a.b[0]')); // 1
// console.log(3, getValue({ a: 1 }, 'a')); // 1

/**
 * ## 问题2
 * 将一个json数据的所有key从下划线改为驼峰
 * @param {object | array} value 待处理对象或数组
 * @returns {object | array} 处理后的对象或数组
 */

const testData = {
    a_bbb: 123, //aBbb
    a_g: [1, 2, 3, 4],
    a_d: {
        s: 2,
        s_d: 3
    },
    a_f: [1, 2, 3, {
        a_g: 5
    }],
    a_d_s: 1
}

function mapKeysToCamelCase(data) {
  if (typeof data !== 'object' || data === null) { return data}
  const result = {}
  for (let i in data) {
    result[toCaml(i)] = data[i] instanceof Object ? mapKeysToCamelCase(data[i]) : data[i]
  }

  function toCaml (str) {
    return str.replace(/(_\w)/g, function(world) {
      return /[a-zA-Z]/.exec(world)[0].toUpperCase()
    })
  }

  return result
}

// console.log(mapKeysToCamelCase(testData));

/**
 * 问题3
 * 将数组转化为 tree 结构
*/

const arr111 = [
    { id: 1, name: "第一", pid: 0 },
    { id: 2, name: "第二", pid: 1 },
    { id: 3, name: "第三", pid: 1 },
    { id: 4, name: "第四", pid: 3 },
    { id: 5, name: "第五", pid: 4 },
];
function listToTree (list) {
  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < list.length; j ++) {
      if (list[i].id === list[j].pid) {
        if (list[i].children) {
          list[i].children.push(list[j])
        } else {
          list[i].children = [list[j]]
        }
      }
    }
  }
  return list.find(el => !el.pid)
}
// console.log(listToTree(arr111));
// 返回结果 example
// {
//   pid: 0,
//   id: 1,
//   name: "第一",
//   children: [
//     {
//       pid: 1,
//       id: 2,
//       name: "第二",
//       children: [],
//     },
//     {
//       pid: 1,
//       id: 3,
//       name: "第三",
//       children: [
//         {
//           pid: 3,
//           id: 4,
//           name: "第四",
//           children: [
//             {
//               pid: 4,
//               id: 5,
//               name: "第五",
//             },
//           ],
//         },
//       ],
//     },
//   ],
// };

// match的与原用
// 如果正则表达式不包含 g 标志，str.match() 将返回与 RegExp.exec(). 相同的结果。
// 一次遍历的tree方法
// 寄生组合继承和class的差别
// 微信小程序setData后续处理
// 虚拟dom跟wxml的差异


const obj1212121 = {

	id: 123,

	name:'Bill',

	video_game_consoles: [
		{
			name:'PlayStation 4',
			buy_at:'2014-10-10',
			games: {
			1001: {
				name:'Devil May Cry 5',
				type_name:'Action',
				is_finished: false,
				},
				1002: {
					name:`Assassin's Creed`,
					type_name: 'Action',
					is_finished: true,
				}
			},
		},
	]
}

function toCamle(obj) {
	const result = {}
  if (Array.isArray(obj)) {
    const arr = []
    for (let i = 0; i < obj.length; i++) {
      arr.push(toCamle(obj[i]))
    }
    return arr
  }
	for (let i in obj) {
		const key = change(i)
		result[key] = typeof obj[i] === 'object' ? toCamle(obj[i]) : obj[i]
	}
	return result
	
	function change (str) {
		return str.replace(/(_\w)/g, function(w) {
			return w.replace('_', '').toUpperCase()
		})
	}
}

// The TestCase is shown below
// Input : 1 2
// Output : 3

function checkNum1 (num) {
	const res = [num]
	
	while (true) {
		
		const r = sq(num)
		if (r !== 1) {
      if (res.indexOf(r) !== -1){
        return false
      } else {
        res.push(r)
        num = r
      }
    } else {
      return true
    }
   
	}
	
	function sq (n) {
    
		const res = (n + '').split('').reduce((total, cur) => total + (+cur * +cur), 0)
    console.log(res)
    return res
	}
}

// 题目一：实现 `stringToArray` 函数，支持中英文逗号分隔。
// 如：
// ```js
// console.log(stringToArray(true)) // => ['1']
 // => ['1', '2', '3', '4'] // 英文逗号

// stringToArray('1，2,3,4') // => ['1', '2', '3', '4'] // 中文逗号
 // => ['1', '2', '3', '4'] // 多个逗号
 // => ['1', '2', '3', '4'] // 空格
//  // => []
// stringToArray() // => []
// stringToArray(true) // => []
// ```
function stringToArray(arr) {
  //你的实现
  const str = typeof arr === 'string' ? arr : (arr + '')
  return str.split(/\D/g).filter(el => !!el)
}

// 题目二：编写一个函数，实现输入任意一个JSON对象，返回这个对象中所有 Number 类型值之和
// 如： 
// ```
// const jsonObj = {
//     a: 1,
//     b: {
//         c: 2,
//         d: "abc",
//         e: [1,2]
//     },
//     e: {
//         f: {
//             g: 3
//         }
//     }
// }

// getSum(jsonObj);
// // 返回结果 9
// ```
// const jsonObj = {
//   a: 1,
//   b: {
//       c: 2,
//       d: "abc",
//       e: [1,2]
//   },
//   e: {
//       f: {
//           g: 3
//       }
//   }
// }
function getSum(obj){
  let res = 0
  //你的实现
  for (let i in obj) {
    if (typeof obj[i] === 'number') {
      res += obj[i]
    } else if (typeof obj[i] === 'object') {
      res += getSum(obj[i])
    }
  }
  return res
}

// 题目三：给定一个模板和一个对象，利用对象中的数据渲染模板，并返回最终结果。
// 如：
// ```
//  let template = '你好，我们公司是{{ company }}，我们属于{{group.name}}业务线，我们在招聘各种方向的人才，包括{{group.jobs[0]}}等。'

//  let obj = {
//    group: {
//    name: '天猫',
//    jobs: ['前端']
//  },
//    company: '阿里'
//  }

//  console.log(render(template, obj))
// => 你好，我们公司是阿里，我们属于天猫业务线，我们在招聘各种方向的人才，包括前端等。
// ```’
function render1212(template, data){
  //你的实现
  const reg = /\{\{(\w|\[|\]|\s|\.|\")*\}\}/g
    return template.replace(reg, function (world) {

        let attr = world.replace(/((\{\{) | (\s)* | (\}\}))/g, '')
        const attrResult = []
        while (/\w+/.exec(attr)) {
            attrResult.push(/\w+/.exec(attr)[0])
            attr = attr.replace(/\w+/, '')
        }
        let result = data
        attrResult.forEach(el => {
            result = result[el]
        })
        return result
    })
}

// 题目四：请将下面代码编译成ES5版本
// ```
// class Car {
//     constructor(brand) {
//         this.brand = brand;
//     }
//     start() {
//         console.log(`brand is ${this.brand}`);
//     }
//     startDelay(time) {
//         setTimeout(() => {
//             console.log(`brand is ${this.brand}`);
//         }, time);
//     }
// }
// ```
// // 你的实现

function Car (brand) {
  this.brand = brand;
}

Car.prototype.start = function () {
  console.log(`brand is ${this.brand}`);
}

Car.prototype.startDelay = function (time) {
  setTimeout(() => {
      console.log(`brand is ${this.brand}`);
  }, time);
}

// import { useRef } from 'React'
const usePrevious = function ( obj ) {
  const ref = useRef(obj)

  useEffect(() => {
    const source = ref.current
    const newObject = obj
    let flag = false
    for (let e in newObject) {
      if (source[e] !== newObject[e]) {
        flag = true
      }
    }
    flag = flag || Object.keys(obj).length !== Object.keys(source).length
    ref.current = flag ? newObject : source
  }, [obj])

  return ref.current
}
function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}

function reverseLinkNode (head) {
  let pre = null
  let cur = head
  while (cur) {
    const temp = cur.next
    cur.next = pre

    pre = cur
    cur = temp
  }
  return pre
}

// 在一个二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。
// 请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。
// 1 3 5 7
// 2 4 6 8
// 3 7 11 13
// 9 10 14 15
function checkNumberIn (arr, target) {
  if (!(arr.length && arr[0].length)) return false
  let row = arr.length - 1, len = arr[0].length - 1
  let i = row, j = 0
  while (i >= 0 && j <= len) {
    if (arr[i][j] === target) {
      return true
    } else if (arr[i][j] > target) {
      j--
    } else if (arr[i][j] < target){
      i++
    }
  }
  return false
}

/**
  * 
  * @param A int整型一维数组 
  * @param target int整型 
  * @return int整型
  */
function searchInsert(A, target) {
  // write code here
  for (let i = 0; i < A.length; i++) {
      if (A[i] === target) {
          return i
      } else if (A[i] > target){
          return i
      }
  }
  return A.length
}

// ["a","b","c","d"] => {a: {b: {c: {d: null}}}}
function transformDta (arr) {
  let last = null
  for (let i = arr.length - 1; i >= 0; i--) {
      last = {
          [arr[i]]: last
      }
  }
  return last
}

// 给定一个字符串 A(B(,),C(D(,),))，写一个函数，解析为如下结构：
// {
// Val: A’,
// Left: { Val: ‘B’ }
// Right: { Val: ‘C’, Left: { Val: ‘D’ } }
// }

function transfor (str) {
}
// console.log(transfor('A(B(,),C(D(,),))'))
