export default function ({ types: t }) {
  function wrapInFlowComment(path, parent) {
    path.addComment("trailing", generateComment(path, parent));
    path.replaceWith(t.noop());
  }

  function generateComment(path, parent) {
    let comment = path.getSource().replace(/\*-\//g, "*-ESCAPED/").replace(/\*\//g, "*-/");
    if (parent && parent.optional) comment = "?" + comment;
    if (comment[0] !== ":") comment = ":: " + comment;
    return comment;
  }

  function locToSource(path, {start, end}){
    const pathStart = start - path.node.start;
    const pathEnd = pathStart + (end - start);

    return path.getSource().slice(pathStart, pathEnd);
  }

  function bodyParser(path){
    return function(node){
      if (node.type === "ClassMethod"){
        let retVal = (node.static ? "static " : "") + locToSource(path, node.key) + "(";
        retVal += node.params.map(locToSource.bind(null, path)).join(", ") + ")";
        if (node.returnType){
          retVal += locToSource(path, node.returnType);
        } else {
          retVal += ": any";
        }
        return retVal + ";";
      }
      if (node.type === "ClassProperty"){
        let retVal = (node.static ? "static " : "") + locToSource(path, node.key);
        if (node.typeAnnotation){
          retVal += locToSource(path, node.typeAnnotation);
        } else {
          retVal += ": any";
        }
        return retVal + ";";
      }
      return null;
    }
  }

  function classDeclaration(path){
    const {node} = path;
    //node.typeParameters
    let retVal = `declare class ${node.id.name}`;

    const hasParams = node.typeParameters && node.typeParameters.params && node.typeParameters.params.length;
    if (hasParams) {
      retVal += locToSource(path, node.typeParameters);
    }
    if (node.superClass) {
      retVal += ` extends ${locToSource(path, node.superClass)}`;
    }
    if (node.superClass && node.superTypeParameters) {
      retVal += locToSource(path, node.superTypeParameters);
    }
    retVal += " {";
    if (node.body && node.body.type === "ClassBody"){
      retVal += "\n" + node.body.body.map(bodyParser(path)).filter(Boolean).map(str => "  " + str).join("\n") + "\n";
    }
    return retVal + "}";
  }

  return {
    //inherits: require("babel-plugin-syntax-flow"),

    visitor: {
      // currently only supports named class declarations that are not being exported.
      ClassDeclaration(path){
        console.log(t.variableDeclarator);
        path.addComment("leading", "::\n" + classDeclaration(path).split("\n").map(str => "  " + str).join("\n") + "\n");
        const origName = path.node.id.name;
        path.node.id.name += "__orig";
        let constName = t.Identifier(origName);
    constName.trailingComments = [{value: `: Class<${origName}>`}];
        path.insertAfter([t.VariableDeclaration("const", [
          t.VariableDeclarator(constName, t.Identifier(origName + "__orig"))
        ])]);
      },

      TypeCastExpression(path) {
        const { node } = path;
        path.get("expression").addComment("trailing", generateComment(path.get("typeAnnotation")));
        path.replaceWith(t.parenthesizedExpression(node.expression));
      },

      // support function a(b?) {}
      Identifier(path) {
        const { node } = path;
        if (!node.optional || node.typeAnnotation) {
          return;
        }
        path.addComment("trailing", ":: ?");
      },

      AssignmentPattern: {
        exit({ node }) {
          node.left.optional = false;
        }
      },

      // strip optional property from function params - facebook/fbjs#17
      Function: {
        exit({ node }) {
          node.params.forEach((param) => param.optional = false);
        }
      },

      // support for `class X { foo: string }` - #4622
      ClassProperty(path) {
        const { node, parent } = path;
        if (!node.value) wrapInFlowComment(path, parent);
      },

      // support `export type a = {}` - #8 Error: You passed path.replaceWith() a falsy node
      "ExportNamedDeclaration|Flow"(path) {
        const { node, parent } = path;
        if (t.isExportNamedDeclaration(node) && !t.isFlow(node.declaration)) {
          return;
        }
        wrapInFlowComment(path, parent);
      },

      // support `import type A` and `import typeof A` #10
      ImportDeclaration(path) {
        const { node, parent } = path;
        if (t.isImportDeclaration(node) && node.importKind !== "type" && node.importKind !== "typeof") {
          return;
        }
        wrapInFlowComment(path, parent);
      }
    }
  };
}
