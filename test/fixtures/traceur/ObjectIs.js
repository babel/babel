assert.isTrue(Object.is(1, 1));
assert.isTrue(Object.is(0, 0));
assert.isTrue(Object.is(-0, -0));
assert.isTrue(Object.is(NaN, NaN));
assert.isTrue(Object.is(Infinity, Infinity));
assert.isTrue(Object.is(-Infinity, -Infinity));

assert.isFalse(Object.is(0, -0));
assert.isFalse(Object.is(-0, 0));
assert.isFalse(Object.is(Infinity, -Infinity));
assert.isFalse(Object.is(-Infinity, Infinity));

assert.isTrue(Object.is(true, true));
assert.isTrue(Object.is(false, false));

assert.isTrue(Object.is(null, null));
assert.isTrue(Object.is(undefined, undefined));

assert.isTrue(Object.is('', ''));
assert.isTrue(Object.is('a', 'a'));

{
  var object = {};
  assert.isTrue(Object.is(object, object));
}

assert.isFalse(Object.is(new String('a'), new String('a')));
assert.isFalse(Object.is(new Boolean, new Boolean));
assert.isFalse(Object.is(new Number, new Number));
assert.isFalse(Object.is(new Date(0), new Date(0)));
assert.isFalse(Object.is(/re/, /re/));
assert.isFalse(Object.is({}, {}));
assert.isFalse(Object.is([], []));
assert.isFalse(Object.is(function() {}, function() {}));
