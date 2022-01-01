var x = 10;
var Foo;

(function (Foo) {
  Foo[Foo["a"] = 10] = "a";
  Foo[Foo["b"] = 10] = "b";
  Foo[Foo["c"] = Foo.b + x] = "c";
})(Foo || (Foo = {}));

var Bar;

(function (Bar) {
  Bar[Bar["b"] = Foo.a] = "b";
  Bar[Bar["E"] = b] = "E";
  Bar[Bar["F"] = Math.E] = "F";
})(Bar || (Bar = {}));
