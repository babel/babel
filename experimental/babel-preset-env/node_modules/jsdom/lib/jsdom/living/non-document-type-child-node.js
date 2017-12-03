"use strict";

const defineGetter = require("../utils").defineGetter;
const domSymbolTree = require("./helpers/internal-constants").domSymbolTree;
const NODE_TYPE = require("./node-type");

module.exports = function (core) {
  // https://dom.spec.whatwg.org/#nondocumenttypechildnode

  for (const Constructor of [core.Element, core.CharacterData]) {
    defineGetter(Constructor.prototype, "nextElementSibling", function () {
      for (const sibling of domSymbolTree.nextSiblingsIterator(this)) {
        if (sibling.nodeType === NODE_TYPE.ELEMENT_NODE) {
          return sibling;
        }
      }
      return null;
    });

    defineGetter(Constructor.prototype, "previousElementSibling", function () {
      for (const sibling of domSymbolTree.previousSiblingsIterator(this)) {
        if (sibling.nodeType === NODE_TYPE.ELEMENT_NODE) {
          return sibling;
        }
      }
      return null;
    });
  }
};
