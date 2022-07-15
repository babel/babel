/* eslint-disable */
  //prettier-ignore
  import require$$0 from 'os';
import require$$1, { writeFileSync } from 'fs';
import require$$2 from 'path';
import require$$4 from 'events';
import require$$6 from 'assert';
import require$$4$1 from 'util';
import require$$0$1, { execFileSync } from 'child_process';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var common$2 = {};

var old = {};

var hasRequiredOld;

function requireOld () {
	if (hasRequiredOld) return old;
	hasRequiredOld = 1;
	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var pathModule = require$$2;
	var isWindows = process.platform === 'win32';
	var fs = require$$1;

	// JavaScript implementation of realpath, ported from node pre-v6

	var DEBUG = process.env.NODE_DEBUG && /fs/.test(process.env.NODE_DEBUG);

	function rethrow() {
	  // Only enable in debug mode. A backtrace uses ~1000 bytes of heap space and
	  // is fairly slow to generate.
	  var callback;
	  if (DEBUG) {
	    var backtrace = new Error;
	    callback = debugCallback;
	  } else
	    callback = missingCallback;

	  return callback;

	  function debugCallback(err) {
	    if (err) {
	      backtrace.message = err.message;
	      err = backtrace;
	      missingCallback(err);
	    }
	  }

	  function missingCallback(err) {
	    if (err) {
	      if (process.throwDeprecation)
	        throw err;  // Forgot a callback but don't know where? Use NODE_DEBUG=fs
	      else if (!process.noDeprecation) {
	        var msg = 'fs: missing callback ' + (err.stack || err.message);
	        if (process.traceDeprecation)
	          console.trace(msg);
	        else
	          console.error(msg);
	      }
	    }
	  }
	}

	function maybeCallback(cb) {
	  return typeof cb === 'function' ? cb : rethrow();
	}

	pathModule.normalize;

	// Regexp that finds the next partion of a (partial) path
	// result is [base_with_slash, base], e.g. ['somedir/', 'somedir']
	if (isWindows) {
	  var nextPartRe = /(.*?)(?:[\/\\]+|$)/g;
	} else {
	  var nextPartRe = /(.*?)(?:[\/]+|$)/g;
	}

	// Regex to find the device root, including trailing slash. E.g. 'c:\\'.
	if (isWindows) {
	  var splitRootRe = /^(?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/][^\\\/]+)?[\\\/]*/;
	} else {
	  var splitRootRe = /^[\/]*/;
	}

	old.realpathSync = function realpathSync(p, cache) {
	  // make p is absolute
	  p = pathModule.resolve(p);

	  if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
	    return cache[p];
	  }

	  var original = p,
	      seenLinks = {},
	      knownHard = {};

	  // current character position in p
	  var pos;
	  // the partial path so far, including a trailing slash if any
	  var current;
	  // the partial path without a trailing slash (except when pointing at a root)
	  var base;
	  // the partial path scanned in the previous round, with slash
	  var previous;

	  start();

	  function start() {
	    // Skip over roots
	    var m = splitRootRe.exec(p);
	    pos = m[0].length;
	    current = m[0];
	    base = m[0];
	    previous = '';

	    // On windows, check that the root exists. On unix there is no need.
	    if (isWindows && !knownHard[base]) {
	      fs.lstatSync(base);
	      knownHard[base] = true;
	    }
	  }

	  // walk down the path, swapping out linked pathparts for their real
	  // values
	  // NB: p.length changes.
	  while (pos < p.length) {
	    // find the next part
	    nextPartRe.lastIndex = pos;
	    var result = nextPartRe.exec(p);
	    previous = current;
	    current += result[0];
	    base = previous + result[1];
	    pos = nextPartRe.lastIndex;

	    // continue if not a symlink
	    if (knownHard[base] || (cache && cache[base] === base)) {
	      continue;
	    }

	    var resolvedLink;
	    if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
	      // some known symbolic link.  no need to stat again.
	      resolvedLink = cache[base];
	    } else {
	      var stat = fs.lstatSync(base);
	      if (!stat.isSymbolicLink()) {
	        knownHard[base] = true;
	        if (cache) cache[base] = base;
	        continue;
	      }

	      // read the link if it wasn't read before
	      // dev/ino always return 0 on windows, so skip the check.
	      var linkTarget = null;
	      if (!isWindows) {
	        var id = stat.dev.toString(32) + ':' + stat.ino.toString(32);
	        if (seenLinks.hasOwnProperty(id)) {
	          linkTarget = seenLinks[id];
	        }
	      }
	      if (linkTarget === null) {
	        fs.statSync(base);
	        linkTarget = fs.readlinkSync(base);
	      }
	      resolvedLink = pathModule.resolve(previous, linkTarget);
	      // track this, if given a cache.
	      if (cache) cache[base] = resolvedLink;
	      if (!isWindows) seenLinks[id] = linkTarget;
	    }

	    // resolve the link, then start over
	    p = pathModule.resolve(resolvedLink, p.slice(pos));
	    start();
	  }

	  if (cache) cache[original] = p;

	  return p;
	};


	old.realpath = function realpath(p, cache, cb) {
	  if (typeof cb !== 'function') {
	    cb = maybeCallback(cache);
	    cache = null;
	  }

	  // make p is absolute
	  p = pathModule.resolve(p);

	  if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
	    return process.nextTick(cb.bind(null, null, cache[p]));
	  }

	  var original = p,
	      seenLinks = {},
	      knownHard = {};

	  // current character position in p
	  var pos;
	  // the partial path so far, including a trailing slash if any
	  var current;
	  // the partial path without a trailing slash (except when pointing at a root)
	  var base;
	  // the partial path scanned in the previous round, with slash
	  var previous;

	  start();

	  function start() {
	    // Skip over roots
	    var m = splitRootRe.exec(p);
	    pos = m[0].length;
	    current = m[0];
	    base = m[0];
	    previous = '';

	    // On windows, check that the root exists. On unix there is no need.
	    if (isWindows && !knownHard[base]) {
	      fs.lstat(base, function(err) {
	        if (err) return cb(err);
	        knownHard[base] = true;
	        LOOP();
	      });
	    } else {
	      process.nextTick(LOOP);
	    }
	  }

	  // walk down the path, swapping out linked pathparts for their real
	  // values
	  function LOOP() {
	    // stop if scanned past end of path
	    if (pos >= p.length) {
	      if (cache) cache[original] = p;
	      return cb(null, p);
	    }

	    // find the next part
	    nextPartRe.lastIndex = pos;
	    var result = nextPartRe.exec(p);
	    previous = current;
	    current += result[0];
	    base = previous + result[1];
	    pos = nextPartRe.lastIndex;

	    // continue if not a symlink
	    if (knownHard[base] || (cache && cache[base] === base)) {
	      return process.nextTick(LOOP);
	    }

	    if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
	      // known symbolic link.  no need to stat again.
	      return gotResolvedLink(cache[base]);
	    }

	    return fs.lstat(base, gotStat);
	  }

	  function gotStat(err, stat) {
	    if (err) return cb(err);

	    // if not a symlink, skip to the next path part
	    if (!stat.isSymbolicLink()) {
	      knownHard[base] = true;
	      if (cache) cache[base] = base;
	      return process.nextTick(LOOP);
	    }

	    // stat & read the link if not read before
	    // call gotTarget as soon as the link target is known
	    // dev/ino always return 0 on windows, so skip the check.
	    if (!isWindows) {
	      var id = stat.dev.toString(32) + ':' + stat.ino.toString(32);
	      if (seenLinks.hasOwnProperty(id)) {
	        return gotTarget(null, seenLinks[id], base);
	      }
	    }
	    fs.stat(base, function(err) {
	      if (err) return cb(err);

	      fs.readlink(base, function(err, target) {
	        if (!isWindows) seenLinks[id] = target;
	        gotTarget(err, target);
	      });
	    });
	  }

	  function gotTarget(err, target, base) {
	    if (err) return cb(err);

	    var resolvedLink = pathModule.resolve(previous, target);
	    if (cache) cache[base] = resolvedLink;
	    gotResolvedLink(resolvedLink);
	  }

	  function gotResolvedLink(resolvedLink) {
	    // resolve the link, then start over
	    p = pathModule.resolve(resolvedLink, p.slice(pos));
	    start();
	  }
	};
	return old;
}

var fs_realpath;
var hasRequiredFs_realpath;

function requireFs_realpath () {
	if (hasRequiredFs_realpath) return fs_realpath;
	hasRequiredFs_realpath = 1;
	fs_realpath = realpath;
	realpath.realpath = realpath;
	realpath.sync = realpathSync;
	realpath.realpathSync = realpathSync;
	realpath.monkeypatch = monkeypatch;
	realpath.unmonkeypatch = unmonkeypatch;

	var fs = require$$1;
	var origRealpath = fs.realpath;
	var origRealpathSync = fs.realpathSync;

	var version = process.version;
	var ok = /^v[0-5]\./.test(version);
	var old = requireOld();

	function newError (er) {
	  return er && er.syscall === 'realpath' && (
	    er.code === 'ELOOP' ||
	    er.code === 'ENOMEM' ||
	    er.code === 'ENAMETOOLONG'
	  )
	}

	function realpath (p, cache, cb) {
	  if (ok) {
	    return origRealpath(p, cache, cb)
	  }

	  if (typeof cache === 'function') {
	    cb = cache;
	    cache = null;
	  }
	  origRealpath(p, cache, function (er, result) {
	    if (newError(er)) {
	      old.realpath(p, cache, cb);
	    } else {
	      cb(er, result);
	    }
	  });
	}

	function realpathSync (p, cache) {
	  if (ok) {
	    return origRealpathSync(p, cache)
	  }

	  try {
	    return origRealpathSync(p, cache)
	  } catch (er) {
	    if (newError(er)) {
	      return old.realpathSync(p, cache)
	    } else {
	      throw er
	    }
	  }
	}

	function monkeypatch () {
	  fs.realpath = realpath;
	  fs.realpathSync = realpathSync;
	}

	function unmonkeypatch () {
	  fs.realpath = origRealpath;
	  fs.realpathSync = origRealpathSync;
	}
	return fs_realpath;
}

var concatMap;
var hasRequiredConcatMap;

function requireConcatMap () {
	if (hasRequiredConcatMap) return concatMap;
	hasRequiredConcatMap = 1;
	concatMap = function (xs, fn) {
	    var res = [];
	    for (var i = 0; i < xs.length; i++) {
	        var x = fn(xs[i], i);
	        if (isArray(x)) res.push.apply(res, x);
	        else res.push(x);
	    }
	    return res;
	};

	var isArray = Array.isArray || function (xs) {
	    return Object.prototype.toString.call(xs) === '[object Array]';
	};
	return concatMap;
}

var balancedMatch;
var hasRequiredBalancedMatch;

function requireBalancedMatch () {
	if (hasRequiredBalancedMatch) return balancedMatch;
	hasRequiredBalancedMatch = 1;
	balancedMatch = balanced;
	function balanced(a, b, str) {
	  if (a instanceof RegExp) a = maybeMatch(a, str);
	  if (b instanceof RegExp) b = maybeMatch(b, str);

	  var r = range(a, b, str);

	  return r && {
	    start: r[0],
	    end: r[1],
	    pre: str.slice(0, r[0]),
	    body: str.slice(r[0] + a.length, r[1]),
	    post: str.slice(r[1] + b.length)
	  };
	}

	function maybeMatch(reg, str) {
	  var m = str.match(reg);
	  return m ? m[0] : null;
	}

	balanced.range = range;
	function range(a, b, str) {
	  var begs, beg, left, right, result;
	  var ai = str.indexOf(a);
	  var bi = str.indexOf(b, ai + 1);
	  var i = ai;

	  if (ai >= 0 && bi > 0) {
	    begs = [];
	    left = str.length;

	    while (i >= 0 && !result) {
	      if (i == ai) {
	        begs.push(i);
	        ai = str.indexOf(a, i + 1);
	      } else if (begs.length == 1) {
	        result = [ begs.pop(), bi ];
	      } else {
	        beg = begs.pop();
	        if (beg < left) {
	          left = beg;
	          right = bi;
	        }

	        bi = str.indexOf(b, i + 1);
	      }

	      i = ai < bi && ai >= 0 ? ai : bi;
	    }

	    if (begs.length) {
	      result = [ left, right ];
	    }
	  }

	  return result;
	}
	return balancedMatch;
}

var braceExpansion;
var hasRequiredBraceExpansion;

function requireBraceExpansion () {
	if (hasRequiredBraceExpansion) return braceExpansion;
	hasRequiredBraceExpansion = 1;
	var concatMap = requireConcatMap();
	var balanced = requireBalancedMatch();

	braceExpansion = expandTop;

	var escSlash = '\0SLASH'+Math.random()+'\0';
	var escOpen = '\0OPEN'+Math.random()+'\0';
	var escClose = '\0CLOSE'+Math.random()+'\0';
	var escComma = '\0COMMA'+Math.random()+'\0';
	var escPeriod = '\0PERIOD'+Math.random()+'\0';

	function numeric(str) {
	  return parseInt(str, 10) == str
	    ? parseInt(str, 10)
	    : str.charCodeAt(0);
	}

	function escapeBraces(str) {
	  return str.split('\\\\').join(escSlash)
	            .split('\\{').join(escOpen)
	            .split('\\}').join(escClose)
	            .split('\\,').join(escComma)
	            .split('\\.').join(escPeriod);
	}

	function unescapeBraces(str) {
	  return str.split(escSlash).join('\\')
	            .split(escOpen).join('{')
	            .split(escClose).join('}')
	            .split(escComma).join(',')
	            .split(escPeriod).join('.');
	}


	// Basically just str.split(","), but handling cases
	// where we have nested braced sections, which should be
	// treated as individual members, like {a,{b,c},d}
	function parseCommaParts(str) {
	  if (!str)
	    return [''];

	  var parts = [];
	  var m = balanced('{', '}', str);

	  if (!m)
	    return str.split(',');

	  var pre = m.pre;
	  var body = m.body;
	  var post = m.post;
	  var p = pre.split(',');

	  p[p.length-1] += '{' + body + '}';
	  var postParts = parseCommaParts(post);
	  if (post.length) {
	    p[p.length-1] += postParts.shift();
	    p.push.apply(p, postParts);
	  }

	  parts.push.apply(parts, p);

	  return parts;
	}

	function expandTop(str) {
	  if (!str)
	    return [];

	  // I don't know why Bash 4.3 does this, but it does.
	  // Anything starting with {} will have the first two bytes preserved
	  // but *only* at the top level, so {},a}b will not expand to anything,
	  // but a{},b}c will be expanded to [a}c,abc].
	  // One could argue that this is a bug in Bash, but since the goal of
	  // this module is to match Bash's rules, we escape a leading {}
	  if (str.substr(0, 2) === '{}') {
	    str = '\\{\\}' + str.substr(2);
	  }

	  return expand(escapeBraces(str), true).map(unescapeBraces);
	}

	function embrace(str) {
	  return '{' + str + '}';
	}
	function isPadded(el) {
	  return /^-?0\d/.test(el);
	}

	function lte(i, y) {
	  return i <= y;
	}
	function gte(i, y) {
	  return i >= y;
	}

	function expand(str, isTop) {
	  var expansions = [];

	  var m = balanced('{', '}', str);
	  if (!m || /\$$/.test(m.pre)) return [str];

	  var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
	  var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
	  var isSequence = isNumericSequence || isAlphaSequence;
	  var isOptions = m.body.indexOf(',') >= 0;
	  if (!isSequence && !isOptions) {
	    // {a},b}
	    if (m.post.match(/,.*\}/)) {
	      str = m.pre + '{' + m.body + escClose + m.post;
	      return expand(str);
	    }
	    return [str];
	  }

	  var n;
	  if (isSequence) {
	    n = m.body.split(/\.\./);
	  } else {
	    n = parseCommaParts(m.body);
	    if (n.length === 1) {
	      // x{{a,b}}y ==> x{a}y x{b}y
	      n = expand(n[0], false).map(embrace);
	      if (n.length === 1) {
	        var post = m.post.length
	          ? expand(m.post, false)
	          : [''];
	        return post.map(function(p) {
	          return m.pre + n[0] + p;
	        });
	      }
	    }
	  }

	  // at this point, n is the parts, and we know it's not a comma set
	  // with a single entry.

	  // no need to expand pre, since it is guaranteed to be free of brace-sets
	  var pre = m.pre;
	  var post = m.post.length
	    ? expand(m.post, false)
	    : [''];

	  var N;

	  if (isSequence) {
	    var x = numeric(n[0]);
	    var y = numeric(n[1]);
	    var width = Math.max(n[0].length, n[1].length);
	    var incr = n.length == 3
	      ? Math.abs(numeric(n[2]))
	      : 1;
	    var test = lte;
	    var reverse = y < x;
	    if (reverse) {
	      incr *= -1;
	      test = gte;
	    }
	    var pad = n.some(isPadded);

	    N = [];

	    for (var i = x; test(i, y); i += incr) {
	      var c;
	      if (isAlphaSequence) {
	        c = String.fromCharCode(i);
	        if (c === '\\')
	          c = '';
	      } else {
	        c = String(i);
	        if (pad) {
	          var need = width - c.length;
	          if (need > 0) {
	            var z = new Array(need + 1).join('0');
	            if (i < 0)
	              c = '-' + z + c.slice(1);
	            else
	              c = z + c;
	          }
	        }
	      }
	      N.push(c);
	    }
	  } else {
	    N = concatMap(n, function(el) { return expand(el, false) });
	  }

	  for (var j = 0; j < N.length; j++) {
	    for (var k = 0; k < post.length; k++) {
	      var expansion = pre + N[j] + post[k];
	      if (!isTop || isSequence || expansion)
	        expansions.push(expansion);
	    }
	  }

	  return expansions;
	}
	return braceExpansion;
}

var minimatch_1;
var hasRequiredMinimatch;

