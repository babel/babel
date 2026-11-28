struct S<T> extends A<T> implements I {
  x: T;
  private y?: number;
  m(): void;
  m(a?: T): void {}
  [key: string]: any;
  constructor(a: T) {
    super();
  }
}
