class B {
  f(x) { return [this.name, x]; }
}
class A extends B {
  name = "a";
  m() { return super.f~(?); }
}
expect(new A().m()(1)).toEqual(["a", 1]);

class C extends B {
  name = "c";
  m() { return super.f?.~(?); }
  n() { return super.missing?.~(?); }
}
expect(new C().m()(2)).toEqual(["c", 2]);
expect(new C().n()).toBe(undefined);
