
var GeneratorFunctionPrototype = f.__proto__;
var GeneratorFunction = GeneratorFunctionPrototype.constructor;

assert.strictEqual(GeneratorFunction.name, 'GeneratorFunction');
assert.strictEqual(GeneratorFunction.prototype,
                   GeneratorFunctionPrototype);
assert.strictEqual(GeneratorFunctionPrototype.prototype.constructor,
                   GeneratorFunctionPrototype);
assert.strictEqual(GeneratorFunctionPrototype.prototype,
                   f.prototype.__proto__);
assert.strictEqual(GeneratorFunctionPrototype.__proto__,
                   Function.prototype);
assert.strictEqual(GeneratorFunctionPrototype.name,
                   "GeneratorFunctionPrototype");

assert.strictEqual(typeof f2, "function");
assert.strictEqual(f2.constructor, GeneratorFunction);
assert.ok(f2 instanceof GeneratorFunction);
assert.strictEqual(f2.name, "f2");

var g = f();
assert.ok(g instanceof f);
assert.strictEqual(g.__proto__, f.prototype);

assert.deepEqual([], Object.getOwnPropertyNames(f.prototype));
// assert.deepEqual([], Object.getOwnPropertyNames(g));

f.prototype.x = 42;

var g2 = f();
assert.strictEqual(g2.x, 42);

var g3 = new f();
assert.strictEqual(g3.x, 42);

function* f2() {
  yield 1;
}

assert.strictEqual(f.__proto__, f2.__proto__);
assert.strictEqual(f.hasOwnProperty('constructor'), false);
assert.strictEqual(f.__proto__.constructor.name, 'GeneratorFunction');

// Intentionally at the end to test hoisting.
function* f() {
  yield this;
}

function* f() {
  yield 1;
}

var f2 = f;
f = 42;
var g = f2();

assert.deepEqual(g.next(), { value: 1, done: false });
assert.deepEqual(g.next(), { value: void 0, done: true });
assert.ok(g instanceof f2);
