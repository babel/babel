const sym = Symbol("sym");
const x = { a: "a", b: [] };
const y = { d: "d", e1: "e1", [sym]: "s", e2: "e2" };
Object.defineProperty(y, "hidden", { value: "h", enumerable: false });

const { a, b: [c = 1] } = x;
let { d, ...e } = y;

expect(a).toBe("a");
expect(c).toBe(1);
expect(d).toBe("d");
expect(e).toEqual({ e1: "e1", [sym]: "s", e2: "e2" });
expect(Object.keys(e)).toEqual(["e1", "e2"]);
expect(e[sym]).toBe("s");
expect("hidden" in e).toBe(false);
