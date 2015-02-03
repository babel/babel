(function (Constructor) {
  if (Object.getPrototypeOf(Constructor) !== null) {
    Object.getPrototypeOf(Constructor).apply(this, arguments);
  }
});
