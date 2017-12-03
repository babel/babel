"use strict";
/*
  ServerJS Javascript DOM Level 1
*/
var inheritFrom = require("../utils").inheritFrom;
var domToHtml = require("../browser/domtohtml").domToHtml;
var defineGetter = require("../utils").defineGetter;
var memoizeQuery = require("../utils").memoizeQuery;
var validateName = require('../living/helpers/validate-names').name;
var HtmlToDom = require("../browser/htmltodom").HtmlToDom;
var Location = require("../browser/location");
var vm = require("vm");
var CookieJar = require('tough-cookie').CookieJar;
var EventTarget = require("../living/generated/EventTarget");
var attributes = require("../living/attributes");
var mapper = require("../utils").mapper;
var clone = require("../living/node").clone;
var namedPropertiesWindow = require("../living/named-properties-window");
var Window = require('../browser/Window');
var proxiedWindowEventHandlers = require("../living/helpers/proxied-window-event-handlers");
const URL = require("../utils").URL;
const domSymbolTree = require("../living/helpers/internal-constants").domSymbolTree;
const NODE_TYPE = require("../living/node-type");
const resetDOMTokenList = require("../living/dom-token-list").reset;
const createLiveNodeList = require("../living/node-list").createLive;
const updateNodeList = require("../living/node-list").update;
const updateHTMLCollection = require("../living/html-collection").update;

// utility functions
var attachId = function(id,elm,doc) {
  if (id && elm && doc) {
    if (!doc._ids[id]) {
      doc._ids[id] = [];
    }
    doc._ids[id].push(elm);
  }
};
var detachId = function(id,elm,doc) {
  var elms, i;
  if (id && elm && doc) {
    if (doc._ids && doc._ids[id]) {
      elms = doc._ids[id];
      for (i=0;i<elms.length;i++) {
        if (elms[i] === elm) {
          elms.splice(i,1);
          i--;
        }
      }
      if (elms.length === 0) {
        delete doc._ids[id];
      }
    }
  }
};

function setInnerHTML(document, node, html) {
  // Clear the children first:
  if (node._templateContents) {
    clearChildNodes(node._templateContents);
  } else {
    clearChildNodes(node);
  }

  if (html !== "") {
    if (node.nodeName === "#document") {
      document._htmlToDom.appendHtmlToDocument(html, node);
    } else {
      document._htmlToDom.appendHtmlToElement(html, node);
    }
  }
}

function clearChildNodes(node) {
  for (let child = null; child = domSymbolTree.firstChild(node);) {
    node.removeChild(child);
  }
}

var core = exports;

core.DOMException = require("../web-idl/DOMException");
core.NamedNodeMap = require("../living/attributes").NamedNodeMap;

core.DOMImplementation = function DOMImplementation(document, /* Object */ features) {
  throw new TypeError("Illegal constructor");
};

core.DOMImplementation.prototype = {
  // All of these are legacy, left because jsdom uses them internally :(. jsdom confused the idea of browser features
  // and jsdom features
  _removeFeature : function(feature, version) {
    feature = feature.toLowerCase();
    if (this._features[feature]) {
      if (version) {
        var j        = 0,
            versions = this._features[feature],
            l        = versions.length;

        for (j; j<l; j++) {
          if (versions[j] === version) {
            versions.splice(j,1);
            return;
          }
        }
      } else {
        delete this._features[feature];
      }
    }
  },

  _addFeature: function(feature, version) {
    feature = feature.toLowerCase();

    if (version) {

      if (!this._features[feature]) {
        this._features[feature] = [];
      }

      if (version instanceof Array) {
        Array.prototype.push.apply(this._features[feature], version);
      } else {
        this._features[feature].push(version);
      }

      if (feature === "processexternalresources" &&
          (version === "script" || (version.indexOf && version.indexOf("script") !== -1)) &&
          !vm.isContext(this._ownerDocument._global)) {
        vm.createContext(this._ownerDocument._global);
        this._ownerDocument._defaultView._globalProxy = vm.runInContext("this", this._ownerDocument._global);
        this._ownerDocument._defaultView = this._ownerDocument._defaultView._globalProxy;
      }
    }
  },

  // The real hasFeature is in living/dom-implementation.js, and returns true always.
  // This one is used internally
  _hasFeature: function(/* string */ feature, /* string */ version) {
    feature = (feature) ? feature.toLowerCase() : '';
    var versions = (this._features[feature]) ?
                    this._features[feature]  :
                    false;

    if (!version && versions.length && versions.length > 0) {
      return true;
    } else if (typeof versions === 'string') {
      return versions === version;
    } else if (versions.indexOf && versions.length > 0) {
      for (var i = 0; i < versions.length; i++) {
        var found = versions[i] instanceof RegExp ?
          versions[i].test(version) :
          versions[i] === version;
        if (found) { return true; }
      }
      return false;
    } else {
      return false;
    }
  }
};

