var {
		A
		, B
		, C
		, D: {E1: E}
		, F
		, G
		} = {A: 1, B: 2, C: 3, D: {E1: 4}, F: 5, G: 6}
	;

console.log(A === 1, B === 2, C === 3, E === 4, F === 5, G === 6);
