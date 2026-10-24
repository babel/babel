// https://github.com/babel/babel/issues/18350
const obj = { x: 1 };
let x;
const result = (0, { x } = obj);
expect(result).toBe(obj);
expect(x).toBe(1);

let a, rest;
const result2 = (0, 1, { a, ...rest } = obj);
expect(result2).toBe(obj);
expect(rest).toEqual({ x: 1 });

// the value of a non-final element is not observable
let y;
const result3 = ({ y } = obj, 2);
expect(result3).toBe(2);
