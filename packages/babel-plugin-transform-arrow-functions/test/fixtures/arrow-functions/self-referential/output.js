var fooCalls = [];
var _jumpTable = function jumpTable(name, arg) {
  if (_jumpTable[name]) {
    _jumpTable[name](arg);
  }
};
Object.assign(_jumpTable, {
  foo(arg) {
    fooCalls.push(arg);
  }
});
_jumpTable('foo', 'bar');
expect(fooCalls[0]).toBe('bar');
