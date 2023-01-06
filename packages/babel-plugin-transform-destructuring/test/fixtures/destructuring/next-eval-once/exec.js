let gets = 0;
let it = {
  [Symbol.iterator]: () => ({
    get next() {
      gets++;
      let i = 0;
      return () => ({ done: false, value: i++ });
    },
  }),
};

let [] = it;
expect(gets).toBe(1);

let [a] = it;
expect(gets).toBe(2);
expect(a).toBe(0);

let [b, c] = it;
expect(gets).toBe(3);
expect(b).toBe(0);
expect(c).toBe(1);
