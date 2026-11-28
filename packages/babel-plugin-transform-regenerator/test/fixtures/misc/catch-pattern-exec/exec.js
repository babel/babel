var message = "outer", first = "outer";

function* gen() {
  try {
    throw new Error("inner", { cause: [1] });
  } catch ({ message, cause: [first, second = first + 1, ...rest] }) {
    yield [message, first, second, rest, (() => message)()];
  }
  yield [message, first];
}

expect([...gen()]).toEqual([["inner", 1, 2, [], "inner"], ["outer", "outer"]]);

var log = [];
function* gen2() {
  try {
    try {
      throw null;
    } catch ({ a }) {
      log.push("catch");
      yield a;
    } finally {
      log.push("finally");
    }
  } catch (e) {
    yield e instanceof TypeError;
  }
}

expect([...gen2()]).toEqual([true]);
expect(log).toEqual(["finally"]);

function* gen3() {
  try {
    throw {};
  } catch ({
    a = { m() { return 1; } },
    b = class { m() { return 2; } static { this.s = 3; } },
    c = function () { return 4; },
    d = async () => await 5,
  }) {
    yield [a.m(), new b().m(), b.s, c()];
    yield d();
  }
}

const [values, promise] = gen3();
expect(values).toEqual([1, 2, 3, 4]);
return promise.then(v => expect(v).toBe(5));