function requireMinimatch () {
	if (hasRequiredMinimatch) return minimatch_1;
	hasRequiredMinimatch = 1;
	minimatch_1 = minimatch;
	minimatch.Minimatch = Minimatch;

	var path = { sep: '/' };
	try {
	  path = require('path');
	} catch (er) {}

	var GLOBSTAR = minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {};
	var expand = requireBraceExpansion();

	var plTypes = {
	  '!': { open: '(?:(?!(?:', close: '))[^/]*?)'},
	  '?': { open: '(?:', close: ')?' },
	  '+': { open: '(?:', close: ')+' },
	  '*': { open: '(?:', close: ')*' },
	  '@': { open: '(?:', close: ')' }
	};

	// any single thing other than /
	// don't need to escape / when using new RegExp()
	var qmark = '[^/]';

	// * => any number of characters
	var star = qmark + '*?';

	// ** when dots are allowed.  Anything goes, except .. and .
	// not (^ or / followed by one or two dots followed by $ or /),
	// followed by anything, any number of times.
	var twoStarDot = '(?:(?!(?:\\\/|^)(?:\\.{1,2})($|\\\/)).)*?';

	// not a ^ or / followed by a dot,
	// followed by anything, any number of times.
	var twoStarNoDot = '(?:(?!(?:\\\/|^)\\.).)*?';

	// characters that need to be escaped in RegExp.
	var reSpecials = charSet('().*{}+?[]^$\\!');

	// "abc" -> { a:true, b:true, c:true }
	function charSet (s) {
	  return s.split('').reduce(function (set, c) {
	    set[c] = true;
	    return set
	  }, {})
	}

	// normalizes slashes.
	var slashSplit = /\/+/;

	minimatch.filter = filter;
	function filter (pattern, options) {
	  options = options || {};
	  return function (p, i, list) {
	    return minimatch(p, pattern, options)
	  }
	}

	function ext (a, b) {
	  a = a || {};
	  b = b || {};
	  var t = {};
	  Object.keys(b).forEach(function (k) {
	    t[k] = b[k];
	  });
	  Object.keys(a).forEach(function (k) {
	    t[k] = a[k];
	  });
	  return t
	}

	minimatch.defaults = function (def) {
	  if (!def || !Object.keys(def).length) return minimatch

	  var orig = minimatch;

	  var m = function minimatch (p, pattern, options) {
	    return orig.minimatch(p, pattern, ext(def, options))
	  };

	  m.Minimatch = function Minimatch (pattern, options) {
	    return new orig.Minimatch(pattern, ext(def, options))
	  };

	  return m
	};

	Minimatch.defaults = function (def) {
	  if (!def || !Object.keys(def).length) return Minimatch
	  return minimatch.defaults(def).Minimatch
	};

	function minimatch (p, pattern, options) {
	  if (typeof pattern !== 'string') {
	    throw new TypeError('glob pattern string required')
	  }

	  if (!options) options = {};

	  // shortcut: comments match nothing.
	  if (!options.nocomment && pattern.charAt(0) === '#') {
	    return false
	  }

	  // "" only matches ""
	  if (pattern.trim() === '') return p === ''

	  return new Minimatch(pattern, options).match(p)
	}

	function Minimatch (pattern, options) {
	  if (!(this instanceof Minimatch)) {
	    return new Minimatch(pattern, options)
	  }

	  if (typeof pattern !== 'string') {
	    throw new TypeError('glob pattern string required')
	  }

	  if (!options) options = {};
	  pattern = pattern.trim();

	  // windows support: need to use /, not \
	  if (path.sep !== '/') {
	    pattern = pattern.split(path.sep).join('/');
	  }

	  this.options = options;
	  this.set = [];
	  this.pattern = pattern;
	  this.regexp = null;
	  this.negate = false;
	  this.comment = false;
	  this.empty = false;

	  // make the set of regexps etc.
	  this.make();
	}

	Minimatch.prototype.debug = function () {};

	Minimatch.prototype.make = make;
	function make () {
	  // don't do it more than once.
	  if (this._made) return

	  var pattern = this.pattern;
	  var options = this.options;

	  // empty patterns and comments match nothing.
	  if (!options.nocomment && pattern.charAt(0) === '#') {
	    this.comment = true;
	    return
	  }
	  if (!pattern) {
	    this.empty = true;
	    return
	  }

	  // step 1: figure out negation, etc.
	  this.parseNegate();

	  // step 2: expand braces
	  var set = this.globSet = this.braceExpand();

	  if (options.debug) this.debug = console.error;

	  this.debug(this.pattern, set);

	  // step 3: now we have a set, so turn each one into a series of path-portion
	  // matching patterns.
	  // These will be regexps, except in the case of "**", which is
	  // set to the GLOBSTAR object for globstar behavior,
	  // and will not contain any / characters
	  set = this.globParts = set.map(function (s) {
	    return s.split(slashSplit)
	  });

	  this.debug(this.pattern, set);

	  // glob --> regexps
	  set = set.map(function (s, si, set) {
	    return s.map(this.parse, this)
	  }, this);

	  this.debug(this.pattern, set);

	  // filter out everything that didn't compile properly.
	  set = set.filter(function (s) {
	    return s.indexOf(false) === -1
	  });

	  this.debug(this.pattern, set);

	  this.set = set;
	}

	Minimatch.prototype.parseNegate = parseNegate;
	function parseNegate () {
	  var pattern = this.pattern;
	  var negate = false;
	  var options = this.options;
	  var negateOffset = 0;

	  if (options.nonegate) return

	  for (var i = 0, l = pattern.length
	    ; i < l && pattern.charAt(i) === '!'
	    ; i++) {
	    negate = !negate;
	    negateOffset++;
	  }

	  if (negateOffset) this.pattern = pattern.substr(negateOffset);
	  this.negate = negate;
	}

	// Brace expansion:
	// a{b,c}d -> abd acd
	// a{b,}c -> abc ac
	// a{0..3}d -> a0d a1d a2d a3d
	// a{b,c{d,e}f}g -> abg acdfg acefg
	// a{b,c}d{e,f}g -> abdeg acdeg abdeg abdfg
	//
	// Invalid sets are not expanded.
	// a{2..}b -> a{2..}b
	// a{b}c -> a{b}c
	minimatch.braceExpand = function (pattern, options) {
	  return braceExpand(pattern, options)
	};

	Minimatch.prototype.braceExpand = braceExpand;

	function braceExpand (pattern, options) {
	  if (!options) {
	    if (this instanceof Minimatch) {
	      options = this.options;
	    } else {
	      options = {};
	    }
	  }

	  pattern = typeof pattern === 'undefined'
	    ? this.pattern : pattern;

	  if (typeof pattern === 'undefined') {
	    throw new TypeError('undefined pattern')
	  }

	  if (options.nobrace ||
	    !pattern.match(/\{.*\}/)) {
	    // shortcut. no need to expand.
	    return [pattern]
	  }

	  return expand(pattern)
	}

	// parse a component of the expanded set.
	// At this point, no pattern may contain "/" in it
	// so we're going to return a 2d array, where each entry is the full
	// pattern, split on '/', and then turned into a regular expression.
	// A regexp is made at the end which joins each array with an
	// escaped /, and another full one which joins each regexp with |.
	//
	// Following the lead of Bash 4.1, note that "**" only has special meaning
	// when it is the *only* thing in a path portion.  Otherwise, any series
	// of * is equivalent to a single *.  Globstar behavior is enabled by
	// default, and can be disabled by setting options.noglobstar.
	Minimatch.prototype.parse = parse;
	var SUBPARSE = {};
	function parse (pattern, isSub) {
	  if (pattern.length > 1024 * 64) {
	    throw new TypeError('pattern is too long')
	  }

	  var options = this.options;

	  // shortcuts
	  if (!options.noglobstar && pattern === '**') return GLOBSTAR
	  if (pattern === '') return ''

	  var re = '';
	  var hasMagic = !!options.nocase;
	  var escaping = false;
	  // ? => one single character
	  var patternListStack = [];
	  var negativeLists = [];
	  var stateChar;
	  var inClass = false;
	  var reClassStart = -1;
	  var classStart = -1;
	  // . and .. never match anything that doesn't start with .,
	  // even when options.dot is set.
	  var patternStart = pattern.charAt(0) === '.' ? '' // anything
	  // not (start or / followed by . or .. followed by / or end)
	  : options.dot ? '(?!(?:^|\\\/)\\.{1,2}(?:$|\\\/))'
	  : '(?!\\.)';
	  var self = this;

	  function clearStateChar () {
	    if (stateChar) {
	      // we had some state-tracking character
	      // that wasn't consumed by this pass.
	      switch (stateChar) {
	        case '*':
	          re += star;
	          hasMagic = true;
	        break
	        case '?':
	          re += qmark;
	          hasMagic = true;
	        break
	        default:
	          re += '\\' + stateChar;
	        break
	      }
	      self.debug('clearStateChar %j %j', stateChar, re);
	      stateChar = false;
	    }
	  }

	  for (var i = 0, len = pattern.length, c
	    ; (i < len) && (c = pattern.charAt(i))
	    ; i++) {
	    this.debug('%s\t%s %s %j', pattern, i, re, c);

	    // skip over any that are escaped.
	    if (escaping && reSpecials[c]) {
	      re += '\\' + c;
	      escaping = false;
	      continue
	    }

	    switch (c) {
	      case '/':
	        // completely not allowed, even escaped.
	        // Should already be path-split by now.
	        return false

	      case '\\':
	        clearStateChar();
	        escaping = true;
	      continue

	      // the various stateChar values
	      // for the "extglob" stuff.
	      case '?':
	      case '*':
	      case '+':
	      case '@':
	      case '!':
	        this.debug('%s\t%s %s %j <-- stateChar', pattern, i, re, c);

	        // all of those are literals inside a class, except that
	        // the glob [!a] means [^a] in regexp
	        if (inClass) {
	          this.debug('  in class');
	          if (c === '!' && i === classStart + 1) c = '^';
	          re += c;
	          continue
	        }

	        // if we already have a stateChar, then it means
	        // that there was something like ** or +? in there.
	        // Handle the stateChar, then proceed with this one.
	        self.debug('call clearStateChar %j', stateChar);
	        clearStateChar();
	        stateChar = c;
	        // if extglob is disabled, then +(asdf|foo) isn't a thing.
	        // just clear the statechar *now*, rather than even diving into
	        // the patternList stuff.
	        if (options.noext) clearStateChar();
	      continue

	      case '(':
	        if (inClass) {
	          re += '(';
	          continue
	        }

	        if (!stateChar) {
	          re += '\\(';
	          continue
	        }

	        patternListStack.push({
	          type: stateChar,
	          start: i - 1,
	          reStart: re.length,
	          open: plTypes[stateChar].open,
	          close: plTypes[stateChar].close
	        });
	        // negation is (?:(?!js)[^/]*)
	        re += stateChar === '!' ? '(?:(?!(?:' : '(?:';
	        this.debug('plType %j %j', stateChar, re);
	        stateChar = false;
	      continue

	      case ')':
	        if (inClass || !patternListStack.length) {
	          re += '\\)';
	          continue
	        }

	        clearStateChar();
	        hasMagic = true;
	        var pl = patternListStack.pop();
	        // negation is (?:(?!js)[^/]*)
	        // The others are (?:<pattern>)<type>
	        re += pl.close;
	        if (pl.type === '!') {
	          negativeLists.push(pl);
	        }
	        pl.reEnd = re.length;
	      continue

	      case '|':
	        if (inClass || !patternListStack.length || escaping) {
	          re += '\\|';
	          escaping = false;
	          continue
	        }

	        clearStateChar();
	        re += '|';
	      continue

	      // these are mostly the same in regexp and glob
	      case '[':
	        // swallow any state-tracking char before the [
	        clearStateChar();

	        if (inClass) {
	          re += '\\' + c;
	          continue
	        }

	        inClass = true;
	        classStart = i;
	        reClassStart = re.length;
	        re += c;
	      continue

	      case ']':
	        //  a right bracket shall lose its special
	        //  meaning and represent itself in
	        //  a bracket expression if it occurs
	        //  first in the list.  -- POSIX.2 2.8.3.2
	        if (i === classStart + 1 || !inClass) {
	          re += '\\' + c;
	          escaping = false;
	          continue
	        }

	        // handle the case where we left a class open.
	        // "[z-a]" is valid, equivalent to "\[z-a\]"
	        if (inClass) {
	          // split where the last [ was, make sure we don't have
	          // an invalid re. if so, re-walk the contents of the
	          // would-be class to re-translate any characters that
	          // were passed through as-is
	          // TODO: It would probably be faster to determine this
	          // without a try/catch and a new RegExp, but it's tricky
	          // to do safely.  For now, this is safe and works.
	          var cs = pattern.substring(classStart + 1, i);
	          try {
	            RegExp('[' + cs + ']');
	          } catch (er) {
	            // not a valid class!
	            var sp = this.parse(cs, SUBPARSE);
	            re = re.substr(0, reClassStart) + '\\[' + sp[0] + '\\]';
	            hasMagic = hasMagic || sp[1];
	            inClass = false;
	            continue
	          }
	        }

	        // finish up the class.
	        hasMagic = true;
	        inClass = false;
	        re += c;
	      continue

	      default:
	        // swallow any state char that wasn't consumed
	        clearStateChar();

	        if (escaping) {
	          // no need
	          escaping = false;
	        } else if (reSpecials[c]
	          && !(c === '^' && inClass)) {
	          re += '\\';
	        }

	        re += c;

	    } // switch
	  } // for

	  // handle the case where we left a class open.
	  // "[abc" is valid, equivalent to "\[abc"
	  if (inClass) {
	    // split where the last [ was, and escape it
	    // this is a huge pita.  We now have to re-walk
	    // the contents of the would-be class to re-translate
	    // any characters that were passed through as-is
	    cs = pattern.substr(classStart + 1);
	    sp = this.parse(cs, SUBPARSE);
	    re = re.substr(0, reClassStart) + '\\[' + sp[0];
	    hasMagic = hasMagic || sp[1];
	  }

	  // handle the case where we had a +( thing at the *end*
	  // of the pattern.
	  // each pattern list stack adds 3 chars, and we need to go through
	  // and escape any | chars that were passed through as-is for the regexp.
	  // Go through and escape them, taking care not to double-escape any
	  // | chars that were already escaped.
	  for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
	    var tail = re.slice(pl.reStart + pl.open.length);
	    this.debug('setting tail', re, pl);
	    // maybe some even number of \, then maybe 1 \, followed by a |
	    tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, function (_, $1, $2) {
	      if (!$2) {
	        // the | isn't already escaped, so escape it.
	        $2 = '\\';
	      }

	      // need to escape all those slashes *again*, without escaping the
	      // one that we need for escaping the | character.  As it works out,
	      // escaping an even number of slashes can be done by simply repeating
	      // it exactly after itself.  That's why this trick works.
	      //
	      // I am sorry that you have to see this.
	      return $1 + $1 + $2 + '|'
	    });

	    this.debug('tail=%j\n   %s', tail, tail, pl, re);
	    var t = pl.type === '*' ? star
	      : pl.type === '?' ? qmark
	      : '\\' + pl.type;

	    hasMagic = true;
	    re = re.slice(0, pl.reStart) + t + '\\(' + tail;
	  }

	  // handle trailing things that only matter at the very end.
	  clearStateChar();
	  if (escaping) {
	    // trailing \\
	    re += '\\\\';
	  }

	  // only need to apply the nodot start if the re starts with
	  // something that could conceivably capture a dot
	  var addPatternStart = false;
	  switch (re.charAt(0)) {
	    case '.':
	    case '[':
	    case '(': addPatternStart = true;
	  }

	  // Hack to work around lack of negative lookbehind in JS
	  // A pattern like: *.!(x).!(y|z) needs to ensure that a name
	  // like 'a.xyz.yz' doesn't match.  So, the first negative
	  // lookahead, has to look ALL the way ahead, to the end of
	  // the pattern.
	  for (var n = negativeLists.length - 1; n > -1; n--) {
	    var nl = negativeLists[n];

	    var nlBefore = re.slice(0, nl.reStart);
	    var nlFirst = re.slice(nl.reStart, nl.reEnd - 8);
	    var nlLast = re.slice(nl.reEnd - 8, nl.reEnd);
	    var nlAfter = re.slice(nl.reEnd);

	    nlLast += nlAfter;

	    // Handle nested stuff like *(*.js|!(*.json)), where open parens
	    // mean that we should *not* include the ) in the bit that is considered
	    // "after" the negated section.
	    var openParensBefore = nlBefore.split('(').length - 1;
	    var cleanAfter = nlAfter;
	    for (i = 0; i < openParensBefore; i++) {
	      cleanAfter = cleanAfter.replace(/\)[+*?]?/, '');
	    }
	    nlAfter = cleanAfter;

	    var dollar = '';
	    if (nlAfter === '' && isSub !== SUBPARSE) {
	      dollar = '$';
	    }
	    var newRe = nlBefore + nlFirst + nlAfter + dollar + nlLast;
	    re = newRe;
	  }

	  // if the re is not "" at this point, then we need to make sure
	  // it doesn't match against an empty path part.
	  // Otherwise a/* will match a/, which it should not.
	  if (re !== '' && hasMagic) {
	    re = '(?=.)' + re;
	  }

	  if (addPatternStart) {
	    re = patternStart + re;
	  }

	  // parsing just a piece of a larger pattern.
	  if (isSub === SUBPARSE) {
	    return [re, hasMagic]
	  }

	  // skip the regexp for non-magical patterns
	  // unescape anything in it, though, so that it'll be
	  // an exact match against a file etc.
	  if (!hasMagic) {
	    return globUnescape(pattern)
	  }

	  var flags = options.nocase ? 'i' : '';
	  try {
	    var regExp = new RegExp('^' + re + '$', flags);
	  } catch (er) {
	    // If it was an invalid regular expression, then it can't match
	    // anything.  This trick looks for a character after the end of
	    // the string, which is of course impossible, except in multi-line
	    // mode, but it's not a /m regex.
	    return new RegExp('$.')
	  }

	  regExp._glob = pattern;
	  regExp._src = re;

	  return regExp
	}

	minimatch.makeRe = function (pattern, options) {
	  return new Minimatch(pattern, options || {}).makeRe()
	};

	Minimatch.prototype.makeRe = makeRe;
	function makeRe () {
	  if (this.regexp || this.regexp === false) return this.regexp

	  // at this point, this.set is a 2d array of partial
	  // pattern strings, or "**".
	  //
	  // It's better to use .match().  This function shouldn't
	  // be used, really, but it's pretty convenient sometimes,
	  // when you just want to work with a regex.
	  var set = this.set;

	  if (!set.length) {
	    this.regexp = false;
	    return this.regexp
	  }
	  var options = this.options;

	  var twoStar = options.noglobstar ? star
	    : options.dot ? twoStarDot
	    : twoStarNoDot;
	  var flags = options.nocase ? 'i' : '';

	  var re = set.map(function (pattern) {
	    return pattern.map(function (p) {
	      return (p === GLOBSTAR) ? twoStar
	      : (typeof p === 'string') ? regExpEscape(p)
	      : p._src
	    }).join('\\\/')
	  }).join('|');

	  // must match entire pattern
	  // ending in a * or ** will make it less strict.
	  re = '^(?:' + re + ')$';

	  // can match anything, as long as it's not this.
	  if (this.negate) re = '^(?!' + re + ').*$';

	  try {
	    this.regexp = new RegExp(re, flags);
	  } catch (ex) {
	    this.regexp = false;
	  }
	  return this.regexp
	}

	minimatch.match = function (list, pattern, options) {
	  options = options || {};
	  var mm = new Minimatch(pattern, options);
	  list = list.filter(function (f) {
	    return mm.match(f)
	  });
	  if (mm.options.nonull && !list.length) {
	    list.push(pattern);
	  }
	  return list
	};

	Minimatch.prototype.match = match;
	function match (f, partial) {
	  this.debug('match', f, this.pattern);
	  // short-circuit in the case of busted things.
	  // comments, etc.
	  if (this.comment) return false
	  if (this.empty) return f === ''

	  if (f === '/' && partial) return true

	  var options = this.options;

	  // windows: need to use /, not \
	  if (path.sep !== '/') {
	    f = f.split(path.sep).join('/');
	  }

	  // treat the test path as a set of pathparts.
	  f = f.split(slashSplit);
	  this.debug(this.pattern, 'split', f);

	  // just ONE of the pattern sets in this.set needs to match
	  // in order for it to be valid.  If negating, then just one
	  // match means that we have failed.
	  // Either way, return on the first hit.

	  var set = this.set;
	  this.debug(this.pattern, 'set', set);

	  // Find the basename of the path by looking for the last non-empty segment
	  var filename;
	  var i;
	  for (i = f.length - 1; i >= 0; i--) {
	    filename = f[i];
	    if (filename) break
	  }

	  for (i = 0; i < set.length; i++) {
	    var pattern = set[i];
	    var file = f;
	    if (options.matchBase && pattern.length === 1) {
	      file = [filename];
	    }
	    var hit = this.matchOne(file, pattern, partial);
	    if (hit) {
	      if (options.flipNegate) return true
	      return !this.negate
	    }
	  }

	  // didn't get any hits.  this is success if it's a negative
	  // pattern, failure otherwise.
	  if (options.flipNegate) return false
	  return this.negate
	}

	// set partial to true to test if, for example,
	// "/a/b" matches the start of "/*/b/*/d"
	// Partial means, if you run out of file before you run
	// out of pattern, then that's fine, as long as all
	// the parts match.
	Minimatch.prototype.matchOne = function (file, pattern, partial) {
	  var options = this.options;

	  this.debug('matchOne',
	    { 'this': this, file: file, pattern: pattern });

	  this.debug('matchOne', file.length, pattern.length);

	  for (var fi = 0,
	      pi = 0,
	      fl = file.length,
	      pl = pattern.length
	      ; (fi < fl) && (pi < pl)
	      ; fi++, pi++) {
	    this.debug('matchOne loop');
	    var p = pattern[pi];
	    var f = file[fi];

	    this.debug(pattern, p, f);

	    // should be impossible.
	    // some invalid regexp stuff in the set.
	    if (p === false) return false

	    if (p === GLOBSTAR) {
	      this.debug('GLOBSTAR', [pattern, p, f]);

	      // "**"
	      // a/**/b/**/c would match the following:
	      // a/b/x/y/z/c
	      // a/x/y/z/b/c
	      // a/b/x/b/x/c
	      // a/b/c
	      // To do this, take the rest of the pattern after
	      // the **, and see if it would match the file remainder.
	      // If so, return success.
	      // If not, the ** "swallows" a segment, and try again.
	      // This is recursively awful.
	      //
	      // a/**/b/**/c matching a/b/x/y/z/c
	      // - a matches a
	      // - doublestar
	      //   - matchOne(b/x/y/z/c, b/**/c)
	      //     - b matches b
	      //     - doublestar
	      //       - matchOne(x/y/z/c, c) -> no
	      //       - matchOne(y/z/c, c) -> no
	      //       - matchOne(z/c, c) -> no
	      //       - matchOne(c, c) yes, hit
	      var fr = fi;
	      var pr = pi + 1;
	      if (pr === pl) {
	        this.debug('** at the end');
	        // a ** at the end will just swallow the rest.
	        // We have found a match.
	        // however, it will not swallow /.x, unless
	        // options.dot is set.
	        // . and .. are *never* matched by **, for explosively
	        // exponential reasons.
	        for (; fi < fl; fi++) {
	          if (file[fi] === '.' || file[fi] === '..' ||
	            (!options.dot && file[fi].charAt(0) === '.')) return false
	        }
	        return true
	      }

	      // ok, let's see if we can swallow whatever we can.
	      while (fr < fl) {
	        var swallowee = file[fr];

	        this.debug('\nglobstar while', file, fr, pattern, pr, swallowee);

	        // XXX remove this slice.  Just pass the start index.
	        if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
	          this.debug('globstar found match!', fr, fl, swallowee);
	          // found a match.
	          return true
	        } else {
	          // can't swallow "." or ".." ever.
	          // can only swallow ".foo" when explicitly asked.
	          if (swallowee === '.' || swallowee === '..' ||
	            (!options.dot && swallowee.charAt(0) === '.')) {
	            this.debug('dot detected!', file, fr, pattern, pr);
	            break
	          }

	          // ** swallows a segment, and continue.
	          this.debug('globstar swallow a segment, and continue');
	          fr++;
	        }
	      }

	      // no match was found.
	      // However, in partial mode, we can't say this is necessarily over.
	      // If there's more *pattern* left, then
	      if (partial) {
	        // ran out of file
	        this.debug('\n>>> no match, partial?', file, fr, pattern, pr);
	        if (fr === fl) return true
	      }
	      return false
	    }

	    // something other than **
	    // non-magic patterns just have to match exactly
	    // patterns with magic have been turned into regexps.
	    var hit;
	    if (typeof p === 'string') {
	      if (options.nocase) {
	        hit = f.toLowerCase() === p.toLowerCase();
	      } else {
	        hit = f === p;
	      }
	      this.debug('string match', p, f, hit);
	    } else {
	      hit = f.match(p);
	      this.debug('pattern match', p, f, hit);
	    }

	    if (!hit) return false
	  }

	  // Note: ending in / means that we'll get a final ""
	  // at the end of the pattern.  This can only match a
	  // corresponding "" at the end of the file.
	  // If the file ends in /, then it can only match a
	  // a pattern that ends in /, unless the pattern just
	  // doesn't have any more for it. But, a/b/ should *not*
	  // match "a/b/*", even though "" matches against the
	  // [^/]*? pattern, except in partial mode, where it might
	  // simply not be reached yet.
	  // However, a/b/ should still satisfy a/*

	  // now either we fell off the end of the pattern, or we're done.
	  if (fi === fl && pi === pl) {
	    // ran out of pattern and filename at the same time.
	    // an exact hit!
	    return true
	  } else if (fi === fl) {
	    // ran out of file, but still had pattern left.
	    // this is ok if we're doing the match as part of
	    // a glob fs traversal.
	    return partial
	  } else if (pi === pl) {
	    // ran out of pattern, still have file left.
	    // this is only acceptable if we're on the very last
	    // empty segment of a file with a trailing slash.
	    // a/* should match a/b/
	    var emptyFileEnd = (fi === fl - 1) && (file[fi] === '');
	    return emptyFileEnd
	  }

	  // should be unreachable.
	  throw new Error('wtf?')
	};

	// replace stuff like \* with *
	function globUnescape (s) {
	  return s.replace(/\\(.)/g, '$1')
	}

	function regExpEscape (s) {
	  return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
	}
	return minimatch_1;
}

var inherits = {exports: {}};

var inherits_browser = {exports: {}};

var hasRequiredInherits_browser;

function requireInherits_browser () {
	if (hasRequiredInherits_browser) return inherits_browser.exports;
	hasRequiredInherits_browser = 1;
	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  inherits_browser.exports = function inherits(ctor, superCtor) {
	    if (superCtor) {
	      ctor.super_ = superCtor;
	      ctor.prototype = Object.create(superCtor.prototype, {
	        constructor: {
	          value: ctor,
	          enumerable: false,
	          writable: true,
	          configurable: true
	        }
	      });
	    }
	  };
	} else {
	  // old school shim for old browsers
	  inherits_browser.exports = function inherits(ctor, superCtor) {
	    if (superCtor) {
	      ctor.super_ = superCtor;
	      var TempCtor = function () {};
	      TempCtor.prototype = superCtor.prototype;
	      ctor.prototype = new TempCtor();
	      ctor.prototype.constructor = ctor;
	    }
	  };
	}
	return inherits_browser.exports;
}

var hasRequiredInherits;

function requireInherits () {
	if (hasRequiredInherits) return inherits.exports;
	hasRequiredInherits = 1;
	(function (module) {
		try {
		  var util = require('util');
		  /* istanbul ignore next */
		  if (typeof util.inherits !== 'function') throw '';
		  module.exports = util.inherits;
		} catch (e) {
		  /* istanbul ignore next */
		  module.exports = requireInherits_browser();
		}
} (inherits));
	return inherits.exports;
}

var pathIsAbsolute = {exports: {}};

var hasRequiredPathIsAbsolute;

function requirePathIsAbsolute () {
	if (hasRequiredPathIsAbsolute) return pathIsAbsolute.exports;
	hasRequiredPathIsAbsolute = 1;

	function posix(path) {
		return path.charAt(0) === '/';
	}

	function win32(path) {
		// https://github.com/nodejs/node/blob/b3fcc245fb25539909ef1d5eaa01dbf92e168633/lib/path.js#L56
		var splitDeviceRe = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;
		var result = splitDeviceRe.exec(path);
		var device = result[1] || '';
		var isUnc = Boolean(device && device.charAt(1) !== ':');

		// UNC paths are always absolute
		return Boolean(result[2] || isUnc);
	}

	pathIsAbsolute.exports = process.platform === 'win32' ? win32 : posix;
	pathIsAbsolute.exports.posix = posix;
	pathIsAbsolute.exports.win32 = win32;
	return pathIsAbsolute.exports;
}

var common$1 = {};

var hasRequiredCommon$1;

function requireCommon$1 () {
	if (hasRequiredCommon$1) return common$1;
	hasRequiredCommon$1 = 1;
	common$1.setopts = setopts;
	common$1.ownProp = ownProp;
	common$1.makeAbs = makeAbs;
	common$1.finish = finish;
	common$1.mark = mark;
	common$1.isIgnored = isIgnored;
	common$1.childrenIgnored = childrenIgnored;

	function ownProp (obj, field) {
	  return Object.prototype.hasOwnProperty.call(obj, field)
	}

	var path = require$$2;
	var minimatch = requireMinimatch();
	var isAbsolute = requirePathIsAbsolute();
	var Minimatch = minimatch.Minimatch;

	function alphasort (a, b) {
	  return a.localeCompare(b, 'en')
	}

	function setupIgnores (self, options) {
	  self.ignore = options.ignore || [];

	  if (!Array.isArray(self.ignore))
	    self.ignore = [self.ignore];

	  if (self.ignore.length) {
	    self.ignore = self.ignore.map(ignoreMap);
	  }
	}

	// ignore patterns are always in dot:true mode.
	function ignoreMap (pattern) {
	  var gmatcher = null;
	  if (pattern.slice(-3) === '/**') {
	    var gpattern = pattern.replace(/(\/\*\*)+$/, '');
	    gmatcher = new Minimatch(gpattern, { dot: true });
	  }

	  return {
	    matcher: new Minimatch(pattern, { dot: true }),
	    gmatcher: gmatcher
	  }
	}

	function setopts (self, pattern, options) {
	  if (!options)
	    options = {};

	  // base-matching: just use globstar for that.
	  if (options.matchBase && -1 === pattern.indexOf("/")) {
	    if (options.noglobstar) {
	      throw new Error("base matching requires globstar")
	    }
	    pattern = "**/" + pattern;
	  }

	  self.silent = !!options.silent;
	  self.pattern = pattern;
	  self.strict = options.strict !== false;
	  self.realpath = !!options.realpath;
	  self.realpathCache = options.realpathCache || Object.create(null);
	  self.follow = !!options.follow;
	  self.dot = !!options.dot;
	  self.mark = !!options.mark;
	  self.nodir = !!options.nodir;
	  if (self.nodir)
	    self.mark = true;
	  self.sync = !!options.sync;
	  self.nounique = !!options.nounique;
	  self.nonull = !!options.nonull;
	  self.nosort = !!options.nosort;
	  self.nocase = !!options.nocase;
	  self.stat = !!options.stat;
	  self.noprocess = !!options.noprocess;
	  self.absolute = !!options.absolute;

	  self.maxLength = options.maxLength || Infinity;
	  self.cache = options.cache || Object.create(null);
	  self.statCache = options.statCache || Object.create(null);
	  self.symlinks = options.symlinks || Object.create(null);

	  setupIgnores(self, options);

	  self.changedCwd = false;
	  var cwd = process.cwd();
	  if (!ownProp(options, "cwd"))
	    self.cwd = cwd;
	  else {
	    self.cwd = path.resolve(options.cwd);
	    self.changedCwd = self.cwd !== cwd;
	  }

	  self.root = options.root || path.resolve(self.cwd, "/");
	  self.root = path.resolve(self.root);
	  if (process.platform === "win32")
	    self.root = self.root.replace(/\\/g, "/");

	  // TODO: is an absolute `cwd` supposed to be resolved against `root`?
	  // e.g. { cwd: '/test', root: __dirname } === path.join(__dirname, '/test')
	  self.cwdAbs = isAbsolute(self.cwd) ? self.cwd : makeAbs(self, self.cwd);
	  if (process.platform === "win32")
	    self.cwdAbs = self.cwdAbs.replace(/\\/g, "/");
	  self.nomount = !!options.nomount;

	  // disable comments and negation in Minimatch.
	  // Note that they are not supported in Glob itself anyway.
	  options.nonegate = true;
	  options.nocomment = true;

	  self.minimatch = new Minimatch(pattern, options);
	  self.options = self.minimatch.options;
	}

	function finish (self) {
	  var nou = self.nounique;
	  var all = nou ? [] : Object.create(null);

	  for (var i = 0, l = self.matches.length; i < l; i ++) {
	    var matches = self.matches[i];
	    if (!matches || Object.keys(matches).length === 0) {
	      if (self.nonull) {
	        // do like the shell, and spit out the literal glob
	        var literal = self.minimatch.globSet[i];
	        if (nou)
	          all.push(literal);
	        else
	          all[literal] = true;
	      }
	    } else {
	      // had matches
	      var m = Object.keys(matches);
	      if (nou)
	        all.push.apply(all, m);
	      else
	        m.forEach(function (m) {
	          all[m] = true;
	        });
	    }
	  }

	  if (!nou)
	    all = Object.keys(all);

	  if (!self.nosort)
	    all = all.sort(alphasort);

	  // at *some* point we statted all of these
	  if (self.mark) {
	    for (var i = 0; i < all.length; i++) {
	      all[i] = self._mark(all[i]);
	    }
	    if (self.nodir) {
	      all = all.filter(function (e) {
	        var notDir = !(/\/$/.test(e));
	        var c = self.cache[e] || self.cache[makeAbs(self, e)];
	        if (notDir && c)
	          notDir = c !== 'DIR' && !Array.isArray(c);
	        return notDir
	      });
	    }
	  }

	  if (self.ignore.length)
	    all = all.filter(function(m) {
	      return !isIgnored(self, m)
	    });

	  self.found = all;
	}

	function mark (self, p) {
	  var abs = makeAbs(self, p);
	  var c = self.cache[abs];
	  var m = p;
	  if (c) {
	    var isDir = c === 'DIR' || Array.isArray(c);
	    var slash = p.slice(-1) === '/';

	    if (isDir && !slash)
	      m += '/';
	    else if (!isDir && slash)
	      m = m.slice(0, -1);

	    if (m !== p) {
	      var mabs = makeAbs(self, m);
	      self.statCache[mabs] = self.statCache[abs];
	      self.cache[mabs] = self.cache[abs];
	    }
	  }

	  return m
	}

	// lotta situps...
	function makeAbs (self, f) {
	  var abs = f;
	  if (f.charAt(0) === '/') {
	    abs = path.join(self.root, f);
	  } else if (isAbsolute(f) || f === '') {
	    abs = f;
	  } else if (self.changedCwd) {
	    abs = path.resolve(self.cwd, f);
	  } else {
	    abs = path.resolve(f);
	  }

	  if (process.platform === 'win32')
	    abs = abs.replace(/\\/g, '/');

	  return abs
	}


	// Return true, if pattern ends with globstar '**', for the accompanying parent directory.
	// Ex:- If node_modules/** is the pattern, add 'node_modules' to ignore list along with it's contents
	function isIgnored (self, path) {
	  if (!self.ignore.length)
	    return false

	  return self.ignore.some(function(item) {
	    return item.matcher.match(path) || !!(item.gmatcher && item.gmatcher.match(path))
	  })
	}

	function childrenIgnored (self, path) {
	  if (!self.ignore.length)
	    return false

	  return self.ignore.some(function(item) {
	    return !!(item.gmatcher && item.gmatcher.match(path))
	  })
	}
	return common$1;
}

var sync;
var hasRequiredSync;

