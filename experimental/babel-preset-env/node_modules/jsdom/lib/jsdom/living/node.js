"use strict";
const defineGetter = require("../utils").defineGetter;
const simultaneousIterators = require("../utils").simultaneousIterators;
const attributes = require("./attributes");
const cloneDoctype = require("./document-type").clone;
const cloningSteps = require("./helpers/internal-constants").cloningSteps;
const domSymbolTree = require("./helpers/internal-constants").domSymbolTree;
const NODE_TYPE = require("./node-type");
const documentBaseURL = require("./helpers/document-base-url").documentBaseURL;
const orderedSetParser = require("./helpers/ordered-set-parser");
const createHTMLCollection = require("./html-collection").create;
const domTokenListContains = require("./dom-token-list").contains;
const getDoctypePrivates = require("./document-type").getPrivates;

module.exports = function (core) {
  const DOCUMENT_POSITION_DISCONNECTED = core.Node.DOCUMENT_POSITION_DISCONNECTED;
  const DOCUMENT_POSITION_FOLLOWING = core.Node.DOCUMENT_POSITION_FOLLOWING;
  const DOCUMENT_POSITION_CONTAINED_BY = core.Node.DOCUMENT_POSITION_CONTAINED_BY;
  const DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC = core.Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;

  /**
   * Return true if node is of a type obsoleted by the WHATWG living standard
   * @param  {Node}  node
   * @return {Boolean}
   */
  function isObsoleteNodeType(node) {
    return node.nodeType === NODE_TYPE.ENTITY_NODE ||
      node.nodeType === NODE_TYPE.ENTITY_REFERENCE_NODE ||
      node.nodeType === NODE_TYPE.NOTATION_NODE ||
      node.nodeType === NODE_TYPE.CDATA_SECTION_NODE;
  }

  core.Node.prototype.cloneNode = function (deep) {
    deep = Boolean(deep);

    return module.exports.clone(core, this, undefined, deep);
  };

  /**
   * Returns a bitmask Number composed of DOCUMENT_POSITION constants based upon the rules defined in
   * http://dom.spec.whatwg.org/#dom-node-comparedocumentposition
   * @param  {Node} other
   * @return {Number}
   */
  core.Node.prototype.compareDocumentPosition = function (other) {
    // Let reference be the context object.
    const reference = this;

    if (!(other instanceof core.Node)) {
      throw new Error("Comparing position against non-Node values is not allowed");
    }

    if (isObsoleteNodeType(reference) || isObsoleteNodeType(other)) {
      throw new Error("Obsolete node type");
    }

    const result = domSymbolTree.compareTreePosition(reference, other);

    // “If other and reference are not in the same tree, return the result of adding DOCUMENT_POSITION_DISCONNECTED,
    //  DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC, and either DOCUMENT_POSITION_PRECEDING or
    // DOCUMENT_POSITION_FOLLOWING, with the constraint that this is to be consistent, together.”
    if (result === DOCUMENT_POSITION_DISCONNECTED) {
      // symbol-tree does not add these bits required by the spec:
      return DOCUMENT_POSITION_DISCONNECTED | DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC | DOCUMENT_POSITION_FOLLOWING;
    }

    return result;
  };

  /**
   * The contains(other) method returns true if other is an inclusive descendant of the context object,
   * and false otherwise (including when other is null).
   * @param  {[Node]} other [the node to test]
   * @return {[boolean]}      [whether other is an inclusive descendant of this]
   */
  core.Node.prototype.contains = function (other) {
    return Boolean(other instanceof core.Node &&
                   (this === other || this.compareDocumentPosition(other) & DOCUMENT_POSITION_CONTAINED_BY)
                  );
  };

  // http://dom.spec.whatwg.org/#dom-node-parentelement
  defineGetter(core.Node.prototype, "parentElement", function () {
    const parentNode = domSymbolTree.parent(this);
    return parentNode !== null && parentNode.nodeType === NODE_TYPE.ELEMENT_NODE ? parentNode : null;
  });

  // https://dom.spec.whatwg.org/#dom-node-baseuri
  defineGetter(core.Node.prototype, "baseURI", function () {
    return documentBaseURL(this._ownerDocument);
  });

  function nodeEquals(a, b) {
    if (a.nodeType !== b.nodeType) {
      return false;
    }

    switch (a.nodeType) {
      case NODE_TYPE.DOCUMENT_TYPE_NODE:
        const privatesA = getDoctypePrivates(a);
        const privatesB = getDoctypePrivates(b);
        if (privatesA.name !== privatesB.name || privatesA.publicId !== privatesB.publicId ||
            privatesA.systemId !== privatesB.systemId) {
          return false;
        }
        break;
      case NODE_TYPE.ELEMENT_NODE:
        if (a._namespaceURI !== b._namespaceURI || a._prefix !== b._prefix || a._localName !== b._localName ||
            a._attributes.length !== b._attributes.length) {
          return false;
        }
        break;
      case NODE_TYPE.PROCESSING_INSTRUCTION_NODE:
        if (a._target !== b._target || a._data !== b._data) {
          return false;
        }
        break;
      case NODE_TYPE.TEXT_NODE:
      case NODE_TYPE.COMMENT_NODE:
        if (a._data !== b._data) {
          return false;
        }
        break;
    }

    if (a.nodeType === NODE_TYPE.ELEMENT_NODE && !attributes.attributeListsEqual(a, b)) {
      return false;
    }

    for (const nodes of simultaneousIterators(domSymbolTree.childrenIterator(a), domSymbolTree.childrenIterator(b))) {
      if (!nodes[0] || !nodes[1]) {
        // mismatch in the amount of childNodes
        return false;
      }

      if (!nodeEquals(nodes[0], nodes[1])) {
        return false;
      }
    }

    return true;
  }

  // https://dom.spec.whatwg.org/#dom-node-isequalnode
  core.Node.prototype.isEqualNode = function (node) {
    if (node === undefined) {
      // this is what Node? means in the IDL
      node = null;
    }

    if (node === null) {
      return false;
    }

    // Fast-path, not in the spec
    if (this === node) {
      return true;
    }

    return nodeEquals(this, node);
  };
};

