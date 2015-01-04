// Options: --unicode-expressions

// Only test if the transformation worked or not. For everything else, defer
// to regexpu's test suite:
// https://github.com/mathiasbynens/regexpu/blob/master/tests/tests.js
(function() {
  assert(/a/u.source === 'a');
  assert(/a.b/u.source === 'a(?:[\\0-\\t\\x0B\\f\\x0E-\\u2027\\u202A-\\uD7FF\\uDC00-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF])b');
})();
