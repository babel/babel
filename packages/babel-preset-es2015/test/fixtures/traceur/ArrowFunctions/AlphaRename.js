var global = this;
var self = {};

function outer() {
  var f = () => {
    expect(this).toBe(self);

    var g = () => {
      expect(this).toBe(self);
    };
    g();

    var h = function() {
      expect(this).toBe(global);
    };
    h();
  };

  f();
}

outer.call(self);
