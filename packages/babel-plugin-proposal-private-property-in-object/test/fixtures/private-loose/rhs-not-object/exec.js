expect(() => class { static #p = #p in 0 }).toThrow(`right-hand side of 'in' should be an object, got number`);
expect(() => class { static #p = #p in "" }).toThrow(`right-hand side of 'in' should be an object, got string`);
expect(() => class { static #p = #p in true }).toThrow(`right-hand side of 'in' should be an object, got boolean`);
expect(() => class { static #p = #p in void 0 }).toThrow(`right-hand side of 'in' should be an object, got undefined`);
expect(() => class { static #p = #p in null }).toThrow(`right-hand side of 'in' should be an object, got null`);
expect(() => class { static #p = #p in Symbol.iterator }).toThrow(`right-hand side of 'in' should be an object, got symbol`);
expect(() => class { static #p = #p in 0n }).toThrow(`right-hand side of 'in' should be an object, got bigint`);

expect(() => class { static #p() {}; static q = #p in 0 }).toThrow(`right-hand side of 'in' should be an object, got number`);
expect(() => class { static #p() {}; static q = #p in "" }).toThrow(`right-hand side of 'in' should be an object, got string`);
expect(() => class { static #p() {}; static q = #p in true }).toThrow(`right-hand side of 'in' should be an object, got boolean`);
expect(() => class { static #p() {}; static q = #p in void 0 }).toThrow(`right-hand side of 'in' should be an object, got undefined`);
expect(() => class { static #p() {}; static q = #p in null }).toThrow(`right-hand side of 'in' should be an object, got null`);
expect(() => class { static #p() {}; static q = #p in Symbol.iterator }).toThrow(`right-hand side of 'in' should be an object, got symbol`);
expect(() => class { static #p() {}; static q = #p in 0n }).toThrow(`right-hand side of 'in' should be an object, got bigint`);

expect(() => new class { #p = #p in 0 }).toThrow(`right-hand side of 'in' should be an object, got number`);
expect(() => new class { #p = #p in "" }).toThrow(`right-hand side of 'in' should be an object, got string`);
expect(() => new class { #p = #p in true }).toThrow(`right-hand side of 'in' should be an object, got boolean`);
expect(() => new class { #p = #p in void 0 }).toThrow(`right-hand side of 'in' should be an object, got undefined`);
expect(() => new class { #p = #p in null }).toThrow(`right-hand side of 'in' should be an object, got null`);
expect(() => new class { #p = #p in Symbol.iterator }).toThrow(`right-hand side of 'in' should be an object, got symbol`);
expect(() => new class { #p = #p in 0n }).toThrow(`right-hand side of 'in' should be an object, got bigint`);

expect(() => new class { #p() {}; q = #p in 0 }).toThrow(`right-hand side of 'in' should be an object, got number`);
expect(() => new class { #p() {}; q = #p in "" }).toThrow(`right-hand side of 'in' should be an object, got string`);
expect(() => new class { #p() {}; q = #p in true }).toThrow(`right-hand side of 'in' should be an object, got boolean`);
expect(() => new class { #p() {}; q = #p in void 0 }).toThrow(`right-hand side of 'in' should be an object, got undefined`);
expect(() => new class { #p() {}; q = #p in null }).toThrow(`right-hand side of 'in' should be an object, got null`);
expect(() => new class { #p() {}; q = #p in Symbol.iterator }).toThrow(`right-hand side of 'in' should be an object, got symbol`);
expect(() => new class { #p() {}; q = #p in 0n }).toThrow(`right-hand side of 'in' should be an object, got bigint`);
