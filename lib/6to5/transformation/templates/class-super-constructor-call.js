(function (instance, Constructor) {
  if (Object.getPrototypeOf(Constructor) !== null) {
    Object.getPrototypeOf(Constructor).apply(instance, arguments);
  }
});
