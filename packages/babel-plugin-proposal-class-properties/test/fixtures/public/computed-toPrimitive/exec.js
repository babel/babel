const foo = { [Symbol.toPrimitive]: () => "foo" };

expect((class { static [foo] = 0 }).foo).toBe(0);
expect((class { static [foo](){ return 0; } }).foo()).toBe(0);
expect((class { static get [foo](){ return 0; } }).foo).toBe(0);
expect((class { static set [foo](v){ return v; } }).foo = 0).toBe(0);

expect((new class { [foo] = 0 }).foo).toBe(0);

const arrayLike = { [Symbol.toPrimitive] : () => [] };

expect(() => class { static [arrayLike] = 0 }).toThrow("@@toPrimitive must return a primitive value.");
expect(() => class { static [arrayLike](){ return 0; } }).toThrow("@@toPrimitive must return a primitive value.");
expect(() => class { static get [arrayLike](){ return 0; } }).toThrow("@@toPrimitive must return a primitive value.");
expect(() => class { static set [arrayLike](v){ return v; } }).toThrow("@@toPrimitive must return a primitive value.");

expect(() => new class { [arrayLike] = 0 }).toThrow("@@toPrimitive must return a primitive value.");
