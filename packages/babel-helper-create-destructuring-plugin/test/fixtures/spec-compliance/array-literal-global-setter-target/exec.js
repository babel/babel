// Assigning an undeclared name can call a setter of the global object, which
// can modify the values read by the following elements of an array literal:
// they are all evaluated before any target is assigned.
var global = Function("return this")();
var log = [];
var source = "orig";
Object.defineProperty(global, "setterTarget", {
  set(v) {
    log.push("set" + v);
    source = "changed";
  },
  configurable: true,
});
try {
  var b;
  [setterTarget, b] = [1, source];
  expect(b).toBe("orig");
  expect(log).toEqual(["set1"]);
} finally {
  delete global.setterTarget;
}
