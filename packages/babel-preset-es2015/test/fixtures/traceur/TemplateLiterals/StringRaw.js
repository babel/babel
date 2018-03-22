expect(String.raw ``).toBe('');
expect(String.raw `
`).toBe('\n');
expect(String.raw `\n`).toBe('\\n');
expect(String.raw `\n${ 40 + 2 }\t`).toBe('\\n42\\t');
expect(String.raw `
${42}	`).toBe('\n42\t');
expect(String.raw `\
${42}\
`).toBe('\\\n42\\\n');
