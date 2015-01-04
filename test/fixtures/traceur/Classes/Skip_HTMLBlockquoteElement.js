// Skip. Not implemented.
// Only in browser.

class CustomBlockquote extends HTMLBlockquoteElement {
  constructor() {
    this.custom = 42;
  }
}

var customBlockquote = new CustomBlockquote;
assert.equal(42, customBlockquote.custom);
assert.equal('BLOCKQUOTE', customBlockquote.tagName);
assert.isTrue(customBlockquote instanceof CustomBlockquote);
assert.isTrue(customBlockquote instanceof HTMLBlockquoteElement);
assert.isTrue(customBlockquote instanceof HTMLQuoteElement);
assert.isTrue(customBlockquote instanceof HTMLElement);
