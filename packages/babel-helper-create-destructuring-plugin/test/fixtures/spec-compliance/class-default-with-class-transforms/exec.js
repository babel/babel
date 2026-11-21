const { C = class { static before = this.name; }, D = class { static before = this.name; static name = "custom"; } } = {};
expect([C.name, C.before]).toEqual(["C", "C"]);
expect([D.name, D.before]).toEqual(["custom", "D"]);
let __proto__ = 1;
({ __proto__ = class { static before = this.name; static previous = __proto__; } } = { __proto__: null });
expect([__proto__.name, __proto__.before, __proto__.previous]).toEqual(["__proto__", "__proto__", 1]);
