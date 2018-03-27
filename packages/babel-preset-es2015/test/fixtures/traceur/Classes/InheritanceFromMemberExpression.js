var baseContainer = {
  base: function() {
    this.yyy = 'base constructor';
  }
};

baseContainer.base.prototype = {
  x: 'proto x',
  constructor: function() {
    this.y = 'base y';
  }
}

class MemberExprBase extends baseContainer.base {
  constructor(w) {
    super();
    this.z = 'var z';
    this.w = w;
  }
}

// ----------------------------------------------------------------------------

var a = new MemberExprBase('w value');
var pa = Object.getPrototypeOf(a);
var ppa = Object.getPrototypeOf(pa);

expect(a).toHaveProperty('yyy');
expect(a).toHaveProperty('w');
expect(a).toHaveProperty('z');
expect(a).not.toHaveProperty('x');
expect(pa).toHaveProperty('constructor');
expect(ppa).toHaveProperty('constructor');
