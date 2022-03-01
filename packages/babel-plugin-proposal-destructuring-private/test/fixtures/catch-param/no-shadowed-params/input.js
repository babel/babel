class C {
  #x;
  static {
    try { throw new C() } catch ({ #x: x }) {
    }
  }
}
