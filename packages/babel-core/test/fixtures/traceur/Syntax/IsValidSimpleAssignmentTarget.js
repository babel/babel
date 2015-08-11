(function() {
  var eval = 1;
  eval++;
  ++eval;
  eval--;
  --eval;
  [eval] = [eval];
  ({eval} = {eval});
  eval += 1;
  eval /= 2;
  assert.equal(1, eval);
})();

(function() {
  var arguments = 1;
  arguments++;
  ++arguments;
  arguments--;
  --arguments;
  [arguments] = [arguments];
  ({arguments} = {arguments});
  arguments += 1;
  arguments /= 2;
  assert.equal(1, arguments);
})();

(function() {
  var yield = 1;
  yield++;
  ++yield;
  yield--;
  --yield;
  [yield] = [yield];
  ({yield} = {yield});
  yield += 1;
  yield /= 2;
  assert.equal(1, yield);
})();
