import { es3, es2017 } from "./reserved-words";

const difference = (arr, arr2) => arr.filter(el => !(arr2.indexOf(el) !== -1));
const reservedKeywords = difference(es3, es2017);

export default function() {
  return {
    visitor: {
      "BindingIdentifier|ReferencedIdentifier"(path) {
        if (reservedKeywords.indexOf(path.node.name) !== -1) {
          path.scope.rename(path.node.name);
        }
      },
    },
  };
}
