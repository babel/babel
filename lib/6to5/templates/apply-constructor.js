(function (Constructor, args) {
  var instance = Object.create(Constructor);
  Constructor.apply(instance, args);
  return instance;
});
