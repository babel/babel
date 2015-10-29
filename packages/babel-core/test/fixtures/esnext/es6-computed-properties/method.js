var x = 'y';
assert.equal({[x]: function() { return 10; }}.y(), 10);
assert.equal({[x + 'y']() { return 10; }}.yy(), 10);
