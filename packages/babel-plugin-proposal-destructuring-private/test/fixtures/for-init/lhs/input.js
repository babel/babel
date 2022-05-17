class C {
  #x;
  static {
    for ({ #x: x } = this;;) { break; }
  }
}
