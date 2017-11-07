var _this = this;

var fooCalls = [];

var _jumpTable = function jumpTable(name, ...args) {
  babelHelpers.newArrowCheck(this, _this);

  if (_jumpTable[name]) {
    _jumpTable[name](...args);
  }
}.bind(this);

Object.assign(_jumpTable, {
  foo(...args) {
    fooCalls.push(args);
  }

});

_jumpTable('foo', 'bar');

assert.isArray(fooCalls[0]);
assert.strictEqual(fooCalls[0][0], 'bar');
