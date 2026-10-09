class A extends B {
  m() {
    return super.f~(?);
  }
  n() {
    return super[key]~(?);
  }
}
