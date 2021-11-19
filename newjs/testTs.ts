// Picker, MockRequired, Partial
type Picker<T, K extends keyof T> = {
    [P in K]: T[P]
  }
type MockRequired<T> = {
    [K in keyof T] -?: T[K]
}
type Partial1<T> = {
    [K in keyof T]?: T[K]
}
interface Mock {
    name: string;
    age: number;
    sex?: string;
}
type RequireKey = 'name' | 'age' | 'sex'
type Pick1 = 'name'
const xubin: Picker<Mock, Pick1> = {
    name: undefined
} 

// type anyProps = {
//     [x: string]: any
// }
// const anyprops: anyProps = {}
// anyprops.name = ''

// let str = '' as any
let str: unknown = ''
str = 129
str = {}

// str.name = 'xpin'