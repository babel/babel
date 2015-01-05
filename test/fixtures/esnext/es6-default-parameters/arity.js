assert.equal((function(a){}).length, 1);
assert.equal((function(a=5){}).length, 0);
assert.equal((function(a, b, c=5){}).length, 2);
