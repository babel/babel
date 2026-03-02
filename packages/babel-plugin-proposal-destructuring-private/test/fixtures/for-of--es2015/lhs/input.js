class C {
  #x;
  static {
    for ({ #x: x } of [this]);
  }
}
