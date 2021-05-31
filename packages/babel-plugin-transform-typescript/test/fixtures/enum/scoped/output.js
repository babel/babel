{
  // Uses 'let' within a scope
  let E;

  (function (E) {})(E || (E = {}));
}
