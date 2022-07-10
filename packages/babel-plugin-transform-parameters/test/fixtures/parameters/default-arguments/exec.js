function func(...arguments) {
    return arguments;
}
expect(func(1, 2, 3)).toStrictEqual([1, 2, 3])
