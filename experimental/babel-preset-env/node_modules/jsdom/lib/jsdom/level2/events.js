"use strict";
/* DOM Level2 Events implemented as described here:
 *
 * http://www.w3.org/TR/2000/REC-DOM-Level-2-Events-20001113/events.html
 *
 */
var core = require("../level1/core"),
    utils = require("../utils"),
    defineGetter = utils.defineGetter,
    defineSetter = utils.defineSetter,
    inheritFrom = utils.inheritFrom;

// The dependencies here are a bit screwy; when we get a chance to move all events to living, things will get simpler.
const Event = require("../living/generated/Event");
const CustomEvent = require("../living/generated/CustomEvent");
const MessageEvent = require("../living/generated/MessageEvent");
const ErrorEvent = require("../living/generated/ErrorEvent");
const HashChangeEvent = require("../living/generated/HashChangeEvent");
const UIEvent = require("../living/generated/UIEvent");
const MouseEvent = require("../living/generated/MouseEvent");
const KeyboardEvent = require("../living/generated/KeyboardEvent");
const TouchEvent = require("../living/generated/TouchEvent");
const MutationEvent = require("../living/generated/MutationEvent");
const ProgressEvent = require("../living/generated/ProgressEvent");
const domSymbolTree = require("../living/helpers/internal-constants").domSymbolTree;
const NODE_TYPE = require("../living/node-type");

core.Event = Event.interface;
core.CustomEvent = CustomEvent.interface;
core.MessageEvent = MessageEvent.interface;
core.ErrorEvent = ErrorEvent.interface;
core.HashChangeEvent = HashChangeEvent.interface;
core.UIEvent = UIEvent.interface;
core.MouseEvent = MouseEvent.interface;
core.KeyboardEvent = KeyboardEvent.interface;
core.TouchEvent = TouchEvent.interface;
core.MutationEvent = MutationEvent.interface;
core.ProgressEvent = ProgressEvent.interface;

core.EventTarget = require('../living/generated/EventTarget').interface;

// Reinherit class heirarchy with EventTarget at its root
inheritFrom(core.EventTarget, core.Node, core.Node.prototype);

// Node
inheritFrom(core.Node, core.Document, core.Document.prototype);
inheritFrom(core.Node, core.DocumentFragment, core.DocumentFragment.prototype);
inheritFrom(core.Node, core.Element, core.Element.prototype);


function getDocument(el) {
  return el.nodeType == NODE_TYPE.DOCUMENT_NODE ? el : el._ownerDocument;
}

function mutationEventsEnabled(el) {
  return el.nodeType != NODE_TYPE.ATTRIBUTE_NODE &&
         getDocument(el).implementation._hasFeature('MutationEvents');
}

var insertBefore_super = core.Node.prototype.insertBefore;
core.Node.prototype.insertBefore = function(newChild, refChild) {
  var ret = insertBefore_super.apply(this, arguments);
  if (mutationEventsEnabled(this)) {
    var doc = getDocument(this),
        ev = doc.createEvent("MutationEvents");

    ev.initMutationEvent("DOMNodeInserted", true, false, this, null, null, null, null);
    newChild.dispatchEvent(ev);

    ev = doc.createEvent("MutationEvents");
    ev.initMutationEvent("DOMSubtreeModified", true, false, this, null, null, null, null);
    this.dispatchEvent(ev);

    if (this.nodeType == NODE_TYPE.DOCUMENT_NODE || this._attachedToDocument) {
      ev = doc.createEvent("MutationEvents");
      ev.initMutationEvent("DOMNodeInsertedIntoDocument", false, false, null, null, null, null, null);

      for (const el of domSymbolTree.treeIterator(newChild)) {
        if (el.nodeType == NODE_TYPE.ELEMENT_NODE) {
          el.dispatchEvent(ev);
          el._attachedToDocument = true;
        }
      }
    }
  }
  return ret;
};

var removeChild_super = core.Node.prototype.removeChild;
core.Node.prototype.removeChild = function (oldChild) {
  if (mutationEventsEnabled(this)) {
    var doc = getDocument(this),
        ev = doc.createEvent("MutationEvents");

    ev.initMutationEvent("DOMNodeRemoved", true, false, this, null, null, null, null);
    oldChild.dispatchEvent(ev);

    ev = doc.createEvent("MutationEvents");
    ev.initMutationEvent("DOMSubtreeModified", true, false, this, null, null, null, null);
    this.dispatchEvent(ev);

    ev = doc.createEvent("MutationEvents");
    ev.initMutationEvent("DOMNodeRemovedFromDocument", false, false, null, null, null, null, null);
    for (const el of domSymbolTree.treeIterator(oldChild)) {
      if (el.nodeType == NODE_TYPE.ELEMENT_NODE) {
        el.dispatchEvent(ev);
        el._attachedToDocument = false;
      }
    }
  }
  return removeChild_super.apply(this, arguments);
};


var _attrModified_super = core.Node.prototype._attrModified;
core.Node.prototype._attrModified = function (name, value, oldValue) {
    var ret = _attrModified_super.apply(this, arguments);
    if (mutationEventsEnabled(this) && value !== oldValue) {
        var doc = getDocument(this),
            ev = doc.createEvent("MutationEvents");

        ev.initMutationEvent("DOMSubtreeModified", true, false, this, null, null, null, null);
        this.dispatchEvent(ev);
    }
    return ret;
};

var interfaceTable = {
  event: Event,
  events: Event,
  htmlevents: Event,
  mouseevent: MouseEvent,
  mouseevents: MouseEvent,
  uievent: UIEvent,
  uievents: UIEvent,
  messageevent: MessageEvent,

  customevent: CustomEvent,
  keyboardevent: KeyboardEvent,
  keyevents: KeyboardEvent,
  touchevent: TouchEvent,

  // old, not part of spec anymore
  mutationevents: MutationEvent
};

core.Document.prototype.createEvent = function (type) {
  var typeLower = type.toLowerCase();
  var Event = interfaceTable[typeLower] || null;

  if (!Event) {
    throw new core.DOMException(core.DOMException.NOT_SUPPORTED_ERR,
      "The provided event type (\"" + type + "\") is invalid");
  }

  return Event.create([""]);
};
