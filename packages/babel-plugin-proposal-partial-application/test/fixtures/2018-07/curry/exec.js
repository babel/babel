const binary = x => (y, z) => x( y, z );

const add1 = binary((y, z) => y + z)(1, ?);

expect(add1(1)).toBe(2);
