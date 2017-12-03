"use strict";

exports.__esModule = true;
exports.visitor = undefined;

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var visitor = exports.visitor = {
  Function: function Function(path) {
    var params = path.get("params");

    var hoistTweak = t.isRestElement(params[params.length - 1]) ? 1 : 0;
    var outputParamsLength = params.length - hoistTweak;

    for (var i = 0; i < outputParamsLength; i++) {
      var param = params[i];
      if (param.isArrayPattern() || param.isObjectPattern()) {
        var uid = path.scope.generateUidIdentifier("ref");

        var declar = t.variableDeclaration("let", [t.variableDeclarator(param.node, uid)]);
        declar._blockHoist = outputParamsLength - i;

        path.ensureBlock();
        path.get("body").unshiftContainer("body", declar);

        param.replaceWith(uid);
      }
    }
  }
};