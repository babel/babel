var _set = new WeakSet();

class Range {
  constructor() {
    _set.add(this);
  }

  equals(range) {
    if (!_set.has(range)) return false;
  }

}
