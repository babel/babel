assert.equal(match(3, 3, () => "bar", 4, () => "foo"), "bar");
assert.equal(match(4, 3, () => "bar", 4, () => "foo"), "foo");
