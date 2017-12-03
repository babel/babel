/*
 * Copyright 2016 The Closure Compiler Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @fileoverview Closure compiler externs for the Polymer library.
 * Originally part of the Polymer Project. Original license below.
 *
 * @externs
 * @license
 * Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt. The complete set of authors may be
 * found at http://polymer.github.io/AUTHORS.txt. The complete set of
 * contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt. Code
 * distributed by Google as part of the polymer project is also subject to an
 * additional IP rights grant found at http://polymer.github.io/PATENTS.txt.
 */

if (Math.random() < 1) {
  throw "polymer externs should not be executed";
}

/**
 * @param {!{is: string}} descriptor The Polymer descriptor of the element.
 * @see https://github.com/Polymer/polymer/blob/0.8-preview/PRIMER.md#custom-element-registration
 */
var Polymer = function(descriptor) {};


/**
 * Re-evaluates and applies custom CSS properties based on dynamic
 * changes to this element's scope, such as adding or removing classes.
 *
 * For performance reasons, Polymer's custom CSS property shim relies
 * on this explicit signal from the user to indicate when changes have
 * been made that affect the values of custom properties.
 *
 * @param {Object=} properties Properties object which is mixed into
 *     the document root `customStyle` property. This argument provides a
 *     shortcut for setting `customStyle` and then calling `updateStyles`.
 *
 * @see http://polymer.github.io/polymer/
 */
Polymer.updateStyles = function(properties) {};


/** @constructor @extends {HTMLElement} */
var PolymerElement = function() {};

/**
 * A mapping from ID to element in this Polymer Element's local DOM.
 * @type {!Object}
 */
PolymerElement.prototype.$;

/**
 * True if the element has been attached to the DOM.
 * @type {boolean}
 */
PolymerElement.prototype.isAttached;

/**
 * The root node of the element.
 * @type {!Node}
 */
PolymerElement.prototype.root;

/**
 * The root node for the element.
 * Only exists if running under Shady Dom.
 * You usually want to use `this.root`.
 *
 * @type {?Node|undefined}
 */
PolymerElement.prototype.shadyRoot;

/**
 * Returns the first node in this element’s local DOM that matches selector.
 * @param {string} selector
 * @return {Element} Element found by the selector, or null if not found.
 */
PolymerElement.prototype.$$ = function(selector) {};

/** @type {string} The Custom element tag name. */
PolymerElement.prototype.is;

/** @type {string} The native element this element extends. */
PolymerElement.prototype.extends;

/**
 * An array of objects whose properties get added to this element.
 * @see https://www.polymer-project.org/1.0/docs/devguide/behaviors.html
 * @type {!Array<!Object>|undefined}
 */
PolymerElement.prototype.behaviors;

/**
 * A string-separated list of dependent properties that should result in a
 * change function being called. These observers differ from single-property
 * observers in that the change handler is called asynchronously.
 *
 * @type {!Object<string, string>|undefined}
 */
PolymerElement.prototype.observers;

/** On create callback. */
PolymerElement.prototype.created = function() {};
/** On ready callback. */
PolymerElement.prototype.ready = function() {};
/** On registered callback. */
PolymerElement.prototype.registered = function() {};
/** On attached to the DOM callback. */
PolymerElement.prototype.attached = function() {};
/** On detached from the DOM callback. */
PolymerElement.prototype.detached = function() {};

/**
 * Callback fired when an attribute on the element has been changed.
 *
 * @param {string} name The name of the attribute that changed.
 */
PolymerElement.prototype.attributeChanged = function(name) {};

/** @typedef {!{
 *    type: !Function,
 *    reflectToAttribute: (boolean|undefined),
 *    readOnly: (boolean|undefined),
 *    notify: (boolean|undefined),
 *    value: *,
 *    computed: (string|undefined),
 *    observer: (string|undefined)
 *  }} */
PolymerElement.PropertyConfig;

/** @typedef {!Object<string, (!Function|!PolymerElement.PropertyConfig)>} */
PolymerElement.Properties;

/** @type {!PolymerElement.Properties} */
PolymerElement.prototype.properties;

/** @type {!Object<string, *>} */
PolymerElement.prototype.hostAttributes;

/**
 * An object that maps events to event handler function names.
 * @type {!Object<string, string>}
 */
PolymerElement.prototype.listeners;

/**
 * Return the element whose local dom within which this element is contained.
 * @type {?Element}
 */
PolymerElement.prototype.domHost;

/**
 * Notifies the event binding system of a change to a property.
 * @param  {string} path  The path to set.
 * @param  {*}      value The value to send in the update notification.
 * @param {boolean=} fromAbove When true, specifies that the change came from
 *     above this element and thus upward notification is not necessary.
 * @return {boolean} True if notification actually took place, based on a dirty
 *     check of whether the new value was already known.
 */
PolymerElement.prototype.notifyPath = function(path, value, fromAbove) {};

/**
 * @param {string} path Path that should be notified.
 * @param {!Array<!PolymerSplice>} splices Array of splice records indicating
 *     ordered changes that occurred to the array.
 */
PolymerElement.prototype.notifySplices = function(path, splices) {};

