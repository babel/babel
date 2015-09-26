function sum(a=1, b=2) {
  if (b > 0) {
    return sum(a + 1, b - 1);
  }
  return a;
}
