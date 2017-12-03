"use strict";
var resourceLoader        = require('../browser/resource-loader'),
    core                  = require("../level1/core"),
    applyDocumentFeatures = require('../browser/documentfeatures').applyDocumentFeatures,
    defineGetter          = require('../utils').defineGetter,
    defineSetter          = require('../utils').defineSetter,
    inheritFrom           = require("../utils").inheritFrom,
    URL                   = require("../utils").URL,
    Window                = require("../browser/Window"),
    documentBaseURL       = require("../living/helpers/document-base-url").documentBaseURL,
    fallbackBaseURL       = require("../living/helpers/document-base-url").fallbackBaseURL,
    mapper                = require("../utils").mapper,
    addConstants          = require("../utils").addConstants,
    whatwgUrl             = require("whatwg-url-compat"),
    mixinURLUtils         = whatwgUrl.mixinURLUtils;

const DOMException = require ('../web-idl/DOMException');

const getAttributeValue = require("../living/attributes").getAttributeValue;
const cloningSteps = require("../living/helpers/internal-constants").cloningSteps;
const clone = require("../living/node").clone;
const notImplemented = require("../browser/not-implemented");
const proxiedWindowEventHandlers = require("../living/helpers/proxied-window-event-handlers");
const internalConstants = require("../living/helpers/internal-constants");
const domSymbolTree = internalConstants.domSymbolTree;
const accept = internalConstants.accept;
const createHTMLCollection = require("../living/html-collection").create;
const NODE_TYPE = require("../living/node-type");

// Setup the javascript language processor
core.languageProcessors = {
  javascript : require("./languages/javascript").javascript
};

function define(elementClass, def) {
  var tagName = def.tagName,
    tagNames = def.tagNames || (tagName? [tagName] : []),
    parentClass = def.parentClass || core.HTMLElement,
    attrs = def.attributes || [],
    proto = def.proto || {};

  proto.toString = function() {
    return '[object ' + elementClass + ']';
  };

  var elem = core[elementClass] = function(document, name) {
    parentClass.call(this, document, name || tagName.toUpperCase());
    if (elem._init) {
      elem._init.call(this);
    }
  };
  elem._init = def.init;

  inheritFrom(parentClass, elem, proto);

  attrs.forEach(function(n) {
      var prop = n.prop || n,
        attr = n.attr || prop.toLowerCase();

      if (!n.prop || n.read !== false) {
        defineGetter(elem.prototype, prop, function() {
          var s = this.getAttribute(attr);
          if (n.type && n.type === 'boolean') {
            return s !== null;
          }
          if (n.type && n.type === 'long') {
            return +s;
          }
          if (typeof n === 'object' && n.normalize) { // see GH-491
            return n.normalize(s);
          }
          if (s === null) {
            s = '';
          }
          return s;
        });
      }

      if (!n.prop || n.write !== false) {
        defineSetter(elem.prototype, prop, function(val) {
          if (!val) {
            this.removeAttribute(attr);
          }
          else {
            var s = val.toString();
            if (typeof n === 'object' && n.normalize) {
              s = n.normalize(s);
            }
            this.setAttribute(attr, s);
          }
        });
      }
  });

  tagNames.forEach(function(tag) {
    core.Document.prototype._elementBuilders[tag.toLowerCase()] = function(doc, s) {
      return new elem(doc, s);
    };
  });
}

function closest(e, tagName) {
  tagName = tagName.toUpperCase();
  while (e) {
    if (e.nodeName.toUpperCase() === tagName ||
        (e.tagName && e.tagName.toUpperCase() === tagName))
    {
      return e;
    }
    e = domSymbolTree.parent(e);
  }
  return null;
}

function descendants(e, tagName, recursive) {
  var owner = recursive ? e._ownerDocument || e : e;
  return createHTMLCollection(owner, mapper(e, function(n) {
    return n.tagName === tagName;
  }, recursive));
}

function firstChild(e, tagName) {
  if (!e) {
    return null;
  }
  var c = descendants(e, tagName, false);
  return c.length > 0 ? c[0] : null;
}

function ResourceQueue(paused) {
  this.paused = !!paused;
}
ResourceQueue.prototype = {
  push: function(callback) {
    var q = this;
    var item = {
      prev: q.tail,
      check: function() {
        if (!q.paused && !this.prev && this.fired){
          callback(this.err, this.data);
          if (this.next) {
            this.next.prev = null;
            this.next.check();
          }else{//q.tail===this
      q.tail = null;
    }
        }
      }
    };
    if (q.tail) {
      q.tail.next = item;
    }
    q.tail = item;
    return function(err, data) {
      item.fired = 1;
      item.err = err;
      item.data = data;
      item.check();
    };
  },
  resume: function() {
    if(!this.paused){
      return;
    }
    this.paused = false;
    var head = this.tail;
    while(head && head.prev){
      head = head.prev;
    }
    if(head){
      head.check();
    }
  }
};

class RequestManager {
  constructor() {
    this.openedRequests = [];
  }
  add(req) {
    this.openedRequests.push(req);
   }
  remove(req) {
    var idx = this.openedRequests.indexOf(req);
    if(idx !== -1) {
      this.openedRequests.splice(idx, 1);
    }
  }
  close() {
    for (const openedRequest of this.openedRequests) {
      openedRequest.abort();
    }
    this.openedRequests = [];
  }
  size() {
    return this.openedRequests.length;
  }
}

core.HTMLDocument = function HTMLDocument(options) {
  core.Document.call(this, options);
  this._referrer = options.referrer;
  this._queue = new ResourceQueue(options.deferClose);
  this._customResourceLoader = options.resourceLoader;
  this[internalConstants.pool] = options.pool;
  this[internalConstants.agentOptions] = options.agentOptions;
  this[internalConstants.requestManager] = new RequestManager();
  this.readyState = 'loading';

  // Add level2 features
  this.implementation._addFeature('core'  , '2.0');
  this.implementation._addFeature('html'  , '2.0');
  this.implementation._addFeature('xhtml' , '2.0');
  this.implementation._addFeature('xml'   , '2.0');
};

var nonInheritedTags = new Set([
  'article', 'section', 'nav', 'aside', 'hgroup', 'header', 'footer', 'address', 'dt',
  'dd', 'figure', 'figcaption', 'main', 'em', 'strong', 'small', 's', 'cite', 'dfn', 'abbr',
  'ruby', 'rt', 'rp', 'code', 'var', 'samp', 'kbd', 'i', 'b', 'u', 'mark', 'bdi', 'bdo', 'wbr'
]);

inheritFrom(core.Document, core.HTMLDocument, {
  _defaultElementBuilder: function (document, tagName) {
    if (nonInheritedTags.has(tagName.toLowerCase())) {
      return new core.HTMLElement(document, tagName);
    } else {
      return new core.HTMLUnknownElement(document, tagName);
    }
  },

  _referrer : "",
  get referrer() {
    return this._referrer || '';
  },
  get domain() {
    return "";
  },
  get images() {
    return this.getElementsByTagName('IMG');
  },
  get applets() {
    return createHTMLCollection(this, mapper(this, function(el) {
      if (el && el.tagName) {
        var upper = el.tagName.toUpperCase();
        if (upper === "APPLET") {
          return true;
        } else if (upper === "OBJECT" &&
          el.getElementsByTagName('APPLET').length > 0)
        {
          return true;
        }
      }
    }));
  },
  get links() {
    return createHTMLCollection(this, mapper(this, function(el) {
      if (el && el.tagName) {
        var upper = el.tagName.toUpperCase();
        if (upper === "AREA" || (upper === "A" && el.href)) {
          return true;
        }
      }
    }));
  },
  get forms() {
    return this.getElementsByTagName('FORM');
  },
  get anchors() {
    return this.getElementsByTagName('A');
  },
  open  : function() {
    for (let child = null; child = domSymbolTree.firstChild(this);) {
      this.removeChild(child);
    }
    this._documentElement = null;
    this._modified();
    return this;
  },
  close : function() {
    this._queue.resume();

    // Set the readyState to 'complete' once all resources are loaded.
    // As a side-effect the document's load-event will be dispatched.
    resourceLoader.enqueue(this, null, function() {
      this.readyState = 'complete';
      var ev = this.createEvent('HTMLEvents');
      ev.initEvent('DOMContentLoaded', false, false);
      this.dispatchEvent(ev);
    })(null, true);
  },

  getElementsByName : function(elementName) {
    return createHTMLCollection(this, mapper(this, function(el) {
      return (el.getAttribute && el.getAttribute("name") === elementName);
    }));
  },

  get title() {
    var head = this.head,
      title = head ? firstChild(head, 'TITLE') : null;
    return title ? title.textContent : '';
  },

  set title(val) {
    var title = firstChild(this.head, 'TITLE');
    if (!title) {
      title = this.createElement('TITLE');
      var head = this.head;
      if (!head) {
        head = this.createElement('HEAD');
        this.documentElement.insertBefore(head, this.documentElement.firstChild);
      }
      head.appendChild(title);
    }
    title.textContent = val;
  },

  get head() {
    return firstChild(this.documentElement, 'HEAD');
  },

  set head(unused) { /* noop */ },

  get body() {
    var body = firstChild(this.documentElement, 'BODY');
    if (!body) {
      body = firstChild(this.documentElement, 'FRAMESET');
    }
    return body;
  }
});

