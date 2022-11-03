const logs = [];
const dec = (value, context) => { logs.push(context.name); return value; };

// __proto__ has no special meaning in class fields
class A extends class {
  static __proto__ = @dec class {}
} {
  static "__proto__" = @dec class {}
}

const f = () => { logs.push("computing f"); return 8. }

class C {
  static A0 = @dec class {}
  static "1" = @dec class { static {} }
  static 2 = @dec class extends class {} {}
  static 3n = @dec class extends class {} { static {} }
  static ["4"] = @dec class { p; }
  static [5] = @dec class { p; }
  static [6n] = @dec class { p; }
  static [f()] = @dec class { @dec static 7; }
  static [Symbol(9)] = @dec class { p; }
}

expect(logs).toEqual(["__proto__", "__proto__", "computing f", "A0", "1", "2", "3", "4", "5", "6", "7", "8", "[9]"]);
