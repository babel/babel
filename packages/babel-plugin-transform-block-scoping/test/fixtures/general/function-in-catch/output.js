try {
  foo();
} catch (x) {
  function harmless(x) {
    return x;
  }
}