function requireSync () {
	if (hasRequiredSync) return sync;
	hasRequiredSync = 1;
	sync = globSync;
	globSync.GlobSync = GlobSync;

	var fs = require$$1;
	var rp = requireFs_realpath();
	var minimatch = requireMinimatch();
	minimatch.Minimatch;
	requireGlob().Glob;
	var path = require$$2;
	var assert = require$$6;
	var isAbsolute = requirePathIsAbsolute();
	var common = requireCommon$1();
	var setopts = common.setopts;
	var ownProp = common.ownProp;
	var childrenIgnored = common.childrenIgnored;
	var isIgnored = common.isIgnored;

	function globSync (pattern, options) {
	  if (typeof options === 'function' || arguments.length === 3)
	    throw new TypeError('callback provided to sync glob\n'+
	                        'See: https://github.com/isaacs/node-glob/issues/167')

	  return new GlobSync(pattern, options).found
	}

	function GlobSync (pattern, options) {
	  if (!pattern)
	    throw new Error('must provide pattern')

	  if (typeof options === 'function' || arguments.length === 3)
	    throw new TypeError('callback provided to sync glob\n'+
	                        'See: https://github.com/isaacs/node-glob/issues/167')

	  if (!(this instanceof GlobSync))
	    return new GlobSync(pattern, options)

	  setopts(this, pattern, options);

	  if (this.noprocess)
	    return this

	  var n = this.minimatch.set.length;
	  this.matches = new Array(n);
	  for (var i = 0; i < n; i ++) {
	    this._process(this.minimatch.set[i], i, false);
	  }
	  this._finish();
	}

	GlobSync.prototype._finish = function () {
	  assert(this instanceof GlobSync);
	  if (this.realpath) {
	    var self = this;
	    this.matches.forEach(function (matchset, index) {
	      var set = self.matches[index] = Object.create(null);
	      for (var p in matchset) {
	        try {
	          p = self._makeAbs(p);
	          var real = rp.realpathSync(p, self.realpathCache);
	          set[real] = true;
	        } catch (er) {
	          if (er.syscall === 'stat')
	            set[self._makeAbs(p)] = true;
	          else
	            throw er
	        }
	      }
	    });
	  }
	  common.finish(this);
	};


	GlobSync.prototype._process = function (pattern, index, inGlobStar) {
	  assert(this instanceof GlobSync);

	  // Get the first [n] parts of pattern that are all strings.
	  var n = 0;
	  while (typeof pattern[n] === 'string') {
	    n ++;
	  }
	  // now n is the index of the first one that is *not* a string.

	  // See if there's anything else
	  var prefix;
	  switch (n) {
	    // if not, then this is rather simple
	    case pattern.length:
	      this._processSimple(pattern.join('/'), index);
	      return

	    case 0:
	      // pattern *starts* with some non-trivial item.
	      // going to readdir(cwd), but not include the prefix in matches.
	      prefix = null;
	      break

	    default:
	      // pattern has some string bits in the front.
	      // whatever it starts with, whether that's 'absolute' like /foo/bar,
	      // or 'relative' like '../baz'
	      prefix = pattern.slice(0, n).join('/');
	      break
	  }

	  var remain = pattern.slice(n);

	  // get the list of entries.
	  var read;
	  if (prefix === null)
	    read = '.';
	  else if (isAbsolute(prefix) || isAbsolute(pattern.join('/'))) {
	    if (!prefix || !isAbsolute(prefix))
	      prefix = '/' + prefix;
	    read = prefix;
	  } else
	    read = prefix;

	  var abs = this._makeAbs(read);

	  //if ignored, skip processing
	  if (childrenIgnored(this, read))
	    return

	  var isGlobStar = remain[0] === minimatch.GLOBSTAR;
	  if (isGlobStar)
	    this._processGlobStar(prefix, read, abs, remain, index, inGlobStar);
	  else
	    this._processReaddir(prefix, read, abs, remain, index, inGlobStar);
	};


	GlobSync.prototype._processReaddir = function (prefix, read, abs, remain, index, inGlobStar) {
	  var entries = this._readdir(abs, inGlobStar);

	  // if the abs isn't a dir, then nothing can match!
	  if (!entries)
	    return

	  // It will only match dot entries if it starts with a dot, or if
	  // dot is set.  Stuff like @(.foo|.bar) isn't allowed.
	  var pn = remain[0];
	  var negate = !!this.minimatch.negate;
	  var rawGlob = pn._glob;
	  var dotOk = this.dot || rawGlob.charAt(0) === '.';

	  var matchedEntries = [];
	  for (var i = 0; i < entries.length; i++) {
	    var e = entries[i];
	    if (e.charAt(0) !== '.' || dotOk) {
	      var m;
	      if (negate && !prefix) {
	        m = !e.match(pn);
	      } else {
	        m = e.match(pn);
	      }
	      if (m)
	        matchedEntries.push(e);
	    }
	  }

	  var len = matchedEntries.length;
	  // If there are no matched entries, then nothing matches.
	  if (len === 0)
	    return

	  // if this is the last remaining pattern bit, then no need for
	  // an additional stat *unless* the user has specified mark or
	  // stat explicitly.  We know they exist, since readdir returned
	  // them.

	  if (remain.length === 1 && !this.mark && !this.stat) {
	    if (!this.matches[index])
	      this.matches[index] = Object.create(null);

	    for (var i = 0; i < len; i ++) {
	      var e = matchedEntries[i];
	      if (prefix) {
	        if (prefix.slice(-1) !== '/')
	          e = prefix + '/' + e;
	        else
	          e = prefix + e;
	      }

	      if (e.charAt(0) === '/' && !this.nomount) {
	        e = path.join(this.root, e);
	      }
	      this._emitMatch(index, e);
	    }
	    // This was the last one, and no stats were needed
	    return
	  }

	  // now test all matched entries as stand-ins for that part
	  // of the pattern.
	  remain.shift();
	  for (var i = 0; i < len; i ++) {
	    var e = matchedEntries[i];
	    var newPattern;
	    if (prefix)
	      newPattern = [prefix, e];
	    else
	      newPattern = [e];
	    this._process(newPattern.concat(remain), index, inGlobStar);
	  }
	};


	GlobSync.prototype._emitMatch = function (index, e) {
	  if (isIgnored(this, e))
	    return

	  var abs = this._makeAbs(e);

	  if (this.mark)
	    e = this._mark(e);

	  if (this.absolute) {
	    e = abs;
	  }

	  if (this.matches[index][e])
	    return

	  if (this.nodir) {
	    var c = this.cache[abs];
	    if (c === 'DIR' || Array.isArray(c))
	      return
	  }

	  this.matches[index][e] = true;

	  if (this.stat)
	    this._stat(e);
	};


	GlobSync.prototype._readdirInGlobStar = function (abs) {
	  // follow all symlinked directories forever
	  // just proceed as if this is a non-globstar situation
	  if (this.follow)
	    return this._readdir(abs, false)

	  var entries;
	  var lstat;
	  try {
	    lstat = fs.lstatSync(abs);
	  } catch (er) {
	    if (er.code === 'ENOENT') {
	      // lstat failed, doesn't exist
	      return null
	    }
	  }

	  var isSym = lstat && lstat.isSymbolicLink();
	  this.symlinks[abs] = isSym;

	  // If it's not a symlink or a dir, then it's definitely a regular file.
	  // don't bother doing a readdir in that case.
	  if (!isSym && lstat && !lstat.isDirectory())
	    this.cache[abs] = 'FILE';
	  else
	    entries = this._readdir(abs, false);

	  return entries
	};

	GlobSync.prototype._readdir = function (abs, inGlobStar) {

	  if (inGlobStar && !ownProp(this.symlinks, abs))
	    return this._readdirInGlobStar(abs)

	  if (ownProp(this.cache, abs)) {
	    var c = this.cache[abs];
	    if (!c || c === 'FILE')
	      return null

	    if (Array.isArray(c))
	      return c
	  }

	  try {
	    return this._readdirEntries(abs, fs.readdirSync(abs))
	  } catch (er) {
	    this._readdirError(abs, er);
	    return null
	  }
	};

	GlobSync.prototype._readdirEntries = function (abs, entries) {
	  // if we haven't asked to stat everything, then just
	  // assume that everything in there exists, so we can avoid
	  // having to stat it a second time.
	  if (!this.mark && !this.stat) {
	    for (var i = 0; i < entries.length; i ++) {
	      var e = entries[i];
	      if (abs === '/')
	        e = abs + e;
	      else
	        e = abs + '/' + e;
	      this.cache[e] = true;
	    }
	  }

	  this.cache[abs] = entries;

	  // mark and cache dir-ness
	  return entries
	};

	GlobSync.prototype._readdirError = function (f, er) {
	  // handle errors, and cache the information
	  switch (er.code) {
	    case 'ENOTSUP': // https://github.com/isaacs/node-glob/issues/205
	    case 'ENOTDIR': // totally normal. means it *does* exist.
	      var abs = this._makeAbs(f);
	      this.cache[abs] = 'FILE';
	      if (abs === this.cwdAbs) {
	        var error = new Error(er.code + ' invalid cwd ' + this.cwd);
	        error.path = this.cwd;
	        error.code = er.code;
	        throw error
	      }
	      break

	    case 'ENOENT': // not terribly unusual
	    case 'ELOOP':
	    case 'ENAMETOOLONG':
	    case 'UNKNOWN':
	      this.cache[this._makeAbs(f)] = false;
	      break

	    default: // some unusual error.  Treat as failure.
	      this.cache[this._makeAbs(f)] = false;
	      if (this.strict)
	        throw er
	      if (!this.silent)
	        console.error('glob error', er);
	      break
	  }
	};

	GlobSync.prototype._processGlobStar = function (prefix, read, abs, remain, index, inGlobStar) {

	  var entries = this._readdir(abs, inGlobStar);

	  // no entries means not a dir, so it can never have matches
	  // foo.txt/** doesn't match foo.txt
	  if (!entries)
	    return

	  // test without the globstar, and with every child both below
	  // and replacing the globstar.
	  var remainWithoutGlobStar = remain.slice(1);
	  var gspref = prefix ? [ prefix ] : [];
	  var noGlobStar = gspref.concat(remainWithoutGlobStar);

	  // the noGlobStar pattern exits the inGlobStar state
	  this._process(noGlobStar, index, false);

	  var len = entries.length;
	  var isSym = this.symlinks[abs];

	  // If it's a symlink, and we're in a globstar, then stop
	  if (isSym && inGlobStar)
	    return

	  for (var i = 0; i < len; i++) {
	    var e = entries[i];
	    if (e.charAt(0) === '.' && !this.dot)
	      continue

	    // these two cases enter the inGlobStar state
	    var instead = gspref.concat(entries[i], remainWithoutGlobStar);
	    this._process(instead, index, true);

	    var below = gspref.concat(entries[i], remain);
	    this._process(below, index, true);
	  }
	};

	GlobSync.prototype._processSimple = function (prefix, index) {
	  // XXX review this.  Shouldn't it be doing the mounting etc
	  // before doing stat?  kinda weird?
	  var exists = this._stat(prefix);

	  if (!this.matches[index])
	    this.matches[index] = Object.create(null);

	  // If it doesn't exist, then just mark the lack of results
	  if (!exists)
	    return

	  if (prefix && isAbsolute(prefix) && !this.nomount) {
	    var trail = /[\/\\]$/.test(prefix);
	    if (prefix.charAt(0) === '/') {
	      prefix = path.join(this.root, prefix);
	    } else {
	      prefix = path.resolve(this.root, prefix);
	      if (trail)
	        prefix += '/';
	    }
	  }

	  if (process.platform === 'win32')
	    prefix = prefix.replace(/\\/g, '/');

	  // Mark this as a match
	  this._emitMatch(index, prefix);
	};

	// Returns either 'DIR', 'FILE', or false
	GlobSync.prototype._stat = function (f) {
	  var abs = this._makeAbs(f);
	  var needDir = f.slice(-1) === '/';

	  if (f.length > this.maxLength)
	    return false

	  if (!this.stat && ownProp(this.cache, abs)) {
	    var c = this.cache[abs];

	    if (Array.isArray(c))
	      c = 'DIR';

	    // It exists, but maybe not how we need it
	    if (!needDir || c === 'DIR')
	      return c

	    if (needDir && c === 'FILE')
	      return false

	    // otherwise we have to stat, because maybe c=true
	    // if we know it exists, but not what it is.
	  }
	  var stat = this.statCache[abs];
	  if (!stat) {
	    var lstat;
	    try {
	      lstat = fs.lstatSync(abs);
	    } catch (er) {
	      if (er && (er.code === 'ENOENT' || er.code === 'ENOTDIR')) {
	        this.statCache[abs] = false;
	        return false
	      }
	    }

	    if (lstat && lstat.isSymbolicLink()) {
	      try {
	        stat = fs.statSync(abs);
	      } catch (er) {
	        stat = lstat;
	      }
	    } else {
	      stat = lstat;
	    }
	  }

	  this.statCache[abs] = stat;

	  var c = true;
	  if (stat)
	    c = stat.isDirectory() ? 'DIR' : 'FILE';

	  this.cache[abs] = this.cache[abs] || c;

	  if (needDir && c === 'FILE')
	    return false

	  return c
	};

	GlobSync.prototype._mark = function (p) {
	  return common.mark(this, p)
	};

	GlobSync.prototype._makeAbs = function (f) {
	  return common.makeAbs(this, f)
	};
	return sync;
}

var wrappy_1;
var hasRequiredWrappy;

function requireWrappy () {
	if (hasRequiredWrappy) return wrappy_1;
	hasRequiredWrappy = 1;
	// Returns a wrapper function that returns a wrapped callback
	// The wrapper function should do some stuff, and return a
	// presumably different callback function.
	// This makes sure that own properties are retained, so that
	// decorations and such are not lost along the way.
	wrappy_1 = wrappy;
	function wrappy (fn, cb) {
	  if (fn && cb) return wrappy(fn)(cb)

	  if (typeof fn !== 'function')
	    throw new TypeError('need wrapper function')

	  Object.keys(fn).forEach(function (k) {
	    wrapper[k] = fn[k];
	  });

	  return wrapper

	  function wrapper() {
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }
	    var ret = fn.apply(this, args);
	    var cb = args[args.length-1];
	    if (typeof ret === 'function' && ret !== cb) {
	      Object.keys(cb).forEach(function (k) {
	        ret[k] = cb[k];
	      });
	    }
	    return ret
	  }
	}
	return wrappy_1;
}

var once = {exports: {}};

var hasRequiredOnce;

function requireOnce () {
	if (hasRequiredOnce) return once.exports;
	hasRequiredOnce = 1;
	var wrappy = requireWrappy();
	once.exports = wrappy(once$1);
	once.exports.strict = wrappy(onceStrict);

	once$1.proto = once$1(function () {
	  Object.defineProperty(Function.prototype, 'once', {
	    value: function () {
	      return once$1(this)
	    },
	    configurable: true
	  });

	  Object.defineProperty(Function.prototype, 'onceStrict', {
	    value: function () {
	      return onceStrict(this)
	    },
	    configurable: true
	  });
	});

	function once$1 (fn) {
	  var f = function () {
	    if (f.called) return f.value
	    f.called = true;
	    return f.value = fn.apply(this, arguments)
	  };
	  f.called = false;
	  return f
	}

	function onceStrict (fn) {
	  var f = function () {
	    if (f.called)
	      throw new Error(f.onceError)
	    f.called = true;
	    return f.value = fn.apply(this, arguments)
	  };
	  var name = fn.name || 'Function wrapped with `once`';
	  f.onceError = name + " shouldn't be called more than once";
	  f.called = false;
	  return f
	}
	return once.exports;
}

var inflight_1;
var hasRequiredInflight;

function requireInflight () {
	if (hasRequiredInflight) return inflight_1;
	hasRequiredInflight = 1;
	var wrappy = requireWrappy();
	var reqs = Object.create(null);
	var once = requireOnce();

	inflight_1 = wrappy(inflight);

	function inflight (key, cb) {
	  if (reqs[key]) {
	    reqs[key].push(cb);
	    return null
	  } else {
	    reqs[key] = [cb];
	    return makeres(key)
	  }
	}

	function makeres (key) {
	  return once(function RES () {
	    var cbs = reqs[key];
	    var len = cbs.length;
	    var args = slice(arguments);

	    // XXX It's somewhat ambiguous whether a new callback added in this
	    // pass should be queued for later execution if something in the
	    // list of callbacks throws, or if it should just be discarded.
	    // However, it's such an edge case that it hardly matters, and either
	    // choice is likely as surprising as the other.
	    // As it happens, we do go ahead and schedule it for later execution.
	    try {
	      for (var i = 0; i < len; i++) {
	        cbs[i].apply(null, args);
	      }
	    } finally {
	      if (cbs.length > len) {
	        // added more in the interim.
	        // de-zalgo, just in case, but don't call again.
	        cbs.splice(0, len);
	        process.nextTick(function () {
	          RES.apply(null, args);
	        });
	      } else {
	        delete reqs[key];
	      }
	    }
	  })
	}

	function slice (args) {
	  var length = args.length;
	  var array = [];

	  for (var i = 0; i < length; i++) array[i] = args[i];
	  return array
	}
	return inflight_1;
}

var glob_1;
var hasRequiredGlob;

function requireGlob () {
	if (hasRequiredGlob) return glob_1;
	hasRequiredGlob = 1;
	// Approach:
	//
	// 1. Get the minimatch set
	// 2. For each pattern in the set, PROCESS(pattern, false)
	// 3. Store matches per-set, then uniq them
	//
	// PROCESS(pattern, inGlobStar)
	// Get the first [n] items from pattern that are all strings
	// Join these together.  This is PREFIX.
	//   If there is no more remaining, then stat(PREFIX) and
	//   add to matches if it succeeds.  END.
	//
	// If inGlobStar and PREFIX is symlink and points to dir
	//   set ENTRIES = []
	// else readdir(PREFIX) as ENTRIES
	//   If fail, END
	//
	// with ENTRIES
	//   If pattern[n] is GLOBSTAR
	//     // handle the case where the globstar match is empty
	//     // by pruning it out, and testing the resulting pattern
	//     PROCESS(pattern[0..n] + pattern[n+1 .. $], false)
	//     // handle other cases.
	//     for ENTRY in ENTRIES (not dotfiles)
	//       // attach globstar + tail onto the entry
	//       // Mark that this entry is a globstar match
	//       PROCESS(pattern[0..n] + ENTRY + pattern[n .. $], true)
	//
	//   else // not globstar
	//     for ENTRY in ENTRIES (not dotfiles, unless pattern[n] is dot)
	//       Test ENTRY against pattern[n]
	//       If fails, continue
	//       If passes, PROCESS(pattern[0..n] + item + pattern[n+1 .. $])
	//
	// Caveat:
	//   Cache all stats and readdirs results to minimize syscall.  Since all
	//   we ever care about is existence and directory-ness, we can just keep
	//   `true` for files, and [children,...] for directories, or `false` for
	//   things that don't exist.

	glob_1 = glob;

	var fs = require$$1;
	var rp = requireFs_realpath();
	var minimatch = requireMinimatch();
	minimatch.Minimatch;
	var inherits = requireInherits();
	var EE = require$$4.EventEmitter;
	var path = require$$2;
	var assert = require$$6;
	var isAbsolute = requirePathIsAbsolute();
	var globSync = requireSync();
	var common = requireCommon$1();
	var setopts = common.setopts;
	var ownProp = common.ownProp;
	var inflight = requireInflight();
	var childrenIgnored = common.childrenIgnored;
	var isIgnored = common.isIgnored;

	var once = requireOnce();

	function glob (pattern, options, cb) {
	  if (typeof options === 'function') cb = options, options = {};
	  if (!options) options = {};

	  if (options.sync) {
	    if (cb)
	      throw new TypeError('callback provided to sync glob')
	    return globSync(pattern, options)
	  }

	  return new Glob(pattern, options, cb)
	}

	glob.sync = globSync;
	var GlobSync = glob.GlobSync = globSync.GlobSync;

	// old api surface
	glob.glob = glob;

	function extend (origin, add) {
	  if (add === null || typeof add !== 'object') {
	    return origin
	  }

	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin
	}

	glob.hasMagic = function (pattern, options_) {
	  var options = extend({}, options_);
	  options.noprocess = true;

	  var g = new Glob(pattern, options);
	  var set = g.minimatch.set;

	  if (!pattern)
	    return false

	  if (set.length > 1)
	    return true

	  for (var j = 0; j < set[0].length; j++) {
	    if (typeof set[0][j] !== 'string')
	      return true
	  }

	  return false
	};

	glob.Glob = Glob;
	inherits(Glob, EE);
	function Glob (pattern, options, cb) {
	  if (typeof options === 'function') {
	    cb = options;
	    options = null;
	  }

	  if (options && options.sync) {
	    if (cb)
	      throw new TypeError('callback provided to sync glob')
	    return new GlobSync(pattern, options)
	  }

	  if (!(this instanceof Glob))
	    return new Glob(pattern, options, cb)

	  setopts(this, pattern, options);
	  this._didRealPath = false;

	  // process each pattern in the minimatch set
	  var n = this.minimatch.set.length;

	  // The matches are stored as {<filename>: true,...} so that
	  // duplicates are automagically pruned.
	  // Later, we do an Object.keys() on these.
	  // Keep them as a list so we can fill in when nonull is set.
	  this.matches = new Array(n);

	  if (typeof cb === 'function') {
	    cb = once(cb);
	    this.on('error', cb);
	    this.on('end', function (matches) {
	      cb(null, matches);
	    });
	  }

	  var self = this;
	  this._processing = 0;

	  this._emitQueue = [];
	  this._processQueue = [];
	  this.paused = false;

	  if (this.noprocess)
	    return this

	  if (n === 0)
	    return done()

	  var sync = true;
	  for (var i = 0; i < n; i ++) {
	    this._process(this.minimatch.set[i], i, false, done);
	  }
	  sync = false;

	  function done () {
	    --self._processing;
	    if (self._processing <= 0) {
	      if (sync) {
	        process.nextTick(function () {
	          self._finish();
	        });
	      } else {
	        self._finish();
	      }
	    }
	  }
	}

	Glob.prototype._finish = function () {
	  assert(this instanceof Glob);
	  if (this.aborted)
	    return

	  if (this.realpath && !this._didRealpath)
	    return this._realpath()

	  common.finish(this);
	  this.emit('end', this.found);
	};

	Glob.prototype._realpath = function () {
	  if (this._didRealpath)
	    return

	  this._didRealpath = true;

	  var n = this.matches.length;
	  if (n === 0)
	    return this._finish()

	  var self = this;
	  for (var i = 0; i < this.matches.length; i++)
	    this._realpathSet(i, next);

	  function next () {
	    if (--n === 0)
	      self._finish();
	  }
	};

	Glob.prototype._realpathSet = function (index, cb) {
	  var matchset = this.matches[index];
	  if (!matchset)
	    return cb()

	  var found = Object.keys(matchset);
	  var self = this;
	  var n = found.length;

	  if (n === 0)
	    return cb()

	  var set = this.matches[index] = Object.create(null);
	  found.forEach(function (p, i) {
	    // If there's a problem with the stat, then it means that
	    // one or more of the links in the realpath couldn't be
	    // resolved.  just return the abs value in that case.
	    p = self._makeAbs(p);
	    rp.realpath(p, self.realpathCache, function (er, real) {
	      if (!er)
	        set[real] = true;
	      else if (er.syscall === 'stat')
	        set[p] = true;
	      else
	        self.emit('error', er); // srsly wtf right here

	      if (--n === 0) {
	        self.matches[index] = set;
	        cb();
	      }
	    });
	  });
	};

	Glob.prototype._mark = function (p) {
	  return common.mark(this, p)
	};

	Glob.prototype._makeAbs = function (f) {
	  return common.makeAbs(this, f)
	};

	Glob.prototype.abort = function () {
	  this.aborted = true;
	  this.emit('abort');
	};

	Glob.prototype.pause = function () {
	  if (!this.paused) {
	    this.paused = true;
	    this.emit('pause');
	  }
	};

	Glob.prototype.resume = function () {
	  if (this.paused) {
	    this.emit('resume');
	    this.paused = false;
	    if (this._emitQueue.length) {
	      var eq = this._emitQueue.slice(0);
	      this._emitQueue.length = 0;
	      for (var i = 0; i < eq.length; i ++) {
	        var e = eq[i];
	        this._emitMatch(e[0], e[1]);
	      }
	    }
	    if (this._processQueue.length) {
	      var pq = this._processQueue.slice(0);
	      this._processQueue.length = 0;
	      for (var i = 0; i < pq.length; i ++) {
	        var p = pq[i];
	        this._processing--;
	        this._process(p[0], p[1], p[2], p[3]);
	      }
	    }
	  }
	};

	Glob.prototype._process = function (pattern, index, inGlobStar, cb) {
	  assert(this instanceof Glob);
	  assert(typeof cb === 'function');

	  if (this.aborted)
	    return

	  this._processing++;
	  if (this.paused) {
	    this._processQueue.push([pattern, index, inGlobStar, cb]);
	    return
	  }

	  //console.error('PROCESS %d', this._processing, pattern)

	  // Get the first [n] parts of pattern that are all strings.
	  var n = 0;
	  while (typeof pattern[n] === 'string') {
	    n ++;
	  }
	  // now n is the index of the first one that is *not* a string.

	  // see if there's anything else
	  var prefix;
	  switch (n) {
	    // if not, then this is rather simple
	    case pattern.length:
	      this._processSimple(pattern.join('/'), index, cb);
	      return

	    case 0:
	      // pattern *starts* with some non-trivial item.
	      // going to readdir(cwd), but not include the prefix in matches.
	      prefix = null;
	      break

	    default:
	      // pattern has some string bits in the front.
	      // whatever it starts with, whether that's 'absolute' like /foo/bar,
	      // or 'relative' like '../baz'
	      prefix = pattern.slice(0, n).join('/');
	      break
	  }

	  var remain = pattern.slice(n);

	  // get the list of entries.
	  var read;
	  if (prefix === null)
	    read = '.';
	  else if (isAbsolute(prefix) || isAbsolute(pattern.join('/'))) {
	    if (!prefix || !isAbsolute(prefix))
	      prefix = '/' + prefix;
	    read = prefix;
	  } else
	    read = prefix;

	  var abs = this._makeAbs(read);

	  //if ignored, skip _processing
	  if (childrenIgnored(this, read))
	    return cb()

	  var isGlobStar = remain[0] === minimatch.GLOBSTAR;
	  if (isGlobStar)
	    this._processGlobStar(prefix, read, abs, remain, index, inGlobStar, cb);
	  else
	    this._processReaddir(prefix, read, abs, remain, index, inGlobStar, cb);
	};

	Glob.prototype._processReaddir = function (prefix, read, abs, remain, index, inGlobStar, cb) {
	  var self = this;
	  this._readdir(abs, inGlobStar, function (er, entries) {
	    return self._processReaddir2(prefix, read, abs, remain, index, inGlobStar, entries, cb)
	  });
	};

	Glob.prototype._processReaddir2 = function (prefix, read, abs, remain, index, inGlobStar, entries, cb) {

	  // if the abs isn't a dir, then nothing can match!
	  if (!entries)
	    return cb()

	  // It will only match dot entries if it starts with a dot, or if
	  // dot is set.  Stuff like @(.foo|.bar) isn't allowed.
	  var pn = remain[0];
	  var negate = !!this.minimatch.negate;
	  var rawGlob = pn._glob;
	  var dotOk = this.dot || rawGlob.charAt(0) === '.';

	  var matchedEntries = [];
	  for (var i = 0; i < entries.length; i++) {
	    var e = entries[i];
	    if (e.charAt(0) !== '.' || dotOk) {
	      var m;
	      if (negate && !prefix) {
	        m = !e.match(pn);
	      } else {
	        m = e.match(pn);
	      }
	      if (m)
	        matchedEntries.push(e);
	    }
	  }

	  //console.error('prd2', prefix, entries, remain[0]._glob, matchedEntries)

	  var len = matchedEntries.length;
	  // If there are no matched entries, then nothing matches.
	  if (len === 0)
	    return cb()

	  // if this is the last remaining pattern bit, then no need for
	  // an additional stat *unless* the user has specified mark or
	  // stat explicitly.  We know they exist, since readdir returned
	  // them.

	  if (remain.length === 1 && !this.mark && !this.stat) {
	    if (!this.matches[index])
	      this.matches[index] = Object.create(null);

	    for (var i = 0; i < len; i ++) {
	      var e = matchedEntries[i];
	      if (prefix) {
	        if (prefix !== '/')
	          e = prefix + '/' + e;
	        else
	          e = prefix + e;
	      }

	      if (e.charAt(0) === '/' && !this.nomount) {
	        e = path.join(this.root, e);
	      }
	      this._emitMatch(index, e);
	    }
	    // This was the last one, and no stats were needed
	    return cb()
	  }

	  // now test all matched entries as stand-ins for that part
	  // of the pattern.
	  remain.shift();
	  for (var i = 0; i < len; i ++) {
	    var e = matchedEntries[i];
	    if (prefix) {
	      if (prefix !== '/')
	        e = prefix + '/' + e;
	      else
	        e = prefix + e;
	    }
	    this._process([e].concat(remain), index, inGlobStar, cb);
	  }
	  cb();
	};

	Glob.prototype._emitMatch = function (index, e) {
	  if (this.aborted)
	    return

	  if (isIgnored(this, e))
	    return

	  if (this.paused) {
	    this._emitQueue.push([index, e]);
	    return
	  }

	  var abs = isAbsolute(e) ? e : this._makeAbs(e);

	  if (this.mark)
	    e = this._mark(e);

	  if (this.absolute)
	    e = abs;

	  if (this.matches[index][e])
	    return

	  if (this.nodir) {
	    var c = this.cache[abs];
	    if (c === 'DIR' || Array.isArray(c))
	      return
	  }

	  this.matches[index][e] = true;

	  var st = this.statCache[abs];
	  if (st)
	    this.emit('stat', e, st);

	  this.emit('match', e);
	};

	Glob.prototype._readdirInGlobStar = function (abs, cb) {
	  if (this.aborted)
	    return

	  // follow all symlinked directories forever
	  // just proceed as if this is a non-globstar situation
	  if (this.follow)
	    return this._readdir(abs, false, cb)

	  var lstatkey = 'lstat\0' + abs;
	  var self = this;
	  var lstatcb = inflight(lstatkey, lstatcb_);

	  if (lstatcb)
	    fs.lstat(abs, lstatcb);

	  function lstatcb_ (er, lstat) {
	    if (er && er.code === 'ENOENT')
	      return cb()

	    var isSym = lstat && lstat.isSymbolicLink();
	    self.symlinks[abs] = isSym;

	    // If it's not a symlink or a dir, then it's definitely a regular file.
	    // don't bother doing a readdir in that case.
	    if (!isSym && lstat && !lstat.isDirectory()) {
	      self.cache[abs] = 'FILE';
	      cb();
	    } else
	      self._readdir(abs, false, cb);
	  }
	};

	Glob.prototype._readdir = function (abs, inGlobStar, cb) {
	  if (this.aborted)
	    return

	  cb = inflight('readdir\0'+abs+'\0'+inGlobStar, cb);
	  if (!cb)
	    return

	  //console.error('RD %j %j', +inGlobStar, abs)
	  if (inGlobStar && !ownProp(this.symlinks, abs))
	    return this._readdirInGlobStar(abs, cb)

	  if (ownProp(this.cache, abs)) {
	    var c = this.cache[abs];
	    if (!c || c === 'FILE')
	      return cb()

	    if (Array.isArray(c))
	      return cb(null, c)
	  }
	  fs.readdir(abs, readdirCb(this, abs, cb));
	};

	function readdirCb (self, abs, cb) {
	  return function (er, entries) {
	    if (er)
	      self._readdirError(abs, er, cb);
	    else
	      self._readdirEntries(abs, entries, cb);
	  }
	}

	Glob.prototype._readdirEntries = function (abs, entries, cb) {
	  if (this.aborted)
	    return

	  // if we haven't asked to stat everything, then just
	  // assume that everything in there exists, so we can avoid
	  // having to stat it a second time.
	  if (!this.mark && !this.stat) {
	    for (var i = 0; i < entries.length; i ++) {
	      var e = entries[i];
	      if (abs === '/')
	        e = abs + e;
	      else
	        e = abs + '/' + e;
	      this.cache[e] = true;
	    }
	  }

	  this.cache[abs] = entries;
	  return cb(null, entries)
	};

	Glob.prototype._readdirError = function (f, er, cb) {
	  if (this.aborted)
	    return

	  // handle errors, and cache the information
	  switch (er.code) {
	    case 'ENOTSUP': // https://github.com/isaacs/node-glob/issues/205
	    case 'ENOTDIR': // totally normal. means it *does* exist.
	      var abs = this._makeAbs(f);
	      this.cache[abs] = 'FILE';
	      if (abs === this.cwdAbs) {
	        var error = new Error(er.code + ' invalid cwd ' + this.cwd);
	        error.path = this.cwd;
	        error.code = er.code;
	        this.emit('error', error);
	        this.abort();
	      }
	      break

	    case 'ENOENT': // not terribly unusual
	    case 'ELOOP':
	    case 'ENAMETOOLONG':
	    case 'UNKNOWN':
	      this.cache[this._makeAbs(f)] = false;
	      break

	    default: // some unusual error.  Treat as failure.
	      this.cache[this._makeAbs(f)] = false;
	      if (this.strict) {
	        this.emit('error', er);
	        // If the error is handled, then we abort
	        // if not, we threw out of here
	        this.abort();
	      }
	      if (!this.silent)
	        console.error('glob error', er);
	      break
	  }

	  return cb()
	};

	Glob.prototype._processGlobStar = function (prefix, read, abs, remain, index, inGlobStar, cb) {
	  var self = this;
	  this._readdir(abs, inGlobStar, function (er, entries) {
	    self._processGlobStar2(prefix, read, abs, remain, index, inGlobStar, entries, cb);
	  });
	};


	Glob.prototype._processGlobStar2 = function (prefix, read, abs, remain, index, inGlobStar, entries, cb) {
	  //console.error('pgs2', prefix, remain[0], entries)

	  // no entries means not a dir, so it can never have matches
	  // foo.txt/** doesn't match foo.txt
	  if (!entries)
	    return cb()

	  // test without the globstar, and with every child both below
	  // and replacing the globstar.
	  var remainWithoutGlobStar = remain.slice(1);
	  var gspref = prefix ? [ prefix ] : [];
	  var noGlobStar = gspref.concat(remainWithoutGlobStar);

	  // the noGlobStar pattern exits the inGlobStar state
	  this._process(noGlobStar, index, false, cb);

	  var isSym = this.symlinks[abs];
	  var len = entries.length;

	  // If it's a symlink, and we're in a globstar, then stop
	  if (isSym && inGlobStar)
	    return cb()

	  for (var i = 0; i < len; i++) {
	    var e = entries[i];
	    if (e.charAt(0) === '.' && !this.dot)
	      continue

	    // these two cases enter the inGlobStar state
	    var instead = gspref.concat(entries[i], remainWithoutGlobStar);
	    this._process(instead, index, true, cb);

	    var below = gspref.concat(entries[i], remain);
	    this._process(below, index, true, cb);
	  }

	  cb();
	};

	Glob.prototype._processSimple = function (prefix, index, cb) {
	  // XXX review this.  Shouldn't it be doing the mounting etc
	  // before doing stat?  kinda weird?
	  var self = this;
	  this._stat(prefix, function (er, exists) {
	    self._processSimple2(prefix, index, er, exists, cb);
	  });
	};
	Glob.prototype._processSimple2 = function (prefix, index, er, exists, cb) {

	  //console.error('ps2', prefix, exists)

	  if (!this.matches[index])
	    this.matches[index] = Object.create(null);

	  // If it doesn't exist, then just mark the lack of results
	  if (!exists)
	    return cb()

	  if (prefix && isAbsolute(prefix) && !this.nomount) {
	    var trail = /[\/\\]$/.test(prefix);
	    if (prefix.charAt(0) === '/') {
	      prefix = path.join(this.root, prefix);
	    } else {
	      prefix = path.resolve(this.root, prefix);
	      if (trail)
	        prefix += '/';
	    }
	  }

	  if (process.platform === 'win32')
	    prefix = prefix.replace(/\\/g, '/');

	  // Mark this as a match
	  this._emitMatch(index, prefix);
	  cb();
	};

	// Returns either 'DIR', 'FILE', or false
	Glob.prototype._stat = function (f, cb) {
	  var abs = this._makeAbs(f);
	  var needDir = f.slice(-1) === '/';

	  if (f.length > this.maxLength)
	    return cb()

	  if (!this.stat && ownProp(this.cache, abs)) {
	    var c = this.cache[abs];

	    if (Array.isArray(c))
	      c = 'DIR';

	    // It exists, but maybe not how we need it
	    if (!needDir || c === 'DIR')
	      return cb(null, c)

	    if (needDir && c === 'FILE')
	      return cb()

	    // otherwise we have to stat, because maybe c=true
	    // if we know it exists, but not what it is.
	  }
	  var stat = this.statCache[abs];
	  if (stat !== undefined) {
	    if (stat === false)
	      return cb(null, stat)
	    else {
	      var type = stat.isDirectory() ? 'DIR' : 'FILE';
	      if (needDir && type === 'FILE')
	        return cb()
	      else
	        return cb(null, type, stat)
	    }
	  }

	  var self = this;
	  var statcb = inflight('stat\0' + abs, lstatcb_);
	  if (statcb)
	    fs.lstat(abs, statcb);

	  function lstatcb_ (er, lstat) {
	    if (lstat && lstat.isSymbolicLink()) {
	      // If it's a symlink, then treat it as the target, unless
	      // the target does not exist, then treat it as a file.
	      return fs.stat(abs, function (er, stat) {
	        if (er)
	          self._stat2(f, abs, null, lstat, cb);
	        else
	          self._stat2(f, abs, er, stat, cb);
	      })
	    } else {
	      self._stat2(f, abs, er, lstat, cb);
	    }
	  }
	};

	Glob.prototype._stat2 = function (f, abs, er, stat, cb) {
	  if (er && (er.code === 'ENOENT' || er.code === 'ENOTDIR')) {
	    this.statCache[abs] = false;
	    return cb()
	  }

	  var needDir = f.slice(-1) === '/';
	  this.statCache[abs] = stat;

	  if (abs.slice(-1) === '/' && stat && !stat.isDirectory())
	    return cb(null, false, stat)

	  var c = true;
	  if (stat)
	    c = stat.isDirectory() ? 'DIR' : 'FILE';
	  this.cache[abs] = this.cache[abs] || c;

	  if (needDir && c === 'FILE')
	    return cb()

	  return cb(null, c, stat)
	};
	return glob_1;
}

