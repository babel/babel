var estraverse = require("estraverse");
var traverse   = require("./traverse");
var esprima    = require("esprima");
var path       = require("path");
var fs         = require("fs");
var _          = require("lodash");

_.each(esprima.Syntax, function (name) {
  estraverse.VisitorKeys[name] = estraverse.VisitorKeys[name] || [];
});

exports.parse = function (code, opts) {
  opts = _.defaults(opts || {}, {
    comment: true,
    tokens:  true,
    range:   true,
    loc:     true
  });

  code = [].concat(code).join("");

  try {
    var tree = esprima.parse(code, opts);

    if (tree.tokens && tree.comments) {
      estraverse.attachComments(tree, tree.comments, tree.tokens);
    }

    return tree;
  } catch (err) {
    if (err.lineNumber) {
      err.message = err.message + exports.codeFrame(code, err.lineNumber, err.column);
    }
    throw err;
  }
};

exports.canCompile = function (filename) {
  return path.extname(filename) === ".js";
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
  var objExpr = {
    type: "ObjectExpression",
    properties: []
  };

  _.each(mutatorMap, function (map, key) {
    var mapNode = {
      type: "ObjectExpression",
      properties: []
    };

    var propNode = {
      type: "Property",
      key: {
        type: "Identifier",
        name: key
      },
      value: mapNode,
      kind: "init"
    };

    _.each(map, function (methodNode, type) {
      if (methodNode.type === "MethodDefinition") methodNode = methodNode.value;
      mapNode.properties.push({
        type: "Property",
        key: {
          type: "Identifier",
          name: type
        },
        value: methodNode,
        kind: "init"
      });
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
  return Array(width + 1).join(cha);
};

var templatesCacheLoc = __dirname + "/../../templates.json";

if (fs.existsSync(templatesCacheLoc)) {
  exports.templates = require(templatesCacheLoc);
} else {
  exports.templates = {};

  var templatesLoc = __dirname + "/templates";

  _.each(fs.readdirSync(templatesLoc), function (name) {
    var key = path.basename(name, path.extname(name));

    var code = fs.readFileSync(templatesLoc + "/" + name, "utf8");
    exports.templates[key] = exports.parse(code, {
      comment: false,
      tokens:  false,
      range:   false,
      loc:     false
    });
  });
}