define('HTMLElement', {
  parentClass: core.Element,
  init: function () {
    this._settingCssText = false;

    var that = this;
    this._style = new core.CSSStyleDeclaration(function onCssTextChange(newCssText) {
      if (!that._settingCssText) {
        that.setAttribute('style', newCssText);
      }
    });
  },
  proto : {
    // Add default event behavior (click link to navigate, click button to submit
    // form, etc). We start by wrapping dispatchEvent so we can forward events to
    // the element's _eventDefault function (only events that did not incur
    // preventDefault).
    dispatchEvent : function (event) {
      var outcome = core.Node.prototype.dispatchEvent.call(this, event)

      if (!event.defaultPrevented &&
          event.target._eventDefaults[event.type] &&
          typeof event.target._eventDefaults[event.type] === 'function')
      {
        event.target._eventDefaults[event.type](event)
      }
      return outcome;
    },
    getBoundingClientRect: function () {
      return {
        bottom: 0,
        height: 0,
        left: 0,
        right: 0,
        top: 0,
        width: 0
      };
    },
    focus : function() {
      this._ownerDocument.activeElement = this;
    },
    blur : function() {
      this._ownerDocument.activeElement = this._ownerDocument.body;
    },
    click: function() {
      // https://html.spec.whatwg.org/multipage/interaction.html#dom-click
      // https://html.spec.whatwg.org/multipage/interaction.html#run-synthetic-click-activation-steps
      // Not completely spec compliant due to e.g. incomplete implementations of disabled for form controls, or no
      // implementation at all of isTrusted.

      if (this.disabled) {
        return false;
      }

      var event = new core.MouseEvent("click", { bubbles: true, cancelable: true });
      this.dispatchEvent(event);
    },

    get style() {
      return this._style;
    },
    set style(value) {
      this._style.cssText = value;
    },

    _eventDefaults : {},
    _attrModified: function (name, value, oldValue) {
      if (name === 'style' && value !== oldValue && !this._settingCssText) {
        this._settingCssText = true;
        this._style.cssText = value;
        this._settingCssText = false;
      }

      core.Element.prototype._attrModified.apply(this, arguments);
    }
  },
  attributes: [
    'id',
    'title',
    'lang',
    'dir',
    {prop: 'className', attr: 'class', normalize: function(s) { return s || ''; }}
  ]
});

define('HTMLUnknownElement', {
  // no additional properties & attributes
});

// http://www.whatwg.org/specs/web-apps/current-work/#category-listed
var listedElements = /button|fieldset|input|keygen|object|select|textarea/i;

define('HTMLFormElement', {
  tagName: 'FORM',
  proto: {
    _descendantAdded: function(parent, child) {
      var form = this;
      for (const el of domSymbolTree.treeIterator(child)) {
        if (typeof el._changedFormOwner === 'function') {
          el._changedFormOwner(form);
        }
      };

      core.HTMLElement.prototype._descendantAdded.apply(this, arguments);
    },
    _descendantRemoved: function(parent, child) {
      for (const el of domSymbolTree.treeIterator(child)) {
        if (typeof el._changedFormOwner === 'function') {
          el._changedFormOwner(null);
        }
      }

      core.HTMLElement.prototype._descendantRemoved.apply(this, arguments);
    },
    get elements() {
      return createHTMLCollection(this._ownerDocument, mapper(this, function(e) {
        return listedElements.test(e.nodeName) ; // TODO exclude <input type="image">
      }));
    },
    get length() {
      return this.elements.length;
    },
    _dispatchSubmitEvent: function() {
      var ev = this._ownerDocument.createEvent('HTMLEvents');
      ev.initEvent('submit', true, true);
      if (!this.dispatchEvent(ev)) {
        this.submit();
      };
    },
    submit: function() {
    },
    reset: function() {
      Array.prototype.forEach.call(this.elements, function(el) {
        if (typeof el._formReset === 'function') {
          el._formReset();
        }
      });
    }
  },
  attributes: [
    'name',
    {prop: 'acceptCharset', attr: 'accept-charset'},
    'action',
    'enctype',
    'method',
    'target'
  ]
});

define('HTMLLinkElement', {
  tagName: 'LINK',
  proto: {
    get [accept]() {
      return "text/css,*/*;q=0.1";
    },
    get href() {
      return resourceLoader.resolveResourceUrl(this._ownerDocument, this.getAttribute('href'));
    }
  },
  attributes: [
    {prop: 'disabled', type: 'boolean'},
    'charset',
    'href',
    'hreflang',
    'media',
    'rel',
    'rev',
    'target',
    'type'
  ]
});

define('HTMLMetaElement', {
  tagName: 'META',
  attributes: [
    'content',
    {prop: 'httpEquiv', attr: 'http-equiv'},
    'name',
    'scheme'
  ]
});

define('HTMLHtmlElement', {
  tagName: 'HTML',
  attributes: [
    'version'
  ]
});

define('HTMLHeadElement', {
  tagName: 'HEAD',
  attributes: [
    'profile'
  ]
});

define('HTMLTitleElement', {
  tagName: 'TITLE',
  proto: {
    get text() {
      return this.innerHTML;
    },
    set text(s) {
      this.innerHTML = s;
    }
  }
});

function reparseAnchors(doc) {
  var anchors = doc.getElementsByTagName("a");
  for (var i = 0; i < anchors.length; ++i) {
    whatwgUrl.reparse(anchors[i]);
  }
}
define('HTMLBaseElement', {
  tagName: 'BASE',
  attributes: [
    'target'
  ],
  proto: {
    get href() {
      if (!this.hasAttribute("href")) {
        return documentBaseURL(this._ownerDocument);
      }

      var fbbu = fallbackBaseURL(this._ownerDocument);
      var url = this.getAttribute("href");

      try {
        return new URL(url, fbbu).href;
      } catch (e) {
        return "";
      }
    },
    set href(value) {
      this.setAttribute("href", String(value));
    },
    _attrModified: function (name, value, oldVal) {
      core.HTMLElement.prototype._attrModified.call(this, name, value, oldVal);
      if (name === 'href') {
        reparseAnchors(this._ownerDocument);
      }
    },

    _detach: function () {
      core.HTMLElement.prototype._detach.call(this);

      reparseAnchors(this._ownerDocument);
    },

    _attach: function () {
      core.HTMLElement.prototype._attach.call(this);

      reparseAnchors(this._ownerDocument);
    }
  }
});


define('HTMLStyleElement', {
  tagName: 'STYLE',
  attributes: [
    {prop: 'disabled', type: 'boolean'},
    'media',
    'type',
  ]
});

define('HTMLBodyElement', {
  proto: (function() {
    var proto = {};
    proxiedWindowEventHandlers.forEach(function (name) {
      defineSetter(proto, name, function (handler) {
        const window = this._ownerDocument._defaultView;
        if (window) {
          window[name] = handler;
        }
      });
      defineGetter(proto, name, function () {
        const window = this._ownerDocument._defaultView;
        return window ? window[name] : null;
      });
    });
    return proto;
  })(),
  tagName: 'BODY',
  attributes: [
    'aLink',
    'background',
    'bgColor',
    'link',
    'text',
    'vLink'
  ]
});

