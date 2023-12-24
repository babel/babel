function generateAsyncAction(type) {
  type = type.toUpperCase();
  var request = createAction(type + '_REQUEST', undefined, requestMetaCreator);
  request.request = request; // crazy
  request.success = createAction(type + '_SUCCESS', undefined, metaCreator);
  request.error = createAction(type + '_ERROR', undefined, metaCreator);
  request.cancel = createAction(type + '_CANCEL', undefined, metaCreator);
  request.progress = createAction(type + '_PROGRESS', undefined, metaCreator);
  request.process = createAction(type + '_PROCESS', undefined, metaCreator);
  return request;
}
var A = /*#__PURE__*/function (_B) {
  "use strict";

  babelHelpers.inherits(A, _B);
  function A(timestamp) {
    var _this;
    babelHelpers.classCallCheck(this, A);
    _this = babelHelpers.callSuper(this, A);
    _this.timestamp = timestamp;
    _this.moment = moment(timestamp);
    return _this;
  }
  return babelHelpers.createClass(A);
}(B);
