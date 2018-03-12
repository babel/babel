const actualOrder = [];

const track = i => {
  actualOrder.push(i);
  return i;
};

class MyClass {
  static [track(1)] = track(10);
  [track(2)] = track(13);
  get [track(3)]() {
    return "foo";
  }
  set [track(4)](value) {
    this.bar = value;
  }
  [track(5)] = track(14);
  static [track(6)] = track(11);
  static [track(7)] = track(12);
  [track(8)]() {}
  [track(9)] = track(15);
}

const inst = new MyClass();

const expectedOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
assert.deepEqual(actualOrder, expectedOrder);

assert.equal(MyClass[1], 10);
assert.equal(inst[2], 13);
assert.equal(inst[3], "foo");
inst[4] = "baz";
assert.equal(inst.bar, "baz");
assert.equal(inst[5], 14);
assert.equal(MyClass[6], 11);
assert.equal(MyClass[7], 12);
assert.ok(typeof inst[8] === "function");
assert.equal(inst[9], 15);
