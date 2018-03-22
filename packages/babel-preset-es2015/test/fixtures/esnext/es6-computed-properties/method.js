var x = 'y';
expect({[x]: function() { return 10; }}.y()).toBe(10);
expect({[x + 'y']() { return 10; }}.yy()).toBe(10);
