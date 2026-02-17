var [a, ...rest] = [1, 2],
    [...rest2] = [NaN];

[...rest2] = [null];

expect(a).toBe(1);
expect(rest).toEqual([2]);
expect(rest2).toEqual([null]);
