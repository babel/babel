assert.equal('', String.raw ``);
assert.equal('\n', String.raw `
`);
assert.equal('\\n', String.raw `\n`);
assert.equal('\\n42\\t', String.raw `\n${ 40 + 2 }\t`);
assert.equal('\n42\t', String.raw `
${42}	`);
assert.equal('\\\n42\\\n', String.raw `\
${42}\
`);
