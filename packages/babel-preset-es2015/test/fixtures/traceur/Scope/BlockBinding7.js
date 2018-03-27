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

expect(blockTest()()).toBe('let x value');
