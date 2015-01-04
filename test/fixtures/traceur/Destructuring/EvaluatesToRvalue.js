function destructEvaluatesToRvalue() {
  var a;
  return [a] = [1, 2, 3];
}

// ----------------------------------------------------------------------------

var result = destructEvaluatesToRvalue();
assertArrayEquals([1, 2, 3], result);
