expect((function(a){})).toHaveLength(1);
expect((function(a=5){})).toHaveLength(0);
expect((function(a, b, c=5){})).toHaveLength(2);
