class A {
  #x;
  [class {}]
  [await class {}]
}

async function* f() {
  class A {
    #x;
    [class {}]
    [await class {}]
    [yield class {}]
    [yield* class {}]
    [await (yield class {})]
  }
}