var hasRequiredCommon;

function requireCommon () {
	if (hasRequiredCommon) return common$2;
	hasRequiredCommon = 1;

	var os = require$$0;
	var fs = require$$1;
	var glob = requireGlob();
	var shell = requireShell();

	var shellMethods = Object.create(shell);

	common$2.extend = Object.assign;

	// Check if we're running under electron
	var isElectron = Boolean(process.versions.electron);

	// Module globals (assume no execPath by default)
	var DEFAULT_CONFIG = {
	  fatal: false,
	  globOptions: {},
	  maxdepth: 255,
	  noglob: false,
	  silent: false,
	  verbose: false,
	  execPath: null,
	  bufLength: 64 * 1024, // 64KB
	};

	var config = {
	  reset: function () {
	    Object.assign(this, DEFAULT_CONFIG);
	    if (!isElectron) {
	      this.execPath = process.execPath;
	    }
	  },
	  resetForTesting: function () {
	    this.reset();
	    this.silent = true;
	  },
	};

	config.reset();
	common$2.config = config;

	// Note: commands should generally consider these as read-only values.
	var state = {
	  error: null,
	  errorCode: 0,
	  currentCmd: 'shell.js',
	};
	common$2.state = state;

	delete process.env.OLDPWD; // initially, there's no previous directory

	// Reliably test if something is any sort of javascript object
	function isObject(a) {
	  return typeof a === 'object' && a !== null;
	}
	common$2.isObject = isObject;

	function log() {
	  /* istanbul ignore next */
	  if (!config.silent) {
	    console.error.apply(console, arguments);
	  }
	}
	common$2.log = log;

	// Converts strings to be equivalent across all platforms. Primarily responsible
	// for making sure we use '/' instead of '\' as path separators, but this may be
	// expanded in the future if necessary
	function convertErrorOutput(msg) {
	  if (typeof msg !== 'string') {
	    throw new TypeError('input must be a string');
	  }
	  return msg.replace(/\\/g, '/');
	}
	common$2.convertErrorOutput = convertErrorOutput;

	// Shows error message. Throws if config.fatal is true
	function error(msg, _code, options) {
	  // Validate input
	  if (typeof msg !== 'string') throw new Error('msg must be a string');

	  var DEFAULT_OPTIONS = {
	    continue: false,
	    code: 1,
	    prefix: state.currentCmd + ': ',
	    silent: false,
	  };

	  if (typeof _code === 'number' && isObject(options)) {
	    options.code = _code;
	  } else if (isObject(_code)) { // no 'code'
	    options = _code;
	  } else if (typeof _code === 'number') { // no 'options'
	    options = { code: _code };
	  } else if (typeof _code !== 'number') { // only 'msg'
	    options = {};
	  }
	  options = Object.assign({}, DEFAULT_OPTIONS, options);

	  if (!state.errorCode) state.errorCode = options.code;

	  var logEntry = convertErrorOutput(options.prefix + msg);
	  state.error = state.error ? state.error + '\n' : '';
	  state.error += logEntry;

	  // Throw an error, or log the entry
	  if (config.fatal) throw new Error(logEntry);
	  if (msg.length > 0 && !options.silent) log(logEntry);

	  if (!options.continue) {
	    throw {
	      msg: 'earlyExit',
	      retValue: (new ShellString('', state.error, state.errorCode)),
	    };
	  }
	}
	common$2.error = error;

	//@
	//@ ### ShellString(str)
	//@
	//@ Examples:
	//@
	//@ ```javascript
	//@ var foo = ShellString('hello world');
	//@ ```
	//@
	//@ Turns a regular string into a string-like object similar to what each
	//@ command returns. This has special methods, like `.to()` and `.toEnd()`.
	function ShellString(stdout, stderr, code) {
	  var that;
	  if (stdout instanceof Array) {
	    that = stdout;
	    that.stdout = stdout.join('\n');
	    if (stdout.length > 0) that.stdout += '\n';
	  } else {
	    that = new String(stdout);
	    that.stdout = stdout;
	  }
	  that.stderr = stderr;
	  that.code = code;
	  // A list of all commands that can appear on the right-hand side of a pipe
	  // (populated by calls to common.wrap())
	  pipeMethods.forEach(function (cmd) {
	    that[cmd] = shellMethods[cmd].bind(that);
	  });
	  return that;
	}

	common$2.ShellString = ShellString;

	// Returns {'alice': true, 'bob': false} when passed a string and dictionary as follows:
	//   parseOptions('-a', {'a':'alice', 'b':'bob'});
	// Returns {'reference': 'string-value', 'bob': false} when passed two dictionaries of the form:
	//   parseOptions({'-r': 'string-value'}, {'r':'reference', 'b':'bob'});
	// Throws an error when passed a string that does not start with '-':
	//   parseOptions('a', {'a':'alice'}); // throws
	function parseOptions(opt, map, errorOptions) {
	  // Validate input
	  if (typeof opt !== 'string' && !isObject(opt)) {
	    throw new Error('options must be strings or key-value pairs');
	  } else if (!isObject(map)) {
	    throw new Error('parseOptions() internal error: map must be an object');
	  } else if (errorOptions && !isObject(errorOptions)) {
	    throw new Error('parseOptions() internal error: errorOptions must be object');
	  }

	  if (opt === '--') {
	    // This means there are no options.
	    return {};
	  }

	  // All options are false by default
	  var options = {};
	  Object.keys(map).forEach(function (letter) {
	    var optName = map[letter];
	    if (optName[0] !== '!') {
	      options[optName] = false;
	    }
	  });

	  if (opt === '') return options; // defaults

	  if (typeof opt === 'string') {
	    if (opt[0] !== '-') {
	      throw new Error("Options string must start with a '-'");
	    }

	    // e.g. chars = ['R', 'f']
	    var chars = opt.slice(1).split('');

	    chars.forEach(function (c) {
	      if (c in map) {
	        var optionName = map[c];
	        if (optionName[0] === '!') {
	          options[optionName.slice(1)] = false;
	        } else {
	          options[optionName] = true;
	        }
	      } else {
	        error('option not recognized: ' + c, errorOptions || {});
	      }
	    });
	  } else { // opt is an Object
	    Object.keys(opt).forEach(function (key) {
	      // key is a string of the form '-r', '-d', etc.
	      var c = key[1];
	      if (c in map) {
	        var optionName = map[c];
	        options[optionName] = opt[key]; // assign the given value
	      } else {
	        error('option not recognized: ' + c, errorOptions || {});
	      }
	    });
	  }
	  return options;
	}
	common$2.parseOptions = parseOptions;

	// Expands wildcards with matching (ie. existing) file names.
	// For example:
	//   expand(['file*.js']) = ['file1.js', 'file2.js', ...]
	//   (if the files 'file1.js', 'file2.js', etc, exist in the current dir)
	function expand(list) {
	  if (!Array.isArray(list)) {
	    throw new TypeError('must be an array');
	  }
	  var expanded = [];
	  list.forEach(function (listEl) {
	    // Don't expand non-strings
	    if (typeof listEl !== 'string') {
	      expanded.push(listEl);
	    } else {
	      var ret;
	      try {
	        ret = glob.sync(listEl, config.globOptions);
	        // if nothing matched, interpret the string literally
	        ret = ret.length > 0 ? ret : [listEl];
	      } catch (e) {
	        // if glob fails, interpret the string literally
	        ret = [listEl];
	      }
	      expanded = expanded.concat(ret);
	    }
	  });
	  return expanded;
	}
	common$2.expand = expand;

	// Normalizes Buffer creation, using Buffer.alloc if possible.
	// Also provides a good default buffer length for most use cases.
	var buffer = typeof Buffer.alloc === 'function' ?
	  function (len) {
	    return Buffer.alloc(len || config.bufLength);
	  } :
	  function (len) {
	    return new Buffer(len || config.bufLength);
	  };
	common$2.buffer = buffer;

	// Normalizes _unlinkSync() across platforms to match Unix behavior, i.e.
	// file can be unlinked even if it's read-only, see https://github.com/joyent/node/issues/3006
	function unlinkSync(file) {
	  try {
	    fs.unlinkSync(file);
	  } catch (e) {
	    // Try to override file permission
	    /* istanbul ignore next */
	    if (e.code === 'EPERM') {
	      fs.chmodSync(file, '0666');
	      fs.unlinkSync(file);
	    } else {
	      throw e;
	    }
	  }
	}
	common$2.unlinkSync = unlinkSync;

	// wrappers around common.statFollowLinks and common.statNoFollowLinks that clarify intent
	// and improve readability
	function statFollowLinks() {
	  return fs.statSync.apply(fs, arguments);
	}
	common$2.statFollowLinks = statFollowLinks;

	function statNoFollowLinks() {
	  return fs.lstatSync.apply(fs, arguments);
	}
	common$2.statNoFollowLinks = statNoFollowLinks;

	// e.g. 'shelljs_a5f185d0443ca...'
	function randomFileName() {
	  function randomHash(count) {
	    if (count === 1) {
	      return parseInt(16 * Math.random(), 10).toString(16);
	    }
	    var hash = '';
	    for (var i = 0; i < count; i++) {
	      hash += randomHash(1);
	    }
	    return hash;
	  }

	  return 'shelljs_' + randomHash(20);
	}
	common$2.randomFileName = randomFileName;

	// Common wrapper for all Unix-like commands that performs glob expansion,
	// command-logging, and other nice things
	function wrap(cmd, fn, options) {
	  options = options || {};
	  return function () {
	    var retValue = null;

	    state.currentCmd = cmd;
	    state.error = null;
	    state.errorCode = 0;

	    try {
	      var args = [].slice.call(arguments, 0);

	      // Log the command to stderr, if appropriate
	      if (config.verbose) {
	        console.error.apply(console, [cmd].concat(args));
	      }

	      // If this is coming from a pipe, let's set the pipedValue (otherwise, set
	      // it to the empty string)
	      state.pipedValue = (this && typeof this.stdout === 'string') ? this.stdout : '';

	      if (options.unix === false) { // this branch is for exec()
	        retValue = fn.apply(this, args);
	      } else { // and this branch is for everything else
	        if (isObject(args[0]) && args[0].constructor.name === 'Object') {
	          // a no-op, allowing the syntax `touch({'-r': file}, ...)`
	        } else if (args.length === 0 || typeof args[0] !== 'string' || args[0].length <= 1 || args[0][0] !== '-') {
	          args.unshift(''); // only add dummy option if '-option' not already present
	        }

	        // flatten out arrays that are arguments, to make the syntax:
	        //    `cp([file1, file2, file3], dest);`
	        // equivalent to:
	        //    `cp(file1, file2, file3, dest);`
	        args = args.reduce(function (accum, cur) {
	          if (Array.isArray(cur)) {
	            return accum.concat(cur);
	          }
	          accum.push(cur);
	          return accum;
	        }, []);

	        // Convert ShellStrings (basically just String objects) to regular strings
	        args = args.map(function (arg) {
	          if (isObject(arg) && arg.constructor.name === 'String') {
	            return arg.toString();
	          }
	          return arg;
	        });

	        // Expand the '~' if appropriate
	        var homeDir = os.homedir();
	        args = args.map(function (arg) {
	          if (typeof arg === 'string' && arg.slice(0, 2) === '~/' || arg === '~') {
	            return arg.replace(/^~/, homeDir);
	          }
	          return arg;
	        });

	        // Perform glob-expansion on all arguments after globStart, but preserve
	        // the arguments before it (like regexes for sed and grep)
	        if (!config.noglob && options.allowGlobbing === true) {
	          args = args.slice(0, options.globStart).concat(expand(args.slice(options.globStart)));
	        }

	        try {
	          // parse options if options are provided
	          if (isObject(options.cmdOptions)) {
	            args[0] = parseOptions(args[0], options.cmdOptions);
	          }

	          retValue = fn.apply(this, args);
	        } catch (e) {
	          /* istanbul ignore else */
	          if (e.msg === 'earlyExit') {
	            retValue = e.retValue;
	          } else {
	            throw e; // this is probably a bug that should be thrown up the call stack
	          }
	        }
	      }
	    } catch (e) {
	      /* istanbul ignore next */
	      if (!state.error) {
	        // If state.error hasn't been set it's an error thrown by Node, not us - probably a bug...
	        e.name = 'ShellJSInternalError';
	        throw e;
	      }
	      if (config.fatal) throw e;
	    }

	    if (options.wrapOutput &&
	        (typeof retValue === 'string' || Array.isArray(retValue))) {
	      retValue = new ShellString(retValue, state.error, state.errorCode);
	    }

	    state.currentCmd = 'shell.js';
	    return retValue;
	  };
	} // wrap
	common$2.wrap = wrap;

	// This returns all the input that is piped into the current command (or the
	// empty string, if this isn't on the right-hand side of a pipe
	function _readFromPipe() {
	  return state.pipedValue;
	}
	common$2.readFromPipe = _readFromPipe;

	var DEFAULT_WRAP_OPTIONS = {
	  allowGlobbing: true,
	  canReceivePipe: false,
	  cmdOptions: null,
	  globStart: 1,
	  pipeOnly: false,
	  wrapOutput: true,
	  unix: true,
	};

	// This is populated during plugin registration
	var pipeMethods = [];

	// Register a new ShellJS command
	function _register(name, implementation, wrapOptions) {
	  wrapOptions = wrapOptions || {};

	  // Validate options
	  Object.keys(wrapOptions).forEach(function (option) {
	    if (!DEFAULT_WRAP_OPTIONS.hasOwnProperty(option)) {
	      throw new Error("Unknown option '" + option + "'");
	    }
	    if (typeof wrapOptions[option] !== typeof DEFAULT_WRAP_OPTIONS[option]) {
	      throw new TypeError("Unsupported type '" + typeof wrapOptions[option] +
	        "' for option '" + option + "'");
	    }
	  });

	  // If an option isn't specified, use the default
	  wrapOptions = Object.assign({}, DEFAULT_WRAP_OPTIONS, wrapOptions);

	  if (shell.hasOwnProperty(name)) {
	    throw new Error('Command `' + name + '` already exists');
	  }

	  if (wrapOptions.pipeOnly) {
	    wrapOptions.canReceivePipe = true;
	    shellMethods[name] = wrap(name, implementation, wrapOptions);
	  } else {
	    shell[name] = wrap(name, implementation, wrapOptions);
	  }

	  if (wrapOptions.canReceivePipe) {
	    pipeMethods.push(name);
	  }
	}
	common$2.register = _register;
	return common$2;
}

var cat;
var hasRequiredCat;

function requireCat () {
	if (hasRequiredCat) return cat;
	hasRequiredCat = 1;
	var common = requireCommon();
	var fs = require$$1;

	common.register('cat', _cat, {
	  canReceivePipe: true,
	  cmdOptions: {
	    'n': 'number',
	  },
	});

	//@
	//@ ### cat([options,] file [, file ...])
	//@ ### cat([options,] file_array)
	//@
	//@ Available options:
	//@
	//@ + `-n`: number all output lines
	//@
	//@ Examples:
	//@
	//@ ```javascript
	//@ var str = cat('file*.txt');
	//@ var str = cat('file1', 'file2');
	//@ var str = cat(['file1', 'file2']); // same as above
	//@ ```
	//@
	//@ Returns a string containing the given file, or a concatenated string
	//@ containing the files if more than one file is given (a new line character is
	//@ introduced between each file).
	function _cat(options, files) {
	  var cat = common.readFromPipe();

	  if (!files && !cat) common.error('no paths given');

	  files = [].slice.call(arguments, 1);

	  files.forEach(function (file) {
	    if (!fs.existsSync(file)) {
	      common.error('no such file or directory: ' + file);
	    } else if (common.statFollowLinks(file).isDirectory()) {
	      common.error(file + ': Is a directory');
	    }

	    cat += fs.readFileSync(file, 'utf8');
	  });

	  if (options.number) {
	    cat = addNumbers(cat);
	  }

	  return cat;
	}
	cat = _cat;

	function addNumbers(cat) {
	  var lines = cat.split('\n');
	  var lastLine = lines.pop();

	  lines = lines.map(function (line, i) {
	    return numberedLine(i + 1, line);
	  });

	  if (lastLine.length) {
	    lastLine = numberedLine(lines.length + 1, lastLine);
	  }
	  lines.push(lastLine);

	  return lines.join('\n');
	}

	function numberedLine(n, line) {
	  // GNU cat use six pad start number + tab. See http://lingrok.org/xref/coreutils/src/cat.c#57
	  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
	  var number = ('     ' + n).slice(-6) + '\t';
	  return number + line;
	}
	return cat;
}

var cd;
var hasRequiredCd;

function requireCd () {
	if (hasRequiredCd) return cd;
	hasRequiredCd = 1;
	var os = require$$0;
	var common = requireCommon();

	common.register('cd', _cd, {});

	//@
	//@ ### cd([dir])
	//@
	//@ Changes to directory `dir` for the duration of the script. Changes to home
	//@ directory if no argument is supplied.
	function _cd(options, dir) {
	  if (!dir) dir = os.homedir();

	  if (dir === '-') {
	    if (!process.env.OLDPWD) {
	      common.error('could not find previous directory');
	    } else {
	      dir = process.env.OLDPWD;
	    }
	  }

	  try {
	    var curDir = process.cwd();
	    process.chdir(dir);
	    process.env.OLDPWD = curDir;
	  } catch (e) {
	    // something went wrong, let's figure out the error
	    var err;
	    try {
	      common.statFollowLinks(dir); // if this succeeds, it must be some sort of file
	      err = 'not a directory: ' + dir;
	    } catch (e2) {
	      err = 'no such file or directory: ' + dir;
	    }
	    if (err) common.error(err);
	  }
	  return '';
	}
	cd = _cd;
	return cd;
}

var chmod;
var hasRequiredChmod;

