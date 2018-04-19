var x = 'y';
expect({[x]: 10}.y).toBe(10);
expect({[x + 'y']: 10}.yy).toBe(10);
