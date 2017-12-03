/*
 * Copyright 2011 The Closure Compiler Authors.
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
 * @fileoverview Externs for jQuery 1.12 & 2.2
 *
 * The jQuery API is identical for the 1.12.x+ and 2.2+ branches. In addition,
 * the API has not changed in releases since that date. These externs are valid
 * for all jQuery releases since 1.12 and 2.2.
 *
 * Note that some functions use different return types depending on the number
 * of parameters passed in. In these cases, you may need to annotate the type
 * of the result in your code, so the JSCompiler understands which type you're
 * expecting. For example:
 *    <code>var elt = /** @type {Element} * / (foo.get(0));</code>
 *
 * @see http://api.jquery.com/
 * @externs
 */

/**
 * @typedef {(Window|Document|Element|Array<Element>|string|jQuery|
 *     NodeList)}
 */
var jQuerySelector;

/** @typedef {function(...)|Array<function(...)>} */
var jQueryCallback;

/**
 * @record
 */
function jQueryAjaxSettings() {};

/** @type {(Object<string, string>|undefined)} */
jQueryAjaxSettings.prototype.accepts;

/** @type {(?boolean|undefined)} */
jQueryAjaxSettings.prototype.async;

/** @type {(function(jQuery.jqXHR, (jQueryAjaxSettings|Object<string, *>))|undefined)} */
jQueryAjaxSettings.prototype.beforeSend;

/** @type {(?boolean|undefined)} */
jQueryAjaxSettings.prototype.cache;

/** @type {(function(jQuery.jqXHR, string)|undefined)} */
jQueryAjaxSettings.prototype.complete;

/** @type {(Object<string, RegExp>|undefined)} */
jQueryAjaxSettings.prototype.contents;

/** @type {(?string|boolean|undefined)} */
jQueryAjaxSettings.prototype.contentType;

/** @type {(Object<?, ?>|jQueryAjaxSettings|undefined)} */
jQueryAjaxSettings.prototype.context;

/** @type {(Object<string, Function>|undefined)} */
jQueryAjaxSettings.prototype.converters;

/** @type {(?boolean|undefined)} */
jQueryAjaxSettings.prototype.crossDomain;

/** @type {(Object<?, ?>|?string|Array<?>|undefined)} */
jQueryAjaxSettings.prototype.data;

/** @type {(function(string, string):?|undefined)} */
jQueryAjaxSettings.prototype.dataFilter;

/** @type {(?string|undefined)} */
jQueryAjaxSettings.prototype.dataType;

/** @type {(function(jQuery.jqXHR, string, string)|undefined)} */
jQueryAjaxSettings.prototype.error;

/** @type {(?boolean|undefined)} */
jQueryAjaxSettings.prototype.global;

/** @type {(Object<?, ?>|undefined)} */
jQueryAjaxSettings.prototype.headers;

/** @type {(?boolean|undefined)} */
jQueryAjaxSettings.prototype.ifModified;

/** @type {(?boolean|undefined)} */
jQueryAjaxSettings.prototype.isLocal;

/** @type {(?string|undefined)} */
jQueryAjaxSettings.prototype.jsonp;

/** @type {(?string|function()|undefined)} */
jQueryAjaxSettings.prototype.jsonpCallback;

/** @type {(?string|undefined)} */
jQueryAjaxSettings.prototype.mimeType;

/** @type {(?string|undefined)} */
jQueryAjaxSettings.prototype.password;

/** @type {(?boolean|undefined)} */
jQueryAjaxSettings.prototype.processData;

/** @type {(?string|undefined)} */
jQueryAjaxSettings.prototype.scriptCharset;

/** @type {(Object<number, function()>|undefined)} */
jQueryAjaxSettings.prototype.statusCode;

/** @type {(function(?, string, jQuery.jqXHR)|undefined)} */
jQueryAjaxSettings.prototype.success;

/** @type {(?number|undefined)} */
jQueryAjaxSettings.prototype.timeout;

/** @type {(?boolean|undefined)} */
jQueryAjaxSettings.prototype.traditional;

/** @type {(?string|undefined)} */
jQueryAjaxSettings.prototype.type;

/** @type {(?string|undefined)} */
jQueryAjaxSettings.prototype.url;

/** @type {(?string|undefined)} */
jQueryAjaxSettings.prototype.username;

/** @type {(function():(ActiveXObject|XMLHttpRequest)|undefined)} */
jQueryAjaxSettings.prototype.xhr;

/** @type {(Object<?, ?>|undefined)} */
jQueryAjaxSettings.prototype.xhrFields;

/**
 * @record
 * @extends {jQueryAjaxSettings}
 */
function jQueryAjaxSettingsExtra() {};

/** @type {Object<string, boolean>} */
jQueryAjaxSettingsExtra.prototype.flatOptions;

/** @type {Object<string, string>} */
jQueryAjaxSettingsExtra.prototype.responseFields;


/**
 * @record
 */
function jQueryAjaxTransport(){};

/** @return {undefined} */
jQueryAjaxTransport.abort = function() {};

/**
 * @param {!IObject<string,string>} headers
 * @param {function(number, string, !IObject<string,string>=, string=):undefined} completeCallback
 * @return {undefined}
 */
jQueryAjaxTransport.send = function(headers, completeCallback) {};


/**
 * @constructor
 * @param {(jQuerySelector|Object|jQuery|string|function())=} arg1
 * @param {(Element|jQuery|Document|
 *     Object<string, (string|function(!jQuery.Event))>)=} arg2
 * @return {!jQuery}
 * @implements {Iterable}
 */
function jQuery(arg1, arg2) {};

/**
 * @const
 */
var $ = jQuery;

/**
 * @param {(jQuerySelector|Array<Element>|string|jQuery)} arg1
 * @param {Element=} context
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.add = function(arg1, context) {};

/**
 * @param {(jQuerySelector|Array<Element>|string|jQuery)=} arg1
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.addBack = function(arg1) {};

/**
 * @param {(string|function(number,String))} arg1
 * @return {!jQuery}
 */
