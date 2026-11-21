var o = {
  set x({ a, ...b }) {
    return arguments;
  },
  set y({ c = z, ...d }) {
    var z;
    return arguments;
  },
};
