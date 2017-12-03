// Esprima parser bugs list

//{a} is ObjectExpression insteadof ObjectPattern
try {} catch({a}){  }

// Error: Line 1: Unexpected token )
console.log( ( (a)=>a )(1) )

// Error: Line 1: Spread must be the final element of an element list
var arr = [...[1], 2]

// Error: Line 1: Unexpected token =>
var fff = ({x = (() => 1)()}) => (x);
