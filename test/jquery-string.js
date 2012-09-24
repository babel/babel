/* Silly noise to be able to load in source code without doing an XMLHttpReq */var jquery164 = "/*!\n\
 * jQuery JavaScript Library v1.6.4\n\
 * http://jquery.com/\n\
 *\n\
 * Copyright 2011, John Resig\n\
 * Dual licensed under the MIT or GPL Version 2 licenses.\n\
 * http://jquery.org/license\n\
 *\n\
 * Includes Sizzle.js\n\
 * http://sizzlejs.com/\n\
 * Copyright 2011, The Dojo Foundation\n\
 * Released under the MIT, BSD, and GPL Licenses.\n\
 *\n\
 * Date: Mon Sep 12 18:54:48 2011 -0400\n\
 */\n\
(function( window, undefined ) {\n\
\n\
// Use the correct document accordingly with window argument (sandbox)\n\
var document = window.document,\n\
	navigator = window.navigator,\n\
	location = window.location;\n\
var jQuery = (function() {\n\
\n\
// Define a local copy of jQuery\n\
var jQuery = function( selector, context ) {\n\
		// The jQuery object is actually just the init constructor 'enhanced'\n\
		return new jQuery.fn.init( selector, context, rootjQuery );\n\
	},\n\
\n\
	// Map over jQuery in case of overwrite\n\
	_jQuery = window.jQuery,\n\
\n\
	// Map over the $ in case of overwrite\n\
	_$ = window.$,\n\
\n\
	// A central reference to the root jQuery(document)\n\
	rootjQuery,\n\
\n\
	// A simple way to check for HTML strings or ID strings\n\
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)\n\
	quickExpr = /^(?:[^#<]*(<[\\w\\W]+>)[^>]*$|#([\\w\\-]*)$)/,\n\
\n\
	// Check if a string has a non-whitespace character in it\n\
	rnotwhite = /\\S/,\n\
\n\
	// Used for trimming whitespace\n\
	trimLeft = /^\\s+/,\n\
	trimRight = /\\s+$/,\n\
\n\
	// Check for digits\n\
	rdigit = /\\d/,\n\
\n\
	// Match a standalone tag\n\
	rsingleTag = /^<(\\w+)\\s*\\/?>(?:<\\/\\1>)?$/,\n\
\n\
	// JSON RegExp\n\
	rvalidchars = /^[\\],:{}\\s]*$/,\n\
	rvalidescape = /\\\\(?:[\"\\\\\\/bfnrt]|u[0-9a-fA-F]{4})/g,\n\
	rvalidtokens = /\"[^\"\\\\\\n\\r]*\"|true|false|null|-?\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d+)?/g,\n\
	rvalidbraces = /(?:^|:|,)(?:\\s*\\[)+/g,\n\
\n\
	// Useragent RegExp\n\
	rwebkit = /(webkit)[ \\/]([\\w.]+)/,\n\
	ropera = /(opera)(?:.*version)?[ \\/]([\\w.]+)/,\n\
	rmsie = /(msie) ([\\w.]+)/,\n\
	rmozilla = /(mozilla)(?:.*? rv:([\\w.]+))?/,\n\
\n\
	// Matches dashed string for camelizing\n\
	rdashAlpha = /-([a-z]|[0-9])/ig,\n\
	rmsPrefix = /^-ms-/,\n\
\n\
	// Used by jQuery.camelCase as callback to replace()\n\
	fcamelCase = function( all, letter ) {\n\
		return ( letter + \"\" ).toUpperCase();\n\
	},\n\
\n\
	// Keep a UserAgent string for use with jQuery.browser\n\
	userAgent = navigator.userAgent,\n\
\n\
	// For matching the engine and version of the browser\n\
	browserMatch,\n\
\n\
	// The deferred used on DOM ready\n\
	readyList,\n\
\n\
	// The ready event handler\n\
	DOMContentLoaded,\n\
\n\
	// Save a reference to some core methods\n\
	toString = Object.prototype.toString,\n\
	hasOwn = Object.prototype.hasOwnProperty,\n\
	push = Array.prototype.push,\n\
	slice = Array.prototype.slice,\n\
	trim = String.prototype.trim,\n\
	indexOf = Array.prototype.indexOf,\n\
\n\
	// [[Class]] -> type pairs\n\
	class2type = {};\n\
\n\
jQuery.fn = jQuery.prototype = {\n\
	constructor: jQuery,\n\
	init: function( selector, context, rootjQuery ) {\n\
		var match, elem, ret, doc;\n\
\n\
		// Handle $(\"\"), $(null), or $(undefined)\n\
		if ( !selector ) {\n\
			return this;\n\
		}\n\
\n\
		// Handle $(DOMElement)\n\
		if ( selector.nodeType ) {\n\
			this.context = this[0] = selector;\n\
			this.length = 1;\n\
			return this;\n\
		}\n\
\n\
		// The body element only exists once, optimize finding it\n\
		if ( selector === \"body\" && !context && document.body ) {\n\
			this.context = document;\n\
			this[0] = document.body;\n\
			this.selector = selector;\n\
			this.length = 1;\n\
			return this;\n\
		}\n\
\n\
		// Handle HTML strings\n\
		if ( typeof selector === \"string\" ) {\n\
			// Are we dealing with HTML string or an ID?\n\
			if ( selector.charAt(0) === \"<\" && selector.charAt( selector.length - 1 ) === \">\" && selector.length >= 3 ) {\n\
				// Assume that strings that start and end with <> are HTML and skip the regex check\n\
				match = [ null, selector, null ];\n\
\n\
			} else {\n\
				match = quickExpr.exec( selector );\n\
			}\n\
\n\
			// Verify a match, and that no context was specified for #id\n\
			if ( match && (match[1] || !context) ) {\n\
\n\
				// HANDLE: $(html) -> $(array)\n\
				if ( match[1] ) {\n\
					context = context instanceof jQuery ? context[0] : context;\n\
					doc = (context ? context.ownerDocument || context : document);\n\
\n\
					// If a single string is passed in and it's a single tag\n\
					// just do a createElement and skip the rest\n\
					ret = rsingleTag.exec( selector );\n\
\n\
					if ( ret ) {\n\
						if ( jQuery.isPlainObject( context ) ) {\n\
							selector = [ document.createElement( ret[1] ) ];\n\
							jQuery.fn.attr.call( selector, context, true );\n\
\n\
						} else {\n\
							selector = [ doc.createElement( ret[1] ) ];\n\
						}\n\
\n\
					} else {\n\
						ret = jQuery.buildFragment( [ match[1] ], [ doc ] );\n\
						selector = (ret.cacheable ? jQuery.clone(ret.fragment) : ret.fragment).childNodes;\n\
					}\n\
\n\
					return jQuery.merge( this, selector );\n\
\n\
				// HANDLE: $(\"#id\")\n\
				} else {\n\
					elem = document.getElementById( match[2] );\n\
\n\
					// Check parentNode to catch when Blackberry 4.6 returns\n\
					// nodes that are no longer in the document #6963\n\
					if ( elem && elem.parentNode ) {\n\
						// Handle the case where IE and Opera return items\n\
						// by name instead of ID\n\
						if ( elem.id !== match[2] ) {\n\
							return rootjQuery.find( selector );\n\
						}\n\
\n\
						// Otherwise, we inject the element directly into the jQuery object\n\
						this.length = 1;\n\
						this[0] = elem;\n\
					}\n\
\n\
					this.context = document;\n\
					this.selector = selector;\n\
					return this;\n\
				}\n\
\n\
			// HANDLE: $(expr, $(...))\n\
			} else if ( !context || context.jquery ) {\n\
				return (context || rootjQuery).find( selector );\n\
\n\
			// HANDLE: $(expr, context)\n\
			// (which is just equivalent to: $(context).find(expr)\n\
			} else {\n\
				return this.constructor( context ).find( selector );\n\
			}\n\
\n\
		// HANDLE: $(function)\n\
		// Shortcut for document ready\n\
		} else if ( jQuery.isFunction( selector ) ) {\n\
			return rootjQuery.ready( selector );\n\
		}\n\
\n\
		if (selector.selector !== undefined) {\n\
			this.selector = selector.selector;\n\
			this.context = selector.context;\n\
		}\n\
\n\
		return jQuery.makeArray( selector, this );\n\
	},\n\
\n\
	// Start with an empty selector\n\
	selector: \"\",\n\
\n\
	// The current version of jQuery being used\n\
	jquery: \"1.6.4\",\n\
\n\
	// The default length of a jQuery object is 0\n\
	length: 0,\n\
\n\
	// The number of elements contained in the matched element set\n\
	size: function() {\n\
		return this.length;\n\
	},\n\
\n\
	toArray: function() {\n\
		return slice.call( this, 0 );\n\
	},\n\
\n\
	// Get the Nth element in the matched element set OR\n\
	// Get the whole matched element set as a clean array\n\
	get: function( num ) {\n\
		return num == null ?\n\
\n\
			// Return a 'clean' array\n\
			this.toArray() :\n\
\n\
			// Return just the object\n\
			( num < 0 ? this[ this.length + num ] : this[ num ] );\n\
	},\n\
\n\
	// Take an array of elements and push it onto the stack\n\
	// (returning the new matched element set)\n\
	pushStack: function( elems, name, selector ) {\n\
		// Build a new jQuery matched element set\n\
		var ret = this.constructor();\n\
\n\
		if ( jQuery.isArray( elems ) ) {\n\
			push.apply( ret, elems );\n\
\n\
		} else {\n\
			jQuery.merge( ret, elems );\n\
		}\n\
\n\
		// Add the old object onto the stack (as a reference)\n\
		ret.prevObject = this;\n\
\n\
		ret.context = this.context;\n\
\n\
		if ( name === \"find\" ) {\n\
			ret.selector = this.selector + (this.selector ? \" \" : \"\") + selector;\n\
		} else if ( name ) {\n\
			ret.selector = this.selector + \".\" + name + \"(\" + selector + \")\";\n\
		}\n\
\n\
		// Return the newly-formed element set\n\
		return ret;\n\
	},\n\
\n\
	// Execute a callback for every element in the matched set.\n\
	// (You can seed the arguments with an array of args, but this is\n\
	// only used internally.)\n\
	each: function( callback, args ) {\n\
		return jQuery.each( this, callback, args );\n\
	},\n\
\n\
	ready: function( fn ) {\n\
		// Attach the listeners\n\
		jQuery.bindReady();\n\
\n\
		// Add the callback\n\
		readyList.done( fn );\n\
\n\
		return this;\n\
	},\n\
\n\
	eq: function( i ) {\n\
		return i === -1 ?\n\
			this.slice( i ) :\n\
			this.slice( i, +i + 1 );\n\
	},\n\
\n\
	first: function() {\n\
		return this.eq( 0 );\n\
	},\n\
\n\
	last: function() {\n\
		return this.eq( -1 );\n\
	},\n\
\n\
	slice: function() {\n\
		return this.pushStack( slice.apply( this, arguments ),\n\
			\"slice\", slice.call(arguments).join(\",\") );\n\
	},\n\
\n\
	map: function( callback ) {\n\
		return this.pushStack( jQuery.map(this, function( elem, i ) {\n\
			return callback.call( elem, i, elem );\n\
		}));\n\
	},\n\
\n\
	end: function() {\n\
		return this.prevObject || this.constructor(null);\n\
	},\n\
\n\
	// For internal use only.\n\
	// Behaves like an Array's method, not like a jQuery method.\n\
	push: push,\n\
	sort: [].sort,\n\
	splice: [].splice\n\
};\n\
\n\
// Give the init function the jQuery prototype for later instantiation\n\
jQuery.fn.init.prototype = jQuery.fn;\n\
\n\
jQuery.extend = jQuery.fn.extend = function() {\n\
	var options, name, src, copy, copyIsArray, clone,\n\
		target = arguments[0] || {},\n\
		i = 1,\n\
		length = arguments.length,\n\
		deep = false;\n\
\n\
	// Handle a deep copy situation\n\
	if ( typeof target === \"boolean\" ) {\n\
		deep = target;\n\
		target = arguments[1] || {};\n\
		// skip the boolean and the target\n\
		i = 2;\n\
	}\n\
\n\
	// Handle case when target is a string or something (possible in deep copy)\n\
	if ( typeof target !== \"object\" && !jQuery.isFunction(target) ) {\n\
		target = {};\n\
	}\n\
\n\
	// extend jQuery itself if only one argument is passed\n\
	if ( length === i ) {\n\
		target = this;\n\
		--i;\n\
	}\n\
\n\
	for ( ; i < length; i++ ) {\n\
		// Only deal with non-null/undefined values\n\
		if ( (options = arguments[ i ]) != null ) {\n\
			// Extend the base object\n\
			for ( name in options ) {\n\
				src = target[ name ];\n\
				copy = options[ name ];\n\
\n\
				// Prevent never-ending loop\n\
				if ( target === copy ) {\n\
					continue;\n\
				}\n\
\n\
				// Recurse if we're merging plain objects or arrays\n\
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {\n\
					if ( copyIsArray ) {\n\
						copyIsArray = false;\n\
						clone = src && jQuery.isArray(src) ? src : [];\n\
\n\
					} else {\n\
						clone = src && jQuery.isPlainObject(src) ? src : {};\n\
					}\n\
\n\
					// Never move original objects, clone them\n\
					target[ name ] = jQuery.extend( deep, clone, copy );\n\
\n\
				// Don't bring in undefined values\n\
				} else if ( copy !== undefined ) {\n\
					target[ name ] = copy;\n\
				}\n\
			}\n\
		}\n\
	}\n\
\n\
	// Return the modified object\n\
	return target;\n\
};\n\
\n\
jQuery.extend({\n\
	noConflict: function( deep ) {\n\
		if ( window.$ === jQuery ) {\n\
			window.$ = _$;\n\
		}\n\
\n\
		if ( deep && window.jQuery === jQuery ) {\n\
			window.jQuery = _jQuery;\n\
		}\n\
\n\
		return jQuery;\n\
	},\n\
\n\
	// Is the DOM ready to be used? Set to true once it occurs.\n\
	isReady: false,\n\
\n\
	// A counter to track how many items to wait for before\n\
	// the ready event fires. See #6781\n\
	readyWait: 1,\n\
\n\
	// Hold (or release) the ready event\n\
	holdReady: function( hold ) {\n\
		if ( hold ) {\n\
			jQuery.readyWait++;\n\
		} else {\n\
			jQuery.ready( true );\n\
		}\n\
	},\n\
\n\
	// Handle when the DOM is ready\n\
	ready: function( wait ) {\n\
		// Either a released hold or an DOMready/load event and not yet ready\n\
		if ( (wait === true && !--jQuery.readyWait) || (wait !== true && !jQuery.isReady) ) {\n\
			// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).\n\
			if ( !document.body ) {\n\
				return setTimeout( jQuery.ready, 1 );\n\
			}\n\
\n\
			// Remember that the DOM is ready\n\
			jQuery.isReady = true;\n\
\n\
			// If a normal DOM Ready event fired, decrement, and wait if need be\n\
			if ( wait !== true && --jQuery.readyWait > 0 ) {\n\
				return;\n\
			}\n\
\n\
			// If there are functions bound, to execute\n\
			readyList.resolveWith( document, [ jQuery ] );\n\
\n\
			// Trigger any bound ready events\n\
			if ( jQuery.fn.trigger ) {\n\
				jQuery( document ).trigger( \"ready\" ).unbind( \"ready\" );\n\
			}\n\
		}\n\
	},\n\
\n\
	bindReady: function() {\n\
		if ( readyList ) {\n\
			return;\n\
		}\n\
\n\
		readyList = jQuery._Deferred();\n\
\n\
		// Catch cases where $(document).ready() is called after the\n\
		// browser event has already occurred.\n\
		if ( document.readyState === \"complete\" ) {\n\
			// Handle it asynchronously to allow scripts the opportunity to delay ready\n\
			return setTimeout( jQuery.ready, 1 );\n\
		}\n\
\n\
		// Mozilla, Opera and webkit nightlies currently support this event\n\
		if ( document.addEventListener ) {\n\
			// Use the handy event callback\n\
			document.addEventListener( \"DOMContentLoaded\", DOMContentLoaded, false );\n\
\n\
			// A fallback to window.onload, that will always work\n\
			window.addEventListener( \"load\", jQuery.ready, false );\n\
\n\
		// If IE event model is used\n\
		} else if ( document.attachEvent ) {\n\
			// ensure firing before onload,\n\
			// maybe late but safe also for iframes\n\
			document.attachEvent( \"onreadystatechange\", DOMContentLoaded );\n\
\n\
			// A fallback to window.onload, that will always work\n\
			window.attachEvent( \"onload\", jQuery.ready );\n\
\n\
			// If IE and not a frame\n\
			// continually check to see if the document is ready\n\
			var toplevel = false;\n\
\n\
			try {\n\
				toplevel = window.frameElement == null;\n\
			} catch(e) {}\n\
\n\
			if ( document.documentElement.doScroll && toplevel ) {\n\
				doScrollCheck();\n\
			}\n\
		}\n\
	},\n\
\n\
	// See test/unit/core.js for details concerning isFunction.\n\
	// Since version 1.3, DOM methods and functions like alert\n\
	// aren't supported. They return false on IE (#2968).\n\
	isFunction: function( obj ) {\n\
		return jQuery.type(obj) === \"function\";\n\
	},\n\
\n\
	isArray: Array.isArray || function( obj ) {\n\
		return jQuery.type(obj) === \"array\";\n\
	},\n\
\n\
	// A crude way of determining if an object is a window\n\
	isWindow: function( obj ) {\n\
		return obj && typeof obj === \"object\" && \"setInterval\" in obj;\n\
	},\n\
\n\
	isNaN: function( obj ) {\n\
		return obj == null || !rdigit.test( obj ) || isNaN( obj );\n\
	},\n\
\n\
	type: function( obj ) {\n\
		return obj == null ?\n\
			String( obj ) :\n\
			class2type[ toString.call(obj) ] || \"object\";\n\
	},\n\
\n\
	isPlainObject: function( obj ) {\n\
		// Must be an Object.\n\
		// Because of IE, we also have to check the presence of the constructor property.\n\
		// Make sure that DOM nodes and window objects don't pass through, as well\n\
		if ( !obj || jQuery.type(obj) !== \"object\" || obj.nodeType || jQuery.isWindow( obj ) ) {\n\
			return false;\n\
		}\n\
\n\
		try {\n\
			// Not own constructor property must be Object\n\
			if ( obj.constructor &&\n\
				!hasOwn.call(obj, \"constructor\") &&\n\
				!hasOwn.call(obj.constructor.prototype, \"isPrototypeOf\") ) {\n\
				return false;\n\
			}\n\
		} catch ( e ) {\n\
			// IE8,9 Will throw exceptions on certain host objects #9897\n\
			return false;\n\
		}\n\
\n\
		// Own properties are enumerated firstly, so to speed up,\n\
		// if last one is own, then all properties are own.\n\
\n\
		var key;\n\
		for ( key in obj ) {}\n\
\n\
		return key === undefined || hasOwn.call( obj, key );\n\
	},\n\
\n\
	isEmptyObject: function( obj ) {\n\
		for ( var name in obj ) {\n\
			return false;\n\
		}\n\
		return true;\n\
	},\n\
\n\
	error: function( msg ) {\n\
		throw msg;\n\
	},\n\
\n\
	parseJSON: function( data ) {\n\
		if ( typeof data !== \"string\" || !data ) {\n\
			return null;\n\
		}\n\
\n\
		// Make sure leading/trailing whitespace is removed (IE can't handle it)\n\
		data = jQuery.trim( data );\n\
\n\
		// Attempt to parse using the native JSON parser first\n\
		if ( window.JSON && window.JSON.parse ) {\n\
			return window.JSON.parse( data );\n\
		}\n\
\n\
		// Make sure the incoming data is actual JSON\n\
		// Logic borrowed from http://json.org/json2.js\n\
		if ( rvalidchars.test( data.replace( rvalidescape, \"@\" )\n\
			.replace( rvalidtokens, \"]\" )\n\
			.replace( rvalidbraces, \"\")) ) {\n\
\n\
			return (new Function( \"return \" + data ))();\n\
\n\
		}\n\
		jQuery.error( \"Invalid JSON: \" + data );\n\
	},\n\
\n\
	// Cross-browser xml parsing\n\
	parseXML: function( data ) {\n\
		var xml, tmp;\n\
		try {\n\
			if ( window.DOMParser ) { // Standard\n\
				tmp = new DOMParser();\n\
				xml = tmp.parseFromString( data , \"text/xml\" );\n\
			} else { // IE\n\
				xml = new ActiveXObject( \"Microsoft.XMLDOM\" );\n\
				xml.async = \"false\";\n\
				xml.loadXML( data );\n\
			}\n\
		} catch( e ) {\n\
			xml = undefined;\n\
		}\n\
		if ( !xml || !xml.documentElement || xml.getElementsByTagName( \"parsererror\" ).length ) {\n\
			jQuery.error( \"Invalid XML: \" + data );\n\
		}\n\
		return xml;\n\
	},\n\
\n\
	noop: function() {},\n\
\n\
	// Evaluates a script in a global context\n\
	// Workarounds based on findings by Jim Driscoll\n\
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context\n\
	globalEval: function( data ) {\n\
		if ( data && rnotwhite.test( data ) ) {\n\
			// We use execScript on Internet Explorer\n\
			// We use an anonymous function so that context is window\n\
			// rather than jQuery in Firefox\n\
			( window.execScript || function( data ) {\n\
				window[ \"eval\" ].call( window, data );\n\
			} )( data );\n\
		}\n\
	},\n\
\n\
	// Convert dashed to camelCase; used by the css and data modules\n\
	// Microsoft forgot to hump their vendor prefix (#9572)\n\
	camelCase: function( string ) {\n\
		return string.replace( rmsPrefix, \"ms-\" ).replace( rdashAlpha, fcamelCase );\n\
	},\n\
\n\
	nodeName: function( elem, name ) {\n\
		return elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase();\n\
	},\n\
\n\
	// args is for internal usage only\n\
	each: function( object, callback, args ) {\n\
		var name, i = 0,\n\
			length = object.length,\n\
			isObj = length === undefined || jQuery.isFunction( object );\n\
\n\
		if ( args ) {\n\
			if ( isObj ) {\n\
				for ( name in object ) {\n\
					if ( callback.apply( object[ name ], args ) === false ) {\n\
						break;\n\
					}\n\
				}\n\
			} else {\n\
				for ( ; i < length; ) {\n\
					if ( callback.apply( object[ i++ ], args ) === false ) {\n\
						break;\n\
					}\n\
				}\n\
			}\n\
\n\
		// A special, fast, case for the most common use of each\n\
		} else {\n\
			if ( isObj ) {\n\
				for ( name in object ) {\n\
					if ( callback.call( object[ name ], name, object[ name ] ) === false ) {\n\
						break;\n\
					}\n\
				}\n\
			} else {\n\
				for ( ; i < length; ) {\n\
					if ( callback.call( object[ i ], i, object[ i++ ] ) === false ) {\n\
						break;\n\
					}\n\
				}\n\
			}\n\
		}\n\
\n\
		return object;\n\
	},\n\
\n\
	// Use native String.trim function wherever possible\n\
	trim: trim ?\n\
		function( text ) {\n\
			return text == null ?\n\
				\"\" :\n\
				trim.call( text );\n\
		} :\n\
\n\
		// Otherwise use our own trimming functionality\n\
		function( text ) {\n\
			return text == null ?\n\
				\"\" :\n\
				text.toString().replace( trimLeft, \"\" ).replace( trimRight, \"\" );\n\
		},\n\
\n\
	// results is for internal usage only\n\
	makeArray: function( array, results ) {\n\
		var ret = results || [];\n\
\n\
		if ( array != null ) {\n\
			// The window, strings (and functions) also have 'length'\n\
			// The extra typeof function check is to prevent crashes\n\
			// in Safari 2 (See: #3039)\n\
			// Tweaked logic slightly to handle Blackberry 4.7 RegExp issues #6930\n\
			var type = jQuery.type( array );\n\
\n\
			if ( array.length == null || type === \"string\" || type === \"function\" || type === \"regexp\" || jQuery.isWindow( array ) ) {\n\
				push.call( ret, array );\n\
			} else {\n\
				jQuery.merge( ret, array );\n\
			}\n\
		}\n\
\n\
		return ret;\n\
	},\n\
\n\
	inArray: function( elem, array ) {\n\
		if ( !array ) {\n\
			return -1;\n\
		}\n\
\n\
		if ( indexOf ) {\n\
			return indexOf.call( array, elem );\n\
		}\n\
\n\
		for ( var i = 0, length = array.length; i < length; i++ ) {\n\
			if ( array[ i ] === elem ) {\n\
				return i;\n\
			}\n\
		}\n\
\n\
		return -1;\n\
	},\n\
\n\
	merge: function( first, second ) {\n\
		var i = first.length,\n\
			j = 0;\n\
\n\
		if ( typeof second.length === \"number\" ) {\n\
			for ( var l = second.length; j < l; j++ ) {\n\
				first[ i++ ] = second[ j ];\n\
			}\n\
\n\
		} else {\n\
			while ( second[j] !== undefined ) {\n\
				first[ i++ ] = second[ j++ ];\n\
			}\n\
		}\n\
\n\
		first.length = i;\n\
\n\
		return first;\n\
	},\n\
\n\
	grep: function( elems, callback, inv ) {\n\
		var ret = [], retVal;\n\
		inv = !!inv;\n\
\n\
		// Go through the array, only saving the items\n\
		// that pass the validator function\n\
		for ( var i = 0, length = elems.length; i < length; i++ ) {\n\
			retVal = !!callback( elems[ i ], i );\n\
			if ( inv !== retVal ) {\n\
				ret.push( elems[ i ] );\n\
			}\n\
		}\n\
\n\
		return ret;\n\
	},\n\
\n\
	// arg is for internal usage only\n\
	map: function( elems, callback, arg ) {\n\
		var value, key, ret = [],\n\
			i = 0,\n\
			length = elems.length,\n\
			// jquery objects are treated as arrays\n\
			isArray = elems instanceof jQuery || length !== undefined && typeof length === \"number\" && ( ( length > 0 && elems[ 0 ] && elems[ length -1 ] ) || length === 0 || jQuery.isArray( elems ) ) ;\n\
\n\
		// Go through the array, translating each of the items to their\n\
		if ( isArray ) {\n\
			for ( ; i < length; i++ ) {\n\
				value = callback( elems[ i ], i, arg );\n\
\n\
				if ( value != null ) {\n\
					ret[ ret.length ] = value;\n\
				}\n\
			}\n\
\n\
		// Go through every key on the object,\n\
		} else {\n\
			for ( key in elems ) {\n\
				value = callback( elems[ key ], key, arg );\n\
\n\
				if ( value != null ) {\n\
					ret[ ret.length ] = value;\n\
				}\n\
			}\n\
		}\n\
\n\
		// Flatten any nested arrays\n\
		return ret.concat.apply( [], ret );\n\
	},\n\
\n\
	// A global GUID counter for objects\n\
	guid: 1,\n\
\n\
	// Bind a function to a context, optionally partially applying any\n\
	// arguments.\n\
	proxy: function( fn, context ) {\n\
		if ( typeof context === \"string\" ) {\n\
			var tmp = fn[ context ];\n\
			context = fn;\n\
			fn = tmp;\n\
		}\n\
\n\
		// Quick check to determine if target is callable, in the spec\n\
		// this throws a TypeError, but we will just return undefined.\n\
		if ( !jQuery.isFunction( fn ) ) {\n\
			return undefined;\n\
		}\n\
\n\
		// Simulated bind\n\
		var args = slice.call( arguments, 2 ),\n\
			proxy = function() {\n\
				return fn.apply( context, args.concat( slice.call( arguments ) ) );\n\
			};\n\
\n\
		// Set the guid of unique handler to the same of original handler, so it can be removed\n\
		proxy.guid = fn.guid = fn.guid || proxy.guid || jQuery.guid++;\n\
\n\
		return proxy;\n\
	},\n\
\n\
	// Mutifunctional method to get and set values to a collection\n\
	// The value/s can optionally be executed if it's a function\n\
	access: function( elems, key, value, exec, fn, pass ) {\n\
		var length = elems.length;\n\
\n\
		// Setting many attributes\n\
		if ( typeof key === \"object\" ) {\n\
			for ( var k in key ) {\n\
				jQuery.access( elems, k, key[k], exec, fn, value );\n\
			}\n\
			return elems;\n\
		}\n\
\n\
		// Setting one attribute\n\
		if ( value !== undefined ) {\n\
			// Optionally, function values get executed if exec is true\n\
			exec = !pass && exec && jQuery.isFunction(value);\n\
\n\
			for ( var i = 0; i < length; i++ ) {\n\
				fn( elems[i], key, exec ? value.call( elems[i], i, fn( elems[i], key ) ) : value, pass );\n\
			}\n\
\n\
			return elems;\n\
		}\n\
\n\
		// Getting an attribute\n\
		return length ? fn( elems[0], key ) : undefined;\n\
	},\n\
\n\
	now: function() {\n\
		return (new Date()).getTime();\n\
	},\n\
\n\
	// Use of jQuery.browser is frowned upon.\n\
	// More details: http://docs.jquery.com/Utilities/jQuery.browser\n\
	uaMatch: function( ua ) {\n\
		ua = ua.toLowerCase();\n\
\n\
		var match = rwebkit.exec( ua ) ||\n\
			ropera.exec( ua ) ||\n\
			rmsie.exec( ua ) ||\n\
			ua.indexOf(\"compatible\") < 0 && rmozilla.exec( ua ) ||\n\
			[];\n\
\n\
		return { browser: match[1] || \"\", version: match[2] || \"0\" };\n\
	},\n\
\n\
	sub: function() {\n\
		function jQuerySub( selector, context ) {\n\
			return new jQuerySub.fn.init( selector, context );\n\
		}\n\
		jQuery.extend( true, jQuerySub, this );\n\
		jQuerySub.superclass = this;\n\
		jQuerySub.fn = jQuerySub.prototype = this();\n\
		jQuerySub.fn.constructor = jQuerySub;\n\
		jQuerySub.sub = this.sub;\n\
		jQuerySub.fn.init = function init( selector, context ) {\n\
			if ( context && context instanceof jQuery && !(context instanceof jQuerySub) ) {\n\
				context = jQuerySub( context );\n\
			}\n\
\n\
			return jQuery.fn.init.call( this, selector, context, rootjQuerySub );\n\
		};\n\
		jQuerySub.fn.init.prototype = jQuerySub.fn;\n\
		var rootjQuerySub = jQuerySub(document);\n\
		return jQuerySub;\n\
	},\n\
\n\
	browser: {}\n\
});\n\
\n\
// Populate the class2type map\n\
jQuery.each(\"Boolean Number String Function Array Date RegExp Object\".split(\" \"), function(i, name) {\n\
	class2type[ \"[object \" + name + \"]\" ] = name.toLowerCase();\n\
});\n\
\n\
browserMatch = jQuery.uaMatch( userAgent );\n\
if ( browserMatch.browser ) {\n\
	jQuery.browser[ browserMatch.browser ] = true;\n\
	jQuery.browser.version = browserMatch.version;\n\
}\n\
\n\
// Deprecated, use jQuery.browser.webkit instead\n\
if ( jQuery.browser.webkit ) {\n\
	jQuery.browser.safari = true;\n\
}\n\
\n\
// IE doesn't match non-breaking spaces with \\s\n\
if ( rnotwhite.test( \"\\xA0\" ) ) {\n\
	trimLeft = /^[\\s\\xA0]+/;\n\
	trimRight = /[\\s\\xA0]+$/;\n\
}\n\
\n\
// All jQuery objects should point back to these\n\
rootjQuery = jQuery(document);\n\
\n\
// Cleanup functions for the document ready method\n\
if ( document.addEventListener ) {\n\
	DOMContentLoaded = function() {\n\
		document.removeEventListener( \"DOMContentLoaded\", DOMContentLoaded, false );\n\
		jQuery.ready();\n\
	};\n\
\n\
} else if ( document.attachEvent ) {\n\
	DOMContentLoaded = function() {\n\
		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).\n\
		if ( document.readyState === \"complete\" ) {\n\
			document.detachEvent( \"onreadystatechange\", DOMContentLoaded );\n\
			jQuery.ready();\n\
		}\n\
	};\n\
}\n\
\n\
// The DOM ready check for Internet Explorer\n\
function doScrollCheck() {\n\
	if ( jQuery.isReady ) {\n\
		return;\n\
	}\n\
\n\
	try {\n\
		// If IE is used, use the trick by Diego Perini\n\
		// http://javascript.nwbox.com/IEContentLoaded/\n\
		document.documentElement.doScroll(\"left\");\n\
	} catch(e) {\n\
		setTimeout( doScrollCheck, 1 );\n\
		return;\n\
	}\n\
\n\
	// and execute any waiting functions\n\
	jQuery.ready();\n\
}\n\
\n\
return jQuery;\n\
\n\
})();\n\
\n\
\n\
var // Promise methods\n\
	promiseMethods = \"done fail isResolved isRejected promise then always pipe\".split( \" \" ),\n\
	// Static reference to slice\n\
	sliceDeferred = [].slice;\n\
\n\
jQuery.extend({\n\
	// Create a simple deferred (one callbacks list)\n\
	_Deferred: function() {\n\
		var // callbacks list\n\
			callbacks = [],\n\
			// stored [ context , args ]\n\
			fired,\n\
			// to avoid firing when already doing so\n\
			firing,\n\
			// flag to know if the deferred has been cancelled\n\
			cancelled,\n\
			// the deferred itself\n\
			deferred  = {\n\
\n\
				// done( f1, f2, ...)\n\
				done: function() {\n\
					if ( !cancelled ) {\n\
						var args = arguments,\n\
							i,\n\
							length,\n\
							elem,\n\
							type,\n\
							_fired;\n\
						if ( fired ) {\n\
							_fired = fired;\n\
							fired = 0;\n\
						}\n\
						for ( i = 0, length = args.length; i < length; i++ ) {\n\
							elem = args[ i ];\n\
							type = jQuery.type( elem );\n\
							if ( type === \"array\" ) {\n\
								deferred.done.apply( deferred, elem );\n\
							} else if ( type === \"function\" ) {\n\
								callbacks.push( elem );\n\
							}\n\
						}\n\
						if ( _fired ) {\n\
							deferred.resolveWith( _fired[ 0 ], _fired[ 1 ] );\n\
						}\n\
					}\n\
					return this;\n\
				},\n\
\n\
				// resolve with given context and args\n\
				resolveWith: function( context, args ) {\n\
					if ( !cancelled && !fired && !firing ) {\n\
						// make sure args are available (#8421)\n\
						args = args || [];\n\
						firing = 1;\n\
						try {\n\
							while( callbacks[ 0 ] ) {\n\
								callbacks.shift().apply( context, args );\n\
							}\n\
						}\n\
						finally {\n\
							fired = [ context, args ];\n\
							firing = 0;\n\
						}\n\
					}\n\
					return this;\n\
				},\n\
\n\
				// resolve with this as context and given arguments\n\
				resolve: function() {\n\
					deferred.resolveWith( this, arguments );\n\
					return this;\n\
				},\n\
\n\
				// Has this deferred been resolved?\n\
				isResolved: function() {\n\
					return !!( firing || fired );\n\
				},\n\
\n\
				// Cancel\n\
				cancel: function() {\n\
					cancelled = 1;\n\
					callbacks = [];\n\
					return this;\n\
				}\n\
			};\n\
\n\
		return deferred;\n\
	},\n\
\n\
	// Full fledged deferred (two callbacks list)\n\
	Deferred: function( func ) {\n\
		var deferred = jQuery._Deferred(),\n\
			failDeferred = jQuery._Deferred(),\n\
			promise;\n\
		// Add errorDeferred methods, then and promise\n\
		jQuery.extend( deferred, {\n\
			then: function( doneCallbacks, failCallbacks ) {\n\
				deferred.done( doneCallbacks ).fail( failCallbacks );\n\
				return this;\n\
			},\n\
			always: function() {\n\
				return deferred.done.apply( deferred, arguments ).fail.apply( this, arguments );\n\
			},\n\
			fail: failDeferred.done,\n\
			rejectWith: failDeferred.resolveWith,\n\
			reject: failDeferred.resolve,\n\
			isRejected: failDeferred.isResolved,\n\
			pipe: function( fnDone, fnFail ) {\n\
				return jQuery.Deferred(function( newDefer ) {\n\
					jQuery.each( {\n\
						done: [ fnDone, \"resolve\" ],\n\
						fail: [ fnFail, \"reject\" ]\n\
					}, function( handler, data ) {\n\
						var fn = data[ 0 ],\n\
							action = data[ 1 ],\n\
							returned;\n\
						if ( jQuery.isFunction( fn ) ) {\n\
							deferred[ handler ](function() {\n\
								returned = fn.apply( this, arguments );\n\
								if ( returned && jQuery.isFunction( returned.promise ) ) {\n\
									returned.promise().then( newDefer.resolve, newDefer.reject );\n\
								} else {\n\
									newDefer[ action + \"With\" ]( this === deferred ? newDefer : this, [ returned ] );\n\
								}\n\
							});\n\
						} else {\n\
							deferred[ handler ]( newDefer[ action ] );\n\
						}\n\
					});\n\
				}).promise();\n\
			},\n\
			// Get a promise for this deferred\n\
			// If obj is provided, the promise aspect is added to the object\n\
			promise: function( obj ) {\n\
				if ( obj == null ) {\n\
					if ( promise ) {\n\
						return promise;\n\
					}\n\
					promise = obj = {};\n\
				}\n\
				var i = promiseMethods.length;\n\
				while( i-- ) {\n\
					obj[ promiseMethods[i] ] = deferred[ promiseMethods[i] ];\n\
				}\n\
				return obj;\n\
			}\n\
		});\n\
		// Make sure only one callback list will be used\n\
		deferred.done( failDeferred.cancel ).fail( deferred.cancel );\n\
		// Unexpose cancel\n\
		delete deferred.cancel;\n\
		// Call given func if any\n\
		if ( func ) {\n\
			func.call( deferred, deferred );\n\
		}\n\
		return deferred;\n\
	},\n\
\n\
	// Deferred helper\n\
	when: function( firstParam ) {\n\
		var args = arguments,\n\
			i = 0,\n\
			length = args.length,\n\
			count = length,\n\
			deferred = length <= 1 && firstParam && jQuery.isFunction( firstParam.promise ) ?\n\
				firstParam :\n\
				jQuery.Deferred();\n\
		function resolveFunc( i ) {\n\
			return function( value ) {\n\
				args[ i ] = arguments.length > 1 ? sliceDeferred.call( arguments, 0 ) : value;\n\
				if ( !( --count ) ) {\n\
					// Strange bug in FF4:\n\
					// Values changed onto the arguments object sometimes end up as undefined values\n\
					// outside the $.when method. Cloning the object into a fresh array solves the issue\n\
					deferred.resolveWith( deferred, sliceDeferred.call( args, 0 ) );\n\
				}\n\
			};\n\
		}\n\
		if ( length > 1 ) {\n\
			for( ; i < length; i++ ) {\n\
				if ( args[ i ] && jQuery.isFunction( args[ i ].promise ) ) {\n\
					args[ i ].promise().then( resolveFunc(i), deferred.reject );\n\
				} else {\n\
					--count;\n\
				}\n\
			}\n\
			if ( !count ) {\n\
				deferred.resolveWith( deferred, args );\n\
			}\n\
		} else if ( deferred !== firstParam ) {\n\
			deferred.resolveWith( deferred, length ? [ firstParam ] : [] );\n\
		}\n\
		return deferred.promise();\n\
	}\n\
});\n\
\n\
\n\
\n\
jQuery.support = (function() {\n\
\n\
	var div = document.createElement( \"div\" ),\n\
		documentElement = document.documentElement,\n\
		all,\n\
		a,\n\
		select,\n\
		opt,\n\
		input,\n\
		marginDiv,\n\
		support,\n\
		fragment,\n\
		body,\n\
		testElementParent,\n\
		testElement,\n\
		testElementStyle,\n\
		tds,\n\
		events,\n\
		eventName,\n\
		i,\n\
		isSupported;\n\
\n\
	// Preliminary tests\n\
	div.setAttribute(\"className\", \"t\");\n\
	div.innerHTML = \"   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>\";\n\
\n\
\n\
	all = div.getElementsByTagName( \"*\" );\n\
	a = div.getElementsByTagName( \"a\" )[ 0 ];\n\
\n\
	// Can't get basic test support\n\
	if ( !all || !all.length || !a ) {\n\
		return {};\n\
	}\n\
\n\
	// First batch of supports tests\n\
	select = document.createElement( \"select\" );\n\
	opt = select.appendChild( document.createElement(\"option\") );\n\
	input = div.getElementsByTagName( \"input\" )[ 0 ];\n\
\n\
	support = {\n\
		// IE strips leading whitespace when .innerHTML is used\n\
		leadingWhitespace: ( div.firstChild.nodeType === 3 ),\n\
\n\
		// Make sure that tbody elements aren't automatically inserted\n\
		// IE will insert them into empty tables\n\
		tbody: !div.getElementsByTagName( \"tbody\" ).length,\n\
\n\
		// Make sure that link elements get serialized correctly by innerHTML\n\
		// This requires a wrapper element in IE\n\
		htmlSerialize: !!div.getElementsByTagName( \"link\" ).length,\n\
\n\
		// Get the style information from getAttribute\n\
		// (IE uses .cssText instead)\n\
		style: /top/.test( a.getAttribute(\"style\") ),\n\
\n\
		// Make sure that URLs aren't manipulated\n\
		// (IE normalizes it by default)\n\
		hrefNormalized: ( a.getAttribute( \"href\" ) === \"/a\" ),\n\
\n\
		// Make sure that element opacity exists\n\
		// (IE uses filter instead)\n\
		// Use a regex to work around a WebKit issue. See #5145\n\
		opacity: /^0.55$/.test( a.style.opacity ),\n\
\n\
		// Verify style float existence\n\
		// (IE uses styleFloat instead of cssFloat)\n\
		cssFloat: !!a.style.cssFloat,\n\
\n\
		// Make sure that if no value is specified for a checkbox\n\
		// that it defaults to \"on\".\n\
		// (WebKit defaults to \"\" instead)\n\
		checkOn: ( input.value === \"on\" ),\n\
\n\
		// Make sure that a selected-by-default option has a working selected property.\n\
		// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)\n\
		optSelected: opt.selected,\n\
\n\
		// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)\n\
		getSetAttribute: div.className !== \"t\",\n\
\n\
		// Will be defined later\n\
		submitBubbles: true,\n\
		changeBubbles: true,\n\
		focusinBubbles: false,\n\
		deleteExpando: true,\n\
		noCloneEvent: true,\n\
		inlineBlockNeedsLayout: false,\n\
		shrinkWrapBlocks: false,\n\
		reliableMarginRight: true\n\
	};\n\
\n\
	// Make sure checked status is properly cloned\n\
	input.checked = true;\n\
	support.noCloneChecked = input.cloneNode( true ).checked;\n\
\n\
	// Make sure that the options inside disabled selects aren't marked as disabled\n\
	// (WebKit marks them as disabled)\n\
	select.disabled = true;\n\
	support.optDisabled = !opt.disabled;\n\
\n\
	// Test to see if it's possible to delete an expando from an element\n\
	// Fails in Internet Explorer\n\
	try {\n\
		delete div.test;\n\
	} catch( e ) {\n\
		support.deleteExpando = false;\n\
	}\n\
\n\
	if ( !div.addEventListener && div.attachEvent && div.fireEvent ) {\n\
		div.attachEvent( \"onclick\", function() {\n\
			// Cloning a node shouldn't copy over any\n\
			// bound event handlers (IE does this)\n\
			support.noCloneEvent = false;\n\
		});\n\
		div.cloneNode( true ).fireEvent( \"onclick\" );\n\
	}\n\
\n\
	// Check if a radio maintains it's value\n\
	// after being appended to the DOM\n\
	input = document.createElement(\"input\");\n\
	input.value = \"t\";\n\
	input.setAttribute(\"type\", \"radio\");\n\
	support.radioValue = input.value === \"t\";\n\
\n\
	input.setAttribute(\"checked\", \"checked\");\n\
	div.appendChild( input );\n\
	fragment = document.createDocumentFragment();\n\
	fragment.appendChild( div.firstChild );\n\
\n\
	// WebKit doesn't clone checked state correctly in fragments\n\
	support.checkClone = fragment.cloneNode( true ).cloneNode( true ).lastChild.checked;\n\
\n\
	div.innerHTML = \"\";\n\
\n\
	// Figure out if the W3C box model works as expected\n\
	div.style.width = div.style.paddingLeft = \"1px\";\n\
\n\
	body = document.getElementsByTagName( \"body\" )[ 0 ];\n\
	// We use our own, invisible, body unless the body is already present\n\
	// in which case we use a div (#9239)\n\
	testElement = document.createElement( body ? \"div\" : \"body\" );\n\
	testElementStyle = {\n\
		visibility: \"hidden\",\n\
		width: 0,\n\
		height: 0,\n\
		border: 0,\n\
		margin: 0,\n\
		background: \"none\"\n\
	};\n\
	if ( body ) {\n\
		jQuery.extend( testElementStyle, {\n\
			position: \"absolute\",\n\
			left: \"-1000px\",\n\
			top: \"-1000px\"\n\
		});\n\
	}\n\
	for ( i in testElementStyle ) {\n\
		testElement.style[ i ] = testElementStyle[ i ];\n\
	}\n\
	testElement.appendChild( div );\n\
	testElementParent = body || documentElement;\n\
	testElementParent.insertBefore( testElement, testElementParent.firstChild );\n\
\n\
	// Check if a disconnected checkbox will retain its checked\n\
	// value of true after appended to the DOM (IE6/7)\n\
	support.appendChecked = input.checked;\n\
\n\
	support.boxModel = div.offsetWidth === 2;\n\
\n\
	if ( \"zoom\" in div.style ) {\n\
		// Check if natively block-level elements act like inline-block\n\
		// elements when setting their display to 'inline' and giving\n\
		// them layout\n\
		// (IE < 8 does this)\n\
		div.style.display = \"inline\";\n\
		div.style.zoom = 1;\n\
		support.inlineBlockNeedsLayout = ( div.offsetWidth === 2 );\n\
\n\
		// Check if elements with layout shrink-wrap their children\n\
		// (IE 6 does this)\n\
		div.style.display = \"\";\n\
		div.innerHTML = \"<div style='width:4px;'></div>\";\n\
		support.shrinkWrapBlocks = ( div.offsetWidth !== 2 );\n\
	}\n\
\n\
	div.innerHTML = \"<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>\";\n\
	tds = div.getElementsByTagName( \"td\" );\n\
\n\
	// Check if table cells still have offsetWidth/Height when they are set\n\
	// to display:none and there are still other visible table cells in a\n\
	// table row; if so, offsetWidth/Height are not reliable for use when\n\
	// determining if an element has been hidden directly using\n\
	// display:none (it is still safe to use offsets if a parent element is\n\
	// hidden; don safety goggles and see bug #4512 for more information).\n\
	// (only IE 8 fails this test)\n\
	isSupported = ( tds[ 0 ].offsetHeight === 0 );\n\
\n\
	tds[ 0 ].style.display = \"\";\n\
	tds[ 1 ].style.display = \"none\";\n\
\n\
	// Check if empty table cells still have offsetWidth/Height\n\
	// (IE < 8 fail this test)\n\
	support.reliableHiddenOffsets = isSupported && ( tds[ 0 ].offsetHeight === 0 );\n\
	div.innerHTML = \"\";\n\
\n\
	// Check if div with explicit width and no margin-right incorrectly\n\
	// gets computed margin-right based on width of container. For more\n\
	// info see bug #3333\n\
	// Fails in WebKit before Feb 2011 nightlies\n\
	// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right\n\
	if ( document.defaultView && document.defaultView.getComputedStyle ) {\n\
		marginDiv = document.createElement( \"div\" );\n\
		marginDiv.style.width = \"0\";\n\
		marginDiv.style.marginRight = \"0\";\n\
		div.appendChild( marginDiv );\n\
		support.reliableMarginRight =\n\
			( parseInt( ( document.defaultView.getComputedStyle( marginDiv, null ) || { marginRight: 0 } ).marginRight, 10 ) || 0 ) === 0;\n\
	}\n\
\n\
	// Remove the body element we added\n\
	testElement.innerHTML = \"\";\n\
	testElementParent.removeChild( testElement );\n\
\n\
	// Technique from Juriy Zaytsev\n\
	// http://thinkweb2.com/projects/prototype/detecting-event-support-without-browser-sniffing/\n\
	// We only care about the case where non-standard event systems\n\
	// are used, namely in IE. Short-circuiting here helps us to\n\
	// avoid an eval call (in setAttribute) which can cause CSP\n\
	// to go haywire. See: https://developer.mozilla.org/en/Security/CSP\n\
	if ( div.attachEvent ) {\n\
		for( i in {\n\
			submit: 1,\n\
			change: 1,\n\
			focusin: 1\n\
		} ) {\n\
			eventName = \"on\" + i;\n\
			isSupported = ( eventName in div );\n\
			if ( !isSupported ) {\n\
				div.setAttribute( eventName, \"return;\" );\n\
				isSupported = ( typeof div[ eventName ] === \"function\" );\n\
			}\n\
			support[ i + \"Bubbles\" ] = isSupported;\n\
		}\n\
	}\n\
\n\
	// Null connected elements to avoid leaks in IE\n\
	testElement = fragment = select = opt = body = marginDiv = div = input = null;\n\
\n\
	return support;\n\
})();\n\
\n\
// Keep track of boxModel\n\
jQuery.boxModel = jQuery.support.boxModel;\n\
\n\
\n\
\n\
\n\
var rbrace = /^(?:\\{.*\\}|\\[.*\\])$/,\n\
	rmultiDash = /([A-Z])/g;\n\
\n\
jQuery.extend({\n\
	cache: {},\n\
\n\
	// Please use with caution\n\
	uuid: 0,\n\
\n\
	// Unique for each copy of jQuery on the page\n\
	// Non-digits removed to match rinlinejQuery\n\
	expando: \"jQuery\" + ( jQuery.fn.jquery + Math.random() ).replace( /\\D/g, \"\" ),\n\
\n\
	// The following elements throw uncatchable exceptions if you\n\
	// attempt to add expando properties to them.\n\
	noData: {\n\
		\"embed\": true,\n\
		// Ban all objects except for Flash (which handle expandos)\n\
		\"object\": \"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\",\n\
		\"applet\": true\n\
	},\n\
\n\
	hasData: function( elem ) {\n\
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];\n\
\n\
		return !!elem && !isEmptyDataObject( elem );\n\
	},\n\
\n\
	data: function( elem, name, data, pvt /* Internal Use Only */ ) {\n\
		if ( !jQuery.acceptData( elem ) ) {\n\
			return;\n\
		}\n\
\n\
		var thisCache, ret,\n\
			internalKey = jQuery.expando,\n\
			getByName = typeof name === \"string\",\n\
\n\
			// We have to handle DOM nodes and JS objects differently because IE6-7\n\
			// can't GC object references properly across the DOM-JS boundary\n\
			isNode = elem.nodeType,\n\
\n\
			// Only DOM nodes need the global jQuery cache; JS object data is\n\
			// attached directly to the object so GC can occur automatically\n\
			cache = isNode ? jQuery.cache : elem,\n\
\n\
			// Only defining an ID for JS objects if its cache already exists allows\n\
			// the code to shortcut on the same path as a DOM node with no cache\n\
			id = isNode ? elem[ jQuery.expando ] : elem[ jQuery.expando ] && jQuery.expando;\n\
\n\
		// Avoid doing any more work than we need to when trying to get data on an\n\
		// object that has no data at all\n\
		if ( (!id || (pvt && id && (cache[ id ] && !cache[ id ][ internalKey ]))) && getByName && data === undefined ) {\n\
			return;\n\
		}\n\
\n\
		if ( !id ) {\n\
			// Only DOM nodes need a new unique ID for each element since their data\n\
			// ends up in the global cache\n\
			if ( isNode ) {\n\
				elem[ jQuery.expando ] = id = ++jQuery.uuid;\n\
			} else {\n\
				id = jQuery.expando;\n\
			}\n\
		}\n\
\n\
		if ( !cache[ id ] ) {\n\
			cache[ id ] = {};\n\
\n\
			// TODO: This is a hack for 1.5 ONLY. Avoids exposing jQuery\n\
			// metadata on plain JS objects when the object is serialized using\n\
			// JSON.stringify\n\
			if ( !isNode ) {\n\
				cache[ id ].toJSON = jQuery.noop;\n\
			}\n\
		}\n\
\n\
		// An object can be passed to jQuery.data instead of a key/value pair; this gets\n\
		// shallow copied over onto the existing cache\n\
		if ( typeof name === \"object\" || typeof name === \"function\" ) {\n\
			if ( pvt ) {\n\
				cache[ id ][ internalKey ] = jQuery.extend(cache[ id ][ internalKey ], name);\n\
			} else {\n\
				cache[ id ] = jQuery.extend(cache[ id ], name);\n\
			}\n\
		}\n\
\n\
		thisCache = cache[ id ];\n\
\n\
		// Internal jQuery data is stored in a separate object inside the object's data\n\
		// cache in order to avoid key collisions between internal data and user-defined\n\
		// data\n\
		if ( pvt ) {\n\
			if ( !thisCache[ internalKey ] ) {\n\
				thisCache[ internalKey ] = {};\n\
			}\n\
\n\
			thisCache = thisCache[ internalKey ];\n\
		}\n\
\n\
		if ( data !== undefined ) {\n\
			thisCache[ jQuery.camelCase( name ) ] = data;\n\
		}\n\
\n\
		// TODO: This is a hack for 1.5 ONLY. It will be removed in 1.6. Users should\n\
		// not attempt to inspect the internal events object using jQuery.data, as this\n\
		// internal data object is undocumented and subject to change.\n\
		if ( name === \"events\" && !thisCache[name] ) {\n\
			return thisCache[ internalKey ] && thisCache[ internalKey ].events;\n\
		}\n\
\n\
		// Check for both converted-to-camel and non-converted data property names\n\
		// If a data property was specified\n\
		if ( getByName ) {\n\
\n\
			// First Try to find as-is property data\n\
			ret = thisCache[ name ];\n\
\n\
			// Test for null|undefined property data\n\
			if ( ret == null ) {\n\
\n\
				// Try to find the camelCased property\n\
				ret = thisCache[ jQuery.camelCase( name ) ];\n\
			}\n\
		} else {\n\
			ret = thisCache;\n\
		}\n\
\n\
		return ret;\n\
	},\n\
\n\
	removeData: function( elem, name, pvt /* Internal Use Only */ ) {\n\
		if ( !jQuery.acceptData( elem ) ) {\n\
			return;\n\
		}\n\
\n\
		var thisCache,\n\
\n\
			// Reference to internal data cache key\n\
			internalKey = jQuery.expando,\n\
\n\
			isNode = elem.nodeType,\n\
\n\
			// See jQuery.data for more information\n\
			cache = isNode ? jQuery.cache : elem,\n\
\n\
			// See jQuery.data for more information\n\
			id = isNode ? elem[ jQuery.expando ] : jQuery.expando;\n\
\n\
		// If there is already no cache entry for this object, there is no\n\
		// purpose in continuing\n\
		if ( !cache[ id ] ) {\n\
			return;\n\
		}\n\
\n\
		if ( name ) {\n\
\n\
			thisCache = pvt ? cache[ id ][ internalKey ] : cache[ id ];\n\
\n\
			if ( thisCache ) {\n\
\n\
				// Support interoperable removal of hyphenated or camelcased keys\n\
				if ( !thisCache[ name ] ) {\n\
					name = jQuery.camelCase( name );\n\
				}\n\
\n\
				delete thisCache[ name ];\n\
\n\
				// If there is no data left in the cache, we want to continue\n\
				// and let the cache object itself get destroyed\n\
				if ( !isEmptyDataObject(thisCache) ) {\n\
					return;\n\
				}\n\
			}\n\
		}\n\
\n\
		// See jQuery.data for more information\n\
		if ( pvt ) {\n\
			delete cache[ id ][ internalKey ];\n\
\n\
			// Don't destroy the parent cache unless the internal data object\n\
			// had been the only thing left in it\n\
			if ( !isEmptyDataObject(cache[ id ]) ) {\n\
				return;\n\
			}\n\
		}\n\
\n\
		var internalCache = cache[ id ][ internalKey ];\n\
\n\
		// Browsers that fail expando deletion also refuse to delete expandos on\n\
		// the window, but it will allow it on all other JS objects; other browsers\n\
		// don't care\n\
		// Ensure that `cache` is not a window object #10080\n\
		if ( jQuery.support.deleteExpando || !cache.setInterval ) {\n\
			delete cache[ id ];\n\
		} else {\n\
			cache[ id ] = null;\n\
		}\n\
\n\
		// We destroyed the entire user cache at once because it's faster than\n\
		// iterating through each key, but we need to continue to persist internal\n\
		// data if it existed\n\
		if ( internalCache ) {\n\
			cache[ id ] = {};\n\
			// TODO: This is a hack for 1.5 ONLY. Avoids exposing jQuery\n\
			// metadata on plain JS objects when the object is serialized using\n\
			// JSON.stringify\n\
			if ( !isNode ) {\n\
				cache[ id ].toJSON = jQuery.noop;\n\
			}\n\
\n\
			cache[ id ][ internalKey ] = internalCache;\n\
\n\
		// Otherwise, we need to eliminate the expando on the node to avoid\n\
		// false lookups in the cache for entries that no longer exist\n\
		} else if ( isNode ) {\n\
			// IE does not allow us to delete expando properties from nodes,\n\
			// nor does it have a removeAttribute function on Document nodes;\n\
			// we must handle all of these cases\n\
			if ( jQuery.support.deleteExpando ) {\n\
				delete elem[ jQuery.expando ];\n\
			} else if ( elem.removeAttribute ) {\n\
				elem.removeAttribute( jQuery.expando );\n\
			} else {\n\
				elem[ jQuery.expando ] = null;\n\
			}\n\
		}\n\
	},\n\
\n\
	// For internal use only.\n\
	_data: function( elem, name, data ) {\n\
		return jQuery.data( elem, name, data, true );\n\
	},\n\
\n\
	// A method for determining if a DOM node can handle the data expando\n\
	acceptData: function( elem ) {\n\
		if ( elem.nodeName ) {\n\
			var match = jQuery.noData[ elem.nodeName.toLowerCase() ];\n\
\n\
			if ( match ) {\n\
				return !(match === true || elem.getAttribute(\"classid\") !== match);\n\
			}\n\
		}\n\
\n\
		return true;\n\
	}\n\
});\n\
\n\
jQuery.fn.extend({\n\
	data: function( key, value ) {\n\
		var data = null;\n\
\n\
		if ( typeof key === \"undefined\" ) {\n\
			if ( this.length ) {\n\
				data = jQuery.data( this[0] );\n\
\n\
				if ( this[0].nodeType === 1 ) {\n\
			    var attr = this[0].attributes, name;\n\
					for ( var i = 0, l = attr.length; i < l; i++ ) {\n\
						name = attr[i].name;\n\
\n\
						if ( name.indexOf( \"data-\" ) === 0 ) {\n\
							name = jQuery.camelCase( name.substring(5) );\n\
\n\
							dataAttr( this[0], name, data[ name ] );\n\
						}\n\
					}\n\
				}\n\
			}\n\
\n\
			return data;\n\
\n\
		} else if ( typeof key === \"object\" ) {\n\
			return this.each(function() {\n\
				jQuery.data( this, key );\n\
			});\n\
		}\n\
\n\
		var parts = key.split(\".\");\n\
		parts[1] = parts[1] ? \".\" + parts[1] : \"\";\n\
\n\
		if ( value === undefined ) {\n\
			data = this.triggerHandler(\"getData\" + parts[1] + \"!\", [parts[0]]);\n\
\n\
			// Try to fetch any internally stored data first\n\
			if ( data === undefined && this.length ) {\n\
				data = jQuery.data( this[0], key );\n\
				data = dataAttr( this[0], key, data );\n\
			}\n\
\n\
			return data === undefined && parts[1] ?\n\
				this.data( parts[0] ) :\n\
				data;\n\
\n\
		} else {\n\
			return this.each(function() {\n\
				var $this = jQuery( this ),\n\
					args = [ parts[0], value ];\n\
\n\
				$this.triggerHandler( \"setData\" + parts[1] + \"!\", args );\n\
				jQuery.data( this, key, value );\n\
				$this.triggerHandler( \"changeData\" + parts[1] + \"!\", args );\n\
			});\n\
		}\n\
	},\n\
\n\
	removeData: function( key ) {\n\
		return this.each(function() {\n\
			jQuery.removeData( this, key );\n\
		});\n\
	}\n\
});\n\
\n\
function dataAttr( elem, key, data ) {\n\
	// If nothing was found internally, try to fetch any\n\
	// data from the HTML5 data-* attribute\n\
	if ( data === undefined && elem.nodeType === 1 ) {\n\
\n\
		var name = \"data-\" + key.replace( rmultiDash, \"-$1\" ).toLowerCase();\n\
\n\
		data = elem.getAttribute( name );\n\
\n\
		if ( typeof data === \"string\" ) {\n\
			try {\n\
				data = data === \"true\" ? true :\n\
				data === \"false\" ? false :\n\
				data === \"null\" ? null :\n\
				!jQuery.isNaN( data ) ? parseFloat( data ) :\n\
					rbrace.test( data ) ? jQuery.parseJSON( data ) :\n\
					data;\n\
			} catch( e ) {}\n\
\n\
			// Make sure we set the data so it isn't changed later\n\
			jQuery.data( elem, key, data );\n\
\n\
		} else {\n\
			data = undefined;\n\
		}\n\
	}\n\
\n\
	return data;\n\
}\n\
\n\
// TODO: This is a hack for 1.5 ONLY to allow objects with a single toJSON\n\
// property to be considered empty objects; this property always exists in\n\
// order to make sure JSON.stringify does not expose internal metadata\n\
function isEmptyDataObject( obj ) {\n\
	for ( var name in obj ) {\n\
		if ( name !== \"toJSON\" ) {\n\
			return false;\n\
		}\n\
	}\n\
\n\
	return true;\n\
}\n\
\n\
\n\
\n\
\n\
function handleQueueMarkDefer( elem, type, src ) {\n\
	var deferDataKey = type + \"defer\",\n\
		queueDataKey = type + \"queue\",\n\
		markDataKey = type + \"mark\",\n\
		defer = jQuery.data( elem, deferDataKey, undefined, true );\n\
	if ( defer &&\n\
		( src === \"queue\" || !jQuery.data( elem, queueDataKey, undefined, true ) ) &&\n\
		( src === \"mark\" || !jQuery.data( elem, markDataKey, undefined, true ) ) ) {\n\
		// Give room for hard-coded callbacks to fire first\n\
		// and eventually mark/queue something else on the element\n\
		setTimeout( function() {\n\
			if ( !jQuery.data( elem, queueDataKey, undefined, true ) &&\n\
				!jQuery.data( elem, markDataKey, undefined, true ) ) {\n\
				jQuery.removeData( elem, deferDataKey, true );\n\
				defer.resolve();\n\
			}\n\
		}, 0 );\n\
	}\n\
}\n\
\n\
jQuery.extend({\n\
\n\
	_mark: function( elem, type ) {\n\
		if ( elem ) {\n\
			type = (type || \"fx\") + \"mark\";\n\
			jQuery.data( elem, type, (jQuery.data(elem,type,undefined,true) || 0) + 1, true );\n\
		}\n\
	},\n\
\n\
	_unmark: function( force, elem, type ) {\n\
		if ( force !== true ) {\n\
			type = elem;\n\
			elem = force;\n\
			force = false;\n\
		}\n\
		if ( elem ) {\n\
			type = type || \"fx\";\n\
			var key = type + \"mark\",\n\
				count = force ? 0 : ( (jQuery.data( elem, key, undefined, true) || 1 ) - 1 );\n\
			if ( count ) {\n\
				jQuery.data( elem, key, count, true );\n\
			} else {\n\
				jQuery.removeData( elem, key, true );\n\
				handleQueueMarkDefer( elem, type, \"mark\" );\n\
			}\n\
		}\n\
	},\n\
\n\
	queue: function( elem, type, data ) {\n\
		if ( elem ) {\n\
			type = (type || \"fx\") + \"queue\";\n\
			var q = jQuery.data( elem, type, undefined, true );\n\
			// Speed up dequeue by getting out quickly if this is just a lookup\n\
			if ( data ) {\n\
				if ( !q || jQuery.isArray(data) ) {\n\
					q = jQuery.data( elem, type, jQuery.makeArray(data), true );\n\
				} else {\n\
					q.push( data );\n\
				}\n\
			}\n\
			return q || [];\n\
		}\n\
	},\n\
\n\
	dequeue: function( elem, type ) {\n\
		type = type || \"fx\";\n\
\n\
		var queue = jQuery.queue( elem, type ),\n\
			fn = queue.shift(),\n\
			defer;\n\
\n\
		// If the fx queue is dequeued, always remove the progress sentinel\n\
		if ( fn === \"inprogress\" ) {\n\
			fn = queue.shift();\n\
		}\n\
\n\
		if ( fn ) {\n\
			// Add a progress sentinel to prevent the fx queue from being\n\
			// automatically dequeued\n\
			if ( type === \"fx\" ) {\n\
				queue.unshift(\"inprogress\");\n\
			}\n\
\n\
			fn.call(elem, function() {\n\
				jQuery.dequeue(elem, type);\n\
			});\n\
		}\n\
\n\
		if ( !queue.length ) {\n\
			jQuery.removeData( elem, type + \"queue\", true );\n\
			handleQueueMarkDefer( elem, type, \"queue\" );\n\
		}\n\
	}\n\
});\n\
\n\
jQuery.fn.extend({\n\
	queue: function( type, data ) {\n\
		if ( typeof type !== \"string\" ) {\n\
			data = type;\n\
			type = \"fx\";\n\
		}\n\
\n\
		if ( data === undefined ) {\n\
			return jQuery.queue( this[0], type );\n\
		}\n\
		return this.each(function() {\n\
			var queue = jQuery.queue( this, type, data );\n\
\n\
			if ( type === \"fx\" && queue[0] !== \"inprogress\" ) {\n\
				jQuery.dequeue( this, type );\n\
			}\n\
		});\n\
	},\n\
	dequeue: function( type ) {\n\
		return this.each(function() {\n\
			jQuery.dequeue( this, type );\n\
		});\n\
	},\n\
	// Based off of the plugin by Clint Helfers, with permission.\n\
	// http://blindsignals.com/index.php/2009/07/jquery-delay/\n\
	delay: function( time, type ) {\n\
		time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;\n\
		type = type || \"fx\";\n\
\n\
		return this.queue( type, function() {\n\
			var elem = this;\n\
			setTimeout(function() {\n\
				jQuery.dequeue( elem, type );\n\
			}, time );\n\
		});\n\
	},\n\
	clearQueue: function( type ) {\n\
		return this.queue( type || \"fx\", [] );\n\
	},\n\
	// Get a promise resolved when queues of a certain type\n\
	// are emptied (fx is the type by default)\n\
	promise: function( type, object ) {\n\
		if ( typeof type !== \"string\" ) {\n\
			object = type;\n\
			type = undefined;\n\
		}\n\
		type = type || \"fx\";\n\
		var defer = jQuery.Deferred(),\n\
			elements = this,\n\
			i = elements.length,\n\
			count = 1,\n\
			deferDataKey = type + \"defer\",\n\
			queueDataKey = type + \"queue\",\n\
			markDataKey = type + \"mark\",\n\
			tmp;\n\
		function resolve() {\n\
			if ( !( --count ) ) {\n\
				defer.resolveWith( elements, [ elements ] );\n\
			}\n\
		}\n\
		while( i-- ) {\n\
			if (( tmp = jQuery.data( elements[ i ], deferDataKey, undefined, true ) ||\n\
					( jQuery.data( elements[ i ], queueDataKey, undefined, true ) ||\n\
						jQuery.data( elements[ i ], markDataKey, undefined, true ) ) &&\n\
					jQuery.data( elements[ i ], deferDataKey, jQuery._Deferred(), true ) )) {\n\
				count++;\n\
				tmp.done( resolve );\n\
			}\n\
		}\n\
		resolve();\n\
		return defer.promise();\n\
	}\n\
});\n\
\n\
\n\
\n\
\n\
var rclass = /[\\n\\t\\r]/g,\n\
	rspace = /\\s+/,\n\
	rreturn = /\\r/g,\n\
	rtype = /^(?:button|input)$/i,\n\
	rfocusable = /^(?:button|input|object|select|textarea)$/i,\n\
	rclickable = /^a(?:rea)?$/i,\n\
	rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,\n\
	nodeHook, boolHook;\n\
\n\
jQuery.fn.extend({\n\
	attr: function( name, value ) {\n\
		return jQuery.access( this, name, value, true, jQuery.attr );\n\
	},\n\
\n\
	removeAttr: function( name ) {\n\
		return this.each(function() {\n\
			jQuery.removeAttr( this, name );\n\
		});\n\
	},\n\
	\n\
	prop: function( name, value ) {\n\
		return jQuery.access( this, name, value, true, jQuery.prop );\n\
	},\n\
	\n\
	removeProp: function( name ) {\n\
		name = jQuery.propFix[ name ] || name;\n\
		return this.each(function() {\n\
			// try/catch handles cases where IE balks (such as removing a property on window)\n\
			try {\n\
				this[ name ] = undefined;\n\
				delete this[ name ];\n\
			} catch( e ) {}\n\
		});\n\
	},\n\
\n\
	addClass: function( value ) {\n\
		var classNames, i, l, elem,\n\
			setClass, c, cl;\n\
\n\
		if ( jQuery.isFunction( value ) ) {\n\
			return this.each(function( j ) {\n\
				jQuery( this ).addClass( value.call(this, j, this.className) );\n\
			});\n\
		}\n\
\n\
		if ( value && typeof value === \"string\" ) {\n\
			classNames = value.split( rspace );\n\
\n\
			for ( i = 0, l = this.length; i < l; i++ ) {\n\
				elem = this[ i ];\n\
\n\
				if ( elem.nodeType === 1 ) {\n\
					if ( !elem.className && classNames.length === 1 ) {\n\
						elem.className = value;\n\
\n\
					} else {\n\
						setClass = \" \" + elem.className + \" \";\n\
\n\
						for ( c = 0, cl = classNames.length; c < cl; c++ ) {\n\
							if ( !~setClass.indexOf( \" \" + classNames[ c ] + \" \" ) ) {\n\
								setClass += classNames[ c ] + \" \";\n\
							}\n\
						}\n\
						elem.className = jQuery.trim( setClass );\n\
					}\n\
				}\n\
			}\n\
		}\n\
\n\
		return this;\n\
	},\n\
\n\
	removeClass: function( value ) {\n\
		var classNames, i, l, elem, className, c, cl;\n\
\n\
		if ( jQuery.isFunction( value ) ) {\n\
			return this.each(function( j ) {\n\
				jQuery( this ).removeClass( value.call(this, j, this.className) );\n\
			});\n\
		}\n\
\n\
		if ( (value && typeof value === \"string\") || value === undefined ) {\n\
			classNames = (value || \"\").split( rspace );\n\
\n\
			for ( i = 0, l = this.length; i < l; i++ ) {\n\
				elem = this[ i ];\n\
\n\
				if ( elem.nodeType === 1 && elem.className ) {\n\
					if ( value ) {\n\
						className = (\" \" + elem.className + \" \").replace( rclass, \" \" );\n\
						for ( c = 0, cl = classNames.length; c < cl; c++ ) {\n\
							className = className.replace(\" \" + classNames[ c ] + \" \", \" \");\n\
						}\n\
						elem.className = jQuery.trim( className );\n\
\n\
					} else {\n\
						elem.className = \"\";\n\
					}\n\
				}\n\
			}\n\
		}\n\
\n\
		return this;\n\
	},\n\
\n\
	toggleClass: function( value, stateVal ) {\n\
		var type = typeof value,\n\
			isBool = typeof stateVal === \"boolean\";\n\
\n\
		if ( jQuery.isFunction( value ) ) {\n\
			return this.each(function( i ) {\n\
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );\n\
			});\n\
		}\n\
\n\
		return this.each(function() {\n\
			if ( type === \"string\" ) {\n\
				// toggle individual class names\n\
				var className,\n\
					i = 0,\n\
					self = jQuery( this ),\n\
					state = stateVal,\n\
					classNames = value.split( rspace );\n\
\n\
				while ( (className = classNames[ i++ ]) ) {\n\
					// check each className given, space seperated list\n\
					state = isBool ? state : !self.hasClass( className );\n\
					self[ state ? \"addClass\" : \"removeClass\" ]( className );\n\
				}\n\
\n\
			} else if ( type === \"undefined\" || type === \"boolean\" ) {\n\
				if ( this.className ) {\n\
					// store className if set\n\
					jQuery._data( this, \"__className__\", this.className );\n\
				}\n\
\n\
				// toggle whole className\n\
				this.className = this.className || value === false ? \"\" : jQuery._data( this, \"__className__\" ) || \"\";\n\
			}\n\
		});\n\
	},\n\
\n\
	hasClass: function( selector ) {\n\
		var className = \" \" + selector + \" \";\n\
		for ( var i = 0, l = this.length; i < l; i++ ) {\n\
			if ( this[i].nodeType === 1 && (\" \" + this[i].className + \" \").replace(rclass, \" \").indexOf( className ) > -1 ) {\n\
				return true;\n\
			}\n\
		}\n\
\n\
		return false;\n\
	},\n\
\n\
	val: function( value ) {\n\
		var hooks, ret,\n\
			elem = this[0];\n\
		\n\
		if ( !arguments.length ) {\n\
			if ( elem ) {\n\
				hooks = jQuery.valHooks[ elem.nodeName.toLowerCase() ] || jQuery.valHooks[ elem.type ];\n\
\n\
				if ( hooks && \"get\" in hooks && (ret = hooks.get( elem, \"value\" )) !== undefined ) {\n\
					return ret;\n\
				}\n\
\n\
				ret = elem.value;\n\
\n\
				return typeof ret === \"string\" ? \n\
					// handle most common string cases\n\
					ret.replace(rreturn, \"\") : \n\
					// handle cases where value is null/undef or number\n\
					ret == null ? \"\" : ret;\n\
			}\n\
\n\
			return undefined;\n\
		}\n\
\n\
		var isFunction = jQuery.isFunction( value );\n\
\n\
		return this.each(function( i ) {\n\
			var self = jQuery(this), val;\n\
\n\
			if ( this.nodeType !== 1 ) {\n\
				return;\n\
			}\n\
\n\
			if ( isFunction ) {\n\
				val = value.call( this, i, self.val() );\n\
			} else {\n\
				val = value;\n\
			}\n\
\n\
			// Treat null/undefined as \"\"; convert numbers to string\n\
			if ( val == null ) {\n\
				val = \"\";\n\
			} else if ( typeof val === \"number\" ) {\n\
				val += \"\";\n\
			} else if ( jQuery.isArray( val ) ) {\n\
				val = jQuery.map(val, function ( value ) {\n\
					return value == null ? \"\" : value + \"\";\n\
				});\n\
			}\n\
\n\
			hooks = jQuery.valHooks[ this.nodeName.toLowerCase() ] || jQuery.valHooks[ this.type ];\n\
\n\
			// If set returns undefined, fall back to normal setting\n\
			if ( !hooks || !(\"set\" in hooks) || hooks.set( this, val, \"value\" ) === undefined ) {\n\
				this.value = val;\n\
			}\n\
		});\n\
	}\n\
});\n\
\n\
jQuery.extend({\n\
	valHooks: {\n\
		option: {\n\
			get: function( elem ) {\n\
				// attributes.value is undefined in Blackberry 4.7 but\n\
				// uses .value. See #6932\n\
				var val = elem.attributes.value;\n\
				return !val || val.specified ? elem.value : elem.text;\n\
			}\n\
		},\n\
		select: {\n\
			get: function( elem ) {\n\
				var value,\n\
					index = elem.selectedIndex,\n\
					values = [],\n\
					options = elem.options,\n\
					one = elem.type === \"select-one\";\n\
\n\
				// Nothing was selected\n\
				if ( index < 0 ) {\n\
					return null;\n\
				}\n\
\n\
				// Loop through all the selected options\n\
				for ( var i = one ? index : 0, max = one ? index + 1 : options.length; i < max; i++ ) {\n\
					var option = options[ i ];\n\
\n\
					// Don't return options that are disabled or in a disabled optgroup\n\
					if ( option.selected && (jQuery.support.optDisabled ? !option.disabled : option.getAttribute(\"disabled\") === null) &&\n\
							(!option.parentNode.disabled || !jQuery.nodeName( option.parentNode, \"optgroup\" )) ) {\n\
\n\
						// Get the specific value for the option\n\
						value = jQuery( option ).val();\n\
\n\
						// We don't need an array for one selects\n\
						if ( one ) {\n\
							return value;\n\
						}\n\
\n\
						// Multi-Selects return an array\n\
						values.push( value );\n\
					}\n\
				}\n\
\n\
				// Fixes Bug #2551 -- select.val() broken in IE after form.reset()\n\
				if ( one && !values.length && options.length ) {\n\
					return jQuery( options[ index ] ).val();\n\
				}\n\
\n\
				return values;\n\
			},\n\
\n\
			set: function( elem, value ) {\n\
				var values = jQuery.makeArray( value );\n\
\n\
				jQuery(elem).find(\"option\").each(function() {\n\
					this.selected = jQuery.inArray( jQuery(this).val(), values ) >= 0;\n\
				});\n\
\n\
				if ( !values.length ) {\n\
					elem.selectedIndex = -1;\n\
				}\n\
				return values;\n\
			}\n\
		}\n\
	},\n\
\n\
	attrFn: {\n\
		val: true,\n\
		css: true,\n\
		html: true,\n\
		text: true,\n\
		data: true,\n\
		width: true,\n\
		height: true,\n\
		offset: true\n\
	},\n\
	\n\
	attrFix: {\n\
		// Always normalize to ensure hook usage\n\
		tabindex: \"tabIndex\"\n\
	},\n\
	\n\
	attr: function( elem, name, value, pass ) {\n\
		var nType = elem.nodeType;\n\
		\n\
		// don't get/set attributes on text, comment and attribute nodes\n\
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {\n\
			return undefined;\n\
		}\n\
\n\
		if ( pass && name in jQuery.attrFn ) {\n\
			return jQuery( elem )[ name ]( value );\n\
		}\n\
\n\
		// Fallback to prop when attributes are not supported\n\
		if ( !(\"getAttribute\" in elem) ) {\n\
			return jQuery.prop( elem, name, value );\n\
		}\n\
\n\
		var ret, hooks,\n\
			notxml = nType !== 1 || !jQuery.isXMLDoc( elem );\n\
\n\
		// Normalize the name if needed\n\
		if ( notxml ) {\n\
			name = jQuery.attrFix[ name ] || name;\n\
\n\
			hooks = jQuery.attrHooks[ name ];\n\
\n\
			if ( !hooks ) {\n\
				// Use boolHook for boolean attributes\n\
				if ( rboolean.test( name ) ) {\n\
					hooks = boolHook;\n\
\n\
				// Use nodeHook if available( IE6/7 )\n\
				} else if ( nodeHook ) {\n\
					hooks = nodeHook;\n\
				}\n\
			}\n\
		}\n\
\n\
		if ( value !== undefined ) {\n\
\n\
			if ( value === null ) {\n\
				jQuery.removeAttr( elem, name );\n\
				return undefined;\n\
\n\
			} else if ( hooks && \"set\" in hooks && notxml && (ret = hooks.set( elem, value, name )) !== undefined ) {\n\
				return ret;\n\
\n\
			} else {\n\
				elem.setAttribute( name, \"\" + value );\n\
				return value;\n\
			}\n\
\n\
		} else if ( hooks && \"get\" in hooks && notxml && (ret = hooks.get( elem, name )) !== null ) {\n\
			return ret;\n\
\n\
		} else {\n\
\n\
			ret = elem.getAttribute( name );\n\
\n\
			// Non-existent attributes return null, we normalize to undefined\n\
			return ret === null ?\n\
				undefined :\n\
				ret;\n\
		}\n\
	},\n\
\n\
	removeAttr: function( elem, name ) {\n\
		var propName;\n\
		if ( elem.nodeType === 1 ) {\n\
			name = jQuery.attrFix[ name ] || name;\n\
\n\
			jQuery.attr( elem, name, \"\" );\n\
			elem.removeAttribute( name );\n\
\n\
			// Set corresponding property to false for boolean attributes\n\
			if ( rboolean.test( name ) && (propName = jQuery.propFix[ name ] || name) in elem ) {\n\
				elem[ propName ] = false;\n\
			}\n\
		}\n\
	},\n\
\n\
	attrHooks: {\n\
		type: {\n\
			set: function( elem, value ) {\n\
				// We can't allow the type property to be changed (since it causes problems in IE)\n\
				if ( rtype.test( elem.nodeName ) && elem.parentNode ) {\n\
					jQuery.error( \"type property can't be changed\" );\n\
				} else if ( !jQuery.support.radioValue && value === \"radio\" && jQuery.nodeName(elem, \"input\") ) {\n\
					// Setting the type on a radio button after the value resets the value in IE6-9\n\
					// Reset value to it's default in case type is set after value\n\
					// This is for element creation\n\
					var val = elem.value;\n\
					elem.setAttribute( \"type\", value );\n\
					if ( val ) {\n\
						elem.value = val;\n\
					}\n\
					return value;\n\
				}\n\
			}\n\
		},\n\
		// Use the value property for back compat\n\
		// Use the nodeHook for button elements in IE6/7 (#1954)\n\
		value: {\n\
			get: function( elem, name ) {\n\
				if ( nodeHook && jQuery.nodeName( elem, \"button\" ) ) {\n\
					return nodeHook.get( elem, name );\n\
				}\n\
				return name in elem ?\n\
					elem.value :\n\
					null;\n\
			},\n\
			set: function( elem, value, name ) {\n\
				if ( nodeHook && jQuery.nodeName( elem, \"button\" ) ) {\n\
					return nodeHook.set( elem, value, name );\n\
				}\n\
				// Does not return so that setAttribute is also used\n\
				elem.value = value;\n\
			}\n\
		}\n\
	},\n\
\n\
	propFix: {\n\
		tabindex: \"tabIndex\",\n\
		readonly: \"readOnly\",\n\
		\"for\": \"htmlFor\",\n\
		\"class\": \"className\",\n\
		maxlength: \"maxLength\",\n\
		cellspacing: \"cellSpacing\",\n\
		cellpadding: \"cellPadding\",\n\
		rowspan: \"rowSpan\",\n\
		colspan: \"colSpan\",\n\
		usemap: \"useMap\",\n\
		frameborder: \"frameBorder\",\n\
		contenteditable: \"contentEditable\"\n\
	},\n\
	\n\
	prop: function( elem, name, value ) {\n\
		var nType = elem.nodeType;\n\
\n\
		// don't get/set properties on text, comment and attribute nodes\n\
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {\n\
			return undefined;\n\
		}\n\
\n\
		var ret, hooks,\n\
			notxml = nType !== 1 || !jQuery.isXMLDoc( elem );\n\
\n\
		if ( notxml ) {\n\
			// Fix name and attach hooks\n\
			name = jQuery.propFix[ name ] || name;\n\
			hooks = jQuery.propHooks[ name ];\n\
		}\n\
\n\
		if ( value !== undefined ) {\n\
			if ( hooks && \"set\" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {\n\
				return ret;\n\
\n\
			} else {\n\
				return (elem[ name ] = value);\n\
			}\n\
\n\
		} else {\n\
			if ( hooks && \"get\" in hooks && (ret = hooks.get( elem, name )) !== null ) {\n\
				return ret;\n\
\n\
			} else {\n\
				return elem[ name ];\n\
			}\n\
		}\n\
	},\n\
	\n\
	propHooks: {\n\
		tabIndex: {\n\
			get: function( elem ) {\n\
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set\n\
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/\n\
				var attributeNode = elem.getAttributeNode(\"tabindex\");\n\
\n\
				return attributeNode && attributeNode.specified ?\n\
					parseInt( attributeNode.value, 10 ) :\n\
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?\n\
						0 :\n\
						undefined;\n\
			}\n\
		}\n\
	}\n\
});\n\
\n\
// Add the tabindex propHook to attrHooks for back-compat\n\
jQuery.attrHooks.tabIndex = jQuery.propHooks.tabIndex;\n\
\n\
// Hook for boolean attributes\n\
boolHook = {\n\
	get: function( elem, name ) {\n\
		// Align boolean attributes with corresponding properties\n\
		// Fall back to attribute presence where some booleans are not supported\n\
		var attrNode;\n\
		return jQuery.prop( elem, name ) === true || ( attrNode = elem.getAttributeNode( name ) ) && attrNode.nodeValue !== false ?\n\
			name.toLowerCase() :\n\
			undefined;\n\
	},\n\
	set: function( elem, value, name ) {\n\
		var propName;\n\
		if ( value === false ) {\n\
			// Remove boolean attributes when set to false\n\
			jQuery.removeAttr( elem, name );\n\
		} else {\n\
			// value is true since we know at this point it's type boolean and not false\n\
			// Set boolean attributes to the same name and set the DOM property\n\
			propName = jQuery.propFix[ name ] || name;\n\
			if ( propName in elem ) {\n\
				// Only set the IDL specifically if it already exists on the element\n\
				elem[ propName ] = true;\n\
			}\n\
\n\
			elem.setAttribute( name, name.toLowerCase() );\n\
		}\n\
		return name;\n\
	}\n\
};\n\
\n\
// IE6/7 do not support getting/setting some attributes with get/setAttribute\n\
if ( !jQuery.support.getSetAttribute ) {\n\
	\n\
	// Use this for any attribute in IE6/7\n\
	// This fixes almost every IE6/7 issue\n\
	nodeHook = jQuery.valHooks.button = {\n\
		get: function( elem, name ) {\n\
			var ret;\n\
			ret = elem.getAttributeNode( name );\n\
			// Return undefined if nodeValue is empty string\n\
			return ret && ret.nodeValue !== \"\" ?\n\
				ret.nodeValue :\n\
				undefined;\n\
		},\n\
		set: function( elem, value, name ) {\n\
			// Set the existing or create a new attribute node\n\
			var ret = elem.getAttributeNode( name );\n\
			if ( !ret ) {\n\
				ret = document.createAttribute( name );\n\
				elem.setAttributeNode( ret );\n\
			}\n\
			return (ret.nodeValue = value + \"\");\n\
		}\n\
	};\n\
\n\
	// Set width and height to auto instead of 0 on empty string( Bug #8150 )\n\
	// This is for removals\n\
	jQuery.each([ \"width\", \"height\" ], function( i, name ) {\n\
		jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {\n\
			set: function( elem, value ) {\n\
				if ( value === \"\" ) {\n\
					elem.setAttribute( name, \"auto\" );\n\
					return value;\n\
				}\n\
			}\n\
		});\n\
	});\n\
}\n\
\n\
\n\
// Some attributes require a special call on IE\n\
if ( !jQuery.support.hrefNormalized ) {\n\
	jQuery.each([ \"href\", \"src\", \"width\", \"height\" ], function( i, name ) {\n\
		jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {\n\
			get: function( elem ) {\n\
				var ret = elem.getAttribute( name, 2 );\n\
				return ret === null ? undefined : ret;\n\
			}\n\
		});\n\
	});\n\
}\n\
\n\
if ( !jQuery.support.style ) {\n\
	jQuery.attrHooks.style = {\n\
		get: function( elem ) {\n\
			// Return undefined in the case of empty string\n\
			// Normalize to lowercase since IE uppercases css property names\n\
			return elem.style.cssText.toLowerCase() || undefined;\n\
		},\n\
		set: function( elem, value ) {\n\
			return (elem.style.cssText = \"\" + value);\n\
		}\n\
	};\n\
}\n\
\n\
// Safari mis-reports the default selected property of an option\n\
// Accessing the parent's selectedIndex property fixes it\n\
if ( !jQuery.support.optSelected ) {\n\
	jQuery.propHooks.selected = jQuery.extend( jQuery.propHooks.selected, {\n\
		get: function( elem ) {\n\
			var parent = elem.parentNode;\n\
\n\
			if ( parent ) {\n\
				parent.selectedIndex;\n\
\n\
				// Make sure that it also works with optgroups, see #5701\n\
				if ( parent.parentNode ) {\n\
					parent.parentNode.selectedIndex;\n\
				}\n\
			}\n\
			return null;\n\
		}\n\
	});\n\
}\n\
\n\
// Radios and checkboxes getter/setter\n\
if ( !jQuery.support.checkOn ) {\n\
	jQuery.each([ \"radio\", \"checkbox\" ], function() {\n\
		jQuery.valHooks[ this ] = {\n\
			get: function( elem ) {\n\
				// Handle the case where in Webkit \"\" is returned instead of \"on\" if a value isn't specified\n\
				return elem.getAttribute(\"value\") === null ? \"on\" : elem.value;\n\
			}\n\
		};\n\
	});\n\
}\n\
jQuery.each([ \"radio\", \"checkbox\" ], function() {\n\
	jQuery.valHooks[ this ] = jQuery.extend( jQuery.valHooks[ this ], {\n\
		set: function( elem, value ) {\n\
			if ( jQuery.isArray( value ) ) {\n\
				return (elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0);\n\
			}\n\
		}\n\
	});\n\
});\n\
\n\
\n\
\n\
\n\
var rnamespaces = /\\.(.*)$/,\n\
	rformElems = /^(?:textarea|input|select)$/i,\n\
	rperiod = /\\./g,\n\
	rspaces = / /g,\n\
	rescape = /[^\\w\\s.|`]/g,\n\
	fcleanup = function( nm ) {\n\
		return nm.replace(rescape, \"\\\\$&\");\n\
	};\n\
\n\
/*\n\
 * A number of helper functions used for managing events.\n\
 * Many of the ideas behind this code originated from\n\
 * Dean Edwards' addEvent library.\n\
 */\n\
jQuery.event = {\n\
\n\
	// Bind an event to an element\n\
	// Original by Dean Edwards\n\
	add: function( elem, types, handler, data ) {\n\
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {\n\
			return;\n\
		}\n\
\n\
		if ( handler === false ) {\n\
			handler = returnFalse;\n\
		} else if ( !handler ) {\n\
			// Fixes bug #7229. Fix recommended by jdalton\n\
			return;\n\
		}\n\
\n\
		var handleObjIn, handleObj;\n\
\n\
		if ( handler.handler ) {\n\
			handleObjIn = handler;\n\
			handler = handleObjIn.handler;\n\
		}\n\
\n\
		// Make sure that the function being executed has a unique ID\n\
		if ( !handler.guid ) {\n\
			handler.guid = jQuery.guid++;\n\
		}\n\
\n\
		// Init the element's event structure\n\
		var elemData = jQuery._data( elem );\n\
\n\
		// If no elemData is found then we must be trying to bind to one of the\n\
		// banned noData elements\n\
		if ( !elemData ) {\n\
			return;\n\
		}\n\
\n\
		var events = elemData.events,\n\
			eventHandle = elemData.handle;\n\
\n\
		if ( !events ) {\n\
			elemData.events = events = {};\n\
		}\n\
\n\
		if ( !eventHandle ) {\n\
			elemData.handle = eventHandle = function( e ) {\n\
				// Discard the second event of a jQuery.event.trigger() and\n\
				// when an event is called after a page has unloaded\n\
				return typeof jQuery !== \"undefined\" && (!e || jQuery.event.triggered !== e.type) ?\n\
					jQuery.event.handle.apply( eventHandle.elem, arguments ) :\n\
					undefined;\n\
			};\n\
		}\n\
\n\
		// Add elem as a property of the handle function\n\
		// This is to prevent a memory leak with non-native events in IE.\n\
		eventHandle.elem = elem;\n\
\n\
		// Handle multiple events separated by a space\n\
		// jQuery(...).bind(\"mouseover mouseout\", fn);\n\
		types = types.split(\" \");\n\
\n\
		var type, i = 0, namespaces;\n\
\n\
		while ( (type = types[ i++ ]) ) {\n\
			handleObj = handleObjIn ?\n\
				jQuery.extend({}, handleObjIn) :\n\
				{ handler: handler, data: data };\n\
\n\
			// Namespaced event handlers\n\
			if ( type.indexOf(\".\") > -1 ) {\n\
				namespaces = type.split(\".\");\n\
				type = namespaces.shift();\n\
				handleObj.namespace = namespaces.slice(0).sort().join(\".\");\n\
\n\
			} else {\n\
				namespaces = [];\n\
				handleObj.namespace = \"\";\n\
			}\n\
\n\
			handleObj.type = type;\n\
			if ( !handleObj.guid ) {\n\
				handleObj.guid = handler.guid;\n\
			}\n\
\n\
			// Get the current list of functions bound to this event\n\
			var handlers = events[ type ],\n\
				special = jQuery.event.special[ type ] || {};\n\
\n\
			// Init the event handler queue\n\
			if ( !handlers ) {\n\
				handlers = events[ type ] = [];\n\
\n\
				// Check for a special event handler\n\
				// Only use addEventListener/attachEvent if the special\n\
				// events handler returns false\n\
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {\n\
					// Bind the global event handler to the element\n\
					if ( elem.addEventListener ) {\n\
						elem.addEventListener( type, eventHandle, false );\n\
\n\
					} else if ( elem.attachEvent ) {\n\
						elem.attachEvent( \"on\" + type, eventHandle );\n\
					}\n\
				}\n\
			}\n\
\n\
			if ( special.add ) {\n\
				special.add.call( elem, handleObj );\n\
\n\
				if ( !handleObj.handler.guid ) {\n\
					handleObj.handler.guid = handler.guid;\n\
				}\n\
			}\n\
\n\
			// Add the function to the element's handler list\n\
			handlers.push( handleObj );\n\
\n\
			// Keep track of which events have been used, for event optimization\n\
			jQuery.event.global[ type ] = true;\n\
		}\n\
\n\
		// Nullify elem to prevent memory leaks in IE\n\
		elem = null;\n\
	},\n\
\n\
	global: {},\n\
\n\
	// Detach an event or set of events from an element\n\
	remove: function( elem, types, handler, pos ) {\n\
		// don't do events on text and comment nodes\n\
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {\n\
			return;\n\
		}\n\
\n\
		if ( handler === false ) {\n\
			handler = returnFalse;\n\
		}\n\
\n\
		var ret, type, fn, j, i = 0, all, namespaces, namespace, special, eventType, handleObj, origType,\n\
			elemData = jQuery.hasData( elem ) && jQuery._data( elem ),\n\
			events = elemData && elemData.events;\n\
\n\
		if ( !elemData || !events ) {\n\
			return;\n\
		}\n\
\n\
		// types is actually an event object here\n\
		if ( types && types.type ) {\n\
			handler = types.handler;\n\
			types = types.type;\n\
		}\n\
\n\
		// Unbind all events for the element\n\
		if ( !types || typeof types === \"string\" && types.charAt(0) === \".\" ) {\n\
			types = types || \"\";\n\
\n\
			for ( type in events ) {\n\
				jQuery.event.remove( elem, type + types );\n\
			}\n\
\n\
			return;\n\
		}\n\
\n\
		// Handle multiple events separated by a space\n\
		// jQuery(...).unbind(\"mouseover mouseout\", fn);\n\
		types = types.split(\" \");\n\
\n\
		while ( (type = types[ i++ ]) ) {\n\
			origType = type;\n\
			handleObj = null;\n\
			all = type.indexOf(\".\") < 0;\n\
			namespaces = [];\n\
\n\
			if ( !all ) {\n\
				// Namespaced event handlers\n\
				namespaces = type.split(\".\");\n\
				type = namespaces.shift();\n\
\n\
				namespace = new RegExp(\"(^|\\\\.)\" +\n\
					jQuery.map( namespaces.slice(0).sort(), fcleanup ).join(\"\\\\.(?:.*\\\\.)?\") + \"(\\\\.|$)\");\n\
			}\n\
\n\
			eventType = events[ type ];\n\
\n\
			if ( !eventType ) {\n\
				continue;\n\
			}\n\
\n\
			if ( !handler ) {\n\
				for ( j = 0; j < eventType.length; j++ ) {\n\
					handleObj = eventType[ j ];\n\
\n\
					if ( all || namespace.test( handleObj.namespace ) ) {\n\
						jQuery.event.remove( elem, origType, handleObj.handler, j );\n\
						eventType.splice( j--, 1 );\n\
					}\n\
				}\n\
\n\
				continue;\n\
			}\n\
\n\
			special = jQuery.event.special[ type ] || {};\n\
\n\
			for ( j = pos || 0; j < eventType.length; j++ ) {\n\
				handleObj = eventType[ j ];\n\
\n\
				if ( handler.guid === handleObj.guid ) {\n\
					// remove the given handler for the given type\n\
					if ( all || namespace.test( handleObj.namespace ) ) {\n\
						if ( pos == null ) {\n\
							eventType.splice( j--, 1 );\n\
						}\n\
\n\
						if ( special.remove ) {\n\
							special.remove.call( elem, handleObj );\n\
						}\n\
					}\n\
\n\
					if ( pos != null ) {\n\
						break;\n\
					}\n\
				}\n\
			}\n\
\n\
			// remove generic event handler if no more handlers exist\n\
			if ( eventType.length === 0 || pos != null && eventType.length === 1 ) {\n\
				if ( !special.teardown || special.teardown.call( elem, namespaces ) === false ) {\n\
					jQuery.removeEvent( elem, type, elemData.handle );\n\
				}\n\
\n\
				ret = null;\n\
				delete events[ type ];\n\
			}\n\
		}\n\
\n\
		// Remove the expando if it's no longer used\n\
		if ( jQuery.isEmptyObject( events ) ) {\n\
			var handle = elemData.handle;\n\
			if ( handle ) {\n\
				handle.elem = null;\n\
			}\n\
\n\
			delete elemData.events;\n\
			delete elemData.handle;\n\
\n\
			if ( jQuery.isEmptyObject( elemData ) ) {\n\
				jQuery.removeData( elem, undefined, true );\n\
			}\n\
		}\n\
	},\n\
	\n\
	// Events that are safe to short-circuit if no handlers are attached.\n\
	// Native DOM events should not be added, they may have inline handlers.\n\
	customEvent: {\n\
		\"getData\": true,\n\
		\"setData\": true,\n\
		\"changeData\": true\n\
	},\n\
\n\
	trigger: function( event, data, elem, onlyHandlers ) {\n\
		// Event object or event type\n\
		var type = event.type || event,\n\
			namespaces = [],\n\
			exclusive;\n\
\n\
		if ( type.indexOf(\"!\") >= 0 ) {\n\
			// Exclusive events trigger only for the exact event (no namespaces)\n\
			type = type.slice(0, -1);\n\
			exclusive = true;\n\
		}\n\
\n\
		if ( type.indexOf(\".\") >= 0 ) {\n\
			// Namespaced trigger; create a regexp to match event type in handle()\n\
			namespaces = type.split(\".\");\n\
			type = namespaces.shift();\n\
			namespaces.sort();\n\
		}\n\
\n\
		if ( (!elem || jQuery.event.customEvent[ type ]) && !jQuery.event.global[ type ] ) {\n\
			// No jQuery handlers for this event type, and it can't have inline handlers\n\
			return;\n\
		}\n\
\n\
		// Caller can pass in an Event, Object, or just an event type string\n\
		event = typeof event === \"object\" ?\n\
			// jQuery.Event object\n\
			event[ jQuery.expando ] ? event :\n\
			// Object literal\n\
			new jQuery.Event( type, event ) :\n\
			// Just the event type (string)\n\
			new jQuery.Event( type );\n\
\n\
		event.type = type;\n\
		event.exclusive = exclusive;\n\
		event.namespace = namespaces.join(\".\");\n\
		event.namespace_re = new RegExp(\"(^|\\\\.)\" + namespaces.join(\"\\\\.(?:.*\\\\.)?\") + \"(\\\\.|$)\");\n\
		\n\
		// triggerHandler() and global events don't bubble or run the default action\n\
		if ( onlyHandlers || !elem ) {\n\
			event.preventDefault();\n\
			event.stopPropagation();\n\
		}\n\
\n\
		// Handle a global trigger\n\
		if ( !elem ) {\n\
			// TODO: Stop taunting the data cache; remove global events and always attach to document\n\
			jQuery.each( jQuery.cache, function() {\n\
				// internalKey variable is just used to make it easier to find\n\
				// and potentially change this stuff later; currently it just\n\
				// points to jQuery.expando\n\
				var internalKey = jQuery.expando,\n\
					internalCache = this[ internalKey ];\n\
				if ( internalCache && internalCache.events && internalCache.events[ type ] ) {\n\
					jQuery.event.trigger( event, data, internalCache.handle.elem );\n\
				}\n\
			});\n\
			return;\n\
		}\n\
\n\
		// Don't do events on text and comment nodes\n\
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {\n\
			return;\n\
		}\n\
\n\
		// Clean up the event in case it is being reused\n\
		event.result = undefined;\n\
		event.target = elem;\n\
\n\
		// Clone any incoming data and prepend the event, creating the handler arg list\n\
		data = data != null ? jQuery.makeArray( data ) : [];\n\
		data.unshift( event );\n\
\n\
		var cur = elem,\n\
			// IE doesn't like method names with a colon (#3533, #8272)\n\
			ontype = type.indexOf(\":\") < 0 ? \"on\" + type : \"\";\n\
\n\
		// Fire event on the current element, then bubble up the DOM tree\n\
		do {\n\
			var handle = jQuery._data( cur, \"handle\" );\n\
\n\
			event.currentTarget = cur;\n\
			if ( handle ) {\n\
				handle.apply( cur, data );\n\
			}\n\
\n\
			// Trigger an inline bound script\n\
			if ( ontype && jQuery.acceptData( cur ) && cur[ ontype ] && cur[ ontype ].apply( cur, data ) === false ) {\n\
				event.result = false;\n\
				event.preventDefault();\n\
			}\n\
\n\
			// Bubble up to document, then to window\n\
			cur = cur.parentNode || cur.ownerDocument || cur === event.target.ownerDocument && window;\n\
		} while ( cur && !event.isPropagationStopped() );\n\
\n\
		// If nobody prevented the default action, do it now\n\
		if ( !event.isDefaultPrevented() ) {\n\
			var old,\n\
				special = jQuery.event.special[ type ] || {};\n\
\n\
			if ( (!special._default || special._default.call( elem.ownerDocument, event ) === false) &&\n\
				!(type === \"click\" && jQuery.nodeName( elem, \"a\" )) && jQuery.acceptData( elem ) ) {\n\
\n\
				// Call a native DOM method on the target with the same name name as the event.\n\
				// Can't use an .isFunction)() check here because IE6/7 fails that test.\n\
				// IE<9 dies on focus to hidden element (#1486), may want to revisit a try/catch.\n\
				try {\n\
					if ( ontype && elem[ type ] ) {\n\
						// Don't re-trigger an onFOO event when we call its FOO() method\n\
						old = elem[ ontype ];\n\
\n\
						if ( old ) {\n\
							elem[ ontype ] = null;\n\
						}\n\
\n\
						jQuery.event.triggered = type;\n\
						elem[ type ]();\n\
					}\n\
				} catch ( ieError ) {}\n\
\n\
				if ( old ) {\n\
					elem[ ontype ] = old;\n\
				}\n\
\n\
				jQuery.event.triggered = undefined;\n\
			}\n\
		}\n\
		\n\
		return event.result;\n\
	},\n\
\n\
	handle: function( event ) {\n\
		event = jQuery.event.fix( event || window.event );\n\
		// Snapshot the handlers list since a called handler may add/remove events.\n\
		var handlers = ((jQuery._data( this, \"events\" ) || {})[ event.type ] || []).slice(0),\n\
			run_all = !event.exclusive && !event.namespace,\n\
			args = Array.prototype.slice.call( arguments, 0 );\n\
\n\
		// Use the fix-ed Event rather than the (read-only) native event\n\
		args[0] = event;\n\
		event.currentTarget = this;\n\
\n\
		for ( var j = 0, l = handlers.length; j < l; j++ ) {\n\
			var handleObj = handlers[ j ];\n\
\n\
			// Triggered event must 1) be non-exclusive and have no namespace, or\n\
			// 2) have namespace(s) a subset or equal to those in the bound event.\n\
			if ( run_all || event.namespace_re.test( handleObj.namespace ) ) {\n\
				// Pass in a reference to the handler function itself\n\
				// So that we can later remove it\n\
				event.handler = handleObj.handler;\n\
				event.data = handleObj.data;\n\
				event.handleObj = handleObj;\n\
\n\
				var ret = handleObj.handler.apply( this, args );\n\
\n\
				if ( ret !== undefined ) {\n\
					event.result = ret;\n\
					if ( ret === false ) {\n\
						event.preventDefault();\n\
						event.stopPropagation();\n\
					}\n\
				}\n\
\n\
				if ( event.isImmediatePropagationStopped() ) {\n\
					break;\n\
				}\n\
			}\n\
		}\n\
		return event.result;\n\
	},\n\
\n\
	props: \"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which\".split(\" \"),\n\
\n\
	fix: function( event ) {\n\
		if ( event[ jQuery.expando ] ) {\n\
			return event;\n\
		}\n\
\n\
		// store a copy of the original event object\n\
		// and \"clone\" to set read-only properties\n\
		var originalEvent = event;\n\
		event = jQuery.Event( originalEvent );\n\
\n\
		for ( var i = this.props.length, prop; i; ) {\n\
			prop = this.props[ --i ];\n\
			event[ prop ] = originalEvent[ prop ];\n\
		}\n\
\n\
		// Fix target property, if necessary\n\
		if ( !event.target ) {\n\
			// Fixes #1925 where srcElement might not be defined either\n\
			event.target = event.srcElement || document;\n\
		}\n\
\n\
		// check if target is a textnode (safari)\n\
		if ( event.target.nodeType === 3 ) {\n\
			event.target = event.target.parentNode;\n\
		}\n\
\n\
		// Add relatedTarget, if necessary\n\
		if ( !event.relatedTarget && event.fromElement ) {\n\
			event.relatedTarget = event.fromElement === event.target ? event.toElement : event.fromElement;\n\
		}\n\
\n\
		// Calculate pageX/Y if missing and clientX/Y available\n\
		if ( event.pageX == null && event.clientX != null ) {\n\
			var eventDocument = event.target.ownerDocument || document,\n\
				doc = eventDocument.documentElement,\n\
				body = eventDocument.body;\n\
\n\
			event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);\n\
			event.pageY = event.clientY + (doc && doc.scrollTop  || body && body.scrollTop  || 0) - (doc && doc.clientTop  || body && body.clientTop  || 0);\n\
		}\n\
\n\
		// Add which for key events\n\
		if ( event.which == null && (event.charCode != null || event.keyCode != null) ) {\n\
			event.which = event.charCode != null ? event.charCode : event.keyCode;\n\
		}\n\
\n\
		// Add metaKey to non-Mac browsers (use ctrl for PC's and Meta for Macs)\n\
		if ( !event.metaKey && event.ctrlKey ) {\n\
			event.metaKey = event.ctrlKey;\n\
		}\n\
\n\
		// Add which for click: 1 === left; 2 === middle; 3 === right\n\
		// Note: button is not normalized, so don't use it\n\
		if ( !event.which && event.button !== undefined ) {\n\
			event.which = (event.button & 1 ? 1 : ( event.button & 2 ? 3 : ( event.button & 4 ? 2 : 0 ) ));\n\
		}\n\
\n\
		return event;\n\
	},\n\
\n\
	// Deprecated, use jQuery.guid instead\n\
	guid: 1E8,\n\
\n\
	// Deprecated, use jQuery.proxy instead\n\
	proxy: jQuery.proxy,\n\
\n\
	special: {\n\
		ready: {\n\
			// Make sure the ready event is setup\n\
			setup: jQuery.bindReady,\n\
			teardown: jQuery.noop\n\
		},\n\
\n\
		live: {\n\
			add: function( handleObj ) {\n\
				jQuery.event.add( this,\n\
					liveConvert( handleObj.origType, handleObj.selector ),\n\
					jQuery.extend({}, handleObj, {handler: liveHandler, guid: handleObj.handler.guid}) );\n\
			},\n\
\n\
			remove: function( handleObj ) {\n\
				jQuery.event.remove( this, liveConvert( handleObj.origType, handleObj.selector ), handleObj );\n\
			}\n\
		},\n\
\n\
		beforeunload: {\n\
			setup: function( data, namespaces, eventHandle ) {\n\
				// We only want to do this special case on windows\n\
				if ( jQuery.isWindow( this ) ) {\n\
					this.onbeforeunload = eventHandle;\n\
				}\n\
			},\n\
\n\
			teardown: function( namespaces, eventHandle ) {\n\
				if ( this.onbeforeunload === eventHandle ) {\n\
					this.onbeforeunload = null;\n\
				}\n\
			}\n\
		}\n\
	}\n\
};\n\
\n\
jQuery.removeEvent = document.removeEventListener ?\n\
	function( elem, type, handle ) {\n\
		if ( elem.removeEventListener ) {\n\
			elem.removeEventListener( type, handle, false );\n\
		}\n\
	} :\n\
	function( elem, type, handle ) {\n\
		if ( elem.detachEvent ) {\n\
			elem.detachEvent( \"on\" + type, handle );\n\
		}\n\
	};\n\
\n\
jQuery.Event = function( src, props ) {\n\
	// Allow instantiation without the 'new' keyword\n\
	if ( !this.preventDefault ) {\n\
		return new jQuery.Event( src, props );\n\
	}\n\
\n\
	// Event object\n\
	if ( src && src.type ) {\n\
		this.originalEvent = src;\n\
		this.type = src.type;\n\
\n\
		// Events bubbling up the document may have been marked as prevented\n\
		// by a handler lower down the tree; reflect the correct value.\n\
		this.isDefaultPrevented = (src.defaultPrevented || src.returnValue === false ||\n\
			src.getPreventDefault && src.getPreventDefault()) ? returnTrue : returnFalse;\n\
\n\
	// Event type\n\
	} else {\n\
		this.type = src;\n\
	}\n\
\n\
	// Put explicitly provided properties onto the event object\n\
	if ( props ) {\n\
		jQuery.extend( this, props );\n\
	}\n\
\n\
	// timeStamp is buggy for some events on Firefox(#3843)\n\
	// So we won't rely on the native value\n\
	this.timeStamp = jQuery.now();\n\
\n\
	// Mark it as fixed\n\
	this[ jQuery.expando ] = true;\n\
};\n\
\n\
function returnFalse() {\n\
	return false;\n\
}\n\
function returnTrue() {\n\
	return true;\n\
}\n\
\n\
// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding\n\
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html\n\
jQuery.Event.prototype = {\n\
	preventDefault: function() {\n\
		this.isDefaultPrevented = returnTrue;\n\
\n\
		var e = this.originalEvent;\n\
		if ( !e ) {\n\
			return;\n\
		}\n\
\n\
		// if preventDefault exists run it on the original event\n\
		if ( e.preventDefault ) {\n\
			e.preventDefault();\n\
\n\
		// otherwise set the returnValue property of the original event to false (IE)\n\
		} else {\n\
			e.returnValue = false;\n\
		}\n\
	},\n\
	stopPropagation: function() {\n\
		this.isPropagationStopped = returnTrue;\n\
\n\
		var e = this.originalEvent;\n\
		if ( !e ) {\n\
			return;\n\
		}\n\
		// if stopPropagation exists run it on the original event\n\
		if ( e.stopPropagation ) {\n\
			e.stopPropagation();\n\
		}\n\
		// otherwise set the cancelBubble property of the original event to true (IE)\n\
		e.cancelBubble = true;\n\
	},\n\
	stopImmediatePropagation: function() {\n\
		this.isImmediatePropagationStopped = returnTrue;\n\
		this.stopPropagation();\n\
	},\n\
	isDefaultPrevented: returnFalse,\n\
	isPropagationStopped: returnFalse,\n\
	isImmediatePropagationStopped: returnFalse\n\
};\n\
\n\
// Checks if an event happened on an element within another element\n\
// Used in jQuery.event.special.mouseenter and mouseleave handlers\n\
var withinElement = function( event ) {\n\
\n\
	// Check if mouse(over|out) are still within the same parent element\n\
	var related = event.relatedTarget,\n\
		inside = false,\n\
		eventType = event.type;\n\
\n\
	event.type = event.data;\n\
\n\
	if ( related !== this ) {\n\
\n\
		if ( related ) {\n\
			inside = jQuery.contains( this, related );\n\
		}\n\
\n\
		if ( !inside ) {\n\
\n\
			jQuery.event.handle.apply( this, arguments );\n\
\n\
			event.type = eventType;\n\
		}\n\
	}\n\
},\n\
\n\
// In case of event delegation, we only need to rename the event.type,\n\
// liveHandler will take care of the rest.\n\
delegate = function( event ) {\n\
	event.type = event.data;\n\
	jQuery.event.handle.apply( this, arguments );\n\
};\n\
\n\
// Create mouseenter and mouseleave events\n\
jQuery.each({\n\
	mouseenter: \"mouseover\",\n\
	mouseleave: \"mouseout\"\n\
}, function( orig, fix ) {\n\
	jQuery.event.special[ orig ] = {\n\
		setup: function( data ) {\n\
			jQuery.event.add( this, fix, data && data.selector ? delegate : withinElement, orig );\n\
		},\n\
		teardown: function( data ) {\n\
			jQuery.event.remove( this, fix, data && data.selector ? delegate : withinElement );\n\
		}\n\
	};\n\
});\n\
\n\
// submit delegation\n\
if ( !jQuery.support.submitBubbles ) {\n\
\n\
	jQuery.event.special.submit = {\n\
		setup: function( data, namespaces ) {\n\
			if ( !jQuery.nodeName( this, \"form\" ) ) {\n\
				jQuery.event.add(this, \"click.specialSubmit\", function( e ) {\n\
					// Avoid triggering error on non-existent type attribute in IE VML (#7071)\n\
					var elem = e.target,\n\
						type = jQuery.nodeName( elem, \"input\" ) || jQuery.nodeName( elem, \"button\" ) ? elem.type : \"\";\n\
\n\
					if ( (type === \"submit\" || type === \"image\") && jQuery( elem ).closest(\"form\").length ) {\n\
						trigger( \"submit\", this, arguments );\n\
					}\n\
				});\n\
\n\
				jQuery.event.add(this, \"keypress.specialSubmit\", function( e ) {\n\
					var elem = e.target,\n\
						type = jQuery.nodeName( elem, \"input\" ) || jQuery.nodeName( elem, \"button\" ) ? elem.type : \"\";\n\
\n\
					if ( (type === \"text\" || type === \"password\") && jQuery( elem ).closest(\"form\").length && e.keyCode === 13 ) {\n\
						trigger( \"submit\", this, arguments );\n\
					}\n\
				});\n\
\n\
			} else {\n\
				return false;\n\
			}\n\
		},\n\
\n\
		teardown: function( namespaces ) {\n\
			jQuery.event.remove( this, \".specialSubmit\" );\n\
		}\n\
	};\n\
\n\
}\n\
\n\
// change delegation, happens here so we have bind.\n\
if ( !jQuery.support.changeBubbles ) {\n\
\n\
	var changeFilters,\n\
\n\
	getVal = function( elem ) {\n\
		var type = jQuery.nodeName( elem, \"input\" ) ? elem.type : \"\",\n\
			val = elem.value;\n\
\n\
		if ( type === \"radio\" || type === \"checkbox\" ) {\n\
			val = elem.checked;\n\
\n\
		} else if ( type === \"select-multiple\" ) {\n\
			val = elem.selectedIndex > -1 ?\n\
				jQuery.map( elem.options, function( elem ) {\n\
					return elem.selected;\n\
				}).join(\"-\") :\n\
				\"\";\n\
\n\
		} else if ( jQuery.nodeName( elem, \"select\" ) ) {\n\
			val = elem.selectedIndex;\n\
		}\n\
\n\
		return val;\n\
	},\n\
\n\
	testChange = function testChange( e ) {\n\
		var elem = e.target, data, val;\n\
\n\
		if ( !rformElems.test( elem.nodeName ) || elem.readOnly ) {\n\
			return;\n\
		}\n\
\n\
		data = jQuery._data( elem, \"_change_data\" );\n\
		val = getVal(elem);\n\
\n\
		// the current data will be also retrieved by beforeactivate\n\
		if ( e.type !== \"focusout\" || elem.type !== \"radio\" ) {\n\
			jQuery._data( elem, \"_change_data\", val );\n\
		}\n\
\n\
		if ( data === undefined || val === data ) {\n\
			return;\n\
		}\n\
\n\
		if ( data != null || val ) {\n\
			e.type = \"change\";\n\
			e.liveFired = undefined;\n\
			jQuery.event.trigger( e, arguments[1], elem );\n\
		}\n\
	};\n\
\n\
	jQuery.event.special.change = {\n\
		filters: {\n\
			focusout: testChange,\n\
\n\
			beforedeactivate: testChange,\n\
\n\
			click: function( e ) {\n\
				var elem = e.target, type = jQuery.nodeName( elem, \"input\" ) ? elem.type : \"\";\n\
\n\
				if ( type === \"radio\" || type === \"checkbox\" || jQuery.nodeName( elem, \"select\" ) ) {\n\
					testChange.call( this, e );\n\
				}\n\
			},\n\
\n\
			// Change has to be called before submit\n\
			// Keydown will be called before keypress, which is used in submit-event delegation\n\
			keydown: function( e ) {\n\
				var elem = e.target, type = jQuery.nodeName( elem, \"input\" ) ? elem.type : \"\";\n\
\n\
				if ( (e.keyCode === 13 && !jQuery.nodeName( elem, \"textarea\" ) ) ||\n\
					(e.keyCode === 32 && (type === \"checkbox\" || type === \"radio\")) ||\n\
					type === \"select-multiple\" ) {\n\
					testChange.call( this, e );\n\
				}\n\
			},\n\
\n\
			// Beforeactivate happens also before the previous element is blurred\n\
			// with this event you can't trigger a change event, but you can store\n\
			// information\n\
			beforeactivate: function( e ) {\n\
				var elem = e.target;\n\
				jQuery._data( elem, \"_change_data\", getVal(elem) );\n\
			}\n\
		},\n\
\n\
		setup: function( data, namespaces ) {\n\
			if ( this.type === \"file\" ) {\n\
				return false;\n\
			}\n\
\n\
			for ( var type in changeFilters ) {\n\
				jQuery.event.add( this, type + \".specialChange\", changeFilters[type] );\n\
			}\n\
\n\
			return rformElems.test( this.nodeName );\n\
		},\n\
\n\
		teardown: function( namespaces ) {\n\
			jQuery.event.remove( this, \".specialChange\" );\n\
\n\
			return rformElems.test( this.nodeName );\n\
		}\n\
	};\n\
\n\
	changeFilters = jQuery.event.special.change.filters;\n\
\n\
	// Handle when the input is .focus()'d\n\
	changeFilters.focus = changeFilters.beforeactivate;\n\
}\n\
\n\
function trigger( type, elem, args ) {\n\
	// Piggyback on a donor event to simulate a different one.\n\
	// Fake originalEvent to avoid donor's stopPropagation, but if the\n\
	// simulated event prevents default then we do the same on the donor.\n\
	// Don't pass args or remember liveFired; they apply to the donor event.\n\
	var event = jQuery.extend( {}, args[ 0 ] );\n\
	event.type = type;\n\
	event.originalEvent = {};\n\
	event.liveFired = undefined;\n\
	jQuery.event.handle.call( elem, event );\n\
	if ( event.isDefaultPrevented() ) {\n\
		args[ 0 ].preventDefault();\n\
	}\n\
}\n\
\n\
// Create \"bubbling\" focus and blur events\n\
if ( !jQuery.support.focusinBubbles ) {\n\
	jQuery.each({ focus: \"focusin\", blur: \"focusout\" }, function( orig, fix ) {\n\
\n\
		// Attach a single capturing handler while someone wants focusin/focusout\n\
		var attaches = 0;\n\
\n\
		jQuery.event.special[ fix ] = {\n\
			setup: function() {\n\
				if ( attaches++ === 0 ) {\n\
					document.addEventListener( orig, handler, true );\n\
				}\n\
			},\n\
			teardown: function() {\n\
				if ( --attaches === 0 ) {\n\
					document.removeEventListener( orig, handler, true );\n\
				}\n\
			}\n\
		};\n\
\n\
		function handler( donor ) {\n\
			// Donor event is always a native one; fix it and switch its type.\n\
			// Let focusin/out handler cancel the donor focus/blur event.\n\
			var e = jQuery.event.fix( donor );\n\
			e.type = fix;\n\
			e.originalEvent = {};\n\
			jQuery.event.trigger( e, null, e.target );\n\
			if ( e.isDefaultPrevented() ) {\n\
				donor.preventDefault();\n\
			}\n\
		}\n\
	});\n\
}\n\
\n\
jQuery.each([\"bind\", \"one\"], function( i, name ) {\n\
	jQuery.fn[ name ] = function( type, data, fn ) {\n\
		var handler;\n\
\n\
		// Handle object literals\n\
		if ( typeof type === \"object\" ) {\n\
			for ( var key in type ) {\n\
				this[ name ](key, data, type[key], fn);\n\
			}\n\
			return this;\n\
		}\n\
\n\
		if ( arguments.length === 2 || data === false ) {\n\
			fn = data;\n\
			data = undefined;\n\
		}\n\
\n\
		if ( name === \"one\" ) {\n\
			handler = function( event ) {\n\
				jQuery( this ).unbind( event, handler );\n\
				return fn.apply( this, arguments );\n\
			};\n\
			handler.guid = fn.guid || jQuery.guid++;\n\
		} else {\n\
			handler = fn;\n\
		}\n\
\n\
		if ( type === \"unload\" && name !== \"one\" ) {\n\
			this.one( type, data, fn );\n\
\n\
		} else {\n\
			for ( var i = 0, l = this.length; i < l; i++ ) {\n\
				jQuery.event.add( this[i], type, handler, data );\n\
			}\n\
		}\n\
\n\
		return this;\n\
	};\n\
});\n\
\n\
jQuery.fn.extend({\n\
	unbind: function( type, fn ) {\n\
		// Handle object literals\n\
		if ( typeof type === \"object\" && !type.preventDefault ) {\n\
			for ( var key in type ) {\n\
				this.unbind(key, type[key]);\n\
			}\n\
\n\
		} else {\n\
			for ( var i = 0, l = this.length; i < l; i++ ) {\n\
				jQuery.event.remove( this[i], type, fn );\n\
			}\n\
		}\n\
\n\
		return this;\n\
	},\n\
\n\
	delegate: function( selector, types, data, fn ) {\n\
		return this.live( types, data, fn, selector );\n\
	},\n\
\n\
	undelegate: function( selector, types, fn ) {\n\
		if ( arguments.length === 0 ) {\n\
			return this.unbind( \"live\" );\n\
\n\
		} else {\n\
			return this.die( types, null, fn, selector );\n\
		}\n\
	},\n\
\n\
	trigger: function( type, data ) {\n\
		return this.each(function() {\n\
			jQuery.event.trigger( type, data, this );\n\
		});\n\
	},\n\
\n\
	triggerHandler: function( type, data ) {\n\
		if ( this[0] ) {\n\
			return jQuery.event.trigger( type, data, this[0], true );\n\
		}\n\
	},\n\
\n\
	toggle: function( fn ) {\n\
		// Save reference to arguments for access in closure\n\
		var args = arguments,\n\
			guid = fn.guid || jQuery.guid++,\n\
			i = 0,\n\
			toggler = function( event ) {\n\
				// Figure out which function to execute\n\
				var lastToggle = ( jQuery.data( this, \"lastToggle\" + fn.guid ) || 0 ) % i;\n\
				jQuery.data( this, \"lastToggle\" + fn.guid, lastToggle + 1 );\n\
\n\
				// Make sure that clicks stop\n\
				event.preventDefault();\n\
\n\
				// and execute the function\n\
				return args[ lastToggle ].apply( this, arguments ) || false;\n\
			};\n\
\n\
		// link all the functions, so any of them can unbind this click handler\n\
		toggler.guid = guid;\n\
		while ( i < args.length ) {\n\
			args[ i++ ].guid = guid;\n\
		}\n\
\n\
		return this.click( toggler );\n\
	},\n\
\n\
	hover: function( fnOver, fnOut ) {\n\
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );\n\
	}\n\
});\n\
\n\
var liveMap = {\n\
	focus: \"focusin\",\n\
	blur: \"focusout\",\n\
	mouseenter: \"mouseover\",\n\
	mouseleave: \"mouseout\"\n\
};\n\
\n\
jQuery.each([\"live\", \"die\"], function( i, name ) {\n\
	jQuery.fn[ name ] = function( types, data, fn, origSelector /* Internal Use Only */ ) {\n\
		var type, i = 0, match, namespaces, preType,\n\
			selector = origSelector || this.selector,\n\
			context = origSelector ? this : jQuery( this.context );\n\
\n\
		if ( typeof types === \"object\" && !types.preventDefault ) {\n\
			for ( var key in types ) {\n\
				context[ name ]( key, data, types[key], selector );\n\
			}\n\
\n\
			return this;\n\
		}\n\
\n\
		if ( name === \"die\" && !types &&\n\
					origSelector && origSelector.charAt(0) === \".\" ) {\n\
\n\
			context.unbind( origSelector );\n\
\n\
			return this;\n\
		}\n\
\n\
		if ( data === false || jQuery.isFunction( data ) ) {\n\
			fn = data || returnFalse;\n\
			data = undefined;\n\
		}\n\
\n\
		types = (types || \"\").split(\" \");\n\
\n\
		while ( (type = types[ i++ ]) != null ) {\n\
			match = rnamespaces.exec( type );\n\
			namespaces = \"\";\n\
\n\
			if ( match )  {\n\
				namespaces = match[0];\n\
				type = type.replace( rnamespaces, \"\" );\n\
			}\n\
\n\
			if ( type === \"hover\" ) {\n\
				types.push( \"mouseenter\" + namespaces, \"mouseleave\" + namespaces );\n\
				continue;\n\
			}\n\
\n\
			preType = type;\n\
\n\
			if ( liveMap[ type ] ) {\n\
				types.push( liveMap[ type ] + namespaces );\n\
				type = type + namespaces;\n\
\n\
			} else {\n\
				type = (liveMap[ type ] || type) + namespaces;\n\
			}\n\
\n\
			if ( name === \"live\" ) {\n\
				// bind live handler\n\
				for ( var j = 0, l = context.length; j < l; j++ ) {\n\
					jQuery.event.add( context[j], \"live.\" + liveConvert( type, selector ),\n\
						{ data: data, selector: selector, handler: fn, origType: type, origHandler: fn, preType: preType } );\n\
				}\n\
\n\
			} else {\n\
				// unbind live handler\n\
				context.unbind( \"live.\" + liveConvert( type, selector ), fn );\n\
			}\n\
		}\n\
\n\
		return this;\n\
	};\n\
});\n\
\n\
function liveHandler( event ) {\n\
	var stop, maxLevel, related, match, handleObj, elem, j, i, l, data, close, namespace, ret,\n\
		elems = [],\n\
		selectors = [],\n\
		events = jQuery._data( this, \"events\" );\n\
\n\
	// Make sure we avoid non-left-click bubbling in Firefox (#3861) and disabled elements in IE (#6911)\n\
	if ( event.liveFired === this || !events || !events.live || event.target.disabled || event.button && event.type === \"click\" ) {\n\
		return;\n\
	}\n\
\n\
	if ( event.namespace ) {\n\
		namespace = new RegExp(\"(^|\\\\.)\" + event.namespace.split(\".\").join(\"\\\\.(?:.*\\\\.)?\") + \"(\\\\.|$)\");\n\
	}\n\
\n\
	event.liveFired = this;\n\
\n\
	var live = events.live.slice(0);\n\
\n\
	for ( j = 0; j < live.length; j++ ) {\n\
		handleObj = live[j];\n\
\n\
		if ( handleObj.origType.replace( rnamespaces, \"\" ) === event.type ) {\n\
			selectors.push( handleObj.selector );\n\
\n\
		} else {\n\
			live.splice( j--, 1 );\n\
		}\n\
	}\n\
\n\
	match = jQuery( event.target ).closest( selectors, event.currentTarget );\n\
\n\
	for ( i = 0, l = match.length; i < l; i++ ) {\n\
		close = match[i];\n\
\n\
		for ( j = 0; j < live.length; j++ ) {\n\
			handleObj = live[j];\n\
\n\
			if ( close.selector === handleObj.selector && (!namespace || namespace.test( handleObj.namespace )) && !close.elem.disabled ) {\n\
				elem = close.elem;\n\
				related = null;\n\
\n\
				// Those two events require additional checking\n\
				if ( handleObj.preType === \"mouseenter\" || handleObj.preType === \"mouseleave\" ) {\n\
					event.type = handleObj.preType;\n\
					related = jQuery( event.relatedTarget ).closest( handleObj.selector )[0];\n\
\n\
					// Make sure not to accidentally match a child element with the same selector\n\
					if ( related && jQuery.contains( elem, related ) ) {\n\
						related = elem;\n\
					}\n\
				}\n\
\n\
				if ( !related || related !== elem ) {\n\
					elems.push({ elem: elem, handleObj: handleObj, level: close.level });\n\
				}\n\
			}\n\
		}\n\
	}\n\
\n\
	for ( i = 0, l = elems.length; i < l; i++ ) {\n\
		match = elems[i];\n\
\n\
		if ( maxLevel && match.level > maxLevel ) {\n\
			break;\n\
		}\n\
\n\
		event.currentTarget = match.elem;\n\
		event.data = match.handleObj.data;\n\
		event.handleObj = match.handleObj;\n\
\n\
		ret = match.handleObj.origHandler.apply( match.elem, arguments );\n\
\n\
		if ( ret === false || event.isPropagationStopped() ) {\n\
			maxLevel = match.level;\n\
\n\
			if ( ret === false ) {\n\
				stop = false;\n\
			}\n\
			if ( event.isImmediatePropagationStopped() ) {\n\
				break;\n\
			}\n\
		}\n\
	}\n\
\n\
	return stop;\n\
}\n\
\n\
function liveConvert( type, selector ) {\n\
	return (type && type !== \"*\" ? type + \".\" : \"\") + selector.replace(rperiod, \"`\").replace(rspaces, \"&\");\n\
}\n\
\n\
jQuery.each( (\"blur focus focusin focusout load resize scroll unload click dblclick \" +\n\
	\"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave \" +\n\
	\"change select submit keydown keypress keyup error\").split(\" \"), function( i, name ) {\n\
\n\
	// Handle event binding\n\
	jQuery.fn[ name ] = function( data, fn ) {\n\
		if ( fn == null ) {\n\
			fn = data;\n\
			data = null;\n\
		}\n\
\n\
		return arguments.length > 0 ?\n\
			this.bind( name, data, fn ) :\n\
			this.trigger( name );\n\
	};\n\
\n\
	if ( jQuery.attrFn ) {\n\
		jQuery.attrFn[ name ] = true;\n\
	}\n\
});\n\
\n\
\n\
\n\
/*!\n\
 * Sizzle CSS Selector Engine\n\
 *  Copyright 2011, The Dojo Foundation\n\
 *  Released under the MIT, BSD, and GPL Licenses.\n\
 *  More information: http://sizzlejs.com/\n\
 */\n\
(function(){\n\
\n\
var chunker = /((?:\\((?:\\([^()]+\\)|[^()]+)+\\)|\\[(?:\\[[^\\[\\]]*\\]|['\"][^'\"]*['\"]|[^\\[\\]'\"]+)+\\]|\\\\.|[^ >+~,(\\[\\\\]+)+|[>+~])(\\s*,\\s*)?((?:.|\\r|\\n)*)/g,\n\
	done = 0,\n\
	toString = Object.prototype.toString,\n\
	hasDuplicate = false,\n\
	baseHasDuplicate = true,\n\
	rBackslash = /\\\\/g,\n\
	rNonWord = /\\W/;\n\
\n\
// Here we check if the JavaScript engine is using some sort of\n\
// optimization where it does not always call our comparision\n\
// function. If that is the case, discard the hasDuplicate value.\n\
//   Thus far that includes Google Chrome.\n\
[0, 0].sort(function() {\n\
	baseHasDuplicate = false;\n\
	return 0;\n\
});\n\
\n\
var Sizzle = function( selector, context, results, seed ) {\n\
	results = results || [];\n\
	context = context || document;\n\
\n\
	var origContext = context;\n\
\n\
	if ( context.nodeType !== 1 && context.nodeType !== 9 ) {\n\
		return [];\n\
	}\n\
	\n\
	if ( !selector || typeof selector !== \"string\" ) {\n\
		return results;\n\
	}\n\
\n\
	var m, set, checkSet, extra, ret, cur, pop, i,\n\
		prune = true,\n\
		contextXML = Sizzle.isXML( context ),\n\
		parts = [],\n\
		soFar = selector;\n\
	\n\
	// Reset the position of the chunker regexp (start from head)\n\
	do {\n\
		chunker.exec( \"\" );\n\
		m = chunker.exec( soFar );\n\
\n\
		if ( m ) {\n\
			soFar = m[3];\n\
		\n\
			parts.push( m[1] );\n\
		\n\
			if ( m[2] ) {\n\
				extra = m[3];\n\
				break;\n\
			}\n\
		}\n\
	} while ( m );\n\
\n\
	if ( parts.length > 1 && origPOS.exec( selector ) ) {\n\
\n\
		if ( parts.length === 2 && Expr.relative[ parts[0] ] ) {\n\
			set = posProcess( parts[0] + parts[1], context );\n\
\n\
		} else {\n\
			set = Expr.relative[ parts[0] ] ?\n\
				[ context ] :\n\
				Sizzle( parts.shift(), context );\n\
\n\
			while ( parts.length ) {\n\
				selector = parts.shift();\n\
\n\
				if ( Expr.relative[ selector ] ) {\n\
					selector += parts.shift();\n\
				}\n\
				\n\
				set = posProcess( selector, set );\n\
			}\n\
		}\n\
\n\
	} else {\n\
		// Take a shortcut and set the context if the root selector is an ID\n\
		// (but not if it'll be faster if the inner selector is an ID)\n\
		if ( !seed && parts.length > 1 && context.nodeType === 9 && !contextXML &&\n\
				Expr.match.ID.test(parts[0]) && !Expr.match.ID.test(parts[parts.length - 1]) ) {\n\
\n\
			ret = Sizzle.find( parts.shift(), context, contextXML );\n\
			context = ret.expr ?\n\
				Sizzle.filter( ret.expr, ret.set )[0] :\n\
				ret.set[0];\n\
		}\n\
\n\
		if ( context ) {\n\
			ret = seed ?\n\
				{ expr: parts.pop(), set: makeArray(seed) } :\n\
				Sizzle.find( parts.pop(), parts.length === 1 && (parts[0] === \"~\" || parts[0] === \"+\") && context.parentNode ? context.parentNode : context, contextXML );\n\
\n\
			set = ret.expr ?\n\
				Sizzle.filter( ret.expr, ret.set ) :\n\
				ret.set;\n\
\n\
			if ( parts.length > 0 ) {\n\
				checkSet = makeArray( set );\n\
\n\
			} else {\n\
				prune = false;\n\
			}\n\
\n\
			while ( parts.length ) {\n\
				cur = parts.pop();\n\
				pop = cur;\n\
\n\
				if ( !Expr.relative[ cur ] ) {\n\
					cur = \"\";\n\
				} else {\n\
					pop = parts.pop();\n\
				}\n\
\n\
				if ( pop == null ) {\n\
					pop = context;\n\
				}\n\
\n\
				Expr.relative[ cur ]( checkSet, pop, contextXML );\n\
			}\n\
\n\
		} else {\n\
			checkSet = parts = [];\n\
		}\n\
	}\n\
\n\
	if ( !checkSet ) {\n\
		checkSet = set;\n\
	}\n\
\n\
	if ( !checkSet ) {\n\
		Sizzle.error( cur || selector );\n\
	}\n\
\n\
	if ( toString.call(checkSet) === \"[object Array]\" ) {\n\
		if ( !prune ) {\n\
			results.push.apply( results, checkSet );\n\
\n\
		} else if ( context && context.nodeType === 1 ) {\n\
			for ( i = 0; checkSet[i] != null; i++ ) {\n\
				if ( checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && Sizzle.contains(context, checkSet[i])) ) {\n\
					results.push( set[i] );\n\
				}\n\
			}\n\
\n\
		} else {\n\
			for ( i = 0; checkSet[i] != null; i++ ) {\n\
				if ( checkSet[i] && checkSet[i].nodeType === 1 ) {\n\
					results.push( set[i] );\n\
				}\n\
			}\n\
		}\n\
\n\
	} else {\n\
		makeArray( checkSet, results );\n\
	}\n\
\n\
	if ( extra ) {\n\
		Sizzle( extra, origContext, results, seed );\n\
		Sizzle.uniqueSort( results );\n\
	}\n\
\n\
	return results;\n\
};\n\
\n\
Sizzle.uniqueSort = function( results ) {\n\
	if ( sortOrder ) {\n\
		hasDuplicate = baseHasDuplicate;\n\
		results.sort( sortOrder );\n\
\n\
		if ( hasDuplicate ) {\n\
			for ( var i = 1; i < results.length; i++ ) {\n\
				if ( results[i] === results[ i - 1 ] ) {\n\
					results.splice( i--, 1 );\n\
				}\n\
			}\n\
		}\n\
	}\n\
\n\
	return results;\n\
};\n\
\n\
Sizzle.matches = function( expr, set ) {\n\
	return Sizzle( expr, null, null, set );\n\
};\n\
\n\
Sizzle.matchesSelector = function( node, expr ) {\n\
	return Sizzle( expr, null, null, [node] ).length > 0;\n\
};\n\
\n\
Sizzle.find = function( expr, context, isXML ) {\n\
	var set;\n\
\n\
	if ( !expr ) {\n\
		return [];\n\
	}\n\
\n\
	for ( var i = 0, l = Expr.order.length; i < l; i++ ) {\n\
		var match,\n\
			type = Expr.order[i];\n\
		\n\
		if ( (match = Expr.leftMatch[ type ].exec( expr )) ) {\n\
			var left = match[1];\n\
			match.splice( 1, 1 );\n\
\n\
			if ( left.substr( left.length - 1 ) !== \"\\\\\" ) {\n\
				match[1] = (match[1] || \"\").replace( rBackslash, \"\" );\n\
				set = Expr.find[ type ]( match, context, isXML );\n\
\n\
				if ( set != null ) {\n\
					expr = expr.replace( Expr.match[ type ], \"\" );\n\
					break;\n\
				}\n\
			}\n\
		}\n\
	}\n\
\n\
	if ( !set ) {\n\
		set = typeof context.getElementsByTagName !== \"undefined\" ?\n\
			context.getElementsByTagName( \"*\" ) :\n\
			[];\n\
	}\n\
\n\
	return { set: set, expr: expr };\n\
};\n\
\n\
Sizzle.filter = function( expr, set, inplace, not ) {\n\
	var match, anyFound,\n\
		old = expr,\n\
		result = [],\n\
		curLoop = set,\n\
		isXMLFilter = set && set[0] && Sizzle.isXML( set[0] );\n\
\n\
	while ( expr && set.length ) {\n\
		for ( var type in Expr.filter ) {\n\
			if ( (match = Expr.leftMatch[ type ].exec( expr )) != null && match[2] ) {\n\
				var found, item,\n\
					filter = Expr.filter[ type ],\n\
					left = match[1];\n\
\n\
				anyFound = false;\n\
\n\
				match.splice(1,1);\n\
\n\
				if ( left.substr( left.length - 1 ) === \"\\\\\" ) {\n\
					continue;\n\
				}\n\
\n\
				if ( curLoop === result ) {\n\
					result = [];\n\
				}\n\
\n\
				if ( Expr.preFilter[ type ] ) {\n\
					match = Expr.preFilter[ type ]( match, curLoop, inplace, result, not, isXMLFilter );\n\
\n\
					if ( !match ) {\n\
						anyFound = found = true;\n\
\n\
					} else if ( match === true ) {\n\
						continue;\n\
					}\n\
				}\n\
\n\
				if ( match ) {\n\
					for ( var i = 0; (item = curLoop[i]) != null; i++ ) {\n\
						if ( item ) {\n\
							found = filter( item, match, i, curLoop );\n\
							var pass = not ^ !!found;\n\
\n\
							if ( inplace && found != null ) {\n\
								if ( pass ) {\n\
									anyFound = true;\n\
\n\
								} else {\n\
									curLoop[i] = false;\n\
								}\n\
\n\
							} else if ( pass ) {\n\
								result.push( item );\n\
								anyFound = true;\n\
							}\n\
						}\n\
					}\n\
				}\n\
\n\
				if ( found !== undefined ) {\n\
					if ( !inplace ) {\n\
						curLoop = result;\n\
					}\n\
\n\
					expr = expr.replace( Expr.match[ type ], \"\" );\n\
\n\
					if ( !anyFound ) {\n\
						return [];\n\
					}\n\
\n\
					break;\n\
				}\n\
			}\n\
		}\n\
\n\
		// Improper expression\n\
		if ( expr === old ) {\n\
			if ( anyFound == null ) {\n\
				Sizzle.error( expr );\n\
\n\
			} else {\n\
				break;\n\
			}\n\
		}\n\
\n\
		old = expr;\n\
	}\n\
\n\
	return curLoop;\n\
};\n\
\n\
Sizzle.error = function( msg ) {\n\
	throw \"Syntax error, unrecognized expression: \" + msg;\n\
};\n\
\n\
var Expr = Sizzle.selectors = {\n\
	order: [ \"ID\", \"NAME\", \"TAG\" ],\n\
\n\
	match: {\n\
		ID: /#((?:[\\w\\u00c0-\\uFFFF\\-]|\\\\.)+)/,\n\
		CLASS: /\\.((?:[\\w\\u00c0-\\uFFFF\\-]|\\\\.)+)/,\n\
		NAME: /\\[name=['\"]*((?:[\\w\\u00c0-\\uFFFF\\-]|\\\\.)+)['\"]*\\]/,\n\
		ATTR: /\\[\\s*((?:[\\w\\u00c0-\\uFFFF\\-]|\\\\.)+)\\s*(?:(\\S?=)\\s*(?:(['\"])(.*?)\\3|(#?(?:[\\w\\u00c0-\\uFFFF\\-]|\\\\.)*)|)|)\\s*\\]/,\n\
		TAG: /^((?:[\\w\\u00c0-\\uFFFF\\*\\-]|\\\\.)+)/,\n\
		CHILD: /:(only|nth|last|first)-child(?:\\(\\s*(even|odd|(?:[+\\-]?\\d+|(?:[+\\-]?\\d*)?n\\s*(?:[+\\-]\\s*\\d+)?))\\s*\\))?/,\n\
		POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\\((\\d*)\\))?(?=[^\\-]|$)/,\n\
		PSEUDO: /:((?:[\\w\\u00c0-\\uFFFF\\-]|\\\\.)+)(?:\\((['\"]?)((?:\\([^\\)]+\\)|[^\\(\\)]*)+)\\2\\))?/\n\
	},\n\
\n\
	leftMatch: {},\n\
\n\
	attrMap: {\n\
		\"class\": \"className\",\n\
		\"for\": \"htmlFor\"\n\
	},\n\
\n\
	attrHandle: {\n\
		href: function( elem ) {\n\
			return elem.getAttribute( \"href\" );\n\
		},\n\
		type: function( elem ) {\n\
			return elem.getAttribute( \"type\" );\n\
		}\n\
	},\n\
\n\
	relative: {\n\
		\"+\": function(checkSet, part){\n\
			var isPartStr = typeof part === \"string\",\n\
				isTag = isPartStr && !rNonWord.test( part ),\n\
				isPartStrNotTag = isPartStr && !isTag;\n\
\n\
			if ( isTag ) {\n\
				part = part.toLowerCase();\n\
			}\n\
\n\
			for ( var i = 0, l = checkSet.length, elem; i < l; i++ ) {\n\
				if ( (elem = checkSet[i]) ) {\n\
					while ( (elem = elem.previousSibling) && elem.nodeType !== 1 ) {}\n\
\n\
					checkSet[i] = isPartStrNotTag || elem && elem.nodeName.toLowerCase() === part ?\n\
						elem || false :\n\
						elem === part;\n\
				}\n\
			}\n\
\n\
			if ( isPartStrNotTag ) {\n\
				Sizzle.filter( part, checkSet, true );\n\
			}\n\
		},\n\
\n\
		\">\": function( checkSet, part ) {\n\
			var elem,\n\
				isPartStr = typeof part === \"string\",\n\
				i = 0,\n\
				l = checkSet.length;\n\
\n\
			if ( isPartStr && !rNonWord.test( part ) ) {\n\
				part = part.toLowerCase();\n\
\n\
				for ( ; i < l; i++ ) {\n\
					elem = checkSet[i];\n\
\n\
					if ( elem ) {\n\
						var parent = elem.parentNode;\n\
						checkSet[i] = parent.nodeName.toLowerCase() === part ? parent : false;\n\
					}\n\
				}\n\
\n\
			} else {\n\
				for ( ; i < l; i++ ) {\n\
					elem = checkSet[i];\n\
\n\
					if ( elem ) {\n\
						checkSet[i] = isPartStr ?\n\
							elem.parentNode :\n\
							elem.parentNode === part;\n\
					}\n\
				}\n\
\n\
				if ( isPartStr ) {\n\
					Sizzle.filter( part, checkSet, true );\n\
				}\n\
			}\n\
		},\n\
\n\
		\"\": function(checkSet, part, isXML){\n\
			var nodeCheck,\n\
				doneName = done++,\n\
				checkFn = dirCheck;\n\
\n\
			if ( typeof part === \"string\" && !rNonWord.test( part ) ) {\n\
				part = part.toLowerCase();\n\
				nodeCheck = part;\n\
				checkFn = dirNodeCheck;\n\
			}\n\
\n\
			checkFn( \"parentNode\", part, doneName, checkSet, nodeCheck, isXML );\n\
		},\n\
\n\
		\"~\": function( checkSet, part, isXML ) {\n\
			var nodeCheck,\n\
				doneName = done++,\n\
				checkFn = dirCheck;\n\
\n\
			if ( typeof part === \"string\" && !rNonWord.test( part ) ) {\n\
				part = part.toLowerCase();\n\
				nodeCheck = part;\n\
				checkFn = dirNodeCheck;\n\
			}\n\
\n\
			checkFn( \"previousSibling\", part, doneName, checkSet, nodeCheck, isXML );\n\
		}\n\
	},\n\
\n\
	find: {\n\
		ID: function( match, context, isXML ) {\n\
			if ( typeof context.getElementById !== \"undefined\" && !isXML ) {\n\
				var m = context.getElementById(match[1]);\n\
				// Check parentNode to catch when Blackberry 4.6 returns\n\
				// nodes that are no longer in the document #6963\n\
				return m && m.parentNode ? [m] : [];\n\
			}\n\
		},\n\
\n\
		NAME: function( match, context ) {\n\
			if ( typeof context.getElementsByName !== \"undefined\" ) {\n\
				var ret = [],\n\
					results = context.getElementsByName( match[1] );\n\
\n\
				for ( var i = 0, l = results.length; i < l; i++ ) {\n\
					if ( results[i].getAttribute(\"name\") === match[1] ) {\n\
						ret.push( results[i] );\n\
					}\n\
				}\n\
\n\
				return ret.length === 0 ? null : ret;\n\
			}\n\
		},\n\
\n\
		TAG: function( match, context ) {\n\
			if ( typeof context.getElementsByTagName !== \"undefined\" ) {\n\
				return context.getElementsByTagName( match[1] );\n\
			}\n\
		}\n\
	},\n\
	preFilter: {\n\
		CLASS: function( match, curLoop, inplace, result, not, isXML ) {\n\
			match = \" \" + match[1].replace( rBackslash, \"\" ) + \" \";\n\
\n\
			if ( isXML ) {\n\
				return match;\n\
			}\n\
\n\
			for ( var i = 0, elem; (elem = curLoop[i]) != null; i++ ) {\n\
				if ( elem ) {\n\
					if ( not ^ (elem.className && (\" \" + elem.className + \" \").replace(/[\\t\\n\\r]/g, \" \").indexOf(match) >= 0) ) {\n\
						if ( !inplace ) {\n\
							result.push( elem );\n\
						}\n\
\n\
					} else if ( inplace ) {\n\
						curLoop[i] = false;\n\
					}\n\
				}\n\
			}\n\
\n\
			return false;\n\
		},\n\
\n\
		ID: function( match ) {\n\
			return match[1].replace( rBackslash, \"\" );\n\
		},\n\
\n\
		TAG: function( match, curLoop ) {\n\
			return match[1].replace( rBackslash, \"\" ).toLowerCase();\n\
		},\n\
\n\
		CHILD: function( match ) {\n\
			if ( match[1] === \"nth\" ) {\n\
				if ( !match[2] ) {\n\
					Sizzle.error( match[0] );\n\
				}\n\
\n\
				match[2] = match[2].replace(/^\\+|\\s*/g, '');\n\
\n\
				// parse equations like 'even', 'odd', '5', '2n', '3n+2', '4n-1', '-n+6'\n\
				var test = /(-?)(\\d*)(?:n([+\\-]?\\d*))?/.exec(\n\
					match[2] === \"even\" && \"2n\" || match[2] === \"odd\" && \"2n+1\" ||\n\
					!/\\D/.test( match[2] ) && \"0n+\" + match[2] || match[2]);\n\
\n\
				// calculate the numbers (first)n+(last) including if they are negative\n\
				match[2] = (test[1] + (test[2] || 1)) - 0;\n\
				match[3] = test[3] - 0;\n\
			}\n\
			else if ( match[2] ) {\n\
				Sizzle.error( match[0] );\n\
			}\n\
\n\
			// TODO: Move to normal caching system\n\
			match[0] = done++;\n\
\n\
			return match;\n\
		},\n\
\n\
		ATTR: function( match, curLoop, inplace, result, not, isXML ) {\n\
			var name = match[1] = match[1].replace( rBackslash, \"\" );\n\
			\n\
			if ( !isXML && Expr.attrMap[name] ) {\n\
				match[1] = Expr.attrMap[name];\n\
			}\n\
\n\
			// Handle if an un-quoted value was used\n\
			match[4] = ( match[4] || match[5] || \"\" ).replace( rBackslash, \"\" );\n\
\n\
			if ( match[2] === \"~=\" ) {\n\
				match[4] = \" \" + match[4] + \" \";\n\
			}\n\
\n\
			return match;\n\
		},\n\
\n\
		PSEUDO: function( match, curLoop, inplace, result, not ) {\n\
			if ( match[1] === \"not\" ) {\n\
				// If we're dealing with a complex expression, or a simple one\n\
				if ( ( chunker.exec(match[3]) || \"\" ).length > 1 || /^\\w/.test(match[3]) ) {\n\
					match[3] = Sizzle(match[3], null, null, curLoop);\n\
\n\
				} else {\n\
					var ret = Sizzle.filter(match[3], curLoop, inplace, true ^ not);\n\
\n\
					if ( !inplace ) {\n\
						result.push.apply( result, ret );\n\
					}\n\
\n\
					return false;\n\
				}\n\
\n\
			} else if ( Expr.match.POS.test( match[0] ) || Expr.match.CHILD.test( match[0] ) ) {\n\
				return true;\n\
			}\n\
			\n\
			return match;\n\
		},\n\
\n\
		POS: function( match ) {\n\
			match.unshift( true );\n\
\n\
			return match;\n\
		}\n\
	},\n\
	\n\
	filters: {\n\
		enabled: function( elem ) {\n\
			return elem.disabled === false && elem.type !== \"hidden\";\n\
		},\n\
\n\
		disabled: function( elem ) {\n\
			return elem.disabled === true;\n\
		},\n\
\n\
		checked: function( elem ) {\n\
			return elem.checked === true;\n\
		},\n\
		\n\
		selected: function( elem ) {\n\
			// Accessing this property makes selected-by-default\n\
			// options in Safari work properly\n\
			if ( elem.parentNode ) {\n\
				elem.parentNode.selectedIndex;\n\
			}\n\
			\n\
			return elem.selected === true;\n\
		},\n\
\n\
		parent: function( elem ) {\n\
			return !!elem.firstChild;\n\
		},\n\
\n\
		empty: function( elem ) {\n\
			return !elem.firstChild;\n\
		},\n\
\n\
		has: function( elem, i, match ) {\n\
			return !!Sizzle( match[3], elem ).length;\n\
		},\n\
\n\
		header: function( elem ) {\n\
			return (/h\\d/i).test( elem.nodeName );\n\
		},\n\
\n\
		text: function( elem ) {\n\
			var attr = elem.getAttribute( \"type\" ), type = elem.type;\n\
			// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc) \n\
			// use getAttribute instead to test this case\n\
			return elem.nodeName.toLowerCase() === \"input\" && \"text\" === type && ( attr === type || attr === null );\n\
		},\n\
\n\
		radio: function( elem ) {\n\
			return elem.nodeName.toLowerCase() === \"input\" && \"radio\" === elem.type;\n\
		},\n\
\n\
		checkbox: function( elem ) {\n\
			return elem.nodeName.toLowerCase() === \"input\" && \"checkbox\" === elem.type;\n\
		},\n\
\n\
		file: function( elem ) {\n\
			return elem.nodeName.toLowerCase() === \"input\" && \"file\" === elem.type;\n\
		},\n\
\n\
		password: function( elem ) {\n\
			return elem.nodeName.toLowerCase() === \"input\" && \"password\" === elem.type;\n\
		},\n\
\n\
		submit: function( elem ) {\n\
			var name = elem.nodeName.toLowerCase();\n\
			return (name === \"input\" || name === \"button\") && \"submit\" === elem.type;\n\
		},\n\
\n\
		image: function( elem ) {\n\
			return elem.nodeName.toLowerCase() === \"input\" && \"image\" === elem.type;\n\
		},\n\
\n\
		reset: function( elem ) {\n\
			var name = elem.nodeName.toLowerCase();\n\
			return (name === \"input\" || name === \"button\") && \"reset\" === elem.type;\n\
		},\n\
\n\
		button: function( elem ) {\n\
			var name = elem.nodeName.toLowerCase();\n\
			return name === \"input\" && \"button\" === elem.type || name === \"button\";\n\
		},\n\
\n\
		input: function( elem ) {\n\
			return (/input|select|textarea|button/i).test( elem.nodeName );\n\
		},\n\
\n\
		focus: function( elem ) {\n\
			return elem === elem.ownerDocument.activeElement;\n\
		}\n\
	},\n\
	setFilters: {\n\
		first: function( elem, i ) {\n\
			return i === 0;\n\
		},\n\
\n\
		last: function( elem, i, match, array ) {\n\
			return i === array.length - 1;\n\
		},\n\
\n\
		even: function( elem, i ) {\n\
			return i % 2 === 0;\n\
		},\n\
\n\
		odd: function( elem, i ) {\n\
			return i % 2 === 1;\n\
		},\n\
\n\
		lt: function( elem, i, match ) {\n\
			return i < match[3] - 0;\n\
		},\n\
\n\
		gt: function( elem, i, match ) {\n\
			return i > match[3] - 0;\n\
		},\n\
\n\
		nth: function( elem, i, match ) {\n\
			return match[3] - 0 === i;\n\
		},\n\
\n\
		eq: function( elem, i, match ) {\n\
			return match[3] - 0 === i;\n\
		}\n\
	},\n\
	filter: {\n\
		PSEUDO: function( elem, match, i, array ) {\n\
			var name = match[1],\n\
				filter = Expr.filters[ name ];\n\
\n\
			if ( filter ) {\n\
				return filter( elem, i, match, array );\n\
\n\
			} else if ( name === \"contains\" ) {\n\
				return (elem.textContent || elem.innerText || Sizzle.getText([ elem ]) || \"\").indexOf(match[3]) >= 0;\n\
\n\
			} else if ( name === \"not\" ) {\n\
				var not = match[3];\n\
\n\
				for ( var j = 0, l = not.length; j < l; j++ ) {\n\
					if ( not[j] === elem ) {\n\
						return false;\n\
					}\n\
				}\n\
\n\
				return true;\n\
\n\
			} else {\n\
				Sizzle.error( name );\n\
			}\n\
		},\n\
\n\
		CHILD: function( elem, match ) {\n\
			var type = match[1],\n\
				node = elem;\n\
\n\
			switch ( type ) {\n\
				case \"only\":\n\
				case \"first\":\n\
					while ( (node = node.previousSibling) )	 {\n\
						if ( node.nodeType === 1 ) { \n\
							return false; \n\
						}\n\
					}\n\
\n\
					if ( type === \"first\" ) { \n\
						return true; \n\
					}\n\
\n\
					node = elem;\n\
\n\
				case \"last\":\n\
					while ( (node = node.nextSibling) )	 {\n\
						if ( node.nodeType === 1 ) { \n\
							return false; \n\
						}\n\
					}\n\
\n\
					return true;\n\
\n\
				case \"nth\":\n\
					var first = match[2],\n\
						last = match[3];\n\
\n\
					if ( first === 1 && last === 0 ) {\n\
						return true;\n\
					}\n\
					\n\
					var doneName = match[0],\n\
						parent = elem.parentNode;\n\
	\n\
					if ( parent && (parent.sizcache !== doneName || !elem.nodeIndex) ) {\n\
						var count = 0;\n\
						\n\
						for ( node = parent.firstChild; node; node = node.nextSibling ) {\n\
							if ( node.nodeType === 1 ) {\n\
								node.nodeIndex = ++count;\n\
							}\n\
						} \n\
\n\
						parent.sizcache = doneName;\n\
					}\n\
					\n\
					var diff = elem.nodeIndex - last;\n\
\n\
					if ( first === 0 ) {\n\
						return diff === 0;\n\
\n\
					} else {\n\
						return ( diff % first === 0 && diff / first >= 0 );\n\
					}\n\
			}\n\
		},\n\
\n\
		ID: function( elem, match ) {\n\
			return elem.nodeType === 1 && elem.getAttribute(\"id\") === match;\n\
		},\n\
\n\
		TAG: function( elem, match ) {\n\
			return (match === \"*\" && elem.nodeType === 1) || elem.nodeName.toLowerCase() === match;\n\
		},\n\
		\n\
		CLASS: function( elem, match ) {\n\
			return (\" \" + (elem.className || elem.getAttribute(\"class\")) + \" \")\n\
				.indexOf( match ) > -1;\n\
		},\n\
\n\
		ATTR: function( elem, match ) {\n\
			var name = match[1],\n\
				result = Expr.attrHandle[ name ] ?\n\
					Expr.attrHandle[ name ]( elem ) :\n\
					elem[ name ] != null ?\n\
						elem[ name ] :\n\
						elem.getAttribute( name ),\n\
				value = result + \"\",\n\
				type = match[2],\n\
				check = match[4];\n\
\n\
			return result == null ?\n\
				type === \"!=\" :\n\
				type === \"=\" ?\n\
				value === check :\n\
				type === \"*=\" ?\n\
				value.indexOf(check) >= 0 :\n\
				type === \"~=\" ?\n\
				(\" \" + value + \" \").indexOf(check) >= 0 :\n\
				!check ?\n\
				value && result !== false :\n\
				type === \"!=\" ?\n\
				value !== check :\n\
				type === \"^=\" ?\n\
				value.indexOf(check) === 0 :\n\
				type === \"$=\" ?\n\
				value.substr(value.length - check.length) === check :\n\
				type === \"|=\" ?\n\
				value === check || value.substr(0, check.length + 1) === check + \"-\" :\n\
				false;\n\
		},\n\
\n\
		POS: function( elem, match, i, array ) {\n\
			var name = match[2],\n\
				filter = Expr.setFilters[ name ];\n\
\n\
			if ( filter ) {\n\
				return filter( elem, i, match, array );\n\
			}\n\
		}\n\
	}\n\
};\n\
\n\
var origPOS = Expr.match.POS,\n\
	fescape = function(all, num){\n\
		return \"\\\\\" + (num - 0 + 1);\n\
	};\n\
\n\
for ( var type in Expr.match ) {\n\
	Expr.match[ type ] = new RegExp( Expr.match[ type ].source + (/(?![^\\[]*\\])(?![^\\(]*\\))/.source) );\n\
	Expr.leftMatch[ type ] = new RegExp( /(^(?:.|\\r|\\n)*?)/.source + Expr.match[ type ].source.replace(/\\\\(\\d+)/g, fescape) );\n\
}\n\
\n\
var makeArray = function( array, results ) {\n\
	array = Array.prototype.slice.call( array, 0 );\n\
\n\
	if ( results ) {\n\
		results.push.apply( results, array );\n\
		return results;\n\
	}\n\
	\n\
	return array;\n\
};\n\
\n\
// Perform a simple check to determine if the browser is capable of\n\
// converting a NodeList to an array using builtin methods.\n\
// Also verifies that the returned array holds DOM nodes\n\
// (which is not the case in the Blackberry browser)\n\
try {\n\
	Array.prototype.slice.call( document.documentElement.childNodes, 0 )[0].nodeType;\n\
\n\
// Provide a fallback method if it does not work\n\
} catch( e ) {\n\
	makeArray = function( array, results ) {\n\
		var i = 0,\n\
			ret = results || [];\n\
\n\
		if ( toString.call(array) === \"[object Array]\" ) {\n\
			Array.prototype.push.apply( ret, array );\n\
\n\
		} else {\n\
			if ( typeof array.length === \"number\" ) {\n\
				for ( var l = array.length; i < l; i++ ) {\n\
					ret.push( array[i] );\n\
				}\n\
\n\
			} else {\n\
				for ( ; array[i]; i++ ) {\n\
					ret.push( array[i] );\n\
				}\n\
			}\n\
		}\n\
\n\
		return ret;\n\
	};\n\
}\n\
\n\
var sortOrder, siblingCheck;\n\
\n\
if ( document.documentElement.compareDocumentPosition ) {\n\
	sortOrder = function( a, b ) {\n\
		if ( a === b ) {\n\
			hasDuplicate = true;\n\
			return 0;\n\
		}\n\
\n\
		if ( !a.compareDocumentPosition || !b.compareDocumentPosition ) {\n\
			return a.compareDocumentPosition ? -1 : 1;\n\
		}\n\
\n\
		return a.compareDocumentPosition(b) & 4 ? -1 : 1;\n\
	};\n\
\n\
} else {\n\
	sortOrder = function( a, b ) {\n\
		// The nodes are identical, we can exit early\n\
		if ( a === b ) {\n\
			hasDuplicate = true;\n\
			return 0;\n\
\n\
		// Fallback to using sourceIndex (in IE) if it's available on both nodes\n\
		} else if ( a.sourceIndex && b.sourceIndex ) {\n\
			return a.sourceIndex - b.sourceIndex;\n\
		}\n\
\n\
		var al, bl,\n\
			ap = [],\n\
			bp = [],\n\
			aup = a.parentNode,\n\
			bup = b.parentNode,\n\
			cur = aup;\n\
\n\
		// If the nodes are siblings (or identical) we can do a quick check\n\
		if ( aup === bup ) {\n\
			return siblingCheck( a, b );\n\
\n\
		// If no parents were found then the nodes are disconnected\n\
		} else if ( !aup ) {\n\
			return -1;\n\
\n\
		} else if ( !bup ) {\n\
			return 1;\n\
		}\n\
\n\
		// Otherwise they're somewhere else in the tree so we need\n\
		// to build up a full list of the parentNodes for comparison\n\
		while ( cur ) {\n\
			ap.unshift( cur );\n\
			cur = cur.parentNode;\n\
		}\n\
\n\
		cur = bup;\n\
\n\
		while ( cur ) {\n\
			bp.unshift( cur );\n\
			cur = cur.parentNode;\n\
		}\n\
\n\
		al = ap.length;\n\
		bl = bp.length;\n\
\n\
		// Start walking down the tree looking for a discrepancy\n\
		for ( var i = 0; i < al && i < bl; i++ ) {\n\
			if ( ap[i] !== bp[i] ) {\n\
				return siblingCheck( ap[i], bp[i] );\n\
			}\n\
		}\n\
\n\
		// We ended someplace up the tree so do a sibling check\n\
		return i === al ?\n\
			siblingCheck( a, bp[i], -1 ) :\n\
			siblingCheck( ap[i], b, 1 );\n\
	};\n\
\n\
	siblingCheck = function( a, b, ret ) {\n\
		if ( a === b ) {\n\
			return ret;\n\
		}\n\
\n\
		var cur = a.nextSibling;\n\
\n\
		while ( cur ) {\n\
			if ( cur === b ) {\n\
				return -1;\n\
			}\n\
\n\
			cur = cur.nextSibling;\n\
		}\n\
\n\
		return 1;\n\
	};\n\
}\n\
\n\
// Utility function for retreiving the text value of an array of DOM nodes\n\
Sizzle.getText = function( elems ) {\n\
	var ret = \"\", elem;\n\
\n\
	for ( var i = 0; elems[i]; i++ ) {\n\
		elem = elems[i];\n\
\n\
		// Get the text from text nodes and CDATA nodes\n\
		if ( elem.nodeType === 3 || elem.nodeType === 4 ) {\n\
			ret += elem.nodeValue;\n\
\n\
		// Traverse everything else, except comment nodes\n\
		} else if ( elem.nodeType !== 8 ) {\n\
			ret += Sizzle.getText( elem.childNodes );\n\
		}\n\
	}\n\
\n\
	return ret;\n\
};\n\
\n\
// Check to see if the browser returns elements by name when\n\
// querying by getElementById (and provide a workaround)\n\
(function(){\n\
	// We're going to inject a fake input element with a specified name\n\
	var form = document.createElement(\"div\"),\n\
		id = \"script\" + (new Date()).getTime(),\n\
		root = document.documentElement;\n\
\n\
	form.innerHTML = \"<a name='\" + id + \"'/>\";\n\
\n\
	// Inject it into the root element, check its status, and remove it quickly\n\
	root.insertBefore( form, root.firstChild );\n\
\n\
	// The workaround has to do additional checks after a getElementById\n\
	// Which slows things down for other browsers (hence the branching)\n\
	if ( document.getElementById( id ) ) {\n\
		Expr.find.ID = function( match, context, isXML ) {\n\
			if ( typeof context.getElementById !== \"undefined\" && !isXML ) {\n\
				var m = context.getElementById(match[1]);\n\
\n\
				return m ?\n\
					m.id === match[1] || typeof m.getAttributeNode !== \"undefined\" && m.getAttributeNode(\"id\").nodeValue === match[1] ?\n\
						[m] :\n\
						undefined :\n\
					[];\n\
			}\n\
		};\n\
\n\
		Expr.filter.ID = function( elem, match ) {\n\
			var node = typeof elem.getAttributeNode !== \"undefined\" && elem.getAttributeNode(\"id\");\n\
\n\
			return elem.nodeType === 1 && node && node.nodeValue === match;\n\
		};\n\
	}\n\
\n\
	root.removeChild( form );\n\
\n\
	// release memory in IE\n\
	root = form = null;\n\
})();\n\
\n\
(function(){\n\
	// Check to see if the browser returns only elements\n\
	// when doing getElementsByTagName(\"*\")\n\
\n\
	// Create a fake element\n\
	var div = document.createElement(\"div\");\n\
	div.appendChild( document.createComment(\"\") );\n\
\n\
	// Make sure no comments are found\n\
	if ( div.getElementsByTagName(\"*\").length > 0 ) {\n\
		Expr.find.TAG = function( match, context ) {\n\
			var results = context.getElementsByTagName( match[1] );\n\
\n\
			// Filter out possible comments\n\
			if ( match[1] === \"*\" ) {\n\
				var tmp = [];\n\
\n\
				for ( var i = 0; results[i]; i++ ) {\n\
					if ( results[i].nodeType === 1 ) {\n\
						tmp.push( results[i] );\n\
					}\n\
				}\n\
\n\
				results = tmp;\n\
			}\n\
\n\
			return results;\n\
		};\n\
	}\n\
\n\
	// Check to see if an attribute returns normalized href attributes\n\
	div.innerHTML = \"<a href='#'></a>\";\n\
\n\
	if ( div.firstChild && typeof div.firstChild.getAttribute !== \"undefined\" &&\n\
			div.firstChild.getAttribute(\"href\") !== \"#\" ) {\n\
\n\
		Expr.attrHandle.href = function( elem ) {\n\
			return elem.getAttribute( \"href\", 2 );\n\
		};\n\
	}\n\
\n\
	// release memory in IE\n\
	div = null;\n\
})();\n\
\n\
if ( document.querySelectorAll ) {\n\
	(function(){\n\
		var oldSizzle = Sizzle,\n\
			div = document.createElement(\"div\"),\n\
			id = \"__sizzle__\";\n\
\n\
		div.innerHTML = \"<p class='TEST'></p>\";\n\
\n\
		// Safari can't handle uppercase or unicode characters when\n\
		// in quirks mode.\n\
		if ( div.querySelectorAll && div.querySelectorAll(\".TEST\").length === 0 ) {\n\
			return;\n\
		}\n\
	\n\
		Sizzle = function( query, context, extra, seed ) {\n\
			context = context || document;\n\
\n\
			// Only use querySelectorAll on non-XML documents\n\
			// (ID selectors don't work in non-HTML documents)\n\
			if ( !seed && !Sizzle.isXML(context) ) {\n\
				// See if we find a selector to speed up\n\
				var match = /^(\\w+$)|^\\.([\\w\\-]+$)|^#([\\w\\-]+$)/.exec( query );\n\
				\n\
				if ( match && (context.nodeType === 1 || context.nodeType === 9) ) {\n\
					// Speed-up: Sizzle(\"TAG\")\n\
					if ( match[1] ) {\n\
						return makeArray( context.getElementsByTagName( query ), extra );\n\
					\n\
					// Speed-up: Sizzle(\".CLASS\")\n\
					} else if ( match[2] && Expr.find.CLASS && context.getElementsByClassName ) {\n\
						return makeArray( context.getElementsByClassName( match[2] ), extra );\n\
					}\n\
				}\n\
				\n\
				if ( context.nodeType === 9 ) {\n\
					// Speed-up: Sizzle(\"body\")\n\
					// The body element only exists once, optimize finding it\n\
					if ( query === \"body\" && context.body ) {\n\
						return makeArray( [ context.body ], extra );\n\
						\n\
					// Speed-up: Sizzle(\"#ID\")\n\
					} else if ( match && match[3] ) {\n\
						var elem = context.getElementById( match[3] );\n\
\n\
						// Check parentNode to catch when Blackberry 4.6 returns\n\
						// nodes that are no longer in the document #6963\n\
						if ( elem && elem.parentNode ) {\n\
							// Handle the case where IE and Opera return items\n\
							// by name instead of ID\n\
							if ( elem.id === match[3] ) {\n\
								return makeArray( [ elem ], extra );\n\
							}\n\
							\n\
						} else {\n\
							return makeArray( [], extra );\n\
						}\n\
					}\n\
					\n\
					try {\n\
						return makeArray( context.querySelectorAll(query), extra );\n\
					} catch(qsaError) {}\n\
\n\
				// qSA works strangely on Element-rooted queries\n\
				// We can work around this by specifying an extra ID on the root\n\
				// and working up from there (Thanks to Andrew Dupont for the technique)\n\
				// IE 8 doesn't work on object elements\n\
				} else if ( context.nodeType === 1 && context.nodeName.toLowerCase() !== \"object\" ) {\n\
					var oldContext = context,\n\
						old = context.getAttribute( \"id\" ),\n\
						nid = old || id,\n\
						hasParent = context.parentNode,\n\
						relativeHierarchySelector = /^\\s*[+~]/.test( query );\n\
\n\
					if ( !old ) {\n\
						context.setAttribute( \"id\", nid );\n\
					} else {\n\
						nid = nid.replace( /'/g, \"\\\\$&\" );\n\
					}\n\
					if ( relativeHierarchySelector && hasParent ) {\n\
						context = context.parentNode;\n\
					}\n\
\n\
					try {\n\
						if ( !relativeHierarchySelector || hasParent ) {\n\
							return makeArray( context.querySelectorAll( \"[id='\" + nid + \"'] \" + query ), extra );\n\
						}\n\
\n\
					} catch(pseudoError) {\n\
					} finally {\n\
						if ( !old ) {\n\
							oldContext.removeAttribute( \"id\" );\n\
						}\n\
					}\n\
				}\n\
			}\n\
		\n\
			return oldSizzle(query, context, extra, seed);\n\
		};\n\
\n\
		for ( var prop in oldSizzle ) {\n\
			Sizzle[ prop ] = oldSizzle[ prop ];\n\
		}\n\
\n\
		// release memory in IE\n\
		div = null;\n\
	})();\n\
}\n\
\n\
(function(){\n\
	var html = document.documentElement,\n\
		matches = html.matchesSelector || html.mozMatchesSelector || html.webkitMatchesSelector || html.msMatchesSelector;\n\
\n\
	if ( matches ) {\n\
		// Check to see if it's possible to do matchesSelector\n\
		// on a disconnected node (IE 9 fails this)\n\
		var disconnectedMatch = !matches.call( document.createElement( \"div\" ), \"div\" ),\n\
			pseudoWorks = false;\n\
\n\
		try {\n\
			// This should fail with an exception\n\
			// Gecko does not error, returns false instead\n\
			matches.call( document.documentElement, \"[test!='']:sizzle\" );\n\
	\n\
		} catch( pseudoError ) {\n\
			pseudoWorks = true;\n\
		}\n\
\n\
		Sizzle.matchesSelector = function( node, expr ) {\n\
			// Make sure that attribute selectors are quoted\n\
			expr = expr.replace(/\\=\\s*([^'\"\\]]*)\\s*\\]/g, \"='$1']\");\n\
\n\
			if ( !Sizzle.isXML( node ) ) {\n\
				try { \n\
					if ( pseudoWorks || !Expr.match.PSEUDO.test( expr ) && !/!=/.test( expr ) ) {\n\
						var ret = matches.call( node, expr );\n\
\n\
						// IE 9's matchesSelector returns false on disconnected nodes\n\
						if ( ret || !disconnectedMatch ||\n\
								// As well, disconnected nodes are said to be in a document\n\
								// fragment in IE 9, so check for that\n\
								node.document && node.document.nodeType !== 11 ) {\n\
							return ret;\n\
						}\n\
					}\n\
				} catch(e) {}\n\
			}\n\
\n\
			return Sizzle(expr, null, null, [node]).length > 0;\n\
		};\n\
	}\n\
})();\n\
\n\
(function(){\n\
	var div = document.createElement(\"div\");\n\
\n\
	div.innerHTML = \"<div class='test e'></div><div class='test'></div>\";\n\
\n\
	// Opera can't find a second classname (in 9.6)\n\
	// Also, make sure that getElementsByClassName actually exists\n\
	if ( !div.getElementsByClassName || div.getElementsByClassName(\"e\").length === 0 ) {\n\
		return;\n\
	}\n\
\n\
	// Safari caches class attributes, doesn't catch changes (in 3.2)\n\
	div.lastChild.className = \"e\";\n\
\n\
	if ( div.getElementsByClassName(\"e\").length === 1 ) {\n\
		return;\n\
	}\n\
	\n\
	Expr.order.splice(1, 0, \"CLASS\");\n\
	Expr.find.CLASS = function( match, context, isXML ) {\n\
		if ( typeof context.getElementsByClassName !== \"undefined\" && !isXML ) {\n\
			return context.getElementsByClassName(match[1]);\n\
		}\n\
	};\n\
\n\
	// release memory in IE\n\
	div = null;\n\
})();\n\
\n\
function dirNodeCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {\n\
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {\n\
		var elem = checkSet[i];\n\
\n\
		if ( elem ) {\n\
			var match = false;\n\
\n\
			elem = elem[dir];\n\
\n\
			while ( elem ) {\n\
				if ( elem.sizcache === doneName ) {\n\
					match = checkSet[elem.sizset];\n\
					break;\n\
				}\n\
\n\
				if ( elem.nodeType === 1 && !isXML ){\n\
					elem.sizcache = doneName;\n\
					elem.sizset = i;\n\
				}\n\
\n\
				if ( elem.nodeName.toLowerCase() === cur ) {\n\
					match = elem;\n\
					break;\n\
				}\n\
\n\
				elem = elem[dir];\n\
			}\n\
\n\
			checkSet[i] = match;\n\
		}\n\
	}\n\
}\n\
\n\
function dirCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {\n\
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {\n\
		var elem = checkSet[i];\n\
\n\
		if ( elem ) {\n\
			var match = false;\n\
			\n\
			elem = elem[dir];\n\
\n\
			while ( elem ) {\n\
				if ( elem.sizcache === doneName ) {\n\
					match = checkSet[elem.sizset];\n\
					break;\n\
				}\n\
\n\
				if ( elem.nodeType === 1 ) {\n\
					if ( !isXML ) {\n\
						elem.sizcache = doneName;\n\
						elem.sizset = i;\n\
					}\n\
\n\
					if ( typeof cur !== \"string\" ) {\n\
						if ( elem === cur ) {\n\
							match = true;\n\
							break;\n\
						}\n\
\n\
					} else if ( Sizzle.filter( cur, [elem] ).length > 0 ) {\n\
						match = elem;\n\
						break;\n\
					}\n\
				}\n\
\n\
				elem = elem[dir];\n\
			}\n\
\n\
			checkSet[i] = match;\n\
		}\n\
	}\n\
}\n\
\n\
if ( document.documentElement.contains ) {\n\
	Sizzle.contains = function( a, b ) {\n\
		return a !== b && (a.contains ? a.contains(b) : true);\n\
	};\n\
\n\
} else if ( document.documentElement.compareDocumentPosition ) {\n\
	Sizzle.contains = function( a, b ) {\n\
		return !!(a.compareDocumentPosition(b) & 16);\n\
	};\n\
\n\
} else {\n\
	Sizzle.contains = function() {\n\
		return false;\n\
	};\n\
}\n\
\n\
Sizzle.isXML = function( elem ) {\n\
	// documentElement is verified for cases where it doesn't yet exist\n\
	// (such as loading iframes in IE - #4833) \n\
	var documentElement = (elem ? elem.ownerDocument || elem : 0).documentElement;\n\
\n\
	return documentElement ? documentElement.nodeName !== \"HTML\" : false;\n\
};\n\
\n\
var posProcess = function( selector, context ) {\n\
	var match,\n\
		tmpSet = [],\n\
		later = \"\",\n\
		root = context.nodeType ? [context] : context;\n\
\n\
	// Position selectors must be done after the filter\n\
	// And so must :not(positional) so we move all PSEUDOs to the end\n\
	while ( (match = Expr.match.PSEUDO.exec( selector )) ) {\n\
		later += match[0];\n\
		selector = selector.replace( Expr.match.PSEUDO, \"\" );\n\
	}\n\
\n\
	selector = Expr.relative[selector] ? selector + \"*\" : selector;\n\
\n\
	for ( var i = 0, l = root.length; i < l; i++ ) {\n\
		Sizzle( selector, root[i], tmpSet );\n\
	}\n\
\n\
	return Sizzle.filter( later, tmpSet );\n\
};\n\
\n\
// EXPOSE\n\
jQuery.find = Sizzle;\n\
jQuery.expr = Sizzle.selectors;\n\
jQuery.expr[\":\"] = jQuery.expr.filters;\n\
jQuery.unique = Sizzle.uniqueSort;\n\
jQuery.text = Sizzle.getText;\n\
jQuery.isXMLDoc = Sizzle.isXML;\n\
jQuery.contains = Sizzle.contains;\n\
\n\
\n\
})();\n\
\n\
\n\
var runtil = /Until$/,\n\
	rparentsprev = /^(?:parents|prevUntil|prevAll)/,\n\
	// Note: This RegExp should be improved, or likely pulled from Sizzle\n\
	rmultiselector = /,/,\n\
	isSimple = /^.[^:#\\[\\.,]*$/,\n\
	slice = Array.prototype.slice,\n\
	POS = jQuery.expr.match.POS,\n\
	// methods guaranteed to produce a unique set when starting from a unique set\n\
	guaranteedUnique = {\n\
		children: true,\n\
		contents: true,\n\
		next: true,\n\
		prev: true\n\
	};\n\
\n\
jQuery.fn.extend({\n\
	find: function( selector ) {\n\
		var self = this,\n\
			i, l;\n\
\n\
		if ( typeof selector !== \"string\" ) {\n\
			return jQuery( selector ).filter(function() {\n\
				for ( i = 0, l = self.length; i < l; i++ ) {\n\
					if ( jQuery.contains( self[ i ], this ) ) {\n\
						return true;\n\
					}\n\
				}\n\
			});\n\
		}\n\
\n\
		var ret = this.pushStack( \"\", \"find\", selector ),\n\
			length, n, r;\n\
\n\
		for ( i = 0, l = this.length; i < l; i++ ) {\n\
			length = ret.length;\n\
			jQuery.find( selector, this[i], ret );\n\
\n\
			if ( i > 0 ) {\n\
				// Make sure that the results are unique\n\
				for ( n = length; n < ret.length; n++ ) {\n\
					for ( r = 0; r < length; r++ ) {\n\
						if ( ret[r] === ret[n] ) {\n\
							ret.splice(n--, 1);\n\
							break;\n\
						}\n\
					}\n\
				}\n\
			}\n\
		}\n\
\n\
		return ret;\n\
	},\n\
\n\
	has: function( target ) {\n\
		var targets = jQuery( target );\n\
		return this.filter(function() {\n\
			for ( var i = 0, l = targets.length; i < l; i++ ) {\n\
				if ( jQuery.contains( this, targets[i] ) ) {\n\
					return true;\n\
				}\n\
			}\n\
		});\n\
	},\n\
\n\
	not: function( selector ) {\n\
		return this.pushStack( winnow(this, selector, false), \"not\", selector);\n\
	},\n\
\n\
	filter: function( selector ) {\n\
		return this.pushStack( winnow(this, selector, true), \"filter\", selector );\n\
	},\n\
\n\
	is: function( selector ) {\n\
		return !!selector && ( typeof selector === \"string\" ?\n\
			jQuery.filter( selector, this ).length > 0 :\n\
			this.filter( selector ).length > 0 );\n\
	},\n\
\n\
	closest: function( selectors, context ) {\n\
		var ret = [], i, l, cur = this[0];\n\
		\n\
		// Array\n\
		if ( jQuery.isArray( selectors ) ) {\n\
			var match, selector,\n\
				matches = {},\n\
				level = 1;\n\
\n\
			if ( cur && selectors.length ) {\n\
				for ( i = 0, l = selectors.length; i < l; i++ ) {\n\
					selector = selectors[i];\n\
\n\
					if ( !matches[ selector ] ) {\n\
						matches[ selector ] = POS.test( selector ) ?\n\
							jQuery( selector, context || this.context ) :\n\
							selector;\n\
					}\n\
				}\n\
\n\
				while ( cur && cur.ownerDocument && cur !== context ) {\n\
					for ( selector in matches ) {\n\
						match = matches[ selector ];\n\
\n\
						if ( match.jquery ? match.index( cur ) > -1 : jQuery( cur ).is( match ) ) {\n\
							ret.push({ selector: selector, elem: cur, level: level });\n\
						}\n\
					}\n\
\n\
					cur = cur.parentNode;\n\
					level++;\n\
				}\n\
			}\n\
\n\
			return ret;\n\
		}\n\
\n\
		// String\n\
		var pos = POS.test( selectors ) || typeof selectors !== \"string\" ?\n\
				jQuery( selectors, context || this.context ) :\n\
				0;\n\
\n\
		for ( i = 0, l = this.length; i < l; i++ ) {\n\
			cur = this[i];\n\
\n\
			while ( cur ) {\n\
				if ( pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors) ) {\n\
					ret.push( cur );\n\
					break;\n\
\n\
				} else {\n\
					cur = cur.parentNode;\n\
					if ( !cur || !cur.ownerDocument || cur === context || cur.nodeType === 11 ) {\n\
						break;\n\
					}\n\
				}\n\
			}\n\
		}\n\
\n\
		ret = ret.length > 1 ? jQuery.unique( ret ) : ret;\n\
\n\
		return this.pushStack( ret, \"closest\", selectors );\n\
	},\n\
\n\
	// Determine the position of an element within\n\
	// the matched set of elements\n\
	index: function( elem ) {\n\
\n\
		// No argument, return index in parent\n\
		if ( !elem ) {\n\
			return ( this[0] && this[0].parentNode ) ? this.prevAll().length : -1;\n\
		}\n\
\n\
		// index in selector\n\
		if ( typeof elem === \"string\" ) {\n\
			return jQuery.inArray( this[0], jQuery( elem ) );\n\
		}\n\
\n\
		// Locate the position of the desired element\n\
		return jQuery.inArray(\n\
			// If it receives a jQuery object, the first element is used\n\
			elem.jquery ? elem[0] : elem, this );\n\
	},\n\
\n\
	add: function( selector, context ) {\n\
		var set = typeof selector === \"string\" ?\n\
				jQuery( selector, context ) :\n\
				jQuery.makeArray( selector && selector.nodeType ? [ selector ] : selector ),\n\
			all = jQuery.merge( this.get(), set );\n\
\n\
		return this.pushStack( isDisconnected( set[0] ) || isDisconnected( all[0] ) ?\n\
			all :\n\
			jQuery.unique( all ) );\n\
	},\n\
\n\
	andSelf: function() {\n\
		return this.add( this.prevObject );\n\
	}\n\
});\n\
\n\
// A painfully simple check to see if an element is disconnected\n\
// from a document (should be improved, where feasible).\n\
function isDisconnected( node ) {\n\
	return !node || !node.parentNode || node.parentNode.nodeType === 11;\n\
}\n\
\n\
jQuery.each({\n\
	parent: function( elem ) {\n\
		var parent = elem.parentNode;\n\
		return parent && parent.nodeType !== 11 ? parent : null;\n\
	},\n\
	parents: function( elem ) {\n\
		return jQuery.dir( elem, \"parentNode\" );\n\
	},\n\
	parentsUntil: function( elem, i, until ) {\n\
		return jQuery.dir( elem, \"parentNode\", until );\n\
	},\n\
	next: function( elem ) {\n\
		return jQuery.nth( elem, 2, \"nextSibling\" );\n\
	},\n\
	prev: function( elem ) {\n\
		return jQuery.nth( elem, 2, \"previousSibling\" );\n\
	},\n\
	nextAll: function( elem ) {\n\
		return jQuery.dir( elem, \"nextSibling\" );\n\
	},\n\
	prevAll: function( elem ) {\n\
		return jQuery.dir( elem, \"previousSibling\" );\n\
	},\n\
	nextUntil: function( elem, i, until ) {\n\
		return jQuery.dir( elem, \"nextSibling\", until );\n\
	},\n\
	prevUntil: function( elem, i, until ) {\n\
		return jQuery.dir( elem, \"previousSibling\", until );\n\
	},\n\
	siblings: function( elem ) {\n\
		return jQuery.sibling( elem.parentNode.firstChild, elem );\n\
	},\n\
	children: function( elem ) {\n\
		return jQuery.sibling( elem.firstChild );\n\
	},\n\
	contents: function( elem ) {\n\
		return jQuery.nodeName( elem, \"iframe\" ) ?\n\
			elem.contentDocument || elem.contentWindow.document :\n\
			jQuery.makeArray( elem.childNodes );\n\
	}\n\
}, function( name, fn ) {\n\
	jQuery.fn[ name ] = function( until, selector ) {\n\
		var ret = jQuery.map( this, fn, until ),\n\
			// The variable 'args' was introduced in\n\
			// https://github.com/jquery/jquery/commit/52a0238\n\
			// to work around a bug in Chrome 10 (Dev) and should be removed when the bug is fixed.\n\
			// http://code.google.com/p/v8/issues/detail?id=1050\n\
			args = slice.call(arguments);\n\
\n\
		if ( !runtil.test( name ) ) {\n\
			selector = until;\n\
		}\n\
\n\
		if ( selector && typeof selector === \"string\" ) {\n\
			ret = jQuery.filter( selector, ret );\n\
		}\n\
\n\
		ret = this.length > 1 && !guaranteedUnique[ name ] ? jQuery.unique( ret ) : ret;\n\
\n\
		if ( (this.length > 1 || rmultiselector.test( selector )) && rparentsprev.test( name ) ) {\n\
			ret = ret.reverse();\n\
		}\n\
\n\
		return this.pushStack( ret, name, args.join(\",\") );\n\
	};\n\
});\n\
\n\
jQuery.extend({\n\
	filter: function( expr, elems, not ) {\n\
		if ( not ) {\n\
			expr = \":not(\" + expr + \")\";\n\
		}\n\
\n\
		return elems.length === 1 ?\n\
			jQuery.find.matchesSelector(elems[0], expr) ? [ elems[0] ] : [] :\n\
			jQuery.find.matches(expr, elems);\n\
	},\n\
\n\
	dir: function( elem, dir, until ) {\n\
		var matched = [],\n\
			cur = elem[ dir ];\n\
\n\
		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {\n\
			if ( cur.nodeType === 1 ) {\n\
				matched.push( cur );\n\
			}\n\
			cur = cur[dir];\n\
		}\n\
		return matched;\n\
	},\n\
\n\
	nth: function( cur, result, dir, elem ) {\n\
		result = result || 1;\n\
		var num = 0;\n\
\n\
		for ( ; cur; cur = cur[dir] ) {\n\
			if ( cur.nodeType === 1 && ++num === result ) {\n\
				break;\n\
			}\n\
		}\n\
\n\
		return cur;\n\
	},\n\
\n\
	sibling: function( n, elem ) {\n\
		var r = [];\n\
\n\
		for ( ; n; n = n.nextSibling ) {\n\
			if ( n.nodeType === 1 && n !== elem ) {\n\
				r.push( n );\n\
			}\n\
		}\n\
\n\
		return r;\n\
	}\n\
});\n\
\n\
// Implement the identical functionality for filter and not\n\
function winnow( elements, qualifier, keep ) {\n\
\n\
	// Can't pass null or undefined to indexOf in Firefox 4\n\
	// Set to 0 to skip string check\n\
	qualifier = qualifier || 0;\n\
\n\
	if ( jQuery.isFunction( qualifier ) ) {\n\
		return jQuery.grep(elements, function( elem, i ) {\n\
			var retVal = !!qualifier.call( elem, i, elem );\n\
			return retVal === keep;\n\
		});\n\
\n\
	} else if ( qualifier.nodeType ) {\n\
		return jQuery.grep(elements, function( elem, i ) {\n\
			return (elem === qualifier) === keep;\n\
		});\n\
\n\
	} else if ( typeof qualifier === \"string\" ) {\n\
		var filtered = jQuery.grep(elements, function( elem ) {\n\
			return elem.nodeType === 1;\n\
		});\n\
\n\
		if ( isSimple.test( qualifier ) ) {\n\
			return jQuery.filter(qualifier, filtered, !keep);\n\
		} else {\n\
			qualifier = jQuery.filter( qualifier, filtered );\n\
		}\n\
	}\n\
\n\
	return jQuery.grep(elements, function( elem, i ) {\n\
		return (jQuery.inArray( elem, qualifier ) >= 0) === keep;\n\
	});\n\
}\n\
\n\
\n\
\n\
\n\
var rinlinejQuery = / jQuery\\d+=\"(?:\\d+|null)\"/g,\n\
	rleadingWhitespace = /^\\s+/,\n\
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\\w:]+)[^>]*)\\/>/ig,\n\
	rtagName = /<([\\w:]+)/,\n\
	rtbody = /<tbody/i,\n\
	rhtml = /<|&#?\\w+;/,\n\
	rnocache = /<(?:script|object|embed|option|style)/i,\n\
	// checked=\"checked\" or checked\n\
	rchecked = /checked\\s*(?:[^=]|=\\s*.checked.)/i,\n\
	rscriptType = /\\/(java|ecma)script/i,\n\
	rcleanScript = /^\\s*<!(?:\\[CDATA\\[|\\-\\-)/,\n\
	wrapMap = {\n\
		option: [ 1, \"<select multiple='multiple'>\", \"</select>\" ],\n\
		legend: [ 1, \"<fieldset>\", \"</fieldset>\" ],\n\
		thead: [ 1, \"<table>\", \"</table>\" ],\n\
		tr: [ 2, \"<table><tbody>\", \"</tbody></table>\" ],\n\
		td: [ 3, \"<table><tbody><tr>\", \"</tr></tbody></table>\" ],\n\
		col: [ 2, \"<table><tbody></tbody><colgroup>\", \"</colgroup></table>\" ],\n\
		area: [ 1, \"<map>\", \"</map>\" ],\n\
		_default: [ 0, \"\", \"\" ]\n\
	};\n\
\n\
wrapMap.optgroup = wrapMap.option;\n\
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;\n\
wrapMap.th = wrapMap.td;\n\
\n\
// IE can't serialize <link> and <script> tags normally\n\
if ( !jQuery.support.htmlSerialize ) {\n\
	wrapMap._default = [ 1, \"div<div>\", \"</div>\" ];\n\
}\n\
\n\
jQuery.fn.extend({\n\
	text: function( text ) {\n\
		if ( jQuery.isFunction(text) ) {\n\
			return this.each(function(i) {\n\
				var self = jQuery( this );\n\
\n\
				self.text( text.call(this, i, self.text()) );\n\
			});\n\
		}\n\
\n\
		if ( typeof text !== \"object\" && text !== undefined ) {\n\
			return this.empty().append( (this[0] && this[0].ownerDocument || document).createTextNode( text ) );\n\
		}\n\
\n\
		return jQuery.text( this );\n\
	},\n\
\n\
	wrapAll: function( html ) {\n\
		if ( jQuery.isFunction( html ) ) {\n\
			return this.each(function(i) {\n\
				jQuery(this).wrapAll( html.call(this, i) );\n\
			});\n\
		}\n\
\n\
		if ( this[0] ) {\n\
			// The elements to wrap the target around\n\
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);\n\
\n\
			if ( this[0].parentNode ) {\n\
				wrap.insertBefore( this[0] );\n\
			}\n\
\n\
			wrap.map(function() {\n\
				var elem = this;\n\
\n\
				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {\n\
					elem = elem.firstChild;\n\
				}\n\
\n\
				return elem;\n\
			}).append( this );\n\
		}\n\
\n\
		return this;\n\
	},\n\
\n\
	wrapInner: function( html ) {\n\
		if ( jQuery.isFunction( html ) ) {\n\
			return this.each(function(i) {\n\
				jQuery(this).wrapInner( html.call(this, i) );\n\
			});\n\
		}\n\
\n\
		return this.each(function() {\n\
			var self = jQuery( this ),\n\
				contents = self.contents();\n\
\n\
			if ( contents.length ) {\n\
				contents.wrapAll( html );\n\
\n\
			} else {\n\
				self.append( html );\n\
			}\n\
		});\n\
	},\n\
\n\
	wrap: function( html ) {\n\
		return this.each(function() {\n\
			jQuery( this ).wrapAll( html );\n\
		});\n\
	},\n\
\n\
	unwrap: function() {\n\
		return this.parent().each(function() {\n\
			if ( !jQuery.nodeName( this, \"body\" ) ) {\n\
				jQuery( this ).replaceWith( this.childNodes );\n\
			}\n\
		}).end();\n\
	},\n\
\n\
	append: function() {\n\
		return this.domManip(arguments, true, function( elem ) {\n\
			if ( this.nodeType === 1 ) {\n\
				this.appendChild( elem );\n\
			}\n\
		});\n\
	},\n\
\n\
	prepend: function() {\n\
		return this.domManip(arguments, true, function( elem ) {\n\
			if ( this.nodeType === 1 ) {\n\
				this.insertBefore( elem, this.firstChild );\n\
			}\n\
		});\n\
	},\n\
\n\
	before: function() {\n\
		if ( this[0] && this[0].parentNode ) {\n\
			return this.domManip(arguments, false, function( elem ) {\n\
				this.parentNode.insertBefore( elem, this );\n\
			});\n\
		} else if ( arguments.length ) {\n\
			var set = jQuery(arguments[0]);\n\
			set.push.apply( set, this.toArray() );\n\
			return this.pushStack( set, \"before\", arguments );\n\
		}\n\
	},\n\
\n\
	after: function() {\n\
		if ( this[0] && this[0].parentNode ) {\n\
			return this.domManip(arguments, false, function( elem ) {\n\
				this.parentNode.insertBefore( elem, this.nextSibling );\n\
			});\n\
		} else if ( arguments.length ) {\n\
			var set = this.pushStack( this, \"after\", arguments );\n\
			set.push.apply( set, jQuery(arguments[0]).toArray() );\n\
			return set;\n\
		}\n\
	},\n\
\n\
	// keepData is for internal use only--do not document\n\
	remove: function( selector, keepData ) {\n\
		for ( var i = 0, elem; (elem = this[i]) != null; i++ ) {\n\
			if ( !selector || jQuery.filter( selector, [ elem ] ).length ) {\n\
				if ( !keepData && elem.nodeType === 1 ) {\n\
					jQuery.cleanData( elem.getElementsByTagName(\"*\") );\n\
					jQuery.cleanData( [ elem ] );\n\
				}\n\
\n\
				if ( elem.parentNode ) {\n\
					elem.parentNode.removeChild( elem );\n\
				}\n\
			}\n\
		}\n\
\n\
		return this;\n\
	},\n\
\n\
	empty: function() {\n\
		for ( var i = 0, elem; (elem = this[i]) != null; i++ ) {\n\
			// Remove element nodes and prevent memory leaks\n\
			if ( elem.nodeType === 1 ) {\n\
				jQuery.cleanData( elem.getElementsByTagName(\"*\") );\n\
			}\n\
\n\
			// Remove any remaining nodes\n\
			while ( elem.firstChild ) {\n\
				elem.removeChild( elem.firstChild );\n\
			}\n\
		}\n\
\n\
		return this;\n\
	},\n\
\n\
	clone: function( dataAndEvents, deepDataAndEvents ) {\n\
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;\n\
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;\n\
\n\
		return this.map( function () {\n\
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );\n\
		});\n\
	},\n\
\n\
	html: function( value ) {\n\
		if ( value === undefined ) {\n\
			return this[0] && this[0].nodeType === 1 ?\n\
				this[0].innerHTML.replace(rinlinejQuery, \"\") :\n\
				null;\n\
\n\
		// See if we can take a shortcut and just use innerHTML\n\
		} else if ( typeof value === \"string\" && !rnocache.test( value ) &&\n\
			(jQuery.support.leadingWhitespace || !rleadingWhitespace.test( value )) &&\n\
			!wrapMap[ (rtagName.exec( value ) || [\"\", \"\"])[1].toLowerCase() ] ) {\n\
\n\
			value = value.replace(rxhtmlTag, \"<$1></$2>\");\n\
\n\
			try {\n\
				for ( var i = 0, l = this.length; i < l; i++ ) {\n\
					// Remove element nodes and prevent memory leaks\n\
					if ( this[i].nodeType === 1 ) {\n\
						jQuery.cleanData( this[i].getElementsByTagName(\"*\") );\n\
						this[i].innerHTML = value;\n\
					}\n\
				}\n\
\n\
			// If using innerHTML throws an exception, use the fallback method\n\
			} catch(e) {\n\
				this.empty().append( value );\n\
			}\n\
\n\
		} else if ( jQuery.isFunction( value ) ) {\n\
			this.each(function(i){\n\
				var self = jQuery( this );\n\
\n\
				self.html( value.call(this, i, self.html()) );\n\
			});\n\
\n\
		} else {\n\
			this.empty().append( value );\n\
		}\n\
\n\
		return this;\n\
	},\n\
\n\
	replaceWith: function( value ) {\n\
		if ( this[0] && this[0].parentNode ) {\n\
			// Make sure that the elements are removed from the DOM before they are inserted\n\
			// this can help fix replacing a parent with child elements\n\
			if ( jQuery.isFunction( value ) ) {\n\
				return this.each(function(i) {\n\
					var self = jQuery(this), old = self.html();\n\
					self.replaceWith( value.call( this, i, old ) );\n\
				});\n\
			}\n\
\n\
			if ( typeof value !== \"string\" ) {\n\
				value = jQuery( value ).detach();\n\
			}\n\
\n\
			return this.each(function() {\n\
				var next = this.nextSibling,\n\
					parent = this.parentNode;\n\
\n\
				jQuery( this ).remove();\n\
\n\
				if ( next ) {\n\
					jQuery(next).before( value );\n\
				} else {\n\
					jQuery(parent).append( value );\n\
				}\n\
			});\n\
		} else {\n\
			return this.length ?\n\
				this.pushStack( jQuery(jQuery.isFunction(value) ? value() : value), \"replaceWith\", value ) :\n\
				this;\n\
		}\n\
	},\n\
\n\
	detach: function( selector ) {\n\
		return this.remove( selector, true );\n\
	},\n\
\n\
	domManip: function( args, table, callback ) {\n\
		var results, first, fragment, parent,\n\
			value = args[0],\n\
			scripts = [];\n\
\n\
		// We can't cloneNode fragments that contain checked, in WebKit\n\
		if ( !jQuery.support.checkClone && arguments.length === 3 && typeof value === \"string\" && rchecked.test( value ) ) {\n\
			return this.each(function() {\n\
				jQuery(this).domManip( args, table, callback, true );\n\
			});\n\
		}\n\
\n\
		if ( jQuery.isFunction(value) ) {\n\
			return this.each(function(i) {\n\
				var self = jQuery(this);\n\
				args[0] = value.call(this, i, table ? self.html() : undefined);\n\
				self.domManip( args, table, callback );\n\
			});\n\
		}\n\
\n\
		if ( this[0] ) {\n\
			parent = value && value.parentNode;\n\
\n\
			// If we're in a fragment, just use that instead of building a new one\n\
			if ( jQuery.support.parentNode && parent && parent.nodeType === 11 && parent.childNodes.length === this.length ) {\n\
				results = { fragment: parent };\n\
\n\
			} else {\n\
				results = jQuery.buildFragment( args, this, scripts );\n\
			}\n\
\n\
			fragment = results.fragment;\n\
\n\
			if ( fragment.childNodes.length === 1 ) {\n\
				first = fragment = fragment.firstChild;\n\
			} else {\n\
				first = fragment.firstChild;\n\
			}\n\
\n\
			if ( first ) {\n\
				table = table && jQuery.nodeName( first, \"tr\" );\n\
\n\
				for ( var i = 0, l = this.length, lastIndex = l - 1; i < l; i++ ) {\n\
					callback.call(\n\
						table ?\n\
							root(this[i], first) :\n\
							this[i],\n\
						// Make sure that we do not leak memory by inadvertently discarding\n\
						// the original fragment (which might have attached data) instead of\n\
						// using it; in addition, use the original fragment object for the last\n\
						// item instead of first because it can end up being emptied incorrectly\n\
						// in certain situations (Bug #8070).\n\
						// Fragments from the fragment cache must always be cloned and never used\n\
						// in place.\n\
						results.cacheable || (l > 1 && i < lastIndex) ?\n\
							jQuery.clone( fragment, true, true ) :\n\
							fragment\n\
					);\n\
				}\n\
			}\n\
\n\
			if ( scripts.length ) {\n\
				jQuery.each( scripts, evalScript );\n\
			}\n\
		}\n\
\n\
		return this;\n\
	}\n\
});\n\
\n\
function root( elem, cur ) {\n\
	return jQuery.nodeName(elem, \"table\") ?\n\
		(elem.getElementsByTagName(\"tbody\")[0] ||\n\
		elem.appendChild(elem.ownerDocument.createElement(\"tbody\"))) :\n\
		elem;\n\
}\n\
\n\
function cloneCopyEvent( src, dest ) {\n\
\n\
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {\n\
		return;\n\
	}\n\
\n\
	var internalKey = jQuery.expando,\n\
		oldData = jQuery.data( src ),\n\
		curData = jQuery.data( dest, oldData );\n\
\n\
	// Switch to use the internal data object, if it exists, for the next\n\
	// stage of data copying\n\
	if ( (oldData = oldData[ internalKey ]) ) {\n\
		var events = oldData.events;\n\
				curData = curData[ internalKey ] = jQuery.extend({}, oldData);\n\
\n\
		if ( events ) {\n\
			delete curData.handle;\n\
			curData.events = {};\n\
\n\
			for ( var type in events ) {\n\
				for ( var i = 0, l = events[ type ].length; i < l; i++ ) {\n\
					jQuery.event.add( dest, type + ( events[ type ][ i ].namespace ? \".\" : \"\" ) + events[ type ][ i ].namespace, events[ type ][ i ], events[ type ][ i ].data );\n\
				}\n\
			}\n\
		}\n\
	}\n\
}\n\
\n\
function cloneFixAttributes( src, dest ) {\n\
	var nodeName;\n\
\n\
	// We do not need to do anything for non-Elements\n\
	if ( dest.nodeType !== 1 ) {\n\
		return;\n\
	}\n\
\n\
	// clearAttributes removes the attributes, which we don't want,\n\
	// but also removes the attachEvent events, which we *do* want\n\
	if ( dest.clearAttributes ) {\n\
		dest.clearAttributes();\n\
	}\n\
\n\
	// mergeAttributes, in contrast, only merges back on the\n\
	// original attributes, not the events\n\
	if ( dest.mergeAttributes ) {\n\
		dest.mergeAttributes( src );\n\
	}\n\
\n\
	nodeName = dest.nodeName.toLowerCase();\n\
\n\
	// IE6-8 fail to clone children inside object elements that use\n\
	// the proprietary classid attribute value (rather than the type\n\
	// attribute) to identify the type of content to display\n\
	if ( nodeName === \"object\" ) {\n\
		dest.outerHTML = src.outerHTML;\n\
\n\
	} else if ( nodeName === \"input\" && (src.type === \"checkbox\" || src.type === \"radio\") ) {\n\
		// IE6-8 fails to persist the checked state of a cloned checkbox\n\
		// or radio button. Worse, IE6-7 fail to give the cloned element\n\
		// a checked appearance if the defaultChecked value isn't also set\n\
		if ( src.checked ) {\n\
			dest.defaultChecked = dest.checked = src.checked;\n\
		}\n\
\n\
		// IE6-7 get confused and end up setting the value of a cloned\n\
		// checkbox/radio button to an empty string instead of \"on\"\n\
		if ( dest.value !== src.value ) {\n\
			dest.value = src.value;\n\
		}\n\
\n\
	// IE6-8 fails to return the selected option to the default selected\n\
	// state when cloning options\n\
	} else if ( nodeName === \"option\" ) {\n\
		dest.selected = src.defaultSelected;\n\
\n\
	// IE6-8 fails to set the defaultValue to the correct value when\n\
	// cloning other types of input fields\n\
	} else if ( nodeName === \"input\" || nodeName === \"textarea\" ) {\n\
		dest.defaultValue = src.defaultValue;\n\
	}\n\
\n\
	// Event data gets referenced instead of copied if the expando\n\
	// gets copied too\n\
	dest.removeAttribute( jQuery.expando );\n\
}\n\
\n\
jQuery.buildFragment = function( args, nodes, scripts ) {\n\
	var fragment, cacheable, cacheresults, doc;\n\
\n\
  // nodes may contain either an explicit document object,\n\
  // a jQuery collection or context object.\n\
  // If nodes[0] contains a valid object to assign to doc\n\
  if ( nodes && nodes[0] ) {\n\
    doc = nodes[0].ownerDocument || nodes[0];\n\
  }\n\
\n\
  // Ensure that an attr object doesn't incorrectly stand in as a document object\n\
	// Chrome and Firefox seem to allow this to occur and will throw exception\n\
	// Fixes #8950\n\
	if ( !doc.createDocumentFragment ) {\n\
		doc = document;\n\
	}\n\
\n\
	// Only cache \"small\" (1/2 KB) HTML strings that are associated with the main document\n\
	// Cloning options loses the selected state, so don't cache them\n\
	// IE 6 doesn't like it when you put <object> or <embed> elements in a fragment\n\
	// Also, WebKit does not clone 'checked' attributes on cloneNode, so don't cache\n\
	if ( args.length === 1 && typeof args[0] === \"string\" && args[0].length < 512 && doc === document &&\n\
		args[0].charAt(0) === \"<\" && !rnocache.test( args[0] ) && (jQuery.support.checkClone || !rchecked.test( args[0] )) ) {\n\
\n\
		cacheable = true;\n\
\n\
		cacheresults = jQuery.fragments[ args[0] ];\n\
		if ( cacheresults && cacheresults !== 1 ) {\n\
			fragment = cacheresults;\n\
		}\n\
	}\n\
\n\
	if ( !fragment ) {\n\
		fragment = doc.createDocumentFragment();\n\
		jQuery.clean( args, doc, fragment, scripts );\n\
	}\n\
\n\
	if ( cacheable ) {\n\
		jQuery.fragments[ args[0] ] = cacheresults ? fragment : 1;\n\
	}\n\
\n\
	return { fragment: fragment, cacheable: cacheable };\n\
};\n\
\n\
jQuery.fragments = {};\n\
\n\
jQuery.each({\n\
	appendTo: \"append\",\n\
	prependTo: \"prepend\",\n\
	insertBefore: \"before\",\n\
	insertAfter: \"after\",\n\
	replaceAll: \"replaceWith\"\n\
}, function( name, original ) {\n\
	jQuery.fn[ name ] = function( selector ) {\n\
		var ret = [],\n\
			insert = jQuery( selector ),\n\
			parent = this.length === 1 && this[0].parentNode;\n\
\n\
		if ( parent && parent.nodeType === 11 && parent.childNodes.length === 1 && insert.length === 1 ) {\n\
			insert[ original ]( this[0] );\n\
			return this;\n\
\n\
		} else {\n\
			for ( var i = 0, l = insert.length; i < l; i++ ) {\n\
				var elems = (i > 0 ? this.clone(true) : this).get();\n\
				jQuery( insert[i] )[ original ]( elems );\n\
				ret = ret.concat( elems );\n\
			}\n\
\n\
			return this.pushStack( ret, name, insert.selector );\n\
		}\n\
	};\n\
});\n\
\n\
function getAll( elem ) {\n\
	if ( \"getElementsByTagName\" in elem ) {\n\
		return elem.getElementsByTagName( \"*\" );\n\
\n\
	} else if ( \"querySelectorAll\" in elem ) {\n\
		return elem.querySelectorAll( \"*\" );\n\
\n\
	} else {\n\
		return [];\n\
	}\n\
}\n\
\n\
// Used in clean, fixes the defaultChecked property\n\
function fixDefaultChecked( elem ) {\n\
	if ( elem.type === \"checkbox\" || elem.type === \"radio\" ) {\n\
		elem.defaultChecked = elem.checked;\n\
	}\n\
}\n\
// Finds all inputs and passes them to fixDefaultChecked\n\
function findInputs( elem ) {\n\
	if ( jQuery.nodeName( elem, \"input\" ) ) {\n\
		fixDefaultChecked( elem );\n\
	} else if ( \"getElementsByTagName\" in elem ) {\n\
		jQuery.grep( elem.getElementsByTagName(\"input\"), fixDefaultChecked );\n\
	}\n\
}\n\
\n\
jQuery.extend({\n\
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {\n\
		var clone = elem.cloneNode(true),\n\
				srcElements,\n\
				destElements,\n\
				i;\n\
\n\
		if ( (!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) &&\n\
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {\n\
			// IE copies events bound via attachEvent when using cloneNode.\n\
			// Calling detachEvent on the clone will also remove the events\n\
			// from the original. In order to get around this, we use some\n\
			// proprietary methods to clear the events. Thanks to MooTools\n\
			// guys for this hotness.\n\
\n\
			cloneFixAttributes( elem, clone );\n\
\n\
			// Using Sizzle here is crazy slow, so we use getElementsByTagName\n\
			// instead\n\
			srcElements = getAll( elem );\n\
			destElements = getAll( clone );\n\
\n\
			// Weird iteration because IE will replace the length property\n\
			// with an element if you are cloning the body and one of the\n\
			// elements on the page has a name or id of \"length\"\n\
			for ( i = 0; srcElements[i]; ++i ) {\n\
				// Ensure that the destination node is not null; Fixes #9587\n\
				if ( destElements[i] ) {\n\
					cloneFixAttributes( srcElements[i], destElements[i] );\n\
				}\n\
			}\n\
		}\n\
\n\
		// Copy the events from the original to the clone\n\
		if ( dataAndEvents ) {\n\
			cloneCopyEvent( elem, clone );\n\
\n\
			if ( deepDataAndEvents ) {\n\
				srcElements = getAll( elem );\n\
				destElements = getAll( clone );\n\
\n\
				for ( i = 0; srcElements[i]; ++i ) {\n\
					cloneCopyEvent( srcElements[i], destElements[i] );\n\
				}\n\
			}\n\
		}\n\
\n\
		srcElements = destElements = null;\n\
\n\
		// Return the cloned set\n\
		return clone;\n\
	},\n\
\n\
	clean: function( elems, context, fragment, scripts ) {\n\
		var checkScriptType;\n\
\n\
		context = context || document;\n\
\n\
		// !context.createElement fails in IE with an error but returns typeof 'object'\n\
		if ( typeof context.createElement === \"undefined\" ) {\n\
			context = context.ownerDocument || context[0] && context[0].ownerDocument || document;\n\
		}\n\
\n\
		var ret = [], j;\n\
\n\
		for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {\n\
			if ( typeof elem === \"number\" ) {\n\
				elem += \"\";\n\
			}\n\
\n\
			if ( !elem ) {\n\
				continue;\n\
			}\n\
\n\
			// Convert html string into DOM nodes\n\
			if ( typeof elem === \"string\" ) {\n\
				if ( !rhtml.test( elem ) ) {\n\
					elem = context.createTextNode( elem );\n\
				} else {\n\
					// Fix \"XHTML\"-style tags in all browsers\n\
					elem = elem.replace(rxhtmlTag, \"<$1></$2>\");\n\
\n\
					// Trim whitespace, otherwise indexOf won't work as expected\n\
					var tag = (rtagName.exec( elem ) || [\"\", \"\"])[1].toLowerCase(),\n\
						wrap = wrapMap[ tag ] || wrapMap._default,\n\
						depth = wrap[0],\n\
						div = context.createElement(\"div\");\n\
\n\
					// Go to html and back, then peel off extra wrappers\n\
					div.innerHTML = wrap[1] + elem + wrap[2];\n\
\n\
					// Move to the right depth\n\
					while ( depth-- ) {\n\
						div = div.lastChild;\n\
					}\n\
\n\
					// Remove IE's autoinserted <tbody> from table fragments\n\
					if ( !jQuery.support.tbody ) {\n\
\n\
						// String was a <table>, *may* have spurious <tbody>\n\
						var hasBody = rtbody.test(elem),\n\
							tbody = tag === \"table\" && !hasBody ?\n\
								div.firstChild && div.firstChild.childNodes :\n\
\n\
								// String was a bare <thead> or <tfoot>\n\
								wrap[1] === \"<table>\" && !hasBody ?\n\
									div.childNodes :\n\
									[];\n\
\n\
						for ( j = tbody.length - 1; j >= 0 ; --j ) {\n\
							if ( jQuery.nodeName( tbody[ j ], \"tbody\" ) && !tbody[ j ].childNodes.length ) {\n\
								tbody[ j ].parentNode.removeChild( tbody[ j ] );\n\
							}\n\
						}\n\
					}\n\
\n\
					// IE completely kills leading whitespace when innerHTML is used\n\
					if ( !jQuery.support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {\n\
						div.insertBefore( context.createTextNode( rleadingWhitespace.exec(elem)[0] ), div.firstChild );\n\
					}\n\
\n\
					elem = div.childNodes;\n\
				}\n\
			}\n\
\n\
			// Resets defaultChecked for any radios and checkboxes\n\
			// about to be appended to the DOM in IE 6/7 (#8060)\n\
			var len;\n\
			if ( !jQuery.support.appendChecked ) {\n\
				if ( elem[0] && typeof (len = elem.length) === \"number\" ) {\n\
					for ( j = 0; j < len; j++ ) {\n\
						findInputs( elem[j] );\n\
					}\n\
				} else {\n\
					findInputs( elem );\n\
				}\n\
			}\n\
\n\
			if ( elem.nodeType ) {\n\
				ret.push( elem );\n\
			} else {\n\
				ret = jQuery.merge( ret, elem );\n\
			}\n\
		}\n\
\n\
		if ( fragment ) {\n\
			checkScriptType = function( elem ) {\n\
				return !elem.type || rscriptType.test( elem.type );\n\
			};\n\
			for ( i = 0; ret[i]; i++ ) {\n\
				if ( scripts && jQuery.nodeName( ret[i], \"script\" ) && (!ret[i].type || ret[i].type.toLowerCase() === \"text/javascript\") ) {\n\
					scripts.push( ret[i].parentNode ? ret[i].parentNode.removeChild( ret[i] ) : ret[i] );\n\
\n\
				} else {\n\
					if ( ret[i].nodeType === 1 ) {\n\
						var jsTags = jQuery.grep( ret[i].getElementsByTagName( \"script\" ), checkScriptType );\n\
\n\
						ret.splice.apply( ret, [i + 1, 0].concat( jsTags ) );\n\
					}\n\
					fragment.appendChild( ret[i] );\n\
				}\n\
			}\n\
		}\n\
\n\
		return ret;\n\
	},\n\
\n\
	cleanData: function( elems ) {\n\
		var data, id, cache = jQuery.cache, internalKey = jQuery.expando, special = jQuery.event.special,\n\
			deleteExpando = jQuery.support.deleteExpando;\n\
\n\
		for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {\n\
			if ( elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()] ) {\n\
				continue;\n\
			}\n\
\n\
			id = elem[ jQuery.expando ];\n\
\n\
			if ( id ) {\n\
				data = cache[ id ] && cache[ id ][ internalKey ];\n\
\n\
				if ( data && data.events ) {\n\
					for ( var type in data.events ) {\n\
						if ( special[ type ] ) {\n\
							jQuery.event.remove( elem, type );\n\
\n\
						// This is a shortcut to avoid jQuery.event.remove's overhead\n\
						} else {\n\
							jQuery.removeEvent( elem, type, data.handle );\n\
						}\n\
					}\n\
\n\
					// Null the DOM reference to avoid IE6/7/8 leak (#7054)\n\
					if ( data.handle ) {\n\
						data.handle.elem = null;\n\
					}\n\
				}\n\
\n\
				if ( deleteExpando ) {\n\
					delete elem[ jQuery.expando ];\n\
\n\
				} else if ( elem.removeAttribute ) {\n\
					elem.removeAttribute( jQuery.expando );\n\
				}\n\
\n\
				delete cache[ id ];\n\
			}\n\
		}\n\
	}\n\
});\n\
\n\
function evalScript( i, elem ) {\n\
	if ( elem.src ) {\n\
		jQuery.ajax({\n\
			url: elem.src,\n\
			async: false,\n\
			dataType: \"script\"\n\
		});\n\
	} else {\n\
		jQuery.globalEval( ( elem.text || elem.textContent || elem.innerHTML || \"\" ).replace( rcleanScript, \"/*$0*/\" ) );\n\
	}\n\
\n\
	if ( elem.parentNode ) {\n\
		elem.parentNode.removeChild( elem );\n\
	}\n\
}\n\
\n\
\n\
\n\
\n\
var ralpha = /alpha\\([^)]*\\)/i,\n\
	ropacity = /opacity=([^)]*)/,\n\
	// fixed for IE9, see #8346\n\
	rupper = /([A-Z]|^ms)/g,\n\
	rnumpx = /^-?\\d+(?:px)?$/i,\n\
	rnum = /^-?\\d/,\n\
	rrelNum = /^([\\-+])=([\\-+.\\de]+)/,\n\
\n\
	cssShow = { position: \"absolute\", visibility: \"hidden\", display: \"block\" },\n\
	cssWidth = [ \"Left\", \"Right\" ],\n\
	cssHeight = [ \"Top\", \"Bottom\" ],\n\
	curCSS,\n\
\n\
	getComputedStyle,\n\
	currentStyle;\n\
\n\
jQuery.fn.css = function( name, value ) {\n\
	// Setting 'undefined' is a no-op\n\
	if ( arguments.length === 2 && value === undefined ) {\n\
		return this;\n\
	}\n\
\n\
	return jQuery.access( this, name, value, true, function( elem, name, value ) {\n\
		return value !== undefined ?\n\
			jQuery.style( elem, name, value ) :\n\
			jQuery.css( elem, name );\n\
	});\n\
};\n\
\n\
jQuery.extend({\n\
	// Add in style property hooks for overriding the default\n\
	// behavior of getting and setting a style property\n\
	cssHooks: {\n\
		opacity: {\n\
			get: function( elem, computed ) {\n\
				if ( computed ) {\n\
					// We should always get a number back from opacity\n\
					var ret = curCSS( elem, \"opacity\", \"opacity\" );\n\
					return ret === \"\" ? \"1\" : ret;\n\
\n\
				} else {\n\
					return elem.style.opacity;\n\
				}\n\
			}\n\
		}\n\
	},\n\
\n\
	// Exclude the following css properties to add px\n\
	cssNumber: {\n\
		\"fillOpacity\": true,\n\
		\"fontWeight\": true,\n\
		\"lineHeight\": true,\n\
		\"opacity\": true,\n\
		\"orphans\": true,\n\
		\"widows\": true,\n\
		\"zIndex\": true,\n\
		\"zoom\": true\n\
	},\n\
\n\
	// Add in properties whose names you wish to fix before\n\
	// setting or getting the value\n\
	cssProps: {\n\
		// normalize float css property\n\
		\"float\": jQuery.support.cssFloat ? \"cssFloat\" : \"styleFloat\"\n\
	},\n\
\n\
	// Get and set the style property on a DOM Node\n\
	style: function( elem, name, value, extra ) {\n\
		// Don't set styles on text and comment nodes\n\
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {\n\
			return;\n\
		}\n\
\n\
		// Make sure that we're working with the right name\n\
		var ret, type, origName = jQuery.camelCase( name ),\n\
			style = elem.style, hooks = jQuery.cssHooks[ origName ];\n\
\n\
		name = jQuery.cssProps[ origName ] || origName;\n\
\n\
		// Check if we're setting a value\n\
		if ( value !== undefined ) {\n\
			type = typeof value;\n\
\n\
			// convert relative number strings (+= or -=) to relative numbers. #7345\n\
			if ( type === \"string\" && (ret = rrelNum.exec( value )) ) {\n\
				value = ( +( ret[1] + 1) * +ret[2] ) + parseFloat( jQuery.css( elem, name ) );\n\
				// Fixes bug #9237\n\
				type = \"number\";\n\
			}\n\
\n\
			// Make sure that NaN and null values aren't set. See: #7116\n\
			if ( value == null || type === \"number\" && isNaN( value ) ) {\n\
				return;\n\
			}\n\
\n\
			// If a number was passed in, add 'px' to the (except for certain CSS properties)\n\
			if ( type === \"number\" && !jQuery.cssNumber[ origName ] ) {\n\
				value += \"px\";\n\
			}\n\
\n\
			// If a hook was provided, use that value, otherwise just set the specified value\n\
			if ( !hooks || !(\"set\" in hooks) || (value = hooks.set( elem, value )) !== undefined ) {\n\
				// Wrapped to prevent IE from throwing errors when 'invalid' values are provided\n\
				// Fixes bug #5509\n\
				try {\n\
					style[ name ] = value;\n\
				} catch(e) {}\n\
			}\n\
\n\
		} else {\n\
			// If a hook was provided get the non-computed value from there\n\
			if ( hooks && \"get\" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {\n\
				return ret;\n\
			}\n\
\n\
			// Otherwise just get the value from the style object\n\
			return style[ name ];\n\
		}\n\
	},\n\
\n\
	css: function( elem, name, extra ) {\n\
		var ret, hooks;\n\
\n\
		// Make sure that we're working with the right name\n\
		name = jQuery.camelCase( name );\n\
		hooks = jQuery.cssHooks[ name ];\n\
		name = jQuery.cssProps[ name ] || name;\n\
\n\
		// cssFloat needs a special treatment\n\
		if ( name === \"cssFloat\" ) {\n\
			name = \"float\";\n\
		}\n\
\n\
		// If a hook was provided get the computed value from there\n\
		if ( hooks && \"get\" in hooks && (ret = hooks.get( elem, true, extra )) !== undefined ) {\n\
			return ret;\n\
\n\
		// Otherwise, if a way to get the computed value exists, use that\n\
		} else if ( curCSS ) {\n\
			return curCSS( elem, name );\n\
		}\n\
	},\n\
\n\
	// A method for quickly swapping in/out CSS properties to get correct calculations\n\
	swap: function( elem, options, callback ) {\n\
		var old = {};\n\
\n\
		// Remember the old values, and insert the new ones\n\
		for ( var name in options ) {\n\
			old[ name ] = elem.style[ name ];\n\
			elem.style[ name ] = options[ name ];\n\
		}\n\
\n\
		callback.call( elem );\n\
\n\
		// Revert the old values\n\
		for ( name in options ) {\n\
			elem.style[ name ] = old[ name ];\n\
		}\n\
	}\n\
});\n\
\n\
// DEPRECATED, Use jQuery.css() instead\n\
jQuery.curCSS = jQuery.css;\n\
\n\
jQuery.each([\"height\", \"width\"], function( i, name ) {\n\
	jQuery.cssHooks[ name ] = {\n\
		get: function( elem, computed, extra ) {\n\
			var val;\n\
\n\
			if ( computed ) {\n\
				if ( elem.offsetWidth !== 0 ) {\n\
					return getWH( elem, name, extra );\n\
				} else {\n\
					jQuery.swap( elem, cssShow, function() {\n\
						val = getWH( elem, name, extra );\n\
					});\n\
				}\n\
\n\
				return val;\n\
			}\n\
		},\n\
\n\
		set: function( elem, value ) {\n\
			if ( rnumpx.test( value ) ) {\n\
				// ignore negative width and height values #1599\n\
				value = parseFloat( value );\n\
\n\
				if ( value >= 0 ) {\n\
					return value + \"px\";\n\
				}\n\
\n\
			} else {\n\
				return value;\n\
			}\n\
		}\n\
	};\n\
});\n\
\n\
if ( !jQuery.support.opacity ) {\n\
	jQuery.cssHooks.opacity = {\n\
		get: function( elem, computed ) {\n\
			// IE uses filters for opacity\n\
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || \"\" ) ?\n\
				( parseFloat( RegExp.$1 ) / 100 ) + \"\" :\n\
				computed ? \"1\" : \"\";\n\
		},\n\
\n\
		set: function( elem, value ) {\n\
			var style = elem.style,\n\
				currentStyle = elem.currentStyle,\n\
				opacity = jQuery.isNaN( value ) ? \"\" : \"alpha(opacity=\" + value * 100 + \")\",\n\
				filter = currentStyle && currentStyle.filter || style.filter || \"\";\n\
\n\
			// IE has trouble with opacity if it does not have layout\n\
			// Force it by setting the zoom level\n\
			style.zoom = 1;\n\
\n\
			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652\n\
			if ( value >= 1 && jQuery.trim( filter.replace( ralpha, \"\" ) ) === \"\" ) {\n\
\n\
				// Setting style.filter to null, \"\" & \" \" still leave \"filter:\" in the cssText\n\
				// if \"filter:\" is present at all, clearType is disabled, we want to avoid this\n\
				// style.removeAttribute is IE Only, but so apparently is this code path...\n\
				style.removeAttribute( \"filter\" );\n\
\n\
				// if there there is no filter style applied in a css rule, we are done\n\
				if ( currentStyle && !currentStyle.filter ) {\n\
					return;\n\
				}\n\
			}\n\
\n\
			// otherwise, set new filter values\n\
			style.filter = ralpha.test( filter ) ?\n\
				filter.replace( ralpha, opacity ) :\n\
				filter + \" \" + opacity;\n\
		}\n\
	};\n\
}\n\
\n\
jQuery(function() {\n\
	// This hook cannot be added until DOM ready because the support test\n\
	// for it is not run until after DOM ready\n\
	if ( !jQuery.support.reliableMarginRight ) {\n\
		jQuery.cssHooks.marginRight = {\n\
			get: function( elem, computed ) {\n\
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right\n\
				// Work around by temporarily setting element display to inline-block\n\
				var ret;\n\
				jQuery.swap( elem, { \"display\": \"inline-block\" }, function() {\n\
					if ( computed ) {\n\
						ret = curCSS( elem, \"margin-right\", \"marginRight\" );\n\
					} else {\n\
						ret = elem.style.marginRight;\n\
					}\n\
				});\n\
				return ret;\n\
			}\n\
		};\n\
	}\n\
});\n\
\n\
if ( document.defaultView && document.defaultView.getComputedStyle ) {\n\
	getComputedStyle = function( elem, name ) {\n\
		var ret, defaultView, computedStyle;\n\
\n\
		name = name.replace( rupper, \"-$1\" ).toLowerCase();\n\
\n\
		if ( !(defaultView = elem.ownerDocument.defaultView) ) {\n\
			return undefined;\n\
		}\n\
\n\
		if ( (computedStyle = defaultView.getComputedStyle( elem, null )) ) {\n\
			ret = computedStyle.getPropertyValue( name );\n\
			if ( ret === \"\" && !jQuery.contains( elem.ownerDocument.documentElement, elem ) ) {\n\
				ret = jQuery.style( elem, name );\n\
			}\n\
		}\n\
\n\
		return ret;\n\
	};\n\
}\n\
\n\
if ( document.documentElement.currentStyle ) {\n\
	currentStyle = function( elem, name ) {\n\
		var left,\n\
			ret = elem.currentStyle && elem.currentStyle[ name ],\n\
			rsLeft = elem.runtimeStyle && elem.runtimeStyle[ name ],\n\
			style = elem.style;\n\
\n\
		// From the awesome hack by Dean Edwards\n\
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291\n\
\n\
		// If we're not dealing with a regular pixel number\n\
		// but a number that has a weird ending, we need to convert it to pixels\n\
		if ( !rnumpx.test( ret ) && rnum.test( ret ) ) {\n\
			// Remember the original values\n\
			left = style.left;\n\
\n\
			// Put in the new values to get a computed value out\n\
			if ( rsLeft ) {\n\
				elem.runtimeStyle.left = elem.currentStyle.left;\n\
			}\n\
			style.left = name === \"fontSize\" ? \"1em\" : (ret || 0);\n\
			ret = style.pixelLeft + \"px\";\n\
\n\
			// Revert the changed values\n\
			style.left = left;\n\
			if ( rsLeft ) {\n\
				elem.runtimeStyle.left = rsLeft;\n\
			}\n\
		}\n\
\n\
		return ret === \"\" ? \"auto\" : ret;\n\
	};\n\
}\n\
\n\
curCSS = getComputedStyle || currentStyle;\n\
\n\
function getWH( elem, name, extra ) {\n\
\n\
	// Start with offset property\n\
	var val = name === \"width\" ? elem.offsetWidth : elem.offsetHeight,\n\
		which = name === \"width\" ? cssWidth : cssHeight;\n\
\n\
	if ( val > 0 ) {\n\
		if ( extra !== \"border\" ) {\n\
			jQuery.each( which, function() {\n\
				if ( !extra ) {\n\
					val -= parseFloat( jQuery.css( elem, \"padding\" + this ) ) || 0;\n\
				}\n\
				if ( extra === \"margin\" ) {\n\
					val += parseFloat( jQuery.css( elem, extra + this ) ) || 0;\n\
				} else {\n\
					val -= parseFloat( jQuery.css( elem, \"border\" + this + \"Width\" ) ) || 0;\n\
				}\n\
			});\n\
		}\n\
\n\
		return val + \"px\";\n\
	}\n\
\n\
	// Fall back to computed then uncomputed css if necessary\n\
	val = curCSS( elem, name, name );\n\
	if ( val < 0 || val == null ) {\n\
		val = elem.style[ name ] || 0;\n\
	}\n\
	// Normalize \"\", auto, and prepare for extra\n\
	val = parseFloat( val ) || 0;\n\
\n\
	// Add padding, border, margin\n\
	if ( extra ) {\n\
		jQuery.each( which, function() {\n\
			val += parseFloat( jQuery.css( elem, \"padding\" + this ) ) || 0;\n\
			if ( extra !== \"padding\" ) {\n\
				val += parseFloat( jQuery.css( elem, \"border\" + this + \"Width\" ) ) || 0;\n\
			}\n\
			if ( extra === \"margin\" ) {\n\
				val += parseFloat( jQuery.css( elem, extra + this ) ) || 0;\n\
			}\n\
		});\n\
	}\n\
\n\
	return val + \"px\";\n\
}\n\
\n\
if ( jQuery.expr && jQuery.expr.filters ) {\n\
	jQuery.expr.filters.hidden = function( elem ) {\n\
		var width = elem.offsetWidth,\n\
			height = elem.offsetHeight;\n\
\n\
		return (width === 0 && height === 0) || (!jQuery.support.reliableHiddenOffsets && (elem.style.display || jQuery.css( elem, \"display\" )) === \"none\");\n\
	};\n\
\n\
	jQuery.expr.filters.visible = function( elem ) {\n\
		return !jQuery.expr.filters.hidden( elem );\n\
	};\n\
}\n\
\n\
\n\
\n\
\n\
var r20 = /%20/g,\n\
	rbracket = /\\[\\]$/,\n\
	rCRLF = /\\r?\\n/g,\n\
	rhash = /#.*$/,\n\
	rheaders = /^(.*?):[ \\t]*([^\\r\\n]*)\\r?$/mg, // IE leaves an \\r character at EOL\n\
	rinput = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,\n\
	// #7653, #8125, #8152: local protocol detection\n\
	rlocalProtocol = /^(?:about|app|app\\-storage|.+\\-extension|file|res|widget):$/,\n\
	rnoContent = /^(?:GET|HEAD)$/,\n\
	rprotocol = /^\\/\\//,\n\
	rquery = /\\?/,\n\
	rscript = /<script\\b[^<]*(?:(?!<\\/script>)<[^<]*)*<\\/script>/gi,\n\
	rselectTextarea = /^(?:select|textarea)/i,\n\
	rspacesAjax = /\\s+/,\n\
	rts = /([?&])_=[^&]*/,\n\
	rurl = /^([\\w\\+\\.\\-]+:)(?:\\/\\/([^\\/?#:]*)(?::(\\d+))?)?/,\n\
\n\
	// Keep a copy of the old load method\n\
	_load = jQuery.fn.load,\n\
\n\
	/* Prefilters\n\
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)\n\
	 * 2) These are called:\n\
	 *    - BEFORE asking for a transport\n\
	 *    - AFTER param serialization (s.data is a string if s.processData is true)\n\
	 * 3) key is the dataType\n\
	 * 4) the catchall symbol \"*\" can be used\n\
	 * 5) execution will start with transport dataType and THEN continue down to \"*\" if needed\n\
	 */\n\
	prefilters = {},\n\
\n\
	/* Transports bindings\n\
	 * 1) key is the dataType\n\
	 * 2) the catchall symbol \"*\" can be used\n\
	 * 3) selection will start with transport dataType and THEN go to \"*\" if needed\n\
	 */\n\
	transports = {},\n\
\n\
	// Document location\n\
	ajaxLocation,\n\
\n\
	// Document location segments\n\
	ajaxLocParts,\n\
	\n\
	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression\n\
	allTypes = [\"*/\"] + [\"*\"];\n\
\n\
// #8138, IE may throw an exception when accessing\n\
// a field from window.location if document.domain has been set\n\
try {\n\
	ajaxLocation = location.href;\n\
} catch( e ) {\n\
	// Use the href attribute of an A element\n\
	// since IE will modify it given document.location\n\
	ajaxLocation = document.createElement( \"a\" );\n\
	ajaxLocation.href = \"\";\n\
	ajaxLocation = ajaxLocation.href;\n\
}\n\
\n\
// Segment location into parts\n\
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];\n\
\n\
// Base \"constructor\" for jQuery.ajaxPrefilter and jQuery.ajaxTransport\n\
function addToPrefiltersOrTransports( structure ) {\n\
\n\
	// dataTypeExpression is optional and defaults to \"*\"\n\
	return function( dataTypeExpression, func ) {\n\
\n\
		if ( typeof dataTypeExpression !== \"string\" ) {\n\
			func = dataTypeExpression;\n\
			dataTypeExpression = \"*\";\n\
		}\n\
\n\
		if ( jQuery.isFunction( func ) ) {\n\
			var dataTypes = dataTypeExpression.toLowerCase().split( rspacesAjax ),\n\
				i = 0,\n\
				length = dataTypes.length,\n\
				dataType,\n\
				list,\n\
				placeBefore;\n\
\n\
			// For each dataType in the dataTypeExpression\n\
			for(; i < length; i++ ) {\n\
				dataType = dataTypes[ i ];\n\
				// We control if we're asked to add before\n\
				// any existing element\n\
				placeBefore = /^\\+/.test( dataType );\n\
				if ( placeBefore ) {\n\
					dataType = dataType.substr( 1 ) || \"*\";\n\
				}\n\
				list = structure[ dataType ] = structure[ dataType ] || [];\n\
				// then we add to the structure accordingly\n\
				list[ placeBefore ? \"unshift\" : \"push\" ]( func );\n\
			}\n\
		}\n\
	};\n\
}\n\
\n\
// Base inspection function for prefilters and transports\n\
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR,\n\
		dataType /* internal */, inspected /* internal */ ) {\n\
\n\
	dataType = dataType || options.dataTypes[ 0 ];\n\
	inspected = inspected || {};\n\
\n\
	inspected[ dataType ] = true;\n\
\n\
	var list = structure[ dataType ],\n\
		i = 0,\n\
		length = list ? list.length : 0,\n\
		executeOnly = ( structure === prefilters ),\n\
		selection;\n\
\n\
	for(; i < length && ( executeOnly || !selection ); i++ ) {\n\
		selection = list[ i ]( options, originalOptions, jqXHR );\n\
		// If we got redirected to another dataType\n\
		// we try there if executing only and not done already\n\
		if ( typeof selection === \"string\" ) {\n\
			if ( !executeOnly || inspected[ selection ] ) {\n\
				selection = undefined;\n\
			} else {\n\
				options.dataTypes.unshift( selection );\n\
				selection = inspectPrefiltersOrTransports(\n\
						structure, options, originalOptions, jqXHR, selection, inspected );\n\
			}\n\
		}\n\
	}\n\
	// If we're only executing or nothing was selected\n\
	// we try the catchall dataType if not done already\n\
	if ( ( executeOnly || !selection ) && !inspected[ \"*\" ] ) {\n\
		selection = inspectPrefiltersOrTransports(\n\
				structure, options, originalOptions, jqXHR, \"*\", inspected );\n\
	}\n\
	// unnecessary when only executing (prefilters)\n\
	// but it'll be ignored by the caller in that case\n\
	return selection;\n\
}\n\
\n\
// A special extend for ajax options\n\
// that takes \"flat\" options (not to be deep extended)\n\
// Fixes #9887\n\
function ajaxExtend( target, src ) {\n\
	var key, deep,\n\
		flatOptions = jQuery.ajaxSettings.flatOptions || {};\n\
	for( key in src ) {\n\
		if ( src[ key ] !== undefined ) {\n\
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];\n\
		}\n\
	}\n\
	if ( deep ) {\n\
		jQuery.extend( true, target, deep );\n\
	}\n\
}\n\
\n\
jQuery.fn.extend({\n\
	load: function( url, params, callback ) {\n\
		if ( typeof url !== \"string\" && _load ) {\n\
			return _load.apply( this, arguments );\n\
\n\
		// Don't do a request if no elements are being requested\n\
		} else if ( !this.length ) {\n\
			return this;\n\
		}\n\
\n\
		var off = url.indexOf( \" \" );\n\
		if ( off >= 0 ) {\n\
			var selector = url.slice( off, url.length );\n\
			url = url.slice( 0, off );\n\
		}\n\
\n\
		// Default to a GET request\n\
		var type = \"GET\";\n\
\n\
		// If the second parameter was provided\n\
		if ( params ) {\n\
			// If it's a function\n\
			if ( jQuery.isFunction( params ) ) {\n\
				// We assume that it's the callback\n\
				callback = params;\n\
				params = undefined;\n\
\n\
			// Otherwise, build a param string\n\
			} else if ( typeof params === \"object\" ) {\n\
				params = jQuery.param( params, jQuery.ajaxSettings.traditional );\n\
				type = \"POST\";\n\
			}\n\
		}\n\
\n\
		var self = this;\n\
\n\
		// Request the remote document\n\
		jQuery.ajax({\n\
			url: url,\n\
			type: type,\n\
			dataType: \"html\",\n\
			data: params,\n\
			// Complete callback (responseText is used internally)\n\
			complete: function( jqXHR, status, responseText ) {\n\
				// Store the response as specified by the jqXHR object\n\
				responseText = jqXHR.responseText;\n\
				// If successful, inject the HTML into all the matched elements\n\
				if ( jqXHR.isResolved() ) {\n\
					// #4825: Get the actual response in case\n\
					// a dataFilter is present in ajaxSettings\n\
					jqXHR.done(function( r ) {\n\
						responseText = r;\n\
					});\n\
					// See if a selector was specified\n\
					self.html( selector ?\n\
						// Create a dummy div to hold the results\n\
						jQuery(\"<div>\")\n\
							// inject the contents of the document in, removing the scripts\n\
							// to avoid any 'Permission Denied' errors in IE\n\
							.append(responseText.replace(rscript, \"\"))\n\
\n\
							// Locate the specified elements\n\
							.find(selector) :\n\
\n\
						// If not, just inject the full result\n\
						responseText );\n\
				}\n\
\n\
				if ( callback ) {\n\
					self.each( callback, [ responseText, status, jqXHR ] );\n\
				}\n\
			}\n\
		});\n\
\n\
		return this;\n\
	},\n\
\n\
	serialize: function() {\n\
		return jQuery.param( this.serializeArray() );\n\
	},\n\
\n\
	serializeArray: function() {\n\
		return this.map(function(){\n\
			return this.elements ? jQuery.makeArray( this.elements ) : this;\n\
		})\n\
		.filter(function(){\n\
			return this.name && !this.disabled &&\n\
				( this.checked || rselectTextarea.test( this.nodeName ) ||\n\
					rinput.test( this.type ) );\n\
		})\n\
		.map(function( i, elem ){\n\
			var val = jQuery( this ).val();\n\
\n\
			return val == null ?\n\
				null :\n\
				jQuery.isArray( val ) ?\n\
					jQuery.map( val, function( val, i ){\n\
						return { name: elem.name, value: val.replace( rCRLF, \"\\r\\n\" ) };\n\
					}) :\n\
					{ name: elem.name, value: val.replace( rCRLF, \"\\r\\n\" ) };\n\
		}).get();\n\
	}\n\
});\n\
\n\
// Attach a bunch of functions for handling common AJAX events\n\
jQuery.each( \"ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend\".split( \" \" ), function( i, o ){\n\
	jQuery.fn[ o ] = function( f ){\n\
		return this.bind( o, f );\n\
	};\n\
});\n\
\n\
jQuery.each( [ \"get\", \"post\" ], function( i, method ) {\n\
	jQuery[ method ] = function( url, data, callback, type ) {\n\
		// shift arguments if data argument was omitted\n\
		if ( jQuery.isFunction( data ) ) {\n\
			type = type || callback;\n\
			callback = data;\n\
			data = undefined;\n\
		}\n\
\n\
		return jQuery.ajax({\n\
			type: method,\n\
			url: url,\n\
			data: data,\n\
			success: callback,\n\
			dataType: type\n\
		});\n\
	};\n\
});\n\
\n\
jQuery.extend({\n\
\n\
	getScript: function( url, callback ) {\n\
		return jQuery.get( url, undefined, callback, \"script\" );\n\
	},\n\
\n\
	getJSON: function( url, data, callback ) {\n\
		return jQuery.get( url, data, callback, \"json\" );\n\
	},\n\
\n\
	// Creates a full fledged settings object into target\n\
	// with both ajaxSettings and settings fields.\n\
	// If target is omitted, writes into ajaxSettings.\n\
	ajaxSetup: function( target, settings ) {\n\
		if ( settings ) {\n\
			// Building a settings object\n\
			ajaxExtend( target, jQuery.ajaxSettings );\n\
		} else {\n\
			// Extending ajaxSettings\n\
			settings = target;\n\
			target = jQuery.ajaxSettings;\n\
		}\n\
		ajaxExtend( target, settings );\n\
		return target;\n\
	},\n\
\n\
	ajaxSettings: {\n\
		url: ajaxLocation,\n\
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),\n\
		global: true,\n\
		type: \"GET\",\n\
		contentType: \"application/x-www-form-urlencoded\",\n\
		processData: true,\n\
		async: true,\n\
		/*\n\
		timeout: 0,\n\
		data: null,\n\
		dataType: null,\n\
		username: null,\n\
		password: null,\n\
		cache: null,\n\
		traditional: false,\n\
		headers: {},\n\
		*/\n\
\n\
		accepts: {\n\
			xml: \"application/xml, text/xml\",\n\
			html: \"text/html\",\n\
			text: \"text/plain\",\n\
			json: \"application/json, text/javascript\",\n\
			\"*\": allTypes\n\
		},\n\
\n\
		contents: {\n\
			xml: /xml/,\n\
			html: /html/,\n\
			json: /json/\n\
		},\n\
\n\
		responseFields: {\n\
			xml: \"responseXML\",\n\
			text: \"responseText\"\n\
		},\n\
\n\
		// List of data converters\n\
		// 1) key format is \"source_type destination_type\" (a single space in-between)\n\
		// 2) the catchall symbol \"*\" can be used for source_type\n\
		converters: {\n\
\n\
			// Convert anything to text\n\
			\"* text\": window.String,\n\
\n\
			// Text to html (true = no transformation)\n\
			\"text html\": true,\n\
\n\
			// Evaluate text as a json expression\n\
			\"text json\": jQuery.parseJSON,\n\
\n\
			// Parse text as xml\n\
			\"text xml\": jQuery.parseXML\n\
		},\n\
\n\
		// For options that shouldn't be deep extended:\n\
		// you can add your own custom options here if\n\
		// and when you create one that shouldn't be\n\
		// deep extended (see ajaxExtend)\n\
		flatOptions: {\n\
			context: true,\n\
			url: true\n\
		}\n\
	},\n\
\n\
	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),\n\
	ajaxTransport: addToPrefiltersOrTransports( transports ),\n\
\n\
	// Main method\n\
	ajax: function( url, options ) {\n\
\n\
		// If url is an object, simulate pre-1.5 signature\n\
		if ( typeof url === \"object\" ) {\n\
			options = url;\n\
			url = undefined;\n\
		}\n\
\n\
		// Force options to be an object\n\
		options = options || {};\n\
\n\
		var // Create the final options object\n\
			s = jQuery.ajaxSetup( {}, options ),\n\
			// Callbacks context\n\
			callbackContext = s.context || s,\n\
			// Context for global events\n\
			// It's the callbackContext if one was provided in the options\n\
			// and if it's a DOM node or a jQuery collection\n\
			globalEventContext = callbackContext !== s &&\n\
				( callbackContext.nodeType || callbackContext instanceof jQuery ) ?\n\
						jQuery( callbackContext ) : jQuery.event,\n\
			// Deferreds\n\
			deferred = jQuery.Deferred(),\n\
			completeDeferred = jQuery._Deferred(),\n\
			// Status-dependent callbacks\n\
			statusCode = s.statusCode || {},\n\
			// ifModified key\n\
			ifModifiedKey,\n\
			// Headers (they are sent all at once)\n\
			requestHeaders = {},\n\
			requestHeadersNames = {},\n\
			// Response headers\n\
			responseHeadersString,\n\
			responseHeaders,\n\
			// transport\n\
			transport,\n\
			// timeout handle\n\
			timeoutTimer,\n\
			// Cross-domain detection vars\n\
			parts,\n\
			// The jqXHR state\n\
			state = 0,\n\
			// To know if global events are to be dispatched\n\
			fireGlobals,\n\
			// Loop variable\n\
			i,\n\
			// Fake xhr\n\
			jqXHR = {\n\
\n\
				readyState: 0,\n\
\n\
				// Caches the header\n\
				setRequestHeader: function( name, value ) {\n\
					if ( !state ) {\n\
						var lname = name.toLowerCase();\n\
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;\n\
						requestHeaders[ name ] = value;\n\
					}\n\
					return this;\n\
				},\n\
\n\
				// Raw string\n\
				getAllResponseHeaders: function() {\n\
					return state === 2 ? responseHeadersString : null;\n\
				},\n\
\n\
				// Builds headers hashtable if needed\n\
				getResponseHeader: function( key ) {\n\
					var match;\n\
					if ( state === 2 ) {\n\
						if ( !responseHeaders ) {\n\
							responseHeaders = {};\n\
							while( ( match = rheaders.exec( responseHeadersString ) ) ) {\n\
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];\n\
							}\n\
						}\n\
						match = responseHeaders[ key.toLowerCase() ];\n\
					}\n\
					return match === undefined ? null : match;\n\
				},\n\
\n\
				// Overrides response content-type header\n\
				overrideMimeType: function( type ) {\n\
					if ( !state ) {\n\
						s.mimeType = type;\n\
					}\n\
					return this;\n\
				},\n\
\n\
				// Cancel the request\n\
				abort: function( statusText ) {\n\
					statusText = statusText || \"abort\";\n\
					if ( transport ) {\n\
						transport.abort( statusText );\n\
					}\n\
					done( 0, statusText );\n\
					return this;\n\
				}\n\
			};\n\
\n\
		// Callback for when everything is done\n\
		// It is defined here because jslint complains if it is declared\n\
		// at the end of the function (which would be more logical and readable)\n\
		function done( status, nativeStatusText, responses, headers ) {\n\
\n\
			// Called once\n\
			if ( state === 2 ) {\n\
				return;\n\
			}\n\
\n\
			// State is \"done\" now\n\
			state = 2;\n\
\n\
			// Clear timeout if it exists\n\
			if ( timeoutTimer ) {\n\
				clearTimeout( timeoutTimer );\n\
			}\n\
\n\
			// Dereference transport for early garbage collection\n\
			// (no matter how long the jqXHR object will be used)\n\
			transport = undefined;\n\
\n\
			// Cache response headers\n\
			responseHeadersString = headers || \"\";\n\
\n\
			// Set readyState\n\
			jqXHR.readyState = status > 0 ? 4 : 0;\n\
\n\
			var isSuccess,\n\
				success,\n\
				error,\n\
				statusText = nativeStatusText,\n\
				response = responses ? ajaxHandleResponses( s, jqXHR, responses ) : undefined,\n\
				lastModified,\n\
				etag;\n\
\n\
			// If successful, handle type chaining\n\
			if ( status >= 200 && status < 300 || status === 304 ) {\n\
\n\
				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.\n\
				if ( s.ifModified ) {\n\
\n\
					if ( ( lastModified = jqXHR.getResponseHeader( \"Last-Modified\" ) ) ) {\n\
						jQuery.lastModified[ ifModifiedKey ] = lastModified;\n\
					}\n\
					if ( ( etag = jqXHR.getResponseHeader( \"Etag\" ) ) ) {\n\
						jQuery.etag[ ifModifiedKey ] = etag;\n\
					}\n\
				}\n\
\n\
				// If not modified\n\
				if ( status === 304 ) {\n\
\n\
					statusText = \"notmodified\";\n\
					isSuccess = true;\n\
\n\
				// If we have data\n\
				} else {\n\
\n\
					try {\n\
						success = ajaxConvert( s, response );\n\
						statusText = \"success\";\n\
						isSuccess = true;\n\
					} catch(e) {\n\
						// We have a parsererror\n\
						statusText = \"parsererror\";\n\
						error = e;\n\
					}\n\
				}\n\
			} else {\n\
				// We extract error from statusText\n\
				// then normalize statusText and status for non-aborts\n\
				error = statusText;\n\
				if( !statusText || status ) {\n\
					statusText = \"error\";\n\
					if ( status < 0 ) {\n\
						status = 0;\n\
					}\n\
				}\n\
			}\n\
\n\
			// Set data for the fake xhr object\n\
			jqXHR.status = status;\n\
			jqXHR.statusText = \"\" + ( nativeStatusText || statusText );\n\
\n\
			// Success/Error\n\
			if ( isSuccess ) {\n\
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );\n\
			} else {\n\
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );\n\
			}\n\
\n\
			// Status-dependent callbacks\n\
			jqXHR.statusCode( statusCode );\n\
			statusCode = undefined;\n\
\n\
			if ( fireGlobals ) {\n\
				globalEventContext.trigger( \"ajax\" + ( isSuccess ? \"Success\" : \"Error\" ),\n\
						[ jqXHR, s, isSuccess ? success : error ] );\n\
			}\n\
\n\
			// Complete\n\
			completeDeferred.resolveWith( callbackContext, [ jqXHR, statusText ] );\n\
\n\
			if ( fireGlobals ) {\n\
				globalEventContext.trigger( \"ajaxComplete\", [ jqXHR, s ] );\n\
				// Handle the global AJAX counter\n\
				if ( !( --jQuery.active ) ) {\n\
					jQuery.event.trigger( \"ajaxStop\" );\n\
				}\n\
			}\n\
		}\n\
\n\
		// Attach deferreds\n\
		deferred.promise( jqXHR );\n\
		jqXHR.success = jqXHR.done;\n\
		jqXHR.error = jqXHR.fail;\n\
		jqXHR.complete = completeDeferred.done;\n\
\n\
		// Status-dependent callbacks\n\
		jqXHR.statusCode = function( map ) {\n\
			if ( map ) {\n\
				var tmp;\n\
				if ( state < 2 ) {\n\
					for( tmp in map ) {\n\
						statusCode[ tmp ] = [ statusCode[tmp], map[tmp] ];\n\
					}\n\
				} else {\n\
					tmp = map[ jqXHR.status ];\n\
					jqXHR.then( tmp, tmp );\n\
				}\n\
			}\n\
			return this;\n\
		};\n\
\n\
		// Remove hash character (#7531: and string promotion)\n\
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)\n\
		// We also use the url parameter if available\n\
		s.url = ( ( url || s.url ) + \"\" ).replace( rhash, \"\" ).replace( rprotocol, ajaxLocParts[ 1 ] + \"//\" );\n\
\n\
		// Extract dataTypes list\n\
		s.dataTypes = jQuery.trim( s.dataType || \"*\" ).toLowerCase().split( rspacesAjax );\n\
\n\
		// Determine if a cross-domain request is in order\n\
		if ( s.crossDomain == null ) {\n\
			parts = rurl.exec( s.url.toLowerCase() );\n\
			s.crossDomain = !!( parts &&\n\
				( parts[ 1 ] != ajaxLocParts[ 1 ] || parts[ 2 ] != ajaxLocParts[ 2 ] ||\n\
					( parts[ 3 ] || ( parts[ 1 ] === \"http:\" ? 80 : 443 ) ) !=\n\
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === \"http:\" ? 80 : 443 ) ) )\n\
			);\n\
		}\n\
\n\
		// Convert data if not already a string\n\
		if ( s.data && s.processData && typeof s.data !== \"string\" ) {\n\
			s.data = jQuery.param( s.data, s.traditional );\n\
		}\n\
\n\
		// Apply prefilters\n\
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );\n\
\n\
		// If request was aborted inside a prefiler, stop there\n\
		if ( state === 2 ) {\n\
			return false;\n\
		}\n\
\n\
		// We can fire global events as of now if asked to\n\
		fireGlobals = s.global;\n\
\n\
		// Uppercase the type\n\
		s.type = s.type.toUpperCase();\n\
\n\
		// Determine if request has content\n\
		s.hasContent = !rnoContent.test( s.type );\n\
\n\
		// Watch for a new set of requests\n\
		if ( fireGlobals && jQuery.active++ === 0 ) {\n\
			jQuery.event.trigger( \"ajaxStart\" );\n\
		}\n\
\n\
		// More options handling for requests with no content\n\
		if ( !s.hasContent ) {\n\
\n\
			// If data is available, append data to url\n\
			if ( s.data ) {\n\
				s.url += ( rquery.test( s.url ) ? \"&\" : \"?\" ) + s.data;\n\
				// #9682: remove data so that it's not used in an eventual retry\n\
				delete s.data;\n\
			}\n\
\n\
			// Get ifModifiedKey before adding the anti-cache parameter\n\
			ifModifiedKey = s.url;\n\
\n\
			// Add anti-cache in url if needed\n\
			if ( s.cache === false ) {\n\
\n\
				var ts = jQuery.now(),\n\
					// try replacing _= if it is there\n\
					ret = s.url.replace( rts, \"$1_=\" + ts );\n\
\n\
				// if nothing was replaced, add timestamp to the end\n\
				s.url = ret + ( (ret === s.url ) ? ( rquery.test( s.url ) ? \"&\" : \"?\" ) + \"_=\" + ts : \"\" );\n\
			}\n\
		}\n\
\n\
		// Set the correct header, if data is being sent\n\
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {\n\
			jqXHR.setRequestHeader( \"Content-Type\", s.contentType );\n\
		}\n\
\n\
		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.\n\
		if ( s.ifModified ) {\n\
			ifModifiedKey = ifModifiedKey || s.url;\n\
			if ( jQuery.lastModified[ ifModifiedKey ] ) {\n\
				jqXHR.setRequestHeader( \"If-Modified-Since\", jQuery.lastModified[ ifModifiedKey ] );\n\
			}\n\
			if ( jQuery.etag[ ifModifiedKey ] ) {\n\
				jqXHR.setRequestHeader( \"If-None-Match\", jQuery.etag[ ifModifiedKey ] );\n\
			}\n\
		}\n\
\n\
		// Set the Accepts header for the server, depending on the dataType\n\
		jqXHR.setRequestHeader(\n\
			\"Accept\",\n\
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?\n\
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== \"*\" ? \", \" + allTypes + \"; q=0.01\" : \"\" ) :\n\
				s.accepts[ \"*\" ]\n\
		);\n\
\n\
		// Check for headers option\n\
		for ( i in s.headers ) {\n\
			jqXHR.setRequestHeader( i, s.headers[ i ] );\n\
		}\n\
\n\
		// Allow custom headers/mimetypes and early abort\n\
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {\n\
				// Abort if not done already\n\
				jqXHR.abort();\n\
				return false;\n\
\n\
		}\n\
\n\
		// Install callbacks on deferreds\n\
		for ( i in { success: 1, error: 1, complete: 1 } ) {\n\
			jqXHR[ i ]( s[ i ] );\n\
		}\n\
\n\
		// Get transport\n\
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );\n\
\n\
		// If no transport, we auto-abort\n\
		if ( !transport ) {\n\
			done( -1, \"No Transport\" );\n\
		} else {\n\
			jqXHR.readyState = 1;\n\
			// Send global event\n\
			if ( fireGlobals ) {\n\
				globalEventContext.trigger( \"ajaxSend\", [ jqXHR, s ] );\n\
			}\n\
			// Timeout\n\
			if ( s.async && s.timeout > 0 ) {\n\
				timeoutTimer = setTimeout( function(){\n\
					jqXHR.abort( \"timeout\" );\n\
				}, s.timeout );\n\
			}\n\
\n\
			try {\n\
				state = 1;\n\
				transport.send( requestHeaders, done );\n\
			} catch (e) {\n\
				// Propagate exception as error if not done\n\
				if ( state < 2 ) {\n\
					done( -1, e );\n\
				// Simply rethrow otherwise\n\
				} else {\n\
					jQuery.error( e );\n\
				}\n\
			}\n\
		}\n\
\n\
		return jqXHR;\n\
	},\n\
\n\
	// Serialize an array of form elements or a set of\n\
	// key/values into a query string\n\
	param: function( a, traditional ) {\n\
		var s = [],\n\
			add = function( key, value ) {\n\
				// If value is a function, invoke it and return its value\n\
				value = jQuery.isFunction( value ) ? value() : value;\n\
				s[ s.length ] = encodeURIComponent( key ) + \"=\" + encodeURIComponent( value );\n\
			};\n\
\n\
		// Set traditional to true for jQuery <= 1.3.2 behavior.\n\
		if ( traditional === undefined ) {\n\
			traditional = jQuery.ajaxSettings.traditional;\n\
		}\n\
\n\
		// If an array was passed in, assume that it is an array of form elements.\n\
		if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {\n\
			// Serialize the form elements\n\
			jQuery.each( a, function() {\n\
				add( this.name, this.value );\n\
			});\n\
\n\
		} else {\n\
			// If traditional, encode the \"old\" way (the way 1.3.2 or older\n\
			// did it), otherwise encode params recursively.\n\
			for ( var prefix in a ) {\n\
				buildParams( prefix, a[ prefix ], traditional, add );\n\
			}\n\
		}\n\
\n\
		// Return the resulting serialization\n\
		return s.join( \"&\" ).replace( r20, \"+\" );\n\
	}\n\
});\n\
\n\
function buildParams( prefix, obj, traditional, add ) {\n\
	if ( jQuery.isArray( obj ) ) {\n\
		// Serialize array item.\n\
		jQuery.each( obj, function( i, v ) {\n\
			if ( traditional || rbracket.test( prefix ) ) {\n\
				// Treat each array item as a scalar.\n\
				add( prefix, v );\n\
\n\
			} else {\n\
				// If array item is non-scalar (array or object), encode its\n\
				// numeric index to resolve deserialization ambiguity issues.\n\
				// Note that rack (as of 1.0.0) can't currently deserialize\n\
				// nested arrays properly, and attempting to do so may cause\n\
				// a server error. Possible fixes are to modify rack's\n\
				// deserialization algorithm or to provide an option or flag\n\
				// to force array serialization to be shallow.\n\
				buildParams( prefix + \"[\" + ( typeof v === \"object\" || jQuery.isArray(v) ? i : \"\" ) + \"]\", v, traditional, add );\n\
			}\n\
		});\n\
\n\
	} else if ( !traditional && obj != null && typeof obj === \"object\" ) {\n\
		// Serialize object item.\n\
		for ( var name in obj ) {\n\
			buildParams( prefix + \"[\" + name + \"]\", obj[ name ], traditional, add );\n\
		}\n\
\n\
	} else {\n\
		// Serialize scalar item.\n\
		add( prefix, obj );\n\
	}\n\
}\n\
\n\
// This is still on the jQuery object... for now\n\
// Want to move this to jQuery.ajax some day\n\
jQuery.extend({\n\
\n\
	// Counter for holding the number of active queries\n\
	active: 0,\n\
\n\
	// Last-Modified header cache for next request\n\
	lastModified: {},\n\
	etag: {}\n\
\n\
});\n\
\n\
/* Handles responses to an ajax request:\n\
 * - sets all responseXXX fields accordingly\n\
 * - finds the right dataType (mediates between content-type and expected dataType)\n\
 * - returns the corresponding response\n\
 */\n\
function ajaxHandleResponses( s, jqXHR, responses ) {\n\
\n\
	var contents = s.contents,\n\
		dataTypes = s.dataTypes,\n\
		responseFields = s.responseFields,\n\
		ct,\n\
		type,\n\
		finalDataType,\n\
		firstDataType;\n\
\n\
	// Fill responseXXX fields\n\
	for( type in responseFields ) {\n\
		if ( type in responses ) {\n\
			jqXHR[ responseFields[type] ] = responses[ type ];\n\
		}\n\
	}\n\
\n\
	// Remove auto dataType and get content-type in the process\n\
	while( dataTypes[ 0 ] === \"*\" ) {\n\
		dataTypes.shift();\n\
		if ( ct === undefined ) {\n\
			ct = s.mimeType || jqXHR.getResponseHeader( \"content-type\" );\n\
		}\n\
	}\n\
\n\
	// Check if we're dealing with a known content-type\n\
	if ( ct ) {\n\
		for ( type in contents ) {\n\
			if ( contents[ type ] && contents[ type ].test( ct ) ) {\n\
				dataTypes.unshift( type );\n\
				break;\n\
			}\n\
		}\n\
	}\n\
\n\
	// Check to see if we have a response for the expected dataType\n\
	if ( dataTypes[ 0 ] in responses ) {\n\
		finalDataType = dataTypes[ 0 ];\n\
	} else {\n\
		// Try convertible dataTypes\n\
		for ( type in responses ) {\n\
			if ( !dataTypes[ 0 ] || s.converters[ type + \" \" + dataTypes[0] ] ) {\n\
				finalDataType = type;\n\
				break;\n\
			}\n\
			if ( !firstDataType ) {\n\
				firstDataType = type;\n\
			}\n\
		}\n\
		// Or just use first one\n\
		finalDataType = finalDataType || firstDataType;\n\
	}\n\
\n\
	// If we found a dataType\n\
	// We add the dataType to the list if needed\n\
	// and return the corresponding response\n\
	if ( finalDataType ) {\n\
		if ( finalDataType !== dataTypes[ 0 ] ) {\n\
			dataTypes.unshift( finalDataType );\n\
		}\n\
		return responses[ finalDataType ];\n\
	}\n\
}\n\
\n\
// Chain conversions given the request and the original response\n\
function ajaxConvert( s, response ) {\n\
\n\
	// Apply the dataFilter if provided\n\
	if ( s.dataFilter ) {\n\
		response = s.dataFilter( response, s.dataType );\n\
	}\n\
\n\
	var dataTypes = s.dataTypes,\n\
		converters = {},\n\
		i,\n\
		key,\n\
		length = dataTypes.length,\n\
		tmp,\n\
		// Current and previous dataTypes\n\
		current = dataTypes[ 0 ],\n\
		prev,\n\
		// Conversion expression\n\
		conversion,\n\
		// Conversion function\n\
		conv,\n\
		// Conversion functions (transitive conversion)\n\
		conv1,\n\
		conv2;\n\
\n\
	// For each dataType in the chain\n\
	for( i = 1; i < length; i++ ) {\n\
\n\
		// Create converters map\n\
		// with lowercased keys\n\
		if ( i === 1 ) {\n\
			for( key in s.converters ) {\n\
				if( typeof key === \"string\" ) {\n\
					converters[ key.toLowerCase() ] = s.converters[ key ];\n\
				}\n\
			}\n\
		}\n\
\n\
		// Get the dataTypes\n\
		prev = current;\n\
		current = dataTypes[ i ];\n\
\n\
		// If current is auto dataType, update it to prev\n\
		if( current === \"*\" ) {\n\
			current = prev;\n\
		// If no auto and dataTypes are actually different\n\
		} else if ( prev !== \"*\" && prev !== current ) {\n\
\n\
			// Get the converter\n\
			conversion = prev + \" \" + current;\n\
			conv = converters[ conversion ] || converters[ \"* \" + current ];\n\
\n\
			// If there is no direct converter, search transitively\n\
			if ( !conv ) {\n\
				conv2 = undefined;\n\
				for( conv1 in converters ) {\n\
					tmp = conv1.split( \" \" );\n\
					if ( tmp[ 0 ] === prev || tmp[ 0 ] === \"*\" ) {\n\
						conv2 = converters[ tmp[1] + \" \" + current ];\n\
						if ( conv2 ) {\n\
							conv1 = converters[ conv1 ];\n\
							if ( conv1 === true ) {\n\
								conv = conv2;\n\
							} else if ( conv2 === true ) {\n\
								conv = conv1;\n\
							}\n\
							break;\n\
						}\n\
					}\n\
				}\n\
			}\n\
			// If we found no converter, dispatch an error\n\
			if ( !( conv || conv2 ) ) {\n\
				jQuery.error( \"No conversion from \" + conversion.replace(\" \",\" to \") );\n\
			}\n\
			// If found converter is not an equivalence\n\
			if ( conv !== true ) {\n\
				// Convert with 1 or 2 converters accordingly\n\
				response = conv ? conv( response ) : conv2( conv1(response) );\n\
			}\n\
		}\n\
	}\n\
	return response;\n\
}\n\
\n\
\n\
\n\
\n\
var jsc = jQuery.now(),\n\
	jsre = /(\\=)\\?(&|$)|\\?\\?/i;\n\
\n\
// Default jsonp settings\n\
jQuery.ajaxSetup({\n\
	jsonp: \"callback\",\n\
	jsonpCallback: function() {\n\
		return jQuery.expando + \"_\" + ( jsc++ );\n\
	}\n\
});\n\
\n\
// Detect, normalize options and install callbacks for jsonp requests\n\
jQuery.ajaxPrefilter( \"json jsonp\", function( s, originalSettings, jqXHR ) {\n\
\n\
	var inspectData = s.contentType === \"application/x-www-form-urlencoded\" &&\n\
		( typeof s.data === \"string\" );\n\
\n\
	if ( s.dataTypes[ 0 ] === \"jsonp\" ||\n\
		s.jsonp !== false && ( jsre.test( s.url ) ||\n\
				inspectData && jsre.test( s.data ) ) ) {\n\
\n\
		var responseContainer,\n\
			jsonpCallback = s.jsonpCallback =\n\
				jQuery.isFunction( s.jsonpCallback ) ? s.jsonpCallback() : s.jsonpCallback,\n\
			previous = window[ jsonpCallback ],\n\
			url = s.url,\n\
			data = s.data,\n\
			replace = \"$1\" + jsonpCallback + \"$2\";\n\
\n\
		if ( s.jsonp !== false ) {\n\
			url = url.replace( jsre, replace );\n\
			if ( s.url === url ) {\n\
				if ( inspectData ) {\n\
					data = data.replace( jsre, replace );\n\
				}\n\
				if ( s.data === data ) {\n\
					// Add callback manually\n\
					url += (/\\?/.test( url ) ? \"&\" : \"?\") + s.jsonp + \"=\" + jsonpCallback;\n\
				}\n\
			}\n\
		}\n\
\n\
		s.url = url;\n\
		s.data = data;\n\
\n\
		// Install callback\n\
		window[ jsonpCallback ] = function( response ) {\n\
			responseContainer = [ response ];\n\
		};\n\
\n\
		// Clean-up function\n\
		jqXHR.always(function() {\n\
			// Set callback back to previous value\n\
			window[ jsonpCallback ] = previous;\n\
			// Call if it was a function and we have a response\n\
			if ( responseContainer && jQuery.isFunction( previous ) ) {\n\
				window[ jsonpCallback ]( responseContainer[ 0 ] );\n\
			}\n\
		});\n\
\n\
		// Use data converter to retrieve json after script execution\n\
		s.converters[\"script json\"] = function() {\n\
			if ( !responseContainer ) {\n\
				jQuery.error( jsonpCallback + \" was not called\" );\n\
			}\n\
			return responseContainer[ 0 ];\n\
		};\n\
\n\
		// force json dataType\n\
		s.dataTypes[ 0 ] = \"json\";\n\
\n\
		// Delegate to script\n\
		return \"script\";\n\
	}\n\
});\n\
\n\
\n\
\n\
\n\
// Install script dataType\n\
jQuery.ajaxSetup({\n\
	accepts: {\n\
		script: \"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript\"\n\
	},\n\
	contents: {\n\
		script: /javascript|ecmascript/\n\
	},\n\
	converters: {\n\
		\"text script\": function( text ) {\n\
			jQuery.globalEval( text );\n\
			return text;\n\
		}\n\
	}\n\
});\n\
\n\
// Handle cache's special case and global\n\
jQuery.ajaxPrefilter( \"script\", function( s ) {\n\
	if ( s.cache === undefined ) {\n\
		s.cache = false;\n\
	}\n\
	if ( s.crossDomain ) {\n\
		s.type = \"GET\";\n\
		s.global = false;\n\
	}\n\
});\n\
\n\
// Bind script tag hack transport\n\
jQuery.ajaxTransport( \"script\", function(s) {\n\
\n\
	// This transport only deals with cross domain requests\n\
	if ( s.crossDomain ) {\n\
\n\
		var script,\n\
			head = document.head || document.getElementsByTagName( \"head\" )[0] || document.documentElement;\n\
\n\
		return {\n\
\n\
			send: function( _, callback ) {\n\
\n\
				script = document.createElement( \"script\" );\n\
\n\
				script.async = \"async\";\n\
\n\
				if ( s.scriptCharset ) {\n\
					script.charset = s.scriptCharset;\n\
				}\n\
\n\
				script.src = s.url;\n\
\n\
				// Attach handlers for all browsers\n\
				script.onload = script.onreadystatechange = function( _, isAbort ) {\n\
\n\
					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {\n\
\n\
						// Handle memory leak in IE\n\
						script.onload = script.onreadystatechange = null;\n\
\n\
						// Remove the script\n\
						if ( head && script.parentNode ) {\n\
							head.removeChild( script );\n\
						}\n\
\n\
						// Dereference the script\n\
						script = undefined;\n\
\n\
						// Callback if not abort\n\
						if ( !isAbort ) {\n\
							callback( 200, \"success\" );\n\
						}\n\
					}\n\
				};\n\
				// Use insertBefore instead of appendChild  to circumvent an IE6 bug.\n\
				// This arises when a base node is used (#2709 and #4378).\n\
				head.insertBefore( script, head.firstChild );\n\
			},\n\
\n\
			abort: function() {\n\
				if ( script ) {\n\
					script.onload( 0, 1 );\n\
				}\n\
			}\n\
		};\n\
	}\n\
});\n\
\n\
\n\
\n\
\n\
var // #5280: Internet Explorer will keep connections alive if we don't abort on unload\n\
	xhrOnUnloadAbort = window.ActiveXObject ? function() {\n\
		// Abort all pending requests\n\
		for ( var key in xhrCallbacks ) {\n\
			xhrCallbacks[ key ]( 0, 1 );\n\
		}\n\
	} : false,\n\
	xhrId = 0,\n\
	xhrCallbacks;\n\
\n\
// Functions to create xhrs\n\
function createStandardXHR() {\n\
	try {\n\
		return new window.XMLHttpRequest();\n\
	} catch( e ) {}\n\
}\n\
\n\
function createActiveXHR() {\n\
	try {\n\
		return new window.ActiveXObject( \"Microsoft.XMLHTTP\" );\n\
	} catch( e ) {}\n\
}\n\
\n\
// Create the request object\n\
// (This is still attached to ajaxSettings for backward compatibility)\n\
jQuery.ajaxSettings.xhr = window.ActiveXObject ?\n\
	/* Microsoft failed to properly\n\
	 * implement the XMLHttpRequest in IE7 (can't request local files),\n\
	 * so we use the ActiveXObject when it is available\n\
	 * Additionally XMLHttpRequest can be disabled in IE7/IE8 so\n\
	 * we need a fallback.\n\
	 */\n\
	function() {\n\
		return !this.isLocal && createStandardXHR() || createActiveXHR();\n\
	} :\n\
	// For all other browsers, use the standard XMLHttpRequest object\n\
	createStandardXHR;\n\
\n\
// Determine support properties\n\
(function( xhr ) {\n\
	jQuery.extend( jQuery.support, {\n\
		ajax: !!xhr,\n\
		cors: !!xhr && ( \"withCredentials\" in xhr )\n\
	});\n\
})( jQuery.ajaxSettings.xhr() );\n\
\n\
// Create transport if the browser can provide an xhr\n\
if ( jQuery.support.ajax ) {\n\
\n\
	jQuery.ajaxTransport(function( s ) {\n\
		// Cross domain only allowed if supported through XMLHttpRequest\n\
		if ( !s.crossDomain || jQuery.support.cors ) {\n\
\n\
			var callback;\n\
\n\
			return {\n\
				send: function( headers, complete ) {\n\
\n\
					// Get a new xhr\n\
					var xhr = s.xhr(),\n\
						handle,\n\
						i;\n\
\n\
					// Open the socket\n\
					// Passing null username, generates a login popup on Opera (#2865)\n\
					if ( s.username ) {\n\
						xhr.open( s.type, s.url, s.async, s.username, s.password );\n\
					} else {\n\
						xhr.open( s.type, s.url, s.async );\n\
					}\n\
\n\
					// Apply custom fields if provided\n\
					if ( s.xhrFields ) {\n\
						for ( i in s.xhrFields ) {\n\
							xhr[ i ] = s.xhrFields[ i ];\n\
						}\n\
					}\n\
\n\
					// Override mime type if needed\n\
					if ( s.mimeType && xhr.overrideMimeType ) {\n\
						xhr.overrideMimeType( s.mimeType );\n\
					}\n\
\n\
					// X-Requested-With header\n\
					// For cross-domain requests, seeing as conditions for a preflight are\n\
					// akin to a jigsaw puzzle, we simply never set it to be sure.\n\
					// (it can always be set on a per-request basis or even using ajaxSetup)\n\
					// For same-domain requests, won't change header if already provided.\n\
					if ( !s.crossDomain && !headers[\"X-Requested-With\"] ) {\n\
						headers[ \"X-Requested-With\" ] = \"XMLHttpRequest\";\n\
					}\n\
\n\
					// Need an extra try/catch for cross domain requests in Firefox 3\n\
					try {\n\
						for ( i in headers ) {\n\
							xhr.setRequestHeader( i, headers[ i ] );\n\
						}\n\
					} catch( _ ) {}\n\
\n\
					// Do send the request\n\
					// This may raise an exception which is actually\n\
					// handled in jQuery.ajax (so no try/catch here)\n\
					xhr.send( ( s.hasContent && s.data ) || null );\n\
\n\
					// Listener\n\
					callback = function( _, isAbort ) {\n\
\n\
						var status,\n\
							statusText,\n\
							responseHeaders,\n\
							responses,\n\
							xml;\n\
\n\
						// Firefox throws exceptions when accessing properties\n\
						// of an xhr when a network error occured\n\
						// http://helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)\n\
						try {\n\
\n\
							// Was never called and is aborted or complete\n\
							if ( callback && ( isAbort || xhr.readyState === 4 ) ) {\n\
\n\
								// Only called once\n\
								callback = undefined;\n\
\n\
								// Do not keep as active anymore\n\
								if ( handle ) {\n\
									xhr.onreadystatechange = jQuery.noop;\n\
									if ( xhrOnUnloadAbort ) {\n\
										delete xhrCallbacks[ handle ];\n\
									}\n\
								}\n\
\n\
								// If it's an abort\n\
								if ( isAbort ) {\n\
									// Abort it manually if needed\n\
									if ( xhr.readyState !== 4 ) {\n\
										xhr.abort();\n\
									}\n\
								} else {\n\
									status = xhr.status;\n\
									responseHeaders = xhr.getAllResponseHeaders();\n\
									responses = {};\n\
									xml = xhr.responseXML;\n\
\n\
									// Construct response list\n\
									if ( xml && xml.documentElement /* #4958 */ ) {\n\
										responses.xml = xml;\n\
									}\n\
									responses.text = xhr.responseText;\n\
\n\
									// Firefox throws an exception when accessing\n\
									// statusText for faulty cross-domain requests\n\
									try {\n\
										statusText = xhr.statusText;\n\
									} catch( e ) {\n\
										// We normalize with Webkit giving an empty statusText\n\
										statusText = \"\";\n\
									}\n\
\n\
									// Filter status for non standard behaviors\n\
\n\
									// If the request is local and we have data: assume a success\n\
									// (success with no data won't get notified, that's the best we\n\
									// can do given current implementations)\n\
									if ( !status && s.isLocal && !s.crossDomain ) {\n\
										status = responses.text ? 200 : 404;\n\
									// IE - #1450: sometimes returns 1223 when it should be 204\n\
									} else if ( status === 1223 ) {\n\
										status = 204;\n\
									}\n\
								}\n\
							}\n\
						} catch( firefoxAccessException ) {\n\
							if ( !isAbort ) {\n\
								complete( -1, firefoxAccessException );\n\
							}\n\
						}\n\
\n\
						// Call complete if needed\n\
						if ( responses ) {\n\
							complete( status, statusText, responses, responseHeaders );\n\
						}\n\
					};\n\
\n\
					// if we're in sync mode or it's in cache\n\
					// and has been retrieved directly (IE6 & IE7)\n\
					// we need to manually fire the callback\n\
					if ( !s.async || xhr.readyState === 4 ) {\n\
						callback();\n\
					} else {\n\
						handle = ++xhrId;\n\
						if ( xhrOnUnloadAbort ) {\n\
							// Create the active xhrs callbacks list if needed\n\
							// and attach the unload handler\n\
							if ( !xhrCallbacks ) {\n\
								xhrCallbacks = {};\n\
								jQuery( window ).unload( xhrOnUnloadAbort );\n\
							}\n\
							// Add to list of active xhrs callbacks\n\
							xhrCallbacks[ handle ] = callback;\n\
						}\n\
						xhr.onreadystatechange = callback;\n\
					}\n\
				},\n\
\n\
				abort: function() {\n\
					if ( callback ) {\n\
						callback(0,1);\n\
					}\n\
				}\n\
			};\n\
		}\n\
	});\n\
}\n\
\n\
\n\
\n\
\n\
var elemdisplay = {},\n\
	iframe, iframeDoc,\n\
	rfxtypes = /^(?:toggle|show|hide)$/,\n\
	rfxnum = /^([+\\-]=)?([\\d+.\\-]+)([a-z%]*)$/i,\n\
	timerId,\n\
	fxAttrs = [\n\
		// height animations\n\
		[ \"height\", \"marginTop\", \"marginBottom\", \"paddingTop\", \"paddingBottom\" ],\n\
		// width animations\n\
		[ \"width\", \"marginLeft\", \"marginRight\", \"paddingLeft\", \"paddingRight\" ],\n\
		// opacity animations\n\
		[ \"opacity\" ]\n\
	],\n\
	fxNow;\n\
\n\
jQuery.fn.extend({\n\
	show: function( speed, easing, callback ) {\n\
		var elem, display;\n\
\n\
		if ( speed || speed === 0 ) {\n\
			return this.animate( genFx(\"show\", 3), speed, easing, callback);\n\
\n\
		} else {\n\
			for ( var i = 0, j = this.length; i < j; i++ ) {\n\
				elem = this[i];\n\
\n\
				if ( elem.style ) {\n\
					display = elem.style.display;\n\
\n\
					// Reset the inline display of this element to learn if it is\n\
					// being hidden by cascaded rules or not\n\
					if ( !jQuery._data(elem, \"olddisplay\") && display === \"none\" ) {\n\
						display = elem.style.display = \"\";\n\
					}\n\
\n\
					// Set elements which have been overridden with display: none\n\
					// in a stylesheet to whatever the default browser style is\n\
					// for such an element\n\
					if ( display === \"\" && jQuery.css( elem, \"display\" ) === \"none\" ) {\n\
						jQuery._data(elem, \"olddisplay\", defaultDisplay(elem.nodeName));\n\
					}\n\
				}\n\
			}\n\
\n\
			// Set the display of most of the elements in a second loop\n\
			// to avoid the constant reflow\n\
			for ( i = 0; i < j; i++ ) {\n\
				elem = this[i];\n\
\n\
				if ( elem.style ) {\n\
					display = elem.style.display;\n\
\n\
					if ( display === \"\" || display === \"none\" ) {\n\
						elem.style.display = jQuery._data(elem, \"olddisplay\") || \"\";\n\
					}\n\
				}\n\
			}\n\
\n\
			return this;\n\
		}\n\
	},\n\
\n\
	hide: function( speed, easing, callback ) {\n\
		if ( speed || speed === 0 ) {\n\
			return this.animate( genFx(\"hide\", 3), speed, easing, callback);\n\
\n\
		} else {\n\
			for ( var i = 0, j = this.length; i < j; i++ ) {\n\
				if ( this[i].style ) {\n\
					var display = jQuery.css( this[i], \"display\" );\n\
\n\
					if ( display !== \"none\" && !jQuery._data( this[i], \"olddisplay\" ) ) {\n\
						jQuery._data( this[i], \"olddisplay\", display );\n\
					}\n\
				}\n\
			}\n\
\n\
			// Set the display of the elements in a second loop\n\
			// to avoid the constant reflow\n\
			for ( i = 0; i < j; i++ ) {\n\
				if ( this[i].style ) {\n\
					this[i].style.display = \"none\";\n\
				}\n\
			}\n\
\n\
			return this;\n\
		}\n\
	},\n\
\n\
	// Save the old toggle function\n\
	_toggle: jQuery.fn.toggle,\n\
\n\
	toggle: function( fn, fn2, callback ) {\n\
		var bool = typeof fn === \"boolean\";\n\
\n\
		if ( jQuery.isFunction(fn) && jQuery.isFunction(fn2) ) {\n\
			this._toggle.apply( this, arguments );\n\
\n\
		} else if ( fn == null || bool ) {\n\
			this.each(function() {\n\
				var state = bool ? fn : jQuery(this).is(\":hidden\");\n\
				jQuery(this)[ state ? \"show\" : \"hide\" ]();\n\
			});\n\
\n\
		} else {\n\
			this.animate(genFx(\"toggle\", 3), fn, fn2, callback);\n\
		}\n\
\n\
		return this;\n\
	},\n\
\n\
	fadeTo: function( speed, to, easing, callback ) {\n\
		return this.filter(\":hidden\").css(\"opacity\", 0).show().end()\n\
					.animate({opacity: to}, speed, easing, callback);\n\
	},\n\
\n\
	animate: function( prop, speed, easing, callback ) {\n\
		var optall = jQuery.speed(speed, easing, callback);\n\
\n\
		if ( jQuery.isEmptyObject( prop ) ) {\n\
			return this.each( optall.complete, [ false ] );\n\
		}\n\
\n\
		// Do not change referenced properties as per-property easing will be lost\n\
		prop = jQuery.extend( {}, prop );\n\
\n\
		return this[ optall.queue === false ? \"each\" : \"queue\" ](function() {\n\
			// XXX 'this' does not always have a nodeName when running the\n\
			// test suite\n\
\n\
			if ( optall.queue === false ) {\n\
				jQuery._mark( this );\n\
			}\n\
\n\
			var opt = jQuery.extend( {}, optall ),\n\
				isElement = this.nodeType === 1,\n\
				hidden = isElement && jQuery(this).is(\":hidden\"),\n\
				name, val, p,\n\
				display, e,\n\
				parts, start, end, unit;\n\
\n\
			// will store per property easing and be used to determine when an animation is complete\n\
			opt.animatedProperties = {};\n\
\n\
			for ( p in prop ) {\n\
\n\
				// property name normalization\n\
				name = jQuery.camelCase( p );\n\
				if ( p !== name ) {\n\
					prop[ name ] = prop[ p ];\n\
					delete prop[ p ];\n\
				}\n\
\n\
				val = prop[ name ];\n\
\n\
				// easing resolution: per property > opt.specialEasing > opt.easing > 'swing' (default)\n\
				if ( jQuery.isArray( val ) ) {\n\
					opt.animatedProperties[ name ] = val[ 1 ];\n\
					val = prop[ name ] = val[ 0 ];\n\
				} else {\n\
					opt.animatedProperties[ name ] = opt.specialEasing && opt.specialEasing[ name ] || opt.easing || 'swing';\n\
				}\n\
\n\
				if ( val === \"hide\" && hidden || val === \"show\" && !hidden ) {\n\
					return opt.complete.call( this );\n\
				}\n\
\n\
				if ( isElement && ( name === \"height\" || name === \"width\" ) ) {\n\
					// Make sure that nothing sneaks out\n\
					// Record all 3 overflow attributes because IE does not\n\
					// change the overflow attribute when overflowX and\n\
					// overflowY are set to the same value\n\
					opt.overflow = [ this.style.overflow, this.style.overflowX, this.style.overflowY ];\n\
\n\
					// Set display property to inline-block for height/width\n\
					// animations on inline elements that are having width/height\n\
					// animated\n\
					if ( jQuery.css( this, \"display\" ) === \"inline\" &&\n\
							jQuery.css( this, \"float\" ) === \"none\" ) {\n\
						if ( !jQuery.support.inlineBlockNeedsLayout ) {\n\
							this.style.display = \"inline-block\";\n\
\n\
						} else {\n\
							display = defaultDisplay( this.nodeName );\n\
\n\
							// inline-level elements accept inline-block;\n\
							// block-level elements need to be inline with layout\n\
							if ( display === \"inline\" ) {\n\
								this.style.display = \"inline-block\";\n\
\n\
							} else {\n\
								this.style.display = \"inline\";\n\
								this.style.zoom = 1;\n\
							}\n\
						}\n\
					}\n\
				}\n\
			}\n\
\n\
			if ( opt.overflow != null ) {\n\
				this.style.overflow = \"hidden\";\n\
			}\n\
\n\
			for ( p in prop ) {\n\
				e = new jQuery.fx( this, opt, p );\n\
				val = prop[ p ];\n\
\n\
				if ( rfxtypes.test(val) ) {\n\
					e[ val === \"toggle\" ? hidden ? \"show\" : \"hide\" : val ]();\n\
\n\
				} else {\n\
					parts = rfxnum.exec( val );\n\
					start = e.cur();\n\
\n\
					if ( parts ) {\n\
						end = parseFloat( parts[2] );\n\
						unit = parts[3] || ( jQuery.cssNumber[ p ] ? \"\" : \"px\" );\n\
\n\
						// We need to compute starting value\n\
						if ( unit !== \"px\" ) {\n\
							jQuery.style( this, p, (end || 1) + unit);\n\
							start = ((end || 1) / e.cur()) * start;\n\
							jQuery.style( this, p, start + unit);\n\
						}\n\
\n\
						// If a +=/-= token was provided, we're doing a relative animation\n\
						if ( parts[1] ) {\n\
							end = ( (parts[ 1 ] === \"-=\" ? -1 : 1) * end ) + start;\n\
						}\n\
\n\
						e.custom( start, end, unit );\n\
\n\
					} else {\n\
						e.custom( start, val, \"\" );\n\
					}\n\
				}\n\
			}\n\
\n\
			// For JS strict compliance\n\
			return true;\n\
		});\n\
	},\n\
\n\
	stop: function( clearQueue, gotoEnd ) {\n\
		if ( clearQueue ) {\n\
			this.queue([]);\n\
		}\n\
\n\
		this.each(function() {\n\
			var timers = jQuery.timers,\n\
				i = timers.length;\n\
			// clear marker counters if we know they won't be\n\
			if ( !gotoEnd ) {\n\
				jQuery._unmark( true, this );\n\
			}\n\
			while ( i-- ) {\n\
				if ( timers[i].elem === this ) {\n\
					if (gotoEnd) {\n\
						// force the next step to be the last\n\
						timers[i](true);\n\
					}\n\
\n\
					timers.splice(i, 1);\n\
				}\n\
			}\n\
		});\n\
\n\
		// start the next in the queue if the last step wasn't forced\n\
		if ( !gotoEnd ) {\n\
			this.dequeue();\n\
		}\n\
\n\
		return this;\n\
	}\n\
\n\
});\n\
\n\
// Animations created synchronously will run synchronously\n\
function createFxNow() {\n\
	setTimeout( clearFxNow, 0 );\n\
	return ( fxNow = jQuery.now() );\n\
}\n\
\n\
function clearFxNow() {\n\
	fxNow = undefined;\n\
}\n\
\n\
// Generate parameters to create a standard animation\n\
function genFx( type, num ) {\n\
	var obj = {};\n\
\n\
	jQuery.each( fxAttrs.concat.apply([], fxAttrs.slice(0,num)), function() {\n\
		obj[ this ] = type;\n\
	});\n\
\n\
	return obj;\n\
}\n\
\n\
// Generate shortcuts for custom animations\n\
jQuery.each({\n\
	slideDown: genFx(\"show\", 1),\n\
	slideUp: genFx(\"hide\", 1),\n\
	slideToggle: genFx(\"toggle\", 1),\n\
	fadeIn: { opacity: \"show\" },\n\
	fadeOut: { opacity: \"hide\" },\n\
	fadeToggle: { opacity: \"toggle\" }\n\
}, function( name, props ) {\n\
	jQuery.fn[ name ] = function( speed, easing, callback ) {\n\
		return this.animate( props, speed, easing, callback );\n\
	};\n\
});\n\
\n\
jQuery.extend({\n\
	speed: function( speed, easing, fn ) {\n\
		var opt = speed && typeof speed === \"object\" ? jQuery.extend({}, speed) : {\n\
			complete: fn || !fn && easing ||\n\
				jQuery.isFunction( speed ) && speed,\n\
			duration: speed,\n\
			easing: fn && easing || easing && !jQuery.isFunction(easing) && easing\n\
		};\n\
\n\
		opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === \"number\" ? opt.duration :\n\
			opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;\n\
\n\
		// Queueing\n\
		opt.old = opt.complete;\n\
		opt.complete = function( noUnmark ) {\n\
			if ( jQuery.isFunction( opt.old ) ) {\n\
				opt.old.call( this );\n\
			}\n\
\n\
			if ( opt.queue !== false ) {\n\
				jQuery.dequeue( this );\n\
			} else if ( noUnmark !== false ) {\n\
				jQuery._unmark( this );\n\
			}\n\
		};\n\
\n\
		return opt;\n\
	},\n\
\n\
	easing: {\n\
		linear: function( p, n, firstNum, diff ) {\n\
			return firstNum + diff * p;\n\
		},\n\
		swing: function( p, n, firstNum, diff ) {\n\
			return ((-Math.cos(p*Math.PI)/2) + 0.5) * diff + firstNum;\n\
		}\n\
	},\n\
\n\
	timers: [],\n\
\n\
	fx: function( elem, options, prop ) {\n\
		this.options = options;\n\
		this.elem = elem;\n\
		this.prop = prop;\n\
\n\
		options.orig = options.orig || {};\n\
	}\n\
\n\
});\n\
\n\
jQuery.fx.prototype = {\n\
	// Simple function for setting a style value\n\
	update: function() {\n\
		if ( this.options.step ) {\n\
			this.options.step.call( this.elem, this.now, this );\n\
		}\n\
\n\
		(jQuery.fx.step[this.prop] || jQuery.fx.step._default)( this );\n\
	},\n\
\n\
	// Get the current size\n\
	cur: function() {\n\
		if ( this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null) ) {\n\
			return this.elem[ this.prop ];\n\
		}\n\
\n\
		var parsed,\n\
			r = jQuery.css( this.elem, this.prop );\n\
		// Empty strings, null, undefined and \"auto\" are converted to 0,\n\
		// complex values such as \"rotate(1rad)\" are returned as is,\n\
		// simple values such as \"10px\" are parsed to Float.\n\
		return isNaN( parsed = parseFloat( r ) ) ? !r || r === \"auto\" ? 0 : r : parsed;\n\
	},\n\
\n\
	// Start an animation from one number to another\n\
	custom: function( from, to, unit ) {\n\
		var self = this,\n\
			fx = jQuery.fx;\n\
\n\
		this.startTime = fxNow || createFxNow();\n\
		this.start = from;\n\
		this.end = to;\n\
		this.unit = unit || this.unit || ( jQuery.cssNumber[ this.prop ] ? \"\" : \"px\" );\n\
		this.now = this.start;\n\
		this.pos = this.state = 0;\n\
\n\
		function t( gotoEnd ) {\n\
			return self.step(gotoEnd);\n\
		}\n\
\n\
		t.elem = this.elem;\n\
\n\
		if ( t() && jQuery.timers.push(t) && !timerId ) {\n\
			timerId = setInterval( fx.tick, fx.interval );\n\
		}\n\
	},\n\
\n\
	// Simple 'show' function\n\
	show: function() {\n\
		// Remember where we started, so that we can go back to it later\n\
		this.options.orig[this.prop] = jQuery.style( this.elem, this.prop );\n\
		this.options.show = true;\n\
\n\
		// Begin the animation\n\
		// Make sure that we start at a small width/height to avoid any\n\
		// flash of content\n\
		this.custom(this.prop === \"width\" || this.prop === \"height\" ? 1 : 0, this.cur());\n\
\n\
		// Start by showing the element\n\
		jQuery( this.elem ).show();\n\
	},\n\
\n\
	// Simple 'hide' function\n\
	hide: function() {\n\
		// Remember where we started, so that we can go back to it later\n\
		this.options.orig[this.prop] = jQuery.style( this.elem, this.prop );\n\
		this.options.hide = true;\n\
\n\
		// Begin the animation\n\
		this.custom(this.cur(), 0);\n\
	},\n\
\n\
	// Each step of an animation\n\
	step: function( gotoEnd ) {\n\
		var t = fxNow || createFxNow(),\n\
			done = true,\n\
			elem = this.elem,\n\
			options = this.options,\n\
			i, n;\n\
\n\
		if ( gotoEnd || t >= options.duration + this.startTime ) {\n\
			this.now = this.end;\n\
			this.pos = this.state = 1;\n\
			this.update();\n\
\n\
			options.animatedProperties[ this.prop ] = true;\n\
\n\
			for ( i in options.animatedProperties ) {\n\
				if ( options.animatedProperties[i] !== true ) {\n\
					done = false;\n\
				}\n\
			}\n\
\n\
			if ( done ) {\n\
				// Reset the overflow\n\
				if ( options.overflow != null && !jQuery.support.shrinkWrapBlocks ) {\n\
\n\
					jQuery.each( [ \"\", \"X\", \"Y\" ], function (index, value) {\n\
						elem.style[ \"overflow\" + value ] = options.overflow[index];\n\
					});\n\
				}\n\
\n\
				// Hide the element if the \"hide\" operation was done\n\
				if ( options.hide ) {\n\
					jQuery(elem).hide();\n\
				}\n\
\n\
				// Reset the properties, if the item has been hidden or shown\n\
				if ( options.hide || options.show ) {\n\
					for ( var p in options.animatedProperties ) {\n\
						jQuery.style( elem, p, options.orig[p] );\n\
					}\n\
				}\n\
\n\
				// Execute the complete function\n\
				options.complete.call( elem );\n\
			}\n\
\n\
			return false;\n\
\n\
		} else {\n\
			// classical easing cannot be used with an Infinity duration\n\
			if ( options.duration == Infinity ) {\n\
				this.now = t;\n\
			} else {\n\
				n = t - this.startTime;\n\
				this.state = n / options.duration;\n\
\n\
				// Perform the easing function, defaults to swing\n\
				this.pos = jQuery.easing[ options.animatedProperties[ this.prop ] ]( this.state, n, 0, 1, options.duration );\n\
				this.now = this.start + ((this.end - this.start) * this.pos);\n\
			}\n\
			// Perform the next step of the animation\n\
			this.update();\n\
		}\n\
\n\
		return true;\n\
	}\n\
};\n\
\n\
jQuery.extend( jQuery.fx, {\n\
	tick: function() {\n\
		for ( var timers = jQuery.timers, i = 0 ; i < timers.length ; ++i ) {\n\
			if ( !timers[i]() ) {\n\
				timers.splice(i--, 1);\n\
			}\n\
		}\n\
\n\
		if ( !timers.length ) {\n\
			jQuery.fx.stop();\n\
		}\n\
	},\n\
\n\
	interval: 13,\n\
\n\
	stop: function() {\n\
		clearInterval( timerId );\n\
		timerId = null;\n\
	},\n\
\n\
	speeds: {\n\
		slow: 600,\n\
		fast: 200,\n\
		// Default speed\n\
		_default: 400\n\
	},\n\
\n\
	step: {\n\
		opacity: function( fx ) {\n\
			jQuery.style( fx.elem, \"opacity\", fx.now );\n\
		},\n\
\n\
		_default: function( fx ) {\n\
			if ( fx.elem.style && fx.elem.style[ fx.prop ] != null ) {\n\
				fx.elem.style[ fx.prop ] = (fx.prop === \"width\" || fx.prop === \"height\" ? Math.max(0, fx.now) : fx.now) + fx.unit;\n\
			} else {\n\
				fx.elem[ fx.prop ] = fx.now;\n\
			}\n\
		}\n\
	}\n\
});\n\
\n\
if ( jQuery.expr && jQuery.expr.filters ) {\n\
	jQuery.expr.filters.animated = function( elem ) {\n\
		return jQuery.grep(jQuery.timers, function( fn ) {\n\
			return elem === fn.elem;\n\
		}).length;\n\
	};\n\
}\n\
\n\
// Try to restore the default display value of an element\n\
function defaultDisplay( nodeName ) {\n\
\n\
	if ( !elemdisplay[ nodeName ] ) {\n\
\n\
		var body = document.body,\n\
			elem = jQuery( \"<\" + nodeName + \">\" ).appendTo( body ),\n\
			display = elem.css( \"display\" );\n\
\n\
		elem.remove();\n\
\n\
		// If the simple way fails,\n\
		// get element's real default display by attaching it to a temp iframe\n\
		if ( display === \"none\" || display === \"\" ) {\n\
			// No iframe to use yet, so create it\n\
			if ( !iframe ) {\n\
				iframe = document.createElement( \"iframe\" );\n\
				iframe.frameBorder = iframe.width = iframe.height = 0;\n\
			}\n\
\n\
			body.appendChild( iframe );\n\
\n\
			// Create a cacheable copy of the iframe document on first call.\n\
			// IE and Opera will allow us to reuse the iframeDoc without re-writing the fake HTML\n\
			// document to it; WebKit & Firefox won't allow reusing the iframe document.\n\
			if ( !iframeDoc || !iframe.createElement ) {\n\
				iframeDoc = ( iframe.contentWindow || iframe.contentDocument ).document;\n\
				iframeDoc.write( ( document.compatMode === \"CSS1Compat\" ? \"<!doctype html>\" : \"\" ) + \"<html><body>\" );\n\
				iframeDoc.close();\n\
			}\n\
\n\
			elem = iframeDoc.createElement( nodeName );\n\
\n\
			iframeDoc.body.appendChild( elem );\n\
\n\
			display = jQuery.css( elem, \"display\" );\n\
\n\
			body.removeChild( iframe );\n\
		}\n\
\n\
		// Store the correct default display\n\
		elemdisplay[ nodeName ] = display;\n\
	}\n\
\n\
	return elemdisplay[ nodeName ];\n\
}\n\
\n\
\n\
\n\
\n\
var rtable = /^t(?:able|d|h)$/i,\n\
	rroot = /^(?:body|html)$/i;\n\
\n\
if ( \"getBoundingClientRect\" in document.documentElement ) {\n\
	jQuery.fn.offset = function( options ) {\n\
		var elem = this[0], box;\n\
\n\
		if ( options ) {\n\
			return this.each(function( i ) {\n\
				jQuery.offset.setOffset( this, options, i );\n\
			});\n\
		}\n\
\n\
		if ( !elem || !elem.ownerDocument ) {\n\
			return null;\n\
		}\n\
\n\
		if ( elem === elem.ownerDocument.body ) {\n\
			return jQuery.offset.bodyOffset( elem );\n\
		}\n\
\n\
		try {\n\
			box = elem.getBoundingClientRect();\n\
		} catch(e) {}\n\
\n\
		var doc = elem.ownerDocument,\n\
			docElem = doc.documentElement;\n\
\n\
		// Make sure we're not dealing with a disconnected DOM node\n\
		if ( !box || !jQuery.contains( docElem, elem ) ) {\n\
			return box ? { top: box.top, left: box.left } : { top: 0, left: 0 };\n\
		}\n\
\n\
		var body = doc.body,\n\
			win = getWindow(doc),\n\
			clientTop  = docElem.clientTop  || body.clientTop  || 0,\n\
			clientLeft = docElem.clientLeft || body.clientLeft || 0,\n\
			scrollTop  = win.pageYOffset || jQuery.support.boxModel && docElem.scrollTop  || body.scrollTop,\n\
			scrollLeft = win.pageXOffset || jQuery.support.boxModel && docElem.scrollLeft || body.scrollLeft,\n\
			top  = box.top  + scrollTop  - clientTop,\n\
			left = box.left + scrollLeft - clientLeft;\n\
\n\
		return { top: top, left: left };\n\
	};\n\
\n\
} else {\n\
	jQuery.fn.offset = function( options ) {\n\
		var elem = this[0];\n\
\n\
		if ( options ) {\n\
			return this.each(function( i ) {\n\
				jQuery.offset.setOffset( this, options, i );\n\
			});\n\
		}\n\
\n\
		if ( !elem || !elem.ownerDocument ) {\n\
			return null;\n\
		}\n\
\n\
		if ( elem === elem.ownerDocument.body ) {\n\
			return jQuery.offset.bodyOffset( elem );\n\
		}\n\
\n\
		jQuery.offset.initialize();\n\
\n\
		var computedStyle,\n\
			offsetParent = elem.offsetParent,\n\
			prevOffsetParent = elem,\n\
			doc = elem.ownerDocument,\n\
			docElem = doc.documentElement,\n\
			body = doc.body,\n\
			defaultView = doc.defaultView,\n\
			prevComputedStyle = defaultView ? defaultView.getComputedStyle( elem, null ) : elem.currentStyle,\n\
			top = elem.offsetTop,\n\
			left = elem.offsetLeft;\n\
\n\
		while ( (elem = elem.parentNode) && elem !== body && elem !== docElem ) {\n\
			if ( jQuery.offset.supportsFixedPosition && prevComputedStyle.position === \"fixed\" ) {\n\
				break;\n\
			}\n\
\n\
			computedStyle = defaultView ? defaultView.getComputedStyle(elem, null) : elem.currentStyle;\n\
			top  -= elem.scrollTop;\n\
			left -= elem.scrollLeft;\n\
\n\
			if ( elem === offsetParent ) {\n\
				top  += elem.offsetTop;\n\
				left += elem.offsetLeft;\n\
\n\
				if ( jQuery.offset.doesNotAddBorder && !(jQuery.offset.doesAddBorderForTableAndCells && rtable.test(elem.nodeName)) ) {\n\
					top  += parseFloat( computedStyle.borderTopWidth  ) || 0;\n\
					left += parseFloat( computedStyle.borderLeftWidth ) || 0;\n\
				}\n\
\n\
				prevOffsetParent = offsetParent;\n\
				offsetParent = elem.offsetParent;\n\
			}\n\
\n\
			if ( jQuery.offset.subtractsBorderForOverflowNotVisible && computedStyle.overflow !== \"visible\" ) {\n\
				top  += parseFloat( computedStyle.borderTopWidth  ) || 0;\n\
				left += parseFloat( computedStyle.borderLeftWidth ) || 0;\n\
			}\n\
\n\
			prevComputedStyle = computedStyle;\n\
		}\n\
\n\
		if ( prevComputedStyle.position === \"relative\" || prevComputedStyle.position === \"static\" ) {\n\
			top  += body.offsetTop;\n\
			left += body.offsetLeft;\n\
		}\n\
\n\
		if ( jQuery.offset.supportsFixedPosition && prevComputedStyle.position === \"fixed\" ) {\n\
			top  += Math.max( docElem.scrollTop, body.scrollTop );\n\
			left += Math.max( docElem.scrollLeft, body.scrollLeft );\n\
		}\n\
\n\
		return { top: top, left: left };\n\
	};\n\
}\n\
\n\
jQuery.offset = {\n\
	initialize: function() {\n\
		var body = document.body, container = document.createElement(\"div\"), innerDiv, checkDiv, table, td, bodyMarginTop = parseFloat( jQuery.css(body, \"marginTop\") ) || 0,\n\
			html = \"<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>\";\n\
\n\
		jQuery.extend( container.style, { position: \"absolute\", top: 0, left: 0, margin: 0, border: 0, width: \"1px\", height: \"1px\", visibility: \"hidden\" } );\n\
\n\
		container.innerHTML = html;\n\
		body.insertBefore( container, body.firstChild );\n\
		innerDiv = container.firstChild;\n\
		checkDiv = innerDiv.firstChild;\n\
		td = innerDiv.nextSibling.firstChild.firstChild;\n\
\n\
		this.doesNotAddBorder = (checkDiv.offsetTop !== 5);\n\
		this.doesAddBorderForTableAndCells = (td.offsetTop === 5);\n\
\n\
		checkDiv.style.position = \"fixed\";\n\
		checkDiv.style.top = \"20px\";\n\
\n\
		// safari subtracts parent border width here which is 5px\n\
		this.supportsFixedPosition = (checkDiv.offsetTop === 20 || checkDiv.offsetTop === 15);\n\
		checkDiv.style.position = checkDiv.style.top = \"\";\n\
\n\
		innerDiv.style.overflow = \"hidden\";\n\
		innerDiv.style.position = \"relative\";\n\
\n\
		this.subtractsBorderForOverflowNotVisible = (checkDiv.offsetTop === -5);\n\
\n\
		this.doesNotIncludeMarginInBodyOffset = (body.offsetTop !== bodyMarginTop);\n\
\n\
		body.removeChild( container );\n\
		jQuery.offset.initialize = jQuery.noop;\n\
	},\n\
\n\
	bodyOffset: function( body ) {\n\
		var top = body.offsetTop,\n\
			left = body.offsetLeft;\n\
\n\
		jQuery.offset.initialize();\n\
\n\
		if ( jQuery.offset.doesNotIncludeMarginInBodyOffset ) {\n\
			top  += parseFloat( jQuery.css(body, \"marginTop\") ) || 0;\n\
			left += parseFloat( jQuery.css(body, \"marginLeft\") ) || 0;\n\
		}\n\
\n\
		return { top: top, left: left };\n\
	},\n\
\n\
	setOffset: function( elem, options, i ) {\n\
		var position = jQuery.css( elem, \"position\" );\n\
\n\
		// set position first, in-case top/left are set even on static elem\n\
		if ( position === \"static\" ) {\n\
			elem.style.position = \"relative\";\n\
		}\n\
\n\
		var curElem = jQuery( elem ),\n\
			curOffset = curElem.offset(),\n\
			curCSSTop = jQuery.css( elem, \"top\" ),\n\
			curCSSLeft = jQuery.css( elem, \"left\" ),\n\
			calculatePosition = (position === \"absolute\" || position === \"fixed\") && jQuery.inArray(\"auto\", [curCSSTop, curCSSLeft]) > -1,\n\
			props = {}, curPosition = {}, curTop, curLeft;\n\
\n\
		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed\n\
		if ( calculatePosition ) {\n\
			curPosition = curElem.position();\n\
			curTop = curPosition.top;\n\
			curLeft = curPosition.left;\n\
		} else {\n\
			curTop = parseFloat( curCSSTop ) || 0;\n\
			curLeft = parseFloat( curCSSLeft ) || 0;\n\
		}\n\
\n\
		if ( jQuery.isFunction( options ) ) {\n\
			options = options.call( elem, i, curOffset );\n\
		}\n\
\n\
		if (options.top != null) {\n\
			props.top = (options.top - curOffset.top) + curTop;\n\
		}\n\
		if (options.left != null) {\n\
			props.left = (options.left - curOffset.left) + curLeft;\n\
		}\n\
\n\
		if ( \"using\" in options ) {\n\
			options.using.call( elem, props );\n\
		} else {\n\
			curElem.css( props );\n\
		}\n\
	}\n\
};\n\
\n\
\n\
jQuery.fn.extend({\n\
	position: function() {\n\
		if ( !this[0] ) {\n\
			return null;\n\
		}\n\
\n\
		var elem = this[0],\n\
\n\
		// Get *real* offsetParent\n\
		offsetParent = this.offsetParent(),\n\
\n\
		// Get correct offsets\n\
		offset       = this.offset(),\n\
		parentOffset = rroot.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset();\n\
\n\
		// Subtract element margins\n\
		// note: when an element has margin: auto the offsetLeft and marginLeft\n\
		// are the same in Safari causing offset.left to incorrectly be 0\n\
		offset.top  -= parseFloat( jQuery.css(elem, \"marginTop\") ) || 0;\n\
		offset.left -= parseFloat( jQuery.css(elem, \"marginLeft\") ) || 0;\n\
\n\
		// Add offsetParent borders\n\
		parentOffset.top  += parseFloat( jQuery.css(offsetParent[0], \"borderTopWidth\") ) || 0;\n\
		parentOffset.left += parseFloat( jQuery.css(offsetParent[0], \"borderLeftWidth\") ) || 0;\n\
\n\
		// Subtract the two offsets\n\
		return {\n\
			top:  offset.top  - parentOffset.top,\n\
			left: offset.left - parentOffset.left\n\
		};\n\
	},\n\
\n\
	offsetParent: function() {\n\
		return this.map(function() {\n\
			var offsetParent = this.offsetParent || document.body;\n\
			while ( offsetParent && (!rroot.test(offsetParent.nodeName) && jQuery.css(offsetParent, \"position\") === \"static\") ) {\n\
				offsetParent = offsetParent.offsetParent;\n\
			}\n\
			return offsetParent;\n\
		});\n\
	}\n\
});\n\
\n\
\n\
// Create scrollLeft and scrollTop methods\n\
jQuery.each( [\"Left\", \"Top\"], function( i, name ) {\n\
	var method = \"scroll\" + name;\n\
\n\
	jQuery.fn[ method ] = function( val ) {\n\
		var elem, win;\n\
\n\
		if ( val === undefined ) {\n\
			elem = this[ 0 ];\n\
\n\
			if ( !elem ) {\n\
				return null;\n\
			}\n\
\n\
			win = getWindow( elem );\n\
\n\
			// Return the scroll offset\n\
			return win ? (\"pageXOffset\" in win) ? win[ i ? \"pageYOffset\" : \"pageXOffset\" ] :\n\
				jQuery.support.boxModel && win.document.documentElement[ method ] ||\n\
					win.document.body[ method ] :\n\
				elem[ method ];\n\
		}\n\
\n\
		// Set the scroll offset\n\
		return this.each(function() {\n\
			win = getWindow( this );\n\
\n\
			if ( win ) {\n\
				win.scrollTo(\n\
					!i ? val : jQuery( win ).scrollLeft(),\n\
					 i ? val : jQuery( win ).scrollTop()\n\
				);\n\
\n\
			} else {\n\
				this[ method ] = val;\n\
			}\n\
		});\n\
	};\n\
});\n\
\n\
function getWindow( elem ) {\n\
	return jQuery.isWindow( elem ) ?\n\
		elem :\n\
		elem.nodeType === 9 ?\n\
			elem.defaultView || elem.parentWindow :\n\
			false;\n\
}\n\
\n\
\n\
\n\
\n\
// Create width, height, innerHeight, innerWidth, outerHeight and outerWidth methods\n\
jQuery.each([ \"Height\", \"Width\" ], function( i, name ) {\n\
\n\
	var type = name.toLowerCase();\n\
\n\
	// innerHeight and innerWidth\n\
	jQuery.fn[ \"inner\" + name ] = function() {\n\
		var elem = this[0];\n\
		return elem && elem.style ?\n\
			parseFloat( jQuery.css( elem, type, \"padding\" ) ) :\n\
			null;\n\
	};\n\
\n\
	// outerHeight and outerWidth\n\
	jQuery.fn[ \"outer\" + name ] = function( margin ) {\n\
		var elem = this[0];\n\
		return elem && elem.style ?\n\
			parseFloat( jQuery.css( elem, type, margin ? \"margin\" : \"border\" ) ) :\n\
			null;\n\
	};\n\
\n\
	jQuery.fn[ type ] = function( size ) {\n\
		// Get window width or height\n\
		var elem = this[0];\n\
		if ( !elem ) {\n\
			return size == null ? null : this;\n\
		}\n\
\n\
		if ( jQuery.isFunction( size ) ) {\n\
			return this.each(function( i ) {\n\
				var self = jQuery( this );\n\
				self[ type ]( size.call( this, i, self[ type ]() ) );\n\
			});\n\
		}\n\
\n\
		if ( jQuery.isWindow( elem ) ) {\n\
			// Everyone else use document.documentElement or document.body depending on Quirks vs Standards mode\n\
			// 3rd condition allows Nokia support, as it supports the docElem prop but not CSS1Compat\n\
			var docElemProp = elem.document.documentElement[ \"client\" + name ],\n\
				body = elem.document.body;\n\
			return elem.document.compatMode === \"CSS1Compat\" && docElemProp ||\n\
				body && body[ \"client\" + name ] || docElemProp;\n\
\n\
		// Get document width or height\n\
		} else if ( elem.nodeType === 9 ) {\n\
			// Either scroll[Width/Height] or offset[Width/Height], whichever is greater\n\
			return Math.max(\n\
				elem.documentElement[\"client\" + name],\n\
				elem.body[\"scroll\" + name], elem.documentElement[\"scroll\" + name],\n\
				elem.body[\"offset\" + name], elem.documentElement[\"offset\" + name]\n\
			);\n\
\n\
		// Get or set width or height on the element\n\
		} else if ( size === undefined ) {\n\
			var orig = jQuery.css( elem, type ),\n\
				ret = parseFloat( orig );\n\
\n\
			return jQuery.isNaN( ret ) ? orig : ret;\n\
\n\
		// Set the width or height on the element (default to pixels if value is unitless)\n\
		} else {\n\
			return this.css( type, typeof size === \"string\" ? size : size + \"px\" );\n\
		}\n\
	};\n\
\n\
});\n\
\n\
\n\
// Expose jQuery to the global object\n\
window.jQuery = window.$ = jQuery;\n\
})(window);\n\
";
