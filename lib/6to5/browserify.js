var transform = require("./transform");
var through   = require("through");

var browserify = module.exports = function (filename) {
  return browserify.configure()(filename);
};

browserify.configure = function (opts) {
  opts = opts || {};

  return function (filename) {
    var data = "";

    var write = function (buf) {
      data += buf;
    };

    var end = function () {
      var opts2 = _.clone(opts);
      opts2.filename = filename;

      var out = transform(data, opts2);
      stream.queue(out);
      stream.queue(null);
    };

    var stream = through(write, end);
    return stream;
  };
};
