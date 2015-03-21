(function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i ++) {
      var prop = props[i];
      prop.configurable = true;
      if (prop.value) prop.writable = true;
      Object.defineProperty(target, prop.key, prop);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})()
