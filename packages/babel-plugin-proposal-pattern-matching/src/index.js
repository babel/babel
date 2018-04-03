import syntaxPatternMatching from "@babel/plugin-syntax-pattern-matching";
// import { template } from "@babel/core";

export default function({ types: t }) {
  let traversePath;

  function generatePattyCakeArgument(pattern) {
    function generateObjectPattyCake(pattern) {
      const properties = pattern.children.map(item => {
        const value = item.value
          ? generatePattyCakeArgument(item.value)
          : t.identifier("$");

        return t.objectProperty(item.key, value);
      });

      if (pattern.restProperty) {
        properties.push(
          t.objectProperty(
            pattern.restProperty,
            t.memberExpression(t.identifier("$"), t.identifier("rest")),
          ),
        );
      }

      return t.objectExpression(properties);
    }

    function generateArrayPattyCake(pattern) {
      const children = pattern.children.map(child =>
        generatePattyCakeArgument(child),
      );

      if (pattern.hasRest) {
        children.push(
          t.memberExpression(t.identifier("$"), t.identifier("rest")),
        );
      }

      return t.arrayExpression(children);
    }

    switch (pattern.type) {
      case "ObjectMatchPattern":
        return generateObjectPattyCake(pattern);
      case "ArrayMatchPattern":
        return generateArrayPattyCake(pattern);
      case "Identifier":
      case "NullLiteral":
      case "BooleanLiteral":
      case "NumericLiteral":
      case "StringLiteral":
      case "RegExpLiteral":
        return pattern;
    }
  }

  function generateConsiceBodyArrowFunction(clause) {
    function extractArgument(pattern) {
      function extractObjectArgument(pattern) {
        const children = pattern.children.map(item => {
          let value = item.key;

          if (item.value) {
            switch (item.value.type) {
              case "ObjectMatchPattern":
                value = extractObjectArgument(item.value);
                break;
              case "ArrayMatchPattern":
                value = extractArgument(item.value)[0];
                break;
            }
          }

          return t.objectProperty(item.key, value);
        });

        if (pattern.restProperty) {
          children.push(t.restElement(pattern.restProperty));
        }

        return t.objectPattern(children);
      }

      function extractArrayArgument(pattern) {
        const children = pattern.children.map(item => {
          switch (item.type) {
            case "ObjectMatchPattern":
              return extractObjectArgument(item);
            case "ArrayMatchPattern":
              return extractArrayArgument(item);
            case "Identifier":
              return item;
            case "NullLiteral":
            case "BooleanLiteral":
            case "NumericLiteral":
            case "StringLiteral":
            case "RegExpLiteral":
              return traversePath.scope.generateUidIdentifier("_");
          }
        });

        if (pattern.hasRest && pattern.restElement !== null) {
          children.push(pattern.restElement);
        }

        return t.arrayPattern(children);
      }

      switch (pattern.type) {
        case "ObjectMatchPattern":
          return [extractObjectArgument(pattern)];
        case "ArrayMatchPattern":
          return [extractArrayArgument(pattern)];
        case "Identifier":
          return [pattern];
        case "NullLiteral":
        case "BooleanLiteral":
        case "NumericLiteral":
        case "StringLiteral":
        case "RegExpLiteral":
          return [];
        default:
          throw new TypeError(pattern.type);
      }
    }

    return t.arrowFunctionExpression(
      extractArgument(clause.pattern),
      clause.body,
      false,
    );
  }

  return {
    inherits: syntaxPatternMatching,

    visitor: {
      MatchExpression(path) {
        const node = path.node;
        traversePath = path;

        const args = [];
        node.clauses.forEach(clause => {
          args.push(generatePattyCakeArgument(clause.pattern));
          args.push(generateConsiceBodyArrowFunction(clause));
        });
        path.replaceWith(
          t.callExpression(t.identifier("match"), [node.expression, ...args]),
        );
      },
    },
  };
}
