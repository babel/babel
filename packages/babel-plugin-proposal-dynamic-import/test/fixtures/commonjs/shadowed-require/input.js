var require = "foo";

(async function () {
  var require = "bar";
  await import("./mod");
})();
