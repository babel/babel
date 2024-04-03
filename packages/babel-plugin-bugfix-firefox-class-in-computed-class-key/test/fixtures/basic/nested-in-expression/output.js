class A {
  #x = 1;
  [(() => useIt([1 + class {}]))()];
}
