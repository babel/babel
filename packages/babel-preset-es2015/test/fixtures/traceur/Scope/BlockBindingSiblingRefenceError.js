assert.throws(() => {
  {
    let inner = 'inner value';
  }
  var x = inner;
}, ReferenceError);
