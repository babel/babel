var x = 'y';

var foo = {
  get [x]() { return this._y; },
  set [x](v) { this._y = v; }
};

assert.equal((foo.y = 10, foo.y), 10);
