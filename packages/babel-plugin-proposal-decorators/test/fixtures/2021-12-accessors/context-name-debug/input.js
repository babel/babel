const logs = [];
const dec = (value, context) => { logs.push(context.name) };
const f = () => { logs.push("computing f"); return { [Symbol.toPrimitive]: () => (logs.push("calling toPrimitive"), "f()") }; };
class Foo {
  @dec static accessor [f()];
}

expect(logs).toStrictEqual(["computing f", "f()"]);
