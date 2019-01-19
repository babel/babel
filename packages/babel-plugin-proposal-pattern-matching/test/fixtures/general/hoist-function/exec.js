/*
  This is logically part of the `scoping` test but is separate in
  order to get its own options.json, because it doesn't work on Node 6.
*/

(() => {
  do {
    case (42) {
      when v -> {
        function alsoMe () { return v }
      }
    }
  } while (0);

  expect(alsoMe()).toBe(42);
})();
