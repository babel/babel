import { types as t } from "@babel/core";

export default function() {
  return {
    pre(file) {
      file.set("helpersNamespace", t.identifier("babelHelpers"));
    },
  };
}
