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
 * @fileoverview Externs file for OpenSocial gadget libraries. Legacy API based
 * on the {@code _IG_...} is not supported here.
 * Note this may not be comprehensive.
 *
 * @see http://code.google.com/apis/gadgets/docs/reference/
 * @see http://incubator.apache.org/shindig/shindig-1.1.x/shindig-features/jsdoc
 * @externs
 */

// Root namespace for gadget related functionality.
var gadgets = {};


// Namespace providing operations for getting information about and modifying
// the window the gadget is placed in.
gadgets.window = {};

/**
 * @param {number=} opt_height The new height for the gadget.
 */
gadgets.window.adjustHeight = function(opt_height) {};

/**
 * @return {Object} Dimensions for the viewport.
 */
gadgets.window.getViewportDimensions = function() {};

/**
 * @param {string} title The new title for the gadget.
 */
gadgets.window.setTitle = function(title) {};

/**
 * Calculate inner content height is hard and different between
 * browsers rendering in Strict vs. Quirks mode.  We use a combination of
 * three properties within document.body and document.documentElement:
 * - scrollHeight
 * - offsetHeight
 * - clientHeight
 * These values differ significantly between browsers and rendering modes.
 * But there are patterns.  It just takes a lot of time and persistence
 * to figure out.
 * @return {number} Height of current window.
 */
gadgets.window.getHeight = function() {};

// Namespace providing operations for making remote procedure calls for
// gadget-to-container, container-to-gadget and gadget-to-gadget communication.
gadgets.rpc = {};

/**
 * Exported constant used by transports.
 * @type {string}
 */
gadgets.rpc.ACK;

/**
 * @param {?string} targetId The id of the target gadget, null for container.
 * @param {string} serviceName The RPC service to call.
 * @param {!Function=} opt_callback Function called when the RPC
 *     completes.
 * @param {...*} var_args Variable arguments that are passed to the RPC handler.
 */
gadgets.rpc.call = function(targetId, serviceName, opt_callback, var_args) {};

/**
 * Force RPC utilities to fallback to secure mechanisms for type=URL gadgets.
 */
gadgets.rpc.forceParentVerifiable = function() {};

/**
 * @return {string} The RPC relay mechanism.
 */
gadgets.rpc.getRelayChannel = function() {};

/**
 * @param {string} targetId The frame ID to get the relay for.
 * @return {string} The relay URL of the given gadget (or container).
 */
gadgets.rpc.getRelayUrl = function(targetId) {};

/**
 * Global init for RPC code.
 */
gadgets.rpc.init = function() {};

/**
 * Receives and processes an RPC request. (Not to be used directly.)
 * Only used by IFPC.
 * @param {Array<string>} fragment An RPC request fragment encoded as
 *     an array. The first 4 elements are target id, source id & call id,
 *     total packet number, packet id. The last element stores the actual
 *     JSON-encoded and URI escaped packet data.
 */
gadgets.rpc.receive = function(fragment) {};

/**
 * @param {string} serviceName The RPC service to register a handler for.
 * @param {!Function} handler Handler for an RPC call, return
 *     value will be sent back to the caller.
 */
gadgets.rpc.register = function(serviceName, handler) {};

/**
 * @param {!Function} handler Handler for unknown RPC calls,
 *     return value will be sent back to the caller.
 */
gadgets.rpc.registerDefault = function(handler) {};

/**
 * Helper method to retrieve the auth token for a given gadget.
 * @param {string} targetId Name of the target frame.
 * @return {string} The authentication token registered for this
 *     target id.
 */
gadgets.rpc.getAuthToken = function(targetId) {};

/**
 * Helper method returning a canonicalized protocol://host[:port] for
 * a given input URL, provided as a string. Used to compute convenient
 * relay URLs and to determine whether a call is coming from the same
 * domain as its receiver (bypassing the try/catch capability detection
 * flow, thereby obviating Firebug and other tools reporting an exception).
 * @param {string} url Base URL to canonicalize.
 * @return {string} The canonicalized URL.
 */
gadgets.rpc.getOrigin = function(url) {};

/**
 * Helper method returning a canonicalized protocol://host[:port] for
 * the relay URL of a given target frame.
 * @param {string} id Name of the target frame.
 * @return {string} The canonicalized URL.
 */
gadgets.rpc.getTargetOrigin = function(id) {};

/**
 * Sets the auth token of a target frame.
 * @param {string} targetId Name of the target frame.
 * @param {string} token The authentication token to use for all calls to or
 *     from this target id.
 */
gadgets.rpc.setAuthToken = function(targetId, token) {};

