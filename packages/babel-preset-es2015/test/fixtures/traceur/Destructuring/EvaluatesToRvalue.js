function destructEvaluatesToRvalue() {
  var a;
  return [a] = [1, 2, 3];
}

// ----------------------------------------------------------------------------

var result = destructEvaluatesToRvalue();
expect(result).toEqual([1, 2, 3]);;
