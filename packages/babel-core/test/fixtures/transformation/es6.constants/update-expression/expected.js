var foo = 1;
(function () {
  throw new TypeError("\"foo\" is read-only");
})();
