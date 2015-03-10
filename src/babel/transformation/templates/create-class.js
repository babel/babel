(function() {
  function defineProperties(target, props) {
    var keys = Object.getOwnPropertyNames(props);
    if (Object.getOwnPropertySymbols !== undefined) keys = keys.concat(Object.getOwnPropertySymbols(props));
    for (var i = 0, count = keys.length; i < count; ++i) {
      var prop = props[keys[i]];
      prop.configurable = true;
      if (prop.value) prop.writable = true;
    }
    Object.defineProperties(target, props);
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})()
