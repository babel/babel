async function outer(value) {
  var resolved = false;
  var p1 = new Promise(function(resolve) {
    setTimeout(function() {
      resolve(value + 1);
      resolved = true;
    }, 0);
  });

  assert.strictEqual(resolved, false);

  var v2 = await p1.then(function(value) {
    return value + 1;
  });

  assert.strictEqual(resolved, true);

  var v1 = await p1;

  return [v1, v2];
}

outer(1).then(function(pair) {
  assert.deepEqual(pair, [2, 3]);
  done();
}).catch(done);
