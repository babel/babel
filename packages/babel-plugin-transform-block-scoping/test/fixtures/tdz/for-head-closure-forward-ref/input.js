function t() {
  for (let f = () => i, i = 0; ; ) {
    (() => i);
    return f();
  }
}