core.Node = function Node(ownerDocument) {
  EventTarget.setup(this);

  domSymbolTree.initialize(this);
  this._childNodesList = null;
  this._ownerDocument = ownerDocument;
  this._childrenList = null;
  this._version = 0;
  this._memoizedQueries = {};
  this._readonly = false;
};

core.Node.ELEMENT_NODE                = NODE_TYPE.ELEMENT_NODE;
core.Node.ATTRIBUTE_NODE              = NODE_TYPE.ATTRIBUTE_NODE;
core.Node.TEXT_NODE                   = NODE_TYPE.TEXT_NODE;
core.Node.CDATA_SECTION_NODE          = NODE_TYPE.CDATA_SECTION_NODE;
core.Node.ENTITY_REFERENCE_NODE       = NODE_TYPE.ENTITY_REFERENCE_NODE;
core.Node.ENTITY_NODE                 = NODE_TYPE.ENTITY_NODE;
core.Node.PROCESSING_INSTRUCTION_NODE = NODE_TYPE.PROCESSING_INSTRUCTION_NODE;
core.Node.COMMENT_NODE                = NODE_TYPE.COMMENT_NODE;
core.Node.DOCUMENT_NODE               = NODE_TYPE.DOCUMENT_NODE;
core.Node.DOCUMENT_TYPE_NODE          = NODE_TYPE.DOCUMENT_TYPE_NODE;
core.Node.DOCUMENT_FRAGMENT_NODE      = NODE_TYPE.DOCUMENT_FRAGMENT_NODE;
core.Node.NOTATION_NODE               = NODE_TYPE.NOTATION_NODE;

