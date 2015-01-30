(function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return;
    } else {
      return set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
    return;
  } else {
    var setter = desc.set;

    if (setter === undefined) {
      return;
    }

    return setter.call(receiver, value);
  }
});