/**
 * Convienence method for setting a value to a path and notifying any
 * elements bound to the same path.
 *
 * Note, if any part in the path except for the last is undefined,
 * this method does nothing (this method does not throw when
 * dereferencing undefined paths).
 *
 * @param {(string|Array<(string|number)>)} path Path to the value
 *   to read.  The path may be specified as a string (e.g. `foo.bar.baz`)
 *   or an array of path parts (e.g. `['foo.bar', 'baz']`).  Note that
 *   bracketed expressions are not supported; string-based path parts
 *   *must* be separated by dots.  Note that when dereferencing array
 *   indicies, the index may be used as a dotted part directly
 *   (e.g. `users.12.name` or `['users', 12, 'name']`).
 * @param {*} value Value to set at the specified path.
 * @param {Object=} root Root object from which the path is evaluated.
*/
PolymerElement.prototype.set = function(path, value, root) {};

/**
 * Convienence method for reading a value from a path.
 *
 * Note, if any part in the path is undefined, this method returns
 * `undefined` (this method does not throw when dereferencing undefined
 * paths).
 *
 * @param {(string|Array<(string|number)>)} path Path to the value
 *   to read.  The path may be specified as a string (e.g. `foo.bar.baz`)
 *   or an array of path parts (e.g. `['foo.bar', 'baz']`).  Note that
 *   bracketed expressions are not supported; string-based path parts
 *   *must* be separated by dots.  Note that when dereferencing array
 *   indicies, the index may be used as a dotted part directly
 *   (e.g. `users.12.name` or `['users', 12, 'name']`).
 * @param {Object=} root Root object from which the path is evaluated.
 * @return {*} Value at the path, or `undefined` if any part of the path
 *   is undefined.
 */
PolymerElement.prototype.get = function(path, root) {};

/**
 * Adds items onto the end of the array at the path specified.
 *
 * The arguments after `path` and return value match that of
 * `Array.prototype.push`.
 *
 * This method notifies other paths to the same array that a
 * splice occurred to the array.
 *
 * @param {string} path Path to array.
 * @param {...*} var_args Items to push onto array
 * @return {number} New length of the array.
 */
PolymerElement.prototype.push = function(path, var_args) {};

/**
 * Removes an item from the end of array at the path specified.
 *
 * The arguments after `path` and return value match that of
 * `Array.prototype.pop`.
 *
 * This method notifies other paths to the same array that a
 * splice occurred to the array.
 *
 * @param {string} path Path to array.
 * @return {*} Item that was removed.
 */
PolymerElement.prototype.pop = function(path) {};

/**
 * Starting from the start index specified, removes 0 or more items
 * from the array and inserts 0 or more new itms in their place.
 *
 * The arguments after `path` and return value match that of
 * `Array.prototype.splice`.
 *
 * This method notifies other paths to the same array that a
 * splice occurred to the array.
 *
 * @param {string} path Path to array.
 * @param {number} start Index from which to start removing/inserting.
 * @param {number} deleteCount Number of items to remove.
 * @param {...*} var_args Items to insert into array.
 * @return {!Array} Array of removed items.
 */
PolymerElement.prototype.splice = function(path, start, deleteCount, var_args) {};

/**
 * Removes an item from the beginning of array at the path specified.
 *
 * The arguments after `path` and return value match that of
 * `Array.prototype.pop`.
 *
 * This method notifies other paths to the same array that a
 * splice occurred to the array.
 *
 * @param {string} path Path to array.
 * @return {*} Item that was removed.
 */
PolymerElement.prototype.shift = function(path) {};

/**
 * Adds items onto the beginning of the array at the path specified.
 *
 * The arguments after `path` and return value match that of
 * `Array.prototype.push`.
 *
 * This method notifies other paths to the same array that a
 * splice occurred to the array.
 *
 * @param {string} path Path to array.
 * @param {...*} var_args Items to insert info array
 * @return {number} New length of the array.
 */
PolymerElement.prototype.unshift = function(path, var_args) {};

/**
 * Returns a list of element children distributed to this element's
 * `<content>`.
 *
 * If this element contans more than one `<content>` in its
 * local DOM, an optional selector may be passed to choose the desired
 * content.  This method differs from `getContentChildNodes` in that only
 * elements are returned.
 *
 * @param {string=} slctr CSS selector to choose the desired
 *   `<content>`.  Defaults to `content`.
 * @return {!Array<!HTMLElement>} List of distributed nodes for the
 *   `<content>`.
 */
PolymerElement.prototype.getContentChildren = function(slctr) {};

/**
 * Returns a list of nodes that are the effective childNodes. The effective
 * childNodes list is the same as the element's childNodes except that
 * any `<content>` elements are replaced with the list of nodes distributed
 * to the `<content>`, the result of its `getDistributedNodes` method.
 *
 * @return {!Array<!Node>} List of effective child nodes.
 */
PolymerElement.prototype.getEffectiveChildNodes = function() {};

/**
 * Returns a list of elements that are the effective children. The effective
 * children list is the same as the element's children except that
 * any `<content>` elements are replaced with the list of elements
 * distributed to the `<content>`.
 *
 * @return {!Array<!Node>} List of effective children.
 */
PolymerElement.prototype.getEffectiveChildren = function() {};

/**
 * Returns a string of text content that is the concatenation of the
 * text content's of the element's effective childNodes (the elements
 * returned by <a href="#getEffectiveChildNodes>getEffectiveChildNodes</a>.
 *
 * @return {string} A concatenated string of all effective childNode text
 *   content.
 */
PolymerElement.prototype.getEffectiveTextContent = function() {};

/**
 * Returns the first effective child that match selector.
 *
 * @param {string} selector
 * @return {?HTMLElement}
 */