core.Node.prototype = {
  ELEMENT_NODE                : NODE_TYPE.ELEMENT_NODE,
  ATTRIBUTE_NODE              : NODE_TYPE.ATTRIBUTE_NODE,
  TEXT_NODE                   : NODE_TYPE.TEXT_NODE,
  CDATA_SECTION_NODE          : NODE_TYPE.CDATA_SECTION_NODE,
  ENTITY_REFERENCE_NODE       : NODE_TYPE.ENTITY_REFERENCE_NODE,
  ENTITY_NODE                 : NODE_TYPE.ENTITY_NODE,
  PROCESSING_INSTRUCTION_NODE : NODE_TYPE.PROCESSING_INSTRUCTION_NODE,
  COMMENT_NODE                : NODE_TYPE.COMMENT_NODE,
  DOCUMENT_NODE               : NODE_TYPE.DOCUMENT_NODE,
  DOCUMENT_TYPE_NODE          : NODE_TYPE.DOCUMENT_TYPE_NODE,
  DOCUMENT_FRAGMENT_NODE      : NODE_TYPE.DOCUMENT_FRAGMENT_NODE,
  NOTATION_NODE               : NODE_TYPE.NOTATION_NODE,

  get nodeValue() {
    if (this.nodeType === NODE_TYPE.TEXT_NODE ||
        this.nodeType === NODE_TYPE.COMMENT_NODE ||
        this.nodeType === NODE_TYPE.PROCESSING_INSTRUCTION_NODE) {
      return this._data;
    }

    return null;
  },
  set nodeValue(value) {
    if (this.nodeType === NODE_TYPE.TEXT_NODE ||
        this.nodeType === NODE_TYPE.COMMENT_NODE ||
        this.nodeType === NODE_TYPE.PROCESSING_INSTRUCTION_NODE) {
      this.replaceData(0, this.length, value);
    }
  },
  get parentNode() {
    return domSymbolTree.parent(this);
  },

  get nodeName() {
    switch (this.nodeType) {
      case NODE_TYPE.ELEMENT_NODE:
        return this.tagName;
      case NODE_TYPE.TEXT_NODE:
        return "#text";
      case NODE_TYPE.PROCESSING_INSTRUCTION_NODE:
        return this.target;
      case NODE_TYPE.COMMENT_NODE:
        return "#comment";
      case NODE_TYPE.DOCUMENT_NODE:
        return "#document";
      case NODE_TYPE.DOCUMENT_TYPE_NODE:
        return this.name;
      case NODE_TYPE.DOCUMENT_FRAGMENT_NODE:
        return "#document-fragment";
    }
  },
  set nodeName(unused) { throw new core.DOMException();},
  get firstChild() {
    return domSymbolTree.firstChild(this);
  },
  get ownerDocument() {
    // TODO: when we move nodeType to Node.prototype and add an internal _nodeType, consult that instead.
    return this.nodeType === NODE_TYPE.DOCUMENT_NODE ? null : this._ownerDocument;
  },
  get readonly() { return this._readonly;},

  get lastChild() {
    return domSymbolTree.lastChild(this);
  },

  get childNodes() {
    if (!this._childNodesList) {
      var self = this;
      this._childNodesList = createLiveNodeList(this, function() {
        return domSymbolTree.childrenToArray(self);
      });
    } else {
      updateNodeList(this._childNodesList);
    }

    return this._childNodesList;
  },
  set childNodes(unused) { throw new core.DOMException();},

  get nextSibling() {
    return domSymbolTree.nextSibling(this);
  },
  set nextSibling(unused) { throw new core.DOMException();},

  get previousSibling() {
    return domSymbolTree.previousSibling(this);
  },
  set previousSibling(unused) { throw new core.DOMException();},

  /* returns Node */
  insertBefore :  function(/* Node */ newChild, /* Node*/ refChild) {
    if (arguments.length < 2) {
      throw new TypeError("Not enough arguments to Node.prototype.insertBefore");
    }
    if (refChild === undefined) {
      refChild = null;
    }

    // TODO branding
    if (!newChild || !("nodeType" in newChild)) {
      throw new TypeError("First argument to Node.prototype.insertBefore must be a Node");
    }
    if (refChild !== null && !("nodeType" in refChild)) {
      throw new TypeError("Second argument to Node.prototype.insertBefore must be a Node or null or undefined");
    }

    if (this._readonly === true) {
      throw new core.DOMException(core.DOMException.NO_MODIFICATION_ALLOWED_ERR, 'Attempting to modify a read-only node');
    }

    // DocumentType must be implicitly adopted
    if (newChild.nodeType === NODE_TYPE.DOCUMENT_TYPE_NODE) newChild._ownerDocument = this._ownerDocument;

    // TODO - if (!newChild) then?
    if (!(this instanceof core.Document) && newChild._ownerDocument !== this._ownerDocument) {
      throw new core.DOMException(core.DOMException.WRONG_DOCUMENT_ERR);
    }

    if (newChild.nodeType && newChild.nodeType === NODE_TYPE.ATTRIBUTE_NODE) {
      throw new core.DOMException(core.DOMException.HIERARCHY_REQUEST_ERR);
    }

    // search for parents matching the newChild
    for (const ancestor of domSymbolTree.ancestorsIterator(this)) {
      if (ancestor === newChild) {
        throw new core.DOMException(core.DOMException.HIERARCHY_REQUEST_ERR);
      }
    }

    // fragments are merged into the element (except parser-created fragments in <template>)
    if (newChild.nodeType === NODE_TYPE.DOCUMENT_FRAGMENT_NODE) {

      let grandChild;
      while ((grandChild = domSymbolTree.firstChild(newChild))) {
        newChild.removeChild(grandChild);
        this.insertBefore(grandChild, refChild);
      }

    } else if (newChild === refChild) {
      return newChild;
    } else {
      const oldParent = domSymbolTree.parent(newChild);
      // if the newChild is already in the tree elsewhere, remove it first
      if (oldParent) {
        oldParent.removeChild(newChild);
      }

      if (refChild == null) {
        domSymbolTree.appendChild(this, newChild);
      } else {
        if (domSymbolTree.parent(refChild) !== this) {
          throw new core.DOMException(core.DOMException.NOT_FOUND_ERR);
        }

        domSymbolTree.insertBefore(refChild, newChild);
      }

      this._modified();

      if (this._attached && newChild._attach) {
        newChild._attach();
      }

      this._descendantAdded(this, newChild);
    }

    return newChild;
  }, // raises(DOMException);

  _modified: function() {
    this._version++;
    if (this._ownerDocument) {
      this._ownerDocument._version++;
    }

    if (this._childrenList) {
      updateHTMLCollection(this._childrenList);
    }
    if (this._childNodesList) {
      updateNodeList(this._childNodesList);
    }
    this._clearMemoizedQueries();
  },

  _clearMemoizedQueries: function() {
    this._memoizedQueries = {};
    const myParent = domSymbolTree.parent(this);
    if (myParent) {
      myParent._clearMemoizedQueries();
    }
  },

  _descendantRemoved: function(parent, child) {
    const myParent = domSymbolTree.parent(this);
    if (myParent) {
      myParent._descendantRemoved(parent, child);
    }
  },

  _descendantAdded: function(parent, child) {
    const myParent = domSymbolTree.parent(this);
    if (myParent) {
      myParent._descendantAdded(parent, child);
    }
  },

  _attrModified: function(name, value, oldValue) {
    this._modified();
    namedPropertiesWindow.elementAttributeModified(this, name, value, oldValue);

    if (name == 'id' && this._attached) {
      var doc = this._ownerDocument;
      detachId(oldValue,this,doc);
      attachId(value,this,doc);
    }

    // TODO event handlers:
    // The correct way to do this is lazy, and a bit more complicated; see
    // https://html.spec.whatwg.org/multipage/webappapis.html#event-handler-content-attributes
    // It would only be possible if we had proper getters/setters for every event handler, which we don't right now.
    if (name.length > 2 && name[0] === 'o' && name[1] === 'n') {
      if (value) {
        var w = this._ownerDocument._global;
        var self = proxiedWindowEventHandlers.has(name) && this._localName === 'body' ? w : this;
        var vmOptions = { filename: this._ownerDocument._URL, displayErrors: false };

        // The handler code probably refers to functions declared globally on the window, so we need to run it in
        // that context. In fact, it's worse; see
        // https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/bindings/core/v8/V8LazyEventListener.cpp
        // plus the spec, which show how multiple nested scopes are technically required. We won't implement that
        // until someone asks for it, though.

        // https://html.spec.whatwg.org/multipage/webappapis.html#the-event-handler-processing-algorithm

        if (name === "onerror" && self === w) {
          // https://html.spec.whatwg.org/multipage/webappapis.html#getting-the-current-value-of-the-event-handler
          // step 10

          self[name] = function (event, source, lineno, colno, error) {
            w.__tempEventHandlerThis = this;
            w.__tempEventHandlerEvent = event;
            w.__tempEventHandlerSource = source;
            w.__tempEventHandlerLineno = lineno;
            w.__tempEventHandlerColno = colno;
            w.__tempEventHandlerError = error;

            try {
              return vm.runInContext(`
                (function (event, source, lineno, colno, error) {
                  ${value}
                }).call(__tempEventHandlerThis, __tempEventHandlerEvent, __tempEventHandlerSource,
                        __tempEventHandlerLineno, __tempEventHandlerColno, __tempEventHandlerError)`, w, vmOptions);
            } finally {
              delete w.__tempEventHandlerThis;
              delete w.__tempEventHandlerEvent;
              delete w.__tempEventHandlerSource;
              delete w.__tempEventHandlerLineno;
              delete w.__tempEventHandlerColno;
              delete w.__tempEventHandlerError;
            }
          };
        } else {
          self[name] = function (event) {
            w.__tempEventHandlerThis = this;
            w.__tempEventHandlerEvent = event;

            try {
              return vm.runInContext(`
                (function (event) {
                  ${value}
                }).call(__tempEventHandlerThis, __tempEventHandlerEvent)`, w, vmOptions);
            } finally {
              delete w.__tempEventHandlerThis;
              delete w.__tempEventHandlerEvent;
            }
          };
        }
      } else {
        this[name] = null;
      }
    }

    // TODO remove MutationEvents completely at some point
    if (value !== oldValue && this._ownerDocument &&
        this._ownerDocument.implementation._hasFeature('MutationEvents')) {
      var ev = this._ownerDocument.createEvent("MutationEvents");

      var attrChange = core.MutationEvent.MODIFICATION;
      if (value === null) {
        attrChange = core.MutationEvent.REMOVAL;
      }
      if (oldValue === null) {
        attrChange = core.MutationEvent.ADDITION;
      }

      ev.initMutationEvent("DOMAttrModified", true, false, this, oldValue, value, name, attrChange);
      this.dispatchEvent(ev);
    }

    // update classList
    if (name === "class" && value !== this.classList.toString()) {
      resetDOMTokenList(this.classList, value);
    }
  },

  replaceChild(node, child) {
    if (arguments.length < 2) {
      throw new TypeError("Not enough arguments to Node.prototype.replaceChild");
    }
    // TODO branding
    if (!node || !("nodeType" in node)) {
      throw new TypeError("First argument to Node.prototype.replaceChild must be a Node");
    }
    if (!child || !("nodeType" in child)) {
      throw new TypeError("Second argument to Node.prototype.replaceChild must be a Node");
    }

    this.insertBefore(node, child);
    return this.removeChild(child);
  },

  /* returns void */
  _attach : function() {
    this._attached = true;
    namedPropertiesWindow.nodeAttachedToDocument(this);

    if (this.id) {
      attachId(this.id,this,this._ownerDocument);
    }

    for (const child of domSymbolTree.childrenIterator(this)) {
      if (child._attach) {
        child._attach();
      }
    }
  },
  /* returns void */
  _detach : function() {
    this._attached = false;

    namedPropertiesWindow.nodeDetachedFromDocument(this);

    if (this.id) {
      detachId(this.id,this,this._ownerDocument);
    }

    for (const child of domSymbolTree.childrenIterator(this)) {
      if (child._detach) {
        child._detach();
      }
    }
  },

  /* returns Node */
  removeChild : function(/* Node */ oldChild){
    if (this._readonly === true) {
      throw new core.DOMException(core.DOMException.NO_MODIFICATION_ALLOWED_ERR);
    }

    if (!oldChild || domSymbolTree.parent(oldChild) !== this) {
      throw new core.DOMException(core.DOMException.NOT_FOUND_ERR);
    }

    var oldPreviousSibling = oldChild.previousSibling;
    domSymbolTree.remove(oldChild);
    this._modified();
    oldChild._detach();
    this._descendantRemoved(this, oldChild);
    if (this._ownerDocument) {
      this._ownerDocument._runRemovingSteps(oldChild, this, oldPreviousSibling);
    }
    return oldChild;
  }, // raises(DOMException);

  /* returns Node */
  appendChild : function(/* Node */ newChild) {
    if (arguments.length < 1) {
      throw new TypeError("Not enough arguments to Node.prototype.appendChild");
    }
    // TODO branding
    if (!("nodeType" in newChild)) {
      throw new TypeError("First argument to Node.prototype.appendChild must be a Node");
    }

    return this.insertBefore(newChild, null);
  }, // raises(DOMException);

  /* returns boolean */
  hasChildNodes : function() {
    return domSymbolTree.hasChildren(this);
  },

  /* returns void */
  normalize: function() {
    for (const child of domSymbolTree.childrenIterator(this)) {
      if (child.normalize) {
        child.normalize();
      }

      // Level2/core clean off empty nodes
      if (child.nodeValue === "") {
        this.removeChild(child);
        continue;
      }

      const prevChild = domSymbolTree.previousSibling(child);

      if (prevChild &&
          prevChild.nodeType === NODE_TYPE.TEXT_NODE &&
          child.nodeType === NODE_TYPE.TEXT_NODE) {
        // merge text nodes
        prevChild.appendData(child.nodeValue);
        this.removeChild(child);
      }
    }
  },
  toString: function() {
    var id = '';
    if (this.id) {
        id = '#' + this.id;
    }
    if (this.className) {
        var classes = this.className.split(/\s+/);
        for (var i = 0, len = classes.length; i < len; i++) {
            id += '.' + classes[i];
        }
    }
    return '[ ' + this.tagName + id + ' ]';
  }
};

