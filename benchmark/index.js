Error.stackTraceLimit = Infinity;

var jsTrans = require("jstransform");
var traceur = require("traceur");
var es6tr   = require("es6-transpiler");
var es6now  = require("es6now");
var esnext  = require("esnext");
var to5     = require("../lib/6to5");

var matcha  = require("matcha");
var stream  = require("stream");
var path    = require("path");
var fs      = require("fs");
var vm      = require("vm");
var _       = require("lodash");

var readResolve = function (filename) {
  return fs.readFileSync(require.resolve(filename), "utf8");
};

var jsTransVisitors = [];

_.each([
  "arrow-function-visitors", "class-visitors", "destructuring-visitors",
  "object-concise-method-visitors", "object-short-notation-visitors",
  "rest-param-visitors", "template-visitors"
], function (name) {
  var mod = require("jstransform/visitors/es6-" + name);
  jsTransVisitors = jsTransVisitors.concat(mod.visitorList);
});


var compilers = {
  "6to5": {
    compile: function (code, filename) {
      return to5.transform(code, { filename: filename }).code;
    }
  },

  traceur: {
    runtime: readResolve("traceur/bin/traceur-runtime.js"),
    compile: function (code, filename) {
      return traceur.compile(code, {
        modules: "commonjs",
        experimental: true
      });
    }
  },

  esnext: {
    runtime: readResolve("esnext/node_modules/regenerator/runtime.js"),
    compile: function (code, filename) {
      return esnext.compile(code).code;
    }
  },

  es6now: {
    runtime: readResolve("es6now/runtime/ES6.js"),
    compile: function (code, filename) {
      return es6now.translate(code);
    }
  },

  "es6-transpiler": {
    compile: function (code, filename) {
      var result = es6tr.run({ src: code });
      if (result.errors.length) throw new Error(result.join("; "));
      return result.src;
    }
  },

  jstransform: {
    compile: function (code, filename) {
      return jsTrans.transform(jsTransVisitors, code).code;
    }
  }
};

_.each(fs.readdirSync(__dirname + "/fixtures"), function (name) {
  var alias = path.basename(name, path.extname(name));

  suite(alias, function () {
    set("delay", 0);

    var loc  = __dirname + "/fixtures/" + name;
    var code = fs.readFileSync(loc, "utf8");

    before(function () {
      _.each(compilers, function (compiler, name) {
        var output = compiler.compile(code, loc);
        if (compiler.runtime) output = compiler.runtime + "\n" + output;

        var kilo  = (output.length / 1024).toFixed(2);
        console.log(
          matcha.utils.color(matcha.utils.padBefore(kilo + "KB", 22), "cyan"),
          matcha.utils.color("» " + name, "gray")
        );
      });
    });

    _.each(compilers, function (compiler, name) {
      bench(name, function () {
        compiler.compile(code, loc);
      });
    });
  });
});
