class List extends Array {}

expect(new List instanceof List).toBe(true);
expect(new List instanceof Array).toBe(true);