jQuery.prototype.addClass = function(arg1) {};

/**
 * @param {(string|Element|jQuery|function(number))} arg1
 * @param {(string|Element|Array<Element>|jQuery)=} content
 * @return {!jQuery}
 */
jQuery.prototype.after = function(arg1, content) {};

/**
 * @param {(string|jQueryAjaxSettings|Object<string,*>)} arg1
 * @param {(jQueryAjaxSettings|Object<string, *>)=} settings
 * @return {!jQuery.jqXHR}
 */
jQuery.ajax = function(arg1, settings) {};

/**
 * @param {function(!jQuery.Event,XMLHttpRequest,(jQueryAjaxSettings|Object<string, *>))} handler
 * @return {!jQuery}
 */
jQuery.prototype.ajaxComplete = function(handler) {};

/**
 * @param {function(!jQuery.Event,jQuery.jqXHR,(jQueryAjaxSettings|Object<string, *>),*)} handler
 * @return {!jQuery}
 */
jQuery.prototype.ajaxError = function(handler) {};

/**
 * @param {(string|function((jQueryAjaxSettings|Object<string, *>),(jQueryAjaxSettings|Object<string, *>),jQuery.jqXHR))} dataTypes
 * @param {function((jQueryAjaxSettings|Object<string, *>),(jQueryAjaxSettings|Object<string, *>),jQuery.jqXHR)=} handler
 */
jQuery.ajaxPrefilter = function(dataTypes, handler) {};

/**
 * @param {function(!jQuery.Event,jQuery.jqXHR,(jQueryAjaxSettings|Object<string, *>))} handler
 * @return {!jQuery}
 */
jQuery.prototype.ajaxSend = function(handler) {};

/** @const {jQueryAjaxSettingsExtra|Object<string, *>} */
jQuery.ajaxSettings;

/** @param {jQueryAjaxSettings|Object<string, *>} options */
jQuery.ajaxSetup = function(options) {};

/**
 * @param {function()} handler
 * @return {!jQuery}
 */
jQuery.prototype.ajaxStart = function(handler) {};

/**
 * @param {function()} handler
 * @return {!jQuery}
 */
jQuery.prototype.ajaxStop = function(handler) {};

/**
 * @param {function(!jQuery.Event,XMLHttpRequest,(jQueryAjaxSettings|Object<string, *>), ?)} handler
 * @return {!jQuery}
 */
jQuery.prototype.ajaxSuccess = function(handler) {};

/**
 * @param {string} dataType
 * @param {function(!jQueryAjaxSettingsExtra, !jQueryAjaxSettings, !jQuery.jqXHR):(!jQueryAjaxTransport|undefined)} handler
 * @return {undefined}
 */
jQuery.ajaxTransport = function(dataType, handler) {};

/**
 * @deprecated Please use .addBack(selector) instead.
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.andSelf = function() {};

/**
 * @param {Object<string,*>} properties
 * @param {(string|number|function()|Object<string,*>)=} arg2
 * @param {(string|function())=} easing
 * @param {function()=} complete
 * @return {!jQuery}
 */
jQuery.prototype.animate = function(properties, arg2, easing, complete) {};

/**
 * @param {(string|Element|Array<Element>|jQuery|function(number,string))} arg1
 * @param {...(string|Element|Array<Element>|jQuery)} content
 * @return {!jQuery}
 */
jQuery.prototype.append = function(arg1, content) {};

/**
 * @param {(jQuerySelector|Element|jQuery)} target
 * @return {!jQuery}
 */
jQuery.prototype.appendTo = function(target) {};

/**
 * @param {(string|Object<string,*>)} arg1
 * @param {(string|number|boolean|function(number,string))=} arg2
 * @return {(string|!jQuery)}
 */
jQuery.prototype.attr = function(arg1, arg2) {};

/**
 * @param {(string|Element|jQuery|function())} arg1
 * @param {(string|Element|Array<Element>|jQuery)=} content
 * @return {!jQuery}
 */
jQuery.prototype.before = function(arg1, content) {};

/**
 * @param {(string|Object<string, function(!jQuery.Event)>)} arg1
 * @param {(Object<string, *>|function(!jQuery.Event)|boolean)=} eventData
 * @param {(function(!jQuery.Event)|boolean)=} arg3
 * @return {!jQuery}
 */
jQuery.prototype.bind = function(arg1, eventData, arg3) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.blur = function(arg1, handler) {};

/**
 * @constructor
 * @private
 */
jQuery.callbacks = function () {};

/**
 * @param {string=} flags
 * @return {!jQuery.callbacks}
 */
jQuery.Callbacks = function (flags) {};

/** @param {function()} callbacks */
jQuery.callbacks.prototype.add = function(callbacks) {};

/** @return {undefined} */
jQuery.callbacks.prototype.disable = function() {};

/** @return {undefined} */
jQuery.callbacks.prototype.empty = function() {};

/** @param {...*} var_args */
jQuery.callbacks.prototype.fire = function(var_args) {};

/**
 * @return {boolean}
 * @nosideeffects
 */
jQuery.callbacks.prototype.fired = function() {};

/** @param {...*} var_args */
jQuery.callbacks.prototype.fireWith = function(var_args) {};

/**
 * @param {function()} callback
 * @return {boolean}
 * @nosideeffects
 */
jQuery.callbacks.prototype.has = function(callback) {};

/** @return {undefined} */
jQuery.callbacks.prototype.lock = function() {};

/**
 * @return {boolean}
 * @nosideeffects
 */
jQuery.callbacks.prototype.locked = function() {};

/** @param {function()} callbacks */
jQuery.callbacks.prototype.remove = function(callbacks) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.change = function(arg1, handler) {};

/**
 * @param {jQuerySelector=} selector
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.children = function(selector) {};

/**
 * @param {string=} queueName
 * @return {!jQuery}
 */
jQuery.prototype.clearQueue = function(queueName) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.click = function(arg1, handler) {};

