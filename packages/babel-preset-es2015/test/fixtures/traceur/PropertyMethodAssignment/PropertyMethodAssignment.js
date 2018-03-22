var object = {
  x: {
    j() {
      return this.j;
    }
  },
  f() {
    return this.f;
  },
  'g'() {},
  "h"() {},
  42() {},
  null() {},
  true() {},
  false() {},
  function() {},
  var() {},
  'class'() {}  // NodeJS incorrectly flags {class: ...} as an error.
};

// ----------------------------------------------------------------------------

expect(Object.keys(object)).toEqual([
  '42',
  'x',
  'f',
  'g',
  'h',
  'null',
  'true',
  'false',
  'function',
  'var',
  'class'
]);;

function assertMethod(object, name) {
  expect(object.hasOwnProperty(name)).toBe(true);
  var descriptor = Object.getOwnPropertyDescriptor(object, name);
  expect(typeof descriptor).toBe('object');
  expect(descriptor.enumerable).toBe(true);
  expect(typeof object[name]).toBe('function');
  // IE does not have a name property on functions.
  expect(object[name].name === '' || object[name].name === undefined).toBe(true);
}

assertMethod(object, 'f');
assertMethod(object, 'g');
assertMethod(object, 'h');
assertMethod(object, '42');
assertMethod(object, 'null');
assertMethod(object, 'true');
assertMethod(object, 'false');
assertMethod(object, 'function');
assertMethod(object, 'var');
assertMethod(object, 'class');

expect(object.f).toBe(object.f());

// Test the nested object.
expect(Object.keys(object.x)).toEqual(['j']);;
assertMethod(object.x, 'j');

// Test name binding.
var m = 42;
class C {
  m() {
    return m;
  }
}
expect(new C().m()).toBe(42);
