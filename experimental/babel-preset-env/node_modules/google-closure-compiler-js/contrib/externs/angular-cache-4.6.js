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
 * @fileoverview An externs file for the Angular Cache library.
 * @externs
 */

/** @const */
var ngcache = {};

/** @record */
ngcache.AngularCacheOptions = function() {};

/** @type {number|undefined} */
ngcache.AngularCacheOptions.prototype.capacity;

/** @type {number|undefined} */
ngcache.AngularCacheOptions.prototype.maxAge;

/** @type {!ngcache.AngularCacheOptions.DeleteOnExpire|undefined} */
ngcache.AngularCacheOptions.prototype.deleteOnExpire;

/** @type {function()|undefined} */
ngcache.AngularCacheOptions.prototype.onExpire;

/** @type {number?|undefined} */
ngcache.AngularCacheOptions.prototype.cacheFlushInterval;

/** @type {number|undefined} */
ngcache.AngularCacheOptions.prototype.recycleFreq;

/** @type {!ngcache.AngularCacheOptions.StorageMode|undefined} */
ngcache.AngularCacheOptions.prototype.storageMode;

/** @type {!ngcache.AngularCacheOptions.StorageImpl|undefined} */
ngcache.AngularCacheOptions.prototype.storageImpl;

/** @type {boolean|undefined} */
ngcache.AngularCacheOptions.prototype.disabled;

/** @type {string|undefined} */
ngcache.AngularCacheOptions.prototype.storagePrefix;

/** @type {boolean|undefined} */
ngcache.AngularCacheOptions.prototype.storeOnResolve;

/** @type {boolean|undefined} */
ngcache.AngularCacheOptions.prototype.storeOnReject;


/** @enum {string} */
ngcache.AngularCacheOptions.StorageMode = {
  MEMORY: 'memory',
  LOCAL: 'localStorage',
  SESSION: 'sessionStorage',
};


/** @enum {string} */
ngcache.AngularCacheOptions.DeleteOnExpire = {
  NONE: 'none',
  PASSIVE: 'passive',
  AGGRESSIVE: 'aggressive',
};


/** @interface */
ngcache.AngularCacheOptions.StorageImpl = function() {};


/**
 * @param {string} key
 * @param {*} value
 */
ngcache.AngularCacheOptions.StorageImpl.prototype.setItem = function(
    key, value) {};


/**
 * @param {string} key
 * @return {*} value
 */
ngcache.AngularCacheOptions.StorageImpl.prototype.getItem = function(key) {};


/**
 * @param {string} key
 */
ngcache.AngularCacheOptions.StorageImpl.prototype.removeItem = function(key) {};


/** @interface */
ngcache.AngularCache = function() {};


/**
 * @param {string|Array} key
 * @param {!ngcache.AngularCacheOptions=} options
 * @return {*}
 */
ngcache.AngularCache.prototype.get = function(key, options) {};


/**
 * @param {string} key
 * @param {*} value
 * @param {!ngcache.AngularCacheOptions=} options
 * @return {*}
 */
ngcache.AngularCache.prototype.put = function(key, value, options) {};


/**
 * @param {string} key
 */
ngcache.AngularCache.prototype.remove = function(key) {};


/**
 * @return {void}
 */
ngcache.AngularCache.prototype.removeAll = function() {};


/**
 * @return {!Object<{key: string, expires: number}>}
 */
ngcache.AngularCache.prototype.removeExpired = function() {};


/**
 * @return {void}
 */
ngcache.AngularCache.prototype.destroy = function() {};


/**
 * @param {string=} key
 * @return {!angular.cacheFactory.Cache.Info}
 */
ngcache.AngularCache.prototype.info = function(key) {};


/**
 * @return {!Object<string>}
 */
ngcache.AngularCache.prototype.keySet = function() {};


/**
 * @return {!Array<string>}
 */
ngcache.AngularCache.prototype.keys = function() {};


/**
 * @return {void}
 */
ngcache.AngularCache.prototype.enable = function() {};


/**
 * @return {void}
 */
ngcache.AngularCache.prototype.disable = function() {};


/**
 * @param {string} key
 * @param {!ngcache.AngularCacheOptions=} options
 */
ngcache.AngularCache.prototype.touch = function(key, options) {};


/**
 * @param {number} cacheFlushInterval
 */
ngcache.AngularCache.prototype.setCacheFlushInterval = function(
    cacheFlushInterval) {};


/**
 * @param {number} capacity
 */
ngcache.AngularCache.prototype.setCapacity = function(capacity) {};


/**
 * @param {!ngcache.AngularCacheOptions.DeleteOnExpire} deleteOnExpire
 */
ngcache.AngularCache.prototype.setDeleteOnExpire = function(deleteOnExpire) {};


/**
 * @param {number} maxAge
 */
ngcache.AngularCache.prototype.setMaxAge = function(maxAge) {};


/**
 * @param {function()} onExpire
 */
ngcache.AngularCache.prototype.setOnExpire = function(onExpire) {};


/**
 * @param {number} recycleFreq
 */
ngcache.AngularCache.prototype.setRecycleFreq = function(recycleFreq) {};


/**
 * @param {!ngcache.AngularCacheOptions.StorageMode} storageMode
 * @param {!ngcache.AngularCacheOptions.StorageImpl=} storageImpl
 */
ngcache.AngularCache.prototype.setStorageMode = function(
    storageMode, storageImpl) {};


/**
 * @param {!ngcache.AngularCacheOptions} cacheOptions
 * @param {boolean=} strict
 */
ngcache.AngularCache.prototype.setOptions = function(cacheOptions, strict) {};


/**
 * @typedef {function(string, !ngcache.AngularCacheOptions=):
 *     !ngcache.AngularCache}
 */
ngcache.cacheFactory;


/** @const */
ngcache.CacheFactory = {};


/**
 * @return {!angular.cacheFactory.Cache.Info}
 */
ngcache.CacheFactory.info = function() {};


/**
 * @param {string} cacheId
 * @return {!ngcache.AngularCache}
 */
ngcache.CacheFactory.get = function(cacheId) {};


/**
 * @return {!Object<string>}
 */
ngcache.CacheFactory.keySet = function() {};


/**
 * @return {!Array<string>}
 */
ngcache.CacheFactory.keys = function() {};


/**
 * @param {string} cacheId
 */
ngcache.CacheFactory.destroy = function(cacheId) {};


/**
 * @return {void}
 */
ngcache.CacheFactory.destroyAll = function() {};


/**
 * @return {void}
 */
ngcache.CacheFactory.clearAll = function() {};


/**
 * @return {void}
 */
ngcache.CacheFactory.removeExpiredFromAll = function() {};


/**
 * @return {void}
 */
ngcache.CacheFactory.enableAll = function() {};


/**
 * @return {void}
 */
ngcache.CacheFactory.disableAll = function() {};


/**
 * @return {void}
 */
ngcache.CacheFactory.touchAll = function() {};
