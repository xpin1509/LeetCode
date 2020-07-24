function getSquare(row, col) {
    const m = parseInt(row/3) * 3
    const n = parseInt(col/3) * 3
    return `start: (${m}, ${n}), col: (${m+2}, ${n+2})`
}
console.log(getSquare(0,1)) // 00 22
console.log(getSquare(0,2)) // 00 22 
console.log(getSquare(0,3)) // 03 25
console.log(getSquare(0,5)) // 03 25
console.log(getSquare(3,1)) // 30 52
console.log(getSquare(5,1)) // 30 52
console.log(getSquare(5,5)) // 33 55
console.log(getSquare(5,8)) // 36 58
console.log(getSquare(7,1)) // 60 82
console.log(getSquare(7,5)) // 63 85
console.log(getSquare(7,6)) // 66 88

// 00 22
// 03 25
// 06 28
// 30 52
// 33 55
// 36 58
// 60 82
// 63 85
// 66 88