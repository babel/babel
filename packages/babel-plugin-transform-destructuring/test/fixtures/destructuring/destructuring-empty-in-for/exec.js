var y = {};

for ( let x in y ) for ( ; ; ) var { } = x ;

for ( let x in y ) for ( var { } = x ; ; ) ;

for ( let x in y ) for ( ; { } = x ; {} = x ) var { } = x ;

for ( let { } = 0 ; 0 ; ) ;

var iterations = 0;
for (let {} = 0; iterations < 2; iterations++);
expect(iterations).toBe(2);

expect(() => {
  for (let {} = null; 0; );
}).toThrow(TypeError);

expect(() => {
  for (var {} = undefined; 0; );
}).toThrow(TypeError);
