require("./polyfill");

var sourceMapSupport = require("source-map-support");
var registerCache    = require("./register-cache");
var util             = require("./util");
var to5              = require("./index");
var fs               = require("fs");
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
    if (_.isFunction(code)) {
      code();
    } else {
      new Function(code);
    }
    blacklist.push(transformer);
  } catch (err) {
    if (err.name !== "SyntaxError") throw err;
  }
};

blacklistTest("arrayComprehension", "var foo = [for (foo of bar) foo * foo];");
blacklistTest("generatorComprehension", "var foo = (for (foo of bar) foo * foo)");
blacklistTest("arrowFunctions", "var foo = x => x * x;");
blacklistTest("classes", "class Foo {}");
blacklistTest("computedPropertyNames", "var foo = { [foo]: bar };");
blacklistTest("constants", function () {
  try {
    new Function("const foo = 'foo';\nfoo = 'wow';");
  } catch (err) {
    return; // constants are supported
  }
  throw new SyntaxError;
});
blacklistTest("defaultParamaters", "var foo = function (bar = 0) {};");
blacklistTest("destructuring", "var { x, y } = { x: 0, y: 0 };");
blacklistTest("forOf", "for (var foo of bar) {}");
blacklistTest("generators", "function* foo() {}\nasync function bar() {}"); // generators/async functions delegated to same transformer
blacklistTest("letScoping", "let foo = 0;");
blacklistTest("modules", 'import foo from "from";');
blacklistTest("propertyMethodAssignment", "{ get foo() {} }");
blacklistTest("propertyNameShorthand", "var foo = { x, y };");
blacklistTest("restParameters", "function foo(...bar) {}");
blacklistTest("spread", "foo(...bar);");
blacklistTest("templateLiterals", "var foo = `foo`;");
blacklistTest("unicodeRegex", function () { new RegExp("foo", "u"); });

//

registerCache.load();
var cache = registerCache.get();

//

var transformOpts = {};
var ignoreRegex   = /node_modules/;
var onlyRegex;
var whitelist     = [];
var exts          = {};
var maps          = {};
var old           = require.extensions[".js"];

var mtime = function (filename) {
  return +fs.statSync(filename).mtime;
};

var loader = function (m, filename) {
  if ((ignoreRegex && ignoreRegex.test(filename)) || (onlyRegex && !onlyRegex.test(filename))) {
    return old.apply(this, arguments);
  }

  var result;

  if (cache) {
    var cached = cache[filename];
    if (cached && cached.mtime === mtime(filename)) {
      result = cached;
    }
  }

  result = result || to5.transformFileSync(filename, _.extend({
    whitelist: whitelist,
    blacklist: blacklist,
    sourceMap: true,
    ast:       false
  }, transformOpts));

  if (cache) {
    result.mtime = mtime(filename);
    cache[filename] = result;
  }

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

hookExtensions([".es6", ".es", ".js"]);

module.exports = function (opts) {
  // normalise options
  opts = opts || {};
  if (_.isRegExp(opts)) opts = { ignore: opts };
  if (opts.ignoreRegex != null) opts.ignore = opts.ignoreRegex;

  if (opts.only != null) onlyRegex = util.regexify(opts.only);
  if (opts.ignore != null) ignoreRegex = util.regexify(opts.ignore);

  if (opts.extensions) hookExtensions(util.arrayify(opts.extensions));

  if (opts.cache === false) cache = null;

  _.extend(transformOpts, opts);
};
