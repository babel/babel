function noClassA() {}
noClassA.prototype = {
  ma: function() { return 'ma'; }
}

class NoClassB extends noClassA {
  mb() {
    return 'mb ' + super.ma();
  }
}

// ----------------------------------------------------------------------------

var b = new NoClassB;
expect(b instanceof noClassA).toBe(true);
expect('ma').toBe(b.ma());
expect('mb ma').toBe(b.mb());
