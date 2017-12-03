"use strict";
const DOMException = require("../../web-idl/DOMException");
const reportException = require("../helpers/runtime-script-errors");
const domSymbolTree = require("../helpers/internal-constants").domSymbolTree;
const idlUtils = require("../generated/utils");

const Event = require("../generated/Event").interface;

class EventTargetImpl {
  constructor() {
    this._eventListeners = Object.create(null);
  }

  addEventListener(type, callback, capture) {
    // webidl2js currently can't handle neither optional arguments nor callback interfaces
    if (callback === undefined || callback === null) {
      callback = null;
    } else if (typeof callback === "object") {
      callback = callback.handleEvent;
    } else if (typeof callback !== "function") {
      throw new TypeError("Only undefined, null, an object, or a function are allowed for the callback parameter");
    }

    if (callback === null) {
      return;
    }

    if (!this._eventListeners[type]) {
      this._eventListeners[type] = [];
    }

    for (let i = 0; i < this._eventListeners[type].length; ++i) {
      const listener = this._eventListeners[type][i];
      if (listener.capture === capture && listener.callback === callback) {
        return;
      }
    }

    this._eventListeners[type].push({
      callback,
      capture
    });
  }

  removeEventListener(type, callback, capture) {
    if (callback === undefined || callback === null) {
      callback = null;
    } else if (typeof callback === "object") {
      callback = callback.handleEvent;
    } else if (typeof callback !== "function") {
      throw new TypeError("Only undefined, null, an object, or a function are allowed for the callback parameter");
    }

    if (callback === null) {
      // Optimization, not in the spec.
      return;
    }

    if (!this._eventListeners[type]) {
      return;
    }

    for (let i = 0; i < this._eventListeners[type].length; ++i) {
      const listener = this._eventListeners[type][i];
      if (listener.callback === callback && listener.capture === capture) {
        this._eventListeners[type].splice(i, 1);
        break;
      }
    }
  }

  dispatchEvent(event) {
    if (!(event instanceof Event)) {
      throw new TypeError("Argument to dispatchEvent must be an Event");
    }

    const eventImpl = idlUtils.implForWrapper(event);
    if (eventImpl._dispatchFlag || !eventImpl._initializedFlag) {
      throw new DOMException(DOMException.INVALID_STATE_ERR, "Tried to dispatch an uninitialized event");
    }
    if (event.eventPhase !== event.NONE) {
      throw new DOMException(DOMException.INVALID_STATE_ERR, "Tried to dispatch a dispatching event");
    }

    eventImpl.isTrusted = false;

    return this._dispatch(event);
  }

  _dispatch(event, targetOverride) {
    const eventImpl = idlUtils.implForWrapper(event);
    eventImpl._dispatchFlag = true;
    eventImpl.target = targetOverride || idlUtils.wrapperForImpl(this);

    const eventPath = [];
    let targetParent = domSymbolTree.parent(eventImpl.target);
    let target = eventImpl.target;
    while (targetParent) {
      eventPath.push(targetParent);
      target = targetParent;
      targetParent = domSymbolTree.parent(targetParent);
    }
    if (event.type !== "load" && target._defaultView) { // https://html.spec.whatwg.org/#events-and-the-window-object
      eventPath.push(target._defaultView);
    }

    eventImpl.eventPhase = Event.CAPTURING_PHASE;
    for (let i = eventPath.length - 1; i >= 0; --i) {
      if (eventImpl._stopPropagationFlag) {
        break;
      }

      const object = eventPath[i];
      const objectImpl = idlUtils.implForWrapper(object);
      const eventListeners = objectImpl._eventListeners[event.type];
      invokeEventListeners(eventListeners, object, event);
    }

    eventImpl.eventPhase = Event.AT_TARGET;

    if (!eventImpl._stopPropagationFlag) {
      invokeInlineListeners(eventImpl.target, event);

      if (this._eventListeners[event.type]) {
        const eventListeners = this._eventListeners[event.type];
        invokeEventListeners(eventListeners, eventImpl.target, event);
      }
    }

    if (event.bubbles) {
      eventImpl.eventPhase = Event.BUBBLING_PHASE;
      for (let i = 0; i < eventPath.length; ++i) {
        if (eventImpl._stopPropagationFlag) {
          break;
        }

        const object = eventPath[i];
        const objectImpl = idlUtils.implForWrapper(object);
        const eventListeners = objectImpl._eventListeners[event.type];
        invokeInlineListeners(object, event);
        invokeEventListeners(eventListeners, object, event);
      }
    }

    eventImpl._dispatchFlag = false;
    eventImpl.eventPhase = Event.NONE;
    eventImpl.currentTarget = null;
    return !eventImpl._canceledFlag;
  }
}

module.exports = {
  implementation: EventTargetImpl
};

function invokeInlineListeners(object, event) {
  const inlineListener = getListenerForInlineEventHandler(object, event.type);
  if (inlineListener) {
    const document = object._ownerDocument || object._document;

    // Will be falsy for windows that have closed
    if (document && (!object.nodeName || document.implementation._hasFeature("ProcessExternalResources", "script"))) {
      invokeEventListeners([{ callback: inlineListener }], object, event);
    }
  }
}

function invokeEventListeners(listeners, target, event) {
  const document = target._ownerDocument || target._document;
  // Will be falsy for windows that have closed
  if (!document) {
    return;
  }

  const eventImpl = idlUtils.implForWrapper(event);
  eventImpl.currentTarget = target;
  if (!listeners) {
    return;
  }

  const handlers = listeners.slice();
  for (let i = 0; i < handlers.length; ++i) {
    if (eventImpl._stopImmediatePropagationFlag) {
      return;
    }

    const listener = handlers[i];
    if (listeners.indexOf(listener) === -1 ||
        (event.eventPhase === Event.CAPTURING_PHASE && !listener.capture) ||
        (event.eventPhase === Event.BUBBLING_PHASE && listener.capture)) {
      continue;
    }

    try {
      listener.callback.call(eventImpl.currentTarget, event);
    } catch (e) {
      let window = null;
      if (target._document) {
        window = target;
      } else if (target._ownerDocument) {
        window = target._ownerDocument._defaultView;
      }

      if (window) {
        reportException(window, e);
      }
      // Errors in window-less documents just get swallowed... can you think of anything better?
    }
  }
}

const wrappedListener = Symbol("inline event listener wrapper");

function getListenerForInlineEventHandler(target, type) {
  const callback = target["on" + type];

  if (!callback) { // TODO event handlers: only check null
    return null;
  }

  if (!callback[wrappedListener]) {
    // https://html.spec.whatwg.org/multipage/webappapis.html#the-event-handler-processing-algorithm
    callback[wrappedListener] = function (E) {
      const isWindowError = E.constructor.name === "ErrorEvent" && type === "error"; // TODO branding

      let returnValue;
      if (isWindowError) {
        returnValue = callback.call(E.currentTarget, E.message, E.filename, E.lineno, E.colno, E.error);
      } else {
        returnValue = callback.call(E.currentTarget, E);
      }

      if (type === "mouseover" || isWindowError) {
        if (returnValue) {
          E.preventDefault();
        }
      } else if (!returnValue) {
        E.preventDefault();
      }
    };
  }

  return callback[wrappedListener];
}
