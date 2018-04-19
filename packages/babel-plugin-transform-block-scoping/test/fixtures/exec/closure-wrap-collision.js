for (let i = 1; i < 3; i += 1) {
  (function () {
    i;
  })();
}

expect(function () {
  i;
}).toThrow(ReferenceError);
