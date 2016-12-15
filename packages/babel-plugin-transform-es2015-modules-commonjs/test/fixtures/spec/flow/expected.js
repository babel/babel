'use strict';

const exports = module.exports = Object.create ? Object.create(null, {
  __esModule: {
    value: true
  }
}) : {
  __esModule: true
};

if (typeof Symbol === "function" && Symbol.toStringTag) {
  Object.defineProperty(exports, Symbol.toStringTag, {
    value: "Module"
  });
}

(Object.freeze || Object)(exports);

const _foo = _specRequireInterop(require('foo'));

function _specImportCheck(module, imports) { if (!module.__esModule) throw new Error("Only ES modules can be checked"); var invalid = imports.filter(function (i) { return !Object.prototype.propertyIsEnumerable.call(module, i); }); if (invalid.length > 0) { var error = new Error("Unknown export" + (invalid.length > 1 ? "s " : " ") + JSON.stringify(invalid) + " imported"); error.module = module; throw error; } }

function _specRequireInterop(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = Object.create ? Object.create(null, { default: { value: obj, writable: true, enumerable: true }, __esModule: { value: true } }) : { default: obj, __esModule: true }; if (typeof Symbol === "function" && Symbol.toStringTag) { Object.defineProperty(newObj, Symbol.toStringTag, { value: "Module" }); } return (Object.freeze || Object)(newObj); } }

type ElementState = {
  tagExpr: Object // tag node
  ; tagName: string // raw string tag name
  ; args: Array<Object> // array of call arguments
  ; call?: Object // optional call property that can be set to override the call expression returned
  ; pre?: Function // function called with (state: ElementState) before building attribs
  ; post?: Function // function called with (state: ElementState) after building attribs
  ; };

type Foo = _foo.Foo;

_exports;

let _exports;