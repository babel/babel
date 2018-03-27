// Options: --numeric-literals

(function() {
  expect(0b0).toBe(0);
  expect(0b1).toBe(1);
  expect(0b11).toBe(3);
  expect(0b011).toBe(3);
  expect(0B0).toBe(0);
  expect(0B1).toBe(1);
  expect(0B11).toBe(3);
  expect(0B011).toBe(3);

  expect(0o0).toBe(0);
  expect(0o1).toBe(1);
  expect(0o7).toBe(7);
  expect(0o10).toBe(8);
  expect(0o010).toBe(8);
  expect(0o77).toBe(63);
  expect(0O0).toBe(0);
  expect(0O1).toBe(1);
  expect(0O7).toBe(7);
  expect(0O10).toBe(8);
  expect(0O010).toBe(8);
  expect(0O77).toBe(63);

  var o = {
    0b0: 0,
    0b1: 1,
    0b10: 2,
    0B11: 3,
    0B0100: 4
  };
  expect(Object.keys(o)).toEqual(['0', '1', '2', '3', '4']);

  var o = {
    0o0: 0,
    0o1: 1,
    0o7: 7,
    0O10: 8,
    0O011: 9
  };
  expect(Object.keys(o)).toEqual(['0', '1', '7', '8', '9']);

  var o = {
    get 0b0() {},
    get 0b1() {},
    get 0b10() {},
    get 0B11() {},
    get 0B0100() {}
  };
  expect(Object.keys(o)).toEqual(['0', '1', '2', '3', '4']);

  var o = {
    set 0o0(v) {},
    set 0o1(v) {},
    set 0o7(v) {},
    set 0O10(v) {},
    set 0O011(v) {}
  };
  expect(Object.keys(o)).toEqual(['0', '1', '7', '8', '9']);

  var o = {
    0b0() {},
    0b1() {},
    0b10() {},
    0B11() {},
    0B0100() {}
  };
  expect(Object.keys(o)).toEqual(['0', '1', '2', '3', '4']);

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

  expect(C.prototype).toHaveProperty('0');
  expect(C.prototype).toHaveProperty('1');
  expect(C.prototype).toHaveProperty('2');
  expect(C.prototype).toHaveProperty('6');
  expect(C.prototype).toHaveProperty('7');
  expect(C.prototype).toHaveProperty('8');

  expect(C).toHaveProperty('3');
  expect(C).toHaveProperty('4');
  expect(C).toHaveProperty('5');
  expect(C).toHaveProperty('9');
  expect(C).toHaveProperty('10');
  expect(C).toHaveProperty('11');
})();