core.Element = function Element(document, localName) {
  core.Node.call(this, document);
  this._namespaceURI = null;
  this._prefix = null;
  this._localName = localName;
  this._attributes = attributes.createNamedNodeMap(this);
};

inheritFrom(core.Node, core.Element, {
  get namespaceURI() {
    return this._namespaceURI;
  },
  get prefix() {
    return this._prefix;
  },
  get localName() {
    return this._localName;
  },
  get tagName() {
    var qualifiedName = this._prefix !== null ? this._prefix + ":" + this._localName : this._localName;
    if (this.namespaceURI === "http://www.w3.org/1999/xhtml" && this._ownerDocument._parsingMode === "html") {
      qualifiedName = qualifiedName.toUpperCase();
    }
    return qualifiedName;
  },

  get id() {
    var idAttr = this.getAttribute("id");
    if (idAttr === null) {
      return "";
    }
    return idAttr;
  },

  nodeType : NODE_TYPE.ELEMENT_NODE,
  get attributes() {
    return this._attributes;
  },

  get sourceIndex() {
    /*
    * According to QuirksMode:
    * Get the sourceIndex of element x. This is also the index number for
    * the element in the document.getElementsByTagName('*') array.
    * http://www.quirksmode.org/dom/w3c_core.html#t77
    */
    var items = this.ownerDocument.getElementsByTagName('*'),
        len = items.length;

    for (var i = 0; i < len; i++) {
      if (items[i] === this) {
        return i;
      }
    }
  },

  get outerHTML() {
    return domToHtml([this]);
  },

  set outerHTML(html) {
    if (html === null) {
      html = "";
    }

    var parent = domSymbolTree.parent(this);
    var document = this._ownerDocument;

    if (!parent) {
      return;
    }

    var contextElement;
    if (parent.nodeType === NODE_TYPE.DOCUMENT_NODE) {
      throw new core.DOMException(core.DOMException.NO_MODIFICATION_ALLOWED_ERR,
                                  "Modifications are not allowed for this document");
    } else if (parent.nodeType === NODE_TYPE.DOCUMENT_FRAGMENT_NODE) {
      contextElement = document.createElementNS("http://www.w3.org/1999/xhtml", "body");
    } else if (parent.nodeType === NODE_TYPE.ELEMENT_NODE) {
      contextElement = clone(core, parent, undefined, false);
    } else {
      throw new TypeError("This should never happen");
    }

    document._htmlToDom.appendHtmlToElement(html, contextElement);

    while (contextElement.firstChild) {
      parent.insertBefore(contextElement.firstChild, this);
    }

    parent.removeChild(this);
  },

  get innerHTML() {
    var tagName = this.tagName;
    if (tagName === 'SCRIPT' || tagName === 'STYLE') {
      var type = this.getAttribute('type');
      if (!type || /^text\//i.test(type) || /\/javascript$/i.test(type)) {
        return domToHtml(domSymbolTree.childrenIterator(this));
      }
    }

    // In case of <template> we should pass its "template contents" fragment as a serialization root if we have one
    if (this._templateContents) {
      return domToHtml(domSymbolTree.childrenIterator(this._templateContents));
    }

    return domToHtml(domSymbolTree.childrenIterator(this));
  },

  set innerHTML(html) {
    if (html === null) {
      html = "";
    }

    setInnerHTML(this.ownerDocument, this, html);
  },

  scrollTop: 0,
  scrollLeft: 0,

  /* returns NodeList */
  getElementsByTagName: memoizeQuery(function(/* string */ name) {
    name = name.toLowerCase();

    function filterByTagName(child) {
      if (child.nodeName && child.nodeType === NODE_TYPE.ELEMENT_NODE) {
        return name === "*" || (child.nodeName.toLowerCase() === name);
      }

      return false;
    }
    return createLiveNodeList(this._ownerDocument || this, mapper(this, filterByTagName, true));
  }),
});

