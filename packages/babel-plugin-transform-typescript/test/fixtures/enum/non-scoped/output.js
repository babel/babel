var E;

(function (E) {
  E[E["x"] = 1] = "x";
  E[E["y"] = 2] = "y";
})(E || (E = {}));

(function (E) {
  E[E["z"] = 3] = "z";
})(E || (E = {}));
