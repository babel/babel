class ChainA {
  foo() {
    return 'A';
  }
}

class ChainB extends ChainA {
  foo() {
    return super.foo() + ' B';
  }
}

class ChainC extends ChainB {
  foo() {
    return super.foo() + ' C';
  }
}

class ChainD extends ChainC {
  foo() {
    return super.foo() + ' D';
  }
}

// ----------------------------------------------------------------------------

var d = new ChainD();
expect('A B C D').toBe(d.foo());
