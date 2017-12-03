// for https://github.com/jviereck/regjsparser @version 0.0.2

module.exports = {
	'alternative': ['terms'],
	'assertion': ['sub'],
	'character': [],
	'characterClass': ['classRanges'],
	'characterClassRange': ['min', 'max'],
	'disjunction': ['alternatives'],
	'dot': [],
	'empty': [],
	'escape': [],
	'escapeChar': [],
	'error': [],
	'group': ['disjunction'],
	'quantifier': ['child'],
	'ref': []
};
