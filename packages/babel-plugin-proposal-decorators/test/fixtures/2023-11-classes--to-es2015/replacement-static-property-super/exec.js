{
  "different private/super access in a static class property";

  const dummy = () => {}

  let b;

  const idFactory = (hint) => {
    return class { static ["id" + hint](v) { return v } }
  }

  class C extends idFactory("C") { #x = "C#x"; }

  const dec = (b) => {
    originalB = b;
    return C;
  }

  class A extends idFactory("A") {
    #x = "A#x";
    static *[Symbol.iterator]() {
      @dec
      class B extends idFactory("B") {
        #x = "B#x";
        @(yield super.idA(o => o.#x), dummy)
        static value = super.idC(o => o.#x);

        static *iter() {
          yield super.idB(C.value);
        }
      }
      b = new originalB();
      yield* originalB.iter();
    }
  }
  expect([...A].map(fn => fn(b)).join()).toBe("B#x,B#x");
}

{
  "different private/super access in a static private class property";

  const dummy = () => {}

  let b;

  const idFactory = (hint) => {
    return class { static ["id" + hint](v) { return v } }
  }

  class C extends idFactory("C") { #x = "C#x"; }

  const dec = (b) => {
    originalB = b;
    return C;
  }

  class A extends idFactory("A") {
    #x = "A#x";
    static *[Symbol.iterator]() {
      @dec
      class B extends idFactory("B") {
        #x = "B#x";
        @(yield super.idA(o => o.#x), dummy)
        static #value = super.idC(o => o.#x);

        static *iter() {
          yield super.idB(C.#value);
        }
      }
      b = new originalB();
      yield* originalB.iter();
    }
  }
  expect([...A].map(fn => fn(b)).join()).toBe("B#x,B#x");
}

{
  "different private/super access in a non-decorated static class property";

  let b;

  const idFactory = (hint) => {
    return class { static ["id" + hint](v) { return v } }
  }

  class C extends idFactory("C") { #x = "C#x"; }

  const dec = (b) => {
    originalB = b;
    return C;
  }

  class A extends idFactory("A") {
    #x = "A#x";
    static *[Symbol.iterator]() {
      @dec
      class B extends idFactory("B") {
        #x = "B#x";
        static [(yield super.idA(o => o.#x), Symbol.iterator)] = super.idC(function* () {
          yield (o => o.#x);
        });
      }
      b = new originalB();
      yield* B;
    }
  }
  expect([...A].map(fn => fn(b)).join()).toBe("B#x,B#x");
}

{
  "different private/super access in a decorated static method";

  const dummy = () => {};

  let b;

  const idFactory = (hint) => {
    return class { static ["id" + hint](v) { return v } }
  }

  class C extends idFactory("C") { #x = "C#x"; }

  const dec = (b) => {
    originalB = b;
    return C;
  }

  class A extends idFactory("A") {
    #x = "A#x";
    static *[Symbol.iterator]() {
      @dec
      class B extends idFactory("B") {
        #x = "B#x";
        @(yield super.idA(o => o.#x), dummy)
        static [(yield super.idA(o => o.#x), Symbol.iterator)] = super.idC(function* () {
          yield (o => o.#x);
        });
      }
      b = new originalB();
      yield* B;
    }
  }
  expect([...A].map(fn => fn(b)).join()).toBe("B#x,B#x,B#x");
}