PolymerElement.prototype.queryEffectiveChildren = function(selector) {};

/**
 * Returns a list of effective children that match selector.
 *
 * @param {string} selector
 * @return {!Array<!HTMLElement>}
 */
PolymerElement.prototype.queryAllEffectiveChildren = function(selector) {};

/**
 * Fire an event.
 *
 * @param {string} type An event name.
 * @param {*=} detail
 * @param {{
 *   bubbles: (boolean|undefined),
 *   cancelable: (boolean|undefined),
 *   node: (!EventTarget|undefined)}=} options
 * @return {Object} event
 */
PolymerElement.prototype.fire = function(type, detail, options) {};

/**
 * Toggles the named boolean class on the host element, adding the class if
 * bool is truthy and removing it if bool is falsey. If node is specified, sets
 * the class on node instead of the host element.
 * @param {string} name
 * @param {boolean=} bool
 * @param {HTMLElement=} node
 */
PolymerElement.prototype.toggleClass = function(name, bool, node) {};

/**
 * Toggles the named boolean attribute on the host element, adding the attribute
 * if bool is truthy and removing it if bool is falsey. If node is specified,
 * sets the attribute on node instead of the host element.
 * @param {string} name
 * @param {boolean=} bool
 * @param {HTMLElement=} node
 */
PolymerElement.prototype.toggleAttribute = function(name, bool, node) {};

/**
 * Moves a boolean attribute from oldNode to newNode, unsetting the attribute
 * (if set) on oldNode and setting it on newNode.
 * @param {string} name
 * @param {!HTMLElement} newNode
 * @param {!HTMLElement} oldNode
 */
PolymerElement.prototype.attributeFollows = function(name, newNode, oldNode) {};

/**
 * Convenience method to add an event listener on a given element, late bound to
 * a named method on this element.
 * @param {!EventTarget} node Element to add event listener to.
 * @param {string} eventName Name of event to listen for.
 * @param {string} methodName Name of handler method on this to call.
 */
PolymerElement.prototype.listen = function(node, eventName, methodName) {};

/**
 * Convenience method to remove an event listener from a given element.
 * @param {?EventTarget} node Element to remove event listener from.
 * @param {string} eventName Name of event to stop listening for.
 * @param {string} methodName Name of handler method on this to remove.
 */
PolymerElement.prototype.unlisten = function(node, eventName, methodName) {};

/**
 * Override scrolling behavior to all direction, one direction, or none.
 *
 * Valid scroll directions:
 * 'all': scroll in any direction
 * 'x': scroll only in the 'x' direction
 * 'y': scroll only in the 'y' direction
 * 'none': disable scrolling for this node
 *
 * @param {string=} direction Direction to allow scrolling Defaults to all.
 * @param {HTMLElement=} node Element to apply scroll direction setting.
 *     Defaults to this.
 */
PolymerElement.prototype.setScrollDirection = function(direction, node) {};

/**
 * @param {!Function} method
 * @param {number=} wait
 * @return {number} A handle which can be used to cancel the job.
 */
PolymerElement.prototype.async = function(method, wait) {};

/**
 * @param {...*} var_args
 */
PolymerElement.prototype.factoryImpl = function(var_args) {};

/**
 * Apply style scoping to the specified container and all its descendants.
 * @param {!Element} container Element to scope.
 * @param {boolean} shouldObserve When true, monitors the container for changes
 *   and re-applies scoping for any future changes.
 */
PolymerElement.prototype.scopeSubtree = function(container, shouldObserve) {};

/**
 * Aliases one data path as another, such that path notifications from one
 * are routed to the other.
 *
 * @param {string} to Target path to link.
 * @param {string} from Source path to link.
 */
PolymerElement.prototype.linkPaths = function(to, from) {}

/**
 * Removes a data path alias previously established with `linkPaths`.
 *
 * Note, the path to unlink should be the target (`to`) used when
 * linking the paths.
 *
 * @param {string} path Target path to unlink.
 */
PolymerElement.prototype.unlinkPaths = function(path) {}

Polymer.Base;

/**
 * Used by the promise-polyfill on its own.
 *
 * @param {!Function} method
 * @param {number=} wait
 * @return {number} A handle which can be used to cancel the job.
 */
Polymer.Base.async = function(method, wait) {};

/**
 * Copies own properties (including accessor descriptors) from a source
 * object to a target object.
 *
 * @param {?Object} target Target object to copy properties to.
 * @param {?Object} source Source object to copy properties from.
 * @return {?Object} Target object that was passed as first argument or source
 *     object if the target was null.
 */
Polymer.Base.extend = function(target, source) {};

/**
 * Returns a property descriptor object for the property specified.
 *
 * This method allows introspecting the configuration of a Polymer element's
 * properties as configured in its `properties` object.  Note, this method
 * normalizes shorthand forms of the `properties` object into longhand form.
 *
 * @param {string} property Name of property to introspect.
 * @return {Object} Property descriptor for specified property.
*/
Polymer.Base.getPropertyInfo = function(property) {};

/**
 * Copies props from a source object to a target object.
 *
 * Note, this method uses a simple `for...in` strategy for enumerating
 * properties.  To ensure only `ownProperties` are copied from source
 * to target and that accessor implementations are copied, use `extend`.
 *
 * @param {!Object} target Target object to copy properties to.
 * @param {?Object} source Source object to copy properties from.
 * @return {!Object} Target object that was passed as first argument.
 */
Polymer.Base.mixin = function(target, source) {};

