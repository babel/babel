expect(() => {
  var a = 5;
  if (a) {
    a;
    let a = 2;
  }
  a;
}).toThrow(ReferenceError);
