const obj = { true: 1, null: 2, "-1": 3, other: 4 };

const { [true]: a, [null]: b, [-1]: c, ...rest } = obj;
expect([a, b, c]).toEqual([1, 2, 3]);
expect(rest).toEqual({ other: 4 });

const { ["other"]: o, ...rest3 } = obj;
expect(o).toBe(4);
expect(rest3).toEqual({ true: 1, null: 2, "-1": 3 });

let d, e, rest2;
({ [-1]: d, [!0]: e, ...rest2 } = obj);
expect([d, e]).toEqual([3, 1]);
expect(rest2).toEqual({ null: 2, other: 4 });