Polymer.Gestures;

/**
 * Gets the original target of the given event.
 *
 * Cheaper than Polymer.dom(ev).path[0];
 * See https://github.com/Polymer/polymer/blob/master/src/standard/gestures.html#L191
 *
 * @param {Event} ev .
 * @return {Element} The original target of the event.
 */
Polymer.Gestures.findOriginalTarget = function(ev) {};


/**
 * @param {number} handle
 */
PolymerElement.prototype.cancelAsync = function(handle) {};

/**
 * Call debounce to collapse multiple requests for a named task into one
 * invocation, which is made after the wait time has elapsed with no new
 * request. If no wait time is given, the callback is called at microtask timing
 * (guaranteed to be before paint).
 * @param {string} jobName
 * @param {!Function} callback
 * @param {number=} wait
 */
PolymerElement.prototype.debounce = function(jobName, callback, wait) {};

/**
 * Cancels an active debouncer without calling the callback.
 * @param {string} jobName
 */
PolymerElement.prototype.cancelDebouncer = function(jobName) {};

/**
 * Calls the debounced callback immediately and cancels the debouncer.
 * @param {string} jobName
 */
PolymerElement.prototype.flushDebouncer = function(jobName) {};

/**
 * @param {string} jobName
 * @return {boolean} True if the named debounce task is waiting to run.
 */
PolymerElement.prototype.isDebouncerActive = function(jobName) {};


/**
 * Applies a CSS transform to the specified node, or this element if no node is
 * specified. transform is specified as a string.
 * @param {string} transform
 * @param {HTMLElement=} node
 */
PolymerElement.prototype.transform = function(transform, node) {};

/**
 * Transforms the specified node, or this element if no node is specified.
 * @param {number|string} x
 * @param {number|string} y
 * @param {number|string} z
 * @param {HTMLElement=} node
 */
PolymerElement.prototype.translate3d = function(x, y, z, node) {};

/**
 * Dynamically imports an HTML document.
 * @param {string} href
 * @param {Function=} onload
 * @param {Function=} onerror
 */
PolymerElement.prototype.importHref = function(href, onload, onerror) {};

/**
 * Checks whether an element is in this element's light DOM tree.
 * @param {?Node} node The element to be checked.
 * @return {boolean} true if node is in this element's light DOM tree.
 */
PolymerElement.prototype.isLightDescendant = function(node) {};

/**
 * Checks whether an element is in this element's local DOM tree.
 * @param {?Node} node The element to be checked.
 * @return {boolean} true if node is in this element's local DOM tree.
 */
PolymerElement.prototype.isLocalDescendant = function(node) {};

/**
 * Delete an element from an array.
 * @param {!Array|string} array Path to array from which to remove the item (or
 *     the array itself).
 * @param {*} item Item to remove
 * @return {!Array} The array with the item removed.
 */
PolymerElement.prototype.arrayDelete = function(array, item) {};

/**
 * Resolve a url to make it relative to the current doc.
 * @param {string} url
 * @return {string}
 */
PolymerElement.prototype.resolveUrl = function(url) {};

/**
 * Re-evaluates and applies custom CSS properties based on dynamic
 * changes to this element's scope, such as adding or removing classes
 * in this element's local DOM.
 *
 * For performance reasons, Polymer's custom CSS property shim relies
 * on this explicit signal from the user to indicate when changes have
 * been made that affect the values of custom properties.
 *
 * @param {Object=} properties Properties object which, if provided is mixed
 *     into the element's `customStyle` property. This argument provides a
 *     shortcut for setting `customStyle` and then calling `updateStyles`.
 */
PolymerElement.prototype.updateStyles = function(properties) {};

/**
 * @type {!Object<string, string|undefined>}
 */
PolymerElement.prototype.customStyle;

/**
 * Convenience method for creating an element and configuring it.
 * @param {string} tagName HTML tag name
 * @param {IObject<string, *>=} properties Object of properties to configure on the instance
 * @return {!Element}
 */
PolymerElement.prototype.create = function(tagName, properties) {};

/**
 * Returns the computed style value for the given property.
 * @param {string} property
 * @return {string} the computed value
 */
PolymerElement.prototype.getComputedStyleValue = function(property) {};

/**
 * Logs a message to the console.
 *
 * @param {...*} var_args
 * @protected
 */
PolymerElement.prototype._log = function(var_args) {};

/**
 * Logs a message to the console with a 'warn' level.
 *
 * @param {...*} var_args
 * @protected
 */
PolymerElement.prototype._warn = function(var_args) {};

/**
 * Logs a message to the console with an 'error' level.
 *
 * @param {...*} var_args
 * @protected
 */
PolymerElement.prototype._error = function(var_args) {};

/**
 * Formats string arguments together for a console log.
 *
 * @param {...*} var_args
 * @return {!Array} The formatted array of args to a log function.
 * @protected
 */
PolymerElement.prototype._logf = function(var_args) {};

/** @type {boolean} True after this.ready() has run */
PolymerElement.prototype._readied;

/**
 * Do not call this function.
 *
 * @param {string} path .
 * @param {*} value .
 */
PolymerElement.prototype._notifyPathUp = function(path, value) {};

/**
 * Do not call this function.
 *
 * @param {string} path .
 * @param {*} value .
 */
PolymerElement.prototype._pathEffector = function(path, value) {};

/**
 * Do not call this function.
 *
 * @param {string} path .
 * @param {*} value .
 */
