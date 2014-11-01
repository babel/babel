var estraverse = require("estraverse");
var traverse   = require("./traverse");
var acorn      = require("acorn-6to5");
var path       = require("path");
var util       = require("util");
var fs         = require("fs");
var b          = require("./builders");
var _          = require("lodash");

_.extend(estraverse.VisitorKeys, traverse.VISITOR_KEYS);

exports.inherits = util.inherits;

exports.resolve = function (loc) {
  try {
    return require.resolve(loc);
  } catch (err) {
    return null;
  }
};

exports.list = function (val) {
  return val ? val.split(",") : [];
};

exports.getUid = function (parent, file) {
  var node;

  if (parent.type === "AssignmentExpression") {
    node = parent.left;
  } else if (parent.type === "VariableDeclarator") {
    node = parent.id;
  }

  var id = "ref";

  if (node && node.type === "Identifier") {
    id = node.name;
  }

  return b.identifier(file.generateUid(id));
};

exports.isAbsolute = function (loc) {
  if (!loc) return false;
  if (loc[0] === "/") return true; // unix
  if (loc[1] === ":" && loc[2] === "\\") return true; // windows
  return false;
};

exports.getIds = function (node) {
  var search = [node];
  var ids  = [];

  while (search.length) {
    var id = search.shift();

    if (id.type === "Identifier") {
      ids.push(id.name);
    } else if (id.type === "ArrayPattern") {
      _.each(id.elements, function (elem) {
        search.push(elem);
      });
    } else if (id.type === "ObjectPattern") {
      _.each(id.properties, function (prop) {
        search.push(prop.value);
      });
    } else {
      throw new Error("unknown node " + id.type);
    }
  }

  return ids;
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
  return _.contains([".js", ".es6"], ext);
};

exports.sourceMapToComment = function (map) {
  var json = JSON.stringify(map);
  var base64 = new Buffer(json).toString("base64");
  return "//# sourceMappingURL=data:application/json;base64," + base64;
};

exports.pushMutatorMap = function (mutatorMap, key, kind, method) {
  var map;
  if (_.has(mutatorMap, key)) {
    map = mutatorMap[key];
  } else {
    map = {};
  }
  mutatorMap[key] = map;

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

    _.each(map, function (node, key) {
      node = _.clone(node);
      if (node.type === "MethodDefinition") node = node.value;
      mapNode.properties.push(b.property("init", b.identifier(key), node));
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

  if (!lineNumber && !colNumber) {
    start = 0;
    end = lines.length;
  }

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

exports.parse = function (opts, code, callback) {
  try {
    var recastOpts = {};

    if (opts.sourceMap) {
      recastOpts.sourceFileName = opts.sourceFileName;
      recastOpts.sourceRoot     = opts.sourceRoot;
    }

    var comments = [];
    var tokens   = [];

    var ast = acorn.parse(code, {
      ecmaVersion: Infinity,
      onComment:   comments,
      locations:   true,
      onToken:     tokens,
      ranges:      true
    });

    estraverse.attachComments(ast, comments, tokens);

    ast = {
      type: "File",
      program: ast
    };

    ast.comments = comments;
    ast.tokens   = tokens;

    if (callback) {
      return callback(ast);
    } else {
      return ast;
    }
  } catch (err) {
    if (!err._6to5) {
      err._6to5 = true;
      var message = opts.filename + ": " + err.message;

      if (err.loc) {
        var frame = exports.codeFrame(code, err.loc.line, err.loc.column);
        message += frame;
      }

      if (err.stack) err.stack = err.stack.replace(err.message, message);
      err.message = message;
    }

    throw err;
  }
};

exports.parseNoProperties = function (loc, code) {
  var ast = exports.parse({ filename: loc }, code).program;
  return traverse.removeProperties(ast);
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
    if (name[0] === ".") return;

    var key  = path.basename(name, path.extname(name));
    var loc  = templatesLoc + "/" + name;
    var code = fs.readFileSync(loc, "utf8");

    exports.templates[key] = exports.parseNoProperties(loc, code);
  });
}
