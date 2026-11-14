import { declare } from "@babel/helper-plugin-utils";
import { types as t } from "@babel/core";

function getName(
  key: t.Identifier | t.StringLiteral | t.NumericLiteral | t.BigIntLiteral,
) {
  if (t.isIdentifier(key)) {
    return key.name;
  }
  return key.value.toString();
}

function isProtoSetter(prop: t.ObjectMethod | t.ObjectProperty) {
  return (
    t.isObjectProperty(prop) &&
    !prop.computed &&
    !prop.shorthand &&
    getName(prop.key as t.Identifier | t.StringLiteral) === "__proto__"
  );
}

export default declare(api => {
  api.assertVersion(REQUIRED_VERSION("^7.0.0-0 || ^8.0.0"));

  return {
    name: "transform-duplicate-keys",

    visitor: {
      ObjectExpression(path) {
        const { node } = path;
        const plainProps = node.properties.filter(
          prop => !t.isSpreadElement(prop) && !prop.computed,
        ) as (t.ObjectMethod | t.ObjectProperty)[];

        // A property is a duplicate key if:
        // * the property is a data property, and is preceded by a data,
        //   getter, or setter property of the same name.
        // * the property is a getter property, and is preceded by a data or
        //   getter property of the same name.
        // * the property is a setter property, and is preceded by a data or
        //   setter property of the same name.

        const alreadySeenData = Object.create(null);
        const alreadySeenGetters = Object.create(null);
        const alreadySeenSetters = Object.create(null);

        for (const prop of plainProps) {
          // `__proto__: value` sets the prototype instead of defining a
          // property, so it is never a duplicate of the properties named
          // "__proto__". Making it computed would define a property.
          if (isProtoSetter(prop)) continue;

          const name = getName(
            // prop must be non-computed
            prop.key as
              | t.Identifier
              | t.StringLiteral
              | t.NumericLiteral
              | t.BigIntLiteral,
          );
          let isDuplicate = false;
          // @ts-expect-error prop.kind is not defined in ObjectProperty
          switch (prop.kind) {
            case "get":
              if (alreadySeenData[name] || alreadySeenGetters[name]) {
                isDuplicate = true;
              }
              alreadySeenGetters[name] = true;
              break;
            case "set":
              if (alreadySeenData[name] || alreadySeenSetters[name]) {
                isDuplicate = true;
              }
              alreadySeenSetters[name] = true;
              break;
            default:
              if (
                alreadySeenData[name] ||
                alreadySeenGetters[name] ||
                alreadySeenSetters[name]
              ) {
                isDuplicate = true;
              }
              alreadySeenData[name] = true;
          }

          if (isDuplicate) {
            // Rely on the computed properties transform to split the property
            // assignment out of the object literal.
            prop.computed = true;
            prop.key = t.stringLiteral(name);
          }
        }
      },
    },
  };
});
