class List extends Array {}

assert.ok(new List instanceof List);
assert.ok(new List instanceof Array);
