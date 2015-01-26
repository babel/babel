"use strict";

module.exports = Transformer;

var TransformerPass = require("./transformer-pass");
var traverse        = require("../traverse");
var t               = require("../types");
var _               = require("lodash");

/**
 * This is the class responsible for normalising a transformers handlers
 * as well as constructing a `TransformerPass` that is repsonsible for
 * actually running the transformer over the provided `File`.
 */

function Transformer(key, transformer, opts) {
  this.manipulateOptions = transformer.manipulateOptions;
  this.experimental      = !!transformer.experimental;
  this.secondPass        = !!transformer.secondPass;
  this.optional          = !!transformer.optional;
  this.handlers          = this.normalise(transformer);
  this.opts              = opts || {};
  this.key               = key;
}

Transformer.prototype.normalise = function (transformer) {
  var self = this;

  if (_.isFunction(transformer)) {
    transformer = { ast: transformer };
  }

  _.each(transformer, function (fns, type) {
    // hidden property
    if (type[0] === "_") {
      self[type] = fns;
      return;
    }

    if (_.isFunction(fns)) fns = { enter: fns };

    if (!_.isObject(fns)) return;

    if (!fns.enter) fns.enter = _.noop;
    if (!fns.exit) fns.exit = _.noop;

    transformer[type] = fns;

    var aliases = t.FLIPPED_ALIAS_KEYS[type];
    if (aliases) {
      _.each(aliases, function (alias) {
        transformer[alias] = fns;
      });
    }
  });

  return transformer;
};

Transformer.prototype.buildPass = function (file) {
  return new TransformerPass(file, this);
};
