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

assertHasOwnProperty(a, 'yyy', 'w', 'z');
assertLacksOwnProperty(a, 'x');
assertHasOwnProperty(pa, 'constructor');
assertHasOwnProperty(ppa, 'x', 'constructor');
