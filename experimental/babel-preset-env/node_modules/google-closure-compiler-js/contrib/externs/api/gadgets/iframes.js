/*
 * Copyright 2008 Google Inc.
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
 * @fileoverview Externs file for the Iframes library.
 * @externs
 */


/**
 * The namespace for most of the APIs.
 * @type {!iframes.Iframes}
 * @suppress {checkTypes} In some crazy locations, this is being used as a
 *     source file.  It needs to be assigned to some object so that the
 *     iframes.Iframes definition doesn't fail.
 */
var iframes = /** @type {!iframes.Iframes} */ ({});


/**
 * The type for the Iframes API.
 * @constructor
 */
iframes.Iframes = function() {};


/**
 * Gets the handler for a given style.
 *
 * @param {string} style
 * @return {Object|Function} The handler for the given style.
 */
iframes.Iframes.prototype.getHandler = function(style) {};

/**
 * Sets the handler for a given style.
 *
 * @param {string} style
 * @param {Object|Function} handler The handler for a given style.
 *     If the style handle is a function, the object returned by this
 *     function providing the iframe as the parameter is used as the
 *     actual style handler for every iframe opened in the style it
 *     handles.
 *     The follow methods of the handler are significant (note
 *     that the iframe parameter only presents when the original
 *     style handler is not a function):
 *       open(iframe): called to open the iframe.
 *         call iframe.openInto(el) to perform the open action.
 *       onready(iframe): called when the iframe is ready.
 *       close(iframe): called to close the iframe.
 */
iframes.Iframes.prototype.setHandler = function(style, handler) {};

/**
 * Gets a deferred-loaded style handler.
 * @param {string} style The name of the style.
 * @return {?function(function())} The deferred loader, if any.
 */
iframes.Iframes.prototype.getDeferredHandler = function(style) {};

/**
 * Sets a deferred-loaded style handler.
 * @param {string} style The name of the style.
 * @param {function(function())} loader The method to load the new style
 *     handler, which should call iframes.setHandler for that style.
 *     It then needs to call the callback method passed in.
 */
iframes.Iframes.prototype.setDeferredHandler = function(style, loader) {};

/**
 * This is an internal class to represent an iframe, not the DOM element.
 * @constructor
 */
iframes.Iframe = function() {};

/**
 * Methods used to pass to the iframe being opened.
 * @return {Object}
 */
iframes.Iframe.prototype.getMethods = function() {};

/**
 * Parameters used for opening the widget.
 * @return {Object}
 */
iframes.Iframe.prototype.getOpenParams = function() {};

/**
 * Parameters used to pass to the iframe being opened.
 * @return {Object}
 */
iframes.Iframe.prototype.getParams = function() {};

/**
 * @type {Element}
 * @deprecated
 */
iframes.Iframe.prototype.containerDiv;

/**
 * DOM reference to element containing iframe element.
 *
 * @return {Element}
 */
iframes.Iframe.prototype.getSiteEl = function() {};

/**
 * @param {Element} element DOM element containing the iframe element.
 */
iframes.Iframe.prototype.setSiteEl = function(element) {};

/**
 * DOM reference to the iframe element containing the widget.
 *
 * @return {Element}
 */
iframes.Iframe.prototype.getIframeEl = function() {};

/**
 * generated ID that will be set on the widget when it is opened
 *
 * @return {string}
 */
iframes.Iframe.prototype.getId = function() {};

/**
 * Iframe class instance that opened our Iframe instance.
 *
 * @return {iframes.Iframe}
 */
iframes.Iframe.prototype.getOpenerIframe = function() {};

/**
 * Exposes the method so it can be called from iframe object.
 * This is supposed be called by the style handler while handling 'open'
 * before calling 'openInto'.
 *
 * @param {string} name Name of the method as being called.
 * @param {Function} method The method to be exposed.
 */
iframes.Iframe.prototype.exposeMethod = function(name, method) {};

/**
 * @param {string|Element} el The DOM element or its ID to open the iframe
 *     into.
 * @param {Object=} opt_iframeAttributes Key-value pairs of iframe attributes.
 * @return {iframes.Iframe} This iframe object (not the DOM element).
 **/
iframes.Iframe.prototype.openInto = function(el, opt_iframeAttributes) {};

/**
 * Close the iframe.
 *
 * @param {*=} opt_params Data to pass to the callback.
 * @return {*} The result from the callback function.
 */
iframes.Iframe.prototype.close = function(opt_params) {};

/**
 * Removes the iframe element from the DOM tree.
 */
iframes.Iframe.prototype.remove = function() {};

/**
 * Adds a callback method for a given type of event.
 *
 * @param {string} type The event type: e.g. 'ready' or 'close'.
 * @param {Function} callback The callback method.
 */
iframes.Iframe.prototype.addCallback = function(type, callback) {};

/**
 * Removes a callback method for a given type of event.
 *
 * @param {string} type The event type used in 'addCallback'.
 * @param {Function} callback The callback method used in 'addCallback'.
 */
iframes.Iframe.prototype.removeCallback = function(type, callback) {};

/**
 * Allows a global function for all iframes.
 *
 * @param {string} name The name of the method for the iframes.
 * @param {?function(...*) : *=} opt_func A optional function, by default
 *     window[name].
 */
iframes.Iframes.prototype.allow = function(name, opt_func) {};