module.exports.clone = function (core, node, document, cloneChildren) {
  if (document === undefined) {
    document = node._ownerDocument;
  }

  let copy;
  switch (node.nodeType) {
    case NODE_TYPE.DOCUMENT_NODE:
      // TODO: just use Document when we eliminate the difference between Document and HTMLDocument.
      copy = new node.constructor({
        contentType: node._contentType,
        url: node._URL,
        parsingMode: node._parsingMode
      });
      document = copy;
      break;

    case NODE_TYPE.DOCUMENT_TYPE_NODE:
      copy = cloneDoctype(core, node);
      break;

    case NODE_TYPE.ELEMENT_NODE:
      copy = document._createElementWithCorrectElementInterface(node._localName, node._namespaceURI);
      copy._namespaceURI = node._namespaceURI;
      copy._prefix = node._prefix;
      copy._localName = node._localName;
      attributes.copyAttributeList(node, copy);
      break;

    case NODE_TYPE.TEXT_NODE:
      copy = new core.Text(document, node._data);
      break;

    case NODE_TYPE.COMMENT_NODE:
      copy = new core.Comment(document, node._data);
      break;

    case NODE_TYPE.PROCESSING_INSTRUCTION_NODE:
      copy = new core.ProcessingInstruction(document, node._target, node._data);
      break;

    case NODE_TYPE.DOCUMENT_FRAGMENT_NODE:
      copy = new core.DocumentFragment(document);
      break;
  }

  if (node[cloningSteps]) {
    node[cloningSteps](copy, node, document, cloneChildren);
  }

  if (cloneChildren) {
    for (const child of domSymbolTree.childrenIterator(node)) {
      const childCopy = module.exports.clone(core, child, document, true);
      copy.appendChild(childCopy);
    }
  }

  return copy;
};

module.exports.listOfElementsWithClassNames = function (classNames, root) {
  // https://dom.spec.whatwg.org/#concept-getElementsByClassName

  const classes = orderedSetParser(classNames);

  if (classes.size === 0) {
    return createHTMLCollection(root, () => false);
  }

  return createHTMLCollection(root, () => {
    const isQuirksMode = root._ownerDocument.compatMode === "BackCompat";

    return domSymbolTree.treeToArray(root, { filter(node) {
      if (node.nodeType !== NODE_TYPE.ELEMENT_NODE || node === root) {
        return false;
      }

      for (const className of classes) {
        if (!domTokenListContains(node.classList, className, { caseInsensitive: isQuirksMode })) {
          return false;
        }
      }

      return true;
    } });
  });
};
