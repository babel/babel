var traverse = require("../../traverse");
var t        = require("../../types");

exports.optional = true;

exports.Loop =
exports.Program =
exports.BlockStatement = function (node, parent, scope, context, file) {
  var letRefs = node._letReferences;
  if (!letRefs) return;

  var state = {
    letRefs: letRefs,
    file: file
  };

  traverse(node, {
    enter: function (node, parent, scope, context, state) {
      if (!t.isReferencedIdentifier(node, parent)) return;

      var declared = state.letRefs[node.name];
      if (!declared) return;

      // declared node is different in this scope
      if (scope.get(node.name, true) !== declared) return;

      var declaredLoc  = declared.loc;
      var referenceLoc = node.loc;

      if (!declaredLoc || !referenceLoc) return;

      // does this reference appear on a line before the declaration?
      var before = referenceLoc.start.line < declaredLoc.start.line;

      if (referenceLoc.start.line === declaredLoc.start.line) {
        // this reference appears on the same line
        // check it appears before the declaration
        before = referenceLoc.start.col < declaredLoc.start.col;
      }

      if (before) {
        throw state.file.errorWithNode(node, "Temporal dead zone - accessing a variable before it's initialized");
      }
    }
  }, scope, state);
};
