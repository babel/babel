async function* fn() {
  class A {
    [yield 1]() {}
  }

  class B extends A {
    [await 1]() {}
  }
}
