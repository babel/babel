var x, z;

({x = {y: 1}} = {});
assert.deepEqual(x, {y: 1});

({x = {y: {z = 2} = {}}} = {});
assert.equal(z, 2);
assert.deepEqual(x, {y: {}});

({x = {y: {z = 3} = {z: 4}}} = {});
assert.equal(z, 4);
assert.deepEqual(x, {y: {z: 4}});
