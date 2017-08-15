export let E;

(function (E) {
  E[E["A"] = 1] = "A";
})(E || (E = {}));

(function (E) {
  E[E["B"] = 2] = "B";
})(E || (E = {}));