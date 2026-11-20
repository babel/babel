const add = (x, y) => x + y;
const addOne = add~(1, ?);
const addTen = add~(?, 10);
expect(addOne(2)).toBe(3);
expect(addTen(2)).toBe(12);
expect(addOne.length).toBe(1);
expect(["1", "2", "3"].map(parseInt~(?, 10))).toEqual([1, 2, 3]);
