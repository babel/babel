class Obj {
  constructor() {
    super();
  }
}

assert.doesNotThrow(function() {
  new Obj();
});
