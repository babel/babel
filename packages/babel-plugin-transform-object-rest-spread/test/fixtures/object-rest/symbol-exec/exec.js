const sym = Symbol("test");
const sym2 = Symbol("not enumerable");

const src = { a: "string" };
Object.defineProperty(src, "b", { value: "not enumerable" })
Object.defineProperty(src, sym, { enumerable: true, value: "symbol" });
Object.defineProperty(src, sym2, { value: "not enumerable" });

const {...rest} = src;

assert.strictEqual(rest[sym], "symbol");
assert.strictEqual(rest.a, "string");
assert.deepEqual(Object.getOwnPropertyNames(rest), ["a"]);
assert.deepEqual(Object.getOwnPropertySymbols(rest), [sym]);

const { [sym]: dst, ...noSym } = src;

assert.strictEqual(dst, "symbol");
assert.strictEqual(noSym.a, "string");
assert.deepEqual(Object.getOwnPropertySymbols(noSym), []);
