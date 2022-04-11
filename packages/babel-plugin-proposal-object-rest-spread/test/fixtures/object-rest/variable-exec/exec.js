// var { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };

// expect(x).toBe(1);
// expect(y).toBe(2);
// expect(z).toEqual({ a: 3, b: 4 });

// var complex = {
//   x: { a: 1, b: 2, c: 3 },
// };

// var {
//   x: { a: xa, ...xbc }
// } = complex;

// expect(xa).toBe(1);
// expect(xbc).toEqual({ b: 2, c: 3});

// // own properties
// function ownX({ ...properties }) {
//   return properties.x;
// }
// expect(ownX(Object.create({ x: 1 }))).toBeUndefined();
