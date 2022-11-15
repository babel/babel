const logs = [];
const noop = (value, context) => { return value; };
const dec = (value, context) => { logs.push(context.name); return value; };

// __proto__ has no special meaning in class fields
class A extends class {
  @noop static accessor __proto__ = @dec class {}
} {
  @noop static "__proto__" = @dec class {}
}

const id = (x) => { logs.push("computing id"); return x }

class C {
  @noop static A0 = @dec class {}
  @noop static [id(1)] = @dec class { static {} }
  @noop static accessor 2 = @dec class extends class {} {}
  @noop static accessor [id(3n)] = @dec class extends class {} { static {} }
  @noop static accessor #_4 = @dec class { p; }
  @noop static #_5 = @dec class { p; }
}

expect(logs).toEqual(["__proto__", "__proto__", "computing id", "computing id", "A0", "1", "2", "3", "#_4", "#_5"]);
