const sym = Symbol("test");
const sym2 = Symbol("not enumerable");

const src = { a: "string" };
Object.defineProperty(src, "b", { value: "not enumerable" })
Object.defineProperty(src, sym, { enumerable: true, value: "symbol" });
Object.defineProperty(src, sym2, { value: "not enumerable" });

const {...rest} = src;

expect(rest[sym]).toBe("symbol");
expect(rest.a).toBe("string");
expect(Object.getOwnPropertyNames(rest)).toEqual(["a"]);
expect(Object.getOwnPropertySymbols(rest)).toEqual([sym]);

const { [sym]: dst, ...noSym } = src;

expect(dst).toBe("symbol");
expect(noSym.a).toBe("string");
expect(Object.getOwnPropertySymbols(noSym)).toEqual([]);
