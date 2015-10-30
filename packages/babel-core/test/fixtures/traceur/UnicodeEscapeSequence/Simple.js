// Options: --unicode-escape-sequences

(function() {
  assert.equal("\u{0}", "\u0000");
  assert.equal("\u{000000001}", "\u0001");
  assert.equal("\u{FFFF}", "\uFFFF");

  assert.equal("\u{10000}", "\uD800\uDC00");
  assert.equal("\u{10FFFF}", "\uDBFF\uDFFF");

  assert.equal("\\u{1}", "\\u{1}");
  assert.equal("\\\u{1}", "\\\u0001");

  assert.equal("\U{1}", "\U{1}");
})();
