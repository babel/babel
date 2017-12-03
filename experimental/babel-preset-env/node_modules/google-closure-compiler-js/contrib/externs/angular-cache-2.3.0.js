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
 * @fileoverview Externs for angular_cache
 *
 * @externs
 */


/** @record */
var AngularCacheOptions = function() {};

/** @type {number|undefined} */
AngularCacheOptions.prototype.maxAge;

/** @type {string|undefined} */
AngularCacheOptions.prototype.deleteOnExpire;



/**
 * @constructor
 * @implements {angular.cacheFactory.Cache}
 * @param {string} cacheId The id of the new cache.
 * @param {!AngularCacheOptions} options
 */
var AngularCache = function(cacheId, options) {};


/**
 * @param {string} key
 * @param {*} value
 * @param {AngularCacheOptions=} opt_options
 * @return {*}
 * @override
 */
AngularCache.prototype.put = function(key, value, opt_options) {};


/**
 * @param {string|Array} key
 * @param {AngularCacheOptions=} opt_options
 * @return {*}
 * @override
 */
AngularCache.prototype.get = function(key, opt_options) {};


/**
 * @param {string} key
 * @param {AngularCacheOptions=} opt_options
 * @override
 */
AngularCache.prototype.remove = function(key, opt_options) {};


/**
 * @return {void}
 * @override
 */
AngularCache.prototype.removeAll = function() {};


/**
 * @param {AngularCacheOptions=} opt_options
 * @return {Object|Array.<Object>}
 */
AngularCache.prototype.removeExpired = function(opt_options) {};


/**
 * @return {void}
 * @override
 */
AngularCache.prototype.destroy = function() {};


/**
 * @param {string=} opt_key
 * @return {!angular.cacheFactory.Cache.Info}
 * @override
 */
AngularCache.prototype.info = function(opt_key) {};


/**
 * @return {Object}
 */
AngularCache.prototype.keySet = function() {};


/**
 * @return {Array.<Object>}
 */
AngularCache.prototype.keys = function() {};


/**
 * @param {Object} cacheOptions
 * @param {boolean=} opt_strict
 * @param {Object=} opt_options
 */
AngularCache.prototype.setOptions = function(cacheOptions, opt_strict,
    opt_options) {};


/** @typedef {function(string, AngularCacheOptions=): !AngularCache} */
var $angularCacheFactory;


/**
 * @constructor
 */
var $AngularCacheFactory = function() {};


/**
 * @param {?Object} options
 */
$AngularCacheFactory.prototype.setCacheDefaults = function(options) {};


/**
 * @return {Object}
 */
$AngularCacheFactory.prototype.info = function() {};


/**
 * @param {string} cacheId
 * @return {AngularCache}
 */
$AngularCacheFactory.prototype.get = function(cacheId) {};


/**
 * @return {Object}
 */
$AngularCacheFactory.prototype.keySet = function() {};


/**
 * @return {Array.<Object>}
 */
$AngularCacheFactory.prototype.keys = function() {};


$AngularCacheFactory.prototype.removeAll = function() {};


$AngularCacheFactory.prototype.clearAll = function() {};

$AngularCacheFactory.prototype.enableAll = function() {};

$AngularCacheFactory.prototype.disableAll = function() {};