/**
 * Sets the relay URL of a target frame.
 * @param {string} targetId The id of the target gadget.
 * @param {string} url Full relay URL of the target frame.
 * @param {boolean=} opt_useLegacy True if this relay needs the legacy IFPC
 *     wire format.
 */
gadgets.rpc.setRelayUrl = function(targetId, url, opt_useLegacy) {};

/**
 * Setups the gadgets.rpc library to communicate with the receiver. This method
 * replaces setAuthToken and setRelayUrl.
 * @param {string} targetId The id of the target gadget.
 * @param {string=} opt_receiverUrl Full relay URL of the target frame.
 * @param {boolean=} opt_authToken null The authentication token to use for all
 *     calls to or from this target id.
 */
gadgets.rpc.setupReceiver = function(targetId, opt_receiverUrl, opt_authToken) {};

/**
 * Remove relay URL and auth token registration for a target frame.
 *
 * Note: Does not delete the iframe.
 * @param {string} receiverId The id of the target gadget.
 */
gadgets.rpc.removeReceiver = function(receiverId) {};

/**
 * @param {string} serviceName The RPC service to unregister the handler for.
 */
gadgets.rpc.unregister = function(serviceName) {};

/**
 * Unregisters the default service handler. Future unknown RPC
 * calls will fail silently.
 */
gadgets.rpc.unregisterDefault = function() {};

/**
 * Class providing access to user preferences, module dimensions, and messages.
 * @param {string=} opt_moduleId An optional module ID to get preferences for.
 * @constructor
 */
gadgets.Prefs = function(opt_moduleId) {};

/**
 * @param {string} key The user preference key.
 * @return {Array<string>} The array value of the preference.
 */
gadgets.Prefs.prototype.getArray = function(key) {};

/**
 * @param {string} key The user preference key.
 * @return {boolean} The boolean value of the preference.
 */
gadgets.Prefs.prototype.getBool = function(key) {};

/**
 * @param {string} key The user preference key.
 * @return {number} The float value of the preference.
 */
gadgets.Prefs.prototype.getFloat = function(key) {};

/**
 * @param {string} key The user preference key.
 * @return {number} The int value of the preference.
 */
gadgets.Prefs.prototype.getInt = function(key) {};

/**
 * @param {string} key The user preference key.
 * @return {string} The string value of the preference.
 */
gadgets.Prefs.prototype.getString = function(key) {};

/**
 * @return {string} The country code.
 */
gadgets.Prefs.prototype.getCountry = function() {};

/**
 * @return {string} The language code.
 */
gadgets.Prefs.prototype.getLang = function() {};

/**
 * @return {number} The module's id.
 */
gadgets.Prefs.prototype.getModuleId = function() {};

/**
 * @param {string} key The message key.
 * @return {string} The unformatted message.
 */
gadgets.Prefs.prototype.getMsg = function(key) {};

/**
 * @param {string} key The preference key.
 * @param {string|number} value The preference value.
 */
gadgets.Prefs.prototype.set = function(key, value) {};

/**
 * @param {string} key The preference key.
 * @param {Array<string>} array The preference array.
 */
gadgets.Prefs.prototype.setArray = function(key, array) {};


// Namespace for embedding flash content in gadgets.
gadgets.flash = {};

/**
 * @return {boolean} Injects the cached Flash file into the DOM tree.
 */
gadgets.flash.embedCachedFlash = function() {};

/**
 * @return {number} The major version of Flash Player or 0 if Flash is not
 *     supported.
 */
gadgets.flash.getMajorVersion = function() {};

/**
 * @param {string} url The URL of the flash to embed.
 * @param {string|Element} container The ID or object reference to the
 *     existing HTML container.
 * @param {number} minVersion The minimum version required.
 * @param {Object=} opt_params An optional object that may contain any valid
 *     HTML parameters that will be passed to the Flash movie.
 * @return {boolean} Whether the function call completes successfully.
 */
gadgets.flash.embedFlash = function(
    url, container, minVersion, opt_params) {};

// Namespace for retrieving content from remote servers via the gadgets proxy.
gadgets.io = {};

/**
 * Gets the proxy version of the passed-in URL.
 *
 * @param {string} url The URL to get the proxy URL for
 * @param {Object=} opt_params Optional Parameter Object.
 *     The following properties are supported:
 *       .REFRESH_INTERVAL The number of seconds that this
 *           content should be cached.  Defaults to 3600.
 *
 * @return {string} The proxied version of the URL
 */
gadgets.io.getProxyUrl = function(url, opt_params) {};

/**
 * @param {string} url The URL to request data from.
 * @param {Function} callback The callback function.
 * @param {Object=} opt_params Optional map of parameters sent on request, see
 *     gadgets.io.RequestParameters.
 */
gadgets.io.makeRequest = function(url, callback, opt_params) {};