function requireChmod () {
	if (hasRequiredChmod) return chmod;
	hasRequiredChmod = 1;
	var common = requireCommon();
	var fs = require$$1;
	var path = require$$2;

	var PERMS = (function (base) {
	  return {
	    OTHER_EXEC: base.EXEC,
	    OTHER_WRITE: base.WRITE,
	    OTHER_READ: base.READ,

	    GROUP_EXEC: base.EXEC << 3,
	    GROUP_WRITE: base.WRITE << 3,
	    GROUP_READ: base.READ << 3,

	    OWNER_EXEC: base.EXEC << 6,
	    OWNER_WRITE: base.WRITE << 6,
	    OWNER_READ: base.READ << 6,

	    // Literal octal numbers are apparently not allowed in "strict" javascript.
	    STICKY: parseInt('01000', 8),
	    SETGID: parseInt('02000', 8),
	    SETUID: parseInt('04000', 8),

	    TYPE_MASK: parseInt('0770000', 8),
	  };
	}({
	  EXEC: 1,
	  WRITE: 2,
	  READ: 4,
	}));

	common.register('chmod', _chmod, {
	});

	//@
	//@ ### chmod([options,] octal_mode || octal_string, file)
	//@ ### chmod([options,] symbolic_mode, file)
	//@
	//@ Available options:
	//@
	//@ + `-v`: output a diagnostic for every file processed//@
	//@ + `-c`: like verbose, but report only when a change is made//@
	//@ + `-R`: change files and directories recursively//@
	//@
	//@ Examples:
	//@
	//@ ```javascript
	//@ chmod(755, '/Users/brandon');
	//@ chmod('755', '/Users/brandon'); // same as above
	//@ chmod('u+x', '/Users/brandon');
	//@ chmod('-R', 'a-w', '/Users/brandon');
	//@ ```
	//@
	//@ Alters the permissions of a file or directory by either specifying the
	//@ absolute permissions in octal form or expressing the changes in symbols.
	//@ This command tries to mimic the POSIX behavior as much as possible.
	//@ Notable exceptions:
	//@
	//@ + In symbolic modes, `a-r` and `-r` are identical.  No consideration is
	//@   given to the `umask`.
	//@ + There is no "quiet" option, since default behavior is to run silent.
	function _chmod(options, mode, filePattern) {
	  if (!filePattern) {
	    if (options.length > 0 && options.charAt(0) === '-') {
	      // Special case where the specified file permissions started with - to subtract perms, which
	      // get picked up by the option parser as command flags.
	      // If we are down by one argument and options starts with -, shift everything over.
	      [].unshift.call(arguments, '');
	    } else {
	      common.error('You must specify a file.');
	    }
	  }

	  options = common.parseOptions(options, {
	    'R': 'recursive',
	    'c': 'changes',
	    'v': 'verbose',
	  });

	  filePattern = [].slice.call(arguments, 2);

	  var files;

	  // TODO: replace this with a call to common.expand()
	  if (options.recursive) {
	    files = [];
	    filePattern.forEach(function addFile(expandedFile) {
	      var stat = common.statNoFollowLinks(expandedFile);

	      if (!stat.isSymbolicLink()) {
	        files.push(expandedFile);

	        if (stat.isDirectory()) {  // intentionally does not follow symlinks.
	          fs.readdirSync(expandedFile).forEach(function (child) {
	            addFile(expandedFile + '/' + child);
	          });
	        }
	      }
	    });
	  } else {
	    files = filePattern;
	  }

	  files.forEach(function innerChmod(file) {
	    file = path.resolve(file);
	    if (!fs.existsSync(file)) {
	      common.error('File not found: ' + file);
	    }

	    // When recursing, don't follow symlinks.
	    if (options.recursive && common.statNoFollowLinks(file).isSymbolicLink()) {
	      return;
	    }

	    var stat = common.statFollowLinks(file);
	    var isDir = stat.isDirectory();
	    var perms = stat.mode;
	    var type = perms & PERMS.TYPE_MASK;

	    var newPerms = perms;

	    if (isNaN(parseInt(mode, 8))) {
	      // parse options
	      mode.split(',').forEach(function (symbolicMode) {
	        var pattern = /([ugoa]*)([=\+-])([rwxXst]*)/i;
	        var matches = pattern.exec(symbolicMode);

	        if (matches) {
	          var applyTo = matches[1];
	          var operator = matches[2];
	          var change = matches[3];

	          var changeOwner = applyTo.indexOf('u') !== -1 || applyTo === 'a' || applyTo === '';
	          var changeGroup = applyTo.indexOf('g') !== -1 || applyTo === 'a' || applyTo === '';
	          var changeOther = applyTo.indexOf('o') !== -1 || applyTo === 'a' || applyTo === '';

	          var changeRead = change.indexOf('r') !== -1;
	          var changeWrite = change.indexOf('w') !== -1;
	          var changeExec = change.indexOf('x') !== -1;
	          var changeExecDir = change.indexOf('X') !== -1;
	          var changeSticky = change.indexOf('t') !== -1;
	          var changeSetuid = change.indexOf('s') !== -1;

	          if (changeExecDir && isDir) {
	            changeExec = true;
	          }

	          var mask = 0;
	          if (changeOwner) {
	            mask |= (changeRead ? PERMS.OWNER_READ : 0) + (changeWrite ? PERMS.OWNER_WRITE : 0) + (changeExec ? PERMS.OWNER_EXEC : 0) + (changeSetuid ? PERMS.SETUID : 0);
	          }
	          if (changeGroup) {
	            mask |= (changeRead ? PERMS.GROUP_READ : 0) + (changeWrite ? PERMS.GROUP_WRITE : 0) + (changeExec ? PERMS.GROUP_EXEC : 0) + (changeSetuid ? PERMS.SETGID : 0);
	          }
	          if (changeOther) {
	            mask |= (changeRead ? PERMS.OTHER_READ : 0) + (changeWrite ? PERMS.OTHER_WRITE : 0) + (changeExec ? PERMS.OTHER_EXEC : 0);
	          }

	          // Sticky bit is special - it's not tied to user, group or other.
	          if (changeSticky) {
	            mask |= PERMS.STICKY;
	          }

	          switch (operator) {
	            case '+':
	              newPerms |= mask;
	              break;

	            case '-':
	              newPerms &= ~mask;
	              break;

	            case '=':
	              newPerms = type + mask;

	              // According to POSIX, when using = to explicitly set the
	              // permissions, setuid and setgid can never be cleared.
	              if (common.statFollowLinks(file).isDirectory()) {
	                newPerms |= (PERMS.SETUID + PERMS.SETGID) & perms;
	              }
	              break;
	            default:
	              common.error('Could not recognize operator: `' + operator + '`');
	          }

	          if (options.verbose) {
	            console.log(file + ' -> ' + newPerms.toString(8));
	          }

	          if (perms !== newPerms) {
	            if (!options.verbose && options.changes) {
	              console.log(file + ' -> ' + newPerms.toString(8));
	            }
	            fs.chmodSync(file, newPerms);
	            perms = newPerms; // for the next round of changes!
	          }
	        } else {
	          common.error('Invalid symbolic mode change: ' + symbolicMode);
	        }
	      });
	    } else {
	      // they gave us a full number
	      newPerms = type + parseInt(mode, 8);

	      // POSIX rules are that setuid and setgid can only be added using numeric
	      // form, but not cleared.
	      if (common.statFollowLinks(file).isDirectory()) {
	        newPerms |= (PERMS.SETUID + PERMS.SETGID) & perms;
	      }

	      fs.chmodSync(file, newPerms);
	    }
	  });
	  return '';
	}
	chmod = _chmod;
	return chmod;
}

var cp;
var hasRequiredCp;

function requireCp () {
	if (hasRequiredCp) return cp;
	hasRequiredCp = 1;
	var fs = require$$1;
	var path = require$$2;
	var common = requireCommon();

	common.register('cp', _cp, {
	  cmdOptions: {
	    'f': '!no_force',
	    'n': 'no_force',
	    'u': 'update',
	    'R': 'recursive',
	    'r': 'recursive',
	    'L': 'followsymlink',
	    'P': 'noFollowsymlink',
	  },
	  wrapOutput: false,
	});

	// Buffered file copy, synchronous
	// (Using readFileSync() + writeFileSync() could easily cause a memory overflow
	//  with large files)
	function copyFileSync(srcFile, destFile, options) {
	  if (!fs.existsSync(srcFile)) {
	    common.error('copyFileSync: no such file or directory: ' + srcFile);
	  }

	  var isWindows = process.platform === 'win32';

	  // Check the mtimes of the files if the '-u' flag is provided
	  try {
	    if (options.update && common.statFollowLinks(srcFile).mtime < fs.statSync(destFile).mtime) {
	      return;
	    }
	  } catch (e) {
	    // If we're here, destFile probably doesn't exist, so just do a normal copy
	  }

	  if (common.statNoFollowLinks(srcFile).isSymbolicLink() && !options.followsymlink) {
	    try {
	      common.statNoFollowLinks(destFile);
	      common.unlinkSync(destFile); // re-link it
	    } catch (e) {
	      // it doesn't exist, so no work needs to be done
	    }

	    var symlinkFull = fs.readlinkSync(srcFile);
	    fs.symlinkSync(symlinkFull, destFile, isWindows ? 'junction' : null);
	  } else {
	    var buf = common.buffer();
	    var bufLength = buf.length;
	    var bytesRead = bufLength;
	    var pos = 0;
	    var fdr = null;
	    var fdw = null;

	    try {
	      fdr = fs.openSync(srcFile, 'r');
	    } catch (e) {
	      /* istanbul ignore next */
	      common.error('copyFileSync: could not read src file (' + srcFile + ')');
	    }

	    try {
	      fdw = fs.openSync(destFile, 'w');
	    } catch (e) {
	      /* istanbul ignore next */
	      common.error('copyFileSync: could not write to dest file (code=' + e.code + '):' + destFile);
	    }

	    while (bytesRead === bufLength) {
	      bytesRead = fs.readSync(fdr, buf, 0, bufLength, pos);
	      fs.writeSync(fdw, buf, 0, bytesRead);
	      pos += bytesRead;
	    }

	    fs.closeSync(fdr);
	    fs.closeSync(fdw);

	    fs.chmodSync(destFile, common.statFollowLinks(srcFile).mode);
	  }
	}

	// Recursively copies 'sourceDir' into 'destDir'
	// Adapted from https://github.com/ryanmcgrath/wrench-js
	//
	// Copyright (c) 2010 Ryan McGrath
	// Copyright (c) 2012 Artur Adib
	//
	// Licensed under the MIT License
	// http://www.opensource.org/licenses/mit-license.php
	function cpdirSyncRecursive(sourceDir, destDir, currentDepth, opts) {
	  if (!opts) opts = {};

	  // Ensure there is not a run away recursive copy
	  if (currentDepth >= common.config.maxdepth) return;
	  currentDepth++;

	  var isWindows = process.platform === 'win32';

	  // Create the directory where all our junk is moving to; read the mode of the
	  // source directory and mirror it
	  try {
	    fs.mkdirSync(destDir);
	  } catch (e) {
	    // if the directory already exists, that's okay
	    if (e.code !== 'EEXIST') throw e;
	  }

	  var files = fs.readdirSync(sourceDir);

	  for (var i = 0; i < files.length; i++) {
	    var srcFile = sourceDir + '/' + files[i];
	    var destFile = destDir + '/' + files[i];
	    var srcFileStat = common.statNoFollowLinks(srcFile);

	    var symlinkFull;
	    if (opts.followsymlink) {
	      if (cpcheckcycle(sourceDir, srcFile)) {
	        // Cycle link found.
	        console.error('Cycle link found.');
	        symlinkFull = fs.readlinkSync(srcFile);
	        fs.symlinkSync(symlinkFull, destFile, isWindows ? 'junction' : null);
	        continue;
	      }
	    }
	    if (srcFileStat.isDirectory()) {
	      /* recursion this thing right on back. */
	      cpdirSyncRecursive(srcFile, destFile, currentDepth, opts);
	    } else if (srcFileStat.isSymbolicLink() && !opts.followsymlink) {
	      symlinkFull = fs.readlinkSync(srcFile);
	      try {
	        common.statNoFollowLinks(destFile);
	        common.unlinkSync(destFile); // re-link it
	      } catch (e) {
	        // it doesn't exist, so no work needs to be done
	      }
	      fs.symlinkSync(symlinkFull, destFile, isWindows ? 'junction' : null);
	    } else if (srcFileStat.isSymbolicLink() && opts.followsymlink) {
	      srcFileStat = common.statFollowLinks(srcFile);
	      if (srcFileStat.isDirectory()) {
	        cpdirSyncRecursive(srcFile, destFile, currentDepth, opts);
	      } else {
	        copyFileSync(srcFile, destFile, opts);
	      }
	    } else {
	      /* At this point, we've hit a file actually worth copying... so copy it on over. */
	      if (fs.existsSync(destFile) && opts.no_force) {
	        common.log('skipping existing file: ' + files[i]);
	      } else {
	        copyFileSync(srcFile, destFile, opts);
	      }
	    }
	  } // for files

	  // finally change the mode for the newly created directory (otherwise, we
	  // couldn't add files to a read-only directory).
	  var checkDir = common.statFollowLinks(sourceDir);
	  fs.chmodSync(destDir, checkDir.mode);
	} // cpdirSyncRecursive

	// Checks if cureent file was created recently
	function checkRecentCreated(sources, index) {
	  var lookedSource = sources[index];
	  return sources.slice(0, index).some(function (src) {
	    return path.basename(src) === path.basename(lookedSource);
	  });
	}

	function cpcheckcycle(sourceDir, srcFile) {
	  var srcFileStat = common.statNoFollowLinks(srcFile);
	  if (srcFileStat.isSymbolicLink()) {
	    // Do cycle check. For example:
	    //   $ mkdir -p 1/2/3/4
	    //   $ cd  1/2/3/4
	    //   $ ln -s ../../3 link
	    //   $ cd ../../../..
	    //   $ cp -RL 1 copy
	    var cyclecheck = common.statFollowLinks(srcFile);
	    if (cyclecheck.isDirectory()) {
	      var sourcerealpath = fs.realpathSync(sourceDir);
	      var symlinkrealpath = fs.realpathSync(srcFile);
	      var re = new RegExp(symlinkrealpath);
	      if (re.test(sourcerealpath)) {
	        return true;
	      }
	    }
	  }
	  return false;
	}

	//@
	//@ ### cp([options,] source [, source ...], dest)
	//@ ### cp([options,] source_array, dest)
	//@
	//@ Available options:
	//@
	//@ + `-f`: force (default behavior)
	//@ + `-n`: no-clobber
	//@ + `-u`: only copy if `source` is newer than `dest`
	//@ + `-r`, `-R`: recursive
	//@ + `-L`: follow symlinks
	//@ + `-P`: don't follow symlinks
	//@
	//@ Examples:
	//@
	//@ ```javascript
	//@ cp('file1', 'dir1');
	//@ cp('-R', 'path/to/dir/', '~/newCopy/');
	//@ cp('-Rf', '/tmp/*', '/usr/local/*', '/home/tmp');
	//@ cp('-Rf', ['/tmp/*', '/usr/local/*'], '/home/tmp'); // same as above
	//@ ```
	//@
	//@ Copies files.
	function _cp(options, sources, dest) {
	  // If we're missing -R, it actually implies -L (unless -P is explicit)
	  if (options.followsymlink) {
	    options.noFollowsymlink = false;
	  }
	  if (!options.recursive && !options.noFollowsymlink) {
	    options.followsymlink = true;
	  }

	  // Get sources, dest
	  if (arguments.length < 3) {
	    common.error('missing <source> and/or <dest>');
	  } else {
	    sources = [].slice.call(arguments, 1, arguments.length - 1);
	    dest = arguments[arguments.length - 1];
	  }

	  var destExists = fs.existsSync(dest);
	  var destStat = destExists && common.statFollowLinks(dest);

	  // Dest is not existing dir, but multiple sources given
	  if ((!destExists || !destStat.isDirectory()) && sources.length > 1) {
	    common.error('dest is not a directory (too many sources)');
	  }

	  // Dest is an existing file, but -n is given
	  if (destExists && destStat.isFile() && options.no_force) {
	    return new common.ShellString('', '', 0);
	  }

	  sources.forEach(function (src, srcIndex) {
	    if (!fs.existsSync(src)) {
	      if (src === '') src = "''"; // if src was empty string, display empty string
	      common.error('no such file or directory: ' + src, { continue: true });
	      return; // skip file
	    }
	    var srcStat = common.statFollowLinks(src);
	    if (!options.noFollowsymlink && srcStat.isDirectory()) {
	      if (!options.recursive) {
	        // Non-Recursive
	        common.error("omitting directory '" + src + "'", { continue: true });
	      } else {
	        // Recursive
	        // 'cp /a/source dest' should create 'source' in 'dest'
	        var newDest = (destStat && destStat.isDirectory()) ?
	            path.join(dest, path.basename(src)) :
	            dest;

	        try {
	          common.statFollowLinks(path.dirname(dest));
	          cpdirSyncRecursive(src, newDest, 0, { no_force: options.no_force, followsymlink: options.followsymlink });
	        } catch (e) {
	          /* istanbul ignore next */
	          common.error("cannot create directory '" + dest + "': No such file or directory");
	        }
	      }
	    } else {
	      // If here, src is a file

	      // When copying to '/path/dir':
	      //    thisDest = '/path/dir/file1'
	      var thisDest = dest;
	      if (destStat && destStat.isDirectory()) {
	        thisDest = path.normalize(dest + '/' + path.basename(src));
	      }

	      var thisDestExists = fs.existsSync(thisDest);
	      if (thisDestExists && checkRecentCreated(sources, srcIndex)) {
	        // cannot overwrite file created recently in current execution, but we want to continue copying other files
	        if (!options.no_force) {
	          common.error("will not overwrite just-created '" + thisDest + "' with '" + src + "'", { continue: true });
	        }
	        return;
	      }

	      if (thisDestExists && options.no_force) {
	        return; // skip file
	      }

	      if (path.relative(src, thisDest) === '') {
	        // a file cannot be copied to itself, but we want to continue copying other files
	        common.error("'" + thisDest + "' and '" + src + "' are the same file", { continue: true });
	        return;
	      }

	      copyFileSync(src, thisDest, options);
	    }
	  }); // forEach(src)

	  return new common.ShellString('', common.state.error, common.state.errorCode);
	}
	cp = _cp;
	return cp;
}

var dirs = {};

var hasRequiredDirs;

function requireDirs () {
	if (hasRequiredDirs) return dirs;
	hasRequiredDirs = 1;
	var common = requireCommon();
	var _cd = requireCd();
	var path = require$$2;

	common.register('dirs', _dirs, {
	  wrapOutput: false,
	});
	common.register('pushd', _pushd, {
	  wrapOutput: false,
	});
	common.register('popd', _popd, {
	  wrapOutput: false,
	});

	// Pushd/popd/dirs internals
	var _dirStack = [];

	function _isStackIndex(index) {
	  return (/^[\-+]\d+$/).test(index);
	}

	function _parseStackIndex(index) {
	  if (_isStackIndex(index)) {
	    if (Math.abs(index) < _dirStack.length + 1) { // +1 for pwd
	      return (/^-/).test(index) ? Number(index) - 1 : Number(index);
	    }
	    common.error(index + ': directory stack index out of range');
	  } else {
	    common.error(index + ': invalid number');
	  }
	}

	function _actualDirStack() {
	  return [process.cwd()].concat(_dirStack);
	}

	//@
	//@ ### pushd([options,] [dir | '-N' | '+N'])
	//@
	//@ Available options:
	//@
	//@ + `-n`: Suppresses the normal change of directory when adding directories to the stack, so that only the stack is manipulated.
	//@ + `-q`: Supresses output to the console.
	//@
	//@ Arguments:
	//@
	//@ + `dir`: Sets the current working directory to the top of the stack, then executes the equivalent of `cd dir`.
	//@ + `+N`: Brings the Nth directory (counting from the left of the list printed by dirs, starting with zero) to the top of the list by rotating the stack.
	//@ + `-N`: Brings the Nth directory (counting from the right of the list printed by dirs, starting with zero) to the top of the list by rotating the stack.
	//@
	//@ Examples:
	//@
	//@ ```javascript
	//@ // process.cwd() === '/usr'
	//@ pushd('/etc'); // Returns /etc /usr
	//@ pushd('+1');   // Returns /usr /etc
	//@ ```
	//@
	//@ Save the current directory on the top of the directory stack and then `cd` to `dir`. With no arguments, `pushd` exchanges the top two directories. Returns an array of paths in the stack.
	function _pushd(options, dir) {
	  if (_isStackIndex(options)) {
	    dir = options;
	    options = '';
	  }

	  options = common.parseOptions(options, {
	    'n': 'no-cd',
	    'q': 'quiet',
	  });

	  var dirs = _actualDirStack();

	  if (dir === '+0') {
	    return dirs; // +0 is a noop
	  } else if (!dir) {
	    if (dirs.length > 1) {
	      dirs = dirs.splice(1, 1).concat(dirs);
	    } else {
	      return common.error('no other directory');
	    }
	  } else if (_isStackIndex(dir)) {
	    var n = _parseStackIndex(dir);
	    dirs = dirs.slice(n).concat(dirs.slice(0, n));
	  } else {
	    if (options['no-cd']) {
	      dirs.splice(1, 0, dir);
	    } else {
	      dirs.unshift(dir);
	    }
	  }

	  if (options['no-cd']) {
	    dirs = dirs.slice(1);
	  } else {
	    dir = path.resolve(dirs.shift());
	    _cd('', dir);
	  }

	  _dirStack = dirs;
	  return _dirs(options.quiet ? '-q' : '');
	}
	dirs.pushd = _pushd;

	//@
	//@
	//@ ### popd([options,] ['-N' | '+N'])
	//@
	//@ Available options:
	//@
	//@ + `-n`: Suppress the normal directory change when removing directories from the stack, so that only the stack is manipulated.
	//@ + `-q`: Supresses output to the console.
	//@
	//@ Arguments:
	//@
	//@ + `+N`: Removes the Nth directory (counting from the left of the list printed by dirs), starting with zero.
	//@ + `-N`: Removes the Nth directory (counting from the right of the list printed by dirs), starting with zero.
	//@
	//@ Examples:
	//@
	//@ ```javascript
	//@ echo(process.cwd()); // '/usr'
	//@ pushd('/etc');       // '/etc /usr'
	//@ echo(process.cwd()); // '/etc'
	//@ popd();              // '/usr'
	//@ echo(process.cwd()); // '/usr'
	//@ ```
	//@
	//@ When no arguments are given, `popd` removes the top directory from the stack and performs a `cd` to the new top directory. The elements are numbered from 0, starting at the first directory listed with dirs (i.e., `popd` is equivalent to `popd +0`). Returns an array of paths in the stack.
	function _popd(options, index) {
	  if (_isStackIndex(options)) {
	    index = options;
	    options = '';
	  }

	  options = common.parseOptions(options, {
	    'n': 'no-cd',
	    'q': 'quiet',
	  });

	  if (!_dirStack.length) {
	    return common.error('directory stack empty');
	  }

	  index = _parseStackIndex(index || '+0');

	  if (options['no-cd'] || index > 0 || _dirStack.length + index === 0) {
	    index = index > 0 ? index - 1 : index;
	    _dirStack.splice(index, 1);
	  } else {
	    var dir = path.resolve(_dirStack.shift());
	    _cd('', dir);
	  }

	  return _dirs(options.quiet ? '-q' : '');
	}
	dirs.popd = _popd;

	//@
	//@
	//@ ### dirs([options | '+N' | '-N'])
	//@
	//@ Available options:
	//@
	//@ + `-c`: Clears the directory stack by deleting all of the elements.
	//@ + `-q`: Supresses output to the console.
	//@
	//@ Arguments:
	//@
	//@ + `+N`: Displays the Nth directory (counting from the left of the list printed by dirs when invoked without options), starting with zero.
	//@ + `-N`: Displays the Nth directory (counting from the right of the list printed by dirs when invoked without options), starting with zero.
	//@
	//@ Display the list of currently remembered directories. Returns an array of paths in the stack, or a single path if `+N` or `-N` was specified.
	//@
	//@ See also: `pushd`, `popd`
	function _dirs(options, index) {
	  if (_isStackIndex(options)) {
	    index = options;
	    options = '';
	  }

	  options = common.parseOptions(options, {
	    'c': 'clear',
	    'q': 'quiet',
	  });

	  if (options.clear) {
	    _dirStack = [];
	    return _dirStack;
	  }

	  var stack = _actualDirStack();

	  if (index) {
	    index = _parseStackIndex(index);

	    if (index < 0) {
	      index = stack.length + index;
	    }

	    if (!options.quiet) {
	      common.log(stack[index]);
	    }
	    return stack[index];
	  }

	  if (!options.quiet) {
	    common.log(stack.join(' '));
	  }

	  return stack;
	}
	dirs.dirs = _dirs;
	return dirs;
}

var echo;
var hasRequiredEcho;

function requireEcho () {
	if (hasRequiredEcho) return echo;
	hasRequiredEcho = 1;
	var format = require$$4$1.format;

	var common = requireCommon();

	common.register('echo', _echo, {
	  allowGlobbing: false,
	});

	//@
	//@ ### echo([options,] string [, string ...])
	//@
	//@ Available options:
	//@
	//@ + `-e`: interpret backslash escapes (default)
	//@ + `-n`: remove trailing newline from output
	//@
	//@ Examples:
	//@
	//@ ```javascript
	//@ echo('hello world');
	//@ var str = echo('hello world');
	//@ echo('-n', 'no newline at end');
	//@ ```
	//@
	//@ Prints `string` to stdout, and returns string with additional utility methods
	//@ like `.to()`.
	function _echo(opts) {
	  // allow strings starting with '-', see issue #20
	  var messages = [].slice.call(arguments, opts ? 0 : 1);
	  var options = {};

	  // If the first argument starts with '-', parse it as options string.
	  // If parseOptions throws, it wasn't an options string.
	  try {
	    options = common.parseOptions(messages[0], {
	      'e': 'escapes',
	      'n': 'no_newline',
	    }, {
	      silent: true,
	    });

	    // Allow null to be echoed
	    if (messages[0]) {
	      messages.shift();
	    }
	  } catch (_) {
	    // Clear out error if an error occurred
	    common.state.error = null;
	  }

	  var output = format.apply(null, messages);

	  // Add newline if -n is not passed.
	  if (!options.no_newline) {
	    output += '\n';
	  }

	  process.stdout.write(output);

	  return output;
	}

	echo = _echo;
	return echo;
}

var error_1;
var hasRequiredError;

function requireError () {
	if (hasRequiredError) return error_1;
	hasRequiredError = 1;
	var common = requireCommon();

	//@
	//@ ### error()
	//@
	//@ Tests if error occurred in the last command. Returns a truthy value if an
	//@ error returned, or a falsy value otherwise.
	//@
	//@ **Note**: do not rely on the
	//@ return value to be an error message. If you need the last error message, use
	//@ the `.stderr` attribute from the last command's return value instead.
	function error() {
	  return common.state.error;
	}
	error_1 = error;
	return error_1;
}

var execChild = {exports: {}};

var hasRequiredExecChild;

function requireExecChild () {
	if (hasRequiredExecChild) return execChild.exports;
	hasRequiredExecChild = 1;
	(function (module) {
		if (require.main !== module) {
		  throw new Error('This file should not be required');
		}

		var childProcess = require$$0$1;
		var fs = require$$1;

		var paramFilePath = process.argv[2];

		var serializedParams = fs.readFileSync(paramFilePath, 'utf8');
		var params = JSON.parse(serializedParams);

		var cmd = params.command;
		var execOptions = params.execOptions;
		var pipe = params.pipe;
		var stdoutFile = params.stdoutFile;
		var stderrFile = params.stderrFile;

		var c = childProcess.exec(cmd, execOptions, function (err) {
		  if (!err) {
		    process.exitCode = 0;
		  } else if (err.code === undefined) {
		    process.exitCode = 1;
		  } else {
		    process.exitCode = err.code;
		  }
		});

		var stdoutStream = fs.createWriteStream(stdoutFile);
		var stderrStream = fs.createWriteStream(stderrFile);

		c.stdout.pipe(stdoutStream);
		c.stderr.pipe(stderrStream);
		c.stdout.pipe(process.stdout);
		c.stderr.pipe(process.stderr);

		if (pipe) {
		  c.stdin.end(pipe);
		}
} (execChild));
	return execChild.exports;
}