define('HTMLSelectElement', {
  tagName: 'SELECT',
  proto: {
    _formReset: function() {
      Array.prototype.forEach.call(this.options, function(option) {
        option._selectedness = option.defaultSelected;
        option._dirtyness = false;
      });
      this._askedForAReset();
    },
    _askedForAReset: function() {
      if (this.hasAttribute('multiple')) {
        return;
      }

      var selected = Array.prototype.filter.call(this.options, function(option){
        return option._selectedness;
      });

      // size = 1 is default if not multiple
      if ((!this.size || this.size === 1) && !selected.length) {
        // select the first option that is not disabled
        for (var i = 0; i < this.options.length; ++i) {
          var option = this.options[i];
          var disabled = option.disabled;
          const parentNode = domSymbolTree.parent(option);
          if (parentNode &&
              parentNode.nodeName.toUpperCase() === 'OPTGROUP' &&
              parentNode.disabled) {
            disabled = true;
          }

          if (!disabled) {
            // (do not set dirty)
            option._selectedness = true;
            break;
          }
        }
      } else if (selected.length >= 2) {
        // select the last selected option
        selected.forEach(function(option, index) {
          option._selectedness = index === selected.length - 1;
        });
      }
    },
    _descendantAdded: function(parent, child) {
      if (child.nodeType === NODE_TYPE.ELEMENT_NODE) {
        this._askedForAReset();
      }

      core.HTMLElement.prototype._descendantAdded.apply(this, arguments);
    },
    _descendantRemoved: function(parent, child) {
      if (child.nodeType === NODE_TYPE.ELEMENT_NODE) {
        this._askedForAReset();
      }

      core.HTMLElement.prototype._descendantRemoved.apply(this, arguments);
    },
    _attrModified: function(name, value) {
      if (name === 'multiple' || name === 'size') {
        this._askedForAReset();
      }
      core.HTMLElement.prototype._attrModified.apply(this, arguments);
    },
    get options() {
      // TODO: implement HTMLOptionsCollection
      return createHTMLCollection(this, mapper(this, function(n) {
        return n.nodeName === 'OPTION';
      }));
    },

    get length() {
      return this.options.length;
    },

    get selectedIndex() {
      return Array.prototype.reduceRight.call(this.options, function(prev, option, i) {
        return option.selected ? i : prev;
      }, -1);
    },

    set selectedIndex(index) {
      Array.prototype.forEach.call(this.options, function(option, i) {
        option.selected = i === index;
      });
    },

    get value() {
      var i = this.selectedIndex;
      if (this.options.length && (i === -1)) {
        i = 0;
      }
      if (i === -1) {
        return '';
      }
      return this.options[i].value;
    },

    set value(val) {
      var self = this;
      Array.prototype.forEach.call(this.options, function(option) {
        if (option.value === val) {
          option.selected = true;
        } else {
          if (!self.hasAttribute('multiple')) {
            // Remove the selected bit from all other options in this group
            // if the multiple attr is not present on the select
            option.selected = false;
          }
        }
      });
    },

    get form() {
      return closest(this, 'FORM');
    },

    get type() {
      return this.multiple ? 'select-multiple' : 'select-one';
    },

    add: function(opt, before) {
      if (before) {
        this.insertBefore(opt, before);
      }
      else {
        this.appendChild(opt);
      }
    },

    remove: function(index) {
      var opts = this.options;
      if (index >= 0 && index < opts.length) {
        var el = opts[index];
        domSymbolTree.parent(el).removeChild(el);
      }
    }

  },
  attributes: [
    {prop: 'disabled', type: 'boolean'},
    {prop: 'multiple', type: 'boolean'},
    'name',
    {prop: 'size', type: 'long'},
    {prop: 'tabIndex', type: 'long'},
  ]
});

define('HTMLOptGroupElement', {
  tagName: 'OPTGROUP',
  attributes: [
    {prop: 'disabled', type: 'boolean'},
    'label'
  ]
});

define('HTMLOptionElement', {
  tagName: 'OPTION',
  proto: {
    // whenever selectedness is set to true, make sure all
    // other options set selectedness to false
    _selectedness: false,
    _dirtyness: false,
    _removeOtherSelectedness: function() {
      //Remove the selectedness flag from all other options in this select
      var select = this._selectNode;

      if (select && !select.multiple) {
        var o = select.options;
        for (var i = 0; i < o.length; i++) {
          if (o[i] !== this) {
            o[i]._selectedness = false;
          }
        }
      }
    },
    _askForAReset: function() {
      var select = this._selectNode;
      if (select) {
        select._askedForAReset();
      }
    },
    _attrModified: function(name, value) {
      if (!this._dirtyness && name === 'selected') {
        this._selectedness = this.defaultSelected;
        if (this._selectedness) {
          this._removeOtherSelectedness();
        }
        this._askForAReset();
      }
      core.HTMLElement.prototype._attrModified.apply(this, arguments);
    },
    get _selectNode() {
      var select = domSymbolTree.parent(this);
      if (!select) return null;
      if (select.nodeName.toUpperCase() !== 'SELECT') {
        select = domSymbolTree.parent(select);
        if (!select) return null;
        if (select.nodeName.toUpperCase() !== 'SELECT') return null;
      }
      return select;
    },
    get form() {
      return closest(this, 'FORM');
    },
    get defaultSelected() {
      return this.getAttribute('selected') !== null;
    },
    set defaultSelected(s) {
      if (s) this.setAttribute('selected', 'selected');
      else this.removeAttribute('selected');
    },
    get text() {
      return this.innerHTML;
    },
    get value() {
      return (this.hasAttribute('value')) ? this.getAttribute('value') : this.innerHTML;
    },
    set value(val) {
      this.setAttribute('value', val);
    },
    get index() {
      return Array.prototype.indexOf.call(closest(this, 'SELECT').options, this);
    },
    get selected() {
      return this._selectedness;
    },
    set selected(s) {
      this._dirtyness = true;
      this._selectedness = !!s;
      if (this._selectedness) {
        this._removeOtherSelectedness();
      }
      this._askForAReset();
    }
  },
  attributes: [
    {prop: 'disabled', type: 'boolean'},
    'label'
  ]
});

const filesSymbol = Symbol("files");

