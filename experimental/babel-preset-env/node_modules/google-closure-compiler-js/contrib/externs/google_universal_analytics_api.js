/*
 * Copyright 2015 The Closure Compiler Authors.
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
 * @fileoverview Externs for the Google Universal Analytics API (analytics.js).
 *
 * The analytics.js API allows the user to choose a name of Google Analytics
 * object.  This externs file assumes that the name is ‘ga’.  If you include
 * analytics.js snippet and use a different name, this externs file will not
 * be useful to you (unless you change the name ‘ga’ to whatever name you’ve
 * chosen).
 *
 * @see https://developers.google.com/analytics/devguides/collection/analyticsjs/method-reference
 * @externs
 */


/**
 * @param {string} methodName
 * @param {...?} var_args
 * @return {?}
 */
function ga(methodName, var_args) {}

/**
 * @param {string} trackingId
 * @param {!Object=} opt_configObject
 * @return {!_GATracker}
 */
ga.create = function(trackingId, opt_configObject) {};

/**
 * @param {string} name
 * @return {?_GATracker}
 */
ga.getByName = function(name) {};

/** @return {!Array<!_GATracker>} */
ga.getAll = function() {};


/** @type {string|undefined} */
var GoogleAnalyticsObject;


/** @interface */
function _GATracker() {}

/**
 * @param {string} hitType
 * @param {!Object=} opt_fieldObject
 * @return {*}
 */
_GATracker.prototype.send = function(hitType, opt_fieldObject) {};

/**
 * @param {string|!Object} nameOrFieldObject
 * @param {string|number|!Object|boolean=} opt_value (required if
 *     nameOrFieldObject is a string)
 */
_GATracker.prototype.set = function(nameOrFieldObject, opt_value) {};

/**
 * @param {string} name
 * @return {string|number|?Object|boolean}
 */
_GATracker.prototype.get = function(name) {};
