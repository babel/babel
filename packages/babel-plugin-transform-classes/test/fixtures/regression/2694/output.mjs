import BaseFoo from './BaseFoo';
var SubFoo = /*#__PURE__*/function (_BaseFoo) {
  function SubFoo() {
    babelHelpers.classCallCheck(this, SubFoo);
    return babelHelpers.callSuper(this, SubFoo, arguments);
  }
  babelHelpers.inherits(SubFoo, _BaseFoo);
  return babelHelpers.createClass(SubFoo, null, [{
    key: "talk",
    value: function talk() {
      babelHelpers.superPropGet(SubFoo, "talk", this, 2)([]);
      console.log('SubFoo.talk');
    }
  }]);
}(BaseFoo);
export { SubFoo as default };
