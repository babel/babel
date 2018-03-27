function mapFilterGenerator() {
  function* map(list, fun) {
    for (var item of list) {
      yield fun(item);
    }
  }
  function* filter(list, fun) {
    for (var item of list) {
      if (fun(item)) {
        yield item;
      }
    }
  }
  // squares even numbers. no intermediate array is created.
  var numbers = [1,2,3,4,5,6,7,8,9,10];
  return map(
    filter(numbers, function(x) { return x % 2 == 0; }),
    function(x) { return (x * x) + ','; });
}

function accumulate(iterator) {
  var result = '';
  for (var value of iterator) {
    result = result + String(value);
  }
  return result;
}

// ----------------------------------------------------------------------------

expect(accumulate(mapFilterGenerator())).toBe('4,16,36,64,100,');
