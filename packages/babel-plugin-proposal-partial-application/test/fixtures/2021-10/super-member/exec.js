class B {
  f(x) { return [this.name, x]; }
}
class A extends B {
  name = "a";
  m() { return super.f~(?); }
}
expect(new A().m()(1)).toEqual(["a", 1]);
