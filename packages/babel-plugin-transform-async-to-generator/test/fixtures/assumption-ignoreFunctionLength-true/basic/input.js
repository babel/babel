async (x = 1) => 1;
(async function (x = 2) {
  return 2;
})();

foo(async (...x) => {});
foo(async (...[...y]) => {});
