import normalizeAst from "../helpers/normalize-ast";
import Transformer from "./transformer";
import object from "../helpers/object";
import File from "./file";
import each from "lodash/collection/each";

export default function transform(code, opts) {
  var file = new File(opts);
  return file.parse(code);
}

transform.fromAst = function (ast, code, opts) {
  ast = normalizeAst(ast);

  var file = new File(opts);
  file.addCode(code);
  file.transform(ast);
  return file.generate();
};

transform._ensureTransformerNames = function (type, rawKeys) {
  var keys = [];

  for (var i = 0; i < rawKeys.length; i++) {
    var key = rawKeys[i];

    var deprecatedKey = transform.deprecatedTransformerMap[key];
    var aliasKey = transform.aliasTransformerMap[key];
    if (aliasKey) {
      keys.push(aliasKey);
    } else if (deprecatedKey) {
      // deprecated key, remap it to the new one
      console.error("The transformer " + key + " has been renamed to " + deprecatedKey);
      rawKeys.push(deprecatedKey);
    } else if (transform.transformers[key]) {
      // valid key
      keys.push(key);
    } else if (transform.namespaces[key]) {
      // namespace, append all transformers within this namespace
      keys = keys.concat(transform.namespaces[key]);
    } else {
      // invalid key
      throw new ReferenceError("Unknown transformer " + key + " specified in " + type);
    }
  }

  return keys;
};

transform.transformerNamespaces = object();
transform.transformers          = object();
transform.namespaces            = object();

transform.deprecatedTransformerMap = require("./transformers/deprecated");
transform.aliasTransformerMap = require("./transformers/aliases");
transform.moduleFormatters = require("./modules");

import rawTransformers from "./transformers";

each(rawTransformers, function (transformer, key) {
  var namespace = key.split(".")[0];

  transform.namespaces[namespace] ||= [];
  transform.namespaces[namespace].push(key);
  transform.transformerNamespaces[key] = namespace;

  transform.transformers[key] = new Transformer(key, transformer);
});
