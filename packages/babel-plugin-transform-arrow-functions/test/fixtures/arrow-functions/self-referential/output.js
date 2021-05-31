var fooCalls = [];

var jumpTable = function jumpTable(name, arg) {
  if (jumpTable[name]) {
    jumpTable[name](arg);
  }
};

Object.assign(jumpTable, {
  foo(arg) {
    fooCalls.push(arg);
  }

});
jumpTable('foo', 'bar');
expect(fooCalls[0]).toBe('bar');
