/*
 * Copyright 2012 The Closure Compiler Authors.
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
 * @fileoverview Definitions for node's os module.
 * @see http://nodejs.org/api/os.html
 */

/** @const */
var os = {};

/**
 * @return {string}
 * @nosideeffects
 */
os.tmpDir;

/**
 * @return {string}
 * @nosideeffects
 */
os.hostname;

/**
 * @return {string}
 * @nosideeffects
 */
os.type;

/**
 * @return {string}
 * @nosideeffects
 */
os.platform;

/**
 * @return {string}
 * @nosideeffects
 */
os.arch;

/**
 * @return {string}
 * @nosideeffects
 */
os.release;

/**
 * @return {number}
 * @nosideeffects
 */
os.uptime;

/**
 * @return {Array.<number>}
 * @nosideeffects
 */
os.loadavg;

/**
 * @return {number}
 * @nosideeffects
 */
os.totalmem;

/**
 * @return {number}
 * @nosideeffects
 */
os.freemem;

/**
 * @typedef {{model: string, speed: number, times: {user: number, nice: number, sys: number, idle: number, irg: number}}}
 */
var osCpusInfo;

/**
 * @return {Array.<osCpusInfo>}
 * @nosideeffects
 */
os.cpus;

/**
 * @typedef {{address: string, family: string, internal: boolean}}
 */
var osNetworkInterfacesInfo;

/**
 * @return {Object.<string,osNetworkInterfacesInfo>}
 * @nosideeffects
 */
os.networkInterfaces;

/**
 * @type {string}
 */
os.EOL;

module.exports = os;
