expect(
  () => do {
    () => {
      var bar = "foo";
    };
    bar;
  }
).toThrow(ReferenceError);
