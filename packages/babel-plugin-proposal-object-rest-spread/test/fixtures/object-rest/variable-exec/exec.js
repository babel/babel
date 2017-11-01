// var { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };

// assert.equal(x, 1);
// assert.equal(y, 2);
// assert.deepEqual(z, { a: 3, b: 4 });

// var complex = {
//   x: { a: 1, b: 2, c: 3 },
// };

// var {
//   x: { a: xa, ...xbc }
// } = complex;

// assert.equal(xa, 1);
// assert.deepEqual(xbc, { b: 2, c: 3});

// // own properties
// function ownX({ ...properties }) {
//   return properties.x;
// }
// assert.equal(ownX(Object.create({ x: 1 })), undefined);
