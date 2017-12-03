"use strict";

var TokenList = (function(){var SLICE$0 = Array.prototype.slice;function GET_ITER$0(v){if(v){if(Array.isArray(v))return 0;if(typeof v==='object'&&typeof v['@@iterator']==='function')return v['@@iterator']();}throw new Error(v+' is not iterable')};
	TokenList.prototype._reset = function() {
		this._keysMap = {};
		this._lengthChanged = false;
		this._length = 0;
	}

	function TokenList() {function ITER$0(v,f){if(v){if(Array.isArray(v))return f?v.slice():v;var i,r;if(typeof v==='object'&&typeof v['@@iterator']==='function'){i=v['@@iterator'](),r=[];while((f=i['next']()),f['done']!==true)r.push(f['value']);return r;}}throw new Error(v+' is not iterable')};var tokens = SLICE$0.call(arguments, 0);
		this._reset();

		this.add.apply(this, ITER$0(tokens));
	}

	TokenList.prototype._update = function() {
//		this._lengthChanged = true;
		this.length = Object.keys(this._keysMap).length;
	}

//	get length() {
//		if ( this._lengthChanged ) {
//			this._length = Object.keys(this._keysMap).length;
//			this._lengthChanged = false;
//		}
//		return this._length;
//	}

	TokenList.prototype.add = function() {var $D$0;var $D$1;var $D$2;var tokens = SLICE$0.call(arguments, 0);
		$D$0 = GET_ITER$0(tokens);$D$1 = $D$0 === 0;$D$2 = ($D$1 ? tokens.length : void 0);for ( var token ; $D$1 ? ($D$0 < $D$2) : !($D$2 = $D$0["next"]())["done"]; ){token = ($D$1 ? tokens[$D$0++] : $D$2["value"]);
			this._keysMap[token] = null;
		};$D$0 = $D$1 = $D$2 = void 0;
		this._update();
	}

	TokenList.prototype.remove = function() {var $D$3;var $D$4;var $D$5;var tokens = SLICE$0.call(arguments, 0);
		$D$3 = GET_ITER$0(tokens);$D$4 = $D$3 === 0;$D$5 = ($D$4 ? tokens.length : void 0);for ( var token ; $D$4 ? ($D$3 < $D$5) : !($D$5 = $D$3["next"]())["done"]; ){token = ($D$4 ? tokens[$D$3++] : $D$5["value"]);
			delete this._keysMap[token];
		};$D$3 = $D$4 = $D$5 = void 0;
		this._update();
	}

	TokenList.prototype.contains = function() {var $D$6;var $D$7;var $D$8;var tokens = SLICE$0.call(arguments, 0);
		var keysMap = this._keysMap;
		var match = false;

		$D$6 = GET_ITER$0(tokens);$D$7 = $D$6 === 0;$D$8 = ($D$7 ? tokens.length : void 0);for ( var token ; $D$7 ? ($D$6 < $D$8) : !($D$8 = $D$6["next"]())["done"]; ){token = ($D$7 ? tokens[$D$6++] : $D$8["value"]);
			if ( !(match = keysMap[token] !== void 0) ) {
				break;
			}
		};$D$6 = $D$7 = $D$8 = void 0;

		return match;
	}

	TokenList.prototype.toggle = function(token, force) {
		if ( force === true || (this._keysMap[token] === void 0 && force !== false) ) {
			this.add(token);
		}
		else {
			this.remove(token);
		}
	}

	TokenList.prototype.clean = function() {
		this._reset();
	}

	TokenList.prototype.toString = function() {var separator = arguments[0];if(separator === void 0)separator = " ";
		return Object.keys(this._keysMap).join(separator);
	}
;return TokenList;})();

module.exports = TokenList;
