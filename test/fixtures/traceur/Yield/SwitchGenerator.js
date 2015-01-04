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

assert.equal('125', accumulate(switchGenerator(1)));
assert.equal('410', accumulate(switchGenerator(2)));
assert.equal('15', accumulate(switchGenerator(3)));
assert.equal('4020', accumulate(switchGenerator(4)));
