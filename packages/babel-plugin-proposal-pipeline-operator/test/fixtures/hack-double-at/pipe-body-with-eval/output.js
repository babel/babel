const program = '(function() { return this; })()';
const result = eval(program);
expect(result).not.toBeUndefined();
