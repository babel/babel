// basic sanity check to confirm the external wrapNativeSuper helper works

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

var t1 = new Test1();
var t2 = new Test2();

expect(Test1).not.toBe(Test2);
expect(t1).not.toBe(t2);
expect(t1.name()).toBe('test1');
expect(t2.name()).toBe('test2');
expect(t1).toBeInstanceOf(Test1);
expect(t2).toBeInstanceOf(Test2);
expect(t1).toBeInstanceOf(Array);
expect(t2).toBeInstanceOf(Array);
