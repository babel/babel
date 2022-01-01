class Test {

  static #x = 1

  method(other) {
    const Test = 2;
    const func = () => {
      const Test = 3;
      return #x in other && Test;
    }
    return func() + Test;
  }
}

const t = new Test();
const t2 = new Test();
expect(t.method(Test)).toBe(5)
