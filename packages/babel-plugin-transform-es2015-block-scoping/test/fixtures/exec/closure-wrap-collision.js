for (let i = 1; i < 3; i += 1) {
  (function () {
    i;
  })();
}

assert.throws(function () {
  i;
}, ReferenceError);
