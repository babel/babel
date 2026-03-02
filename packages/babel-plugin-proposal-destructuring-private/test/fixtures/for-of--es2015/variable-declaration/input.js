class C {
  #x;
  static {
    for (const { #x: x } of [this]);
  }
}
