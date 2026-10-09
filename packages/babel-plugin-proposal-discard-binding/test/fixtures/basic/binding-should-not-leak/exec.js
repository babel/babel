expect(() => {
  const { p: void, ...rest } = { p: 1 };
  {
    const _ = 0;
  }
  const underscore = _;
}).toThrow("_ is not defined");
