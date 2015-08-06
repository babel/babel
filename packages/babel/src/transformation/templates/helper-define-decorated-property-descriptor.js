(function (target, key, descriptors) {
  var _descriptor = descriptors[key];
  if (!_descriptor) return;

  // clone it
  var descriptor = {};
  for (var _key in _descriptor) descriptor[_key] = _descriptor[_key];

  // initialize it
  descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined;

  Object.defineProperty(target, key, descriptor);
})
