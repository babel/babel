// Options: --async-functions --generators=false
// Async.
//
// The --generators=false part is to test #1231

var f = (x, y) => ({x, y});

(async function() {
  var x = await 1;
  expect(1).toBe(x);
  x = await (await 2);
  expect(2).toBe(x);
  x = (await 3, await 4);
  expect(4).toBe(x);

  x = f(await 5, await 6);
  expect({x: 5, y: 6}).toEqual(x);
  x = await f(await 7, await 8);
  expect({x: 7, y: 8}).toEqual(x);

  if (await true) {
    x = 9;
  } else {
    x = 10;
  }
  expect(9).toBe(x);
  if (await false) {
    x = 11;
  } else {
    x = 12;
  }
  expect(12).toBe(x);

  var j = 0;
  for (var i = await 0; (await i) < (await 3); await i++) {
    expect(i).toBe(j++);
  }
  expect(3).toBe(j);

  var g = (x) => x;
  var h = () => 13;
  x = await g({z: await h()});
  expect({z: 13}).toEqual(x);

  done();
})();
