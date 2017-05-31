var object = {
  a: 1,
  b: {
    c: 2
  }
};

var jsxA = <object.a/>;
var jsxB = <object.b.c/>;
var jsxC = <object.a></object.a>;
var jsxD = <object.b.c></object.b.c>;
var jsxE = <object.a>{object.a}</object.a>;
var jsxF = <object.b.c>{object.b.c}</object.b.c>;
