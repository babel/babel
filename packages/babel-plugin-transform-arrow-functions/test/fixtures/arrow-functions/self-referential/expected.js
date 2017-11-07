var fooCalls = [];

var jumpTable = function jumpTable(name, ...args) {
  if (jumpTable[name]) {
    jumpTable[name](...args);
  }
};

Object.assign(jumpTable, {
  foo(...args) {
    fooCalls.push(args);
  }

});
jumpTable('foo', 'bar');
assert.isArray(fooCalls[0]);
assert.strictEqual(fooCalls[0][0], 'bar');