PolymerElement.prototype._propertySetter = function(path, value) {};


/**
 * A Polymer DOM API for manipulating DOM such that local DOM and light DOM
 * trees are properly maintained.
 *
 * @constructor
 */
var PolymerDomApi = function() {};

/**
 * @param {?Node} node
 * @return {boolean}
 */
PolymerDomApi.prototype.deepContains = function(node) {};

/** @param {!Node} node */
PolymerDomApi.prototype.appendChild = function(node) {};

/**
 * @param {!Node} oldNode
 * @param {!Node} newNode
 */
PolymerDomApi.prototype.replaceChild = function(oldNode, newNode) {};

/**
 * @param {!Node} node
 * @param {?Node} beforeNode
 */
PolymerDomApi.prototype.insertBefore = function(node, beforeNode) {};

/** @param {!Node} node */
PolymerDomApi.prototype.removeChild = function(node) {};

/** @type {!Array<!HTMLElement>} */
PolymerDomApi.prototype.children;

/** @type {!Array<!Node>} */
PolymerDomApi.prototype.childNodes;

/** @type {?Node} */
PolymerDomApi.prototype.parentNode;

/** @type {?Node} */
PolymerDomApi.prototype.firstChild;

/** @type {?Node} */
PolymerDomApi.prototype.lastChild;

/** @type {?HTMLElement} */
PolymerDomApi.prototype.firstElementChild;

/** @type {?HTMLElement} */
PolymerDomApi.prototype.lastElementChild;

/** @type {?Node} */
PolymerDomApi.prototype.previousSibling;

/** @type {?Node} */
PolymerDomApi.prototype.nextSibling;

/** @type {?HTMLElement} */
PolymerDomApi.prototype.previousElementSibling;

/** @type {?HTMLElement} */
PolymerDomApi.prototype.nextElementSibling;

/** @type {string} */
PolymerDomApi.prototype.textContent;

/** @type {string} */
PolymerDomApi.prototype.innerHTML;

/** @type {?HTMLElement} */
PolymerDomApi.prototype.activeElement;

/**
 * @param {string} selector
 * @return {?HTMLElement}
 */
PolymerDomApi.prototype.querySelector = function(selector) {};

/**
 * @param {string} selector
 * @return {!Array<!HTMLElement>}
 */
PolymerDomApi.prototype.querySelectorAll = function(selector) {};

/** @return {!Array<!Node>} */
PolymerDomApi.prototype.getDistributedNodes = function() {};

/** @return {!Array<!Node>} */
PolymerDomApi.prototype.getDestinationInsertionPoints = function() {};

/** @return {?Node} */
PolymerDomApi.prototype.getOwnerRoot = function() {};

/**
 * @param {string} attribute
 * @param {string|number|boolean} value Values are converted to strings with
 *     ToString, so we accept number and boolean since both convert easily to
 *     strings.
 */
PolymerDomApi.prototype.setAttribute = function(attribute, value) {};

/** @param {string} attribute */
PolymerDomApi.prototype.removeAttribute = function(attribute) {};

/**
 * @typedef {function(!PolymerDomApi.ObserveInfo)}
 */
PolymerDomApi.ObserveCallback;

/**
 * @typedef {{
 *   target: !Node,
 *   addedNodes: !Array<!Node>,
 *   removedNodes: !Array<!Node>
 * }}
 */
PolymerDomApi.ObserveInfo;

/**
 * A virtual type for observer callback handles.
 *
 * @private @constructor
 */
PolymerDomApi.ObserveHandle = function() {};

/**
 * Notifies callers about changes to the element's effective child nodes,
 * the same list as returned by `getEffectiveChildNodes`.
 *
 * @param {!PolymerDomApi.ObserveCallback} callback The supplied callback
 * is called with an `info` argument which is an object that provides
 * the `target` on which the changes occurred, a list of any nodes
 * added in the `addedNodes` array, and nodes removed in the
 * `removedNodes` array.
 *
 * @return {!PolymerDomApi.ObserveHandle} Handle which is the argument to
 * `unobserveNodes`.
 */
PolymerDomApi.prototype.observeNodes = function(callback) {};

/**
 * Stops observing changes to the element's effective child nodes.
 *
 * @param {!PolymerDomApi.ObserveHandle} handle The handle for the
 * callback that should no longer receive notifications. This
 * handle is returned from `observeNodes`.
 */
PolymerDomApi.prototype.unobserveNodes = function(handle) {};

/** @type {?DOMTokenList} */
PolymerDomApi.prototype.classList;

/**
 * @param {string} selector
 * @return {!Array<!HTMLElement>}
 */
PolymerDomApi.prototype.queryDistributedElements = function(selector) {};

/**
 * Returns a list of effective child nodes for this element.
 *
 * @return {!Array<!HTMLElement>}
 */
PolymerDomApi.prototype.getEffectiveChildNodes = function() {};

/**
 * A Polymer Event API.
 *
 * @constructor
 */
var PolymerEventApi = function() {};

/** @type {?EventTarget} */
PolymerEventApi.prototype.rootTarget;

/** @type {?EventTarget} */
PolymerEventApi.prototype.localTarget;

/** @type {?Array<!Element>|undefined} */
PolymerEventApi.prototype.path;

/** @type {Event} */
PolymerEventApi.prototype.event;


Polymer.Async;

/**
 * @param {function()} callback
 * @param {number=} waitTime
 * @return {number}
 */