/**
 * @param {boolean=} withDataAndEvents
 * @param {boolean=} deepWithDataAndEvents
 * @return {!jQuery}
 * @suppress {checkTypes} see https://code.google.com/p/closure-compiler/issues/detail?id=583
 */
jQuery.prototype.clone = function(withDataAndEvents, deepWithDataAndEvents) {};

/**
 * @param {(jQuerySelector|jQuery|Element|string)} arg1
 * @param {Element=} context
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.closest = function(arg1, context) {};

/**
 * @param {Element} container
 * @param {Element} contained
 * @return {boolean}
 * @nosideeffects
 */
jQuery.contains = function(container, contained) {};

/**
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.contents = function() {};

/** @type {Element|Document} */
jQuery.prototype.context;

/**
 * @param {(string|Object<string,*>)} arg1
 * @param {(string|number|function(number,*))=} arg2
 * @return {(string|!jQuery)}
 */
jQuery.prototype.css = function(arg1, arg2) {};

/** @type {Object<string, *>} */
jQuery.cssHooks;

/**
 * @param {Element} elem
 * @param {string=} key
 * @param {*=} value
 * @return {*}
 */
jQuery.data = function(elem, key, value) {};

/**
 * @param {(string|Object<string, *>)=} arg1
 * @param {*=} value
 * @return {*}
 */
jQuery.prototype.data = function(arg1, value) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.dblclick = function(arg1, handler) {};

/**
 * @constructor
 * @implements {jQuery.Promise}
 * @param {function()=} opt_fn
 * @see http://api.jquery.com/category/deferred-object/
 */
jQuery.deferred = function(opt_fn) {};

/**
 * @constructor
 * @extends {jQuery.deferred}
 * @param {function()=} opt_fn
 * @return {!jQuery.Deferred}
 */
jQuery.Deferred = function(opt_fn) {};

/**
 * @override
 * @param {jQueryCallback} alwaysCallbacks
 * @param {jQueryCallback=} alwaysCallbacks2
 * @return {!jQuery.deferred}
 */
jQuery.deferred.prototype.always
    = function(alwaysCallbacks, alwaysCallbacks2) {};

/**
 * @override
 * @param {jQueryCallback} doneCallbacks
 * @param {jQueryCallback=} doneCallbacks2
 * @return {!jQuery.deferred}
 */
jQuery.deferred.prototype.done = function(doneCallbacks, doneCallbacks2) {};

/**
 * @override
 * @param {jQueryCallback} failCallbacks
 * @param {jQueryCallback=} failCallbacks2
 * @return {!jQuery.deferred}
 */
jQuery.deferred.prototype.fail = function(failCallbacks, failCallbacks2) {};

/**
 * @param {...*} var_args
 * @return {!jQuery.deferred}
 */
jQuery.deferred.prototype.notify = function(var_args) {};

/**
 * @param {Object} context
 * @param {...*} var_args
 * @return {!jQuery.deferred}
 */
jQuery.deferred.prototype.notifyWith = function(context, var_args) {};

/**
 * @deprecated Please use deferred.then() instead.
 * @override
 * @param {function()=} doneFilter
 * @param {function()=} failFilter
 * @param {function()=} progressFilter
 * @return {!jQuery.Promise}
 */
jQuery.deferred.prototype.pipe =
    function(doneFilter, failFilter, progressFilter) {};

/**
 * @param {jQueryCallback} progressCallbacks
 * @return {!jQuery.deferred}
 */
jQuery.deferred.prototype.progress = function(progressCallbacks) {};

/**
 * @param {Object=} target
 * @return {!jQuery.Promise}
 */
jQuery.deferred.prototype.promise = function(target) {};

/**
 * @param {...*} var_args
 * @return {!jQuery.deferred}
 */
jQuery.deferred.prototype.reject = function(var_args) {};

/**
 * @param {Object} context
 * @param {Array<*>=} args
 * @return {!jQuery.deferred}
 */
jQuery.deferred.prototype.rejectWith = function(context, args) {};

/**
 * @param {...*} var_args
 * @return {!jQuery.deferred}
 */
jQuery.deferred.prototype.resolve = function(var_args) {};

/**
 * @param {Object} context
 * @param {Array<*>=} args
 * @return {!jQuery.deferred}
 */
jQuery.deferred.prototype.resolveWith = function(context, args) {};

/** @return {string} */
jQuery.deferred.prototype.state = function() {};

/**
 * @override
 * @param {jQueryCallback} doneCallbacks
 * @param {jQueryCallback=} failCallbacks
 * @param {jQueryCallback=} progressCallbacks
 * @return {!jQuery.deferred}
 */
jQuery.deferred.prototype.then
    = function(doneCallbacks, failCallbacks, progressCallbacks) {};

/**
 * @param {number} duration
 * @param {string=} queueName
 * @return {!jQuery}
 */
jQuery.prototype.delay = function(duration, queueName) {};

/**
 * @param {string} selector
 * @param {(string|Object<string,*>)} arg2
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg3
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.delegate = function(selector, arg2, arg3, handler) {};

/**
 * @param {Element} elem
 * @param {string=} queueName
 */
jQuery.dequeue = function(elem, queueName) {};

/**
 * @param {string=} queueName
 * @return {!jQuery}
 */
jQuery.prototype.dequeue = function(queueName) {};

/**
 * @param {jQuerySelector=} selector
 * @return {!jQuery}
 */
jQuery.prototype.detach = function(selector) {};

/**
 * @param {Object} collection
 * @param {function((number|string),?)} callback
 * @return {Object}
 */
jQuery.each = function(collection, callback) {};

/**
 * @param {function(number,Element)} fnc
 * @return {!jQuery}
 */
jQuery.prototype.each = function(fnc) {};


/** @return {!jQuery} */
jQuery.prototype.empty = function() {};

/**
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.end = function() {};

/**
 * @param {number} arg1
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.eq = function(arg1) {};

/**
 * @param {string} message
 * @throws {Error}
 */
