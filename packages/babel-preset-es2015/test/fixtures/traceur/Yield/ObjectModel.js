// f is declared at the end to test hoisting.

var GeneratorFunctionPrototype = f.__proto__;
var GeneratorFunction = GeneratorFunctionPrototype.constructor;

expect(GeneratorFunction.name).toBe('GeneratorFunction');
expect(GeneratorFunction.prototype).toBe(GeneratorFunctionPrototype);
expect(GeneratorFunctionPrototype.prototype.constructor).toBe(GeneratorFunctionPrototype);
expect(GeneratorFunctionPrototype.prototype).toBe(f.prototype.__proto__);
expect(GeneratorFunctionPrototype.__proto__).toBe(Function.prototype);

var g = f();
assert.instanceOf(g, f);

expect(g.__proto__).toBe(f.prototype);

expect(Object.getOwnPropertyNames(f.prototype)).toEqual([]);
expect(Object.getOwnPropertyNames(g)).toEqual([]);

f.prototype.x = 42;

var g2 = f();
expect(g2.x).toBe(42);

var g3 = new f();
expect(g3.x).toBe(42);

function* f2() {
  yield 1;
}

expect(f.__proto__).toBe(f2.__proto__);

expect(f.hasOwnProperty('constructor')).toBe(false);
expect(f.__proto__.constructor.name).toBe('GeneratorFunction');

// Intentionally at the end to test hoisting.
function* f() {
  yield this;
}
