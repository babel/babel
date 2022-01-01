var x = 10;
var Foo;

(function (Foo) {
  Foo[Foo["a"] = 10] = "a";
  Foo[Foo["b"] = 10] = "b";
  Foo[Foo["c"] = Foo.b + x] = "c";
})(Foo || (Foo = {}));

var Bar;

(function (Bar) {
  Bar[Bar["D"] = Foo.a] = "D";
  Bar[Bar["E"] = Bar.D] = "E";
  Bar[Bar["F"] = Math.E] = "F";
  Bar[Bar["G"] = Bar.E + Foo.c] = "G";
})(Bar || (Bar = {}));

var Baz;

(function (Baz) {
  Baz[Baz["a"] = 0] = "a";
  Baz[Baz["b"] = 1] = "b";
  Baz[Baz["x"] = Baz.a.toString()] = "x";
})(Baz || (Baz = {}));
