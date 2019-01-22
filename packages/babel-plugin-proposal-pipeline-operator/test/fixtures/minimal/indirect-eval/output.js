(function () {
  'use strict';

  const _pipe = '(function() { return this; })()';
  var result = (0, eval)(_pipe);
  expect(result).not.toBeUndefined();
})();
