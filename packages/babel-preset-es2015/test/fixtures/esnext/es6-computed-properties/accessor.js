var x = 'y';

var foo = {
  get [x]() { return this._y; },
  set [x](v) { this._y = v; }
};

expect((foo.y = 10, foo.y)).toBe(10);
