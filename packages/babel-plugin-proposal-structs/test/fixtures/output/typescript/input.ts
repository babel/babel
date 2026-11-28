struct S<T> extends Base<T> implements I {
  x: T = init();
  y: number;
  constructor(x: T) {
    super();
  }
}
