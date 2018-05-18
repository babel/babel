@(_ => desc = _)
class Foo {
  [getKey()]() {
    return 1;
  }

  [getKey()]() {
    return 2;
  }
}
