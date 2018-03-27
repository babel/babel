function* switchGenerator(val) {
  switch (val) {
    case 1:
      yield val;
    case 2:
      yield val * 2;
      break;
    case 3:
      break;
    default:
      yield val * 10;
  }

  // switch without a default
  switch (val) {
    case 1000:
      yield val;
      break;
  }
  yield val * 5;
}


function accumulate(iterator) {
  var result = '';
  for (var value of iterator) {
    result = result + String(value);
  }
  return result;
}

// ----------------------------------------------------------------------------

expect(accumulate(switchGenerator(1))).toBe('125');
expect(accumulate(switchGenerator(2))).toBe('410');
expect(accumulate(switchGenerator(3))).toBe('15');
expect(accumulate(switchGenerator(4))).toBe('4020');
