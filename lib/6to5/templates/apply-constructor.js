(function (Constructor, args) {
  var bindArgs = [null].concat(args);
  var Factory = Constructor.bind.apply(Constructor, bindArgs);
  return new Factory;
});
