"use strict";

module.exports = transform;

var normalizeAst = require("../helpers/normalize-ast");
var Transformer  = require("./transformer");
var object       = require("../helpers/object");
var File         = require("./file");
var util         = require("../util");
var each         = require("lodash/collection/each");

function transform(code, opts) {
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
    if (deprecatedKey) {
      // deprecated key, remap it to the new one
      console.error(
        "The transformer " + key + " has been renamed to " + deprecatedKey +
        " in v3.0.0 - backwards compatibilty will be removed 4.0.0"
      );
      rawKeys.push(deprecatedKey);
    } else if (transform.transformers[key]) {
      // valid key
      keys.push(key);
    } else if (transform.namespaces[key]) {
      // namespace, append all transformers within this namespace
      keys = keys.concat(transform.namespaces[key]);
    } else {
      // invalid key
      throw new ReferenceError(
        "Unknown transformer " + key + " specified in " + type + " - " +
        "transformer key names have been changed in 3.0.0 see " +
        "the changelog for more info " +
        "https://github.com/6to5/6to5/blob/master/CHANGELOG.md#300"
      );
    }
  }

  return keys;
};

transform.transformers = object();
transform.namespaces   = object();

transform.deprecatedTransformerMap = require("./transformers/deprecated");
transform.moduleFormatters = require("./modules");

var rawTransformers = require("./transformers");

each(rawTransformers, function (transformer, key) {
  var namespace = key.split(".")[0];
  transform.namespaces[namespace] = transform.namespaces[namespace] || [];
  transform.namespaces[namespace].push(key);

  transform.transformers[key] = new Transformer(key, transformer);
});
