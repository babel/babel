var mutable = 1;
var key = "k";
var obj = {
  get x() {
    mutable = 2;
    key = "changed";
    return 0;
  },
};

// later elements are literals or functions: unaffected by the getter
var [{ x }, y, z, w] = [obj, [1, 2], { a: 1 }, () => x];
expect([x, y, z, w()]).toEqual([0, [1, 2], { a: 1 }, 0]);

// later elements read bindings that the getter modifies
mutable = 1;
var [{ x: x2 }, y2] = [obj, [mutable]];
expect(y2).toEqual([1]);

key = "k";
var [{ x: x3 }, y3] = [obj, { [key]: 1 }];
expect(y3).toEqual({ k: 1 });

// holes are not affected either
var [{ x: x4 }, y4, z4] = [obj, , 1];
expect([y4, z4]).toEqual([undefined, 1]);
