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

expect(t.size).toBe(8);
expect(t).toBe(addReturnValue);

expect(t.has({})).toBe(false);

expect(t.has(objectKey)).toBe(true);
expect(t.has(stringKey)).toBe(true);
expect(t.has(numberKey)).toBe(true);
expect(t.has(booleanKey)).toBe(true);
expect(t.has(undefinedKey)).toBe(true);
expect(t.has(nullKey)).toBe(true);
expect(t.has(nanKey)).toBe(true);
expect(t.has(zeroKey)).toBe(true);

expect(t.has('keykeykey')).toBe(true);
expect(t.has(42.24)).toBe(true);
expect(t.has(true)).toBe(true);
expect(t.has(undefined)).toBe(true);
expect(t.has(null)).toBe(true);
expect(t.has(NaN)).toBe(true);
expect(t.has(0)).toBe(true);

// V8 is broken for -0
// https://code.google.com/p/v8/issues/detail?id=3906
// expect(t.has(-0)).toBe(true);

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
    expect(isNaN(val2)).toBe(true);
  } else {
    expect(val).toBe(val2);
  }
  expect(obj).toBe(t);
  expect(this).toBe(context);
  arr.push(val);
  cnt++;
}, context);

expect(cnt).toBe(8);

arr.sort();
expect(arr).toEqual(expected);

// iterator
arr = [];
cnt = 0;

for (var setIterVal of t) {
  arr.push(setIterVal);
  cnt++;
}
expect(cnt).toBe(8);


arr.sort();
expect(arr).toEqual(expected);

// .values()
arr = [];
cnt = 0;

for (var setIterVal of t.values()) {
  arr.push(setIterVal);
  cnt++;
}
expect(cnt).toBe(8);


arr.sort();
expect(arr).toEqual(expected);

var t3 = new Set([[], {}, NaN]);
expect(t3.size).toBe(3);
expect(t3.has(NaN)).toBe(true);
t3.delete(NaN);
expect(t3.size).toBe(2);
t3.delete(NaN);
expect(t3.size).toBe(2);
t3.clear();
expect(t3.size).toBe(0);

// .keys()
var t4 = new Set();
var iter = t4.keys();
t4.add(objectKey);
t4.add(stringKey);
t4.add(nanKey);
expect(iter.next()).toEqual({value: objectKey, done: false});
expect(iter.next()).toEqual({value: stringKey, done: false});
t4.delete(nanKey);
expect(iter.next()).toEqual({value: undefined, done: true});

expect(Set.prototype.keys).toBe(Set.prototype.values);

// .entries()
var t5 = new Set();
var iter = t5.entries();
t5.add(objectKey);
t5.add(stringKey);
t5.add(nanKey);
expect(iter.next()).toEqual({value: [objectKey, objectKey], done: false});
expect(iter.next()).toEqual({value: [stringKey, stringKey], done: false});
t5.delete(nanKey);
expect(iter.next()).toEqual({value: undefined, done: true});

expect(Set.prototype[Symbol.iterator]).toBe(Set.prototype.values);
