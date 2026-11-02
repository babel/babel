class A extends B {
  constructor(x) {
    if (x) super(1);
    else super(2);
    foo(this);
  }
}
