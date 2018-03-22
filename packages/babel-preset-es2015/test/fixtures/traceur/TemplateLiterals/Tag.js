// Options: --block-binding

{
  function expose(callSite, var_args) {
    expect(Array.isArray(callSite)).toBe(true);
    expect(Object.isFrozen(callSite)).toBe(true);
    var rawDescr = Object.getOwnPropertyDescriptor(callSite, 'raw');
    expect(rawDescr !== undefined).toBe(true);
    expect('value' in rawDescr).toBe(true);
    expect(rawDescr.enumerable).toBe(false);
    expect(rawDescr.writable).toBe(false);
    expect(rawDescr.configurable).toBe(false);
    expect(Object.isFrozen(callSite.raw)).toBe(true);
    expect(Array.isArray(callSite.raw)).toBe(true);
    expect(Object.isFrozen(callSite.raw)).toBe(true);
    expect(callSite.raw).toHaveLength(callSite.length);

    // The number of the literal portions is always same or one greater than the
    // number of substitutions
    var literalPortionCount = callSite.raw.length;
    var substitutionCount = arguments.length - 1;
    expect(literalPortionCount == substitutionCount ||
               literalPortionCount == substitutionCount + 1).toBe(true);

    return arguments;
  }

  let x = 3;
  let y = 5;

  expect(expose``).toHaveLength(1);
  expect(expose`a`).toHaveLength(1);
  expect(expose`a${x}`).toHaveLength(2);
  expect(expose`a${x} b`).toHaveLength(2);
  expect(expose`a${x} ${y}`).toHaveLength(3);
  expect(expose`${x}${y}`).toHaveLength(3);
  expect(expose`${x}a`).toHaveLength(2);

  expect(expose``[0]).toHaveLength(1);
  expect(expose``[0].raw).toHaveLength(1);

  expect(expose`a`[0].raw).toEqual(['a']);
  expect(expose`a`[0]).toEqual(['a']);

  expect(expose`\n`[0].raw).toEqual(['\\n']);
  expect(expose`\n`[0]).toEqual(['\n']);

  expect(expose`\r`[0].raw).toEqual(['\\r']);
  expect(expose`\r`[0]).toEqual(['\r']);

  expect(expose`\f`[0].raw).toEqual(['\\f']);
  expect(expose`\f`[0]).toEqual(['\f']);

  expect(expose`\b`[0].raw).toEqual(['\\b']);
  expect(expose`\b`[0]).toEqual(['\b']);

  expect(expose`\u2028`[0].raw).toEqual(['\\u2028']);
  expect(expose`\u2028`[0]).toEqual(['\u2028']);

  expect(expose`\u2029`[0].raw).toEqual(['\\u2029']);
  expect(expose`\u2029`[0]).toEqual(['\u2029']);

  expect(expose`a${x}b`[0].raw).toEqual(['a', 'b']);
  expect(expose`a${x}b`[0]).toEqual(['a', 'b']);

  // These have tab characters in them.
  expect(expose`	${x}\t`[0].raw).toEqual(['\t', '\\t']);
  expect(expose`	${x}\t`[0]).toEqual(['\t', '\t']);

  expect(expose`
${x}\n`[0].raw).toEqual(['\n', '\\n']);
  expect(expose`
${x}\n`[0]).toEqual(['\n', '\n']);

  // These contains the ES new line chars \u2028 and \u2029
  expect(expose` ${x}\u2028`[0].raw).toEqual(['\u2028', '\\u2028']);
  expect(expose` ${x}\u2028`[0]).toEqual(['\u2028', '\u2028']);

  expect(expose` ${x}\u2029`[0].raw).toEqual(['\u2029', '\\u2029']);
  expect(expose` ${x}\u2029`[0]).toEqual(['\u2029', '\u2029']);

  expect(expose`a/*b*/c`[0].raw).toEqual(['a/*b*/c']);
  expect(expose`a/*b*/c`[0]).toEqual(['a/*b*/c']);

  expect(expose/* comment */`a`[0].raw).toEqual(['a']);
  expect(expose/* comment */`a`[0]).toEqual(['a']);
};
