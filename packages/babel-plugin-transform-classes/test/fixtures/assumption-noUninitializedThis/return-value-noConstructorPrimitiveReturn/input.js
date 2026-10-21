class A extends B {
  constructor(x) {
    super();
    if (x) return x;
    if (!x) return;
    this.x = 1;
  }
}
