const foo = { [Symbol.toPrimitive]: () => "foo" };

expect((new class { [foo](){ return 0; } }).foo()).toBe(0);
expect((new class { get [foo](){ return 0; } }).foo).toBe(0);
expect((new class { set [foo](v){ return v; } }).foo = 0).toBe(0);

const arrayLike = { [Symbol.toPrimitive] : () => [] };

expect(() => new class { [arrayLike](){ return 0; } }).toThrow("@@toPrimitive must return a primitive value.");
expect(() => new class { get [arrayLike](){ return 0; } }).toThrow("@@toPrimitive must return a primitive value.");
expect(() => new class { set [arrayLike](v){ return v; } }).toThrow("@@toPrimitive must return a primitive value.");
