let Database = /*#__PURE__*/function () {
  "use strict";

  function Database() {
    babelHelpers.classCallCheck(this, Database);
  }
  return babelHelpers.createClass(Database, [{
    key: "transaction",
    value: function transaction(
    // If the type annotation here contains the *name of the method*
    // then it changes how the method is compiled. Rename `transaction`
    // below and see how the output changes.
    callback) {
      return this.table.transaction(x => callback(new DaoTransaction(x)));
    }
  }]);
}();
