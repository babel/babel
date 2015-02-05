"use strict";

module.exports = Transformer;

var TransformerPass = require("./transformer-pass");
var isFunction      = require("lodash/lang/isFunction");
var traverse        = require("../traversal");
var isObject        = require("lodash/lang/isObject");
var each            = require("lodash/collection/each");

/**
 * This is the class responsible for normalising a transformers handlers
 * as well as constructing a `TransformerPass` that is repsonsible for
 * actually running the transformer over the provided `File`.
 */

function Transformer(key, transformer, opts) {
  this.manipulateOptions = transformer.manipulateOptions;
  this.check             = transformer.check;

  this.experimental = !!transformer.experimental;
  this.playground   = !!transformer.playground;
  this.secondPass   = !!transformer.secondPass;
  this.optional     = !!transformer.optional;

  this.handlers = this.normalize(transformer);
  this.opts     = opts || {};
  this.key      = key;
}

Transformer.prototype.normalize = function (transformer) {
  var self = this;

  if (isFunction(transformer)) {
    transformer = { ast: transformer };
  }

  traverse.explode(transformer);

  each(transformer, function (fns, type) {
    // hidden property
    if (type[0] === "_") {
      self[type] = fns;
      return;
    }

    if (isFunction(fns)) fns = { enter: fns };

    if (!isObject(fns)) return;

    if (!fns.enter) fns.enter = function () { };
    if (!fns.exit) fns.exit = function () { };

    transformer[type] = fns;
  });

  return transformer;
};

Transformer.prototype.buildPass = function (file) {
  return new TransformerPass(file, this);
};
