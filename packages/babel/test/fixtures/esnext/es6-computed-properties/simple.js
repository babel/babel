var x = 'y';
assert.equal({[x]: 10}.y, 10);
assert.equal({[x + 'y']: 10}.yy, 10);
