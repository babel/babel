function proxyObserver(component) {
  var _this = this;
  var _loop = function () {
    if (component.properties[key].observer) {
      var base = component.properties[key].observer;
      component.properties[key].observer = function () {
        base.apply(_this);
      };
    }
  };
  for (var key in component.properties) {
    _loop();
  }
  return component;
}
function proxyObserver2(component) {
  var _this2 = this;
  for (var key of component.properties) {
    var _loop2 = function () {
      var base = component.properties[key].observer;
      component.properties[key].observer = function () {
        base.apply(_this2);
      };
    };
    while (1) {
      _loop2();
    }
  }
  return component;
}
