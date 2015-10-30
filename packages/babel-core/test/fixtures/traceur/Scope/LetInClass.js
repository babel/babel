// Options: --block-binding

class LetInClass {
  get z() {
    let let_z = 10;
    return let_z;
  }

  set z(v) {
    let let_zv = v;
  }

  distance() {
    let dist = this.y - this.x;
    return dist;
  }
}

// ----------------------------------------------------------------------------
