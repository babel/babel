var transform = require("./transform");
var through   = require("through");

module.exports = function (filename) {
  var data = "";

  var write = function (buf) {
    data += buf;
  };

  var end = function () {
    var out = transform(data, { filename: filename });
    stream.queue(out);
    stream.queue(null);
  };

  var stream = through(write, end);
  return stream;
};
