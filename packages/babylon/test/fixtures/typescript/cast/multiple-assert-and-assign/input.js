interface A {
  name: string
}
interface B extends A {
  age: number
}
let a;
(a as A as B) = {
  name: 'Alice',
  age: 23
}