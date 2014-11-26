require("./polyfill");

var sourceMapSupport = require("source-map-support");
var util             = require("./util");
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
//blacklistTest("generatorComprehension", "");
blacklistTest("arrowFunctions", "var foo = x => x * x;");
blacklistTest("classes", "class Foo {}");
blacklistTest("computedPropertyNames", "var foo = { [foo]: bar };");
//blacklistTest("constants", "const foo = 0;");
blacklistTest("defaultParamaters", "var foo = function (bar = 0) {};");
blacklistTest("destructuring", "var { x, y } = { x: 0, y: 0 };");
blacklistTest("forOf", "for (var foo of bar) {}");
blacklistTest("generators", "function* foo() {}");
blacklistTest("letScoping", "let foo = 0;");
blacklistTest("modules", 'import foo from "from";');
blacklistTest("propertyMethodAssignment", "{ get foo() {} }");
blacklistTest("propertyNameShorthand", "var foo = { x, y };");
blacklistTest("restParameters", "function foo(...bar) {}");
blacklistTest("spread", "foo(...bar);");
blacklistTest("templateLiterals", "var foo = `foo`;");
blacklistTest("unicodeRegex", function () { new RegExp("foo", "u"); });

//

var scopedOptsList = [];
var whitelist     = [];
var maps          = {};
var old           = require.extensions[".js"];

var loader = function (m, filename) {
  var filter, transformOpts;

  filter = _.find(scopedOptsList, function(filter) {
    return _.some(filter.exts, function(ext) { return filename.endsWith(ext); }) && filter.test(m, filename)
  });
  if (!filter) {
    return old.apply(this, arguments);
  }
  transformOpts = filter.transformOpts;

  var result = to5.transformFileSync(filename, _.extend({
    whitelist: whitelist,
    blacklist: blacklist,
    sourceMap: true,
    modules:   "commonInterop"
  }, transformOpts));

  maps[filename] = result.map;

  m._compile(result.code, filename);
};

var hookExtensions = function (scopedOpts) {
  scopedOptsList.push(scopedOpts);

  _.each(scopedOpts.exts, function (ext) {
    var extLoader = require.extensions[ext];
    if (extLoader !== loader) {
      require.extensions[ext] = loader; // TODO: Should wrap existing one instead of replacing?
    }
  });
};

module.exports = function (opts) {
  var ignoreRegex, onlyRegex, ignoreFunc, onlyFunc, test, exts, scopedOpts;

  onlyFunc = function() { return true; };
  ignoreFunc = function() { return false; };

  // normalise options
  opts = opts || {};
  if (_.isRegExp(opts)) opts = { ignore: opts };
  if (opts.ignoreRegex != null) opts.ignore = opts.ignoreRegex;

  if (opts.only != null) {
    if (typeof opts.only === 'function') {
      onlyFunc = function(m, filename) { return opts.only.call(opts, m, filename); };
    } else {
      onlyRegex = util.regexify(opts.only);
      onlyFunc = function(m, filename) { return onlyRegex.test(filename); };
    }
  }
  if (opts.ignore != null) {
    if (typeof opts.only === 'function') {
      ignoreFunc = function(m, filename) { return opts.ignore.call(opts, m, filename); };
    } else {
      ignoreRegex = util.regexify(opts.ignore);
      ignoreFunc = function(m, filename) { return ignoreRegex.test(filename); };
    }
  }

  if (onlyFunc || ignoreFunc)
    test = function(m, filename) { return !ignoreFunc(m, filename) && onlyFunc(m, filename); };

  exts = util.arrayify(opts.extensions || ['.es6', '.js']);
  scopedOpts = {
    exts: exts,
    test: test,
    transformOpts: opts
  };

  hookExtensions(scopedOpts);
};