jQuery.error = function(message) {};

/**
 * @deprecated Please use .on( "error", handler ) instead.
 * @param {(function(!jQuery.Event)|Object<string, *>)} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.error = function(arg1, handler) {};

/** @const */
jQuery.event = {};

/** @type {Array<string>} */
jQuery.event.props;

/** @type {Object<string, Object>} */
jQuery.event.special;

/**
 * @constructor
 * @param {string} eventType
 * @param {Object=} properties
 * @return {!jQuery.Event}
 */
jQuery.Event = function(eventType, properties) {};

/** @type {boolean} */
jQuery.Event.prototype.altKey;

/** @type {boolean} */
jQuery.Event.prototype.bubbles;

/** @type {number} */
jQuery.Event.prototype.button;

/** @type {number} */
jQuery.Event.prototype.buttons;

/** @type {boolean} */
jQuery.Event.prototype.cancelable;

/** @type {number} */
jQuery.Event.prototype.charCode;

/** @type {number} */
jQuery.Event.prototype.clientX;

/** @type {number} */
jQuery.Event.prototype.clientY;

/** @type {boolean} */
jQuery.Event.prototype.ctrlKey;

/** @type {Element} */
jQuery.Event.prototype.currentTarget;

/** @type {Object<string, *>} */
jQuery.Event.prototype.data;

/** @type {Element} */
jQuery.Event.prototype.delegateTarget;

/** @type {number} */
jQuery.Event.prototype.detail;

/** @type {number} */
jQuery.Event.prototype.eventPhase;

/**
 * @return {boolean}
 * @nosideeffects
 */
jQuery.Event.prototype.isDefaultPrevented = function() {};

/**
 * @return {boolean}
 * @nosideeffects
 */
jQuery.Event.prototype.isImmediatePropagationStopped = function() {};

/**
 * @return {boolean}
 * @nosideeffects
 */
jQuery.Event.prototype.isPropagationStopped = function() {};

/** @type {number} */
jQuery.Event.prototype.keyCode;

/** @type {boolean} */
jQuery.Event.prototype.metaKey;

/** @type {string} */
jQuery.Event.prototype.namespace;

/** @type {number} */
jQuery.Event.prototype.offsetX;

/** @type {number} */
jQuery.Event.prototype.offsetY;

/** @type {Event} */
jQuery.Event.prototype.originalEvent;

/** @type {Element} */
jQuery.Event.prototype.originalTarget;

/** @type {number} */
jQuery.Event.prototype.pageX;

/** @type {number} */
jQuery.Event.prototype.pageY;

/** @return {undefined} */
jQuery.Event.prototype.preventDefault = function() {};

/** @type {Object<string, *>} */
jQuery.Event.prototype.props;

/** @type {Element} */
jQuery.Event.prototype.relatedTarget;

/** @type {*} */
jQuery.Event.prototype.result;

/** @type {number} */
jQuery.Event.prototype.screenX;

/** @type {number} */
jQuery.Event.prototype.screenY;

/** @type {boolean} */
jQuery.Event.prototype.shiftKey;

/** @return {undefined} */
jQuery.Event.prototype.stopImmediatePropagation = function() {};

/** @return {undefined} */
jQuery.Event.prototype.stopPropagation = function() {};

/** @type {Element} */
jQuery.Event.prototype.target;

/** @type {number} */
jQuery.Event.prototype.timeStamp;

/** @type {Element} */
jQuery.Event.prototype.toElement;

/** @type {string} */
jQuery.Event.prototype.type;

/** @type {Window} */
jQuery.Event.prototype.view;

/** @type {number} */
jQuery.Event.prototype.which;

/**
 * @param {(Object|boolean)} arg1
 * @param {...*} var_args
 * @return {Object}
 */
jQuery.extend = function(arg1, var_args) {};

/**
 * @param {(Object|boolean)} arg1
 * @param {...*} var_args
 * @return {Object}
 */
jQuery.prototype.extend = function(arg1, var_args) {};

/**
 * @param {(string|number|function())=} duration
 * @param {(function()|string)=} arg2
 * @param {function()=} callback
 * @return {!jQuery}
 */
jQuery.prototype.fadeIn = function(duration, arg2, callback) {};

/**
 * @param {(string|number|function())=} duration
 * @param {(function()|string)=} arg2
 * @param {function()=} callback
 * @return {!jQuery}
 */
jQuery.prototype.fadeOut = function(duration, arg2, callback) {};

/**
 * @param {(string|number)} duration
 * @param {number} opacity
 * @param {(function()|string)=} arg3
 * @param {function()=} callback
 * @return {!jQuery}
 */
jQuery.prototype.fadeTo = function(duration, opacity, arg3, callback) {};

/**
 * @param {(string|number|function())=} duration
 * @param {(string|function())=} easing
 * @param {function()=} callback
 * @return {!jQuery}
 */
jQuery.prototype.fadeToggle = function(duration, easing, callback) {};

/**
 * @param {(jQuerySelector|function(number,Element)|Element|jQuery)} arg1
 * @return {!jQuery}
 * @see http://api.jquery.com/filter/
 */
jQuery.prototype.filter = function(arg1) {};

/**
 * @param {(jQuerySelector|jQuery|Element)} arg1
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.find = function(arg1) {};

/**
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.first = function() {};

/** @see http://docs.jquery.com/Plugins/Authoring */
jQuery.fn = jQuery.prototype;

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.focus = function(arg1, handler) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.focusin = function(arg1, handler) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.focusout = function(arg1, handler) {};

/** @const */
jQuery.fx = {};

/** @type {number} */
jQuery.fx.interval;

/** @type {boolean} */
jQuery.fx.off;

/**
 * @param {(string|!jQueryAjaxSettings)} url
 * @param {(Object<string,*>|string|
 *     function(string,string,jQuery.jqXHR))=} data
 * @param {(function(string,string,jQuery.jqXHR)|string)=} success
 * @param {string=} dataType
 * @return {!jQuery.jqXHR}
 */
