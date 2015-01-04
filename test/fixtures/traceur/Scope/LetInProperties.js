// Options: --block-binding

var object = {
  get x() {
    while (true) {
      let let_x = 'let x';
      return let_x;
    }
  },

  set x(v) {
    do {
      let let_v = v;
      this.v = let_v;
    } while (false);
  }
}

// ----------------------------------------------------------------------------
