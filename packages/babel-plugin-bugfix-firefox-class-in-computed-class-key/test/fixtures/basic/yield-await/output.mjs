class A {
  #x;
  [(() => class {})()];
  [await (async () => await class {})()];
}
async function* f() {
  class A {
    #x;
    [(() => class {})()];
    [await (async () => await class {})()];
    [yield* function* () {
      return yield class {};
    }.call(this, arguments)];
    [yield* function* () {
      return yield* class {};
    }.call(this, arguments)];
    [yield* async function* () {
      return await (yield class {});
    }.call(this, arguments)];
  }
}
