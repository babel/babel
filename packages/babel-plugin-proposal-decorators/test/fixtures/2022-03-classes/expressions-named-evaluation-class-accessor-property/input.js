const logs = [];
const dec = (value, context) => { logs.push(context.name); return value; };

// __proto__ has no special meaning in class fields
class A extends class {
  static accessor __proto__ = @dec class {}
} {
  static accessor "__proto__" = @dec class {}
}

const f = () => { logs.push("computing f"); return 8. }

class C {
  static accessor A0 = @dec class {}
  static accessor "1" = @dec class { static {} }
  static accessor 2 = @dec class extends class {} {}
  static accessor 3n = @dec class extends class {} { static {} }
  static accessor ["4"] = @dec class { p; }
  static accessor [5] = @dec class { p; }
  static accessor [6n] = @dec class { p; }
  static accessor [f()] = @dec class { @dec static accessor 7; }
  static accessor [Symbol(9)] = @dec class { p; }
  static accessor #_10 = @dec class {}
}

expect(logs).toEqual(["__proto__", "__proto__", "computing f", "A0", "1", "2", "3", "4", "5", "6", "7", "8", "[9]", "#_10"]);
