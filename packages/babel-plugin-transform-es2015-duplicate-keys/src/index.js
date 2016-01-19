import * as t from "babel-types";

function getName(key) {
  if (t.isIdentifier(key)) {
    return key.name;
  }
  return key.value.toString();
}

export default function() {
  return {
    visitor: {
      ObjectExpression(path) {
        const { node } = path;
        const plainProps = node.properties.filter(prop => !t.isSpreadProperty(prop) && !prop.computed);

        const alreadySeenNames = Object.create(null);

        for (let prop of plainProps) {
          const name = getName(prop.key);
          if (!alreadySeenNames[name]) {
            alreadySeenNames[name] = true;
          } else {
            // Rely on the computed properties transform to split the property
            // assignment out of the object literal.
            prop.computed = true;
            prop.key = t.stringLiteral(name);
          }
        }
      }
    }
  };
}
