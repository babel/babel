// Options: --block-binding

function blockTest() {
  {
    let x = 'let x value';
    function g() {
      return x;
    }
    return g;
  }
}

// ----------------------------------------------------------------------------

assert.equal('let x value', blockTest()());
