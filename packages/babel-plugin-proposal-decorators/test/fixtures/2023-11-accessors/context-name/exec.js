const logs = [];
const dec = (value, context) => { logs.push(context.name) };
const f = () => { logs.push("computing f"); return { [Symbol.toPrimitive]: () => (logs.push("calling toPrimitive"), "f()") }; };
class Foo {
  @dec static accessor a;
  @dec static accessor #a;

  @dec static accessor "b"
  @dec static accessor ["c"];

  @dec static accessor 0;
  @dec static accessor [1];

  @dec static accessor 2n;
  @dec static accessor [3n];

  @dec static accessor [f()];
}

expect(logs).toStrictEqual(["computing f", "calling toPrimitive", "a", "#a", "b", "c", "0", "1", "2", "3", "f()"]);
