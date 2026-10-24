const tgt = {};
const source = { w: 1, z: 2 };
const key = "z";
let rest, rest2;
({ w: tgt.x, ...rest } = source);
expect(tgt.x).toBe(1);
expect(rest).toEqual({ z: 2 });

[{ [key]: tgt.y, ...rest2 }] = [source];
expect(tgt.y).toBe(2);
expect(rest2).toEqual({ w: 1 });
