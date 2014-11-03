Error.captureStackTrace = Error.captureStackTrace || function (obj) {
  obj.stack = [{ toString: null }];
};

exports.generate  = require("./generator");
exports.transform = require("./transform");
