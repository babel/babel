function fact(n, acc = 1) {
  return n > 1 ? fact(n - 1, acc * n) : acc;
}
