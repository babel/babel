class A extends B {
  m() {
    @(super.dec1)
    class C {
      @(super.dec2)
      m2() {}
    }
  }
}
