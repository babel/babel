function f(...a) {
  class A {
    x = a[0];
    static {
      console.log(a[1]);
    }
  }
  return a.length;
}
