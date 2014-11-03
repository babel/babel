Error.captureStackTrace = Error.captureStackTrace || function (obj) {
  if (Error.prepareStackTrace) {
    var frame = {
      isEval: function () { return false; },
      getFileName: function () { return "filename"; },
      getLineNumber: function () { return 1; },
      getColumnNumber: function () { return 1; },
      getFunctionName: function () { return "functionName" }
    };

    obj.stack = Error.prepareStackTrace(obj, [frame, frame, frame]);
  } else {
    obj.stack = obj.stack || obj.name || "Error";
  }
};

exports = module.exports = require("./transform");
exports.transform = exports;
exports.generate = require("./generator");
