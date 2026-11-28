struct S<T> extends Base<T> implements I {
  x: T = init();
  y: number;
  f = (() => {}) as Fn;
  constructor(x: T) {
    super();
  }
}
