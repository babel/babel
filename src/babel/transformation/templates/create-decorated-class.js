(function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i ++) {
      var descriptor = props[i];

      descriptor.enumerable = false;
      descriptor.configurable = true;
      if (descriptor.value) descriptor.writable = true;

      if (descriptor.decorators) {
        for (var i = 0; i < descriptor.decorators.length; i++) {
          var decorator = descriptor.decorators[i];
          if (typeof decorator === "function") {
            descriptor = decorator(target, descriptor.key, descriptor) || descriptor;
          } else {
            throw new TypeError("The decorator for method " + descriptor.key + " is of the invalid type " + typeof decorator);
          }
        }
      }

      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})()
