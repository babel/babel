(function get(object, property, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === void 0) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return void 0;
    } else {
      return get(parent);
    }
  } else if ("value" in desc && desc.writable) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === void 0) {
      return void 0;
    }

    return getter.call(receiver);
  }
});
