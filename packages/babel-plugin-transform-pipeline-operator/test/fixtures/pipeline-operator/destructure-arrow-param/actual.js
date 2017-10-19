// Array destructing
const result = [0] |> ([x]) => x;
assert.equal(result, 0);

// Object destructuring
const result2 = { y: 1, z: 2 } |> ({ y, z }) => y + z;
assert.equal(result, 3);
