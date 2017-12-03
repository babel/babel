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
 * @fileoverview Externs for the Google Loader API.
 * @see http://code.google.com/apis/ajax/documentation/
 * @externs
 */

/** @param {function()} callback */
google.setOnLoadCallback = function(callback) {}; 

/**
 * @param {string} moduleName
 * @param {string} moduleVersion
 * @param {Object.<string,*>=} optionalSettings
 */
google.load = function(moduleName, moduleVersion, optionalSettings) {};

google.loader = {};

google.loader.ClientLocation = {};

/** @type {number} */
google.loader.ClientLocation.latitude;

/** @type {number} */
google.loader.ClientLocation.longitude;

google.loader.ClientLocation.address = {};

/** @type {string} */
google.loader.ClientLocation.address.city;

/** @type {string} */
google.loader.ClientLocation.address.country;

/** @type {string} */
google.loader.ClientLocation.address.country_code;

/** @type {string} */
google.loader.ClientLocation.address.region;
