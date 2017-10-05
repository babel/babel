(function() {
  'use strict';
  var result = '(function() { return this; })()'
    |> eval;

  assert.notEqual(result, undefined);
})();
