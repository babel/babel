var a = "str";
(function () {
  throw new Error("\"a\" is read-only");
})(), --a;
