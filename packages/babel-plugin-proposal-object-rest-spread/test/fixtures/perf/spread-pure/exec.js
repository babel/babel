const obj = { a: 1, b: 2, d: 4 }
const { a, b, ...rest } = obj;
const abc = { ...rest, c: 3 };

expect(abc).toMatchObject({ d: 4, c: 3 })