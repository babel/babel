function *range(max, step) {
  var count = 0;
  step = step || 1;

  for (var i = 0; i < max; i += step) {
  count++;
  yield i;
  }

  return count;
}

var gen = range(20, 3), info;

while (!(info = gen.next()).done) {
  info.value;
}

assert(info.value, 7);
