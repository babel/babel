// Not type-correct code
var E;

(function (E) {
  E[E["A"] = "HALLO" + "WERLD"] = "A";
})(E || (E = {}));
