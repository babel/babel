const ArrayIteratorPrototype = Object.getPrototypeOf([][Symbol.iterator]());
const { next } = ArrayIteratorPrototype;

struct P {
  p;
  constructor(p) {
    this.p = p;
  }
}
struct S extends P {
  a;
  constructor(a) {
    super(a);
    this.a = a;
  }
}

ArrayIteratorPrototype.next = function () {
  const result = next.call(this);
  if (result.value === 1) result.value = "hijacked";
  return result;
};
try {
  const s = new S(1);
  expect(s.a).toBe(1);
  expect(s.p).toBe(1);
} finally {
  ArrayIteratorPrototype.next = next;
}
