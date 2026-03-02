function* gen() {
  return class {
    [(1, yield)]() { return 1 }
    [(1, yield)]() { return 2 }
  }
}

const it = gen();
it.next();
it.next("one");
const res = it.next("two").value;

expect(new res().one()).toBe(1);
expect(new res().two()).toBe(2);
