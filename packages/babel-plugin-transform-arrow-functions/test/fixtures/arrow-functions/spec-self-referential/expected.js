var _this = this;

var fooCalls = [];

var jumpTable = function _jumpTable(name, ...args) {
  babelHelpers.newArrowCheck(this, _this);

  if (jumpTable[name]) {
    jumpTable[name](...args);
  }
}.bind(this);

Object.assign(jumpTable, {
  foo(...args) {
    fooCalls.push(args);
  }

});
jumpTable('foo', 'bar');
assert.isArray(fooCalls[0]);
assert.strictEqual(fooCalls[0][0], 'bar');
