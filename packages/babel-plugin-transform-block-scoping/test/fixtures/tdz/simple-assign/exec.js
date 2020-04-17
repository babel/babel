expect(() => {
  i = 2;
  let i
}).toThrow(ReferenceError);