define('HTMLInputElement', {
  tagName: 'INPUT',
  init: function() {
    if (!this.type) {
      this.type = 'text';
    }
    this._selectionStart = this._selectionEnd = 0;
    this._selectionDirection = "none";
  },
  proto: {
    _value: null,
    _dirtyValue: false,
    _checkedness: false,
    _dirtyCheckedness: false,
    _attrModified: function(name, value) {
      if (!this._dirtyValue && name === 'value') {
        this._value = this.defaultValue;
      }
      if (!this._dirtyCheckedness && name === 'checked') {
        this._checkedness = this.defaultChecked;
        if (this._checkedness) {
          this._removeOtherRadioCheckedness();
        }
      }

      if (name === 'name' || name === 'type') {
        if (this._checkedness) {
          this._removeOtherRadioCheckedness();
        }
      }

      core.HTMLElement.prototype._attrModified.apply(this, arguments);
    },
    _formReset: function() {
      this._value = this.defaultValue;
      this._dirtyValue = false;
      this._checkedness = this.defaultChecked;
      this._dirtyCheckedness = false;
      if (this._checkedness) {
        this._removeOtherRadioCheckedness();
      }
    },
    _changedFormOwner: function(newForm) {
      if (this._checkedness) {
        this._removeOtherRadioCheckedness();
      }
    },
    _removeOtherRadioCheckedness: function() {
      var root = this._radioButtonGroupRoot;
      if (!root) {
        return;
      }

      var name = this.name.toLowerCase();
      var radios = createHTMLCollection(this, mapper(root, function(el) {
        return el.type === 'radio' &&
               el.name &&
               el.name.toLowerCase() === name &&
               el._radioButtonGroupRoot === root;
      }));

      Array.prototype.forEach.call(radios, function(radio) {
        if (radio !== this) {
          radio._checkedness = false;
        }
      }, this);
    },
    get _radioButtonGroupRoot() {
      if (this.type !== 'radio' || !this.name) {
        return null;
      }

      var e = domSymbolTree.parent(this);
      while (e) {
        // root node of this home sub tree
        // or the form element we belong to
        if (!domSymbolTree.parent(e) || e.nodeName.toUpperCase() === 'FORM') {
          return e;
        }
        e = domSymbolTree.parent(e);
      }
      return null;
    },
    get form() {
      return closest(this, 'FORM');
    },
    get defaultValue() {
      var val = this.getAttribute('value');
      return val !== null ? val : "";
    },
    set defaultValue(val) {
      this.setAttribute('value', String(val));
    },
    get defaultChecked() {
      return this.getAttribute('checked') !== null;
    },
    set defaultChecked(s) {
      if (s) this.setAttribute('checked', 'checked');
      else this.removeAttribute('checked');
    },
    get checked() {
      return this._checkedness;
    },
    set checked(checked) {
      this._checkedness = !!checked;
      this._dirtyCheckedness = true;
      if (this._checkedness) {
        this._removeOtherRadioCheckedness();
      }
    },
    get value() {
      if (this._value === null) {
        return '';
      }
      return this._value;
    },
    set value(val) {
      this._dirtyValue = true;

      if (val === null) {
        this._value = null;
      } else {
        this._value = String(val);
      }

      if (this._allowSelection()) {
        this._selectionStart = 0;
        this._selectionEnd = 0;
        this._selectionDirection = 'none';
      }
    },
    get files() {
      if (this.type === "file") {
        this[filesSymbol] = this[filesSymbol] || new core.FileList();
      } else {
        this[filesSymbol] = null;
      }
      return this[filesSymbol];
    },
    get type() {
        var type = this.getAttribute('type');
        return type ? type : 'text';
    },
    set type(type) {
        this.setAttribute('type', type);
    },
    blur: function() {
      this._ownerDocument.activeElement = this._ownerDocument.body;
    },
    focus: function() {
      this._ownerDocument.activeElement = this;
    },

    //LIVING
    _dispatchSelectEvent: function() {
      var event = this._ownerDocument.createEvent("HTMLEvents");
      event.initEvent("select", true, true);
      this.dispatchEvent(event);
    },
    _getValueLength: function() {
      return typeof this.value === "string" ? this.value.length : 0;
    },
    _allowSelection: function() {
      var type = this.type.toLowerCase();
      return  type === "text" || type === "search" || type === "tel" ||
              type === "url" || type === "password";
    },
    select: function() {
      if (!this._allowSelection()) {
        throw new DOMException(DOMException.INVALID_STATE_ERR);
      }

      this._selectionStart = 0;
      this._selectionEnd = this._getValueLength();
      this._selectionDirection = "none";
      this._dispatchSelectEvent();
    },
    get selectionStart() {
      if (!this._allowSelection()) {
        throw new DOMException(DOMException.INVALID_STATE_ERR);
      }

      return this._selectionStart;
    },
    set selectionStart(start) {
      this.setSelectionRange(start, Math.max(start, this._selectionEnd), this._selectionDirection);
    },
    get selectionEnd() {
      if(!this._allowSelection()) {
        throw new DOMException(DOMException.INVALID_STATE_ERR);
      }
      return this._selectionEnd;
    },
    set selectionEnd(end) {
      this.setSelectionRange(this._selectionStart, end, this._selectionDirection);
    },
    get selectionDirection() {
      if(!this._allowSelection()) {
        throw new DOMException(DOMException.INVALID_STATE_ERR);
      }
      return this._selectionDirection;
    },
    set selectionDirection(dir) {
      this.setSelectionRange(this._selectionStart, this._selectionEnd, dir);
    },
    setSelectionRange: function(start, end, dir) {
      if (!this._allowSelection()) {
        throw new DOMException(DOMException.INVALID_STATE_ERR);
      }

      this._selectionEnd = Math.min(end, this._getValueLength());
      this._selectionStart = Math.min(start, this._selectionEnd);
      this._selectionDirection = ((dir == "forward") || (dir == "backward")) ? dir : "none";
      this._dispatchSelectEvent();
    },

    setRangeText: function(repl, start, end, selectionMode) {
      if (arguments.length < 2) {
        start = this._selectionStart;
        end = this._selectionEnd;
      } else if (start > end) {
        throw new core.DOMException(core.INDEX_SIZE_ERR);
      }

      start = Math.min(start, this._getValueLength());
      end = Math.min(end, this._getValueLength());

      var val = this.value;
      var selStart = this._selectionStart;
      var selEnd = this._selectionEnd;

      this.value = val.slice(0, start) + repl + val.slice(end);

      var newEnd = start + this.value.length;

      if (selectionMode == "select") {
        this.setSelectionRange(start, newEnd);
      } else if(selectionMode === "start") {
        this.setSelectionRange(start, start);
      } else if(selectionMode === "end") {
        this.setSelectionRange(newEnd, newEnd);
      } else {//preserve
        var delta = repl.length - (end - start);

        if (selStart > end) {
          selStart += delta;
        } else if (selStart > start) {
          selStart = start;
        }

        if (selEnd > end) {
          selEnd += delta;
        } else if (selEnd > start) {
          selEnd = newEnd;
        }

        this.setSelectionRange(selStart, selEnd);
      }
    },

    _eventDefaults: {
      click: function (event) {
        var target = event.target;

        if (target.type === 'checkbox') {
          target.checked = !target.checked;
        } else if (target.type === 'radio') {
          target.checked = true;
        } else if (target.type === 'submit') {
          var form = this.form;
          if (form) {
            form._dispatchSubmitEvent();
          }
        }
      }
    }
  },
  attributes: [
    'accept',
    'accessKey',
    'align',
    'alt',
    {prop: 'disabled', type: 'boolean'},
    {prop: 'maxLength', type: 'long'},
    'name',
    {prop: 'readOnly', type: 'boolean'},
    {prop: 'size', type: 'long'},
    'src',
    {prop: 'tabIndex', type: 'long'},
    {prop: 'type', normalize: function(val) {
        return val ? val.toLowerCase() : 'text';
    }},
    'useMap'
  ]
});

