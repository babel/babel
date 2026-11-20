require("./side-channel.cjs").executed = true;

exports.__esModule = true;
exports.then = function (resolve) {
  resolve("then called");
};
