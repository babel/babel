expect(() => {
  let { b: d } = { d }
}).toThrow(ReferenceError);