let found = false;
module.exports = function() {
  return {
    visitor: {
      VariableDeclarator(path){
        if(!found && path.toString() === "a = 33"){
          found = true;
           path.remove();
          return;
        } else if(path.toString() === "a = 42") {
          const binding = path.scope.getBinding("a");
          binding.path.parentPath.replaceWith({
            type: "ExpressionStatement",
            expression: {
              type: "NumericLiteral",
              value: 42
            }
          });
        }
      }
    }
  };
}