core.DocumentFragment = function DocumentFragment(document) {
  core.Node.call(this, document);
};
inheritFrom(core.Node, core.DocumentFragment, {
  nodeType : NODE_TYPE.DOCUMENT_FRAGMENT_NODE
});

core.Document = function Document(options) {
  if (!options || !options.parsingMode || (options.parsingMode !== "html" && options.parsingMode !== "xml")) {
    throw new Error("options must exist and contain a parsingMode of html or xml");
  }

  core.Node.call(this, this);
  this._parsingMode = options.parsingMode;
  this._htmlToDom = new HtmlToDom(core, options.parser, options.parsingMode);

  this._implementation = Object.create(core.DOMImplementation.prototype);
  this._implementation._ownerDocument = this;
  this._implementation._features = {};

  this._defaultView = options.defaultView || null;
  this._global = options.global;
  this._documentElement = null;
  this._ids = Object.create(null);
  this._attached = true;
  this._readonly = false;
  this._currentScript = null;
  this._cookieJar = options.cookieJar === undefined ? new CookieJar(null, { looseMode: true }) : options.cookieJar;

  this._contentType = options.contentType;
  if (this._contentType === undefined) {
    this._contentType = this._parsingMode === "xml" ? "application/xml" : "text/html";
  }

  this._URL = options.url === undefined ? "about:blank" : new URL(options.url).href;
  this._location = new Location(this._URL, this);

  if (options.cookie) {
    var cookies = Array.isArray(options.cookie) ? options.cookie: [options.cookie];
    var document = this;

    cookies.forEach(function(cookieStr) {
      document._cookieJar.setCookieSync(cookieStr, document._URL, { ignoreError : true });
    });
  }

  this._activeNodeIterators = [];
  this._activeNodeIteratorsMax = options.concurrentNodeIterators === undefined ?
                                 10 :
                                 Number(options.concurrentNodeIterators);

  if (isNaN(this._activeNodeIteratorsMax)) {
    throw new TypeError("The 'concurrentNodeIterators' option must be a Number");
  }

  if (this._activeNodeIteratorsMax < 0) {
    throw new RangeError("The 'concurrentNodeIterators' option must be a non negative Number");
  }
};

