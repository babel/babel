// Options: --numeric-literals

(function() {
  assert.equal(0, 0b0);
  assert.equal(1, 0b1);
  assert.equal(3, 0b11);
  assert.equal(3, 0b011);
  assert.equal(0, 0B0);
  assert.equal(1, 0B1);
  assert.equal(3, 0B11);
  assert.equal(3, 0B011);

  assert.equal(0, 0o0);
  assert.equal(1, 0o1);
  assert.equal(7, 0o7);
  assert.equal(8, 0o10);
  assert.equal(8, 0o010);
  assert.equal(63, 0o77);
  assert.equal(0, 0O0);
  assert.equal(1, 0O1);
  assert.equal(7, 0O7);
  assert.equal(8, 0O10);
  assert.equal(8, 0O010);
  assert.equal(63, 0O77);

  var o = {
    0b0: 0,
    0b1: 1,
    0b10: 2,
    0B11: 3,
    0B0100: 4
  };
  assertArrayEquals(['0', '1', '2', '3', '4'], Object.keys(o));

  var o = {
    0o0: 0,
    0o1: 1,
    0o7: 7,
    0O10: 8,
    0O011: 9
  };
  assertArrayEquals(['0', '1', '7', '8', '9'], Object.keys(o));

  var o = {
    get 0b0() {},
    get 0b1() {},
    get 0b10() {},
    get 0B11() {},
    get 0B0100() {}
  };
  assertArrayEquals(['0', '1', '2', '3', '4'], Object.keys(o));

  var o = {
    set 0o0(v) {},
    set 0o1(v) {},
    set 0o7(v) {},
    set 0O10(v) {},
    set 0O011(v) {}
  };
  assertArrayEquals(['0', '1', '7', '8', '9'], Object.keys(o));

  var o = {
    0b0() {},
    0b1() {},
    0b10() {},
    0B11() {},
    0B0100() {}
  };
  assertArrayEquals(['0', '1', '2', '3', '4'], Object.keys(o));

  class C {
    0b0() {}
    get 0b1() {}
    set 0b10(v) {}
    static 0B11() {}
    static get 0B100() {}
    static set 0B101(v) {}

    0o6() {}
    get 0o7() {}
    set 0o10(v) {}
    static 0O11() {}
    static get 0O12() {}
    static set 0O13(v) {}
  }
  assertArrayEquals(['0', '1', '2', '6', '7', '8'], Object.keys(C.prototype));
  assertArrayEquals(['3', '4', '5', '9', '10', '11'], Object.keys(C));
})();