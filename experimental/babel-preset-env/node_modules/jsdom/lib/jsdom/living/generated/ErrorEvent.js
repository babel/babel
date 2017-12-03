"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../events/ErrorEvent-impl.js");

const Event = require("./Event.js");
const impl = utils.implSymbol;
const convertErrorEventInit = require("./ErrorEventInit").convert;

function ErrorEvent(type) {
  if (!this || this[impl] || !(this instanceof ErrorEvent)) {
    throw new TypeError("Failed to construct 'ErrorEvent': Please use the 'new' operator, this DOM object constructor cannot be called as a function.");
  }
  if (arguments.length < 1) {
    throw new TypeError("Failed to construct 'ErrorEvent': 1 argument required, but only " + arguments.length + " present.");
  }
  const args = [];
  for (let i = 0; i < arguments.length && i < 2; ++i) {
    args[i] = arguments[i];
  }
  args[0] = conversions["DOMString"](args[0]);
  args[1] = convertErrorEventInit(args[1]);

  module.exports.setup(this, args);
}
ErrorEvent.prototype = Object.create(Event.interface.prototype);
ErrorEvent.prototype.constructor = ErrorEvent;
Object.defineProperty(ErrorEvent.prototype, "message", {
  get() {
    return this[impl].message;
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(ErrorEvent.prototype, "filename", {
  get() {
    return this[impl].filename;
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(ErrorEvent.prototype, "lineno", {
  get() {
    return this[impl].lineno;
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(ErrorEvent.prototype, "colno", {
  get() {
    return this[impl].colno;
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(ErrorEvent.prototype, "error", {
  get() {
    return this[impl].error;
  },
  enumerable: true,
  configurable: true
});


module.exports = {
  is(obj) {
    return !!obj && obj[impl] instanceof Impl.implementation;
  },
  create(constructorArgs, privateData) {
    let obj = Object.create(ErrorEvent.prototype);
    this.setup(obj, constructorArgs, privateData);
    return obj;
  },
  setup(obj, constructorArgs, privateData) {
    if (!privateData) privateData = {};
    privateData.wrapper = obj;

    obj[impl] = new Impl.implementation(constructorArgs, privateData);
    obj[impl][utils.wrapperSymbol] = obj;
  },
  interface: ErrorEvent,
  expose: {
    Window: { ErrorEvent: ErrorEvent },
    Worker: { ErrorEvent: ErrorEvent }
  }
};

