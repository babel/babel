var foo = 1;
(function () {
  throw new Error("\"foo\" is read-only");
})(), foo++;
