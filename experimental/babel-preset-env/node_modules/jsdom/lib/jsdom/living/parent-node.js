"use strict";
const defineGetter = require("../utils").defineGetter;
const domSymbolTree = require("./helpers/internal-constants").domSymbolTree;
const NODE_TYPE = require("./node-type");
const createHTMLCollection = require("./html-collection").create;
const updateHTMLCollection = require("./html-collection").update;

module.exports = function (core) {
  // https://dom.spec.whatwg.org/#interface-parentnode
  // Note that ParentNode is a "NoInterfaceObject"

  for (const Constructor of [core.Document, core.DocumentFragment, core.Element]) {
    defineGetter(Constructor.prototype, "children", function () {
      if (!this._childrenList) {
        this._childrenList = createHTMLCollection(this, () => {
          return domSymbolTree.childrenToArray(this, { filter(node) {
            return node.nodeType === NODE_TYPE.ELEMENT_NODE;
          } });
        });
      } else {
        updateHTMLCollection(this._childrenList);
      }
      return this._childrenList;
    });

    defineGetter(Constructor.prototype, "firstElementChild", function () {
      for (const child of domSymbolTree.childrenIterator(this)) {
        if (child.nodeType === NODE_TYPE.ELEMENT_NODE) {
          return child;
        }
      }

      return null;
    });

    defineGetter(Constructor.prototype, "lastElementChild", function () {
      for (const child of domSymbolTree.childrenIterator(this, { reverse: true })) {
        if (child.nodeType === NODE_TYPE.ELEMENT_NODE) {
          return child;
        }
      }

      return null;
    });

    defineGetter(Constructor.prototype, "childElementCount", function () {
      return this.children.length;
    });
  }
};
