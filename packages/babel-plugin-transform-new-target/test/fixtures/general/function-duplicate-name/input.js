function Foo() {
  function Foo() {
    var Foo = new.target;
  }

  Foo.prototype.test = function() {
    var Foo = new.target;
  };
}

var Bar = function() {
  var Bar = new.target;
};
