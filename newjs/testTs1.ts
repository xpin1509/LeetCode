interface Person {
    name: string;
    age: number;
    sex?: string;
}

type Picker1 <T, K extends keyof T> = {
    [P in K]: T[P]
} 

type Partical <T> = {
    [P in keyof T] ?: T[P]
}

type MockRequired1 <T> = {
    [P in keyof T] -?: T[P]
}

type Son = Picker1<Person, 'name' | 'age'>
const son: Son = {
    name: undefined,
    age: undefined
}

type Son2 = Partial<Person>
const son2: Son2 = {}

type Son3 = MockRequired1<Person>
const son3: Son3 = {
    name: undefined,
    age: undefined,
    sex: undefined
}
