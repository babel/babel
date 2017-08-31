for (var i = 0; i < 3; i = (function () {
  throw new Error("\"i\" is read-only");
}(), i + 1)) {
  console.log(i);
}
