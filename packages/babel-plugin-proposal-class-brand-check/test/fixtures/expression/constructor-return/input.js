class Range {
  constructor(props) {
    this.foo = 'foo';
    return this;
  }

  equals(range) {
    if (!(class.hasInstance(range))) return false;
  }
}
