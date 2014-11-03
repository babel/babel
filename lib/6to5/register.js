require("./polyfill");

var sourceMapSupport = require("source-map-support");
var to5              = require("./index");
var _                = require("lodash");

sourceMapSupport.install({
  retrieveSourceMap: function (source) {
    var map = maps && maps[source];
    if (map) {
      return {
        url: null,
        map: map
      };
    } else {
      return null;
    }
  }
});

//

var blacklist  = [];

var blacklistTest = function (transformer, code) {
  try {
    new Function(code);
    blacklist.push(transformer);
  } catch (err) {
    if (err.name !== "SyntaxError") throw err;
  }
};

blacklistTest("arrayComprehension", "var foo = [for (foo of bar) foo * foo];");
blacklistTest("arrowFunctions", "var foo = x => x * x;");
blacklistTest("classes", "class Foo {}");
//blacklistTest("computedPropertyNames", "");
blacklistTest("constants", "const foo = 0;");
blacklistTest("defaultParamaters", "var foo = function (bar = 0) {};");
blacklistTest("destructuring", "var { x, y } = { x: 0, y: 0 };");
blacklistTest("forOf", "for (var foo of bar) {}");
blacklistTest("generators", "function* foo() {}");
blacklistTest("letScoping", "let foo = 0;");
//blacklistTest("modules", "");
//blacklistTest("propertyMethodAssignment", "");
blacklistTest("propertyNameShorthand", "var foo = { x, y };");
//blacklistTest("restParameters", "");
//blacklistTest("spread", "");
blacklistTest("templateLiterals", "`foo`");
blacklistTest("unicodeRegex", "/foo/u");

//

var ignoreRegex = /node_modules/;
var exts        = {};
var maps        = {};
var old         = require.extensions[".js"];

var loader = function (m, filename) {
  if (ignoreRegex && ignoreRegex.test(filename)) {
    return old.apply(this, arguments);
  }

  var result = to5.transformFileSync(filename, {
    blacklist: blacklist,
    sourceMap: true
  });

  maps[filename] = result.map;

  m._compile(result.code, filename);
};

var hookExtensions = function (_exts) {
  _.each(exts, function (old, ext) {
    require.extensions[ext] = old;
  });

  exts = {};

  _.each(_exts, function (ext) {
    exts[ext] = require.extensions[ext];
    require.extensions[ext] = loader;
  });
};

hookExtensions([".es6", ".js"]);

module.exports = function (opts) {
  opts = opts || {};
  if (_.isRegExp(opts)) opts = { ignoreRegex: opts };

  if (opts.ignoreRegex != null) {
    ignoreRegex = opts.ignoreRegex;
  }

  if (opts.blacklist) {
    blacklist = opts.blacklist;
  }

  if (opts.extensions) hookExtensions(opts.extensions);
};
