"use strict";
const nwmatcher = require("nwmatcher/src/nwmatcher-noqsa");
const memoizeQuery = require("../utils").memoizeQuery;
const domSymbolTree = require("./helpers/internal-constants").domSymbolTree;
const createStaticNodeList = require("../living/node-list").createStatic;
const DOMException = require("../web-idl/DOMException");

module.exports = function (core) {
  for (const Class of [core.Document, core.DocumentFragment, core.Element]) {
    Class.prototype.querySelector = memoizeQuery(function (selectors) {
      selectors = String(selectors);
      const matcher = addNwmatcher(this);

      try {
        return matcher.first(selectors, this);
      } catch (e) {
        throw new DOMException(DOMException.SYNTAX_ERR, e.message);
      }
    });

    Class.prototype.querySelectorAll = memoizeQuery(function (selectors) {
      selectors = String(selectors);
      const matcher = addNwmatcher(this);

      let list;
      try {
        list = matcher.select(selectors, this);
      } catch (e) {
        throw new DOMException(DOMException.SYNTAX_ERR, e.message);
      }

      return createStaticNodeList(list);
    });
  }

  core.Element.prototype.matches = memoizeQuery(function (selectors) {
    selectors = String(selectors);
    const matcher = addNwmatcher(this);

    try {
      return matcher.match(this, selectors);
    } catch (e) {
      throw new DOMException(DOMException.SYNTAX_ERR, e.message);
    }
  });
};

// Internal method so you don't have to go through the public API
module.exports.querySelector = function (parentNode, selectors) {
  if (!domSymbolTree.hasChildren(parentNode) ||
      (parentNode === parentNode._ownerDocument && !parentNode._documentElement)) {
    // This allows us to avoid the explosion that occurs if you try to add nwmatcher to a document that is not yet
    // initialized.
    return null;
  }

  return addNwmatcher(parentNode).first(selectors, parentNode);
};

// nwmatcher gets `document.documentElement` at creation-time, so we have to initialize lazily, since in the initial
// stages of Document initialization, there is no documentElement present yet.
function addNwmatcher(parentNode) {
  const document = parentNode._ownerDocument;

  if (!document._nwmatcher) {
    document._nwmatcher = nwmatcher({ document });
    document._nwmatcher.configure({ UNIQUE_ID: false });
  }

  return document._nwmatcher;
}
