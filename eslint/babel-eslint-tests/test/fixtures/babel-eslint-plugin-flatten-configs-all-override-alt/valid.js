(function () {
  class C { accessor x = 2 }

  let a = do { 1 + 1 };
  let u = do {};
  return [C, a, u];
})();