Polymer.Async.run = function (callback, waitTime) {};

/**
 * @param {number} handle
 */
Polymer.Async.cancel = function(handle) {};

/**
 * polymer-onerror experiment relies on this private API, so expose it only
 * to let the compilation work. Do not use in user code.
 */
Polymer.Async._atEndOfMicrotask = function() {};


/**
 * Returns a Polymer-friendly API for manipulating DOM of a specified node or
 * an event API for a specified event..
 *
 * @param {?Node|?Event} nodeOrEvent
 * @return {!PolymerDomApi|!PolymerEventApi}
 */
Polymer.dom = function(nodeOrEvent) {};

Polymer.dom.flush = function() {};

/** @constructor */
Polymer.Debouncer = function() {};

Polymer.Debouncer.prototype = {
  /**
   * @param {function()} callback
   * @param {number} wait
   */
  go: function(callback, wait) {},

  stop: function() {},

  complete: function() {}
};

/** @param {!Polymer.Debouncer} debouncer */
Polymer.dom.addDebouncer = function(debouncer) {};


/**
 * Returns whether the given object is an instance of a Polymer element.
 * @param {*} object
 * @return {boolean}
 */
Polymer.isInstance = function(object) {};


Polymer.CaseMap;

/**
 * Convert a string from dash to camel-case.
 * @param {string} dash
 * @return {string} The string in camel-case.
 */
Polymer.CaseMap.dashToCamelCase = function(dash) {};

/**
 * Convert a string from camel-case to dash format.
 * @param {string} camel
 * @return {string} The string in dash format.
 */
Polymer.CaseMap.camelToDashCase = function(camel) {};


/**
 * A Polymer data structure abstraction.
 *
 * @param {?Array} userArray
 * @constructor
 */
Polymer.Collection = function(userArray) {};

Polymer.Collection.prototype.initMap = function() {};

/**
 * @param {*} item
 */
Polymer.Collection.prototype.add = function(item) {};

/**
 * @param {number|string} key
 */
Polymer.Collection.prototype.removeKey = function(key) {};

/**
 * @param {*} item
 * @return {number|string} The key of the item removed.
 */
Polymer.Collection.prototype.remove = function(item) {};

/**
 * @param {*} item
 * @return {number|string} The key of the item.
 */
Polymer.Collection.prototype.getKey = function(item) {};

/**
 * @return {!Array<number|string>} The key of the item removed.
 */
Polymer.Collection.prototype.getKeys = function() {};

/**
 * @param {number|string} key
 * @param {*} item
 */
Polymer.Collection.prototype.setItem = function(key, item) {};

/**
 * @param {number|string} key
 * @return {*} The item for the given key if present.
 */
Polymer.Collection.prototype.getItem = function(key) {};

/**
 * @return {!Array} The items in the collection
 */
Polymer.Collection.prototype.getItems = function() {};

/**
 * @param {!Array} userArray
 * @return {!Polymer.Collection} A new Collection wrapping the given array.
 */
Polymer.Collection.get = function(userArray) {};

/**
 * @param {!Array} userArray
 * @param {!Array<!PolymerSplice>} splices
 * @return {!Array<!PolymerKeySplice>} KeySplices with added and removed keys
 */
Polymer.Collection.applySplices = function(userArray, splices) {};

/**
 * Settings pulled from
 * https://github.com/Polymer/polymer/blob/master/src/lib/settings.html
 */
Polymer.Settings;

/** @type {boolean} */
Polymer.Settings.wantShadow;

/** @type {boolean} */
Polymer.Settings.hasShadow;

/** @type {boolean} */
Polymer.Settings.nativeShadow;

/** @type {boolean} */
Polymer.Settings.useShadow;

/** @type {boolean} */
Polymer.Settings.useNativeShadow;

/** @type {boolean} */
Polymer.Settings.useNativeImports;

/** @type {boolean} */
Polymer.Settings.useNativeCustomElements;


/**
 * @see https://github.com/Polymer/polymer/blob/master/src/lib/template/templatizer.html
 * @polymerBehavior
 */
Polymer.Templatizer = {
  ctor: function() {},

  /**
   * @param {?Object=} model
   * @return {?Element}
   */
  stamp: function(model) {},

  /**
   * @param {?Element} template
   */
  templatize: function(template) {},

  /**
   * Returns the template "model" associated with a given element, which
   * serves as the binding scope for the template instance the element is
   * contained in. A template model is an instance of `Polymer.Base`, and
   * should be used to manipulate data associated with this template instance.
   *
   * Example:
   *
   *   var model = modelForElement(el);
   *   if (model.index < 10) {
   *     model.set('item.checked', true);
   *   }
   *
   * @param {?HTMLElement} el Element for which to return a template model.
   * @return {(!PolymerElement)|undefined} Model representing the binding scope for
   *   the element.
   */
  modelForElement: function(el) {},

  /**
   * @param {function()} fn
   * @protected
   */
   _debounceTemplate: function(fn) {}
};



/**
 * A node produced by Templatizer which has a templateInstance property.
 *
 * @constructor
 * @extends {HTMLElement}
 */
var TemplatizerNode = function() {};


/** @type {?PolymerElement} */
TemplatizerNode.prototype._templateInstance;



/**
 * @see https://github.com/Polymer/polymer/blob/master/src/lib/template/dom-repeat.html
 * @extends {PolymerElement}
 * @constructor
 */
var DomRepeatElement = function() {};


