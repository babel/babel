var _ref, _ref2;
let x = 0;
let fnA = (_ref = x++, () => _ref);
let fnB = (_ref2 = x++, 0, () => _ref2);
expect(x).toBe(2);
expect(fnA()).toBe(0);
expect(fnB()).toBe(1);
expect(x).toBe(2);
