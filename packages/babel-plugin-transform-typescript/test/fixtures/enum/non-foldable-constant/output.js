var E = function (E) {
  E[E["a"] = Math.sin(1)] = "a";
  E[E["b"] = 1 + E["a"]] = "b";
  return E;
}(E || {});
