import _mapInstanceProperty from "core-js-pure/features/instance/map.js";
import _forEachInstanceProperty from "core-js-pure/features/instance/for-each.js";
import _Object$defineProperty from "core-js-pure/features/object/define-property.js";
import _pushInstanceProperty from "core-js-pure/features/instance/push.js";
import _indexOfInstanceProperty from "core-js-pure/features/instance/index-of.js";
import _spliceInstanceProperty from "core-js-pure/features/instance/splice.js";
import _Symbol$toStringTag from "core-js-pure/features/symbol/to-string-tag.js";
import _Object$assign from "core-js-pure/features/object/assign.js";
import _findInstanceProperty from "core-js-pure/features/instance/find.js";
import toArray from "./toArray.js";
import toPropertyKey from "./toPropertyKey.js";
function _decorate(e, r, t, i) {
  var _context;
  var o = _getDecoratorsApi();
  if (i) for (var n = 0; n < i.length; n++) o = i[n](o);
  var s = r(function (e) {
      o.initializeInstanceElements(e, a.elements);
    }, t),
    a = o.decorateClass(_coalesceClassElements(_mapInstanceProperty(_context = s.d).call(_context, _createElementDescriptor)), e);
  return o.initializeClassElements(s.F, a.elements), o.runClassFinishers(s.F, a.finishers);
}
function _getDecoratorsApi() {
  _getDecoratorsApi = function _getDecoratorsApi() {
    return e;
  };
  var e = {
    elementsDefinitionOrder: [["method"], ["field"]],
    initializeInstanceElements: function initializeInstanceElements(e, r) {
      var _context2;
      _forEachInstanceProperty(_context2 = ["method", "field"]).call(_context2, function (t) {
        _forEachInstanceProperty(r).call(r, function (r) {
          r.kind === t && "own" === r.placement && this.defineClassElement(e, r);
        }, this);
      }, this);
    },
    initializeClassElements: function initializeClassElements(e, r) {
      var _context3;
      var t = e.prototype;
      _forEachInstanceProperty(_context3 = ["method", "field"]).call(_context3, function (i) {
        _forEachInstanceProperty(r).call(r, function (r) {
          var o = r.placement;
          if (r.kind === i && ("static" === o || "prototype" === o)) {
            var n = "static" === o ? e : t;
            this.defineClassElement(n, r);
          }
        }, this);
      }, this);
    },
    defineClassElement: function defineClassElement(e, r) {
      var t = r.descriptor;
      if ("field" === r.kind) {
        var i = r.initializer;
        t = {
          enumerable: t.enumerable,
          writable: t.writable,
          configurable: t.configurable,
          value: void 0 === i ? void 0 : i.call(e)
        };
      }
      _Object$defineProperty(e, r.key, t);
    },
    decorateClass: function decorateClass(e, r) {
      var t = [],
        i = [],
        o = {
          "static": [],
          prototype: [],
          own: []
        };
      if (_forEachInstanceProperty(e).call(e, function (e) {
        this.addElementPlacement(e, o);
      }, this), _forEachInstanceProperty(e).call(e, function (e) {
        if (!_hasDecorators(e)) return _pushInstanceProperty(t).call(t, e);
        var r = this.decorateElement(e, o);
        _pushInstanceProperty(t).call(t, r.element), _pushInstanceProperty(t).apply(t, r.extras), _pushInstanceProperty(i).apply(i, r.finishers);
      }, this), !r) return {
        elements: t,
        finishers: i
      };
      var n = this.decorateConstructor(t, r);
      return _pushInstanceProperty(i).apply(i, n.finishers), n.finishers = i, n;
    },
    addElementPlacement: function addElementPlacement(e, r, t) {
      var i = r[e.placement];
      if (!t && -1 !== _indexOfInstanceProperty(i).call(i, e.key)) throw new TypeError("Duplicated element (" + e.key + ")");
      _pushInstanceProperty(i).call(i, e.key);
    },
    decorateElement: function decorateElement(e, r) {
      for (var t = [], i = [], o = e.decorators, n = o.length - 1; n >= 0; n--) {
        var s = r[e.placement];
        _spliceInstanceProperty(s).call(s, _indexOfInstanceProperty(s).call(s, e.key), 1);
        var a = this.fromElementDescriptor(e),
          l = this.toElementFinisherExtras((0, o[n])(a) || a);
        e = l.element, this.addElementPlacement(e, r), l.finisher && _pushInstanceProperty(i).call(i, l.finisher);
        var c = l.extras;
        if (c) {
          for (var p = 0; p < c.length; p++) this.addElementPlacement(c[p], r);
          _pushInstanceProperty(t).apply(t, c);
        }
      }
      return {
        element: e,
        finishers: i,
        extras: t
      };
    },
    decorateConstructor: function decorateConstructor(e, r) {
      for (var t = [], i = r.length - 1; i >= 0; i--) {
        var o = this.fromClassDescriptor(e),
          n = this.toClassDescriptor((0, r[i])(o) || o);
        if (void 0 !== n.finisher && _pushInstanceProperty(t).call(t, n.finisher), void 0 !== n.elements) {
          e = n.elements;
          for (var s = 0; s < e.length - 1; s++) for (var a = s + 1; a < e.length; a++) if (e[s].key === e[a].key && e[s].placement === e[a].placement) throw new TypeError("Duplicated element (" + e[s].key + ")");
        }
      }
      return {
        elements: e,
        finishers: t
      };
    },
    fromElementDescriptor: function fromElementDescriptor(e) {
      var r = {
        kind: e.kind,
        key: e.key,
        placement: e.placement,
        descriptor: e.descriptor
      };
      return _Object$defineProperty(r, _Symbol$toStringTag, {
        value: "Descriptor",
        configurable: !0
      }), "field" === e.kind && (r.initializer = e.initializer), r;
    },
    toElementDescriptors: function toElementDescriptors(e) {
      var _context4;
      if (void 0 !== e) return _mapInstanceProperty(_context4 = toArray(e)).call(_context4, function (e) {
        var r = this.toElementDescriptor(e);
        return this.disallowProperty(e, "finisher", "An element descriptor"), this.disallowProperty(e, "extras", "An element descriptor"), r;
      }, this);
    },
    toElementDescriptor: function toElementDescriptor(e) {
      var r = e.kind + "";
      if ("method" !== r && "field" !== r) throw new TypeError('An element descriptor\'s .kind property must be either "method" or "field", but a decorator created an element descriptor with .kind "' + r + '"');
      var t = toPropertyKey(e.key),
        i = e.placement + "";
      if ("static" !== i && "prototype" !== i && "own" !== i) throw new TypeError('An element descriptor\'s .placement property must be one of "static", "prototype" or "own", but a decorator created an element descriptor with .placement "' + i + '"');
      var o = e.descriptor;
      this.disallowProperty(e, "elements", "An element descriptor");
      var n = {
        kind: r,
        key: t,
        placement: i,
        descriptor: _Object$assign({}, o)
      };
      return "field" !== r ? this.disallowProperty(e, "initializer", "A method descriptor") : (this.disallowProperty(o, "get", "The property descriptor of a field descriptor"), this.disallowProperty(o, "set", "The property descriptor of a field descriptor"), this.disallowProperty(o, "value", "The property descriptor of a field descriptor"), n.initializer = e.initializer), n;
    },
    toElementFinisherExtras: function toElementFinisherExtras(e) {
      return {
        element: this.toElementDescriptor(e),
        finisher: _optionalCallableProperty(e, "finisher"),
        extras: this.toElementDescriptors(e.extras)
      };
    },
    fromClassDescriptor: function fromClassDescriptor(e) {
      var r = {
        kind: "class",
        elements: _mapInstanceProperty(e).call(e, this.fromElementDescriptor, this)
      };
      return _Object$defineProperty(r, _Symbol$toStringTag, {
        value: "Descriptor",
        configurable: !0
      }), r;
    },
    toClassDescriptor: function toClassDescriptor(e) {
      var r = e.kind + "";
      if ("class" !== r) throw new TypeError('A class descriptor\'s .kind property must be "class", but a decorator created a class descriptor with .kind "' + r + '"');
      this.disallowProperty(e, "key", "A class descriptor"), this.disallowProperty(e, "placement", "A class descriptor"), this.disallowProperty(e, "descriptor", "A class descriptor"), this.disallowProperty(e, "initializer", "A class descriptor"), this.disallowProperty(e, "extras", "A class descriptor");
      var t = _optionalCallableProperty(e, "finisher");
      return {
        elements: this.toElementDescriptors(e.elements),
        finisher: t
      };
    },
    runClassFinishers: function runClassFinishers(e, r) {
      for (var t = 0; t < r.length; t++) {
        var i = (0, r[t])(e);
        if (void 0 !== i) {
          if ("function" != typeof i) throw new TypeError("Finishers must return a constructor.");
          e = i;
        }
      }
      return e;
    },
    disallowProperty: function disallowProperty(e, r, t) {
      if (void 0 !== e[r]) throw new TypeError(t + " can't have a ." + r + " property.");
    }
  };
  return e;
}
function _createElementDescriptor(e) {
  var r,
    t = toPropertyKey(e.key);
  "method" === e.kind ? r = {
    value: e.value,
    writable: !0,
    configurable: !0,
    enumerable: !1
  } : "get" === e.kind ? r = {
    get: e.value,
    configurable: !0,
    enumerable: !1
  } : "set" === e.kind ? r = {
    set: e.value,
    configurable: !0,
    enumerable: !1
  } : "field" === e.kind && (r = {
    configurable: !0,
    writable: !0,
    enumerable: !0
  });
  var i = {
    kind: "field" === e.kind ? "field" : "method",
    key: t,
    placement: e["static"] ? "static" : "field" === e.kind ? "own" : "prototype",
    descriptor: r
  };
  return e.decorators && (i.decorators = e.decorators), "field" === e.kind && (i.initializer = e.value), i;
}
function _coalesceGetterSetter(e, r) {
  void 0 !== e.descriptor.get ? r.descriptor.get = e.descriptor.get : r.descriptor.set = e.descriptor.set;
}
function _coalesceClassElements(e) {
  for (var r = [], isSameElement = function isSameElement(e) {
      return "method" === e.kind && e.key === o.key && e.placement === o.placement;
    }, t = 0; t < e.length; t++) {
    var i,
      o = e[t];
    if ("method" === o.kind && (i = _findInstanceProperty(r).call(r, isSameElement))) {
      if (_isDataDescriptor(o.descriptor) || _isDataDescriptor(i.descriptor)) {
        if (_hasDecorators(o) || _hasDecorators(i)) throw new ReferenceError("Duplicated methods (" + o.key + ") can't be decorated.");
        i.descriptor = o.descriptor;
      } else {
        if (_hasDecorators(o)) {
          if (_hasDecorators(i)) throw new ReferenceError("Decorators can't be placed on different accessors with for the same property (" + o.key + ").");
          i.decorators = o.decorators;
        }
        _coalesceGetterSetter(o, i);
      }
    } else _pushInstanceProperty(r).call(r, o);
  }
  return r;
}
function _hasDecorators(e) {
  return e.decorators && e.decorators.length;
}
function _isDataDescriptor(e) {
  return void 0 !== e && !(void 0 === e.value && void 0 === e.writable);
}
function _optionalCallableProperty(e, r) {
  var t = e[r];
  if (void 0 !== t && "function" != typeof t) throw new TypeError("Expected '" + r + "' to be a function");
  return t;
}
export { _decorate as default };