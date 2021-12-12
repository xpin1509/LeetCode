// ts的partical， required， pick， exclude， omit， deepReadOnly
type Partical2<T> = {
    [K in keyof T] ?: T[K]
}
type MockRequired2<T> = {
    [K in keyof T] -?: T[K]
}
type Picker2<T, U extends keyof T> = {
    [P in U] : T[P]
}
type Exclude2<T, U> = T extends U ? never : T
type Omit2<T, U extends keyof T> = {
    [P in Exclude2<keyof T, U>]: T[P]
}
type DeepReadOnly2<T> = {
    readonly [K in keyof T] : DeepReadOnly2<T[K]>
}

// 测试
interface Part {
    name: string;
    width: number;
    height: number;
}

const particals: Partical2<Part> = {
    name: 'string'
}
interface Part2 {
    name: string;
    width: number;
    height?: number;
}
const mockRequire: MockRequired2<Part2> = {
    name: undefined,
    width: undefined,
    height: undefined
}
const pick2: Picker2<Part2, 'name' | 'width'> = {
    name: undefined,
    width: undefined
}
const exclude: Exclude2<'name' | 'width' | 'height', 'name'> = 'height'

const omit2: Omit2<Part2, 'name'> = {
    width: undefined,
    height: undefined
}
interface Part3 {
    name: undefined,
    width: undefined,
    height: undefined,
    obj: Part2
}
const deepReadOnly: DeepReadOnly2<Part3> = {
    name: undefined,
    width: undefined,
    height: undefined,
    obj: {
        name: undefined,
        width: undefined
    }
}

// type TestReapeat = 'name'| 'age'
// type TestReapeat =  'seg'

// const xxxx: TestReapeat = 'name'