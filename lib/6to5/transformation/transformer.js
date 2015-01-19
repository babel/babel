"use strict";

module.exports = Transformer;

var traverse = require("../traverse");
var t        = require("../types");
var _        = require("lodash");

function noop() { }

function enter(node, parent, scope, context, args) {
  var fns = args[1][node.type];
  if (!fns) return;
  return fns.enter(node, parent, scope, context, args[0]);
}

function exit(node, parent, scope, context, args) {
  var fns = args[1][node.type];
  if (!fns) return;
  return fns.exit(node, parent, scope, context, args[0]);
}

var traverseOpts = {
  enter: enter,
  exit: exit
};

function Transformer(key, transformer, opts) {
  this.manipulateOptions = transformer.manipulateOptions;
  this.experimental      = !!transformer.experimental;
  this.secondPass        = !!transformer.secondPass;
  this.transformer       = this.normalise(transformer);
  this.optional          = !!transformer.optional;
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

    if (!fns.enter) fns.enter = noop;
    if (!fns.exit) fns.exit = noop;

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

Transformer.prototype.astRun = function (file, key) {
  var transformer = this.transformer;

  if (transformer.ast && transformer.ast[key]) {
    transformer.ast[key](file.ast, file);
  }
};

Transformer.prototype.transform = function (file) {
  this.astRun(file, "before");
  traverse(file.ast, traverseOpts, null, [file, this.transformer]);
  this.astRun(file, "after");
};

Transformer.prototype.canRun = function (file) {
  var opts = file.opts;
  var key  = this.key;
  if (key[0] === "_") return true;

  var blacklist = opts.blacklist;
  if (blacklist.length && _.contains(blacklist, key)) return false;

  var whitelist = opts.whitelist;
  if (whitelist.length && !_.contains(whitelist, key)) return false;

  if (this.optional && !_.contains(opts.optional, key)) return false;

  if (this.experimental && !opts.experimental) return false;

  return true;
};
