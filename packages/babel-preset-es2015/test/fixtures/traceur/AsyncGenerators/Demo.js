// Options: --async-functions --async-generators --for-on
// Async.

function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function* asyncStream() {
  var i = 0;
  while (true) {
    await timeout(5);
    yield i;
    ++i;
  }
}

(async function() {
  var count = 0;
  for (value on asyncStream()) {
    count += value;
    if (value === 3) {
      break; // stops the async generator as well
    }
  }
  expect(count).toBe(6); // 6 = 1 + 2 + 3
  done();
})();