var tempdir = {};

var hasRequiredTempdir;

function requireTempdir () {
	if (hasRequiredTempdir) return tempdir;
	hasRequiredTempdir = 1;
	var common = requireCommon();
	var os = require$$0;
	var fs = require$$1;

	common.register('tempdir', _tempDir, {
	  allowGlobbing: false,
	  wrapOutput: false,
	});

	// Returns false if 'dir' is not a writeable directory, 'dir' otherwise
	function writeableDir(dir) {
	  if (!dir || !fs.existsSync(dir)) return false;

	  if (!common.statFollowLinks(dir).isDirectory()) return false;

	  var testFile = dir + '/' + common.randomFileName();
	  try {
	    fs.writeFileSync(testFile, ' ');
	    common.unlinkSync(testFile);
	    return dir;
	  } catch (e) {
	    /* istanbul ignore next */
	    return false;
	  }
	}

	// Variable to cache the tempdir value for successive lookups.
	var cachedTempDir;

	//@
	//@ ### tempdir()
	//@
	//@ Examples:
	//@
	//@ ```javascript
	//@ var tmp = tempdir(); // "/tmp" for most *nix platforms
	//@ ```
	//@
	//@ Searches and returns string containing a writeable, platform-dependent temporary directory.
	//@ Follows Python's [tempfile algorithm](http://docs.python.org/library/tempfile.html#tempfile.tempdir).
	function _tempDir() {
	  if (cachedTempDir) return cachedTempDir;

	  cachedTempDir = writeableDir(os.tmpdir()) ||
	                  writeableDir(process.env.TMPDIR) ||
	                  writeableDir(process.env.TEMP) ||
	                  writeableDir(process.env.TMP) ||
	                  writeableDir(process.env.Wimp$ScrapDir) || // RiscOS
	                  writeableDir('C:\\TEMP') || // Windows
	                  writeableDir('C:\\TMP') || // Windows
	                  writeableDir('\\TEMP') || // Windows
	                  writeableDir('\\TMP') || // Windows
	                  writeableDir('/tmp') ||
	                  writeableDir('/var/tmp') ||
	                  writeableDir('/usr/tmp') ||
	                  writeableDir('.'); // last resort

	  return cachedTempDir;
	}

	// Indicates if the tempdir value is currently cached. This is exposed for tests
	// only. The return value should only be tested for truthiness.
	function isCached() {
	  return cachedTempDir;
	}

	// Clears the cached tempDir value, if one is cached. This is exposed for tests
	// only.
	function clearCache() {
	  cachedTempDir = undefined;
	}

	tempdir.tempDir = _tempDir;
	tempdir.isCached = isCached;
	tempdir.clearCache = clearCache;
	return tempdir;
}

var pwd;
var hasRequiredPwd;

function requirePwd () {
	if (hasRequiredPwd) return pwd;
	hasRequiredPwd = 1;
	var path = require$$2;
	var common = requireCommon();

	common.register('pwd', _pwd, {
	  allowGlobbing: false,
	});

	//@
	//@ ### pwd()
	//@
	//@ Returns the current directory.
	function _pwd() {
	  var pwd = path.resolve(process.cwd());
	  return pwd;
	}
	pwd = _pwd;
	return pwd;
}

var exec$1;
var hasRequiredExec;

function requireExec () {
	if (hasRequiredExec) return exec$1;
	hasRequiredExec = 1;
	var common = requireCommon();
	var _tempDir = requireTempdir().tempDir;
	var _pwd = requirePwd();
	var path = require$$2;
	var fs = require$$1;
	var child = require$$0$1;

	var DEFAULT_MAXBUFFER_SIZE = 20 * 1024 * 1024;
	var DEFAULT_ERROR_CODE = 1;

	common.register('exec', _exec, {
	  unix: false,
	  canReceivePipe: true,
	  wrapOutput: false,
	});

	// We use this function to run `exec` synchronously while also providing realtime
	// output.
	function execSync(cmd, opts, pipe) {
	  if (!common.config.execPath) {
	    common.error('Unable to find a path to the node binary. Please manually set config.execPath');
	  }

	  var tempDir = _tempDir();
	  var paramsFile = path.resolve(tempDir + '/' + common.randomFileName());
	  var stderrFile = path.resolve(tempDir + '/' + common.randomFileName());
	  var stdoutFile = path.resolve(tempDir + '/' + common.randomFileName());

	  opts = common.extend({
	    silent: common.config.silent,
	    cwd: _pwd().toString(),
	    env: process.env,
	    maxBuffer: DEFAULT_MAXBUFFER_SIZE,
	    encoding: 'utf8',
	  }, opts);

	  if (fs.existsSync(paramsFile)) common.unlinkSync(paramsFile);
	  if (fs.existsSync(stderrFile)) common.unlinkSync(stderrFile);
	  if (fs.existsSync(stdoutFile)) common.unlinkSync(stdoutFile);

	  opts.cwd = path.resolve(opts.cwd);

	  var paramsToSerialize = {
	    command: cmd,
	    execOptions: opts,
	    pipe: pipe,
	    stdoutFile: stdoutFile,
	    stderrFile: stderrFile,
	  };

	  // Create the files and ensure these are locked down (for read and write) to
	  // the current user. The main concerns here are:
	  //
	  // * If we execute a command which prints sensitive output, then
	  //   stdoutFile/stderrFile must not be readable by other users.
	  // * paramsFile must not be readable by other users, or else they can read it
	  //   to figure out the path for stdoutFile/stderrFile and create these first
	  //   (locked down to their own access), which will crash exec() when it tries
	  //   to write to the files.
	  function writeFileLockedDown(filePath, data) {
	    fs.writeFileSync(filePath, data, {
	      encoding: 'utf8',
	      mode: parseInt('600', 8),
	    });
	  }
	  writeFileLockedDown(stdoutFile, '');
	  writeFileLockedDown(stderrFile, '');
	  writeFileLockedDown(paramsFile, JSON.stringify(paramsToSerialize));

	  var execArgs = [
	    path.join(__dirname, 'exec-child.js'),
	    paramsFile,
	  ];

	  /* istanbul ignore else */
	  if (opts.silent) {
	    opts.stdio = 'ignore';
	  } else {
	    opts.stdio = [0, 1, 2];
	  }

	  var code = 0;

	  // Welcome to the future
	  try {
	    // Bad things if we pass in a `shell` option to child_process.execFileSync,
	    // so we need to explicitly remove it here.
	    delete opts.shell;

	    child.execFileSync(common.config.execPath, execArgs, opts);
	  } catch (e) {
	    // Commands with non-zero exit code raise an exception.
	    code = e.status || DEFAULT_ERROR_CODE;
	  }

	  // fs.readFileSync uses buffer encoding by default, so call
	  // it without the encoding option if the encoding is 'buffer'.
	  // Also, if the exec timeout is too short for node to start up,
	  // the files will not be created, so these calls will throw.
	  var stdout = '';
	  var stderr = '';
	  if (opts.encoding === 'buffer') {
	    stdout = fs.readFileSync(stdoutFile);
	    stderr = fs.readFileSync(stderrFile);
	  } else {
	    stdout = fs.readFileSync(stdoutFile, opts.encoding);
	    stderr = fs.readFileSync(stderrFile, opts.encoding);
	  }

	  // No biggie if we can't erase the files now -- they're in a temp dir anyway
	  // and we locked down permissions (see the note above).
	  try { common.unlinkSync(paramsFile); } catch (e) {}
	  try { common.unlinkSync(stderrFile); } catch (e) {}
	  try { common.unlinkSync(stdoutFile); } catch (e) {}

	  if (code !== 0) {
	    // Note: `silent` should be unconditionally true to avoid double-printing
	    // the command's stderr, and to avoid printing any stderr when the user has
	    // set `shell.config.silent`.
	    common.error(stderr, code, { continue: true, silent: true });
	  }
	  var obj = common.ShellString(stdout, stderr, code);
	  return obj;
	} // execSync()

	// Wrapper around exec() to enable echoing output to console in real time
	function execAsync(cmd, opts, pipe, callback) {
	  opts = common.extend({
	    silent: common.config.silent,
	    cwd: _pwd().toString(),
	    env: process.env,
	    maxBuffer: DEFAULT_MAXBUFFER_SIZE,
	    encoding: 'utf8',
	  }, opts);

	  var c = child.exec(cmd, opts, function (err, stdout, stderr) {
	    if (callback) {
	      if (!err) {
	        callback(0, stdout, stderr);
	      } else if (err.code === undefined) {
	        // See issue #536
	        /* istanbul ignore next */
	        callback(1, stdout, stderr);
	      } else {
	        callback(err.code, stdout, stderr);
	      }
	    }
	  });

	  if (pipe) c.stdin.end(pipe);

	  if (!opts.silent) {
	    c.stdout.pipe(process.stdout);
	    c.stderr.pipe(process.stderr);
	  }

	  return c;
	}

	//@
	//@ ### exec(command [, options] [, callback])
	//@
	//@ Available options:
	//@
	//@ + `async`: Asynchronous execution. If a callback is provided, it will be set to
	//@   `true`, regardless of the passed value (default: `false`).
	//@ + `silent`: Do not echo program output to console (default: `false`).
	//@ + `encoding`: Character encoding to use. Affects the values returned to stdout and stderr, and
	//@   what is written to stdout and stderr when not in silent mode (default: `'utf8'`).
	//@ + and any option available to Node.js's
	//@   [`child_process.exec()`](https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback)
	//@
	//@ Examples:
	//@
	//@ ```javascript
	//@ var version = exec('node --version', {silent:true}).stdout;
	//@
	//@ var child = exec('some_long_running_process', {async:true});
	//@ child.stdout.on('data', function(data) {
	//@   /* ... do something with data ... */
	//@ });
	//@
	//@ exec('some_long_running_process', function(code, stdout, stderr) {
	//@   console.log('Exit code:', code);
	//@   console.log('Program output:', stdout);
	//@   console.log('Program stderr:', stderr);
	//@ });
	//@ ```
	//@
	//@ Executes the given `command` _synchronously_, unless otherwise specified.  When in synchronous
	//@ mode, this returns a `ShellString` (compatible with ShellJS v0.6.x, which returns an object
	//@ of the form `{ code:..., stdout:... , stderr:... }`). Otherwise, this returns the child process
	//@ object, and the `callback` receives the arguments `(code, stdout, stderr)`.
	//@
	//@ Not seeing the behavior you want? `exec()` runs everything through `sh`
	//@ by default (or `cmd.exe` on Windows), which differs from `bash`. If you
	//@ need bash-specific behavior, try out the `{shell: 'path/to/bash'}` option.
	function _exec(command, options, callback) {
	  options = options || {};
	  if (!command) common.error('must specify command');

	  var pipe = common.readFromPipe();

	  // Callback is defined instead of options.
	  if (typeof options === 'function') {
	    callback = options;
	    options = { async: true };
	  }

	  // Callback is defined with options.
	  if (typeof options === 'object' && typeof callback === 'function') {
	    options.async = true;
	  }

	  options = common.extend({
	    silent: common.config.silent,
	    async: false,
	  }, options);

	  if (options.async) {
	    return execAsync(command, options, pipe, callback);
	  } else {
	    return execSync(command, options, pipe);
	  }
	}
	exec$1 = _exec;
	return exec$1;
}

var ls;
var hasRequiredLs;

function requireLs () {
	if (hasRequiredLs) return ls;
	hasRequiredLs = 1;
	var path = require$$2;
	var fs = require$$1;
	var common = requireCommon();
	var glob = requireGlob();

	var globPatternRecursive = path.sep + '**';

	common.register('ls', _ls, {
	  cmdOptions: {
	    'R': 'recursive',
	    'A': 'all',
	    'L': 'link',
	    'a': 'all_deprecated',
	    'd': 'directory',
	    'l': 'long',
	  },
	});

	//@
	//@ ### ls([options,] [path, ...])
	//@ ### ls([options,] path_array)
	//@
	//@ Available options:
	//@
	//@ + `-R`: recursive
	//@ + `-A`: all files (include files beginning with `.`, except for `.` and `..`)
	//@ + `-L`: follow symlinks
	//@ + `-d`: list directories themselves, not their contents
	//@ + `-l`: list objects representing each file, each with fields containing `ls
	//@         -l` output fields. See
	//@         [`fs.Stats`](https://nodejs.org/api/fs.html#fs_class_fs_stats)
	//@         for more info
	//@
	//@ Examples:
	//@
	//@ ```javascript
	//@ ls('projs/*.js');
	//@ ls('-R', '/users/me', '/tmp');
	//@ ls('-R', ['/users/me', '/tmp']); // same as above
	//@ ls('-l', 'file.txt'); // { name: 'file.txt', mode: 33188, nlink: 1, ...}
	//@ ```
	//@
	//@ Returns array of files in the given `path`, or files in
	//@ the current directory if no `path` is  provided.
	function _ls(options, paths) {
	  if (options.all_deprecated) {
	    // We won't support the -a option as it's hard to image why it's useful
	    // (it includes '.' and '..' in addition to '.*' files)
	    // For backwards compatibility we'll dump a deprecated message and proceed as before
	    common.log('ls: Option -a is deprecated. Use -A instead');
	    options.all = true;
	  }

	  if (!paths) {
	    paths = ['.'];
	  } else {
	    paths = [].slice.call(arguments, 1);
	  }

	  var list = [];

	  function pushFile(abs, relName, stat) {
	    if (process.platform === 'win32') {
	      relName = relName.replace(/\\/g, '/');
	    }
	    if (options.long) {
	      stat = stat || (options.link ? common.statFollowLinks(abs) : common.statNoFollowLinks(abs));
	      list.push(addLsAttributes(relName, stat));
	    } else {
	      // list.push(path.relative(rel || '.', file));
	      list.push(relName);
	    }
	  }

	  paths.forEach(function (p) {
	    var stat;

	    try {
	      stat = options.link ? common.statFollowLinks(p) : common.statNoFollowLinks(p);
	      // follow links to directories by default
	      if (stat.isSymbolicLink()) {
	        /* istanbul ignore next */
	        // workaround for https://github.com/shelljs/shelljs/issues/795
	        // codecov seems to have a bug that miscalculate this block as uncovered.
	        // but according to nyc report this block does get covered.
	        try {
	          var _stat = common.statFollowLinks(p);
	          if (_stat.isDirectory()) {
	            stat = _stat;
	          }
	        } catch (_) {} // bad symlink, treat it like a file
	      }
	    } catch (e) {
	      common.error('no such file or directory: ' + p, 2, { continue: true });
	      return;
	    }

	    // If the stat succeeded
	    if (stat.isDirectory() && !options.directory) {
	      if (options.recursive) {
	        // use glob, because it's simple
	        glob.sync(p + globPatternRecursive, { dot: options.all, follow: options.link })
	          .forEach(function (item) {
	            // Glob pattern returns the directory itself and needs to be filtered out.
	            if (path.relative(p, item)) {
	              pushFile(item, path.relative(p, item));
	            }
	          });
	      } else if (options.all) {
	        // use fs.readdirSync, because it's fast
	        fs.readdirSync(p).forEach(function (item) {
	          pushFile(path.join(p, item), item);
	        });
	      } else {
	        // use fs.readdirSync and then filter out secret files
	        fs.readdirSync(p).forEach(function (item) {
	          if (item[0] !== '.') {
	            pushFile(path.join(p, item), item);
	          }
	        });
	      }
	    } else {
	      pushFile(p, p, stat);
	    }
	  });

	  // Add methods, to make this more compatible with ShellStrings
	  return list;
	}

	function addLsAttributes(pathName, stats) {
	  // Note: this object will contain more information than .toString() returns
	  stats.name = pathName;
	  stats.toString = function () {
	    // Return a string resembling unix's `ls -l` format
	    return [this.mode, this.nlink, this.uid, this.gid, this.size, this.mtime, this.name].join(' ');
	  };
	  return stats;
	}

	ls = _ls;
	return ls;
}

var find;
var hasRequiredFind;

function requireFind () {
	if (hasRequiredFind) return find;
	hasRequiredFind = 1;
	var path = require$$2;
	var common = requireCommon();
	var _ls = requireLs();

	common.register('find', _find, {});

	//@
	//@ ### find(path [, path ...])
	//@ ### find(path_array)
	//@
	//@ Examples:
	//@
	//@ ```javascript
	//@ find('src', 'lib');
	//@ find(['src', 'lib']); // same as above
	//@ find('.').filter(function(file) { return file.match(/\.js$/); });
	//@ ```
	//@
	//@ Returns array of all files (however deep) in the given paths.
	//@
	//@ The main difference from `ls('-R', path)` is that the resulting file names
	//@ include the base directories (e.g., `lib/resources/file1` instead of just `file1`).
	function _find(options, paths) {
	  if (!paths) {
	    common.error('no path specified');
	  } else if (typeof paths === 'string') {
	    paths = [].slice.call(arguments, 1);
	  }

	  var list = [];

	  function pushFile(file) {
	    if (process.platform === 'win32') {
	      file = file.replace(/\\/g, '/');
	    }
	    list.push(file);
	  }

	  // why not simply do `ls('-R', paths)`? because the output wouldn't give the base dirs
	  // to get the base dir in the output, we need instead `ls('-R', 'dir/*')` for every directory

	  paths.forEach(function (file) {
	    var stat;
	    try {
	      stat = common.statFollowLinks(file);
	    } catch (e) {
	      common.error('no such file or directory: ' + file);
	    }

	    pushFile(file);

	    if (stat.isDirectory()) {
	      _ls({ recursive: true, all: true }, file).forEach(function (subfile) {
	        pushFile(path.join(file, subfile));
	      });
	    }
	  });

	  return list;
	}
	find = _find;
	return find;
}

var grep;
var hasRequiredGrep;

function requireGrep () {
	if (hasRequiredGrep) return grep;
	hasRequiredGrep = 1;
	var common = requireCommon();
	var fs = require$$1;

	common.register('grep', _grep, {
	  globStart: 2, // don't glob-expand the regex
	  canReceivePipe: true,
	  cmdOptions: {
	    'v': 'inverse',
	    'l': 'nameOnly',
	    'i': 'ignoreCase',
	  },
	});

	//@
	//@ ### grep([options,] regex_filter, file [, file ...])
	//@ ### grep([options,] regex_filter, file_array)
	//@
	//@ Available options:
	//@
	//@ + `-v`: Invert `regex_filter` (only print non-matching lines).
	//@ + `-l`: Print only filenames of matching files.
	//@ + `-i`: Ignore case.
	//@
	//@ Examples:
	//@
	//@ ```javascript
	//@ grep('-v', 'GLOBAL_VARIABLE', '*.js');
	//@ grep('GLOBAL_VARIABLE', '*.js');
	//@ ```
	//@
	//@ Reads input string from given files and returns a string containing all lines of the
	//@ file that match the given `regex_filter`.
	function _grep(options, regex, files) {
	  // Check if this is coming from a pipe
	  var pipe = common.readFromPipe();

	  if (!files && !pipe) common.error('no paths given', 2);

	  files = [].slice.call(arguments, 2);

	  if (pipe) {
	    files.unshift('-');
	  }

	  var grep = [];
	  if (options.ignoreCase) {
	    regex = new RegExp(regex, 'i');
	  }
	  files.forEach(function (file) {
	    if (!fs.existsSync(file) && file !== '-') {
	      common.error('no such file or directory: ' + file, 2, { continue: true });
	      return;
	    }

	    var contents = file === '-' ? pipe : fs.readFileSync(file, 'utf8');
	    if (options.nameOnly) {
	      if (contents.match(regex)) {
	        grep.push(file);
	      }
	    } else {
	      var lines = contents.split('\n');
	      lines.forEach(function (line) {
	        var matched = line.match(regex);
	        if ((options.inverse && !matched) || (!options.inverse && matched)) {
	          grep.push(line);
	        }
	      });
	    }
	  });

	  return grep.join('\n') + '\n';
	}
	grep = _grep;
	return grep;
}

var head;
var hasRequiredHead;

function requireHead () {
	if (hasRequiredHead) return head;
	hasRequiredHead = 1;
	var common = requireCommon();
	var fs = require$$1;

	common.register('head', _head, {
	  canReceivePipe: true,
	  cmdOptions: {
	    'n': 'numLines',
	  },
	});

	// Reads |numLines| lines or the entire file, whichever is less.
	function readSomeLines(file, numLines) {
	  var buf = common.buffer();
	  var bufLength = buf.length;
	  var bytesRead = bufLength;
	  var pos = 0;

	  var fdr = fs.openSync(file, 'r');
	  var numLinesRead = 0;
	  var ret = '';
	  while (bytesRead === bufLength && numLinesRead < numLines) {
	    bytesRead = fs.readSync(fdr, buf, 0, bufLength, pos);
	    var bufStr = buf.toString('utf8', 0, bytesRead);
	    numLinesRead += bufStr.split('\n').length - 1;
	    ret += bufStr;
	    pos += bytesRead;
	  }

	  fs.closeSync(fdr);
	  return ret;
	}

	//@
	//@ ### head([{'-n': \<num\>},] file [, file ...])
	//@ ### head([{'-n': \<num\>},] file_array)
	//@
	//@ Available options:
	//@
	//@ + `-n <num>`: Show the first `<num>` lines of the files
	//@
	//@ Examples:
	//@
	//@ ```javascript
	//@ var str = head({'-n': 1}, 'file*.txt');
	//@ var str = head('file1', 'file2');
	//@ var str = head(['file1', 'file2']); // same as above
	//@ ```
	//@
	//@ Read the start of a file.
	function _head(options, files) {
	  var head = [];
	  var pipe = common.readFromPipe();

	  if (!files && !pipe) common.error('no paths given');

	  var idx = 1;
	  if (options.numLines === true) {
	    idx = 2;
	    options.numLines = Number(arguments[1]);
	  } else if (options.numLines === false) {
	    options.numLines = 10;
	  }
	  files = [].slice.call(arguments, idx);

	  if (pipe) {
	    files.unshift('-');
	  }

	  var shouldAppendNewline = false;
	  files.forEach(function (file) {
	    if (file !== '-') {
	      if (!fs.existsSync(file)) {
	        common.error('no such file or directory: ' + file, { continue: true });
	        return;
	      } else if (common.statFollowLinks(file).isDirectory()) {
	        common.error("error reading '" + file + "': Is a directory", {
	          continue: true,
	        });
	        return;
	      }
	    }

	    var contents;
	    if (file === '-') {
	      contents = pipe;
	    } else if (options.numLines < 0) {
	      contents = fs.readFileSync(file, 'utf8');
	    } else {
	      contents = readSomeLines(file, options.numLines);
	    }

	    var lines = contents.split('\n');
	    var hasTrailingNewline = (lines[lines.length - 1] === '');
	    if (hasTrailingNewline) {
	      lines.pop();
	    }
	    shouldAppendNewline = (hasTrailingNewline || options.numLines < lines.length);

	    head = head.concat(lines.slice(0, options.numLines));
	  });

	  if (shouldAppendNewline) {
	    head.push(''); // to add a trailing newline once we join
	  }
	  return head.join('\n');
	}
	head = _head;
	return head;
}

var ln;
var hasRequiredLn;

function requireLn () {
	if (hasRequiredLn) return ln;
	hasRequiredLn = 1;
	var fs = require$$1;
	var path = require$$2;
	var common = requireCommon();

	common.register('ln', _ln, {
	  cmdOptions: {
	    's': 'symlink',
	    'f': 'force',
	  },
	});

	//@
	//@ ### ln([options,] source, dest)
	//@
	//@ Available options:
	//@
	//@ + `-s`: symlink
	//@ + `-f`: force
	//@
	//@ Examples:
	//@
	//@ ```javascript
	//@ ln('file', 'newlink');
	//@ ln('-sf', 'file', 'existing');
	//@ ```
	//@
	//@ Links `source` to `dest`. Use `-f` to force the link, should `dest` already exist.
	function _ln(options, source, dest) {
	  if (!source || !dest) {
	    common.error('Missing <source> and/or <dest>');
	  }

	  source = String(source);
	  var sourcePath = path.normalize(source).replace(RegExp(path.sep + '$'), '');
	  var isAbsolute = (path.resolve(source) === sourcePath);
	  dest = path.resolve(process.cwd(), String(dest));

	  if (fs.existsSync(dest)) {
	    if (!options.force) {
	      common.error('Destination file exists', { continue: true });
	    }

	    fs.unlinkSync(dest);
	  }

	  if (options.symlink) {
	    var isWindows = process.platform === 'win32';
	    var linkType = isWindows ? 'file' : null;
	    var resolvedSourcePath = isAbsolute ? sourcePath : path.resolve(process.cwd(), path.dirname(dest), source);
	    if (!fs.existsSync(resolvedSourcePath)) {
	      common.error('Source file does not exist', { continue: true });
	    } else if (isWindows && common.statFollowLinks(resolvedSourcePath).isDirectory()) {
	      linkType = 'junction';
	    }

	    try {
	      fs.symlinkSync(linkType === 'junction' ? resolvedSourcePath : source, dest, linkType);
	    } catch (err) {
	      common.error(err.message);
	    }
	  } else {
	    if (!fs.existsSync(source)) {
	      common.error('Source file does not exist', { continue: true });
	    }
	    try {
	      fs.linkSync(source, dest);
	    } catch (err) {
	      common.error(err.message);
	    }
	  }
	  return '';
	}
	ln = _ln;
	return ln;
}

var mkdir;
var hasRequiredMkdir;

function requireMkdir () {
	if (hasRequiredMkdir) return mkdir;
	hasRequiredMkdir = 1;
	var common = requireCommon();
	var fs = require$$1;
	var path = require$$2;

	common.register('mkdir', _mkdir, {
	  cmdOptions: {
	    'p': 'fullpath',
	  },
	});

	// Recursively creates `dir`
	function mkdirSyncRecursive(dir) {
	  var baseDir = path.dirname(dir);

	  // Prevents some potential problems arising from malformed UNCs or
	  // insufficient permissions.
	  /* istanbul ignore next */
	  if (baseDir === dir) {
	    common.error('dirname() failed: [' + dir + ']');
	  }

	  // Base dir exists, no recursion necessary
	  if (fs.existsSync(baseDir)) {
	    fs.mkdirSync(dir, parseInt('0777', 8));
	    return;
	  }

	  // Base dir does not exist, go recursive
	  mkdirSyncRecursive(baseDir);

	  // Base dir created, can create dir
	  fs.mkdirSync(dir, parseInt('0777', 8));
	}

	//@
	//@ ### mkdir([options,] dir [, dir ...])
	//@ ### mkdir([options,] dir_array)
	//@
	//@ Available options:
	//@
	//@ + `-p`: full path (and create intermediate directories, if necessary)
	//@
	//@ Examples:
	//@
	//@ ```javascript
	//@ mkdir('-p', '/tmp/a/b/c/d', '/tmp/e/f/g');
	//@ mkdir('-p', ['/tmp/a/b/c/d', '/tmp/e/f/g']); // same as above
	//@ ```
	//@
	//@ Creates directories.
	function _mkdir(options, dirs) {
	  if (!dirs) common.error('no paths given');

	  if (typeof dirs === 'string') {
	    dirs = [].slice.call(arguments, 1);
	  }
	  // if it's array leave it as it is

	  dirs.forEach(function (dir) {
	    try {
	      var stat = common.statNoFollowLinks(dir);
	      if (!options.fullpath) {
	        common.error('path already exists: ' + dir, { continue: true });
	      } else if (stat.isFile()) {
	        common.error('cannot create directory ' + dir + ': File exists', { continue: true });
	      }
	      return; // skip dir
	    } catch (e) {
	      // do nothing
	    }

	    // Base dir does not exist, and no -p option given
	    var baseDir = path.dirname(dir);
	    if (!fs.existsSync(baseDir) && !options.fullpath) {
	      common.error('no such file or directory: ' + baseDir, { continue: true });
	      return; // skip dir
	    }

	    try {
	      if (options.fullpath) {
	        mkdirSyncRecursive(path.resolve(dir));
	      } else {
	        fs.mkdirSync(dir, parseInt('0777', 8));
	      }
	    } catch (e) {
	      var reason;
	      if (e.code === 'EACCES') {
	        reason = 'Permission denied';
	      } else if (e.code === 'ENOTDIR' || e.code === 'ENOENT') {
	        reason = 'Not a directory';
	      } else {
	        /* istanbul ignore next */
	        throw e;
	      }
	      common.error('cannot create directory ' + dir + ': ' + reason, { continue: true });
	    }
	  });
	  return '';
	} // mkdir
	mkdir = _mkdir;
	return mkdir;
}

