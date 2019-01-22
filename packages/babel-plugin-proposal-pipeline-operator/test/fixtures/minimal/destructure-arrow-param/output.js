const _pipe = [0];

// Array destructing
const result = (([x]) => x)(_pipe);

expect(result).toBe(0); // Object destructuring

const _pipe2 = {
  y: 1,
  z: 2
};

const result2 = (({
  y,
  z
}) => y + z)(_pipe2);

expect(result).toBe(3);
