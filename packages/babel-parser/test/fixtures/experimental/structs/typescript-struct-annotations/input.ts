struct S<T> extends A<T> implements I, J<T> {
  x: T;
  m(): void;
  m(a?: T): void {}
  [key: string]: any;
}