define('HTMLTextAreaElement', {
  tagName: 'TEXTAREA',
  init: function() {
    this._selectionStart = this._selectionEnd = 0;
    this._selectionDirection = "none";
  },
  proto: {
    _apiValue: null,
    _dirtyValue: false,
    // "raw value" and "value" are not used here because jsdom has no GUI
    _formReset: function() {
      this._apiValue = null;
      this._dirtyValue = false;
    },
    get form() {
      return closest(this, 'FORM');
    },
    get defaultValue() {
      return this.textContent;
    },
    set defaultValue(val) {
      this.textContent = val;
    },
    get value() {
      // The WHATWG specifies that when "textContent" changes, the "raw value"
      // (just the API value in jsdom) must also be updated.
      // This slightly different solution has identical results, but is a lot less complex.
      if (this._dirtyValue) {
        if (this._apiValue === null) {
          return '';
        }
        return this._apiValue;
      }

      var val = this.defaultValue;
      val = val.replace(/\r\n|\r/g, '\n'); // API value normalizes line breaks per WHATWG
      return val;
    },
    set value(val) {
      if (val) {
        val = val.replace(/\r\n|\r/g, '\n'); // API value normalizes line breaks per WHATWG
      }

      this._dirtyValue = true;
      this._apiValue = val;

      this._selectionStart = 0;
      this._selectionEnd = 0;
      this._selectionDirection = 'none';
    },
    get textLength() {
      return this.value.length; // code unit length (16 bit)
    },
    get type() {
      return 'textarea';
    },
    blur : function() {
      this._ownerDocument.activeElement = this._ownerDocument.body;
    },
    focus : function() {
      this._ownerDocument.activeElement = this;
    },

    //LIVING
    _dispatchSelectEvent: function() {
      var event = this._ownerDocument.createEvent("HTMLEvents");
      event.initEvent("select", true, true);
      this.dispatchEvent(event);
    },
    _getValueLength: function() {
      return typeof this.value == "string" ? this.value.length : 0;
    },
    select: function() {
      this._selectionStart = 0;
      this._selectionEnd = this._getValueLength();
      this._selectionDirection = "none";
      this._dispatchSelectEvent();
    },
    get selectionStart() {
      return this._selectionStart;
    },
    set selectionStart(start) {
      this.setSelectionRange(start, Math.max(start, this._selectionEnd), this._selectionDirection);
    },
    get selectionEnd() {
      return this._selectionEnd;
    },
    set selectionEnd(end) {
      this.setSelectionRange(this._selectionStart, end, this._selectionDirection);
    },
    get selectionDirection() {
      return this._selectionDirection;
    },
    set selectionDirection(dir) {
      this.setSelectionRange(this._selectionStart, this._selectionEnd, dir);
    },
    setSelectionRange: function(start, end, dir) {
      this._selectionEnd = Math.min(end, this._getValueLength());
      this._selectionStart = Math.min(start, this._selectionEnd);
      this._selectionDirection = ((dir == "forward") || (dir == "backward")) ? dir : "none";
      this._dispatchSelectEvent();
    },
    setRangeText: function(repl, start, end, selectionMode) {
      if (arguments.length < 2) {
        start = this._selectionStart;
        end = this._selectionEnd;
      } else if (start > end) {
        throw new core.DOMException(core.INDEX_SIZE_ERR);
      }

      start = Math.min(start, this._getValueLength());
      end = Math.min(end, this._getValueLength());

      var val = this.value;
      var selStart = this._selectionStart;
      var selEnd = this._selectionEnd;

      this.value = val.slice(0, start) + repl + val.slice(end);

      var newEnd = start + this.value.length;

      if (selectionMode === "select") {
        this.setSelectionRange(start, newEnd);
      } else if (selectionMode === "start") {
        this.setSelectionRange(start, start);
      } else if (selectionMode === "end") {
        this.setSelectionRange(newEnd, newEnd);
      } else {//preserve
        var delta = repl.length - (end-start);

        if(selStart > end) {
          selStart += delta;
        } else if(selStart > start) {
          selStart = start;
        }

        if (selEnd > end) {
          selEnd += delta;
        } else if (selEnd > start) {
          selEnd = newEnd;
        }

        this.setSelectionRange(selStart, selEnd);
      }
    }
  },
  attributes: [
    'accessKey',
    {prop: 'cols', type: 'long'},
    {prop: 'disabled', type: 'boolean'},
    {prop: 'maxLength', type: 'long'},
    'name',
    {prop: 'readOnly', type: 'boolean'},
    {prop: 'rows', type: 'long'},
    {prop: 'tabIndex', type: 'long'}
  ]
});

define('HTMLButtonElement', {
  tagName: 'BUTTON',
  proto: {
    get form() {
      return closest(this, 'FORM');
    },
    _eventDefaults: {
      click: function (event) {
        var target = event.target;
        var form = target.form;
        if (form) {
          if (target.type === 'submit') {
            form._dispatchSubmitEvent();
          }
        }
      }
    },
    get type() {
      const typeAttr = (this.getAttribute('type') || '').toLowerCase();
      switch (typeAttr) {
        case 'submit':
        case 'reset':
        case 'button':
        case 'menu':
          return typeAttr;
        default:
          return 'submit';
      }
    },
    set type(v) {
      v = String(v).toLowerCase();
      switch (v) {
        case 'submit':
        case 'reset':
        case 'button':
        case 'menu':
          this.setAttribute('type', v);
          break;
        default:
          this.setAttribute('type', 'submit');
          break;
      }
    }
  },
  attributes: [
    'accessKey',
    {prop: 'disabled', type: 'boolean'},
    'name',
    {prop: 'tabIndex', type: 'long'},
    'value'
  ]
});

define('HTMLLabelElement', {
  tagName: 'LABEL',
  proto: {
    get form() {
      return closest(this, 'FORM');
    }
  },
  attributes: [
    'accessKey',
    {prop: 'htmlFor', attr: 'for'}
  ]
});

define('HTMLFieldSetElement', {
  tagName: 'FIELDSET',
  proto: {
    get form() {
      return closest(this, 'FORM');
    }
  }
});

define('HTMLLegendElement', {
  tagName: 'LEGEND',
  proto: {
    get form() {
      return closest(this, 'FORM');
    }
  },
  attributes: [
    'accessKey',
    'align'
  ]
});

define('HTMLUListElement', {
  tagName: 'UL',
  attributes: [
    {prop: 'compact', type: 'boolean'},
    'type'
  ]
});

define('HTMLOListElement', {
  tagName: 'OL',
  attributes: [
    {prop: 'compact', type: 'boolean'},
    {prop: 'start', type: 'long'},
    'type'
  ]
});

define('HTMLDListElement', {
  tagName: 'DL',
  attributes: [
    {prop: 'compact', type: 'boolean'}
  ]
});

define('HTMLDirectoryElement', {
  tagName: 'DIR',
  attributes: [
    {prop: 'compact', type: 'boolean'}
  ]
});

define('HTMLMenuElement', {
  tagName: 'MENU',
  attributes: [
    {prop: 'compact', type: 'boolean'}
  ]
});

define('HTMLLIElement', {
  tagName: 'LI',
  attributes: [
    'type',
    {prop: 'value', type: 'long'}
  ]
});

define('HTMLCanvasElement', {
  tagName: 'CANVAS',
  init() {
    let Canvas;
    try {
      Canvas = require("canvas");
    } catch (e) {}

    if (typeof Canvas === "function") { // in browserify, the require will succeed but return an empty object
      this._nodeCanvas = new Canvas(this.width, this.height);
    }
  },
  proto: {
    _attrModified(name, value, oldValue) {
      if ((name == "width" || name === "height") && this._nodeCanvas) {
        const Canvas = require("canvas");
        this._nodeCanvas = new Canvas(this.width, this.height);
      }

      return core.HTMLElement.prototype._attrModified.apply(this, arguments);
    },
    getContext(contextId) {
      if (this._nodeCanvas) {
        return this._nodeCanvas.getContext(contextId) || null;
      }

      notImplemented("HTMLCanvasElement.prototype.getContext (without installing the canvas npm package)",
        this._ownerDocument._defaultView);
    },
    probablySupportsContext(contextId) {
      if (this._nodeCanvas) {
        return contextId === "2d";
      }
      return false;
    },
    setContext(context) {
      notImplemented("HTMLCanvasElement.prototype.setContext");
    },
    toDataURL() {
      if (this._nodeCanvas) {
        return this._nodeCanvas.toDataURL.apply(this._nodeCanvas, arguments);
      }

      notImplemented("HTMLCanvasElement.prototype.toDataURL (without installing the canvas npm package)",
        this._ownerDocument._defaultView);
    },
    get width() {
      const parsed = parseInt(this.getAttribute("width"));
      return (parsed < 0 || Number.isNaN(parsed)) ? 300 : parsed;
    },
    set width(v) {
      v = parseInt(v);
      v = (Number.isNaN(v) || v < 0) ? 300 : v;
      this.setAttribute("width", v);
    },
    get height() {
      const parsed = parseInt(this.getAttribute("height"));
      return (parsed < 0 || Number.isNaN(parsed)) ? 150 : parsed;
    },
    set height(v) {
      v = parseInt(v);
      v = (Number.isNaN(v) || v < 0) ? 150 : v;
      this.setAttribute("height", v);
    }
  }
});

define('HTMLDivElement', {
  tagName: 'DIV',
  attributes: [
    'align'
  ]
});

define('HTMLParagraphElement', {
  tagName: 'P',
  attributes: [
    'align'
  ]
});

define('HTMLHeadingElement', {
  tagNames: ['H1','H2','H3','H4','H5','H6'],
  attributes: [
    'align'
  ]
});

define('HTMLQuoteElement', {
  tagNames: ['Q','BLOCKQUOTE'],
  attributes: [
    'cite'
  ]
});

define('HTMLPreElement', {
  tagName: 'PRE',
  attributes: [
    {prop: 'width', type: 'long'}
  ]
});

