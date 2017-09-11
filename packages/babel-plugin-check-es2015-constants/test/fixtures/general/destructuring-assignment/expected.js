var a = 1,
    b = 2;
a = (function () {
  throw new Error("\"a\" is read-only");
}(), 3);
