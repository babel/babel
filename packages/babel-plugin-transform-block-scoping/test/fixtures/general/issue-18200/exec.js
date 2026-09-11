var arr = {};

for (var i = 0; i < 2; i++)
  for (let x = (arr[i] = () => x, i); false;);

expect(arr[0]()).toBe(0);
expect(arr[1]()).toBe(1);
