exports.blacklist = ["es6.modules"];

exports.resolveModuleSource = function (originalSource) {
  return "resolved/" + originalSource;
};