/**
 * Opens an iframe.
 *
 * WARNING: This API takes ownership of all object parameters and will
 * modify them. Make a copy if you want to reuse them.
 *
 * @param {string} url The URL of the iframe to be opened.
 * @param {Object} openParams The parameters for opening the iframe.
 *    style: specify which handler is used.
 *    For the default handler, the follow attributes are used:
 *      element: the element which the iframe would be opened into.
 * @param {Object} params The data to be passed to the iframe.
 *     All properties should be string.
 * @param {Object|function(...*) : *=} opt_methods: Functions to passed to
 *     the iframe. All properties should be functions. If no 'callback'
 *     argument is provided and the argument in this position is a function
 *     instead of an object, it is considered as the next parameter
 *     'callback', not this parameter 'methods'.
 * @param {?function(...*) : *=} opt_callback: a callback function called
 *     when the iframe is closed.
 *
 * @return {iframes.Iframe} The opened iframe.
 */
iframes.Iframes.prototype.open = function(
    url, openParams, params, opt_methods, opt_callback) {};

/**
 * Closes this iframe.
 *
 * @param {*=} opt_params The parameters to pass back to the parent iframe.
 * @param {?function(...*) : *=} opt_callback The callback function after
 *     parent processed the event.
 */
iframes.Iframes.prototype.close = function(opt_params, opt_callback) {};

/**
 * Indicates that this iframe is ready.  The exactly semantic depends on
 * the style handler, but generally it means ready to be displayed and
 * it should be called the page is drawn and initial data loaded.
 *
 * @param {Object=} opt_params The parameters to pass back to the parent iframe.
 * @param {Object|function(...*) : *=} opt_methods: Functions to passed to
 *     the iframe. All properties should be functions. If no 'callback'
 *     argument is provided and the argument in this position is a function
 *     instead of an object, it is considered as the next parameter
 *     'callback', not this parameter 'methods'.
 * @param {?function(...*) : *=} opt_callback The callback function after
 *     parent processed the event.
 */
iframes.Iframes.prototype.ready = function(
    opt_params, opt_methods, opt_callback) {};

/**
 * Passes the parent's origin and referer to the callback.
 * @param {Function} callback Function
 *     that will get parent info passed to it.
 */
iframes.Iframes.prototype.getParentInfo = function(callback) {};

/**
 * Export browser events to your opener.
 * @param {Array<string>} events List of events to export. Currently only
 *     supports mouseover and mouseout.
 */
iframes.Iframes.prototype.propagate = function(events) {};

/**
 * Asks the parent window to change the width and height of this iframe.
 *
 * @param {Object} params The width and/or height in number of pixels to be
 *     resized. Use 'height': 'auto' for current window content height.
 */

iframes.Iframes.prototype.resize = function(params) {};

/**
 * @param {Object} params
 * @deprecated
 */
iframes.Iframes.prototype.resizeMe = function(params) {};

/**
 * @return {string} The full URI for the Google Connect JS bundle.
 */
iframes.Iframes.prototype.getGoogleConnectJsUri = function() {};

/**
 * Allows client to override the Google Connect JS to use.
 * @param {string} version The versioned JS file to use.
 */
iframes.Iframes.prototype.setGoogleConnectJsVersion = function(version) {};

/**
 * Allows the client to use a different JS hint.
 * @param {string} hint The JS hint to use.
 */
iframes.Iframes.prototype.setJsHint = function(hint) {};

/**
 * Allows the client to use a different bootstrap hint.
 * @param {string} hint The bootstrap hint to use.
 */
iframes.Iframes.prototype.setBootstrapHint = function(hint) {};

/**
 * @param {string} version
 * @deprecated
 */
iframes.Iframes.prototype.setVersionOverride = function(version) {};

/**
 * Inside an iframe, the properties of the iframer object are the data and
 * functions provided in iframes.open.
 * @type {!Object|undefined}
 */
iframes.Iframes.prototype.iframer = {};

/**
 * Inside an iframe, the properties of the iframer object are the data and
 * functions provided in iframes.open.
 * @type {!Object}
 */
var iframer = {};

/**
 * Send a message to the parent.
 * @param {string} message The message name.
 * @param {*=} opt_data Optional data to pass.
 * @param {Function=} opt_callback Optional callback to handle response.
 * @param {Function=} opt_filter Optional iframes filter (not used).
 */
iframer.send = function(message, opt_data, opt_callback, opt_filter) {};

/**
 * Send a message to the iframe.
 * @param {string} message The message name.
 * @param {*=} opt_data Optional data to pass.
 * @param {Function=} opt_callback Optional callback to handle response.
 * @param {Function=} opt_filter Optional iframes filter (not used).
 */
iframes.Iframe.prototype.send = function(
    message, opt_data, opt_callback, opt_filter) {};

/**
 * Register an handler for messages from the iframe.
 * @param {string} message The message name.
 * @param {Function} callback Message handler.
 * @param {Function=} opt_filter Optional iframes filter (not used).
 */
iframes.Iframe.prototype.register = function(message, callback, opt_filter) {};

/**
 * Filter function to allow cross origin messages.
 * @param {Object} iframe Iframe to filter.
 */
iframes.Iframes.prototype.CROSS_ORIGIN_IFRAMES_FILTER = function(iframe) {};
