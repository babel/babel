import { es3, es2017 } from "./reserved-words";

export default function() {
  const reservedKeywords = es3.filter(w => !(es2017.indexOf(w) !== -1));

  return {
    visitor: {
      "BindingIdentifier|ReferencedIdentifier"(path) {
        if (reservedKeywords.includes(path.node.name)) {
          path.scope.rename(path.node.name);
        }
      },
    },
  };
}
