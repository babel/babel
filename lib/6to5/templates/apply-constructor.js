(function (Constructor, args) {
  var instance = Object.create(Constructor.prototype);
  Constructor.apply(instance, args);
  return instance;
});
