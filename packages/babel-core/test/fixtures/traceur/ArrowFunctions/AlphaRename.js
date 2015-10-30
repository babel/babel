var global = this;
var self = {};

function outer() {
  var f = () => {
    assert.equal(this, self);

    var g = () => {
      assert.equal(this, self);
    };
    g();

    var h = function() {
      assert.equal(this, global);
    };
    h();
  };

  f();
}

outer.call(self);
