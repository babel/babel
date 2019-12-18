var key, x, y, z;
// impure
key = 1;
var { [key++]: { y, ...x } } = { 1: { a: 1, y: 1 } };
expect(x).toEqual({ a: 1 });
expect(key).toBe(2);
expect(y).toBe(1);

// takes care of the order

key = 1;
var {
  [++key]: { y, ...rest_y },
  [++key]: { z, ...rest_z }
} = {2: { y: 2, z: 3 }, 3: { y: 2, z: 3 } };
expect(y).toBe(2);
expect(rest_y).toEqual({z: 3});
expect(z).toBe(3);
expect(rest_z).toEqual({ y: 2 });
expect(key).toBe(3);
