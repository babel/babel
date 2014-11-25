var obj = {};
obj.x ?= 2;
assert.equal(obj.x, 2);

obj = {};
assert.equal(obj.x ?= 2, 2);

obj = { x: 1 };
obj.x ?= 2;
assert.equal(obj.x, 1);

obj = { x: 1 };
assert.equal(obj.x ?= 2, 1);

obj = { x: undefined }
obj.x ?= 2;
assert.equal(obj.x, undefined);

obj = { x: undefined }
assert.equal(obj.x ?= 2, undefined);
