/*
 * Copyright 2010 The Closure Compiler Authors.
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
 * @fileoverview Externs for Facebook Javascript SDK
 * @see https://developers.facebook.com/docs/javascript/reference/
 * @externs
 */

/** @const */
var FB = {};

/**
 * @see https://developers.facebook.com/docs/javascript/reference/FB.api/
 * @param {string} path
 * @param {(string|Object<string, *>|function(Object<string,*>))=} method
 * @param {(Object<string, *>|function(Object<string,*>))=} params
 * @param {function(Object<string,*>)=} callback
 */
FB.api = function(path, method, params, callback) {};

/**
 * @see https://developers.facebook.com/docs/reference/javascript/FB.getAuthResponse/
 * @return {?Object<string, *>}
 */
FB.getAuthResponse = function() {};

/**
 * @see https://developers.facebook.com/docs/reference/javascript/FB.getLoginStatus/
 * @param {function(Object<string,*>)} callback
 * @param {boolean=} force
 */
FB.getLoginStatus = function(callback, force) {};

/**
 * @see https://developers.facebook.com/docs/reference/javascript/FB.init/
 * @param {Object<string,*>=} opt_opts
 */
FB.init = function(opt_opts) {};

/**
 * @see https://developers.facebook.com/docs/reference/javascript/FB.login/
 * @param {function(Object<string,*>)} callback
 * @param {Object<string,*>=} opt_opts
 */
FB.login = function(callback, opt_opts) {};

/**
 * @see https://developers.facebook.com/docs/reference/javascript/FB.logout/
 * @param {function(Object<string,*>)=} callback
 */
FB.logout = function(callback) {};

/**
 * @see https://developers.facebook.com/docs/reference/javascript/FB.ui/
 * @param {Object<string, *>} params
 * @param {function(Object<string,*>)=} callback
 */
FB.ui = function(params, callback) {};

/** @const */
FB.Event = {};

/**
 * @see https://developers.facebook.com/docs/reference/javascript/FB.Event.subscribe/
 * @param {string} eventName
 * @param {function(Object<string,*>)} callback
 */
FB.Event.subscribe = function(eventName, callback) {};

/**
 * @see https://developers.facebook.com/docs/reference/javascript/FB.Event.unsubscribe/
 * @param {string} eventName
 * @param {function(Object<string,*>)} callback
 */
FB.Event.unsubscribe = function(eventName, callback) {};

/** @const */
FB.XFBML = {};

/**
 * @see https://developers.facebook.com/docs/reference/javascript/FB.XFBML.parse/
 * @param {Element=} node
 * @param {function(Object<string,*>)=} callback
 */
FB.XFBML.parse = function(node, callback) {};

/** @const */
FB.Canvas = {};

/**
 * @see https://developers.facebook.com/docs/reference/javascript/FB.Canvas.setAutoGrow/
 * @param {(boolean|number)=} onOrOff
 * @param {number=} interval
 */
FB.Canvas.setAutoGrow = function(onOrOff, interval) {};

/**
 * @see https://developers.facebook.com/docs/reference/javascript/FB.Canvas.setSize/
 * @param {Object<string, number>} params
 */
FB.Canvas.setSize = function(params) {};

/**
 * @see https://developers.facebook.com/docs/reference/javascript/FB.Canvas.getPageInfo/
 * @param {function(Object<string,*>)} callback
 */
FB.Canvas.getPageInfo = function(callback) {};
