"use strict";

const obj = {
  a: {
    b: 0,
  },
};

let test = delete obj?.a?.b;
expect(obj.a.b).toBeUndefined();
expect(test).toBe(true);

test = delete obj?.a.b;
expect(obj.a.b).toBeUndefined();
expect(test).toBe(true);

test = delete obj?.b?.b;
expect(obj.b).toBeUndefined();
expect(test).toBeUndefined();

delete obj?.a;
expect(obj.a).toBeUndefined();
