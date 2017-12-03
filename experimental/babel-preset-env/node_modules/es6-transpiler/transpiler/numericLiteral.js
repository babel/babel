"use strict";

var plugin = module.exports = {
	reset: function() {

	}

	, setup: function(alter, ast, options) {
		if( !this.__isInit ) {
			this.reset();
			this.__isInit = true;
		}

		this.alter = alter;
		this.options = options;
	}

	, '::Literal[raw^=0b],Literal[raw^=0B]': function(node) {
		this.alter.replace(node.range[0], node.range[1], node.value + "");
	}

	, '::Literal[raw^=0o],Literal[raw^=0O]': function(node) {
		this.alter.replace(node.range[0], node.range[1], node.value + "");
	}
};

for(let i in plugin) if( plugin.hasOwnProperty(i) && typeof plugin[i] === "function" ) {
	plugin[i] = plugin[i].bind(plugin);
}
