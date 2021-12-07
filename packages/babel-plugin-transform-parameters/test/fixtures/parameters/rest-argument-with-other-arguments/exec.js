function func(a, b, ...arguments) {
    return arguments;
}

expect(func('a', 'b', 1, 2, 3)).toStrictEqual([1, 2, 3])