jQuery.get = function(url, data, success, dataType) {};

/**
 * @param {number=} index
 * @return {(Element|Array<Element>)}
 * @nosideeffects
 */
jQuery.prototype.get = function(index) {};

/**
 * @param {string} url
 * @param {(Object<string,*>|
 *     function(Object<string,*>,string,jQuery.jqXHR))=} data
 * @param {function(Object<string,*>,string,jQuery.jqXHR)=} success
 * @return {!jQuery.jqXHR}
 * @see http://api.jquery.com/jquery.getjson/#jQuery-getJSON-url-data-success
 */
jQuery.getJSON = function(url, data, success) {};

/**
 * @param {string} url
 * @param {function(Node,string,jQuery.jqXHR)=} success
 * @return {!jQuery.jqXHR}
 */
jQuery.getScript = function(url, success) {};

/** @param {string} code */
jQuery.globalEval = function(code) {};

/**
 * @template T
 * @param {!Array<T>} arr
 * @param {function(*,number)} fnc
 * @param {boolean=} invert
 * @return {!Array<T>}
 */
jQuery.grep = function(arr, fnc, invert) {};

/**
 * @param {(string|Element)} arg1
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.has = function(arg1) {};

/**
 * @param {string} className
 * @return {boolean}
 * @nosideeffects
 */
jQuery.prototype.hasClass = function(className) {};

/**
 * @param {!Element} elem
 * @return {boolean}
 * @nosideeffects
 */
jQuery.hasData = function(elem) {};

/**
 * @param {(string|number|function(number,number))=} arg1
 * @return {(number|!jQuery)}
 */
jQuery.prototype.height = function(arg1) {};

/**
 * @param {(string|number|function())=} duration
 * @param {(function()|string)=} arg2
 * @param {function()=} callback
 * @return {!jQuery}
 */
jQuery.prototype.hide = function(duration, arg2, callback) {};

/** @param {boolean} hold */
jQuery.holdReady = function(hold) {};

/**
 * @param {function(!jQuery.Event)} arg1
 * @param {function(!jQuery.Event)=} handlerOut
 * @return {!jQuery}
 */
jQuery.prototype.hover = function(arg1, handlerOut) {};

/**
 * @param {(string|function(number,string))=} arg1
 * @return {(string|!jQuery)}
 */
jQuery.prototype.html = function(arg1) {};

/**
 * @param {string} html
 * @returns {string}
 */
jQuery.htmlPrefilter = function(html) {};

/**
 * @param {*} value
 * @param {Array<*>} arr
 * @param {number=} fromIndex
 * @return {number}
 * @nosideeffects
 */
jQuery.inArray = function(value, arr, fromIndex) {};

/**
 * @param {(jQuerySelector|Element|jQuery)=} arg1
 * @return {number}
 * @nosideeffects
 */
jQuery.prototype.index = function(arg1) {};

/**
 * @return {number}
 * @nosideeffects
 */
jQuery.prototype.innerHeight = function() {};

/**
 * @return {number}
 * @nosideeffects
 */
jQuery.prototype.innerWidth = function() {};

/**
 * @param {(jQuerySelector|Element|jQuery)} target
 * @return {!jQuery}
 */
jQuery.prototype.insertAfter = function(target) {};

/**
 * @param {(jQuerySelector|Element|jQuery)} target
 * @return {!jQuery}
 */
jQuery.prototype.insertBefore = function(target) {};

/**
 * @param {(jQuerySelector|function(number)|jQuery|Element)} arg1
 * @return {boolean}
 */
jQuery.prototype.is = function(arg1) {};

/**
 * @param {*} obj
 * @return {boolean}
 * @nosideeffects
 */
jQuery.isArray = function(obj) {};

/**
 * @param {Object} obj
 * @return {boolean}
 * @nosideeffects
 */
jQuery.isEmptyObject = function(obj) {};

/**
 * @param {*} obj
 * @return {boolean}
 * @nosideeffects
 */
jQuery.isFunction = function(obj) {};

/**
 * @param {*} value
 * @return {boolean}
 * @nosideeffects
 */
jQuery.isNumeric = function(value) {};

/**
 * @param {*} obj
 * @return {boolean}
 * @nosideeffects
 */
jQuery.isPlainObject = function(obj) {};

/**
 * @param {*} obj
 * @return {boolean}
 * @nosideeffects
 */
jQuery.isWindow = function(obj) {};

/**
 * @param {Element} node
 * @return {boolean}
 * @nosideeffects
 */
jQuery.isXMLDoc = function(node) {};

/** @type {string} */
jQuery.prototype.jquery;

/**
 * @constructor
 * @extends {XMLHttpRequest}
 * @implements {jQuery.Promise}
 * @private
 * @see http://api.jquery.com/jQuery.ajax/#jqXHR
 */
jQuery.jqXHR = function () {};

/**
 * @override
 * @param {jQueryCallback} alwaysCallbacks
 * @param {jQueryCallback=} alwaysCallbacks2
 * @return {!jQuery.jqXHR}
 */
jQuery.jqXHR.prototype.always =
    function(alwaysCallbacks, alwaysCallbacks2) {};

/**
 * @deprecated
 * @param {function()} callback
 * @return {!jQuery.jqXHR}
*/
jQuery.jqXHR.prototype.complete = function (callback) {};

/**
 * @override
 * @param {jQueryCallback} doneCallbacks
 * @return {!jQuery.jqXHR}
 */
jQuery.jqXHR.prototype.done = function(doneCallbacks) {};

/**
 * @deprecated
 * @param {function()} callback
 * @return {!jQuery.jqXHR}
*/
jQuery.jqXHR.prototype.error = function (callback) {};

/**
 * @override
 * @param {jQueryCallback} failCallbacks
 * @return {!jQuery.jqXHR}
 */
jQuery.jqXHR.prototype.fail = function(failCallbacks) {};

/**
 * @deprecated
 * @override
 */
jQuery.jqXHR.prototype.onreadystatechange = function (callback) {};