/**
 * Forces the element to render its content. Normally rendering is
 * asynchronous to a provoking change. This is done for efficiency so
 * that multiple changes trigger only a single render. The render method
 * should be called if, for example, template rendering is required to
 * validate application state.
 */
DomRepeatElement.prototype.render = function() {};


/**
 * Returns the item associated with a given element stamped by
 * this `dom-repeat`.
 *
 * @param {!HTMLElement} el Element for which to return the item.
 * @return {*} Item associated with the element.
 */
DomRepeatElement.prototype.itemForElement = function(el) {};


/**
 * Returns the `Polymer.Collection` key associated with a given
 * element stamped by this `dom-repeat`.
 *
 * @param {!HTMLElement} el Element for which to return the key.
 * @return {*} Key associated with the element.
 */
DomRepeatElement.prototype.keyForElement = function(el) {};


/**
 * Returns the inst index for a given element stamped by this `dom-repeat`.
 * If `sort` is provided, the index will reflect the sorted order (rather
 * than the original array order).
 *
 * @param {!HTMLElement} el Element for which to return the index.
 * @return {*} Row index associated with the element (note this may
 *   not correspond to the array index if a user `sort` is applied).
 */
DomRepeatElement.prototype.indexForElement = function(el) {};


/**
 * Count of currently rendered items after `filter` (if any) has been applied.
 * If "chunking mode" is enabled, `renderedItemCount` is updated each time a
 * set of template instances is rendered.
 *
 * @type {number}
 */
DomRepeatElement.prototype.renderedItemCount;



/**
 * @see https://github.com/Polymer/polymer/blob/master/src/lib/template/array-selector.html
 * @extends {PolymerElement}
 * @constructor
 */
var ArraySelectorElement = function() {};


/**
 * Returns whether the item is currently selected.
 *
 * @param {*} item Item from `items` array to test
 * @return {boolean} Whether the item is selected
 */
ArraySelectorElement.prototype.isSelected = function(item) {};


/**
 * Clears the selection state.
 */
ArraySelectorElement.prototype.clearSelection = function() {};


/**
 * Deselects the given item if it is already selected.
 *
 * @param {*} item Item from `items` array to deselect
 */
ArraySelectorElement.prototype.deselect = function(item) {};


/**
 * Selects the given item.  When `toggle` is true, this will automatically
 * deselect the item if already selected.
 *
 * @param {*} item Item from `items` array to select
 */
ArraySelectorElement.prototype.select = function(item) {};


/**
 * An Event type fired when moving while finger/button is down.
 * state - a string indicating the tracking state:
 *     + start: fired when tracking is first detected (finger/button down and
 *              moved past a pre-set distance threshold)
 *     + track: fired while tracking
 *     + end: fired when tracking ends
 * x - clientX coordinate for event
 * y - clientY coordinate for event
 * dx - change in pixels horizontally since the first track event
 * dy - change in pixels vertically since the first track event
 * ddx - change in pixels horizontally since last track event
 * ddy - change in pixels vertically since last track event
 * hover() - a function that may be called to determine the element currently
 *           being hovered
 *
 * @typedef {{
 *   state: string,
 *   x: number,
 *   y: number,
 *   dx: number,
 *   dy: number,
 *   ddx: number,
 *   ddy: number,
 *   hover: (function(): Node)
 * }}
 */
var PolymerTrackEvent;

/**
 * An Event type fired when a finger does down, up, or taps.
 * x - clientX coordinate for event
 * y - clientY coordinate for event
 * sourceEvent - the original DOM event that caused the down action
 *
 * @typedef {{
 *   x: number,
 *   y: number,
 *   sourceEvent: Event
 * }}
 */
var PolymerTouchEvent;

/**
 * @typedef {{
 *   index: number,
 *   removed: !Array,
 *   addedCount: number,
 *   object: !Array,
 *   type: string,
 * }}
 */
var PolymerSplice;

/**
 * @typedef {{
 *   added: !Array<string|number>,
 *   removed: !Array<string|number>
 * }}
 */
var PolymerKeySplice;

/**
 * @typedef {{
 *   indexSplices: ?Array<!PolymerSplice>,
 *   keySplices: ?Array<!PolymerKeySplice>
 * }}
 */
var PolymerSpliceChange;

/**
 * The type of the object received by an observer function when deep
 * sub-property observation is enabled. See:
 * https://www.polymer-project.org/1.0/docs/devguide/properties.html#deep-observation
 *
 * @typedef {{
 *   path: string,
 *   value: (?Object|undefined),
 *   base: (?Object|undefined)
 * }}
 */
var PolymerDeepPropertyChange;

/**
 * The interface that iconsets should obey. Iconsets are registered by setting
 * their name in the IronMeta 'iconset' db, and a value of type Polymer.Iconset.
 *
 * Used by iron-icon but needs to live here since iron-icon, iron-iconset, etc don't
 * depend on each other at all and talk only through iron-meta.
 *
 * @interface
 */
Polymer.Iconset = function() {};

/**
 * Applies an icon to the given element as a css background image. This
 * method does not size the element, and it's usually necessary to set
 * the element's height and width so that the background image is visible.
 *
 * @param {Element} element The element to which the icon is applied.
 * @param {string} icon The name of the icon to apply.
 * @param {string=} theme (optional) The name or index of the icon to apply.
 * @param {number=} scale (optional, defaults to 1) Icon scaling factor.
 */
Polymer.Iconset.prototype.applyIcon = function(
      element, icon, theme, scale) {};

