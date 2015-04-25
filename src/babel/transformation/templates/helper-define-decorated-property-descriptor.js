(function (target, key, descriptors) {
  var _descriptor = descriptors[key];

  // clone it
  var descriptor = {};
  for (var _key in _descriptor) descriptor[_key] = _descriptor[_key];

  // initialize it
  descriptor.value = descriptor.initializer();

  Object.defineProperty(target, key, descriptor);
})