/**
 * @override
 * @param {function()=} doneFilter
 * @param {function()=} failFilter
 * @param {function()=} progressFilter
 * @return {!jQuery.jqXHR}
 */
jQuery.jqXHR.prototype.pipe =
    function(doneFilter, failFilter, progressFilter) {};

/**
 * @deprecated
 * @param {function()} callback
 * @return {!jQuery.jqXHR}
*/
jQuery.jqXHR.prototype.success = function (callback) {};

/**
 * @override
 * @param {jQueryCallback} doneCallbacks
 * @param {jQueryCallback=} failCallbacks
 * @param {jQueryCallback=} progressCallbacks
 * @return {!jQuery.jqXHR}
 */
jQuery.jqXHR.prototype.then =
    function(doneCallbacks, failCallbacks, progressCallbacks) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.keydown = function(arg1, handler) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.keypress = function(arg1, handler) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.keyup = function(arg1, handler) {};

/**
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.last = function() {};

/** @type {number} */
jQuery.prototype.length;

/**
 * @deprecated Please avoid the document loading Event invocation of
 *     .load() and use .on( "load", handler ) instead. (The AJAX
 *     module invocation signature is OK.)
 * @param {(function(!jQuery.Event)|Object<string, *>|string)} arg1
 * @param {(function(!jQuery.Event)|Object<string,*>|string)=} arg2
 * @param {function(string,string,XMLHttpRequest)=} complete
 * @return {!jQuery}
 */
jQuery.prototype.load = function(arg1, arg2, complete) {};

/**
 * @param {*} obj
 * @return {Array<*>}
 * @nosideeffects
 */
jQuery.makeArray = function(obj) {};

/**
 * @param {(Array<*>|Object<string, *>)} arg1
 * @param {(function(*,number)|function(*,(string|number)))} callback
 * @return {Array<*>}
 */
jQuery.map = function(arg1, callback) {};

/**
 * @param {function(number,Element)} callback
 * @return {!jQuery}
 */
jQuery.prototype.map = function(callback) {};

/**
 * @param {Array<*>} first
 * @param {Array<*>} second
 * @return {Array<*>}
 */
jQuery.merge = function(first, second) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.mousedown = function(arg1, handler) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.mouseenter = function(arg1, handler) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.mouseleave = function(arg1, handler) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.mousemove = function(arg1, handler) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.mouseout = function(arg1, handler) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.mouseover = function(arg1, handler) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.mouseup = function(arg1, handler) {};

/**
 * @param {jQuerySelector=} selector
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.next = function(selector) {};

/**
 * @param {string=} selector
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.nextAll = function(selector) {};

/**
 * @param {(jQuerySelector|Element)=} arg1
 * @param {jQuerySelector=} filter
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.nextUntil = function(arg1, filter) {};

/**
 * @param {boolean=} removeAll
 * @return {Object}
 */
jQuery.noConflict = function(removeAll) {};

/**
 * @return {undefined}
 * @nosideeffects
 */
jQuery.noop = function() {};

/**
 * @param {(jQuerySelector|Array<Element>|function(this:Element,number,Element=):boolean|jQuery)} arg1
 * @return {!jQuery}
 */
jQuery.prototype.not = function(arg1) {};

/**
 * @return {number}
 * @nosideeffects
 */
jQuery.now = function() {};

/**
 * @param {(string|Object<string,*>)=} arg1
 * @param {(string|function(!jQuery.Event))=} selector
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.off = function(arg1, selector, handler) {};

/**
 * @param {({left:number,top:number}|
 *     function(number,{top:number,left:number}))=} arg1
 * @return {({left:number,top:number}|!jQuery)}
 */
jQuery.prototype.offset = function(arg1) {};

/**
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.offsetParent = function() {};

/**
 * @param {(string|Object<string,*>)} arg1
 * @param {*=} selector
 * @param {*=} data
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.on = function(arg1, selector, data, handler) {};

/**
 * @param {(string|Object<string,*>)} arg1
 * @param {*=} arg2
 * @param {*=} arg3
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.one = function(arg1, arg2, arg3, handler) {};

/**
 * @param {boolean=} includeMargin
 * @return {number}
 * @nosideeffects
 */
jQuery.prototype.outerHeight = function(includeMargin) {};

/**
 * @param {boolean=} includeMargin
 * @return {number}
 * @nosideeffects
 */
jQuery.prototype.outerWidth = function(includeMargin) {};

/**
 * @param {(Object<string, *>|Array<Object<string, *>>)} obj
 * @param {boolean=} traditional
 * @return {string}
 */
jQuery.param = function(obj, traditional) {};

/**
 * @param {jQuerySelector=} selector
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.parent = function(selector) {};

/**
 * @param {jQuerySelector=} selector
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.parents = function(selector) {};

/**
 * @param {(jQuerySelector|Element)=} arg1
 * @param {jQuerySelector=} filter
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.parentsUntil = function(arg1, filter) {};

/**
 * @param {string} data
 * @param {(Element|boolean)=} context
 * @param {boolean=} keepScripts
 * @return {Array<Element>}
 */
jQuery.parseHTML = function(data, context, keepScripts) {};

/**
 * @param {string} json
 * @return {string|number|Object<string, *>|Array<?>|boolean}
 */
jQuery.parseJSON = function(json) {};

/**
 * @param {string} data
 * @return {Document}
 */
jQuery.parseXML = function(data) {};

/**
 * @return {{left:number,top:number}}
 * @nosideeffects
 */
jQuery.prototype.position = function() {};

/**
 * @param {(string|!jQueryAjaxSettings)} url
 * @param {(Object<string,*>|string|
 *     function(string,string,jQuery.jqXHR))=} data
 * @param {(function(string,string,jQuery.jqXHR)|string|null)=} success
 * @param {string=} dataType
 * @return {!jQuery.jqXHR}
 */
jQuery.post = function(url, data, success, dataType) {};
/**
 * @param {(string|Element|jQuery|function(number,string))} arg1
 * @param {(string|Element|jQuery)=} content
 * @return {!jQuery}
 */
