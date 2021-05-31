var _this = this;

var fooCalls = [];

var _jumpTable = function jumpTable(name, arg) {
  babelHelpers.newArrowCheck(this, _this);

  if (_jumpTable[name]) {
    _jumpTable[name](arg);
  }
}.bind(this);

Object.assign(_jumpTable, {
  foo(arg) {
    fooCalls.push(arg);
  }

});

_jumpTable('foo', 'bar');

expect(fooCalls[0]).toBe('bar');
