"use strict";

module.exports = Transformer;

var TransformerPass = require("./transformer-pass");
var isFunction      = require("lodash/lang/isFunction");
var traverse        = require("../traversal");
var isObject        = require("lodash/lang/isObject");
var assign          = require("lodash/object/assign");
var each            = require("lodash/collection/each");

/**
 * This is the class responsible for normalising a transformers handlers
 * as well as constructing a `TransformerPass` that is repsonsible for
 * actually running the transformer over the provided `File`.
 */

function Transformer(key, transformer, opts) {
  transformer = assign({}, transformer);

  var take = function (key) {
    var val = transformer[key];
    delete transformer[key];
    return val;
  };

  this.manipulateOptions = take("manipulateOptions");
  this.check             = take("check");
  this.post              = take("post");
  this.pre               = take("pre");

  this.experimental = !!take("experimental");
  this.playground   = !!take("playground");
  this.secondPass   = !!take("secondPass");
  this.optional     = !!take("optional");

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

    if (type === "enter" || type === "exit") return;

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
