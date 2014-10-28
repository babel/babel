Error.stackTraceLimit = Infinity;

var jsTrans = require("jstransform");
var traceur = require("traceur");
var es6tr   = require("es6-transpiler");
var es6now  = require("es6now");
var esnext  = require("esnext");
var to5     = require("../lib/6to5");

var uglify  = require("uglify-js");
var matcha  = require("matcha");
var path    = require("path");
var fs      = require("fs");
var _       = require("lodash");

var readResolve = function (filename) {
  try {
    filename = require.resolve(filename);
  } catch (err) {
    return null;
  }
  return fs.readFileSync(filename, "utf8");
};

var getVersion = function (name) {
  return require(name + "/package.json").version;
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
    version: getVersion(".."),
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
    runtime: readResolve("esnext/node_modules/regenerator/runtime.js") || readResolve("regenerator/runtime.js"),
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

// versions

var uglifyTitle = "uglify v" + getVersion("uglify-js");

_.each(compilers, function (compiler, name) {
  compiler.title = name + " v" + (compiler.version || getVersion(name));
});

//

var sizeBenchmark = function (code, loc, name, compiler) {
  var log = function (output, title) {
    title = [compiler.title].concat(title || []).join(" + ");

    var text;
    var color;
    if (output.stack) {
      text = "error";
      color = "red";
    } else {
      var kilo  = (output.length / 1024).toFixed(2);
      text = kilo + "KB";
      color = "cyan";
    }

    text = matcha.utils.color(matcha.utils.padBefore(text, 22), color);

    console.log(text, matcha.utils.color("» " + title, "gray"));

    if (output.stack) {
      console.error(output.stack);
    }
  };

  var go = function (getOutput, title) {
    var code;
    try {
      code = getOutput();
    } catch (err) {
      log(err, title);
      return;
    }

    log(code, title);
  };

  var output;
  go(function () {
    return output = compiler.compile(code, loc);
  });
  if (!output) return;

  //go(function () {
  //  return uglify.minify(output, { fromString: true }).code;
  //}, uglifyTitle);
};

//

_.each(fs.readdirSync(__dirname + "/fixtures"), function (name) {
  var alias = path.basename(name, path.extname(name));

  suite(alias, function () {
    set("delay", 0);

    var loc  = __dirname + "/fixtures/" + name;
    var code = fs.readFileSync(loc, "utf8");

    before(function () {
      _.each(compilers, function (compiler, name) {
        sizeBenchmark(code, loc, name, compiler);
      });
    });

    _.each(compilers, function (compiler, name) {
      bench(compiler.title, function () {
        compiler.compile(code, loc);
      });
    });
  });
});
