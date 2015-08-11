function destructEvaluationOrder() {
  var a;
  [a, a, a] = [1, 2, 3, 4];
  return a;
}

// ----------------------------------------------------------------------------

var result = destructEvaluationOrder();
assert.equal(3, result);