define('HTMLBRElement', {
  tagName: 'BR',
  attributes: [
    'clear'
  ]
});

define('HTMLBaseFontElement', {
  tagName: 'BASEFONT',
  attributes: [
    'color',
    'face',
    {prop: 'size', type: 'long'}
  ]
});

define('HTMLFontElement', {
  tagName: 'FONT',
  attributes: [
    'color',
    'face',
    'size'
  ]
});

define('HTMLHRElement', {
  tagName: 'HR',
  attributes: [
    'align',
    {prop: 'noShade', type: 'boolean'},
    'size',
    'width'
  ]
});

define('HTMLModElement', {
  tagNames: ['INS', 'DEL'],
  attributes: [
    'cite',
    'dateTime'
  ]
});

define('HTMLAnchorElement', {
  tagName: 'A',

  init: function () {
    mixinURLUtils(this, function getTheBase() {
      return documentBaseURL(this._ownerDocument);
    }, function updateSteps(value) {
      this.setAttribute("href", value);
    });
  },

  proto: {
    _attrModified: function(name, value, oldVal) {
      if (name === 'href') {
        whatwgUrl.setTheInput(this, value);
      }

      core.HTMLElement.prototype._attrModified.call(this, name, value, oldVal);
    },
  },

  attributes: [
    'accessKey',
    'charset',
    'coords',
    'hreflang',
    'name',
    'rel',
    'rev',
    'shape',
    {prop: 'tabIndex', type: 'long'},
    'target',
    'type'
  ]
});

define('HTMLImageElement', {
  tagName: 'IMG',
  proto: {
    _attrModified: function(name, value, oldVal) {
      if (name == 'src' && value !== oldVal) {
        resourceLoader.enqueue(this, null, function () { })();
      }

      core.HTMLElement.prototype._attrModified.call(this, name, value, oldVal);
    },
    get [accept]() {
      return "image/png,image/*;q=0.8,*/*;q=0.5";
    },
    get src() {
      return resourceLoader.resolveResourceUrl(this._ownerDocument, this.getAttribute('src'));
    }
  },
  attributes: [
    'name',
    'align',
    'alt',
    'border',
    {prop: 'height', type: 'long'},
    {prop: 'hspace', type: 'long'},
    {prop: 'isMap', type: 'boolean'},
    'longDesc',
    {prop: 'src', type: 'string', read: false},
    'useMap',
    {prop: 'vspace', type: 'long'},
    {prop: 'width', type: 'long'}
  ]
});

define('HTMLObjectElement', {
  tagName: 'OBJECT',
  proto: {
    get form() {
      return closest(this, 'FORM');
    },
    get contentDocument() {
      return null;
    }
  },
  attributes: [
    'code',
    'align',
    'archive',
    'border',
    'codeBase',
    'codeType',
    'data',
    {prop: 'declare', type: 'boolean'},
    {prop: 'height',  type: 'long'},
    {prop: 'hspace',  type: 'long'},
    'name',
    'standby',
    {prop: 'tabIndex', type: 'long'},
    'type',
    'useMap',
    {prop: 'vspace', type: 'long'},
    {prop: 'width', type: 'long'}
  ]
});

define('HTMLParamElement', {
  tagName: 'PARAM',
  attributes: [
    'name',
    'type',
    'value',
    'valueType'
  ]
});

define('HTMLAppletElement', {
  tagName: 'APPLET',
  attributes: [
    'align',
    'alt',
    'archive',
    'code',
    'codeBase',
    'height',
    {prop: 'hspace', type: 'long'},
    'name',
    'object',
    {prop: 'vspace', type: 'long'},
    'width'
  ]
});

define('HTMLMapElement', {
  tagName: 'MAP',
  proto: {
    get areas() {
      return this.getElementsByTagName("AREA");
    }
  },
  attributes: [
    'name'
  ]
});

define('HTMLAreaElement', {
  tagName: 'AREA',
  attributes: [
    'accessKey',
    'alt',
    'coords',
    'href',
    {prop: 'noHref', type: 'boolean'},
    'shape',
    {prop: 'tabIndex', type: 'long'},
    'target'
  ]
});

define('HTMLScriptElement', {
  tagName: 'SCRIPT',
  init: function() {
    this.addEventListener('DOMNodeInsertedIntoDocument', function() {
      if (this.src) {
        resourceLoader.load(this, this.src, this._eval);
      }
      else {
        resourceLoader.enqueue(this, this._ownerDocument.URL, this._eval)(null, this.text);
      }
    });
  },
  proto: {
    _eval: function(text, filename) {
      if (this._ownerDocument.implementation._hasFeature("ProcessExternalResources", "script") &&
          this.language                                                                      &&
          core.languageProcessors[this.language])
      {
        this._ownerDocument._writeAfterElement = this;
        core.languageProcessors[this.language](this, text, filename);
        delete this._ownerDocument._writeAfterElement;
      }
    },
    get language() {
      var type = this.type || "text/javascript";
      return type.split("/").pop().toLowerCase();
    },
    get text() {
      let text = '';
      for (const child of domSymbolTree.childrenIterator(this)) {
        text += child.nodeValue;
      }
      return text;
    },
    set text(text) {
      for (let child = null; child = domSymbolTree.firstChild(this);) {
        this.removeChild(child);
      }
      this.appendChild(this._ownerDocument.createTextNode(text));
    }
  },
  attributes : [
    {prop: 'defer', 'type': 'boolean'},
    'htmlFor',
    'event',
    'charset',
    'type',
    'src'
  ]
})

define('HTMLTableElement', {
  tagName: 'TABLE',
  proto: {
    get caption() {
      return firstChild(this, 'CAPTION');
    },
    get tHead() {
      return firstChild(this, 'THEAD');
    },
    get tFoot() {
      return firstChild(this, 'TFOOT');
    },
    get rows() {
      if (!this._rows) {
        var table = this;
        this._rows = createHTMLCollection(this._ownerDocument, function() {
          const sections = [];
          if (table.tHead) {
            sections.push(table.tHead);
          }
          sections.push.apply(sections, table.tBodies);
          if (table.tFoot) {
            sections.push(table.tFoot);
          }

          if (sections.length === 0) {
            return domSymbolTree.childrenToArray(table, {filter: function(el) {
              return el.tagName === 'TR';
            }});
          }

          const rows = [];
          for (const s of sections) {
            rows.push.apply(rows, s.rows);
          }
          return rows;
        });
      }
      return this._rows;
    },
    get tBodies() {
      if (!this._tBodies) {
        this._tBodies = descendants(this, 'TBODY', false);
      }
      return this._tBodies;
    },
    createTHead: function() {
      var el = this.tHead;
      if (!el) {
        el = this._ownerDocument.createElement('THEAD');
        this.appendChild(el);
      }
      return el;
    },
    deleteTHead: function() {
      var el = this.tHead;
      if (el) {
        domSymbolTree.parent(el).removeChild(el);
      }
    },
    createTFoot: function() {
      var el = this.tFoot;
      if (!el) {
        el = this._ownerDocument.createElement('TFOOT');
        this.appendChild(el);
      }
      return el;
    },
    deleteTFoot: function() {
      var el = this.tFoot;
      if (el) {
        domSymbolTree.parent(el).removeChild(el);
      }
    },
    createCaption: function() {
      var el = this.caption;
      if (!el) {
        el = this._ownerDocument.createElement('CAPTION');
        this.appendChild(el);
      }
      return el;
    },
    deleteCaption: function() {
      var c = this.caption;
      if (c) {
        domSymbolTree.parent(c).removeChild(c);
      }
    },
    insertRow: function(index) {
      var tr = this._ownerDocument.createElement('TR');

      if (!domSymbolTree.hasChildren(this)) {
        this.appendChild(this._ownerDocument.createElement('TBODY'));
      }
      var rows = this.rows;
      if (index < -1 || index > rows.length) {
        throw new core.DOMException(core.DOMException.INDEX_SIZE_ERR);
      }
      if (index === -1 || (index === 0 && rows.length === 0)) {
        this.tBodies.item(0).appendChild(tr);
      }
      else if (index === rows.length) {
        var ref = rows[index-1];
        domSymbolTree.parent(ref).appendChild(tr);
      }
      else {
        var ref = rows[index];
        domSymbolTree.parent(ref).insertBefore(tr, ref);
      }
      return tr;
    },
    deleteRow: function(index) {
      var rows = this.rows, l = rows.length;
      if (index === -1) {
        index = l-1;
      }
      if (index < 0 || index >= l) {
        throw new core.DOMException(core.DOMException.INDEX_SIZE_ERR);
      }
      var tr = rows[index];
      domSymbolTree.parent(tr).removeChild(tr);
    }
  },
  attributes: [
    'align',
    'bgColor',
    'border',
    'cellPadding',
    'cellSpacing',
    'frame',
    'rules',
    'summary',
    'width'
  ]
});

