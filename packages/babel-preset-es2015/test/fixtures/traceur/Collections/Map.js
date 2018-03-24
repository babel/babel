var t = new Map();

var objectKey = {};
var stringKey = 'keykeykey';
var numberKey = 42.24;
var booleanKey = true;
var undefinedKey = undefined;
var nullKey = null;
var nanKey = NaN;
var zeroKey = 0;


expect(t.size).toBe(0);

t.set(undefinedKey, 'value8');
t.set(nullKey, 'value9');
t.set(stringKey, 'value5');
t.set(numberKey, 'value6');
t.set(booleanKey, 'value7');
t.set(objectKey, 'value1');
t.set(nanKey, 'value10');
t.set(zeroKey, 'value11');

expect(t.size).toBe(8);

expect(t.get(objectKey)).toBe('value1');
expect(t.get(stringKey)).toBe('value5');
expect(t.get(numberKey)).toBe('value6');
expect(t.get(booleanKey)).toBe('value7');
expect(t.get(undefinedKey)).toBe('value8');
expect(t.get(nullKey)).toBe('value9');
expect(t.get(nanKey)).toBe('value10');
expect(t.get(zeroKey)).toBe('value11');

expect(t.get({})).toBeUndefined();
expect(t.get('keykeykey')).toBe('value5');
expect(t.get(42.24)).toBe('value6');
expect(t.get(true)).toBe('value7');
expect(t.get(undefined)).toBe('value8');
expect(t.get(null)).toBe('value9');
expect(t.get(NaN)).toBe('value10');
expect(t.get(0)).toBe('value11');
expect(t.get(1 / Infinity)).toBe('value11');

// V8 is broken for -0
// https://code.google.com/p/v8/issues/detail?id=3906
// expect(t.get(-1 / Infinity)).toBe('value11');

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


// forEach
var arrKeys = [];
var arr = [];
var cnt = 0;
t.forEach(function (value, key, map) {
  if (cnt === 0) {
    t.set('foo', 42);
  }
  expect(map).toBe(t);
  arrKeys.push(key);
  arr.push(value);
  cnt++;
});
expect(cnt).toBe(9);
t.delete('foo');

expect(arrKeys).toEqual([
  undefinedKey,
  nullKey,
  stringKey,
  numberKey,
  booleanKey,
  objectKey,
  nanKey,
  zeroKey,
  'foo'
]);
expect(arr).toEqual([
  'value8',
  'value9',
  'value5',
  'value6',
  'value7',
  'value1',
  'value10',
  'value11',
  42
]);

// iterator
arrKeys = [];
arr = [];
cnt = 0;

for (var mapIterItem of t) {
  if (cnt === 0) {
    t.set('foo', 42);
  }
  var [mapIterItemKey, mapIterItemVal] = mapIterItem;
  arrKeys.push(mapIterItemKey);
  arr.push(mapIterItemVal);
  cnt++;
}
expect(cnt).toBe(9);
t.delete('foo');

expect(arrKeys).toEqual([
  undefinedKey,
  nullKey,
  stringKey,
  numberKey,
  booleanKey,
  objectKey,
  nanKey,
  zeroKey,
  'foo'
]);
expect(arr).toEqual([
  'value8',
  'value9',
  'value5',
  'value6',
  'value7',
  'value1',
  'value10',
  'value11',
  42
]);


// .entries()
arrKeys = [];
arr = [];
cnt = 0;

for (var mapIterItem of t.entries()) {
  var [mapIterItemKey, mapIterItemVal] = mapIterItem;
  arrKeys.push(mapIterItemKey);
  arr.push(mapIterItemVal);
  cnt++;
}
expect(cnt).toBe(8);

expect(arrKeys).toEqual([
  undefinedKey,
  nullKey,
  stringKey,
  numberKey,
  booleanKey,
  objectKey,
  nanKey,
  zeroKey
]);
expect(arr).toEqual([
  'value8',
  'value9',
  'value5',
  'value6',
  'value7',
  'value1',
  'value10',
  'value11'
]);


// .keys()
arrKeys = [];
cnt = 0;

for (var mapIterKey of t.keys()) {
  arrKeys.push(mapIterKey);
  cnt++;
}
expect(cnt).toBe(8);

expect(arrKeys).toEqual([
  undefinedKey,
  nullKey,
  stringKey,
  numberKey,
  booleanKey,
  objectKey,
  nanKey,
  zeroKey
]);


// .values()
arr = [];
cnt = 0;

for (var mapIterVal of t.values()) {
  arr.push(mapIterVal);
  cnt++;
}
expect(cnt).toBe(8);

expect(arr).toEqual([
  'value8',
  'value9',
  'value5',
  'value6',
  'value7',
  'value1',
  'value10',
  'value11'
]);


var t3 = new Map([ [[],[]], [{},{}], [NaN,NaN] ]);
var deleteReturnValue;

expect(t3.size).toBe(3);
expect(t3.has(NaN)).toBe(true);
expect(isNaN(t3.get(NaN))).toBe(true);
expect(t3.set(NaN, NaN)).toBe(t3); // test of 23.1.3.9.11
deleteReturnValue = t3.delete(NaN);
expect(t3.size).toBe(2);
expect(deleteReturnValue).toBe(true);
deleteReturnValue = t3.delete(NaN);
expect(t3.size).toBe(2);
expect(deleteReturnValue).toBe(false);
t3.clear();
expect(t3.size).toBe(0);

expect(Map.prototype[Symbol.iterator]).toBe(Map.prototype.entries);