/**
 * Converts an input object into a URL-encoded data string. (key=value&...).
 * @param {Object} fields The post fields you wish to encode.
 * @return {string} The processed post data; this includes a trailing
 *     ampersand (&).
 */
gadgets.io.encodeValues = function(fields) {};

/**
 * Enumeration of request parameters.
 * @enum {string}
 */
gadgets.io.RequestParameters = {
  AUTHORIZATION: '',
  CONTENT_TYPE: '',
  GET_SUMMARIES: '',
  HEADERS: '',
  METHOD: '',
  NUM_ENTRIES: '',
  OAUTH_REQUEST_TOKEN: '',
  OAUTH_REQUEST_TOKEN_SECRET: '',
  OAUTH_SERVICE_NAME: '',
  OAUTH_TOKEN_NAME: '',
  OAUTH_USE_TOKEN: '',
  POST_DATA: '',
  REFRESH_INTERVAL: ''
};

/**
 * Enumeration of content types that can be specified in
 * {@link gadgets.io.RequestParameters.AUTHORIZATION}
 * @enum {string}
 */
gadgets.io.AuthorizationType = {
  NONE: '',
  OAUTH: '',
  SIGNED: ''
};

/**
 * Enumeration of content types that can be specified in
 * {@link gadgets.io.RequestParameters.CONTENT_TYPE}
 * @enum {string}
 */
gadgets.io.ContentType = {
  DOM: '',
  FEED: '',
  JSON: '',
  TEXT: ''
};

/**
 * Enumeration of content types that can be specified in
 * {@link gadgets.io.RequestParameters.METHOD}
 * @enum {string}
 */
gadgets.io.MethodType = {
  DELETE: '',
  GET: '',
  HEAD: '',
  POST: '',
  PUT: ''
};

/**
 * This is the response object that is passed to the callback of
 * gadgets.io.makeRequest. It is never explicitly called "ResponseObject" in the
 * documentation, but the documentation does refer to an object that is passed
 * to the callback. This is that object.
 * @see http://wiki.opensocial.org/index.php?title=Gadgets.io_(v0.9)#gadgets.io.makeRequest
 */
gadgets.io.ResponseObject = {};
/**@type {Object}*/ gadgets.io.ResponseObject.data;
/**@type {Array<string>}*/ gadgets.io.ResponseObject.errors;
/**@type {Object}*/ gadgets.io.ResponseObject.headers;
/**@type {number}*/ gadgets.io.ResponseObject.rc;
/**@type {string}*/ gadgets.io.ResponseObject.text;
/**@type {string}*/ gadgets.io.ResponseObject.oauthApprovalUrl;
/**@type {string}*/ gadgets.io.ResponseObject.oauthError;
/**@type {string}*/ gadgets.io.ResponseObject.oauthErrorText;

// Namespace for views
gadgets.views = {};

/**
 * Returns the current view.
 * @return {gadgets.views.View} The current view.
 */
gadgets.views.getCurrentView = function() {};

/**
 * Get parameters passed into the view
 * @return {Object} Map string -> string of parameters passed in.
 */
gadgets.views.getParams = function() {};

/**
 * @return {Object} Map<gadgets.views.ViewType, String, gadgets.views.View>
 *    A map of all the supported views. Keys each gadgets.view.View by its name.
 */
gadgets.views.getSupportedViews = function() {};

/**
 * @param {gadgets.views.View|string} view The view to navigate to.
 * @param {Object=} opt_params Map<String, String>: Parameters to pass to the
 *     gadget after it has been navigated to on the surface.
 * @param {string=} opt_ownerId The ID of the owner of the page to navigate to;
 *     defaults to the current owner.
 */
gadgets.views.requestNavigateTo = function(view, opt_params, opt_ownerId) {};

/**
 * @constructor
 */
gadgets.views.View = function() {};

/**
 * @return {string} Returns the name of this view.
 */
gadgets.views.View.prototype.getName = function() {}

/**
 * @return {boolean} True if the gadget is the only visible gadget; otherwise,
 *     false.
 */
gadgets.views.View.prototype.isOnlyVisibleGadget = function() {};

// Namespace for utilities.
gadgets.util = {};

/**
 * Escapes the input using HTML entities to make it safer.
 * @param {string} str The string to escape.
 * @return {string} The escaped string.
 */
gadgets.util.escapeString = function(str) {};

/**
 * Reverses escapeString
 * @param {string} str The string to unescape.
 * @return {string} The unescaped string.
 */
gadgets.util.unescapeString = function(str) {};

/**
 * Returns the parameters for a feature.
 * @param {string} feature The feature name.
 * @return {Object} Parameters for the feature or null.
 */
