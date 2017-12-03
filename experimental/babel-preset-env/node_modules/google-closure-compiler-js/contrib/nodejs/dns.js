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
 * @fileoverview Definitions for node's dns module.
 * @see http://nodejs.org/api/dns.html
 * @see https://github.com/joyent/node/blob/master/lib/dns.js
 */

/**
 * @const
 */
var dns = {};

/**
 * @param {string} domain
 * @param {string|function(Error,string,string)} family
 * @param {function(?Error,string,string)=} callback
 * @return {void}
 */
dns.lookup;

/**
 * @param {string} domain
 * @param {string|function(?Error,Array)} rrtype
 * @param {function(?Error,Array)=} callback
 * @return {void}
 */
dns.resolve;

/**
 * @param {string} domain
 * @param {function(?Error,Array)} callback
 * @return {void}
 */
dns.resolve4;

/**
 * @param {string} domain
 * @param {function(?Error,Array)} callback
 * @return {void}
 */
dns.resolve6;

/**
 * @param {string} domain
 * @param {function(?Error,Array)}callback
 * @return {void}
 */
dns.resolveMx;

/**
 * @param {string} domain
 * @param {function(?Error,Array)}callback
 * @return {void}
 */
dns.resolveTxt;

/**
 * @param {string} domain
 * @param {function(?Error,Array)}callback
 * @return {void}
 */
dns.resolveSrv;

/**
 * @param {string} domain
 * @param {function(?Error,Array)}callback
 * @return {void}
 */
dns.resolveNs;

/**
 * @param {string} domain
 * @param {function(?Error,Array)}callback
 * @return {void}
 */
dns.resolveCname;

/**
 * @param {string} ip
 * @param {function(?Error,Array)}callback
 * @return {void}
 */
dns.reverse;

/**
 * @type {string}
 * @const
 */
dns.NODATA = 'ENODATA';

/**
 * @type {string}
 * @const
 */
dns.FORMERR = 'EFORMERR';

/**
 * @type {string}
 * @const
 */
dns.SERVFAIL = 'ESERVFAIL';

/**
 * @type {string}
 * @const
 */
dns.NOTFOUND = 'ENOTFOUND';

/**
 * @type {string}
 * @const
 */
dns.NOTIMP = 'ENOTIMP';

/**
 * @type {string}
 * @const
 */
dns.REFUSED = 'EREFUSED';

/**
 * @type {string}
 * @const
 */
dns.BADQUERY = 'EBADQUERY';

/**
 * @type {string}
 * @const
 */
dns.BADNAME = 'EBADNAME';

/**
 * @type {string}
 * @const
 */
dns.BADFAMILY = 'EBADFAMILY';

/**
 * @type {string}
 * @const
 */
dns.BADRESP = 'EBADRESP';

/**
 * @type {string}
 * @const
 */
dns.CONNREFUSED = 'ECONNREFUSED';

/**
 * @type {string}
 * @const
 */
dns.TIMEOUT = 'ETIMEOUT';

/**
 * @type {string}
 * @const
 */
dns.EOF = 'EOF';

/**
 * @type {string}
 * @const
 */
dns.FILE = 'EFILE';

/**
 * @type {string}
 * @const
 */
dns.NOMEM = 'ENOMEM';

/**
 * @type {string}
 * @const
 */
dns.DESTRUCTION = 'EDESTRUCTION';

/**
 * @type {string}
 * @const
 */
dns.BADSTR = 'EBADSTR';

/**
 * @type {string}
 * @const
 */
dns.BADFLAGS = 'EBADFLAGS';

/**
 * @type {string}
 * @const
 */
dns.NONAME = 'ENONAME';

/**
 * @type {string}
 * @const
 */
dns.BADHINTS = 'EBADHINTS';

/**
 * @type {string}
 * @const
 */
dns.NOTINITIALIZED = 'ENOTINITIALIZED';

/**
 * @type {string}
 * @const
 */
dns.LOADIPHLPAPI = 'ELOADIPHLPAPI';

/**
 * @type {string}
 * @const
 */
dns.ADDRGETNETWORKPARAMS = 'EADDRGETNETWORKPARAMS';

/**
 * @type {string}
 * @const
 */
dns.CANCELLED = 'ECANCELLED';

module.exports = dns;
