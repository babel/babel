var t = new Set();

var objectKey = {};
var stringKey = 'keykeykey';
var numberKey = 42.24;
var booleanKey = true;
var undefinedKey = undefined;
var nullKey = null;
var nanKey = NaN;
var zeroKey = 0;
var addReturnValue;

t.add(objectKey);
t.add(stringKey);
t.add(numberKey);
t.add(booleanKey);
t.add(undefinedKey);
t.add(nullKey);
t.add(nanKey);
addReturnValue = t.add(zeroKey);

assert.equal(t.size, 8);
assert.equal(t, addReturnValue);

assert.isTrue(!t.has({}));

assert.isTrue(t.has(objectKey));
assert.isTrue(t.has(stringKey));
assert.isTrue(t.has(numberKey));
assert.isTrue(t.has(booleanKey));
assert.isTrue(t.has(undefinedKey));
assert.isTrue(t.has(nullKey));
assert.isTrue(t.has(nanKey));
assert.isTrue(t.has(zeroKey));

assert.isTrue(t.has('keykeykey'));
assert.isTrue(t.has(42.24));
assert.isTrue(t.has(true));
assert.isTrue(t.has(undefined));
assert.isTrue(t.has(null));
assert.isTrue(t.has(NaN));
assert.isTrue(t.has(0));
assert.isTrue(t.has(-0));

var expected = [
  undefinedKey,
  nullKey,
  stringKey,
  numberKey,
  booleanKey,
  objectKey,
  nanKey,
  zeroKey
];
expected.sort();


// forEach
var arr = [];
var cnt = 0;
var context = {};

t.forEach(function(val, val2, obj) {
  if (isNaN(val)) {
    assert.isTrue(isNaN(val2));
  } else {
    assert.equal(val, val2);
  }
  assert.equal(obj, t);
  assert.equal(this, context)
  arr.push(val);
  cnt++;
}, context);

assert.equal(cnt, 8);

arr.sort();
assertArrayEquals(arr, expected);

// iterator
arr = [];
cnt = 0;

for (var setIterVal of t) {
  arr.push(setIterVal);
  cnt++;
}
assert.equal(cnt, 8);


arr.sort();
assertArrayEquals(arr, expected);

// .values()
arr = [];
cnt = 0;

for (var setIterVal of t.values()) {
  arr.push(setIterVal);
  cnt++;
}
assert.equal(cnt, 8);


arr.sort();
assertArrayEquals(arr, expected);

var t3 = new Set([[], {}, NaN]);
assert.equal(t3.size, 3);
assert.isTrue(t3.has(NaN));
t3.delete(NaN);
assert.equal(t3.size, 2);
t3.delete(NaN);
assert.equal(t3.size, 2);
t3.clear();
assert.equal(t3.size, 0);

// .keys()
var t4 = new Set();
var iter = t4.keys();
t4.add(objectKey);
t4.add(stringKey);
t4.add(nanKey);
assert.deepEqual(iter.next(), {value: objectKey, done: false});
assert.deepEqual(iter.next(), {value: stringKey, done: false});
t4.delete(nanKey);
assert.deepEqual(iter.next(), {value: undefined, done: true});

assert.equal(Set.prototype.keys, Set.prototype.values);

// .entries()
var t5 = new Set();
var iter = t5.entries();
t5.add(objectKey);
t5.add(stringKey);
t5.add(nanKey);
assert.deepEqual(iter.next(), {value: [objectKey, objectKey], done: false});
assert.deepEqual(iter.next(), {value: [stringKey, stringKey], done: false});
t5.delete(nanKey);
assert.deepEqual(iter.next(), {value: undefined, done: true});

assert.equal(Set.prototype[Symbol.iterator], Set.prototype.values);
