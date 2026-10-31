var x, i = 0, j = 0;
x = ({} = {}, 2);
expect(x).toBe(2);

({} = {});
var {} = {};

for (var {} = {}; i < 1; i++);
expect(i).toBe(1);

for (let [] = []; j < 1; j++);
expect(j).toBe(1);
