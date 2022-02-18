var _set = new WeakSet();

class Range {
  constructor(props) {
    this.foo = 'foo';

    _set.add(this);

    return this;
  }

  equals(range) {
    if (!_set.has(range)) return false;
  }

}