define('HTMLTableCaptionElement', {
  tagName: 'CAPTION',
  attributes: [
    'align'
  ]
});

define('HTMLTableColElement', {
  tagNames: ['COL','COLGROUP'],
  attributes: [
    { prop: 'span', type: 'long' },
    'align',
    { prop: 'ch', attr: 'char' },
    { prop: 'chOff', attr: 'charoff' },
    'vAlign',
    'width'
  ]
});

define('HTMLTableSectionElement', {
  tagNames: ['THEAD','TBODY','TFOOT'],
  proto: {
    get rows() {
      if (!this._rows) {
        this._rows = descendants(this, 'TR', false);
      }
      return this._rows;
    },
    insertRow: function(index) {
      var tr = this._ownerDocument.createElement('TR');
      var rows = this.rows;
      if (index < -1 || index > rows.length) {
        throw new core.DOMException(core.DOMException.INDEX_SIZE_ERR);
      }
      if (index === -1 || index === rows.length) {
        this.appendChild(tr);
      }
      else {
        var ref = rows[index];
        this.insertBefore(tr, ref);
      }
      return tr;
    },
    deleteRow: function(index) {
      var rows = this.rows;
      if (index === -1) {
        index = rows.length-1;
      }
      if (index < 0 || index >= rows.length) {
        throw new core.DOMException(core.DOMException.INDEX_SIZE_ERR);
      }
      var tr = this.rows[index];
      this.removeChild(tr);
    }
  },
  attributes: [
    'align',
    {prop: 'ch', attr: 'char'},
    {prop: 'chOff', attr: 'charoff'},
    'vAlign'
  ]
});

define('HTMLTableRowElement', {
  tagName: 'TR',
  proto: {
    get cells() {
      if (!this._cells) {
        this._cells = createHTMLCollection(this, mapper(this, function(n) {
          return n.nodeName === 'TD' || n.nodeName === 'TH';
        }, false));
      }
      return this._cells;
    },
    get rowIndex() {
      var table = closest(this, 'TABLE');
      return table ? Array.prototype.indexOf.call(table.rows, this) : -1;
    },

    get sectionRowIndex() {
      return Array.prototype.indexOf.call(domSymbolTree.parent(this).rows, this);
    },
    insertCell: function(index) {
      var td = this._ownerDocument.createElement('TD');
      var cells = this.cells;
      if (index < -1 || index > cells.length) {
        throw new core.DOMException(core.DOMException.INDEX_SIZE_ERR);
      }
      if (index === -1 || index === cells.length) {
        this.appendChild(td);
      }
      else {
        var ref = cells[index];
        this.insertBefore(td, ref);
      }
      return td;
    },
    deleteCell: function(index) {
      var cells = this.cells;
      if (index === -1) {
        index = cells.length-1;
      }
      if (index < 0 || index >= cells.length) {
        throw new core.DOMException(core.DOMException.INDEX_SIZE_ERR);
      }
      var td = this.cells[index];
      this.removeChild(td);
    }
  },
  attributes: [
    'align',
    { prop: 'ch', attr: 'char' },
    { prop: 'chOff', attr: 'charoff' },
    'vAlign',
    'bgColor'
  ]
});

define('HTMLTableCellElement', {
  init() {
    this._headers = null;
  },
  proto: {
    set headers(h) {
      if (h === '') {
        //Handle resetting headers so the dynamic getter returns a query
        this._headers = null;
        return;
      }
      if (!(h instanceof Array)) {
        h = [h];
      }
      this._headers = h;
    },
    get headers() {
      if (this._headers) {
        return this._headers.join(' ');
      }
      var cellIndex = this.cellIndex,
          headings  = [],
          siblings  = domSymbolTree.parent(this).getElementsByTagName(this.tagName);

      for (var i=0; i<siblings.length; i++) {
        if (siblings.item(i).cellIndex >= cellIndex) {
          break;
        }
        headings.push(siblings.item(i).id);
      }
      this._headers = headings;
      return headings.join(' ');
    },
    get cellIndex() {
      return Array.prototype.indexOf.call(closest(this, 'TR').cells, this);
    }
  },
  attributes: [
    { prop: 'colSpan', type: 'long' },
    { prop: 'rowSpan', type: 'long' },
    'align',
    'axis',
    'height',
    'width',
    { prop: 'ch', attr: 'char' },
    { prop: 'chOff', attr: 'charoff' },
    { prop: 'noWrap', type: 'boolean' },
    'vAlign',
    'bgColor'
  ]
});

define('HTMLTableDataCellElement', {
  tagName: 'TD',
  parentClass: core.HTMLTableCellElement,
  attributes: [
    'abbr'
  ]
});

define('HTMLTableHeaderCellElement', {
  tagName: 'TH',
  parentClass: core.HTMLTableCellElement,
  attributes: [
    'scope',
    'abbr',
    'sorted'
  ]
});

define('HTMLFrameSetElement', {
  tagName: 'FRAMESET',
  attributes: [
    'cols',
    'rows'
  ]
});

function loadFrame (frame) {
  if (frame._contentDocument) {
    if (frame._contentDocument.defaultView) {
      // close calls delete on its document.
      frame._contentDocument.defaultView.close();
    } else {
      delete frame._contentDocument;
    }
  }

  var parentDoc = frame._ownerDocument;

  // https://html.spec.whatwg.org/#process-the-iframe-attributes
  let url;
  const srcAttribute = getAttributeValue(frame, "src");
  if (srcAttribute === null || srcAttribute === "") {
    url = new URL("about:blank");
  } else {
    try {
      url = new URL(srcAttribute, documentBaseURL(parentDoc));
    } catch (e) {
      url = new URL("about:blank");
    }
  }

  var wnd = new Window({
    parsingMode: 'html',
    url: url.protocol === 'javascript:' || url.href === 'about:blank' ? parentDoc.URL : url.href,
    cookieJar: parentDoc._cookieJar
  });
  var contentDoc = frame._contentDocument = wnd.document;
  applyDocumentFeatures(contentDoc, parentDoc.implementation._features);

  var parent = parentDoc.defaultView;
  var contentWindow = contentDoc.defaultView;
  contentWindow._parent = parent;
  contentWindow._top = parent.top;
  contentWindow._virtualConsole = parent._virtualConsole;

  // Handle about:blank with a simulated load of an empty document.
  if (url.href === 'about:blank') {
    // Cannot be done inside the enqueued callback; the documentElement etc. need to be immediately available.
    contentDoc.write("<html><head></head><body></body></html>");
    contentDoc.close();
    resourceLoader.enqueue(frame, undefined, function () { })(); // to fire the load event
  } else if (url.protocol === 'javascript:') {
    // Cannot be done inside the enqueued callback; the documentElement etc. need to be immediately available.
    contentDoc.write("<html><head></head><body></body></html>");
    contentDoc.close();
    contentWindow.eval(url.pathname);
    resourceLoader.enqueue(frame, undefined, function () { })(); // to fire the load event
  } else {
    resourceLoader.load(frame, url.href, function(html) {
      contentDoc.write(html);
      contentDoc.close();
    });
  }
}

function refreshAccessors(document) {
  var window = document._defaultView;

  if (!window) {
    return;
  }

  var frames = document.querySelectorAll("iframe,frame");

  // delete accessors for all frames
  for (var i = 0; i < window._length; ++i) {
    delete window[i];
  }

  window._length = frames.length;
  Array.prototype.forEach.call(frames, function (frame, i) {
    defineGetter(window, i, function () { return frame.contentWindow; });
  });
}

