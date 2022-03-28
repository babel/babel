var _set = new WeakSet();

class Range {
  constructor() {
    _set.add(this);
  }

  equals(range) {
    _set.has(range);
    _set.has(range);
  }

}
