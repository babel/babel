(function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      return set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    return desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      return setter.call(receiver, value);
    }
  }
});
