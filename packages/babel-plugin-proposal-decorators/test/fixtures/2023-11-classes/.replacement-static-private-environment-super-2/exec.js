{
  "different private/super access in a static method";

  let b;

  const idFactory = (hint) => {
    return class { static ["id" + hint](v) { return v } }
  }

  class C extends idFactory("C") { #x = "C#x"; }

  const dec = (b) => {
    originalB = b;
    return C;
  }

  const fns = [];

  class A extends idFactory("A") {
    #x = "A#x";
    static {
      @dec
      class B extends idFactory("B") {
        #x = "B#x";
        static [(fns.push(super.idA(o => o.#x)), "iter")] = () => {
          fns.push(o => o.#x);
        }
      }
      b = new originalB();
      B.iter();
    }
  }
  expect(fns.map(fn => fn(b)).join()).toBe("B#x,B#x");
}
