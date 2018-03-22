expect(Object.is(1, 1)).toBe(true);
expect(Object.is(0, 0)).toBe(true);
expect(Object.is(-0, -0)).toBe(true);
expect(Object.is(NaN, NaN)).toBe(true);
expect(Object.is(Infinity, Infinity)).toBe(true);
expect(Object.is(-Infinity, -Infinity)).toBe(true);

expect(Object.is(0, -0)).toBe(false);
expect(Object.is(-0, 0)).toBe(false);
expect(Object.is(Infinity, -Infinity)).toBe(false);
expect(Object.is(-Infinity, Infinity)).toBe(false);

expect(Object.is(true, true)).toBe(true);
expect(Object.is(false, false)).toBe(true);

expect(Object.is(null, null)).toBe(true);
expect(Object.is(undefined, undefined)).toBe(true);

expect(Object.is('', '')).toBe(true);
expect(Object.is('a', 'a')).toBe(true);

{
  var object = {};
  expect(Object.is(object, object)).toBe(true);
}

expect(Object.is(new String('a'), new String('a'))).toBe(false);
expect(Object.is(new Boolean, new Boolean)).toBe(false);
expect(Object.is(new Number, new Number)).toBe(false);
expect(Object.is(new Date(0), new Date(0))).toBe(false);
expect(Object.is(/re/, /re/)).toBe(false);
expect(Object.is({}, {})).toBe(false);
expect(Object.is([], [])).toBe(false);
expect(Object.is(function() {}, function() {})).toBe(false);
