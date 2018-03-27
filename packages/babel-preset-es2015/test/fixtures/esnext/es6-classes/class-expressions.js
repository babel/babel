var Person = (class Person {});
expect(typeof Person).toBe('function');

expect((function(){ return (class Person {}); })().name).toBe('Person');

expect(typeof (class {})).toBe('function');
