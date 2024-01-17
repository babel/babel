export default babelHelpers.decorate([dec()], function (_initialize) {
  class _Class {
    constructor() {
      _initialize(this);
    }
  }
  return {
    F: _Class,
    d: []
  };
});
