expect(() => {
  {
    let inner = 'inner value';
  }
  var x = inner;
}).toThrow(ReferenceError);
