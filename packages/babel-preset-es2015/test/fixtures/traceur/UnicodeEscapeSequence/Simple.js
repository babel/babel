// Options: --unicode-escape-sequences

(function() {
  expect("\u{0}").toBe("\u0000");
  expect("\u{000000001}").toBe("\u0001");
  expect("\u{FFFF}").toBe("\uFFFF");

  expect("\u{10000}").toBe("\uD800\uDC00");
  expect("\u{10FFFF}").toBe("\uDBFF\uDFFF");

  expect("\\u{1}").toBe("\\u{1}");
  expect("\\\u{1}").toBe("\\\u0001");

  expect("\U{1}").toBe("\U{1}");
})();
