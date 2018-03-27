// https://github.com/google/traceur-compiler/issues/1015

var x, y;
(((((((((((({x = 1, y = 2} = {}))))))))))));
expect(x).toBe(1);
expect(y).toBe(2);

(((((((((((({x: {x = 3}} = {x: {}}))))))))))));
expect(x).toBe(3);