gadgets.util.getFeatureParameters = function(feature) {};

/**
 * Returns whether the specified feature is supported.
 * @param {string} feature The feature name.
 * @return {boolean} Whether the feature is supported.
 */
gadgets.util.hasFeature = function(feature) {};

/**
 * Registers a function to be called when the gadget loads.
 * @param {function()} fn The function to call.
 */
gadgets.util.registerOnLoadHandler = function(fn) {};

/**
 * Parses the current document's location and returns an object representing
 * the parameters in the query string.
 * @param {string=} opt_url Optional URL whose parameters to parse.
 *     Defaults to window's current URL.
 * @return {Object} Parameters from the query string.
 */
gadgets.util.getUrlParameters = function(opt_url) {};

/**
 * Creates a closure that is suitable for passing as a callback.
 * Any number of arguments may be passed to the callback;
 * they will be received in the order they are passed in.
 *
 * @param {Object} scope The execution scope; may be null if there is no
 *     need to associate a specific instance of an object with this
 *     callback
 * @param {Function} callback The callback to invoke when this is run;
 *     any arguments passed in will be passed after your initial arguments
 * @param {...*} var_args Initial arguments to be passed to the callback
 * @returns {Function} The closure.
 */
gadgets.util.makeClosure = function(scope, callback, var_args) {};

/**
 * Attach an event listener to given DOM element (Not a gadget standard)
 *
 * @param {Object} elem DOM element on which to attach event.
 * @param {string} eventName Event type to listen for.
 * @param {function()} callback Invoked when specified event occurs.
 * @param {boolean} useCapture If true, initiates capture.
 */
gadgets.util.attachBrowserEvent = function(
    elem, eventName, callback, useCapture) {};

//Namespace for JSON processing.
gadgets.json = {};

/**
 * Convert a JSON object into a string.
 * @param {Object} json
 * @return {String} The JSON as a string
 */
gadgets.json.stringify = function(json) {};

/**
 * Convert a string into a JSON object.
 * Uses safe RegEx match before parsing.
 * @param {string} s The string
 * @return {Object} The JSON
 */
gadgets.json.parse = function(s) {};

//Namespace for config.
gadgets.config = {};

/**
 * Registers a configurable component and its configuration parameters.
 * Multiple callbacks may be registered for a single component if needed.
 *
 * @param {string} component The name of the component to register. Should
 *     be the same as the fully qualified name of the <Require> feature or
 *     the name of a fully qualified JavaScript object reference
 *     (e.g. "gadgets.io").
 * @param {Object=} opt_validators Mapping of option name to validation
 *     functions that take the form function(data) {return isValid(data);}
 * @param {Function=} opt_callback A function to be invoked when a
 *     configuration is registered. If passed, this function will be invoked
 *     immediately after a call to init has been made. Do not assume that
 *     dependent libraries have been configured until after init is
 *     complete. If you rely on this, it is better to defer calling
 *     dependent libraries until you can be sure that configuration is
 *     complete. Takes the form function(config), where config will be
 *     all registered config data for all components. This allows your
 *     component to read configuration from other components.
 * @param {boolean=} opt_callOnUpdate Whether the callback shall be call
 *     on gadgets.config.update() as well.
 */
gadgets.config.register = function(component, opt_validators, opt_callback,
    opt_callOnUpdate) {};

/**
 * Retrieves configuration data on demand.
 *
 * @param {string=} opt_component The component to fetch. If not provided
 *     all configuration will be returned.
 * @return {Object} The requested configuration, or an empty object if no
 *     configuration has been registered for that component.
 */
gadgets.config.get = function(opt_component) {};

/**
 * Initializes the configuration.
 *
 * @param {Object} config The full set of configuration data.
 * @param {Boolean=} opt_noValidation True if you want to skip validation.
 */
gadgets.config.init = function(config, opt_noValidation) {};


/**
 * Creates an HTML or XHTML element.
 * @param {string} tagName The type of element to construct.
 * @return {Element} The newly constructed element.
 */
gadgets.util.createElement = function(tagName) {};


/**
 * Creates an HTML or XHTML iframe element with attributes.
 * @param {Object=} opt_attribs Optional set of attributes to attach. The
 * only working attributes are spelled the same way in XHTML attribute
 * naming (most strict, all-lower-case), HTML attribute naming (less strict,
 * case-insensitive), and JavaScript property naming (some properties named
 * incompatibly with XHTML/HTML).
 * @return {Element} The DOM node representing body.
 */
gadgets.util.createIframeElement = function(opt_attribs) {};


/**
 * Gets the HTML or XHTML body element.
 * @return {Element} The DOM node representing body.
 */
gadgets.util.getBodyElement = function() {};
