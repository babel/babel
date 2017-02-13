function render(flag) {
  if (flag) {
    var _ret = function () {
      var bar = "bar";

      [].map(() => bar);

      return {
        v: <foo bar={bar} />
      };
    }();

    if (typeof _ret === "object") return _ret.v;
  }

  return null;
}