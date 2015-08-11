class Joiner {
  constructor(string) {
    this.string = string;
  }

  join(...items) {
    return items.join(this.string);
  }

  static join(string, ...items) {
    var joiner = new this(string);
    // TODO: use spread params here
    return joiner.join.apply(joiner, items);
  }
}

class ArrayLike {
  constructor(...items) {
    items.forEach(function(item, i) {
      this[i] = item;
    }.bind(this));
    this.length = items.length;
  }
}

var joiner = new Joiner(' & ');
assert.equal(joiner.join(4, 5, 6), '4 & 5 & 6');
assert.equal(new ArrayLike('a', 'b')[1], 'b');
