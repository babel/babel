(function (obj, defaults) {
  var keys = Object.getOwnPropertyNames(defaults);
  for (var key in keys) {
    if (obj[key] === undefined) {
      Object.defineProperty(obj, key, Object.getOwnPropertyDescriptor(defaults, key));
    }
  }
  return obj;
})