define('HTMLFrameElement', {
  tagName: 'FRAME',
  proto: {
    _attrModified: function (name, value, oldVal) {
      core.HTMLElement.prototype._attrModified.call(this, name, value, oldVal);
      if (name === 'src') {
        // iframe should never load in a document without a Window
        // (e.g. implementation.createHTMLDocument)
        if (this._attached && this._ownerDocument._defaultView) {
          loadFrame(this);
        }
      }
    },

    _detach: function () {
      core.HTMLElement.prototype._detach.call(this);

      if (this.contentWindow) {
        this.contentWindow.close();
      }

      refreshAccessors(this._ownerDocument);
    },

    _attach: function () {
      core.HTMLElement.prototype._attach.call(this);

      if (this._ownerDocument._defaultView) {
        loadFrame(this);
      }
      refreshAccessors(this._ownerDocument);
    },

    _contentDocument : null,
    get contentDocument() {
      return this._contentDocument;
    },
    get contentWindow() {
      return this.contentDocument ? this.contentDocument.defaultView : null;
    }
  },
  attributes: [
    'frameBorder',
    'longDesc',
    'marginHeight',
    'marginWidth',
    'name',
    {prop: 'noResize', type: 'boolean'},
    'scrolling',
    {prop: 'src', type: 'string', write: false}
  ]
});

define('HTMLIFrameElement', {
  tagName: 'IFRAME',
  parentClass: core.HTMLFrameElement,
  attributes: [
    'align',
    'frameBorder',
    'height',
    'longDesc',
    'marginHeight',
    'marginWidth',
    'name',
    'scrolling',
    'src',
    'width'
  ]
});

// HTMLMediaElement and HTMLVideoElement back-ported from Facebook's Jest project:
// https://github.com/tmpvar/jsdom/pull/1190
// They are not expected to be perfectly to-spec, and PRs to improve them over time are certainly appreciated.

function getTimeRangeDummy() {
  return {
    length: 0,
    start: function() { return 0; },
    end: function() { return 0; }
  };
}

define('HTMLMediaElement', {
  init: function() {
    this._muted = this.defaultMuted;
    this._volume = 1.0;
    this.readyState = 0;
  },
  proto: {
    // Implemented accoring to W3C Draft 22 August 2012
    set defaultPlaybackRate(v) {
      if (v === 0.0) {
        throw new core.DOMException(core.NOT_SUPPORTED_ERR);
      }
      if (this._defaultPlaybackRate !== v) {
        this._defaultPlaybackRate = v;
        this._dispatchRateChange();
      }
    },
    _dispatchRateChange: function() {
      var ev = this._ownerDocument.createEvent('HTMLEvents');
      ev.initEvent('ratechange', false, false);
      this.dispatchEvent(ev);
    },
    get defaultPlaybackRate() {
      if (this._defaultPlaybackRate === undefined) {
        return 1.0;
      }
      return this._defaultPlaybackRate;
    },
    get playbackRate() {
      if (this._playbackRate === undefined) {
        return 1.0;
      }
      return this._playbackRate;
    },
    set playbackRate(v) {
      if (v !== this._playbackRate) {
        this._playbackRate = v;
        this._dispatchRateChange();
      }
    },
    get muted() {
      return this._muted;
    },
    _dispatchVolumeChange: function() {
      var ev = this._ownerDocument.createEvent('HTMLEvents');
      ev.initEvent('volumechange', false, false);
      this.dispatchEvent(ev);
    },
    set muted(v) {
      if (v !== this._muted) {
        this._muted = v;
        this._dispatchVolumeChange();
      }
    },
    get defaultMuted() {
      return this.getAttribute('muted') !== null;
    },
    set defaultMuted(v) {
      if (v) {
        this.setAttribute('muted', v);
      } else {
        this.removeAttribute('muted');
      }
    },
    get volume() {
      return this._volume;
    },
    set volume(v) {
      if (v < 0 || v > 1) {
        throw new core.DOMException(core.INDEX_SIZE_ERR);
      }
      if (this._volume !== v) {
        this._volume = v;
        this._dispatchVolumeChange();
      }
    },

    // Not (yet) implemented according to spec
    // Should return sane default values
    currentSrc: '',
    buffered: getTimeRangeDummy(),
    networkState: 0,
    load: function() {
    },
    canPlayType: function() {
      return false;
    },
    seeking: false,
    duration: 0,
    startDate: NaN,
    paused: true,
    played: getTimeRangeDummy(),
    seekable: getTimeRangeDummy(),
    ended: false,
    play: function() {
    },
    pause: function() {
    },
    audioTracks: [],
    videoTracks: [],
    textTracks: [],
    addTextTrack: function() {
    }
  },
  attributes: [
    { prop: 'autoplay', type: 'boolean' },
    { prop: 'controls', type: 'boolean' },
    'crossOrigin',
    'currentTime',
    'preload',
    { prop: 'loop', type: 'boolean' },
    'mediaGroup',
  ]
});

addConstants(core.HTMLMediaElement, {
  NETWORK_EMPTY: 0,
  NETWORK_IDLE: 1,
  NETWORK_LOADED: 2,
  NETWORK_NO_SOURCE: 3,
  HAVE_NOTHING: 0,
  HAVE_METADATA: 1,
  HAVE_CURRENT_DATA: 2,
  HAVE_FUTURE_DATA: 3,
  HAVE_ENOUGH_DATA: 4
});

define('HTMLVideoElement', {
  tagName: 'VIDEO',
  parentClass: core.HTMLMediaElement,
  attributes: [
    { prop: 'height', type: 'long' },
    'poster',
    { prop: 'videoHeight', type: 'long' },
    { prop: 'videoWidth', type: 'long' },
    { prop: 'width', type: 'long' }
  ]
});

define('HTMLAudioElement', {
  tagName: 'AUDIO',
  parentClass: core.HTMLMediaElement
});

define('HTMLDataElement', {
  tagName: 'DATA',
  attributes: [
    'value'
  ]
});

define('HTMLSpanElement', { tagName: 'SPAN' });

define('HTMLTimeElement', {
  tagName: 'TIME',
  attributes: [
    'dateTime'
  ]
});

// The following are stubs simply so that we have the correct tag name <-> interface correspondences.
// Feel free to send PRs updating them!

define('HTMLDataListElement', { tagName: 'DATALIST' });

define('HTMLDialogElement', { tagName: 'DIALOG' });

define('HTMLEmbedElement', {
  tagName: 'EMBED',
  attributes: [
    'src',
    'type',
    { prop: 'width', type: 'long' },
    { prop: 'height', type: 'long' },
    'align',
    'name'
  ]
});

define('HTMLMeterElement', { tagName: 'METER' });

define('HTMLOutputElement', { tagName: 'OUTPUT' });

define('HTMLProgressElement', { tagName: 'PROGRESS' });

define('HTMLSourceElement', {
  tagName: 'SOURCE',
  attributes: [
    'src',
    'type',
    'srcset',
    'sizes',
    'media'
  ]
});

define('HTMLTemplateElement', {
  tagName: 'TEMPLATE',
  init() {
    // TODO: don't use this._ownerDocument; instead, create a new document
    this._templateContents = this._ownerDocument.createDocumentFragment();
  },
  proto: {
    get content() {
      return this._templateContents;
    },
    [cloningSteps](copy, node, document, cloneChildren) {
      if (!cloneChildren) {
        return;
      }

      for (const child of domSymbolTree.childrenIterator(node._templateContents)) {
        const childCopy = clone(core, child, copy._templateContents._ownerDocument, true);
        copy._templateContents.appendChild(childCopy);
      }
    }
  }
});

define('HTMLTrackElement', {
  tagName: 'TRACK',
  attributes: [
    'kind',
    'src',
    'srclang',
    'label',
    { prop: 'default', type: 'boolean' }
  ],
  proto: {
    get readyState() {
      return 0;
    }
  }
});

addConstants(core.HTMLTrackElement, {
  NONE: 0,
  LOADING: 1,
  LOADED: 2,
  ERROR: 3
});
