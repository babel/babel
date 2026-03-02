expect(function () {
    for (const element = 1; element++;) break;
}).toThrow('"element" is read-only');

expect(function () {
    for (;;) {
        const from = 50;
        from--;
        break;
    }
}).toThrow('"from" is read-only');