/**
 * Remove an icon from the given element by undoing the changes effected
 * by `applyIcon`.
 *
 * @param {Element} element The element from which the icon is removed.
 */
Polymer.Iconset.prototype.removeIcon = function(element) {};

Polymer.ResolveUrl = {};

/**
 * @param {string} cssText Some CSS text taken from ownerDocument.
 * @param {!Document} ownerDocument The source of the css.
 * @return {string} The given CSS text with its URLs rewritten to be based on
 *     the primary document of this window rather than the given ownerDocument.
 */
Polymer.ResolveUrl.resolveCss = function(cssText, ownerDocument) {}
/**
 * @param {!Element} element An element whose URL attributes need to be renormed.
 * @param {!Document} ownerDocument The document whose URL is the base of the
 *     element's current attributes.
 */
Polymer.ResolveUrl.resolveAttrs = function(element, ownerDocument) {}
/**
 * @param {string} url A url that needs to be renormed.
 * @param {?string} baseURI The current base of URL for the URL.
 * @return {string} The given url rewritten to be based on
 *     the primary document of this window rather than the given url.
 */
Polymer.ResolveUrl.resolveUrl = function(url, baseURI) {}

Polymer.RenderStatus;

/**
 * Makes callback when first render occurs or immediately if render has occured.
 * @param {!function()} cb Callback function to be invoked.
 */
Polymer.RenderStatus.whenReady = function(cb) {}

/**
 * Queue up function call on next render.
 * @param {!Element} element The element on which the function call is made.
 * @param {!function()} fn The function called on next render.
 * @param {...*} args The function arguments.
 */
Polymer.RenderStatus.afterNextRender = function(element, fn, args) {}



/**
 * Static analysis for Polymer.
 * @type {!Object}
 */
var hydrolysis = {};

/**
 * A database of Polymer metadata defined in HTML
 * @param {boolean} attachAST If true, attach a parse5 compliant AST
 * @param {Object=} opt_loader An optional FileLoader used to load
 * external resources
 */
hydrolysis.Analyzer = function(attachAST, opt_loader) {};


/**
 * Shorthand for transitively loading and processing all imports
 * beginning at href.
 * @param {string} href The root import to begin loading from.
 * @param {Object=} opt_options Any additional options for the load.
 */
hydrolysis.Analyzer.analyze = function(href, opt_options) {};



/**
 * Contains information useful for debugging. Should not be used in production
 * code and the API may change on short notice.
 * @type {!Object}
 */
Polymer.telemetry;

/**
 * Number of elements instantiated so far.
 * @type {number}
 */
Polymer.telemetry.instanceCount;

/**
 * Array of all registered element prototypes. Being prototypes, not all runtime
 * properties will be available, but eg. `is` is always there.
 * @type {!Array<!PolymerElement>}
 */
Polymer.telemetry.registrations;

Polymer.AppLayout;

/** @constructor */
Polymer.AppLayout.LocalDomWithBackground = function(){};
/** @type {!HTMLElement} */
Polymer.AppLayout.LocalDomWithBackground.prototype.backgroundFrontLayer;
/** @type {!HTMLElement} */
Polymer.AppLayout.LocalDomWithBackground.prototype.backgroundRearLayer;
/** @type {!HTMLElement} */
Polymer.AppLayout.LocalDomWithBackground.prototype.background;

/**
 * @constructor
 * @extends {PolymerElement}
 */
Polymer.AppLayout.ElementWithBackground = function(){};

// TODO(ajo): Follow up with app-layout team and remove private api from this prototype
Polymer.AppLayout.ElementWithBackground.prototype = {
  /** @type {!Polymer.AppLayout.LocalDomWithBackground} */
  $: null,
  /** @return {boolean} True if there's content below the current element */
  isContentBelow: function(){},
  /** Updates the elements scroll state */
  _updateScrollState: function(){},
  /** @return {boolean} true if the element is on screen */
  isOnScreen: function(){},
  /** @type {number} Internal bookkeeping to track screen position */
  _deltaHeight: 0,
  /** @return {?Element} Element in local dom by id. */
  _getDOMRef: function(title){}
}

/** @const */
Polymer.ArraySplice = {};

/**
 * Returns an array of splice records indicating the minimum edits required
 * to transform the `previous` array into the `current` array.
 *
 * Splice records are ordered by index and contain the following fields:
 * - `index`: index where edit started
 * - `removed`: array of removed items from this index
 * - `addedCount`: number of items added at this index
 *
 * This function is based on the Levenshtein "minimum edit distance"
 * algorithm. Note that updates are treated as removal followed by addition.
 *
 * The worst-case time complexity of this algorithm is `O(l * p)`
 *   l: The length of the current array
 *   p: The length of the previous array
 *
 * However, the worst-case complexity is reduced by an `O(n)` optimization
 * to detect any shared prefix & suffix between the two arrays and only
 * perform the more expensive minimum edit distance calculation over the
 * non-shared portions of the arrays.
 *
 * @param {!Array} current The "changed" array for which splices will be
 * calculated.
 * @param {!Array} previous The "unchanged" original array to compare
 * `current` against to determine the splices.
 * @return {!Array} Returns an array of splice record objects. Each of these
 * contains: `index` the location where the splice occurred; `removed`
 * the array of removed items from this location; `addedCount` the number
 * of items added at this location.
 */
Polymer.ArraySplice.calculateSplices = function(current, previous) {};
