import SYNTAX_KEYS from "./syntax-keys";
import traverse from "../traversal";

var visitors  = traverse.explode(require("./visitors"));

export default function (ast) {
  var stats = {
    syntax: {},
    builtins: {}
  };

  var detectedSyntax = function (name) {
    stats.syntax[name] = true;
  };

  traverse(ast, {
    enter(node, parent) {
      if (SYNTAX_KEYS[node.type]) {
        detectedSyntax(SYNTAX_KEYS[node.type]);
      }

      var visitor = visitors[node.type];
      if (visitor) visitor(node, parent, detectedSyntax);
    }
  });

  return stats;
};
