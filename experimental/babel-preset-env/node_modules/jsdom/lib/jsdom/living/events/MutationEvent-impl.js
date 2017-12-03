"use strict";

const EventImpl = require("./Event-impl").implementation;

class MutationEventImpl extends EventImpl {
  initMutationEvent(type, bubbles, cancelable, relatedNode, prevValue, newValue, attrName, attrChange) {
    if (this._dispatchFlag) {
      return;
    }

    this.initEvent(type, bubbles, cancelable);
    this.relatedNode = relatedNode;
    this.prevValue = prevValue;
    this.newValue = newValue;
    this.attrName = attrName;
    this.attrChange = attrChange;
  }
}

module.exports = {
  implementation: MutationEventImpl
};
