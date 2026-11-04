function t() {
  for (let i = 0, f = () => i; ; i++) {
    (() => i);
    if (i > 1) return f();
  }
}
