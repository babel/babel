// Not type-correct code
var E;

(function (E) {
  E[E["A"] = true] = "A";
})(E || (E = {}));
