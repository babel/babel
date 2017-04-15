const o = {
  superDotAccess() {
    const arrow = () => {
      return super.doStuff();
    };
    arrow();
  },

  superBracketAccess() {
    const arrow = () => {
      const fnName = "doStuff";
      return super[fnName]();
    };
    arrow();
  }
}
