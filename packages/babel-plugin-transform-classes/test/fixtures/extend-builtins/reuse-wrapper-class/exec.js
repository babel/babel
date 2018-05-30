// confirm the external wrapNativeSuper helper works
// and that it caches/reuses the shim/wrapper class

class Test1 extends Array {
  name() {
    return 'test1';
  }
}

class Test2 extends Array {
  name() {
    return 'test2';
  }
}

// return an array of an object's own class and superclasses
// e.g. [Test1, Wrapper, Array, Object]
function classes(value) {
  var result = [];
  var target = Object.getPrototypeOf(value);

  while (target) {
    result.push(target.constructor);
    target = Object.getPrototypeOf(target);
  }

  return result;
}

var t1 = new Test1();
var t2 = new Test2();

expect(t1).not.toBe(t2);
expect(t1.name()).toBe('test1');
expect(t2.name()).toBe('test2');

var c1 = classes(t1);
var c2 = classes(t2);
var wrapper = c1[1];

expect(c1[1]).toBe(c2[1]); // same (i.e. cached/reused) shim class
expect(c1).toEqual([Test1, wrapper, Array, Object]);
expect(c2).toEqual([Test2, wrapper, Array, Object]);
