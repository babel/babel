var markers = [];

async function innerMost(marker) {
  markers.push(marker);
  return await marker;
}

async function inner(marker) {
  markers.push(marker);

  assert.strictEqual(
    await innerMost(marker + 1),
    marker + 1
  );

  markers.push(marker + 2);

  assert.strictEqual(
    await innerMost(marker + 3),
    marker + 3
  );

  markers.push(marker + 4);
}

async function outer() {
  markers.push(0);
  await inner(1);
  markers.push(6);
  await inner(7);
  markers.push(12);
}

outer().then(function() {
  var expected = [];
  for (var i = 0; i <= 12; ++i)
    expected.push(i);
  assert.deepEqual(markers, expected);
  done();
}).catch(done);
