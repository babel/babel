// test that toConsumableArray clones the array.
const arr = [];
const foo = () => arr;

const x = [...foo()];

expect(x).not.toBe(arr);
