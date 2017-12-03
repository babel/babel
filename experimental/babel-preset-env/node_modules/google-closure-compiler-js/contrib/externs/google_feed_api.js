/*
 * Copyright 2013 The Closure Compiler Authors.
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
 * @fileoverview Externs for the Google Feeds API.
 * @see https://developers.google.com/feed/v1/devguide
 * @externs
 */

/** @constructor */
google.feeds = function() {};

/**
 * @constructor
 * @param {string} url - source of the feed
 */
google.feeds.Feed = function (url) { };

/**
 * Calls the function argument with a single result when the feed download
 * completes
 * @param {function(google.feeds.LoadResult)} callback
 */
google.feeds.Feed.prototype.load = function (callback) {};

/** @return {void} */
google.feeds.Feed.prototype.includeHistoricalEntries = function () { };

/**
 * @param {string} format
 */
google.feeds.Feed.prototype.setResultFormat = function (format) { };

/**
 * @param {number|null} num - sets the number of feed entries loaded by this
 *     feed to {@code num}. By default, the {@code google.feeds.Feed} class
 *     loads four entries.
 */
google.feeds.Feed.prototype.setNumEntries = function (num) { };

/** @const {string} */
google.feeds.Feed.MIXED_FORMAT;

/** @const {string} */
google.feeds.Feed.JSON_FORMAT;

/** @const {string} */
google.feeds.Feed.XML_FORMAT;

/**
 * A global method that returns a list of feeds that match the given query, and
 * has no return value.
 * @param {string} query - supplies the search query for the list of feeds.
 * @param {function(google.feeds.FindFeedResult)} callback - supplies the
 *     callback function that processes the result object asynchronously.
 */
google.feeds.findFeeds = function (query, callback) { };

/**
 * A cross-browser implementation of the DOM function getElementsByTagNameNS
 * @param {Node} node supplies a node from the XML DOM to search within.
 * @param {string} ns supplies the namespace URI. The value "*" matches
 *     all tags.
 * @param {string} localName supplies the tag name for the search
 * @return {NodeList} The elements with a given local name and namespace URI.
 *     The elements are returned in the order in which they are encountered in
 *     a preorder traversal of the document tree.
 */
google.feeds.Feed.prototype.getElementsByTagNameNS =
    function (node, ns, localName) { };

/** @interface */
google.feeds.LoadResult = function() {};

/** @type {google.feeds.FeedError_} */
google.feeds.LoadResult.prototype.error;

/** @type {Document} */
google.feeds.LoadResult.prototype.xmlDocument;

/** @type {google.feeds.FeedResult} */
google.feeds.LoadResult.prototype.feed;

/** @interface */
google.feeds.FeedResult = function() {};

/** @type {string} */
google.feeds.FeedResult.prototype.feedUrl;

/** @type {string} */
google.feeds.FeedResult.prototype.title;

/** @type {string} */
google.feeds.FeedResult.prototype.link;

/** @type {string} */
google.feeds.FeedResult.prototype.description;

/** @type {string} */
google.feeds.FeedResult.prototype.author;

/** @type {Array.<google.feeds.Entry>} */
google.feeds.FeedResult.prototype.entries;

/** @interface */
google.feeds.Entry = function() {};

/** @type {string} */
google.feeds.Entry.prototype.mediaGroup;

/** @type {string} */
google.feeds.Entry.prototype.title;

/** @type {string} */
google.feeds.Entry.prototype.link;

/** @type {string} */
google.feeds.Entry.prototype.content;

/** @type {string} */
google.feeds.Entry.prototype.contentSnippet;

/** @type {string} */
google.feeds.Entry.prototype.publishedDate;

/** @type {Array.<string>} */
google.feeds.Entry.prototype.categories;

/** @type {Node} */
google.feeds.Entry.prototype.xmlNode;

/** @interface */
google.feeds.FindFeedResult = function() {};

/** @type {google.feeds.FeedError_} */
google.feeds.FindFeedResult.prototype.error;

/** @type {Array.<google.feeds.FindFeedResultEntry>} */
google.feeds.FindFeedResult.prototype.entries;

/** @interface */
google.feeds.FindFeedResultEntry = function() {};

/** @type {string} */
google.feeds.FindFeedResultEntry.prototype.title;

/** @type {string} */
google.feeds.FindFeedResultEntry.prototype.link;

/** @type {string} */
google.feeds.FindFeedResultEntry.prototype.contentSnippet;

/** @type {string} */
google.feeds.FindFeedResultEntry.prototype.url;

/** @interface */
google.feeds.FeedError_ = function() {};

/** @type {string} */
google.feeds.FeedError_.prototype.code;

/** @type {string} */
google.feeds.FeedError_.prototype.message;
