const o = {
  superDotAccess() {
    var _super = super;

    const arrow = function () {
      return _super.doStuff();
    };
    arrow();
  },

  superBracketAccess() {
    var _super2 = super;

    const arrow = function () {
      const fnName = "doStuff";
      return _super2[fnName]();
    };
    arrow();
  }
};
