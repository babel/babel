(function() {
  function defineProperties(target, rawProps) {
    var props = {};
    for (var i = 0; i < rawProps.length; i ++) {
      var prop = rawProps[i];
      prop.configurable = true;
      if (prop.value) prop.writable = true;
      props[prop.key] = prop;
    }
    Object.defineProperties(target, props);
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})()
