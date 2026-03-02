window.test = function () {
  var e = "TEST";
  switch (e) {
    case "TEST":
      var _e = [];
      _e.push('111');
      alert(_e);
      break;
    default:
      alert('666');
      break;
  }
};
window.test = function () {
  var e = "TEST";
  switch (e) {
    case "TEST":
      var _e2 = [];
      switch (_e2) {}
  }
};
