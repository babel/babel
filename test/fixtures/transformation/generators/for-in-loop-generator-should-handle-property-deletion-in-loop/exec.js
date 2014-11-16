function *gen() {
  var count = 0;
  var obj = {foo: 1, bar: 2};
  for (var key in obj) {
    assert(obj.hasOwnProperty(key), key + " must be own property");
    yield [key, obj[key]];
    delete obj.bar;
    count += 1;
  }
  return count;
}

genHelpers.check(gen(), [["foo", 1]], 1);
