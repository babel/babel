declare var foo;
declare var foo;
declare function foo(): void;
declare function foo(): void;
declare function foo<T>(): void;
declare function foo(x: number, y: string): void;
declare class A {}
declare class A<T> extends B<T> {
  x: number
}
declare class A {
  static foo(): number,
  static x: string,
}
declare class A {
  set fooProp(value: number): void,
  get fooProp(): number,
}
declare class A {
  static [indexer: number]: string
}
declare class A {
  static (): number
}
declare class B {
  (): number
}
declare class A mixins B<T>, C {}
declare type A1 = string;
declare type T<U> = {
  [k: string]: U
};
declare type B1 = {
  fn?: (foo: string) => void
};
declare interface I1 {
  foo: string
}
declare interface I2<T> {
  foo: T
}
declare module.exports: {
  foo: string
}
declare opaque type Foo<T>: Bar<T>;
declare opaque type ID;
declare opaque type num: number;
declare opaque type NumArray;
declare var sym: symbol;
