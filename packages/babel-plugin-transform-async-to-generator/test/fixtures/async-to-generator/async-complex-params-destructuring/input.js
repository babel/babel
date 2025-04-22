(new class {
  async foo(a, { b }) { }
})
  .foo()
  .catch(e => {
    console.log("caught");
  });

(new class {
  async foo(a, { b }) {
    console.log(a, b);
  }
})
  .foo(1, { b: 2 });

(new class {
  async foo(a, b = (() => { throw new Error("required") })()) {
    console.log(a, b);
  }
})
  .foo(1, { b: 2 });

(new class {
  async foo(a, ...b) {
    console.log(a, b);
  }
})
  .foo(1, 2);

(new class {
  async foo(a, { b }) {
    console.log(this, arguments);
  }
})
  .foo(1, { b: 2 });


(new class extends class { get c() { return "c"; } } {
  async foo(a, { b }) {
    console.log(super.c);
  }
})
  .foo(1, { b: 2 });
