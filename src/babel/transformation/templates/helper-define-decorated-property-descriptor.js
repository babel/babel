(function (target, key, descriptors) {
  var _descriptor = descriptors[key];

  // clone it
  var descriptor = {};
  for (var _key in _descriptor) descriptor[_key] = _descriptor[_key];

  // initialize it
  if (descriptor.initializer) {
    descriptor.value = descriptor.initializer.call(target);
  }

  Object.defineProperty(target, key, descriptor);
})
