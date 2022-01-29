const a = new Array(1); // sparse, has 1 hole
const b = [48, ...a, 50]; // must not have hole
expect(b).toStrictEqual([48, undefined, 50]);
