var estraverse = require("estraverse");
var escodegen  = require("escodegen");
var traverse   = require("./traverse");
var esprima    = require("esprima");
var path       = require("path");
var fs         = require("fs");
var _          = require("lodash");
var b          = require("ast-types").builders;

_.each(esprima.Syntax, function (name) {
  estraverse.VisitorKeys[name] = estraverse.VisitorKeys[name] || [];
});

exports.parse = function (filename, code, callback) {
  try {
    var ast = esprima.parse(code, {
      comment: true,
      source:  filename,
      tokens:  true,
      range:   true,
      loc:     true
    });

    estraverse.attachComments(ast, ast.comments, ast.tokens);

    if (callback) {
      return callback(ast);
    } else {
      return ast;
    }
  } catch (err) {
    err.message = filename + ": " + err.message;
    if (err.lineNumber) {
      var frame = exports.codeFrame(code, err.lineNumber, err.column);
      err.message = err.message + frame;
    }
    throw err;
  }
};

exports.generate = function (ast, opts) {
  opts = opts || {};

  opts = _.merge({
    comment: true,
    format: {
      indent: {
        style: "  "
      }
    }
  }, opts);

  return escodegen.generate(ast, opts);
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

exports.canCompile = function (filename) {
  var ext = path.extname(filename);
  return ext === ".js" || ext === ".es6";
};

exports.buildUidGenerator = function () {
  var ids = {};

  return function (name) {
    var i = ids[name] || 0;

    var id = "_" + name;
    if (i > 0) id += i;
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
  var template = _.cloneDeep(exports.templates[name]);

  if (!_.isEmpty(nodes)) {
    traverse.replace(template, function (node) {
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

  var normaliseNode = function (node) {
    if (!keepExpression && node.type === "ExpressionStatement") {
      return node.expression;
    } else {
      return node;
    }
  };

  var body = template.body;

  if (body.length <= 1) {
    return normaliseNode(body[0]);
  } else {
    return body.map(normaliseNode);
  }
};

exports.codeFrame = function (lines, lineNumber, colNumber) {
  if (!lineNumber) return "";

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

var templatesCacheLoc = __dirname + "/../../templates.json";

if (fs.existsSync(templatesCacheLoc)) {
  exports.templates = require(templatesCacheLoc);
} else {
  exports.templates = {};

  var templatesLoc = __dirname + "/templates";

  _.each(fs.readdirSync(templatesLoc), function (name) {
    var key  = path.basename(name, path.extname(name));
    var loc  = templatesLoc + "/" + name;
    var code = fs.readFileSync(loc, "utf8");

    exports.templates[key] = exports.removeProperties(exports.parse(loc, code));
  });
}
