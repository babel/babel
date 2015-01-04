// Options: --block-binding

function testBlock() {
  // Test function expressions.
  {
    var x = function g() { return 'g'; } || function h() { return 'h'; };
    return x;
  }
}

// ----------------------------------------------------------------------------

var result = testBlock();
assert.equal('g', result());
