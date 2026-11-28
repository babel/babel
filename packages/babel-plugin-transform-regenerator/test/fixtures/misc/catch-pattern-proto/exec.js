function* g() {
  try {
    yield 1;
  } catch ([__proto__]) {
    yield { __proto__, __proto__: null };
  }
}

const it = g();
it.next();
const obj = it.throw([7]).value;
expect(Object.getPrototypeOf(obj)).toBe(null);
expect(Object.hasOwn(obj, "__proto__")).toBe(true);
expect(obj.__proto__).toBe(7);
