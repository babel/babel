var markers = [];

function *inner() {
  markers.push(0);
  var sent1 = yield 1;
  markers.push(2);
  var sent2 = yield 2;
  markers.push(3);
  return [sent1, sent2];
}

function wrapper(delegate) {
  var gen = (function*() {
    // This yield is the "initial yield" whose argument we ignore.
    var sent = yield "ignored", info;

    markers.push(1);

    while (!(info = delegate.next(sent)).done) {
      sent = yield info.value;
    }

    markers.push(4);

    return info.value;
  })();

  // Ensure that gen is not newborn and that the next invocation of
  // gen.next(value) can send value to the initial yield expression.
  gen.next();

  return gen;
}

var n = inner();

assert.deepEqual(n.next(), {
  value: 1,
  done: false
});

var g = wrapper(n);

// Unlike in the previous spec, it's fine to pass 3 to g.next here,
// because g is not newborn, because g.next was already called once
// before g was returned from the wrapper function.
assert.deepEqual(g.next(3), {
  value: 2,
  done: false
});

assert.deepEqual(g.next(4), {
  value: [3, 4],
  done: true
});

// Ensure we encountered the marker points in the expected order.
assert.deepEqual(markers, [0, 1, 2, 3, 4]);
