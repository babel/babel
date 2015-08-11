(function (obj, defaults) {
  var newObj = defaults({}, obj);
  delete newObj.default;
  return newObj;
})
