interface A1 {}
interface A2 extends B {}
interface A3<T> extends B<T>, C<T> {}
interface A4 {
  foo: () => number
}
interface Dictionary {
  length: number,
  [index: string]: string,
}

class Foo1 implements Bar {}

class Foo2 extends Bar implements Bat, Man<number> {}

class Foo3 extends class Bar implements Bat {} {}

class Foo4 extends class Bar implements Bat {} implements Man {}