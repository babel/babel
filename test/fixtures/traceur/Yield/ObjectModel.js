// f is declared at the end to test hoisting.

var GeneratorFunctionPrototype = f.__proto__;
var GeneratorFunction = GeneratorFunctionPrototype.constructor;

assert.equal(GeneratorFunction.name, 'GeneratorFunction');
assert.equal(GeneratorFunction.prototype, GeneratorFunctionPrototype);
assert.equal(GeneratorFunctionPrototype.prototype.constructor,
    GeneratorFunctionPrototype);
assert.equal(GeneratorFunctionPrototype.prototype, f.prototype.__proto__);
assert.equal(GeneratorFunctionPrototype.__proto__, Function.prototype);

var g = f();
assert.instanceOf(g, f);

assert.equal(g.__proto__, f.prototype);

assert.deepEqual([], Object.getOwnPropertyNames(f.prototype));
assert.deepEqual([], Object.getOwnPropertyNames(g));

f.prototype.x = 42;

var g2 = f();
assert.equal(g2.x, 42);

var g3 = new f();
assert.equal(g3.x, 42);

function* f2() {
  yield 1;
}

assert.equal(f.__proto__, f2.__proto__);

assert.isFalse(f.hasOwnProperty('constructor'));
assert.equal(f.__proto__.constructor.name, 'GeneratorFunction');

// Intentionally at the end to test hoisting.
function* f() {
  yield this;
}
