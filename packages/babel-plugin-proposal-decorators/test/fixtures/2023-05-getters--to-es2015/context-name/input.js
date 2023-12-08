const logs = [];
const dec = (value, context) => { logs.push(context.name) };
const f = () => { logs.push("computing f"); return { [Symbol.toPrimitive]: () => (logs.push("calling toPrimitive"), "f()") }; };
class Foo {
  @dec static get a() {};
  @dec static get #a() {};

  @dec static get "b"() {}
  @dec static get ["c"]() {};

  @dec static get 0() {};
  @dec static get [1]() {};

  @dec static get 2n() {};
  @dec static get [3n]() {};

  @dec static get [f()]() {};
}

expect(logs).toStrictEqual(["computing f", "calling toPrimitive", "a", "#a", "b", "c", "0", "1", "2", "3", "f()"]);
