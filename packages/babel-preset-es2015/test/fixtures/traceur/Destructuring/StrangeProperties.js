var x, y;

(((((((((((({if: x = 1, else: y} = {else: 2}))))))))))));
expect(x).toBe(1);
expect(y).toBe(2);

(((((((((((({'': x = 3, ' ': y} = {' ': 4}))))))))))));
expect(x).toBe(3);
expect(y).toBe(4);

(((((((((((({true: x = 5, false: y} = {false: 6}))))))))))));
expect(x).toBe(5);
expect(y).toBe(6);

(((((((((((({0: x = 7, 1: y} = {1: 8}))))))))))));
expect(x).toBe(7);
expect(y).toBe(8);
