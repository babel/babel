// Options: --async-functions --generators=false
// Async.
//
// The --generators=false part is to test #1231

var f = (x, y) => ({x, y});

(async function() {
  var x = await 1;
  assert.equal(1, x);
  x = await (await 2);
  assert.equal(2, x);
  x = (await 3, await 4);
  assert.equal(4, x);

  x = f(await 5, await 6);
  assert.deepEqual({x: 5, y: 6}, x);
  x = await f(await 7, await 8);
  assert.deepEqual({x: 7, y: 8}, x);

  if (await true) {
    x = 9;
  } else {
    x = 10;
  }
  assert.equal(9, x);
  if (await false) {
    x = 11;
  } else {
    x = 12;
  }
  assert.equal(12, x);

  var j = 0;
  for (var i = await 0; (await i) < (await 3); await i++) {
    assert.equal(i, j++);
  }
  assert.equal(3, j);

  var g = (x) => x;
  var h = () => 13;
  x = await g({z: await h()});
  assert.deepEqual({z: 13}, x);

  done();
})();
