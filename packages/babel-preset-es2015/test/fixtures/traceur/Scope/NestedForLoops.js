// Options: --block-binding --for-of

(function() {
  var count = 0;
  for (let x = 0; x < 1; x++) {
    for (let x = 1; x < 2; x++) {
      for (let x = 2; x < 3; x++) {
        count++;
        expect(x).toBe(2);
      }
    }
  }
  expect(count).toBe(1);
})();

(function() {
  var count = 0;
  for (let x in {0: 0}) {
    for (let x in {1: 1}) {
      for (let x in {2: 2}) {
        count++;
        expect(x).toBe('2');
      }
    }
  }
  expect(count).toBe(1);
})();

(function() {
  var count = 0;
  for (let x of [0]) {
    for (let x of [1]) {
      for (let x of [2]) {
        count++;
        expect(x).toBe(2);
      }
    }
  }
  expect(count).toBe(1);
})();
