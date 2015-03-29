(function() {
  function defineProperties(target, descriptors, initializers) {
    for (var i = 0; i < descriptors.length; i ++) {
      var descriptor = descriptors[i];
      var decorators = descriptor.decorators;
      var key        = descriptor.key;

      // don't want to expose these to userland since i know people will rely on them
      // and think it's spec behaviour
      delete descriptor.key;
      delete descriptor.decorators;

      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor || descriptor.initializer) descriptor.writable = true;

      if (decorators) {
        for (var f = 0; f < decorators.length; f++) {
          var decorator = decorators[f];
          if (typeof decorator === "function") {
            descriptor = decorator(target, key, descriptor) || descriptor;
          } else {
            throw new TypeError("The decorator for method " + descriptor.key + " is of the invalid type " + typeof decorator);
          }
        }
        if (initializers) initializers[key] = descriptor.initializer;
      }

      Object.defineProperty(target, key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers);
    if (staticProps) defineProperties(Constructor, staticProps, staticInitializers);
    return Constructor;
  };
})()
