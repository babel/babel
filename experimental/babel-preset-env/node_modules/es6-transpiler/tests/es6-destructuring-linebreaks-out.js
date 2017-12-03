var A = (G = {A: 1, B: 2, C: 3, D: {E1: 4}, F: 5, G: 6}).A
, B = G.B
, C = G.C
, E = (G.D).E1
, F = G.F
, G = G.G


	;

console.log(A === 1, B === 2, C === 3, E === 4, F === 5, G === 6);
