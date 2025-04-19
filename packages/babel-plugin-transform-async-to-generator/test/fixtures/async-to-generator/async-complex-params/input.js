(new class {
  async foo(a, { b }) { }
})
  .foo()
  .catch(e => {
    console.log("caught");
  });
