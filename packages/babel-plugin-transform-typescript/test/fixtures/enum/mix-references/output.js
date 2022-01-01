var x = 10;
var Bar;

(function (Bar) {
  Bar[Bar["d"] = 1] = "d";
})(Bar || (Bar = {}));

var Foo;

(function (Foo) {
  Foo[Foo["a"] = 10] = "a";
  Foo[Foo["b"] = 10] = "b";
  Foo[Foo["c"] = Foo.b + x] = "c";
  Foo[Foo["d"] = Bar.d] = "d";
})(Foo || (Foo = {}));