jQuery.prototype.prepend = function(arg1, content) {};

/**
 * @param {(jQuerySelector|Element|jQuery)} target
 * @return {!jQuery}
 */
jQuery.prototype.prependTo = function(target) {};

/**
 * @param {jQuerySelector=} selector
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.prev = function(selector) {};

/**
 * @param {jQuerySelector=} selector
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.prevAll = function(selector) {};

/**
 * @param {(jQuerySelector|Element)=} arg1
 * @param {jQuerySelector=} filter
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.prevUntil = function(arg1, filter) {};

/**
 * @param {(string|Object)=} type
 * @param {Object=} target
 * @return {!jQuery.Promise}
 */
jQuery.prototype.promise = function(type, target) {};

/**
 * @interface
 * @private
 * @see http://api.jquery.com/Types/#Promise
 */
jQuery.Promise = function () {};

/**
 * @param {jQueryCallback} alwaysCallbacks
 * @param {jQueryCallback=} alwaysCallbacks2
 * @return {!jQuery.Promise}
 */
jQuery.Promise.prototype.always =
    function(alwaysCallbacks, alwaysCallbacks2) {};

/**
 * @param {jQueryCallback} doneCallbacks
 * @return {!jQuery.Promise}
 */
jQuery.Promise.prototype.done = function(doneCallbacks) {};

/**
 * @param {jQueryCallback} failCallbacks
 * @return {!jQuery.Promise}
 */
jQuery.Promise.prototype.fail = function(failCallbacks) {};

/**
 * @param {function()=} doneFilter
 * @param {function()=} failFilter
 * @param {function()=} progressFilter
 * @return {!jQuery.Promise}
 */
jQuery.Promise.prototype.pipe =
    function(doneFilter, failFilter, progressFilter) {};

/**
 * @param {jQueryCallback} doneCallbacks
 * @param {jQueryCallback=} failCallbacks
 * @param {jQueryCallback=} progressCallbacks
 * @return {!jQuery.Promise}
 */
jQuery.Promise.prototype.then =
    function(doneCallbacks, failCallbacks, progressCallbacks) {};

/**
 * @param {(string|Object<string,*>)} arg1
 * @param {(string|number|boolean|function(number,String))=} arg2
 * @return {(string|boolean|!jQuery)}
 */
jQuery.prototype.prop = function(arg1, arg2) {};

/**
 * @param {...*} var_args
 * @return {function()}
 */
jQuery.proxy = function(var_args) {};

/**
 * @param {Array<Element>} elements
 * @param {string=} name
 * @param {Array<*>=} args
 * @return {!jQuery}
 */
jQuery.prototype.pushStack = function(elements, name, args) {};

/**
 * @param {(string|Array<function()>|function(function()))=} queueName
 * @param {(Array<function()>|function(function()))=} arg2
 * @return {(Array<Element>|!jQuery)}
 */
jQuery.prototype.queue = function(queueName, arg2) {};

/**
 * @param {Element} elem
 * @param {string=} queueName
 * @param {(Array<function()>|function())=} arg3
 * @return {(Array<Element>|!jQuery)}
 */
jQuery.queue = function(elem, queueName, arg3) {};

/**
 * @param {function()} handler
 * @return {!jQuery}
 */
jQuery.prototype.ready = function(handler) {};

/**
 * @param {string=} selector
 * @return {!jQuery}
 */
jQuery.prototype.remove = function(selector) {};

/**
 * @param {string} attributeName
 * @return {!jQuery}
 */
jQuery.prototype.removeAttr = function(attributeName) {};

/**
 * @param {(string|function(number,string))=} arg1
 * @return {!jQuery}
 */
jQuery.prototype.removeClass = function(arg1) {};

/**
 * @param {(string|Array<string>)=} arg1
 * @return {!jQuery}
 */
jQuery.prototype.removeData = function(arg1) {};

/**
 * @param {Element} elem
 * @param {string=} name
 * @return {!jQuery}
 */
jQuery.removeData = function(elem, name) {};

/**
 * @param {string} propertyName
 * @return {!jQuery}
 */
jQuery.prototype.removeProp = function(propertyName) {};

/**
 * @param {jQuerySelector} target
 * @return {!jQuery}
 */
jQuery.prototype.replaceAll = function(target) {};

/**
 * @param {(string|Element|jQuery|function())} arg1
 * @return {!jQuery}
 */
jQuery.prototype.replaceWith = function(arg1) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.resize = function(arg1, handler) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.scroll = function(arg1, handler) {};

/**
 * @param {number=} value
 * @return {(number|!jQuery)}
 */
jQuery.prototype.scrollLeft = function(value) {};

/**
 * @param {number=} value
 * @return {(number|!jQuery)}
 */
jQuery.prototype.scrollTop = function(value) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.select = function(arg1, handler) {};

/**
 * @return {string}
 * @nosideeffects
 */
jQuery.prototype.serialize = function() {};

/**
 * @return {Array<Object<string, *>>}
 * @nosideeffects
 */
jQuery.prototype.serializeArray = function() {};

/**
 * @param {(string|number|function())=} duration
 * @param {(function()|string)=} arg2
 * @param {function()=} callback
 * @return {!jQuery}
 */
jQuery.prototype.show = function(duration, arg2, callback) {};

/**
 * @param {jQuerySelector=} selector
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.siblings = function(selector) {};

/**
 * @deprecated Please use the .length property instead.
 * @return {number}
 * @nosideeffects
 */
jQuery.prototype.size = function() {};

/**
 * @param {number} start
 * @param {number=} end
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.slice = function(start, end) {};

/**
 * @param {(Object<string,*>|string|number)=} optionsOrDuration
 * @param {(function()|string)=} completeOrEasing
 * @param {function()=} complete
 * @return {!jQuery}
 */
jQuery.prototype.slideDown =
    function(optionsOrDuration, completeOrEasing, complete) {};

