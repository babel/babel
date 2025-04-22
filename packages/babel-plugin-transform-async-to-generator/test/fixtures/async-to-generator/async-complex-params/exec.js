let r1 = false;
const p1 = (new class {
  async foo(a, { b }) { }
})
  .foo()
  .catch(e => {
    r1 = true;
  });

const r2 = [];
const p2 = (new class {
  async foo(a, { b }) {
    r2.push(a, b);
  }
})
  .foo(1, { b: 2 });

const r3 = [];
const p3 = (new class {
  async foo(a, b = (() => { throw new Error("required") })()) {
    r3.push(a, b);
  }
})
  .foo(1, 2);

const r4 = [];
const p4 = (new class {
  async foo(a, ...b) {
    r4.push(a, b);
  }
})
  .foo(1, 2);

const r5 = [];
const p5 = (new class {
  async foo(a, { b }) {
    noop(this, arguments);
    r5.push(a, b);
  }
})
  .foo(1, { b: 2 });

const r6 = [];
const p6 = (new class extends class { get c() { return "c"; } } {
  async foo(a, { b }) {
    r6.push(a, b, super.c);
  }
})
  .foo(1, { b: 2 });


return Promise.all([p1, p2, p3, p4, p5, p6]).then(() => {
  expect(r1).toBe(true);
  expect(r2).toEqual([1, 2]);
  expect(r3).toEqual([1, 2]);
  expect(r4).toEqual([1, [2]]);
  expect(r5).toEqual([1, 2]);
  expect(r6).toEqual([1, 2, "c"]);
});

function noop() { }
