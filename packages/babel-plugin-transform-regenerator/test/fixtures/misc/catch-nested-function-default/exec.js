function* pattern() {
  try {
    throw { x: 2 };
  } catch ({ x, y = (function (v = x) { var x; return v; })() }) {
    yield y;
  }
}

function* identifier() {
  try {
    throw 2;
  } catch (x) {
    yield (function (v = x) { var x; return v; })();
  }
}

expect([...pattern()]).toEqual([2]);
expect([...identifier()]).toEqual([2]);
