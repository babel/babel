function func(a, b, ...arguments) {
    return [a, b, arguments];
}

expect(func('a', 'b', 1, 2, 3)).toStrictEqual(['a', 'b', [1, 2, 3]])