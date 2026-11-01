for (let i = 0; i < 2; i++) {
  class A {
    static {
      var x = i;
    }
  }
  () => i;
}
