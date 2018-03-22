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
  expect(eval).toBe(1);
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
  expect(arguments).toBe(1);
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
  expect(yield).toBe(1);
})();
