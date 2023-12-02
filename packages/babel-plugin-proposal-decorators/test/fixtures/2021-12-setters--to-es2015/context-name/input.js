const logs = [];
const dec = (value, context) => { logs.push(context.name) };
const f = () => { logs.push("computing f"); return { [Symbol.toPrimitive]: () => "f()" }; };
class Foo {
  @dec static set a(v) {};
  @dec static set #a(v) {};

  @dec static set "b"(v) {}
  @dec static set ["c"](v) {};

  @dec static set 0(v) {};
  @dec static set [1](v) {};

  @dec static set 2n(v) {};
  @dec static set [3n](v) {};

  @dec static set [f()](v) {};
}

expect(logs).toStrictEqual(["computing f", "a", "#a", "b", "c", "0", "1", "2", "3", "f()"]);
