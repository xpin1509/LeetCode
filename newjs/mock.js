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

  