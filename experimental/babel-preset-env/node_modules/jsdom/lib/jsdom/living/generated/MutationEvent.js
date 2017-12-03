"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../events/MutationEvent-impl.js");

const Event = require("./Event.js");
const impl = utils.implSymbol;

function MutationEvent() {
  throw new TypeError("Illegal constructor");
}
MutationEvent.prototype = Object.create(Event.interface.prototype);
MutationEvent.prototype.constructor = MutationEvent;

MutationEvent.prototype.initMutationEvent = function initMutationEvent(typeArg, bubblesArg, cancelableArg, relatedNodeArg, prevValueArg, newValueArg, attrNameArg, attrChangeArg) {
  if (!this || !module.exports.is(this)) {
    throw new TypeError("Illegal invocation");
  }
  if (arguments.length < 8) {
    throw new TypeError("Failed to execute 'initMutationEvent' on 'MutationEvent': 8 arguments required, but only " + arguments.length + " present.");
  }
  const args = [];
  for (let i = 0; i < arguments.length && i < 8; ++i) {
    args[i] = arguments[i];
  }
  args[0] = conversions["DOMString"](args[0]);
  args[1] = conversions["boolean"](args[1]);
  args[2] = conversions["boolean"](args[2]);
  args[4] = conversions["DOMString"](args[4]);
  args[5] = conversions["DOMString"](args[5]);
  args[6] = conversions["DOMString"](args[6]);
  args[7] = conversions["unsigned short"](args[7]);
  return this[impl].initMutationEvent.apply(this[impl], args);
};
Object.defineProperty(MutationEvent, "MODIFICATION", {
  value: 1,
  enumerable: true
});
Object.defineProperty(MutationEvent.prototype, "MODIFICATION", {
  value: 1,
  enumerable: true
});

Object.defineProperty(MutationEvent, "ADDITION", {
  value: 2,
  enumerable: true
});
Object.defineProperty(MutationEvent.prototype, "ADDITION", {
  value: 2,
  enumerable: true
});

Object.defineProperty(MutationEvent, "REMOVAL", {
  value: 3,
  enumerable: true
});
Object.defineProperty(MutationEvent.prototype, "REMOVAL", {
  value: 3,
  enumerable: true
});

Object.defineProperty(MutationEvent.prototype, "relatedNode", {
  get() {
    return this[impl].relatedNode;
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(MutationEvent.prototype, "prevValue", {
  get() {
    return this[impl].prevValue;
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(MutationEvent.prototype, "newValue", {
  get() {
    return this[impl].newValue;
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(MutationEvent.prototype, "attrName", {
  get() {
    return this[impl].attrName;
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(MutationEvent.prototype, "attrChange", {
  get() {
    return this[impl].attrChange;
  },
  enumerable: true,
  configurable: true
});


module.exports = {
  is(obj) {
    return !!obj && obj[impl] instanceof Impl.implementation;
  },
  create(constructorArgs, privateData) {
    let obj = Object.create(MutationEvent.prototype);
    this.setup(obj, constructorArgs, privateData);
    return obj;
  },
  setup(obj, constructorArgs, privateData) {
    if (!privateData) privateData = {};
    privateData.wrapper = obj;

    obj[impl] = new Impl.implementation(constructorArgs, privateData);
    obj[impl][utils.wrapperSymbol] = obj;
  },
  interface: MutationEvent,
  expose: {
    Window: { MutationEvent: MutationEvent }
  }
};

