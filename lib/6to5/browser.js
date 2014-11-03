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

console.log("omg hi");

exports.generate  = require("./generator");
exports.transform = require("./transform");
