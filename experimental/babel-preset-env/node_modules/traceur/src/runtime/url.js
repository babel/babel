// Copyright 2008 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// The following is taken from Closure Library:
//
//   buildFromEncodedParts
//   splitRe
//   ComponentIndex
//   split
//   removeDotSegments

(function() {

  /**
   * Builds a URI string from already-encoded parts.
   *
   * No encoding is performed.  Any component may be omitted as either null or
   * undefined.
   *
   * @param {?string=} opt_scheme The scheme such as 'http'.
   * @param {?string=} opt_userInfo The user name before the '@'.
   * @param {?string=} opt_domain The domain such as 'www.google.com', already
   *     URI-encoded.
   * @param {(string|number|null)=} opt_port The port number.
   * @param {?string=} opt_path The path, already URI-encoded.  If it is not
   *     empty, it must begin with a slash.
   * @param {?string=} opt_queryData The URI-encoded query data.
   * @param {?string=} opt_fragment The URI-encoded fragment identifier.
   * @return {string} The fully combined URI.
   */
  function buildFromEncodedParts(opt_scheme, opt_userInfo,
      opt_domain, opt_port, opt_path, opt_queryData, opt_fragment) {
    var out = [];

    if (opt_scheme) {
      out.push(opt_scheme, ':');
    }

    if (opt_domain) {
      out.push('//');

      if (opt_userInfo) {
        out.push(opt_userInfo, '@');
      }

      out.push(opt_domain);

      if (opt_port) {
        out.push(':', opt_port);
      }
    }

    if (opt_path) {
      out.push(opt_path);
    }

    if (opt_queryData) {
      out.push('?', opt_queryData);
    }

    if (opt_fragment) {
      out.push('#', opt_fragment);
    }

    return out.join('');
  }

  /**
   * A regular expression for breaking a URI into its component parts.
   *
   * {@link http://www.gbiv.com/protocols/uri/rfc/rfc3986.html#RFC2234} says
   * As the "first-match-wins" algorithm is identical to the "greedy"
   * disambiguation method used by POSIX regular expressions, it is natural and
   * commonplace to use a regular expression for parsing the potential five
   * components of a URI reference.
   *
   * The following line is the regular expression for breaking-down a
   * well-formed URI reference into its components.
   *
   * <pre>
   * ^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?
   *  12            3  4          5       6  7        8 9
   * </pre>
   *
   * The numbers in the second line above are only to assist readability; they
   * indicate the reference points for each subexpression (i.e., each paired
   * parenthesis). We refer to the value matched for subexpression <n> as $<n>.
   * For example, matching the above expression to
   * <pre>
   *     http://www.ics.uci.edu/pub/ietf/uri/#Related
   * </pre>
   * results in the following subexpression matches:
   * <pre>
   *    $1 = http:
   *    $2 = http
   *    $3 = //www.ics.uci.edu
   *    $4 = www.ics.uci.edu
   *    $5 = /pub/ietf/uri/
   *    $6 = <undefined>
   *    $7 = <undefined>
   *    $8 = #Related
   *    $9 = Related
   * </pre>
   * where <undefined> indicates that the component is not present, as is the
   * case for the query component in the above example. Therefore, we can
   * determine the value of the five components as
   * <pre>
   *    scheme    = $2
   *    authority = $4
   *    path      = $5
   *    query     = $7
   *    fragment  = $9
   * </pre>
   *
   * The regular expression has been modified slightly to expose the
   * userInfo, domain, and port separately from the authority.
   * The modified version yields
   * <pre>
   *    $1 = http              scheme
   *    $2 = <undefined>       userInfo -\
   *    $3 = www.ics.uci.edu   domain     | authority
   *    $4 = <undefined>       port     -/
   *    $5 = /pub/ietf/uri/    path
   *    $6 = <undefined>       query without ?
   *    $7 = Related           fragment without #
   * </pre>
   * @type {!RegExp}
   * @private
   */
  var splitRe = new RegExp(
      '^' +
      '(?:' +
        '([^:/?#.]+)' +                     // scheme - ignore special characters
                                            // used by other URL parts such as :,
                                            // ?, /, #, and .
      ':)?' +
      '(?://' +
        '(?:([^/?#]*)@)?' +                 // userInfo
        '([\\w\\d\\-\\u0100-\\uffff.%]*)' + // domain - restrict to letters,
                                            // digits, dashes, dots, percent
                                            // escapes, and unicode characters.
        '(?::([0-9]+))?' +                  // port
      ')?' +
      '([^?#]+)?' +                         // path
      '(?:\\?([^#]*))?' +                   // query
      '(?:#(.*))?' +                        // fragment
      '$');


  /**
   * The index of each URI component in the return value of goog.uri.utils.split.
   * @enum {number}
   */
  var ComponentIndex = {
    SCHEME: 1,
    USER_INFO: 2,
    DOMAIN: 3,
    PORT: 4,
    PATH: 5,
    QUERY_DATA: 6,
    FRAGMENT: 7
  };


  /**
   * Splits a URI into its component parts.
   *
   * Each component can be accessed via the component indices; for example:
   * <pre>
   * goog.uri.utils.split(someStr)[goog.uri.utils.CompontentIndex.QUERY_DATA];
   * </pre>
   *
   * @param {string} uri The URI string to examine.
   * @return {!Array.<string|undefined>} Each component still URI-encoded.
   *     Each component that is present will contain the encoded value, whereas
   *     components that are not present will be undefined or empty, depending
   *     on the browser's regular expression implementation.  Never null, since
   *     arbitrary strings may still look like path names.
   */
  function split(uri) {
    // See @return comment -- never null.
    return /** @type {!Array.<string|undefined>} */ (
        uri.match(splitRe));
  }


  /**
   * Removes dot segments in given path component, as described in
   * RFC 3986, section 5.2.4.
   *
   * @param {string} path A non-empty path component.
   * @return {string} Path component with removed dot segments.
   */
  function removeDotSegments(path) {
    if (path === '/')
      return '/';

    var leadingSlash = path[0] === '/' ? '/' : '';
    var trailingSlash = path.slice(-1) === '/' ? '/' : '';
    var segments = path.split('/');

    var out = [];
    var up = 0;
    for (var pos = 0; pos < segments.length; pos++) {
      var segment = segments[pos];
      switch (segment) {
        case '':
        case '.':
          break;
        case '..':
          if (out.length)
            out.pop();
          else
            up++;
          break;
        default:
          out.push(segment);
      }
    }

    if (!leadingSlash) {
      while (up-- > 0) {
        out.unshift('..');
      }

      if (out.length === 0)
        out.push('.');
    }

    return leadingSlash + out.join('/') + trailingSlash;
  }

  /**
   * Takes an array of the parts from split and canonicalizes the path part
   * and then joins all the parts.
   * @param {Array.<string?} parts
   * @return {string}
   */
  function joinAndCanonicalizePath(parts) {
    var path = parts[ComponentIndex.PATH] || '';
    path = removeDotSegments(path);
    parts[ComponentIndex.PATH] = path;

    return buildFromEncodedParts(
        parts[ComponentIndex.SCHEME],
        parts[ComponentIndex.USER_INFO],
        parts[ComponentIndex.DOMAIN],
        parts[ComponentIndex.PORT],
        parts[ComponentIndex.PATH],
        parts[ComponentIndex.QUERY_DATA],
        parts[ComponentIndex.FRAGMENT]);
  }

  /**
   * Canonicalizes a URL by eliminating ./ path entries,
   * canonicalizing ../ entries, and collapsing occurrences of //.
   *
   * @param {string} url
   * @return {string}
   */
  function canonicalizeUrl(url) {
    var parts = split(url);
    return joinAndCanonicalizePath(parts);
  }

  /**
   * Resolves a URL.
   * @param {string} base The URL acting as the base URL.
   * @param {string} to The URL to resolve.
   * @return {string}
   */
  function resolveUrl(base, url) {
    var parts = split(url);
    var baseParts = split(base);

    if (parts[ComponentIndex.SCHEME]) {
      return joinAndCanonicalizePath(parts);
    } else {
      parts[ComponentIndex.SCHEME] = baseParts[ComponentIndex.SCHEME];
    }

    for (var i = ComponentIndex.SCHEME; i <= ComponentIndex.PORT; i++) {
      if (!parts[i]) {
        parts[i] = baseParts[i];
      }
    }

    if (parts[ComponentIndex.PATH][0] == '/') {
      return joinAndCanonicalizePath(parts);
    }

    var path = baseParts[ComponentIndex.PATH];
    var index = path.lastIndexOf('/');
    path = path.slice(0, index + 1) + parts[ComponentIndex.PATH];
    parts[ComponentIndex.PATH] = path;
    return joinAndCanonicalizePath(parts);
  }

  /**
   * True if the name looks like an absolute file name or URL
   * @param {string} candiate to be an address.
   * @return {boolean}
  */
  function isAbsolute(name) {
    if (!name)
      return false;
    if (name[0] === '/')
      return true;
    var parts = split(name);
    if (parts[ComponentIndex.SCHEME])
      return true;
    return false;
  }

  $traceurRuntime.canonicalizeUrl = canonicalizeUrl;
  $traceurRuntime.isAbsolute = isAbsolute;
  $traceurRuntime.removeDotSegments = removeDotSegments;
  $traceurRuntime.resolveUrl = resolveUrl;

})();
