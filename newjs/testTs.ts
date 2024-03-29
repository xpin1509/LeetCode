// Picker, MockRequired, Partial
// 实现ReturnType
// 实现DeepReadOnly

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

interface A {
    content: string;
    width: number;
    height: number;
}
type MExclude<T, K extends keyof T> = {
    // [V extends keyof K ? never : ]: T[]
}
type MyType = MExclude<A, 'width'>

const foo: MyType = {}


// type ReturnType1212 <T> = T extends ([]: any) => infer P ? P : any