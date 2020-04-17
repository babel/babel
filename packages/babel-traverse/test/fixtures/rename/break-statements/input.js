function f(a) {
  a: for (const k in []) {
    if (k) {
      continue a;
    } else {
      break a;
    }
  }
}
