function f(b) {
  a: for (const k in []) {
    if (k) {
      continue a;
    } else {
      break a;
    }
  }
}