var rm;
var hasRequiredRm;

function requireRm () {
	if (hasRequiredRm) return rm;
	hasRequiredRm = 1;
	var common = requireCommon();
	var fs = require$$1;

	common.register('rm', _rm, {
	  cmdOptions: {
	    'f': 'force',
	    'r': 'recursive',
	    'R': 'recursive',
	  },
	});

	// Recursively removes 'dir'
	// Adapted from https://github.com/ryanmcgrath/wrench-js
	//
	// Copyright (c) 2010 Ryan McGrath
	// Copyright (c) 2012 Artur Adib
	//
	// Licensed under the MIT License
	// http://www.opensource.org/licenses/mit-license.php
	function rmdirSyncRecursive(dir, force, fromSymlink) {
	  var files;

	  files = fs.readdirSync(dir);

	  // Loop through and delete everything in the sub-tree after checking it
	  for (var i = 0; i < files.length; i++) {
	    var file = dir + '/' + files[i];
	    var currFile = common.statNoFollowLinks(file);

	    if (currFile.isDirectory()) { // Recursive function back to the beginning
	      rmdirSyncRecursive(file, force);
	    } else { // Assume it's a file - perhaps a try/catch belongs here?
	      if (force || isWriteable(file)) {
	        try {
	          common.unlinkSync(file);
	        } catch (e) {
	          /* istanbul ignore next */
	          common.error('could not remove file (code ' + e.code + '): ' + file, {
	            continue: true,
	          });
	        }
	      }
	    }
	  }

	  // if was directory was referenced through a symbolic link,
	  // the contents should be removed, but not the directory itself
	  if (fromSymlink) return;

	  // Now that we know everything in the sub-tree has been deleted, we can delete the main directory.
	  // Huzzah for the shopkeep.

	  var result;
	  try {
	    // Retry on windows, sometimes it takes a little time before all the files in the directory are gone
	    var start = Date.now();

	    // TODO: replace this with a finite loop
	    for (;;) {
	      try {
	        result = fs.rmdirSync(dir);
	        if (fs.existsSync(dir)) throw { code: 'EAGAIN' };
	        break;
	      } catch (er) {
	        /* istanbul ignore next */
	        // In addition to error codes, also check if the directory still exists and loop again if true
	        if (process.platform === 'win32' && (er.code === 'ENOTEMPTY' || er.code === 'EBUSY' || er.code === 'EPERM' || er.code === 'EAGAIN')) {
	          if (Date.now() - start > 1000) throw er;
	        } else if (er.code === 'ENOENT') {
	          // Directory did not exist, deletion was successful
	          break;
	        } else {
	          throw er;
	        }
	      }
	    }
	  } catch (e) {
	    common.error('could not remove directory (code ' + e.code + '): ' + dir, { continue: true });
	  }

	  return result;
	} // rmdirSyncRecursive

	// Hack to determine if file has write permissions for current user
	// Avoids having to check user, group, etc, but it's probably slow
	function isWriteable(file) {
	  var writePermission = true;
	  try {
	    var __fd = fs.openSync(file, 'a');
	    fs.closeSync(__fd);
	  } catch (e) {
	    writePermission = false;
	  }

	  return writePermission;
	}

	function handleFile(file, options) {
	  if (options.force || isWriteable(file)) {
	    // -f was passed, or file is writable, so it can be removed
	    common.unlinkSync(file);
	  } else {
	    common.error('permission denied: ' + file, { continue: true });
	  }
	}

	function handleDirectory(file, options) {
	  if (options.recursive) {
	    // -r was passed, so directory can be removed
	    rmdirSyncRecursive(file, options.force);
	  } else {
	    common.error('path is a directory', { continue: true });
	  }
	}

	function handleSymbolicLink(file, options) {
	  var stats;
	  try {
	    stats = common.statFollowLinks(file);
	  } catch (e) {
	    // symlink is broken, so remove the symlink itself
	    common.unlinkSync(file);
	    return;
	  }

	  if (stats.isFile()) {
	    common.unlinkSync(file);
	  } else if (stats.isDirectory()) {
	    if (file[file.length - 1] === '/') {
	      // trailing separator, so remove the contents, not the link
	      if (options.recursive) {
	        // -r was passed, so directory can be removed
	        var fromSymlink = true;
	        rmdirSyncRecursive(file, options.force, fromSymlink);
	      } else {
	        common.error('path is a directory', { continue: true });
	      }
	    } else {
	      // no trailing separator, so remove the link
	      common.unlinkSync(file);
	    }
	  }
	}

	function handleFIFO(file) {
	  common.unlinkSync(file);
	}

	//@
	//@ ### rm([options,] file [, file ...])
	//@ ### rm([options,] file_array)
	//@
	//@ Available options:
	//@
	//@ + `-f`: force
	//@ + `-r, -R`: recursive
	//@
	//@ Examples:
	//@
	//@ ```javascript
	//@ rm('-rf', '/tmp/*');
	//@ rm('some_file.txt', 'another_file.txt');
	//@ rm(['some_file.txt', 'another_file.txt']); // same as above
	//@ ```
	//@
	//@ Removes files.
	function _rm(options, files) {
	  if (!files) common.error('no paths given');

	  // Convert to array
	  files = [].slice.call(arguments, 1);

	  files.forEach(function (file) {
	    var lstats;
	    try {
	      var filepath = (file[file.length - 1] === '/')
	        ? file.slice(0, -1) // remove the '/' so lstatSync can detect symlinks
	        : file;
	      lstats = common.statNoFollowLinks(filepath); // test for existence
	    } catch (e) {
	      // Path does not exist, no force flag given
	      if (!options.force) {
	        common.error('no such file or directory: ' + file, { continue: true });
	      }
	      return; // skip file
	    }

	    // If here, path exists
	    if (lstats.isFile()) {
	      handleFile(file, options);
	    } else if (lstats.isDirectory()) {
	      handleDirectory(file, options);
	    } else if (lstats.isSymbolicLink()) {
	      handleSymbolicLink(file, options);
	    } else if (lstats.isFIFO()) {
	      handleFIFO(file);
	    }
	  }); // forEach(file)
	  return '';
	} // rm
	rm = _rm;
	return rm;
}

var mv;
var hasRequiredMv;

function requireMv () {
	if (hasRequiredMv) return mv;
	hasRequiredMv = 1;
	var fs = require$$1;
	var path = require$$2;
	var common = requireCommon();
	var cp = requireCp();
	var rm = requireRm();

	common.register('mv', _mv, {
	  cmdOptions: {
	    'f': '!no_force',
	    'n': 'no_force',
	  },
	});

	// Checks if cureent file was created recently
	function checkRecentCreated(sources, index) {
	  var lookedSource = sources[index];
	  return sources.slice(0, index).some(function (src) {
	    return path.basename(src) === path.basename(lookedSource);
	  });
	}

	//@
	//@ ### mv([options ,] source [, source ...], dest')
	//@ ### mv([options ,] source_array, dest')
	//@
	//@ Available options:
	//@
	//@ + `-f`: force (default behavior)
	//@ + `-n`: no-clobber
	//@
	//@ Examples:
	//@
	//@ ```javascript
	//@ mv('-n', 'file', 'dir/');
	//@ mv('file1', 'file2', 'dir/');
	//@ mv(['file1', 'file2'], 'dir/'); // same as above
	//@ ```
	//@
	//@ Moves `source` file(s) to `dest`.
	function _mv(options, sources, dest) {
	  // Get sources, dest
	  if (arguments.length < 3) {
	    common.error('missing <source> and/or <dest>');
	  } else if (arguments.length > 3) {
	    sources = [].slice.call(arguments, 1, arguments.length - 1);
	    dest = arguments[arguments.length - 1];
	  } else if (typeof sources === 'string') {
	    sources = [sources];
	  } else {
	    // TODO(nate): figure out if we actually need this line
	    common.error('invalid arguments');
	  }

	  var exists = fs.existsSync(dest);
	  var stats = exists && common.statFollowLinks(dest);

	  // Dest is not existing dir, but multiple sources given
	  if ((!exists || !stats.isDirectory()) && sources.length > 1) {
	    common.error('dest is not a directory (too many sources)');
	  }

	  // Dest is an existing file, but no -f given
	  if (exists && stats.isFile() && options.no_force) {
	    common.error('dest file already exists: ' + dest);
	  }

	  sources.forEach(function (src, srcIndex) {
	    if (!fs.existsSync(src)) {
	      common.error('no such file or directory: ' + src, { continue: true });
	      return; // skip file
	    }

	    // If here, src exists

	    // When copying to '/path/dir':
	    //    thisDest = '/path/dir/file1'
	    var thisDest = dest;
	    if (fs.existsSync(dest) && common.statFollowLinks(dest).isDirectory()) {
	      thisDest = path.normalize(dest + '/' + path.basename(src));
	    }

	    var thisDestExists = fs.existsSync(thisDest);

	    if (thisDestExists && checkRecentCreated(sources, srcIndex)) {
	      // cannot overwrite file created recently in current execution, but we want to continue copying other files
	      if (!options.no_force) {
	        common.error("will not overwrite just-created '" + thisDest + "' with '" + src + "'", { continue: true });
	      }
	      return;
	    }

	    if (fs.existsSync(thisDest) && options.no_force) {
	      common.error('dest file already exists: ' + thisDest, { continue: true });
	      return; // skip file
	    }

	    if (path.resolve(src) === path.dirname(path.resolve(thisDest))) {
	      common.error('cannot move to self: ' + src, { continue: true });
	      return; // skip file
	    }

	    try {
	      fs.renameSync(src, thisDest);
	    } catch (e) {
	      /* istanbul ignore next */
	      if (e.code === 'EXDEV') {
	        // If we're trying to `mv` to an external partition, we'll actually need
	        // to perform a copy and then clean up the original file. If either the
	        // copy or the rm fails with an exception, we should allow this
	        // exception to pass up to the top level.
	        cp('-r', src, thisDest);
	        rm('-rf', src);
	      }
	    }
	  }); // forEach(src)
	  return '';
	} // mv
	mv = _mv;
	return mv;
}

var popd = {};

var hasRequiredPopd;

function requirePopd () {
	if (hasRequiredPopd) return popd;
	hasRequiredPopd = 1;
	// see dirs.js
	return popd;
}

var pushd = {};

var hasRequiredPushd;

function requirePushd () {
	if (hasRequiredPushd) return pushd;
	hasRequiredPushd = 1;
	// see dirs.js
	return pushd;
}

var sed;
var hasRequiredSed;

function requireSed () {
	if (hasRequiredSed) return sed;
	hasRequiredSed = 1;
	var common = requireCommon();
	var fs = require$$1;

	common.register('sed', _sed, {
	  globStart: 3, // don't glob-expand regexes
	  canReceivePipe: true,
	  cmdOptions: {
	    'i': 'inplace',
	  },
	});

	//@
	//@ ### sed([options,] search_regex, replacement, file [, file ...])
	//@ ### sed([options,] search_regex, replacement, file_array)
	//@
	//@ Available options:
	//@
	//@ + `-i`: Replace contents of `file` in-place. _Note that no backups will be created!_
	//@
	//@ Examples:
	//@
	//@ ```javascript
	//@ sed('-i', 'PROGRAM_VERSION', 'v0.1.3', 'source.js');
	//@ sed(/.*DELETE_THIS_LINE.*\n/, '', 'source.js');
	//@ ```
	//@
	//@ Reads an input string from `file`s, and performs a JavaScript `replace()` on the input
	//@ using the given `search_regex` and `replacement` string or function. Returns the new string after replacement.
	//@
	//@ Note:
	//@
	//@ Like unix `sed`, ShellJS `sed` supports capture groups. Capture groups are specified
	//@ using the `$n` syntax:
	//@
	//@ ```javascript
	//@ sed(/(\w+)\s(\w+)/, '$2, $1', 'file.txt');
	//@ ```
	function _sed(options, regex, replacement, files) {
	  // Check if this is coming from a pipe
	  var pipe = common.readFromPipe();

	  if (typeof replacement !== 'string' && typeof replacement !== 'function') {
	    if (typeof replacement === 'number') {
	      replacement = replacement.toString(); // fallback
	    } else {
	      common.error('invalid replacement string');
	    }
	  }

	  // Convert all search strings to RegExp
	  if (typeof regex === 'string') {
	    regex = RegExp(regex);
	  }

	  if (!files && !pipe) {
	    common.error('no files given');
	  }

	  files = [].slice.call(arguments, 3);

	  if (pipe) {
	    files.unshift('-');
	  }

	  var sed = [];
	  files.forEach(function (file) {
	    if (!fs.existsSync(file) && file !== '-') {
	      common.error('no such file or directory: ' + file, 2, { continue: true });
	      return;
	    }

	    var contents = file === '-' ? pipe : fs.readFileSync(file, 'utf8');
	    var lines = contents.split('\n');
	    var result = lines.map(function (line) {
	      return line.replace(regex, replacement);
	    }).join('\n');

	    sed.push(result);

	    if (options.inplace) {
	      fs.writeFileSync(file, result, 'utf8');
	    }
	  });

	  return sed.join('\n');
	}
	sed = _sed;
	return sed;
}

var set;
var hasRequiredSet;

function requireSet () {
	if (hasRequiredSet) return set;
	hasRequiredSet = 1;
	var common = requireCommon();

	common.register('set', _set, {
	  allowGlobbing: false,
	  wrapOutput: false,
	});

	//@
	//@ ### set(options)
	//@
	//@ Available options:
	//@
	//@ + `+/-e`: exit upon error (`config.fatal`)
	//@ + `+/-v`: verbose: show all commands (`config.verbose`)
	//@ + `+/-f`: disable filename expansion (globbing)
	//@
	//@ Examples:
	//@
	//@ ```javascript
	//@ set('-e'); // exit upon first error
	//@ set('+e'); // this undoes a "set('-e')"
	//@ ```
	//@
	//@ Sets global configuration variables.
	function _set(options) {
	  if (!options) {
	    var args = [].slice.call(arguments, 0);
	    if (args.length < 2) common.error('must provide an argument');
	    options = args[1];
	  }
	  var negate = (options[0] === '+');
	  if (negate) {
	    options = '-' + options.slice(1); // parseOptions needs a '-' prefix
	  }
	  options = common.parseOptions(options, {
	    'e': 'fatal',
	    'v': 'verbose',
	    'f': 'noglob',
	  });

	  if (negate) {
	    Object.keys(options).forEach(function (key) {
	      options[key] = !options[key];
	    });
	  }

	  Object.keys(options).forEach(function (key) {
	    // Only change the global config if `negate` is false and the option is true
	    // or if `negate` is true and the option is false (aka negate !== option)
	    if (negate !== options[key]) {
	      common.config[key] = options[key];
	    }
	  });
	  return;
	}
	set = _set;
	return set;
}

var sort;
var hasRequiredSort;

function requireSort () {
	if (hasRequiredSort) return sort;
	hasRequiredSort = 1;
	var common = requireCommon();
	var fs = require$$1;

	common.register('sort', _sort, {
	  canReceivePipe: true,
	  cmdOptions: {
	    'r': 'reverse',
	    'n': 'numerical',
	  },
	});

	// parse out the number prefix of a line
	function parseNumber(str) {
	  var match = str.match(/^\s*(\d*)\s*(.*)$/);
	  return { num: Number(match[1]), value: match[2] };
	}

	// compare two strings case-insensitively, but examine case for strings that are
	// case-insensitive equivalent
	function unixCmp(a, b) {
	  var aLower = a.toLowerCase();
	  var bLower = b.toLowerCase();
	  return (aLower === bLower ?
	      -1 * a.localeCompare(b) : // unix sort treats case opposite how javascript does
	      aLower.localeCompare(bLower));
	}

	// compare two strings in the fashion that unix sort's -n option works
	function numericalCmp(a, b) {
	  var objA = parseNumber(a);
	  var objB = parseNumber(b);
	  if (objA.hasOwnProperty('num') && objB.hasOwnProperty('num')) {
	    return ((objA.num !== objB.num) ?
	        (objA.num - objB.num) :
	        unixCmp(objA.value, objB.value));
	  } else {
	    return unixCmp(objA.value, objB.value);
	  }
	}

	//@
	//@ ### sort([options,] file [, file ...])
	//@ ### sort([options,] file_array)
	//@
	//@ Available options:
	//@
	//@ + `-r`: Reverse the results
	//@ + `-n`: Compare according to numerical value
	//@
	//@ Examples:
	//@
	//@ ```javascript
	//@ sort('foo.txt', 'bar.txt');
	//@ sort('-r', 'foo.txt');
	//@ ```
	//@
	//@ Return the contents of the `file`s, sorted line-by-line. Sorting multiple
	//@ files mixes their content (just as unix `sort` does).
	function _sort(options, files) {
	  // Check if this is coming from a pipe
	  var pipe = common.readFromPipe();

	  if (!files && !pipe) common.error('no files given');

	  files = [].slice.call(arguments, 1);

	  if (pipe) {
	    files.unshift('-');
	  }

	  var lines = files.reduce(function (accum, file) {
	    if (file !== '-') {
	      if (!fs.existsSync(file)) {
	        common.error('no such file or directory: ' + file, { continue: true });
	        return accum;
	      } else if (common.statFollowLinks(file).isDirectory()) {
	        common.error('read failed: ' + file + ': Is a directory', {
	          continue: true,
	        });
	        return accum;
	      }
	    }

	    var contents = file === '-' ? pipe : fs.readFileSync(file, 'utf8');
	    return accum.concat(contents.trimRight().split('\n'));
	  }, []);

	  var sorted = lines.sort(options.numerical ? numericalCmp : unixCmp);

	  if (options.reverse) {
	    sorted = sorted.reverse();
	  }

	  return sorted.join('\n') + '\n';
	}

	sort = _sort;
	return sort;
}

var tail;
var hasRequiredTail;

function requireTail () {
	if (hasRequiredTail) return tail;
	hasRequiredTail = 1;
	var common = requireCommon();
	var fs = require$$1;

	common.register('tail', _tail, {
	  canReceivePipe: true,
	  cmdOptions: {
	    'n': 'numLines',
	  },
	});

	//@
	//@ ### tail([{'-n': \<num\>},] file [, file ...])
	//@ ### tail([{'-n': \<num\>},] file_array)
	//@
	//@ Available options:
	//@
	//@ + `-n <num>`: Show the last `<num>` lines of `file`s
	//@
	//@ Examples:
	//@
	//@ ```javascript
	//@ var str = tail({'-n': 1}, 'file*.txt');
	//@ var str = tail('file1', 'file2');
	//@ var str = tail(['file1', 'file2']); // same as above
	//@ ```
	//@
	//@ Read the end of a `file`.
	function _tail(options, files) {
	  var tail = [];
	  var pipe = common.readFromPipe();

	  if (!files && !pipe) common.error('no paths given');

	  var idx = 1;
	  if (options.numLines === true) {
	    idx = 2;
	    options.numLines = Number(arguments[1]);
	  } else if (options.numLines === false) {
	    options.numLines = 10;
	  }
	  options.numLines = -1 * Math.abs(options.numLines);
	  files = [].slice.call(arguments, idx);

	  if (pipe) {
	    files.unshift('-');
	  }

	  var shouldAppendNewline = false;
	  files.forEach(function (file) {
	    if (file !== '-') {
	      if (!fs.existsSync(file)) {
	        common.error('no such file or directory: ' + file, { continue: true });
	        return;
	      } else if (common.statFollowLinks(file).isDirectory()) {
	        common.error("error reading '" + file + "': Is a directory", {
	          continue: true,
	        });
	        return;
	      }
	    }

	    var contents = file === '-' ? pipe : fs.readFileSync(file, 'utf8');

	    var lines = contents.split('\n');
	    if (lines[lines.length - 1] === '') {
	      lines.pop();
	      shouldAppendNewline = true;
	    } else {
	      shouldAppendNewline = false;
	    }

	    tail = tail.concat(lines.slice(options.numLines));
	  });

	  if (shouldAppendNewline) {
	    tail.push(''); // to add a trailing newline once we join
	  }
	  return tail.join('\n');
	}
	tail = _tail;
	return tail;
}

var test;
var hasRequiredTest;

function requireTest () {
	if (hasRequiredTest) return test;
	hasRequiredTest = 1;
	var common = requireCommon();
	var fs = require$$1;

	common.register('test', _test, {
	  cmdOptions: {
	    'b': 'block',
	    'c': 'character',
	    'd': 'directory',
	    'e': 'exists',
	    'f': 'file',
	    'L': 'link',
	    'p': 'pipe',
	    'S': 'socket',
	  },
	  wrapOutput: false,
	  allowGlobbing: false,
	});


	//@
	//@ ### test(expression)
	//@
	//@ Available expression primaries:
	//@
	//@ + `'-b', 'path'`: true if path is a block device
	//@ + `'-c', 'path'`: true if path is a character device
	//@ + `'-d', 'path'`: true if path is a directory
	//@ + `'-e', 'path'`: true if path exists
	//@ + `'-f', 'path'`: true if path is a regular file
	//@ + `'-L', 'path'`: true if path is a symbolic link
	//@ + `'-p', 'path'`: true if path is a pipe (FIFO)
	//@ + `'-S', 'path'`: true if path is a socket
	//@
	//@ Examples:
	//@
	//@ ```javascript
	//@ if (test('-d', path)) { /* do something with dir */ };
	//@ if (!test('-f', path)) continue; // skip if it's a regular file
	//@ ```
	//@
	//@ Evaluates `expression` using the available primaries and returns corresponding value.
	function _test(options, path) {
	  if (!path) common.error('no path given');

	  var canInterpret = false;
	  Object.keys(options).forEach(function (key) {
	    if (options[key] === true) {
	      canInterpret = true;
	    }
	  });

	  if (!canInterpret) common.error('could not interpret expression');

	  if (options.link) {
	    try {
	      return common.statNoFollowLinks(path).isSymbolicLink();
	    } catch (e) {
	      return false;
	    }
	  }

	  if (!fs.existsSync(path)) return false;

	  if (options.exists) return true;

	  var stats = common.statFollowLinks(path);

	  if (options.block) return stats.isBlockDevice();

	  if (options.character) return stats.isCharacterDevice();

	  if (options.directory) return stats.isDirectory();

	  if (options.file) return stats.isFile();

	  /* istanbul ignore next */
	  if (options.pipe) return stats.isFIFO();

	  /* istanbul ignore next */
	  if (options.socket) return stats.isSocket();

	  /* istanbul ignore next */
	  return false; // fallback
	} // test
	test = _test;
	return test;
}

var to;
var hasRequiredTo;

function requireTo () {
	if (hasRequiredTo) return to;
	hasRequiredTo = 1;
	var common = requireCommon();
	var fs = require$$1;
	var path = require$$2;

	common.register('to', _to, {
	  pipeOnly: true,
	  wrapOutput: false,
	});

	//@
	//@ ### ShellString.prototype.to(file)
	//@
	//@ Examples:
	//@
	//@ ```javascript
	//@ cat('input.txt').to('output.txt');
	//@ ```
	//@
	//@ Analogous to the redirection operator `>` in Unix, but works with
	//@ `ShellStrings` (such as those returned by `cat`, `grep`, etc.). _Like Unix
	//@ redirections, `to()` will overwrite any existing file!_
	function _to(options, file) {
	  if (!file) common.error('wrong arguments');

	  if (!fs.existsSync(path.dirname(file))) {
	    common.error('no such file or directory: ' + path.dirname(file));
	  }

	  try {
	    fs.writeFileSync(file, this.stdout || this.toString(), 'utf8');
	    return this;
	  } catch (e) {
	    /* istanbul ignore next */
	    common.error('could not write to file (code ' + e.code + '): ' + file, { continue: true });
	  }
	}
	to = _to;
	return to;
}

var toEnd;
var hasRequiredToEnd;

function requireToEnd () {
	if (hasRequiredToEnd) return toEnd;
	hasRequiredToEnd = 1;
	var common = requireCommon();
	var fs = require$$1;
	var path = require$$2;

	common.register('toEnd', _toEnd, {
	  pipeOnly: true,
	  wrapOutput: false,
	});

	//@
	//@ ### ShellString.prototype.toEnd(file)
	//@
	//@ Examples:
	//@
	//@ ```javascript
	//@ cat('input.txt').toEnd('output.txt');
	//@ ```
	//@
	//@ Analogous to the redirect-and-append operator `>>` in Unix, but works with
	//@ `ShellStrings` (such as those returned by `cat`, `grep`, etc.).
	function _toEnd(options, file) {
	  if (!file) common.error('wrong arguments');

	  if (!fs.existsSync(path.dirname(file))) {
	    common.error('no such file or directory: ' + path.dirname(file));
	  }

	  try {
	    fs.appendFileSync(file, this.stdout || this.toString(), 'utf8');
	    return this;
	  } catch (e) {
	    /* istanbul ignore next */
	    common.error('could not append to file (code ' + e.code + '): ' + file, { continue: true });
	  }
	}
	toEnd = _toEnd;
	return toEnd;
}

var touch;
var hasRequiredTouch;

function requireTouch () {
	if (hasRequiredTouch) return touch;
	hasRequiredTouch = 1;
	var common = requireCommon();
	var fs = require$$1;

	common.register('touch', _touch, {
	  cmdOptions: {
	    'a': 'atime_only',
	    'c': 'no_create',
	    'd': 'date',
	    'm': 'mtime_only',
	    'r': 'reference',
	  },
	});

	//@
	//@ ### touch([options,] file [, file ...])
	//@ ### touch([options,] file_array)
	//@
	//@ Available options:
	//@
	//@ + `-a`: Change only the access time
	//@ + `-c`: Do not create any files
	//@ + `-m`: Change only the modification time
	//@ + `-d DATE`: Parse `DATE` and use it instead of current time
	//@ + `-r FILE`: Use `FILE`'s times instead of current time
	//@
	//@ Examples:
	//@
	//@ ```javascript
	//@ touch('source.js');
	//@ touch('-c', '/path/to/some/dir/source.js');
	//@ touch({ '-r': FILE }, '/path/to/some/dir/source.js');
	//@ ```
	//@
	//@ Update the access and modification times of each `FILE` to the current time.
	//@ A `FILE` argument that does not exist is created empty, unless `-c` is supplied.
	//@ This is a partial implementation of [`touch(1)`](http://linux.die.net/man/1/touch).
	function _touch(opts, files) {
	  if (!files) {
	    common.error('no files given');
	  } else if (typeof files === 'string') {
	    files = [].slice.call(arguments, 1);
	  } else {
	    common.error('file arg should be a string file path or an Array of string file paths');
	  }

	  files.forEach(function (f) {
	    touchFile(opts, f);
	  });
	  return '';
	}

	function touchFile(opts, file) {
	  var stat = tryStatFile(file);

	  if (stat && stat.isDirectory()) {
	    // don't error just exit
	    return;
	  }

	  // if the file doesn't already exist and the user has specified --no-create then
	  // this script is finished
	  if (!stat && opts.no_create) {
	    return;
	  }

	  // open the file and then close it. this will create it if it doesn't exist but will
	  // not truncate the file
	  fs.closeSync(fs.openSync(file, 'a'));

	  //
	  // Set timestamps
	  //

	  // setup some defaults
	  var now = new Date();
	  var mtime = opts.date || now;
	  var atime = opts.date || now;

	  // use reference file
	  if (opts.reference) {
	    var refStat = tryStatFile(opts.reference);
	    if (!refStat) {
	      common.error('failed to get attributess of ' + opts.reference);
	    }
	    mtime = refStat.mtime;
	    atime = refStat.atime;
	  } else if (opts.date) {
	    mtime = opts.date;
	    atime = opts.date;
	  }

	  if (opts.atime_only && opts.mtime_only) ; else if (opts.atime_only) {
	    mtime = stat.mtime;
	  } else if (opts.mtime_only) {
	    atime = stat.atime;
	  }

	  fs.utimesSync(file, atime, mtime);
	}

	touch = _touch;

	function tryStatFile(filePath) {
	  try {
	    return common.statFollowLinks(filePath);
	  } catch (e) {
	    return null;
	  }
	}
	return touch;
}

