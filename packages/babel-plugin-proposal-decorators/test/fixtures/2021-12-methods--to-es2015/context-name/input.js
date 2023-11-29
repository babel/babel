const logs = [];
const dec = (value, context) => { logs.push(context.name) };
const f = () => { logs.push("computing f"); return { [Symbol.toPrimitive]: () => "f()" }; };
class Foo {
  @dec static a() {};
  @dec static #a() {};

  @dec static "b"() {}
  @dec static ["c"]() {};

  @dec static 0() {};
  @dec static [1]() {};

  @dec static 2n() {};
  @dec static [3n]() {};

  @dec static [f()]() {};
}

expect(logs).toStrictEqual(["computing f", "a", "#a", "b", "c", "0", "1", "2", "3", "f()"]);
