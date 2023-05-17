const dec = () => {};
class A extends B {
  constructor() {
    let a = 2;
    super(a);
    foo();
  }

  @dec
  method() {}
}
