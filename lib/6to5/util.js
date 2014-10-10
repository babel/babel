var traverse = require("./traverse");
var recast   = require("recast");
var path     = require("path");
var fs       = require("fs");
var _        = require("lodash");
var b        = require("ast-types").builders;

exports.ensureBlock = function (node) {
  var block = node.body;
  if (block.type === "BlockStatement") return;

  node.body = [node.body];
};

exports.isPattern = function (node) {
  return node.type === "ArrayPattern" || node.type === "ObjectPattern";
};

exports.formatJSON = function (obj) {
  return JSON.stringify(obj, null, "  ");
};

exports.isAbsolute = function (loc) {
  if (!loc) return false;
  if (loc[0] === "/") return true; // unix
  if (loc[1] === ":" && loc[2] === "\\") return true; // windows
  return false;
};

exports.removeProperties = function (tree) {
  var clear = function (node) {
    delete node.tokens;
    delete node.range;
    delete node.loc;
  };

  clear(tree);
  traverse(tree, clear);

  return tree;
};

exports.errorWithNode = function (node, msg) {
  var line = node.loc.start.line;
  var col  = node.loc.start.column;

  var err = new SyntaxError("Line " + line + ": " + msg);
  err.lineNumber = line;
  err.column = col;
  return err;
};

exports.camelCase = function (value) {
  return value.replace(/[-_\s]+(.)?/g, function (match, c) {
    return c ? c.toUpperCase() : "";
  });
};

exports.canCompile = function (filename) {
  var ext = path.extname(filename);
  return ext === ".js" || ext === ".es6";
};

exports.buildUidGenerator = function () {
  var ids = {};

  return function (name) {
    var i = ids[name] || 1;

    var id = "_" + name;
    if (i > 1) id += i;
    ids[name] = i + 1;
    return id;
  };
};

exports.sourceMapToComment = function (map) {
  var json = JSON.stringify(map);
  var base64 = new Buffer(json).toString("base64");
  return "//# sourceMappingURL=data:application/json;base64," + base64;
};

exports.pushMutatorMap = function (mutatorMap, key, kind, method) {
  var map = mutatorMap[key] = mutatorMap[key] || {};
  if (map[kind]) {
    throw new Error("a " + kind + " already exists for this property");
  } else {
    map[kind] = method;
  }
};

exports.buildDefineProperties = function (mutatorMap, keyNode) {
  var objExpr = b.objectExpression([]);

  _.each(mutatorMap, function (map, key) {
    var mapNode = b.objectExpression([]);

    var propNode = b.property("init", b.identifier(key), mapNode);

    _.each(map, function (methodNode, type) {
      methodNode = _.clone(methodNode);
      if (methodNode.type === "MethodDefinition") methodNode = methodNode.value;
      mapNode.properties.push(b.property("init", b.identifier(type), methodNode));
    });

    objExpr.properties.push(propNode);
  });

  return exports.template("object-define-properties", {
    OBJECT: keyNode,
    PROPS: objExpr
  }, true);
};

exports.template = function (name, nodes, keepExpression) {
  var template = exports.templates[name];
  if (!template) throw new ReferenceError("unknown template " + name);

  template = _.cloneDeep(template);

  if (!_.isEmpty(nodes)) {
    traverse(template, function (node) {
      if (node.type === "Identifier" && _.has(nodes, node.name)) {
        var newNode = nodes[node.name];
        if (_.isString(newNode)) {
          node.name = newNode;
        } else {
          return newNode;
        }
      }
    });
  }

  var node = template.body[0];

  if (!keepExpression && node.type === "ExpressionStatement") {
    return node.expression;
  } else {
    return node;
  }
};

exports.codeFrame = function (lines, lineNumber, colNumber) {
  colNumber = Math.max(colNumber, 0);

  lines = lines.split("\n");
  var start = Math.max(lineNumber - 3, 0);
  var end   = Math.min(lines.length, lineNumber + 3);
  var width = (end + "").length;

  return "\n" + lines.slice(start, end).map(function (line, i) {
    var curr = i + start + 1;

    var gutter = curr === lineNumber ? "> " : "  ";

    var sep = curr + exports.repeat(width + 1);
    gutter += sep + "| ";

    var str = gutter + line;

    if (colNumber && curr === lineNumber) {
      str += "\n";
      str += exports.repeat(gutter.length - 2);
      str += "|" + exports.repeat(colNumber) + "^";
    }

    return str;
  }).join("\n");
};

exports.repeat = function (width, cha) {
  cha = cha || " ";
  return new Array(width + 1).join(cha);
};

exports.generate = function (ast, opts) {
  var printOpts = {};
  if (opts.sourceMap) {
    printOpts.sourceMapName = path.basename(opts.filename);
  }

  return recast.print(ast, printOpts);
};

exports.parse = function (filename, code, callback) {
  try {
    var ast = recast.parse(code, {
      sourceFileName: path.basename(filename)
    });

    if (callback) {
      return callback(ast);
    } else {
      return ast;
    }
  } catch (err) {
    if (!err._6to5) {
      err._6to5 = true;
      err.message = filename + ": " + err.message;
      if (err.lineNumber) {
        var frame = exports.codeFrame(code, err.lineNumber, err.column);
        err.message = err.message + frame;
      }
    }
    throw err;
  }
};

try {
  exports.templates = require("../../templates.json");
} catch (err) {
  if (err.code !== "MODULE_NOT_FOUND") throw err;

  exports.templates = {};

  var templatesLoc = __dirname + "/templates";
  if (!fs.existsSync(templatesLoc)) {
    throw new Error("no templates directory - this is most likely the result" +
                    " of a broken `npm publish`. Please report to " +
                    "https://github.com/sebmck/6to5/issues");
  }

  _.each(fs.readdirSync(templatesLoc), function (name) {
    var key  = path.basename(name, path.extname(name));
    var loc  = templatesLoc + "/" + name;
    var code = fs.readFileSync(loc, "utf8");

    exports.templates[key] = exports.removeProperties(exports.parse(loc, code).program);
  });
}
