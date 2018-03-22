function destructEvaluationOrder() {
  var a;
  [a, a, a] = [1, 2, 3, 4];
  return a;
}

// ----------------------------------------------------------------------------

var result = destructEvaluationOrder();
expect(3).toBe(result);
