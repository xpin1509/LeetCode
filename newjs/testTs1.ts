type Picker11 <T, E extends keyof T> = {
    [P in E]: T[P]
}

type RequireKey1 <T> = {
    [P in keyof T] -?: T[P]
}

type Partical11<T> = {
    [P in keyof T] ?: T[P]
}

type ReturnType1 <T> = T extends (param: any) => infer P ? P : any

type DeepReadOnly1 <T> = {
    [P in keyof T] ?: DeepReadOnly1<T[P]>
}

type Exclude1212 <T, E extends keyof T> = {
   [P in Exclude<keyof T, E>]: T[P]
}

type Exclude121212 <T, E> = T extends E ? never: T

// interface A1 {
//     width: 'string';
//     height: 'string'
// }
// type aaA = Exclude1212<A1, 'width'>

// const aaaaaa: aaA = {
//     height: undefined
// }