core.Document._removingSteps = [];

var tagRegEx = /[^\w:\d_\.-]+/i;
var entRegEx = /[^\w\d_\-&;]+/;
var invalidAttrRegEx = /[\s"'>/=\u0000-\u001A]/;

inheritFrom(core.Node, core.Document, {
  nodeType : NODE_TYPE.DOCUMENT_NODE,
  _elementBuilders : { },
  _defaultElementBuilder: function(document, tagName) {
    return new core.Element(document, tagName);
  },
  get contentType() { return this._contentType;},
  get compatMode() { return (this._parsingMode === "xml" || this.doctype) ? "CSS1Compat" : "BackCompat"; },
  get charset() { return "UTF-8"; },
  get characterSet() { return "UTF-8"; },
  get inputEncoding() { return "UTF-8"; },
  get doctype() {
    for (const childNode of domSymbolTree.childrenIterator(this)) {
      if (childNode.nodeType === NODE_TYPE.DOCUMENT_TYPE_NODE) {
        return childNode;
      }
    }
    return null;
  },
  get URL() {
    return this._URL;
  },
  get documentURI() {
    return this._URL;
  },
  get location() {
    return this._defaultView ? this._location : null;
  },
  get documentElement() {
    if (this._documentElement) {
      return this._documentElement;
    }

    for (const childNode of domSymbolTree.childrenIterator(this)) {
      if (childNode.nodeType === NODE_TYPE.ELEMENT_NODE) {
        this._documentElement = childNode;
        return childNode;
      }
    }

    return null;

  },

  get implementation() { return this._implementation;},
  set implementation(implementation) { this._implementation = implementation;},
  get readonly() { return this._readonly;},

  get defaultView() {
    return this._defaultView;
  },

  get currentScript() {
    return this._currentScript;
  },

  toString: function () {
    return '[object HTMLDocument]';
  },

  _createElementWithCorrectElementInterface: function (name, namespace) {
    // https://dom.spec.whatwg.org/#concept-element-interface
    // TODO: eventually we should re-write the element-builder system to be namespace aware, but for now it is not.
    return (this._elementBuilders[name.toLowerCase()] || this._defaultElementBuilder)(this, name, namespace);
  },

  appendChild : function(/* Node */ arg) {
    if (this.documentElement && arg.nodeType == NODE_TYPE.ELEMENT_NODE) {
      throw new core.DOMException(core.DOMException.HIERARCHY_REQUEST_ERR);
    }
    return core.Node.prototype.appendChild.call(this, arg);
  },

  removeChild : function(/* Node */ arg) {
    var ret = core.Node.prototype.removeChild.call(this, arg);
    if (arg == this._documentElement) {
      this._documentElement = null;// force a recalculation
    }
    return ret;
  },

  _descendantRemoved: function(parent, child) {
    if (child.tagName === 'STYLE') {
      var index = this.styleSheets.indexOf(child.sheet);
      if (index > -1) {
        this.styleSheets.splice(index, 1);
      }
    }
  },

  /* returns NodeList */
  getElementsByTagName: memoizeQuery(function(/* string */ name) {
    function filterByTagName(child) {
      if (child.nodeName && child.nodeType === NODE_TYPE.ELEMENT_NODE)
      {
        if (name === "*") {
          return true;

        // case insensitivity for html
        } else if (child._ownerDocument && child._ownerDocument._doctype &&
                   //child._ownerDocument._doctype.name === "html" &&
                   child.nodeName.toLowerCase() === name.toLowerCase())
        {
          return true;
        } else if (child.nodeName.toLowerCase() === name.toLowerCase()) {
          return true;
        }
      }
      return false;
    }
    return createLiveNodeList(this.documentElement || this, mapper(this, filterByTagName, true));
  }),

  write: function () {
    var text = "";
    for (var i = 0; i < arguments.length; ++i) {
      text += String(arguments[i]);
    }

    if (this._parsingMode === "xml") {
      throw new core.DOMException(core.DOMException.INVALID_STATE_ERR, "Cannot use document.write on XML documents");
    }

    if (this._writeAfterElement) {
      // If called from an script element directly (during the first tick),
      // the new elements are inserted right after that element.
      var tempDiv = this.createElement('div');
      setInnerHTML(this, tempDiv, text);

      var child = tempDiv.firstChild;
      var previous = this._writeAfterElement;
      var parent = this._writeAfterElement.parentNode;

      while (child) {
        var node = child;
        child = child.nextSibling;
        parent.insertBefore(node, previous.nextSibling);
        previous = node;
      }
    } else if (this.readyState === "loading") {
      // During page loading, document.write appends to the current element
      // Find the last child that has been added to the document.
      var node = this;
      while (node.lastChild && node.lastChild.nodeType === NODE_TYPE.ELEMENT_NODE) {
        node = node.lastChild;
      }
      setInnerHTML(this, node, text);
    } else if (text) {
      setInnerHTML(this, this, text);
    }
  },

  writeln: function () {
    const args = [];
    for (let i = 0; i < arguments.length; ++i) {
      args.push(arguments[i]);
    }
    args.push("\n");
    this.write.apply(this, args);
  },

  _runRemovingSteps: function(oldNode, oldParent, oldPreviousSibling) {
    var listeners = core.Document._removingSteps;
    for (var i = 0; i < listeners.length; ++i) {
      listeners[i](this, oldNode, oldParent, oldPreviousSibling);
    }
  }
});