/**
 * @param {(Object<string,*>|string|number)=} optionsOrDuration
 * @param {(function()|string)=} completeOrEasing
 * @param {function()=} complete
 * @return {!jQuery}
 */
jQuery.prototype.slideToggle =
    function(optionsOrDuration, completeOrEasing, complete) {};

/**
 * @param {(Object<string,*>|string|number)=} optionsOrDuration
 * @param {(function()|string)=} completeOrEasing
 * @param {function()=} complete
 * @return {!jQuery}
 */
jQuery.prototype.slideUp =
    function(optionsOrDuration, completeOrEasing, complete) {};

/**
 * @param {(boolean|string)=} arg1
 * @param {boolean=} arg2
 * @param {boolean=} jumpToEnd
 * @return {!jQuery}
 */
jQuery.prototype.stop = function(arg1, arg2, jumpToEnd) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.submit = function(arg1, handler) {};

/**
 * @record
 */
function jQuerySupport() {};

/** @type {boolean} */
jQuerySupport.prototype.boxModel;

/** @type {boolean} */
jQuerySupport.prototype.changeBubbles;

/** @type {boolean} */
jQuerySupport.prototype.cors;

/** @type {boolean} */
jQuerySupport.prototype.cssFloat;

/** @type {boolean} */
jQuerySupport.prototype.hrefNormalized;

/** @type {boolean} */
jQuerySupport.prototype.htmlSerialize;

/** @type {boolean} */
jQuerySupport.prototype.leadingWhitespace;

/** @type {boolean} */
jQuerySupport.prototype.noCloneEvent;

/** @type {boolean} */
jQuerySupport.prototype.opacity;

/** @type {boolean} */
jQuerySupport.prototype.style;

/** @type {boolean} */
jQuerySupport.prototype.submitBubbles;

/** @type {boolean} */
jQuerySupport.prototype.tbody;

/**
 * @type {!jQuerySupport}
 * @deprecated Please try to use feature detection instead.
 */
jQuery.support;

/**
 * @param {(string|number|boolean|function(number,string))=} arg1
 * @return {(string|!jQuery)}
 */
jQuery.prototype.text = function(arg1) {};

/**
 * @return {Array<Element>}
 * @nosideeffects
 */
jQuery.prototype.toArray = function() {};

/**
 * Refers to the method from the Effects category. There used to be a toggle
 * method on the Events category which was removed starting version 1.9.
 * @param {(number|string|Object<string,*>|boolean)=} arg1
 * @param {(function()|string)=} arg2
 * @param {function()=} arg3
 * @return {!jQuery}
 */
jQuery.prototype.toggle = function(arg1, arg2, arg3) {};

/**
 * @param {(string|boolean|function(number,string,boolean))=} arg1
 * @param {boolean=} flag
 * @return {!jQuery}
 */
jQuery.prototype.toggleClass = function(arg1, flag) {};

/**
 * @param {(string|jQuery.Event)} arg1
 * @param {...*} var_args
 * @return {!jQuery}
 */
jQuery.prototype.trigger = function(arg1, var_args) {};

/**
 * @param {string|jQuery.Event} eventType
 * @param {Array<*>=} extraParameters
 * @return {*}
 */
jQuery.prototype.triggerHandler = function(eventType, extraParameters) {};

/**
 * @param {string} str
 * @return {string}
 * @nosideeffects
 */
jQuery.trim = function(str) {};

/**
 * @param {*} obj
 * @return {string}
 * @nosideeffects
 */
jQuery.type = function(obj) {};

/**
 * @param {(string|function(!jQuery.Event)|jQuery.Event)=} arg1
 * @param {(function(!jQuery.Event)|boolean)=} arg2
 * @return {!jQuery}
 */
jQuery.prototype.unbind = function(arg1, arg2) {};

/**
 * @param {string=} arg1
 * @param {(string|Object<string,*>)=} arg2
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.undelegate = function(arg1, arg2, handler) {};

/**
 * @param {Array<Element>} arr
 * @return {Array<Element>}
 * @deprecated Deprecated since 1.12 & 2.2. Use jQuery.uniqueSort instead
 */
jQuery.unique = function(arr) {};

/**
 * @param {Array<Element>} arr
 * @return {Array<Element>}
 */
jQuery.uniqueSort = function(arr) {};

/**
 * @deprecated Please use .on( "unload", handler ) instead.
 * @param {(function(!jQuery.Event)|Object<string, *>)} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.unload = function(arg1, handler) {};

/** @return {!jQuery} */
jQuery.prototype.unwrap = function() {};

/**
 * @param {(string|Array<string>|function(number,*))=} arg1
 * @return {(string|number|Array<string>|!jQuery)}
 */
jQuery.prototype.val = function(arg1) {};

/**
 * Note: The official documentation (https://api.jquery.com/jQuery.when/) says
 * jQuery.when accepts deferreds, but it actually accepts any type, e.g.:
 *
 * jQuery.when(jQuery.ready, jQuery.ajax(''), jQuery('#my-element'), 1)
 *
 * If an argument is not an "observable" (a promise-like object) it is wrapped
 * into a promise.
 * @param {*} deferred
 * @param {...*} deferreds
 * @return {!jQuery.Promise}
 */
jQuery.when = function(deferred, deferreds) {};

/**
 * @param {(string|number|function(number,number))=} arg1
 * @return {(number|!jQuery)}
 */
jQuery.prototype.width = function(arg1) {};

/**
 * @param {(string|jQuerySelector|Element|jQuery|function(number))} arg1
 * @return {!jQuery}
 */
jQuery.prototype.wrap = function(arg1) {};

/**
 * @param {(string|jQuerySelector|Element|jQuery)} wrappingElement
 * @return {!jQuery}
 */
jQuery.prototype.wrapAll = function(wrappingElement) {};

/**
 * @param {(string|jQuerySelector|Element|jQuery|function(number))} arg1
 * @return {!jQuery}
 */
jQuery.prototype.wrapInner = function(arg1) {};
