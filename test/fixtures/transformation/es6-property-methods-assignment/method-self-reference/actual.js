var bar = {
  foo() {
    console.log(foo);
  }
};

var bar = {
  foo() {
    var foo = 41;
    console.log(foo);
  }
};

var foobar = 123;
var foobar2 = {
  foobar() {
    return foobar;
  }
};