var uniq;
var hasRequiredUniq;

function requireUniq () {
	if (hasRequiredUniq) return uniq;
	hasRequiredUniq = 1;
	var common = requireCommon();
	var fs = require$$1;

	// add c spaces to the left of str
	function lpad(c, str) {
	  var res = '' + str;
	  if (res.length < c) {
	    res = Array((c - res.length) + 1).join(' ') + res;
	  }
	  return res;
	}

	common.register('uniq', _uniq, {
	  canReceivePipe: true,
	  cmdOptions: {
	    'i': 'ignoreCase',
	    'c': 'count',
	    'd': 'duplicates',
	  },
	});

	//@
	//@ ### uniq([options,] [input, [output]])
	//@
	//@ Available options:
	//@
	//@ + `-i`: Ignore case while comparing
	//@ + `-c`: Prefix lines by the number of occurrences
	//@ + `-d`: Only print duplicate lines, one for each group of identical lines
	//@
	//@ Examples:
	//@
	//@ ```javascript
	//@ uniq('foo.txt');
	//@ uniq('-i', 'foo.txt');
	//@ uniq('-cd', 'foo.txt', 'bar.txt');
	//@ ```
	//@
	//@ Filter adjacent matching lines from `input`.
	function _uniq(options, input, output) {
	  // Check if this is coming from a pipe
	  var pipe = common.readFromPipe();

	  if (!pipe) {
	    if (!input) common.error('no input given');

	    if (!fs.existsSync(input)) {
	      common.error(input + ': No such file or directory');
	    } else if (common.statFollowLinks(input).isDirectory()) {
	      common.error("error reading '" + input + "'");
	    }
	  }
	  if (output && fs.existsSync(output) && common.statFollowLinks(output).isDirectory()) {
	    common.error(output + ': Is a directory');
	  }

	  var lines = (input ? fs.readFileSync(input, 'utf8') : pipe).
	              trimRight().
	              split('\n');

	  var compare = function (a, b) {
	    return options.ignoreCase ?
	           a.toLocaleLowerCase().localeCompare(b.toLocaleLowerCase()) :
	           a.localeCompare(b);
	  };
	  var uniqed = lines.reduceRight(function (res, e) {
	    // Perform uniq -c on the input
	    if (res.length === 0) {
	      return [{ count: 1, ln: e }];
	    } else if (compare(res[0].ln, e) === 0) {
	      return [{ count: res[0].count + 1, ln: e }].concat(res.slice(1));
	    } else {
	      return [{ count: 1, ln: e }].concat(res);
	    }
	  }, []).filter(function (obj) {
	                 // Do we want only duplicated objects?
	    return options.duplicates ? obj.count > 1 : true;
	  }).map(function (obj) {
	                 // Are we tracking the counts of each line?
	    return (options.count ? (lpad(7, obj.count) + ' ') : '') + obj.ln;
	  }).join('\n') + '\n';

	  if (output) {
	    (new common.ShellString(uniqed)).to(output);
	    // if uniq writes to output, nothing is passed to the next command in the pipeline (if any)
	    return '';
	  } else {
	    return uniqed;
	  }
	}

	uniq = _uniq;
	return uniq;
}

var which;
var hasRequiredWhich;

function requireWhich () {
	if (hasRequiredWhich) return which;
	hasRequiredWhich = 1;
	var common = requireCommon();
	var fs = require$$1;
	var path = require$$2;

	common.register('which', _which, {
	  allowGlobbing: false,
	  cmdOptions: {
	    'a': 'all',
	  },
	});

	// XP's system default value for `PATHEXT` system variable, just in case it's not
	// set on Windows.
	var XP_DEFAULT_PATHEXT = '.com;.exe;.bat;.cmd;.vbs;.vbe;.js;.jse;.wsf;.wsh';

	// For earlier versions of NodeJS that doesn't have a list of constants (< v6)
	var FILE_EXECUTABLE_MODE = 1;

	function isWindowsPlatform() {
	  return process.platform === 'win32';
	}

	// Cross-platform method for splitting environment `PATH` variables
	function splitPath(p) {
	  return p ? p.split(path.delimiter) : [];
	}

	// Tests are running all cases for this func but it stays uncovered by codecov due to unknown reason
	/* istanbul ignore next */
	function isExecutable(pathName) {
	  try {
	    // TODO(node-support): replace with fs.constants.X_OK once remove support for node < v6
	    fs.accessSync(pathName, FILE_EXECUTABLE_MODE);
	  } catch (err) {
	    return false;
	  }
	  return true;
	}

	function checkPath(pathName) {
	  return fs.existsSync(pathName) && !common.statFollowLinks(pathName).isDirectory()
	    && (isWindowsPlatform() || isExecutable(pathName));
	}

	//@
	//@ ### which(command)
	//@
	//@ Examples:
	//@
	//@ ```javascript
	//@ var nodeExec = which('node');
	//@ ```
	//@
	//@ Searches for `command` in the system's `PATH`. On Windows, this uses the
	//@ `PATHEXT` variable to append the extension if it's not already executable.
	//@ Returns string containing the absolute path to `command`.
	function _which(options, cmd) {
	  if (!cmd) common.error('must specify command');

	  var isWindows = isWindowsPlatform();
	  var pathArray = splitPath(process.env.PATH);

	  var queryMatches = [];

	  // No relative/absolute paths provided?
	  if (cmd.indexOf('/') === -1) {
	    // Assume that there are no extensions to append to queries (this is the
	    // case for unix)
	    var pathExtArray = [''];
	    if (isWindows) {
	      // In case the PATHEXT variable is somehow not set (e.g.
	      // child_process.spawn with an empty environment), use the XP default.
	      var pathExtEnv = process.env.PATHEXT || XP_DEFAULT_PATHEXT;
	      pathExtArray = splitPath(pathExtEnv.toUpperCase());
	    }

	    // Search for command in PATH
	    for (var k = 0; k < pathArray.length; k++) {
	      // already found it
	      if (queryMatches.length > 0 && !options.all) break;

	      var attempt = path.resolve(pathArray[k], cmd);

	      if (isWindows) {
	        attempt = attempt.toUpperCase();
	      }

	      var match = attempt.match(/\.[^<>:"/\|?*.]+$/);
	      if (match && pathExtArray.indexOf(match[0]) >= 0) { // this is Windows-only
	        // The user typed a query with the file extension, like
	        // `which('node.exe')`
	        if (checkPath(attempt)) {
	          queryMatches.push(attempt);
	          break;
	        }
	      } else { // All-platforms
	        // Cycle through the PATHEXT array, and check each extension
	        // Note: the array is always [''] on Unix
	        for (var i = 0; i < pathExtArray.length; i++) {
	          var ext = pathExtArray[i];
	          var newAttempt = attempt + ext;
	          if (checkPath(newAttempt)) {
	            queryMatches.push(newAttempt);
	            break;
	          }
	        }
	      }
	    }
	  } else if (checkPath(cmd)) { // a valid absolute or relative path
	    queryMatches.push(path.resolve(cmd));
	  }

	  if (queryMatches.length > 0) {
	    return options.all ? queryMatches : queryMatches[0];
	  }
	  return options.all ? [] : null;
	}
	which = _which;
	return which;
}

var dynamicModules;

function getDynamicModules() {
	return dynamicModules || (dynamicModules = {
		"/node_modules/shelljs/src/cat.js": requireCat,
		"/node_modules/shelljs/src/cd.js": requireCd,
		"/node_modules/shelljs/src/chmod.js": requireChmod,
		"/node_modules/shelljs/src/common.js": requireCommon,
		"/node_modules/shelljs/src/cp.js": requireCp,
		"/node_modules/shelljs/src/dirs.js": requireDirs,
		"/node_modules/shelljs/src/echo.js": requireEcho,
		"/node_modules/shelljs/src/error.js": requireError,
		"/node_modules/shelljs/src/exec-child.js": requireExecChild,
		"/node_modules/shelljs/src/exec.js": requireExec,
		"/node_modules/shelljs/src/find.js": requireFind,
		"/node_modules/shelljs/src/grep.js": requireGrep,
		"/node_modules/shelljs/src/head.js": requireHead,
		"/node_modules/shelljs/src/ln.js": requireLn,
		"/node_modules/shelljs/src/ls.js": requireLs,
		"/node_modules/shelljs/src/mkdir.js": requireMkdir,
		"/node_modules/shelljs/src/mv.js": requireMv,
		"/node_modules/shelljs/src/popd.js": requirePopd,
		"/node_modules/shelljs/src/pushd.js": requirePushd,
		"/node_modules/shelljs/src/pwd.js": requirePwd,
		"/node_modules/shelljs/src/rm.js": requireRm,
		"/node_modules/shelljs/src/sed.js": requireSed,
		"/node_modules/shelljs/src/set.js": requireSet,
		"/node_modules/shelljs/src/sort.js": requireSort,
		"/node_modules/shelljs/src/tail.js": requireTail,
		"/node_modules/shelljs/src/tempdir.js": requireTempdir,
		"/node_modules/shelljs/src/test.js": requireTest,
		"/node_modules/shelljs/src/to.js": requireTo,
		"/node_modules/shelljs/src/toEnd.js": requireToEnd,
		"/node_modules/shelljs/src/touch.js": requireTouch,
		"/node_modules/shelljs/src/uniq.js": requireUniq,
		"/node_modules/shelljs/src/which.js": requireWhich
	});
}

function createCommonjsRequire(originalModuleDir) {
	function handleRequire(path) {
		var resolvedPath = commonjsResolve(path, originalModuleDir);
		if (resolvedPath !== null) {
			return getDynamicModules()[resolvedPath]();
		}
		throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
	}
	handleRequire.resolve = function (path) {
		var resolvedPath = commonjsResolve(path, originalModuleDir);
		if (resolvedPath !== null) {
			return resolvedPath;
		}
		return require.resolve(path);
	};
	return handleRequire;
}

function commonjsResolve (path, originalModuleDir) {
	var shouldTryNodeModules = isPossibleNodeModulesPath(path);
	path = normalize(path);
	var relPath;
	if (path[0] === '/') {
		originalModuleDir = '';
	}
	var modules = getDynamicModules();
	var checkedExtensions = ['', '.js', '.json'];
	while (true) {
		if (!shouldTryNodeModules) {
			relPath = normalize(originalModuleDir + '/' + path);
		} else {
			relPath = normalize(originalModuleDir + '/node_modules/' + path);
		}

		if (relPath.endsWith('/..')) {
			break; // Travelled too far up, avoid infinite loop
		}

		for (var extensionIndex = 0; extensionIndex < checkedExtensions.length; extensionIndex++) {
			var resolvedPath = relPath + checkedExtensions[extensionIndex];
			if (modules[resolvedPath]) {
				return resolvedPath;
			}
		}
		if (!shouldTryNodeModules) break;
		var nextDir = normalize(originalModuleDir + '/..');
		if (nextDir === originalModuleDir) break;
		originalModuleDir = nextDir;
	}
	return null;
}

function isPossibleNodeModulesPath (modulePath) {
	var c0 = modulePath[0];
	if (c0 === '/' || c0 === '\\') return false;
	var c1 = modulePath[1], c2 = modulePath[2];
	if ((c0 === '.' && (!c1 || c1 === '/' || c1 === '\\')) ||
		(c0 === '.' && c1 === '.' && (!c2 || c2 === '/' || c2 === '\\'))) return false;
	if (c1 === ':' && (c2 === '/' || c2 === '\\')) return false;
	return true;
}

function normalize (path) {
	path = path.replace(/\\/g, '/');
	var parts = path.split('/');
	var slashed = parts[0] === '';
	for (var i = 1; i < parts.length; i++) {
		if (parts[i] === '.' || parts[i] === '') {
			parts.splice(i--, 1);
		}
	}
	for (var i = 1; i < parts.length; i++) {
		if (parts[i] !== '..') continue;
		if (i > 0 && parts[i - 1] !== '..' && parts[i - 1] !== '.') {
			parts.splice(--i, 2);
			i--;
		}
	}
	path = parts.join('/');
	if (slashed && path[0] !== '/') path = '/' + path;
	else if (path.length === 0) path = '.';
	return path;
}

var shell$2 = {};

var commands = [
  'cat',
  'cd',
  'chmod',
  'cp',
  'dirs',
  'echo',
  'exec',
  'find',
  'grep',
  'head',
  'ln',
  'ls',
  'mkdir',
  'mv',
  'pwd',
  'rm',
  'sed',
  'set',
  'sort',
  'tail',
  'tempdir',
  'test',
  'to',
  'toEnd',
  'touch',
  'uniq',
  'which',
];

var hasRequiredShell;

function requireShell () {
	if (hasRequiredShell) return shell$2;
	hasRequiredShell = 1;
	//
	// ShellJS
	// Unix shell commands on top of Node's API
	//
	// Copyright (c) 2012 Artur Adib
	// http://github.com/shelljs/shelljs
	//

	var common = requireCommon();

	//@
	//@ All commands run synchronously, unless otherwise stated.
	//@ All commands accept standard bash globbing characters (`*`, `?`, etc.),
	//@ compatible with the [node `glob` module](https://github.com/isaacs/node-glob).
	//@
	//@ For less-commonly used commands and features, please check out our [wiki
	//@ page](https://github.com/shelljs/shelljs/wiki).
	//@

	// Include the docs for all the default commands
	//@commands

	// Load all default commands
	commands.forEach(function (command) {
	  createCommonjsRequire("/node_modules/shelljs")('./src/' + command);
	});

	//@
	//@ ### exit(code)
	//@
	//@ Exits the current process with the given exit `code`.
	shell$2.exit = process.exit;

	//@include ./src/error
	shell$2.error = requireError();

	//@include ./src/common
	shell$2.ShellString = common.ShellString;

	//@
	//@ ### env['VAR_NAME']
	//@
	//@ Object containing environment variables (both getter and setter). Shortcut
	//@ to `process.env`.
	shell$2.env = process.env;

	//@
	//@ ### Pipes
	//@
	//@ Examples:
	//@
	//@ ```javascript
	//@ grep('foo', 'file1.txt', 'file2.txt').sed(/o/g, 'a').to('output.txt');
	//@ echo('files with o\'s in the name:\n' + ls().grep('o'));
	//@ cat('test.js').exec('node'); // pipe to exec() call
	//@ ```
	//@
	//@ Commands can send their output to another command in a pipe-like fashion.
	//@ `sed`, `grep`, `cat`, `exec`, `to`, and `toEnd` can appear on the right-hand
	//@ side of a pipe. Pipes can be chained.

	//@
	//@ ## Configuration
	//@

	shell$2.config = common.config;

	//@
	//@ ### config.silent
	//@
	//@ Example:
	//@
	//@ ```javascript
	//@ var sh = require('shelljs');
	//@ var silentState = sh.config.silent; // save old silent state
	//@ sh.config.silent = true;
	//@ /* ... */
	//@ sh.config.silent = silentState; // restore old silent state
	//@ ```
	//@
	//@ Suppresses all command output if `true`, except for `echo()` calls.
	//@ Default is `false`.

	//@
	//@ ### config.fatal
	//@
	//@ Example:
	//@
	//@ ```javascript
	//@ require('shelljs/global');
	//@ config.fatal = true; // or set('-e');
	//@ cp('this_file_does_not_exist', '/dev/null'); // throws Error here
	//@ /* more commands... */
	//@ ```
	//@
	//@ If `true`, the script will throw a Javascript error when any shell.js
	//@ command encounters an error. Default is `false`. This is analogous to
	//@ Bash's `set -e`.

	//@
	//@ ### config.verbose
	//@
	//@ Example:
	//@
	//@ ```javascript
	//@ config.verbose = true; // or set('-v');
	//@ cd('dir/');
	//@ rm('-rf', 'foo.txt', 'bar.txt');
	//@ exec('echo hello');
	//@ ```
	//@
	//@ Will print each command as follows:
	//@
	//@ ```
	//@ cd dir/
	//@ rm -rf foo.txt bar.txt
	//@ exec echo hello
	//@ ```

	//@
	//@ ### config.globOptions
	//@
	//@ Example:
	//@
	//@ ```javascript
	//@ config.globOptions = {nodir: true};
	//@ ```
	//@
	//@ Use this value for calls to `glob.sync()` instead of the default options.

	//@
	//@ ### config.reset()
	//@
	//@ Example:
	//@
	//@ ```javascript
	//@ var shell = require('shelljs');
	//@ // Make changes to shell.config, and do stuff...
	//@ /* ... */
	//@ shell.config.reset(); // reset to original state
	//@ // Do more stuff, but with original settings
	//@ /* ... */
	//@ ```
	//@
	//@ Reset `shell.config` to the defaults:
	//@
	//@ ```javascript
	//@ {
	//@   fatal: false,
	//@   globOptions: {},
	//@   maxdepth: 255,
	//@   noglob: false,
	//@   silent: false,
	//@   verbose: false,
	//@ }
	//@ ```
	return shell$2;
}

/* eslint no-extend-native: 0 */

var shell$1 = requireShell();
var common = requireCommon();
Object.keys(shell$1).forEach(function (cmd) {
  commonjsGlobal[cmd] = shell$1[cmd];
});

var _to = requireTo();
String.prototype.to = common.wrap('to', _to);

var _toEnd = requireToEnd();
String.prototype.toEnd = common.wrap('toEnd', _toEnd);

commonjsGlobal.config.fatal = true;
commonjsGlobal.target = {};

var args = process.argv.slice(2),
  targetArgs,
  dashesLoc = args.indexOf('--');

// split args, everything after -- if only for targets
if (dashesLoc > -1) {
  targetArgs = args.slice(dashesLoc + 1, args.length);
  args = args.slice(0, dashesLoc);
}

// This ensures we only execute the script targets after the entire script has
// been evaluated
setTimeout(function() {
  var t;

  if (args.length === 1 && args[0] === '--help') {
    console.log('Available targets:');
    for (t in commonjsGlobal.target)
      console.log('  ' + t);
    return;
  }

  // Wrap targets to prevent duplicate execution
  for (t in commonjsGlobal.target) {
    (function(t, oldTarget){

      // Wrap it
      commonjsGlobal.target[t] = function() {
        if (!oldTarget.done){
          oldTarget.done = true;
          oldTarget.result = oldTarget.apply(oldTarget, arguments);
        }
        return oldTarget.result;
      };

    })(t, commonjsGlobal.target[t]);
  }

  // Execute desired targets
  if (args.length > 0) {
    args.forEach(function(arg) {
      if (arg in commonjsGlobal.target)
        commonjsGlobal.target[arg](targetArgs);
      else {
        console.log('no such target: ' + arg);
      }
    });
  } else if ('all' in commonjsGlobal.target) {
    commonjsGlobal.target.all(targetArgs);
  }

}, 0);

/**
 * @type {import("shelljs")}
 */
const shell = global;
const target = global.target;

const SOURCES = ["packages", "codemods", "eslint"];

const YARN_PATH = shell.which("yarn").stdout;
const NODE_PATH = process.execPath; // `yarn node` is so slow on Windows

shell.config.verbose = true;

function print(msg) {
  console.log(msg);
}

function exec(executable, args, cwd, inheritStdio = true) {
  print(
    `${executable.replaceAll(YARN_PATH, "yarn").replaceAll(
      NODE_PATH,
      "node"
    )} ${args.join(" ")}`
  );

  try {
    return execFileSync(executable, args, {
      stdio: inheritStdio ? "inherit" : undefined,
      cwd: cwd && require$$2.resolve(cwd),
      env: process.env,
    });
  } catch (error) {
    if (inheritStdio && error.status != 0) {
      console.error(
        new Error(
          `\ncommand: ${executable} ${args.join(" ")}\ncode: ${error.status}`
        )
      );
      // eslint-disable-next-line no-process-exit
      process.exit(error.status);
    }
    throw error;
  }
}

function yarn(args, cwd, inheritStdio) {
  return exec(YARN_PATH, args, cwd, inheritStdio);
}

function node(args, cwd, inheritStdio) {
  return exec(NODE_PATH, args, cwd, inheritStdio);
}

function env(fun, env) {
  const envBak = process.env;
  process.env = { ...envBak, ...env };
  fun();
  process.env = envBak;
}

/**
 * CLEAN
 */

target["clean-all"] = function () {
  ["node_modules", "package-lock.json", ".changelog"].forEach(path => {
    shell.rm("-rf", path);
  });

  SOURCES.forEach(source => {
    shell.rm("-rf", `${source}/*/test/tmp`);
    shell.rm("-rf", `${source}/*/package-lock.json`);
  });

  target["clean"]();
  target["clean-lib"]();
};

target["clean"] = function () {
  target["test-clean"]();

  [
    ".npmrc",
    "coverage",
    "packages/*/npm-debug*",
    "node_modules/.cache",
  ].forEach(path => {
    shell.rm("-rf", path);
  });
};

target["test-clean"] = function () {
  SOURCES.forEach(source => {
    shell.rm("-rf", `${source}/*/test/tmp`);
    shell.rm("-rf", `${source}/*/test-fixtures.json`);
  });
};

target["clean-lib"] = function () {
  SOURCES.forEach(source => {
    shell.rm("-rf", `${source}/*/lib`);
  });
};

target["clean-runtime-helpers"] = function () {
  [
    "packages/babel-runtime/helpers/**/*.js",
    "packages/babel-runtime-corejs2/helpers/**/*.js",
    "packages/babel-runtime-corejs3/helpers/**/*.js",
    "packages/babel-runtime/helpers/**/*.mjs",
    "packages/babel-runtime-corejs2/helpers/**/*.mjs",
    "packages/babel-runtime-corejs3/helpers/**/*.mjs",
    "packages/babel-runtime-corejs2/core-js",
  ].forEach(path => {
    shell.rm("-rf", path);
  });
};

/**
 * BUILD
 */

target["use-cjs"] = function () {
  node(["scripts/set-module-type.js", "script"]);

  target["bootstrap"]();
};

target["use-esm"] = function () {
  node(["scripts/set-module-type.js", "module"]);

  target["bootstrap"]();
};

target["bootstrap-only"] = function () {
  target["clean-all"]();

  yarn(["install"]);
};

target["bootstrap"] = function () {
  target["bootstrap-only"]();

  target["generate-tsconfig"]();
  target["build"]();
};

target["build"] = function () {
  target["build-bundle"]();

  if (process.env.BABEL_COVERAGE != "true") {
    target["build-standalone"]();
  }
};

target["build-standalone"] = function () {
  yarn(["gulp", "build-babel-standalone"]);
};

target["build-bundle"] = function () {
  node(["scripts/set-module-type.js"]);

  target["clean"]();
  target["clean-lib"]();

  yarn(["gulp", "build"]);

  target["build-flow-typings"]();
  target["build-dist"]();
};

target["build-no-bundle"] = function () {
  node(["scripts/set-module-type.js"]);

  target["clean"]();
  target["clean-lib"]();

  env(
    () => {
      yarn(["gulp", "build-dev"]);
    },
    { BABEL_ENV: "development" }
  );

  target["build-flow-typings"]();
  target["build-dist"]();
};

target["build-flow-typings"] = function () {
  writeFileSync(
    "packages/babel-types/lib/index.js.flow",
    node(["packages/babel-types/scripts/generators/flow.js"], undefined, false)
  );
};

target["build-dist"] = function () {
  target["build-plugin-transform-runtime-dist"]();
};

target["build-plugin-transform-runtime-dist"] = function () {
  node(["scripts/build-dist.js"], "packages/babel-plugin-transform-runtime");
};

target["prepublish-build"] = function () {
  target["clean-lib"]();
  target["clean-runtime-helpers"]();

  env(
    () => {
      target["build-bundle"]();
    },
    {
      NODE_ENV: "production",
      BABEL_ENV: "production",
      STRIP_BABEL_8_FLAG: "true",
    }
  );

  env(
    () => {
      target["prepublish-build-standalone"]();
      target["clone-license"]();
      target["prepublish-prepare-dts"]();
    },
    {
      STRIP_BABEL_8_FLAG: "true",
    }
  );
};

target["prepublish-build-standalone"] = function () {
  env(
    () => {
      target["build-standalone"]();
    },
    {
      BABEL_ENV: "production",
      IS_PUBLISH: "true",
    }
  );
};

target["prepublish-prepare-dts"] = function () {
  target["tscheck"]();

  yarn(["gulp", "bundle-dts"]);

  target["build-typescript-legacy-typings"]();
};

target["tscheck"] = function () {
  target["generate-tsconfig"]();

  shell.rm("-rf", "dts");
  yarn(["tsc", "-b", "."]);
};

target["generate-tsconfig"] = function () {
  node(["scripts/generators/tsconfig.js"]);
  node(["scripts/generators/archived-libs-typings.js"]);
};

target["clone-license"] = function () {
  node(["scripts/clone-license.js"]);
};

target["build-typescript-legacy-typings"] = function () {
  writeFileSync(
    "packages/babel-types/lib/index-legacy.d.ts",
    node(
      ["packages/babel-types/scripts/generators/typescript-legacy.js"],
      undefined,
      false
    )
  );
};

/**
 * DEV
 */

target["lint"] = function () {
  env(
    () => {
      yarn([
        "eslint",
        "scripts",
        "benchmark",
        ...SOURCES,
        "*.{js,cjs,mjs,ts}",
        "--format",
        "codeframe",
        "--ext",
        ".js,.cjs,.mjs,.ts",
      ]);
    },
    {
      BABEL_ENV: "test",
    }
  );
};

target["fix"] = function () {
  target["fix-json"]();
  target["fix-js"]();
};

target["fix-js"] = function () {
  yarn([
    "eslint",
    "scripts",
    "benchmark",
    ...SOURCES,
    "*.{js,cjs,mjs,ts}",
    "--format",
    "codeframe",
    "--ext",
    ".js,.cjs,.mjs,.ts",
    "--fix",
  ]);
};

target["fix-json"] = function () {
  yarn([
    "prettier",
    `{${SOURCES.join(",")}}/*/test/fixtures/**/options.json`,
    "--write",
    "--loglevel",
    "warn",
  ]);
};

target["watch"] = function () {
  target["build-no-bundle"]();

  env(
    () => {
      yarn(["gulp", "watch"]);
    },
    {
      BABEL_ENV: "development",
      WATCH_SKIP_BUILD: "true",
    }
  );
};

target["test"] = function () {
  target["lint"]();
  target["test-only"]();
};

target["test-only"] = function (args = []) {
  yarn(["jest", ...args]);
};
